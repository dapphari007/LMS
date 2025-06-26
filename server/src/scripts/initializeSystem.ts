import { AppDataSource } from "../config/database";
import { User, UserRole, UserLevel, Gender } from "../models";
import { hashPassword } from "../utils/auth";
import logger from "../utils/logger";
import { syncEssentialData } from "./syncEssentialData";
import { ensureDefaultUsers } from "../utils/ensure-default-users";
import { createTestUser } from "./createTestUser";
import { setupDefaultData } from "./setupDefaultData";
import { createDefaultLeaveTypes } from "./createDefaultLeaveTypes";
import { initializeSystemRoles, updateUserRoleIds } from "../controllers/roleController";
import { initializeSystemPages } from "../controllers/pageController";
import { initializeWorkflows } from "../services/workflowInitService";

export const initializeSystem = async (): Promise<void> => {
  try {
    // Ensure required columns and tables exist in parallel
    await Promise.all([
      ensureWorkflowCategoriesMaxStepsColumn(),
      ensurePositionsTableHasLevelColumn()
    ]);

    // Setup default data and system roles/pages in parallel
    await Promise.all([
      setupDefaultData(),
      (async () => {
        await initializeSystemRoles();
        await updateUserRoleIds();
      })(),
      initializeSystemPages()
    ]);

    // Create users in parallel
    await Promise.all([
      ensureSuperAdminExists(),
      createTestUser(),
      ensureDefaultUsers()
    ]);

    // Create default leave types and ensure workflow migration
    await Promise.all([
      createDefaultLeaveTypes(false),
      ensureWorkflowMigration()
    ]);

    // Initialize approval workflows and sync essential data
    await initializeWorkflows();
    await syncEssentialData(false, true);

    logger.info("System initialization completed successfully");
  } catch (error) {
    logger.error(`Error during system initialization: ${error}`);
    throw error;
  }
};

const ensureSuperAdminExists = async (): Promise<void> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    let superAdmin = await userRepository.findOne({ where: { email: "admin@example.com" } });
    if (!superAdmin) {
      superAdmin = userRepository.create({
        firstName: "Super",
        lastName: "Admin",
        email: "admin@example.com",
        password: await hashPassword("Admin@123"),
        role: UserRole.SUPER_ADMIN,
        level: UserLevel.LEVEL_4,
        gender: Gender.MALE,
        isActive: true
      });
      await userRepository.save(superAdmin);
      logger.info("Super admin created successfully");
    } else {
      logger.info("Super admin already exists");
    }
  } catch (error) {
    logger.error(`Error ensuring super admin exists: ${error}`);
    throw error;
  }
};

const ensurePositionsTableHasLevelColumn = async (): Promise<void> => {
  try {
    if (!(await checkTableExists("positions"))) {
      logger.info("Positions table does not exist yet. It will be created by migrations.");
      return;
    }
    if (!(await checkColumnExists("positions", "level"))) {
      logger.info("Level column does not exist in positions table. Adding it...");
      await AppDataSource.query(`ALTER TABLE "positions" ADD COLUMN "level" integer NOT NULL DEFAULT 1`);
      logger.info("Level column added successfully to positions table");
    } else {
    }
  } catch (error) {
    logger.error(`Error ensuring positions table has level column: ${error}`);
    throw error;
  }
};

const checkTableExists = async (tableName: string): Promise<boolean> => {
  try {
    const result = await AppDataSource.query(
      `SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = $1
      ) AS "exists"`, [tableName]
    );
    return result[0]?.exists ?? false;
  } catch (error) {
    logger.error(`Error checking if table ${tableName} exists: ${error}`);
    return false;
  }
};

const checkColumnExists = async (tableName: string, columnName: string): Promise<boolean> => {
  try {
    const result = await AppDataSource.query(
      `SELECT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = $1 
        AND column_name = $2
      ) AS "exists"`, [tableName, columnName]
    );
    return result[0]?.exists ?? false;
  } catch (error) {
    logger.error(`Error checking if column ${columnName} exists in table ${tableName}: ${error}`);
    return false;
  }
};

const ensureWorkflowCategoriesMaxStepsColumn = async (): Promise<void> => {
  try {
    if (!(await checkTableExists("workflow_categories"))) {
      logger.info("Workflow categories table does not exist yet. It will be created by migrations.");
      return;
    }
    if (!(await checkColumnExists("workflow_categories", "maxSteps"))) {
      await AppDataSource.query(`ALTER TABLE "workflow_categories" ADD COLUMN IF NOT EXISTS "maxSteps" integer NOT NULL DEFAULT 3`);
      const updates = [
        { name: 'Short Leave', steps: 2 },
        { name: 'Medium Leave', steps: 3 },
        { name: 'Long Leave', steps: 4 },
        { name: 'Extended Leave', steps: 5 },
        { name: 'Long-Term Leave', steps: 6 }
      ];
      await Promise.all(updates.map(u =>
        AppDataSource.query(`UPDATE "workflow_categories" SET "maxSteps" = $1 WHERE "name" = $2`, [u.steps, u.name])
      ));
      logger.info("Successfully added maxSteps column to workflow_categories table");
    }
  } catch (error) {
    logger.error(`Error ensuring workflow_categories table has maxSteps column: ${error}`);
    throw error;
  }
};

const ensureWorkflowMigration = async (): Promise<void> => {
  try {
    if (!(await checkTableExists("approval_workflows"))) {
      logger.info("Approval workflows table does not exist yet. It will be created by migrations.");
      return;
    }
    let workflowMigrationApplied = false;
    try {
      const result = await AppDataSource.query(
        `SELECT * FROM migrations WHERE name LIKE '%UpdateApprovalWorkflowDaysToFloat%'`
      );
      workflowMigrationApplied = result && result.length > 0;
    } catch (migrationError) {
      logger.warn("Error checking migration status:", migrationError);
    }
    if (!workflowMigrationApplied) {
      logger.warn("Workflow migration not yet applied. Will attempt to run the migration...");
      try {
        await AppDataSource.query(`
          DELETE FROM "approval_workflows";
          ALTER TABLE "approval_workflows" ALTER COLUMN "minDays" TYPE float;
          ALTER TABLE "approval_workflows" ALTER COLUMN "maxDays" TYPE float;
        `);
        logger.info("Successfully applied workflow column type changes.");
      } catch (migrationError) {
        logger.error("Failed to manually apply workflow column changes:", migrationError);
        logger.warn("Skipping workflow initialization until migration is properly applied");
      }
    } else {
    }
  } catch (error) {
    logger.error(`Error ensuring workflow migration: ${error}`);
    throw error;
  }
};

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