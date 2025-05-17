import { AppDataSource } from "../config/database";
import logger from "../utils/logger";

/**
 * Add maxSteps column to workflow_categories table directly using SQL
 */
const addMaxStepsColumnDirectly = async (): Promise<void> => {
  try {
    // Initialize database connection if not already initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized");
    }
    
    // Create a query runner
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    
    try {
      // Check if the column already exists
      const table = await queryRunner.getTable("workflow_categories");
      const maxStepsColumn = table?.findColumnByName("maxSteps");
      
      if (!maxStepsColumn) {
        logger.info("Adding maxSteps column to workflow_categories table");
        
        // Start a transaction
        await queryRunner.startTransaction();
        
        try {
          // Add maxSteps column with default value 3
          await queryRunner.query(`ALTER TABLE "workflow_categories" ADD COLUMN IF NOT EXISTS "maxSteps" integer NOT NULL DEFAULT 3`);
          
          // Update existing categories with specific maxSteps values
          await queryRunner.query(`UPDATE "workflow_categories" SET "maxSteps" = 2 WHERE "name" = 'Short Leave'`);
          await queryRunner.query(`UPDATE "workflow_categories" SET "maxSteps" = 3 WHERE "name" = 'Medium Leave'`);
          await queryRunner.query(`UPDATE "workflow_categories" SET "maxSteps" = 4 WHERE "name" = 'Long Leave'`);
          await queryRunner.query(`UPDATE "workflow_categories" SET "maxSteps" = 5 WHERE "name" = 'Extended Leave'`);
          await queryRunner.query(`UPDATE "workflow_categories" SET "maxSteps" = 6 WHERE "name" = 'Long-Term Leave'`);
          
          // Commit the transaction
          await queryRunner.commitTransaction();
          logger.info("Successfully added maxSteps column to workflow_categories table");
        } catch (error) {
          // Rollback the transaction if there's an error
          await queryRunner.rollbackTransaction();
          logger.error("Error adding maxSteps column:", error);
          throw error;
        }
      } else {
        logger.info("maxSteps column already exists in workflow_categories table");
      }
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
    
    // Close the database connection
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      logger.info("Database connection closed");
    }
  } catch (error) {
    logger.error("Error adding maxSteps column:", error);
    
    // Close the database connection if it's still open
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
    
    throw error;
  }
};

// Run the script if executed directly
if (require.main === module) {
  addMaxStepsColumnDirectly()
    .then(() => {
      logger.info("Script completed");
      process.exit(0);
    })
    .catch((error) => {
      logger.error("Script failed:", error);
      process.exit(1);
    });
}