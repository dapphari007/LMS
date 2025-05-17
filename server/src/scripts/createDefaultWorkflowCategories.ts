import { AppDataSource } from "../config/database";
import { WorkflowCategory } from "../models";
import logger from "../utils/logger";

// Default workflow categories that match the approval workflows
const DEFAULT_WORKFLOW_CATEGORIES = [
  {
    name: "Short Leave",
    description: "For short leaves between 0.5 to 2 days",
    minDays: 0.5,
    maxDays: 2,
    maxSteps: 2,
    isActive: true,
  },
  {
    name: "Medium Leave",
    description: "For medium-length leaves between 3 to 5 days",
    minDays: 3,
    maxDays: 5,
    maxSteps: 3,
    isActive: true,
  },
  {
    name: "Long Leave",
    description: "For longer leaves between 6 to 10 days",
    minDays: 6,
    maxDays: 10,
    maxSteps: 4,
    isActive: true,
  },
  {
    name: "Extended Leave",
    description: "For extended leaves between 11 to 20 days",
    minDays: 11,
    maxDays: 20,
    maxSteps: 5,
    isActive: true,
  },
  {
    name: "Long-Term Leave",
    description: "For long-term leaves of 21 days or more",
    minDays: 21,
    maxDays: 365,
    maxSteps: 6,
    isActive: true,
  },
];

/**
 * Create default workflow categories if they don't exist
 * @param closeConnection Whether to close the database connection after execution
 */
export const createDefaultWorkflowCategories = async (
  closeConnection: boolean = true
): Promise<void> => {
  try {
    logger.info("Checking for default workflow categories...");

    // Initialize database connection if not already initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized");
    }
    
    // Check if the maxSteps column exists, and add it if it doesn't
    try {
      const queryRunner = AppDataSource.createQueryRunner();
      await queryRunner.connect();
      
      try {
        const table = await queryRunner.getTable("workflow_categories");
        if (table) {
          const maxStepsColumn = table.findColumnByName("maxSteps");
          
          if (!maxStepsColumn) {
            logger.info("Adding maxSteps column to workflow_categories table");
            
            // Add maxSteps column with default value 3
            await queryRunner.query(`ALTER TABLE "workflow_categories" ADD COLUMN IF NOT EXISTS "maxSteps" integer NOT NULL DEFAULT 3`);
            
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
        }
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      logger.error("Error checking/adding maxSteps column:", error);
    }

    const workflowCategoryRepository =
      AppDataSource.getRepository(WorkflowCategory);

    // Check if any workflow categories already exist
    const existingCategories = await workflowCategoryRepository.find();

    if (existingCategories.length > 0) {
      logger.info(
        `Found ${existingCategories.length} existing workflow categories. Checking for missing categories...`
      );

      // Create only the missing categories
      for (const categoryData of DEFAULT_WORKFLOW_CATEGORIES) {
        const existingCategory = existingCategories.find(
          (cat) => cat.name === categoryData.name
        );

        if (!existingCategory) {
          try {
            // Check for overlapping categories
            const overlappingCategories = await workflowCategoryRepository.find({
              where: [
                {
                  minDays: categoryData.minDays,
                  maxDays: categoryData.maxDays,
                },
              ],
            });

            if (overlappingCategories.length > 0) {
              logger.warn(
                `Skipping creation of category "${categoryData.name}" as it overlaps with existing categories`
              );
              continue;
            }

            // Create the missing category
            const category = new WorkflowCategory();
            category.name = categoryData.name;
            category.description = categoryData.description;
            category.minDays = categoryData.minDays;
            category.maxDays = categoryData.maxDays;
            category.maxSteps = categoryData.maxSteps || 3; // Default to 3 if not specified
            category.isActive = categoryData.isActive;

            await workflowCategoryRepository.save(category);
            logger.info(`Created workflow category: ${categoryData.name}`);
          } catch (error) {
            logger.error(
              `Error creating workflow category ${categoryData.name}:`,
              error
            );
          }
        }
      }
    } else {
      logger.info("No existing workflow categories found. Creating defaults...");

      // Create all default categories
      for (const categoryData of DEFAULT_WORKFLOW_CATEGORIES) {
        try {
          const category = new WorkflowCategory();
          category.name = categoryData.name;
          category.description = categoryData.description;
          category.minDays = categoryData.minDays;
          category.maxDays = categoryData.maxDays;
          category.maxSteps = categoryData.maxSteps || 3; // Default to 3 if not specified
          category.isActive = categoryData.isActive;

          await workflowCategoryRepository.save(category);
          logger.info(`Created workflow category: ${categoryData.name}`);
        } catch (error) {
          logger.error(
            `Error creating workflow category ${categoryData.name}:`,
            error
          );
        }
      }
    }

    logger.info("Default workflow categories setup completed");

    // Close the database connection if requested
    if (closeConnection && AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      logger.info("Database connection closed");
    }
  } catch (error) {
    logger.error("Error creating default workflow categories:", error);
    
    // Close the database connection if requested
    if (closeConnection && AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
    
    throw error;
  }
};

// Run the script if called directly
if (require.main === module) {
  createDefaultWorkflowCategories()
    .then(() => {
      logger.info("Default workflow categories script completed");
      process.exit(0);
    })
    .catch((error) => {
      logger.error("Error in default workflow categories script:", error);
      process.exit(1);
    });
}