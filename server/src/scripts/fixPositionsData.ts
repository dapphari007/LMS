import { AppDataSource } from "../config/database";
import { Position } from "../models";
import logger from "../utils/logger";
import { syncPositions } from "./sync-positions";

/**
 * Script to fix positions data by ensuring all positions have a level value
 */
const fixPositionsData = async () => {
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
      logger.warn("Level column does not exist in positions table. Run fixPositionsTable.ts first.");
      return;
    }

    // Get all positions
    const positionRepository = AppDataSource.getRepository(Position);
    const positions = await positionRepository.find();

    if (positions.length === 0) {
      logger.info("No positions found. Running sync-positions to create default positions...");
      await syncPositions();
      logger.info("Default positions created successfully");
      return;
    }

    // Check if any positions have null or undefined level
    const positionsWithoutLevel = positions.filter(p => p.level === null || p.level === undefined);

    if (positionsWithoutLevel.length > 0) {
      logger.info(`Found ${positionsWithoutLevel.length} positions without level. Fixing...`);

      // Set default level based on position name
      for (const position of positionsWithoutLevel) {
        // Determine level based on position name
        let level = 1; // Default level
        
        if (position.name.includes('Director')) {
          level = 4;
        } else if (position.name.includes('Manager')) {
          level = 3;
        } else if (position.name.includes('Senior') || position.name.includes('Lead')) {
          level = 2;
        } else if (position.name.includes('Junior') || position.name.includes('Assistant')) {
          level = 1;
        } else if (position.name.includes('Specialist') || position.name.includes('Coordinator')) {
          level = 2;
        }
        
        // Update the position
        position.level = level;
        await positionRepository.save(position);
        logger.info(`Updated position ${position.name} with level ${level}`);
      }
      
      logger.info("All positions updated with appropriate levels");
    } else {
      logger.info("All positions already have level values. No fixes needed.");
    }

    logger.info("Positions data fix completed successfully");
  } catch (error: any) {
    logger.error(`Error fixing positions data: ${error.message}`);
  } finally {
    // Close the connection
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
    process.exit(0);
  }
};

// Run the script
fixPositionsData();