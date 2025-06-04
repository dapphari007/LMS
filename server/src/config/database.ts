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
        // First, try to fix the migrations table if needed
        logger.info("* Checking migrations table for issues...");
        const queryRunner = AppDataSource.createQueryRunner();
        
        try {
          // Check if migrations table exists
          const tableExists = await queryRunner.hasTable("migrations");
          
          if (tableExists) {
            // Check for null values in the name column
            const nullNames = await queryRunner.query(
              `SELECT id FROM migrations WHERE name IS NULL`
            );

            if (nullNames.length > 0) {
              logger.info(`* Found ${nullNames.length} migrations with null names, removing them`);
              await queryRunner.query(`DELETE FROM migrations WHERE name IS NULL`);
            }

            // Check for duplicate migrations
            const duplicates = await queryRunner.query(`
              SELECT name, COUNT(*) 
              FROM migrations 
              GROUP BY name 
              HAVING COUNT(*) > 1
            `);

            if (duplicates.length > 0) {
              logger.info(`* Found ${duplicates.length} duplicate migrations, keeping only the latest`);
              
              for (const dup of duplicates) {
                const name = dup.name;
                
                await queryRunner.query(`
                  DELETE FROM migrations 
                  WHERE name = $1 
                  AND id NOT IN (
                    SELECT id FROM migrations 
                    WHERE name = $1 
                    ORDER BY timestamp DESC 
                    LIMIT 1
                  )
                `, [name]);
              }
            }
          }
        } catch (fixError) {
          logger.error("* Error fixing migrations table:", fixError);
        } finally {
          await queryRunner.release();
        }
        
        // Run migrations automatically
        logger.info("* Running pending migrations...");
        await AppDataSource.runMigrations({ transaction: "each" });
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
              if (!migration.name) {
                logger.warn(`* Skipping migration with undefined name`);
                continue;
              }
              
              const queryRunner = AppDataSource.createQueryRunner();
              await migration.up(queryRunner);
              
              // Record the migration in the migrations table
              try {
                await queryRunner.query(
                  `INSERT INTO migrations(timestamp, name) VALUES($1, $2) ON CONFLICT DO NOTHING`,
                  [Date.now(), migration.name]
                );
              } catch (recordError) {
                logger.warn(`* Could not record migration ${migration.name} in migrations table:`, recordError);
              }
              
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
