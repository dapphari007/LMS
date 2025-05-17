import { AppDataSource } from "../config/database";
import logger from "../utils/logger";
import { runMigrations } from "./runMigrations";

/**
 * Script to fix migration order issues by ensuring tables are created before modifications
 */
const fixMigrationOrder = async () => {
  try {
    // Initialize the connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connected successfully");
    }

    // Check if migrations table exists
    const migrationsTableExists = await AppDataSource.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'migrations'
      )
    `);

    if (!migrationsTableExists[0].exists) {
      logger.info("Migrations table does not exist. Creating it...");
      await AppDataSource.query(`
        CREATE TABLE IF NOT EXISTS "migrations" (
          "id" SERIAL PRIMARY KEY,
          "timestamp" character varying NOT NULL,
          "name" character varying NOT NULL
        )
      `);
    }

    // Check if the positions table exists
    const positionsTableExists = await AppDataSource.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'positions'
      )
    `);

    if (!positionsTableExists[0].exists) {
      logger.info("Positions table does not exist. Running initial schema migration first...");
      
      // Find the migration that creates the positions table
      const createTablesMigration = await AppDataSource.migrations.find(
        m => m.name.includes('AddRolesDepartmentsPositionsPages')
      );
      
      if (createTablesMigration) {
        logger.info(`Running migration: ${createTablesMigration.name}`);
        
        // Create a separate query runner for this migration
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        
        try {
          // Run the migration
          await createTablesMigration.up(queryRunner);
          
          // Mark the migration as complete
          const migrationTimestamp = createTablesMigration.name.split('-')[0];
          await queryRunner.query(
            `INSERT INTO migrations(timestamp, name) VALUES ($1, $2)`,
            [migrationTimestamp, createTablesMigration.name]
          );
          
          logger.info(`Migration ${createTablesMigration.name} completed successfully`);
        } catch (error: any) {
          logger.error(`Error running migration ${createTablesMigration.name}: ${error.message}`);
        } finally {
          // Release the query runner
          await queryRunner.release();
        }
      } else {
        logger.warn("Could not find migration to create positions table");
      }
    }

    // Now run all remaining migrations
    logger.info("Running all remaining migrations...");
    await runMigrations(false);

    logger.info("Migration order fix completed successfully");
  } catch (error: any) {
    logger.error(`Error fixing migration order: ${error.message}`);
  } finally {
    // Close the connection
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
    process.exit(0);
  }
};

// Run the script
fixMigrationOrder();