import { createDefaultWorkflowCategories } from "./createDefaultWorkflowCategories";
import logger from "../utils/logger";

/**
 * Script to create default workflow categories
 */
const runCreateWorkflowCategories = async () => {
  try {
    logger.info("Starting workflow categories creation script...");
    await createDefaultWorkflowCategories();
    logger.info("Workflow categories creation completed successfully");
    process.exit(0);
  } catch (error) {
    logger.error("Error creating workflow categories:", error);
    process.exit(1);
  }
};

// Run the script
runCreateWorkflowCategories();