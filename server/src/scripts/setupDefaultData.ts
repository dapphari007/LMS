import { AppDataSource } from "../config/database";
import { createDefaultDepartments } from "./createDefaultDepartments";
import { createDefaultPositions } from "./createDefaultPositions";
import { createDefaultRoles } from "./createDefaultRoles";
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
    logger.info("Starting default data setup...");

    // Check if tables exist
    const departmentsTableExists = await checkTableExists("departments");
    const positionsTableExists = await checkTableExists("positions");
    const rolesTableExists = await checkTableExists("roles");
    const workflowCategoriesTableExists = await checkTableExists("workflow_categories");

    if (!departmentsTableExists) {
      logger.warn(
        "Departments table does not exist. Skipping department creation."
      );
    } else {
      // Create departments first
      await createDefaultDepartments(false);
      logger.info("Default departments created");
    }

    if (!positionsTableExists) {
      logger.warn(
        "Positions table does not exist. Skipping positions creation."
      );
    } else {
      // Create positions (depends on departments)
      await createDefaultPositions(false);
      logger.info("Default positions created");
    }

    if (!rolesTableExists) {
      logger.warn("Roles table does not exist. Skipping roles creation.");
    } else {
      // Create roles
      await createDefaultRoles(false);
      logger.info("Default roles created");
    }

    if (!workflowCategoriesTableExists) {
      logger.warn(
        "Workflow categories table does not exist. Skipping workflow categories creation."
      );
    } else {
      // Create workflow categories
      await createDefaultWorkflowCategories(false);
      logger.info("Default workflow categories created");
    }

    logger.info("Default data setup completed successfully");
  } catch (error) {
    logger.error("Error setting up default data:", error);
    throw error;
  }
};
