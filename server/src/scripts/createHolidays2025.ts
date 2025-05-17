import { AppDataSource } from "../config/database";
import { Holiday } from "../models";
import logger from "../utils/logger";

export const createHolidays = async (
  closeConnection = false
): Promise<void> => {
  let wasInitialized = AppDataSource.isInitialized;

  try {
    // Initialize database connection if not already initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized in createHolidays");
    }

    // No test holidays will be created as per user request
    logger.info("Test holiday creation has been disabled");
    
  } catch (error) {
    logger.error(`Error in createHolidays: ${error}`);
    // Don't throw the error, just log it
  } finally {
    // Only close the connection if we opened it and closeConnection is true
    if (!wasInitialized && AppDataSource.isInitialized && closeConnection) {
      await AppDataSource.destroy();
      logger.info("Database connection closed in createHolidays");
    }
  }
};

// Execute if this script is run directly
if (require.main === module) {
  createHolidays(true) // true to close the connection when run directly
    .then(() => {
      logger.info("Holidays creation script completed (no holidays created)");
      process.exit(0);
    })
    .catch((error) => {
      logger.error(`Error in holidays creation script: ${error}`);
      process.exit(1);
    });
}
