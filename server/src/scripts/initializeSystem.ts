import { AppDataSource } from "../config/database";
import { User, UserRole, UserLevel, Gender } from "../models";
import { hashPassword } from "../utils/auth";
import logger from "../utils/logger";
import { syncEssentialData } from "./syncEssentialData";
import { ensureDefaultUsers } from "../utils/ensure-default-users";
import { createTestUser } from "./createTestUser";
import { initApprovalWorkflows } from "../config/initApprovalWorkflows";

/**
 * Comprehensive system initialization script
 * This script will:
 * 1. Initialize the database connection
 * 2. Run all migrations
 * 3. Create the super admin user
 * 4. Create the test user
 * 5. Ensure all default users exist
 * 6. Synchronize essential data (roles, departments, positions)
 * 7. Fix the positions table level column if needed
 */
export const initializeSystem = async (): Promise<void> => {
  try {
    logger.info("Starting system initialization...");

    // Initialize the database connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized");
    }

    // Check if the positions table exists and has the level column
    await ensurePositionsTableHasLevelColumn();

    // Create the super admin user
    await ensureSuperAdminExists();

    // Create the test user
    await createTestUser();

    // Ensure all default users exist
    await ensureDefaultUsers();

    // Synchronize essential data
    await syncEssentialData(false); // Don't close the connection

    // Initialize department-specific approval workflows
    await initApprovalWorkflows();

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