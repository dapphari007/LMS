import { AppDataSource } from "../config/database";
import logger from "../utils/logger";

/**
 * Script to fix the positions table by adding the level column if it doesn't exist
 */
const fixPositionsTable = async () => {
  try {
    // Initialize the connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connected successfully");
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
      logger.warn("Positions table does not exist. Run migrations first.");
      return;
    }

    // Check if the level column exists
    const levelColumnExists = await AppDataSource.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'positions' 
        AND column_name = 'level'
      )
    `);

    if (!levelColumnExists[0].exists) {
      logger.info("Level column does not exist in positions table. Adding it...");
      
      // Add the level column with default value 1
      await AppDataSource.query(`
        ALTER TABLE "positions" ADD COLUMN "level" integer NOT NULL DEFAULT 1
      `);
      
      logger.info("Level column added successfully to positions table");
    } else {
      logger.info("Level column already exists in positions table");
    }

    logger.info("Positions table fix completed successfully");
  } catch (error: any) {
    logger.error(`Error fixing positions table: ${error.message}`);
  } finally {
    // Close the connection
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
    process.exit(0);
  }
};

// Run the script
fixPositionsTable();