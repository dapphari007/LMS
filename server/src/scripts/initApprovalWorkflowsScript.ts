import { AppDataSource } from "../config/database";
import { initApprovalWorkflows } from "../config/initApprovalWorkflows";
import logger from "../utils/logger";

/**
 * Script to initialize department-specific approval workflows
 * This can be run independently to set up or update approval workflows
 */
const runInitApprovalWorkflows = async (): Promise<void> => {
  try {
    logger.info("Starting approval workflows initialization...");

    // Initialize the database connection if not already initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized");
    }

    // Initialize approval workflows
    await initApprovalWorkflows();

    logger.info("Approval workflows initialization completed successfully");
  } catch (error) {
    logger.error(`Error during approval workflows initialization: ${error}`);
  } finally {
    // Close the database connection if we opened it
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      logger.info("Database connection closed");
    }
  }
};

// Run the script if called directly
if (require.main === module) {
  runInitApprovalWorkflows()
    .then(() => {
      logger.info("Approval workflows initialization script completed");
      process.exit(0);
    })
    .catch((error) => {
      logger.error(`Error in approval workflows initialization script: ${error}`);
      process.exit(1);
    });
}