import { DataSource } from "typeorm";
import config from "./config";
import path from "path";
import logger from "../utils/logger";

// Use environment variables for database connection
export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  synchronize: false, // Disable auto-synchronization to prevent data loss
  logging: false, // Disable SQL logging
  entities: [path.join(__dirname, "../models/**/*.{ts,js}")],
  migrations: [path.join(__dirname, "../migrations/**/*.{ts,js}")],
  subscribers: [path.join(__dirname, "../subscribers/**/*.{ts,js}")],
  cache: false, // Disable metadata caching
});

const checkTableExists = async (tableName: string): Promise<boolean> => {
  try {
    const result = await AppDataSource.query(
      `SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = $1
      )`,
      [tableName]
    );
    return result[0]?.exists || false;
  } catch (err) {
    logger.error(`Error checking table existence for ${tableName}:`, err);
    return false;
  }
};

const fixMigrationsTable = async (): Promise<void> => {
  const queryRunner = AppDataSource.createQueryRunner();
  try {
    const tableExists = await queryRunner.hasTable("migrations");
    if (tableExists) {
      const nullNames = await queryRunner.query(
        `SELECT id FROM migrations WHERE name IS NULL`
      );
      if (nullNames.length > 0) {
        logger.info(`Removing ${nullNames.length} migrations with null names`);
        await queryRunner.query(`DELETE FROM migrations WHERE name IS NULL`);
      }

      const duplicates = await queryRunner.query(`
        SELECT name, COUNT(*) 
        FROM migrations 
        GROUP BY name 
        HAVING COUNT(*) > 1
      `);
      for (const dup of duplicates) {
        await queryRunner.query(`
          DELETE FROM migrations 
          WHERE name = $1 
          AND id NOT IN (
            SELECT id FROM migrations 
            WHERE name = $1 
            ORDER BY timestamp DESC 
            LIMIT 1
          )
        `, [dup.name]);
      }
    }
  } catch (err) {
    logger.error("Error fixing migrations table:", err);
  } finally {
    await queryRunner.release();
  }
};

const runPendingMigrations = async (): Promise<void> => {
  try {
    logger.info("Running pending migrations...");
    await AppDataSource.runMigrations({ transaction: "each" });
    logger.info("Migrations completed successfully");
  } catch (err) {
    logger.error("Error running migrations:", err);
    logger.info("Attempting to run migrations individually...");
    const queryRunner = AppDataSource.createQueryRunner();
    for (const migration of AppDataSource.migrations) {
      try {
        await migration.up(queryRunner);
        await queryRunner.query(
          `INSERT INTO migrations(timestamp, name) VALUES($1, $2) ON CONFLICT DO NOTHING`,
          [Date.now(), migration.name]
        );
        logger.info(`Successfully ran migration: ${migration.name}`);
      } catch (migrationError) {
        logger.error(`Error running migration ${migration.name}:`, migrationError);
      }
    }
    await queryRunner.release();
  }
};

export const initializeDatabase = async (): Promise<void> => {
  try {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
    await AppDataSource.initialize();
    logger.info("Database connected successfully");

    const entities = AppDataSource.entityMetadatas;
    for (const entity of entities) {
      const exists = await checkTableExists(entity.tableName);
      if (!exists) {
        logger.warn(`Table ${entity.tableName} does not exist. Run migrations to create it.`);
      }
    }

    const pendingMigrations = await AppDataSource.showMigrations();
    if (pendingMigrations) {
      await fixMigrationsTable();
      await runPendingMigrations();
    }
  } catch (error) {
    logger.error("Error during database initialization:", error);
    throw error;
  }
};

export const ensureDatabaseConnection = async (): Promise<void> => {
  try {
    if (!AppDataSource.isInitialized) {
      logger.warn("Database connection not initialized, attempting to initialize...");
      await initializeDatabase();
    } else {
      try {
        await AppDataSource.query("SELECT 1");
      } catch {
        logger.warn("Database connection test failed, reconnecting...");
        await initializeDatabase();
      }
    }
  } catch (error) {
    logger.error("Failed to ensure database connection:", error);
    throw error;
  }
};
