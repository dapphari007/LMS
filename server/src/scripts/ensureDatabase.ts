import { Client } from "pg";
import { execSync } from "child_process";
import config from "../config/config";
import logger from "../utils/logger";

/**
 * Ensures the database exists, creates it if not, and enables necessary extensions
 */
export const ensureDatabase = async (): Promise<void> => {
  const dbConfig = {
    host: config.database.host,
    port: config.database.port,
    user: config.database.username,
    password: config.database.password,
  };

  const targetDatabase = config.database.database;
  let client: Client | null = null;

  try {
    // Connect to postgres database to check if target database exists
    client = new Client({
      ...dbConfig,
      database: "postgres",
    });

    await client.connect();
    logger.info("Connected to PostgreSQL server");

    // Check if database exists
    const result = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [targetDatabase]
    );

    if (result.rows.length === 0) {
      // Database doesn't exist, create it
      logger.info(`Database '${targetDatabase}' does not exist. Creating...`);
      await client.query(`CREATE DATABASE ${targetDatabase}`);
      logger.info(`Database '${targetDatabase}' created successfully`);
    } else {
      logger.info(`Database '${targetDatabase}' already exists`);
    }

    await client.end();

    // Connect to target database to enable extensions
    client = new Client({
      ...dbConfig,
      database: targetDatabase,
    });

    await client.connect();
    logger.info(`Connected to database '${targetDatabase}'`);

    // Enable UUID extension
    await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    logger.info("UUID extension enabled");

    await client.end();

    // Check if tables exist, if not run prisma db push
    await ensureSchema();
  } catch (error) {
    logger.error("Error ensuring database:", error);
    throw error;
  } finally {
    if (client) {
      try {
        await client.end();
      } catch (err) {
        // Ignore error on cleanup
      }
    }
  }
};

/**
 * Ensures the database schema is up to date
 */
const ensureSchema = async (): Promise<void> => {
  const client = new Client({
    host: config.database.host,
    port: config.database.port,
    user: config.database.username,
    password: config.database.password,
    database: config.database.database,
  });

  try {
    await client.connect();

    // Check if users table exists (as a representative table)
    const result = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      )
    `);

    await client.end();

    if (!result.rows[0].exists) {
      logger.info("Database schema not found. Running Prisma db push...");
      
      try {
        // Run prisma db push to create schema
        execSync("npx prisma db push --accept-data-loss --skip-generate", {
          stdio: "inherit",
          cwd: process.cwd(),
        });
        logger.info("Database schema created successfully");

        // Generate Prisma client
        execSync("npx prisma generate", {
          stdio: "inherit",
          cwd: process.cwd(),
        });
        logger.info("Prisma client generated");
      } catch (error) {
        logger.error("Error running Prisma commands:", error);
        throw error;
      }
    } else {
      logger.info("Database schema already exists");
    }
  } catch (error) {
    logger.error("Error checking schema:", error);
    if (client) {
      try {
        await client.end();
      } catch (err) {
        // Ignore
      }
    }
    throw error;
  }
};

// Run if executed directly
if (require.main === module) {
  ensureDatabase()
    .then(() => {
      logger.info("Database setup completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      logger.error("Database setup failed:", error);
      process.exit(1);
    });
}
