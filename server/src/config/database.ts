import { DataSource } from "typeorm";
import config from "./config";
import path from "path";
import logger from "../utils/logger";

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

export const initializeDatabase = async (): Promise<void> => {
  try {
    // If the connection is already established, close it first
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }

    // Initialize the connection
    await AppDataSource.initialize();
    logger.info("Database connected successfully");

    // Check if tables exist but don't create or modify them
    // This preserves existing data including HR, managers, and leave types
    const tableExists = async (tableName: string): Promise<boolean> => {
      try {
        const result = await AppDataSource.query(
          `SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = $1
          )`,
          [tableName]
        );
        return result[0].exists;
      } catch (err) {
        return false;
      }
    };

    // Get all entity metadata
    const entities = AppDataSource.entityMetadatas;

    // Check tables but don't modify them
    for (const entity of entities) {
      const exists = await tableExists(entity.tableName);
      if (!exists) {
        logger.warn(
          `* Table ${entity.tableName} does not exist. Run migrations to create it.`
        );
      }
    }

    // Check for pending migrations
    const pendingMigrations = await AppDataSource.showMigrations();
    if (pendingMigrations) {
      logger.info("* There are pending migrations that need to be applied");
      
      try {
        // Run migrations automatically
        logger.info("* Running pending migrations...");
        await AppDataSource.runMigrations();
        logger.info("* Migrations completed successfully");
      } catch (migrationError) {
        logger.error("* Error running migrations:", migrationError);
        
        // Try running migrations one by one
        logger.info("* Attempting to run migrations individually...");
        
        try {
          // Get all migration files
          const migrationFiles = AppDataSource.migrations;
          
          for (const migration of migrationFiles) {
            try {
              const queryRunner = AppDataSource.createQueryRunner();
              await migration.up(queryRunner);
              await queryRunner.release();
              logger.info(`* Successfully ran migration: ${migration.name}`);
            } catch (singleMigrationError) {
              logger.error(`* Error running migration ${migration.name}:`, singleMigrationError);
            }
          }
        } catch (migrationListError) {
          logger.error("* Error getting migrations list:", migrationListError);
        }
      }
    }

    logger.info("* Database check completed, preserving all existing data");
  } catch (error) {
    logger.error("Error during database initialization:", error);
    throw error;
  }
};

// Function to ensure database connection is established
export const ensureDatabaseConnection = async (): Promise<void> => {
  try {
    // Check if connection is initialized and connected
    if (!AppDataSource.isInitialized) {
      logger.warn(
        "Database connection not initialized, attempting to initialize..."
      );
      await initializeDatabase();
      return;
    }

    // Test the connection with a simple query
    try {
      await AppDataSource.query("SELECT 1");
    } catch (error) {
      logger.warn("Database connection test failed, reconnecting...");
      await initializeDatabase();
    }
  } catch (error) {
    logger.error("Failed to ensure database connection:", error);
    throw error;
  }
};
