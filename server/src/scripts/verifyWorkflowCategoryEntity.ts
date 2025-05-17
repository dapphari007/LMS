import { AppDataSource } from "../config/database";
import { WorkflowCategory } from "../models/WorkflowCategory";
import logger from "../utils/logger";

/**
 * Verify the WorkflowCategory entity and its columns
 */
const verifyWorkflowCategoryEntity = async (): Promise<void> => {
  try {
    // Initialize database connection if not already initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized");
    }
    
    // Get the metadata for the WorkflowCategory entity
    const metadata = AppDataSource.getMetadata(WorkflowCategory);
    
    // Log entity information
    logger.info(`Entity: ${metadata.name}`);
    logger.info(`Table: ${metadata.tableName}`);
    
    // Log column information
    logger.info("Columns:");
    metadata.columns.forEach(column => {
      logger.info(`- ${column.propertyName}: ${column.type} (${column.databaseName})`);
    });
    
    // Check if maxSteps column exists
    const maxStepsColumn = metadata.columns.find(column => column.propertyName === "maxSteps");
    if (maxStepsColumn) {
      logger.info(`maxSteps column exists: ${maxStepsColumn.propertyName} (${maxStepsColumn.databaseName})`);
    } else {
      logger.error("maxSteps column does not exist in entity metadata");
    }
    
    // Query the database to check if the column exists
    const queryRunner = AppDataSource.createQueryRunner();
    const table = await queryRunner.getTable("workflow_categories");
    const dbMaxStepsColumn = table?.findColumnByName("maxSteps");
    
    if (dbMaxStepsColumn) {
      logger.info(`maxSteps column exists in database: ${dbMaxStepsColumn.name} (${dbMaxStepsColumn.type})`);
    } else {
      logger.error("maxSteps column does not exist in database");
    }
    
    // Release the query runner
    await queryRunner.release();
    
    // Close the database connection
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      logger.info("Database connection closed");
    }
  } catch (error) {
    logger.error("Error verifying WorkflowCategory entity:", error);
    
    // Close the database connection if it's still open
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
    
    throw error;
  }
};

// Run the verification if this script is executed directly
if (require.main === module) {
  verifyWorkflowCategoryEntity()
    .then(() => {
      logger.info("Verification completed");
      process.exit(0);
    })
    .catch((error) => {
      logger.error("Verification failed:", error);
      process.exit(1);
    });
}