import { AppDataSource } from "../config/database";
import { User, UserRole, UserLevel, Gender } from "../models";
import { hashPassword } from "../utils/auth";
import logger from "../utils/logger";
import { syncEssentialData } from "./syncEssentialData";
import { ensureDefaultUsers } from "../utils/ensure-default-users";
import { createTestUser } from "./createTestUser";
import { initApprovalWorkflows } from "../config/initApprovalWorkflows";
import { setupDefaultData } from "./setupDefaultData";
import { createDefaultLeaveTypes } from "./createDefaultLeaveTypes";
import { initializeSystemRoles, updateUserRoleIds } from "../controllers/roleController";
import { initializeSystemPages } from "../controllers/pageController";
import { initializeWorkflows } from "../services/workflowInitService";

/**
 * Comprehensive system initialization script
 * This script consolidates all initialization tasks into a single function to avoid duplicate operations.
 * 
 * This script will:
 * 1. Initialize the database connection
 * 2. Ensure database schema is properly set up (columns, tables, etc.)
 * 3. Set up default data (departments, positions, roles, workflow categories)
 * 4. Initialize system roles and pages
 * 5. Create the super admin user and test user
 * 6. Ensure all default users exist
 * 7. Create default leave types
 * 8. Initialize approval workflows
 * 9. Synchronize essential data
 * 
 * This function is called once after the server has started to ensure all data is properly initialized.
 */
export const initializeSystem = async (): Promise<void> => {
  try {
    logger.info("Starting comprehensive system initialization...");

    // Initialize the database connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized");
    }

    // Ensure the maxSteps column exists in the workflow_categories table
    await ensureWorkflowCategoriesMaxStepsColumn();

    // Check if the positions table exists and has the level column
    await ensurePositionsTableHasLevelColumn();

    // Setup default data (departments, positions, roles, workflow categories)
    await setupDefaultData();

    // Initialize system roles
    await initializeSystemRoles();
    await updateUserRoleIds();
    logger.info("System roles initialized and user roleIds updated");

    // Initialize system pages
    await initializeSystemPages();
    logger.info("System pages initialized");

    // Create the super admin user
    await ensureSuperAdminExists();

    // Create the test user
    await createTestUser();

    // Ensure all default users exist
    await ensureDefaultUsers();
    logger.info("Default users created/updated");

    // Create default leave types
    await createDefaultLeaveTypes(false);
    logger.info("Default leave types created/updated");

    // Holidays creation skipped - createHolidays2025 not available
    logger.info("Holidays creation skipped");

    // Ensure workflow migration is complete
    await ensureWorkflowMigration();
    
    // Initialize approval workflows (only if none exist) - single initialization point
    await initializeWorkflows();
    logger.info("Approval workflows checked - will only be created if none exist");

    // Initialize approval workflows structure (Department-Based Approval Workflow creation has been removed)
    // This only updates existing workflows, doesn't create new ones
    await initApprovalWorkflows();
    logger.info("Approval workflow structure updated if needed");

    // Synchronize other essential data (excluding workflows)
    // We'll modify syncEssentialData to skip workflow initialization
    await syncEssentialData(false, true); // Don't close the connection, skip workflows
    logger.info("Other essential data synchronized");

    logger.info("System initialization completed successfully");
  } catch (error) {
    logger.error(`Error during system initialization: ${error}`);
    throw error;
  }
};

/**
 * Ensure the super admin user exists
 */
const ensureSuperAdminExists = async (): Promise<void> => {
  try {
    const userRepository = AppDataSource.getRepository(User);

    // Check if super admin exists
    let superAdmin = await userRepository.findOne({
      where: { email: "admin@example.com" },
    });

    if (superAdmin) {
      logger.info("Super admin already exists");
    } else {
      // Create a new super admin
      superAdmin = new User();
      superAdmin.firstName = "Super";
      superAdmin.lastName = "Admin";
      superAdmin.email = "admin@example.com";
      superAdmin.password = await hashPassword("Admin@123");
      superAdmin.role = UserRole.SUPER_ADMIN;
      superAdmin.level = UserLevel.LEVEL_4;
      superAdmin.gender = Gender.MALE;
      superAdmin.isActive = true;

      await userRepository.save(superAdmin);
      logger.info("Super admin created successfully");
    }
  } catch (error) {
    logger.error(`Error ensuring super admin exists: ${error}`);
    throw error;
  }
};

/**
 * Ensure the positions table has the level column
 */
const ensurePositionsTableHasLevelColumn = async (): Promise<void> => {
  try {
    // Check if the positions table exists
    const positionsTableExists = await checkTableExists("positions");
    
    if (!positionsTableExists) {
      logger.info("Positions table does not exist yet. It will be created by migrations.");
      return;
    }

    // Check if the level column exists
    const levelColumnExists = await checkColumnExists("positions", "level");

    if (!levelColumnExists) {
      logger.info("Level column does not exist in positions table. Adding it...");
      
      // Add the level column with default value 1
      await AppDataSource.query(`
        ALTER TABLE "positions" ADD COLUMN "level" integer NOT NULL DEFAULT 1
      `);
      
      logger.info("Level column added successfully to positions table");
    } else {
      logger.info("Level column already exists in positions table");
    }
  } catch (error) {
    logger.error(`Error ensuring positions table has level column: ${error}`);
    throw error;
  }
};

/**
 * Check if a table exists in the database
 */
const checkTableExists = async (tableName: string): Promise<boolean> => {
  try {
    const result = await AppDataSource.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = $1
      )
    `, [tableName]);
    
    return result[0].exists;
  } catch (error) {
    logger.error(`Error checking if table ${tableName} exists: ${error}`);
    return false;
  }
};

/**
 * Check if a column exists in a table
 */
const checkColumnExists = async (tableName: string, columnName: string): Promise<boolean> => {
  try {
    const result = await AppDataSource.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = $1 
        AND column_name = $2
      )
    `, [tableName, columnName]);
    
    return result[0].exists;
  } catch (error) {
    logger.error(`Error checking if column ${columnName} exists in table ${tableName}: ${error}`);
    return false;
  }
};

/**
 * Ensure the workflow_categories table has the maxSteps column
 */
const ensureWorkflowCategoriesMaxStepsColumn = async (): Promise<void> => {
  try {
    // Check if the workflow_categories table exists
    const tableExists = await checkTableExists("workflow_categories");
    
    if (!tableExists) {
      logger.info("Workflow categories table does not exist yet. It will be created by migrations.");
      return;
    }

    // Check if the maxSteps column exists
    const maxStepsColumnExists = await checkColumnExists("workflow_categories", "maxSteps");

    if (!maxStepsColumnExists) {
      logger.info("Adding maxSteps column to workflow_categories table");
      
      // Add maxSteps column with default value 3
      await AppDataSource.query(`ALTER TABLE "workflow_categories" ADD COLUMN IF NOT EXISTS "maxSteps" integer NOT NULL DEFAULT 3`);
      
      // Update existing categories with specific maxSteps values
      await AppDataSource.query(`UPDATE "workflow_categories" SET "maxSteps" = 2 WHERE "name" = 'Short Leave'`);
      await AppDataSource.query(`UPDATE "workflow_categories" SET "maxSteps" = 3 WHERE "name" = 'Medium Leave'`);
      await AppDataSource.query(`UPDATE "workflow_categories" SET "maxSteps" = 4 WHERE "name" = 'Long Leave'`);
      await AppDataSource.query(`UPDATE "workflow_categories" SET "maxSteps" = 5 WHERE "name" = 'Extended Leave'`);
      await AppDataSource.query(`UPDATE "workflow_categories" SET "maxSteps" = 6 WHERE "name" = 'Long-Term Leave'`);
      
      logger.info("Successfully added maxSteps column to workflow_categories table");
    } else {
      logger.info("maxSteps column already exists in workflow_categories table");
    }
  } catch (error) {
    logger.error(`Error ensuring workflow_categories table has maxSteps column: ${error}`);
    throw error;
  }
};

/**
 * Ensure the approval workflow migration has been applied
 */
const ensureWorkflowMigration = async (): Promise<void> => {
  try {
    // Check if the approval_workflows table exists
    const tableExists = await checkTableExists("approval_workflows");
    
    if (!tableExists) {
      logger.info("Approval workflows table does not exist yet. It will be created by migrations.");
      return;
    }

    // Check if the migration has been applied
    let workflowMigrationApplied = false;
    try {
      const result = await AppDataSource.query(
        `SELECT * FROM migrations WHERE name LIKE '%UpdateApprovalWorkflowDaysToFloat%'`
      );
      workflowMigrationApplied = result && result.length > 0;
    } catch (migrationError) {
      logger.warn("Error checking migration status:", migrationError);
      // If we can't check migrations, we'll assume it's not applied
    }

    if (!workflowMigrationApplied) {
      logger.warn("Workflow migration not yet applied. Will attempt to run the migration...");
      
      try {
        // Try to run the migration directly
        await AppDataSource.query(`
          -- First, delete any existing workflows to avoid conversion issues
          DELETE FROM "approval_workflows";
          
          -- Alter the column types from integer to float
          ALTER TABLE "approval_workflows" ALTER COLUMN "minDays" TYPE float;
          ALTER TABLE "approval_workflows" ALTER COLUMN "maxDays" TYPE float;
        `);
        
        logger.info("Successfully applied workflow column type changes.");
      } catch (migrationError) {
        logger.error("Failed to manually apply workflow column changes:", migrationError);
        logger.warn("Skipping workflow initialization until migration is properly applied");
      }
    } else {
      logger.info("Workflow migration has already been applied.");
    }
  } catch (error) {
    logger.error(`Error ensuring workflow migration: ${error}`);
    throw error;
  }
};

// Run the script if called directly
if (require.main === module) {
  initializeSystem()
    .then(() => {
      logger.info("System initialization script completed");
      process.exit(0);
    })
    .catch((error) => {
      logger.error(`Error in system initialization script: ${error}`);
      process.exit(1);
    });
}