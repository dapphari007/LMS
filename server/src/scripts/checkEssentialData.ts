import { AppDataSource, ensureDatabaseConnection } from "../config/database";
import { Role, ApprovalWorkflow } from "../models";
import logger from "../utils/logger";

/**
 * Script to check the current status of essential data (roles and approval workflows)
 * This can be run independently to verify the database state
 */
export const checkEssentialData = async (closeConnection = true) => {
  try {
    logger.info("Checking essential data in the database...");
    
    // Ensure database connection
    await ensureDatabaseConnection();
    
    // Check roles
    await checkRoles();
    
    // Check approval workflows
    await checkApprovalWorkflows();
    
    logger.info("Essential data check completed");
    
    // Close connection if requested
    if (closeConnection && AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      logger.info("Database connection closed");
    }
  } catch (error) {
    logger.error(`Error during essential data check: ${error}`);
    
    // Ensure connection is closed on error
    if (closeConnection && AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
    
    throw error;
  }
};

/**
 * Check roles in the database
 */
const checkRoles = async (): Promise<void> => {
  try {
    logger.info("Checking roles...");
    
    // Check if roles table exists
    const tableExists = await checkTableExists("roles");
    if (!tableExists) {
      logger.warn("Roles table does not exist");
      return;
    }
    
    const roleRepository = AppDataSource.getRepository(Role);
    const roles = await roleRepository.find({
      order: {
        isSystem: "DESC",
        name: "ASC"
      }
    });
    
    if (roles.length === 0) {
      logger.warn("No roles found in the database");
    } else {
      logger.info(`Found ${roles.length} roles:`);
      roles.forEach((role, index) => {
        logger.info(`${index + 1}. ${role.name} ${role.isSystem ? '(System)' : ''}`);
      });
    }
  } catch (error) {
    logger.error(`Error checking roles: ${error}`);
  }
};

/**
 * Check approval workflows in the database
 */
const checkApprovalWorkflows = async (): Promise<void> => {
  try {
    logger.info("Checking approval workflows...");
    
    // Check if approval_workflows table exists
    const tableExists = await checkTableExists("approval_workflows");
    if (!tableExists) {
      logger.warn("Approval workflows table does not exist");
      return;
    }
    
    const workflowRepository = AppDataSource.getRepository(ApprovalWorkflow);
    const workflows = await workflowRepository.find({
      order: {
        minDays: "ASC"
      }
    });
    
    if (workflows.length === 0) {
      logger.warn("No approval workflows found in the database");
    } else {
      logger.info(`Found ${workflows.length} approval workflows:`);
      workflows.forEach((workflow, index) => {
        logger.info(`${index + 1}. ${workflow.name} (${workflow.minDays}-${workflow.maxDays} days)`);
      });
    }
  } catch (error) {
    logger.error(`Error checking approval workflows: ${error}`);
  }
};

/**
 * Check if a table exists in the database
 */
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
    logger.error(`Error checking if table ${tableName} exists: ${error}`);
    return false;
  }
};

// Run the script if called directly
if (require.main === module) {
  checkEssentialData()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error("Error:", error);
      process.exit(1);
    });
}