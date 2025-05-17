import { AppDataSource } from "../config/database";
import { MigrationInterface, QueryRunner } from "typeorm";
import logger from "../utils/logger";

/**
 * Migration to add maxSteps column to workflow_categories table
 */
const addMaxStepsColumnMigration: MigrationInterface = {
  name: "AddMaxStepsToWorkflowCategory",
  
  async up(queryRunner: QueryRunner): Promise<void> {
    try {
      // Check if the column already exists
      const tableColumns = await queryRunner.getTable("workflow_categories");
      const maxStepsColumn = tableColumns?.findColumnByName("maxSteps");
      
      if (!maxStepsColumn) {
        logger.info("Adding maxSteps column to workflow_categories table");
        
        // Add maxSteps column with default value 3
        await queryRunner.query(`ALTER TABLE "workflow_categories" ADD "maxSteps" integer NOT NULL DEFAULT 3`);
        
        // Update existing categories with specific maxSteps values
        await queryRunner.query(`UPDATE "workflow_categories" SET "maxSteps" = 2 WHERE "name" = 'Short Leave'`);
        await queryRunner.query(`UPDATE "workflow_categories" SET "maxSteps" = 3 WHERE "name" = 'Medium Leave'`);
        await queryRunner.query(`UPDATE "workflow_categories" SET "maxSteps" = 4 WHERE "name" = 'Long Leave'`);
        await queryRunner.query(`UPDATE "workflow_categories" SET "maxSteps" = 5 WHERE "name" = 'Extended Leave'`);
        await queryRunner.query(`UPDATE "workflow_categories" SET "maxSteps" = 6 WHERE "name" = 'Long-Term Leave'`);
        
        logger.info("Successfully added maxSteps column to workflow_categories table");
      } else {
        logger.info("maxSteps column already exists in workflow_categories table");
      }
    } catch (error) {
      logger.error("Error adding maxSteps column:", error);
      throw error;
    }
  },
  
  async down(queryRunner: QueryRunner): Promise<void> {
    try {
      // Check if the column exists
      const tableColumns = await queryRunner.getTable("workflow_categories");
      const maxStepsColumn = tableColumns?.findColumnByName("maxSteps");
      
      if (maxStepsColumn) {
        logger.info("Removing maxSteps column from workflow_categories table");
        
        // Remove the maxSteps column
        await queryRunner.query(`ALTER TABLE "workflow_categories" DROP COLUMN "maxSteps"`);
        
        logger.info("Successfully removed maxSteps column from workflow_categories table");
      } else {
        logger.info("maxSteps column does not exist in workflow_categories table");
      }
    } catch (error) {
      logger.error("Error removing maxSteps column:", error);
      throw error;
    }
  }
};

/**
 * Run the migration to add maxSteps column
 */
const runAddMaxStepsColumnMigration = async (): Promise<void> => {
  try {
    // Initialize database connection if not already initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized for migration");
    }
    
    // Create a query runner
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      // Run the migration
      await addMaxStepsColumnMigration.up(queryRunner);
      
      // Commit the transaction
      await queryRunner.commitTransaction();
      logger.info("Migration completed successfully");
    } catch (error) {
      // Rollback the transaction if there's an error
      await queryRunner.rollbackTransaction();
      logger.error("Error in migration transaction:", error);
      throw error;
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
    logger.error("Error running migration:", error);
    
    // Close the database connection if it's still open
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
    
    throw error;
  }
};

// Run the migration if this script is executed directly
if (require.main === module) {
  runAddMaxStepsColumnMigration()
    .then(() => {
      logger.info("Migration script completed");
      process.exit(0);
    })
    .catch((error) => {
      logger.error("Migration script failed:", error);
      process.exit(1);
    });
}