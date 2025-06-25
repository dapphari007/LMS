import { AppDataSource } from "../config/database";
import { createDefaultWorkflowCategories } from "./createDefaultWorkflowCategories";
import logger from "../utils/logger";

const checkTableExists = async (tableName: string): Promise<boolean> => {
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
  } catch (error) {
    logger.error(`Error checking if table ${tableName} exists:`, error);
    return false;
  }
};

export const setupDefaultData = async () => {
  try {
    logger.info("SetupDefaultData");

    // Check if tables exist
    const workflowCategoriesTableExists = await checkTableExists("workflow_categories");

    if (!workflowCategoriesTableExists) {
      logger.warn(
        "Workflow categories table does not exist. Skipping workflow categories creation."
      );
    } else {
      // Create workflow categories
      await createDefaultWorkflowCategories(false);
      logger.info("Default workflow categories created");
    }

    logger.info("SetupDefaultData completed successfully");
  } catch (error) {
    logger.error("Error setting up default data:", error);
    throw error;
  }
};
