import { AppDataSource } from "../config/database";
import { Department } from "../models";
import logger from "../utils/logger";

/**
 * Default departments to create if none exist in the database
 */
const DEFAULT_DEPARTMENTS = [
  {
    name: "Human Resources",
    description: "Responsible for recruiting, onboarding, and employee relations",
    isActive: true,
  },
  {
    name: "Information Technology",
    description: "Manages IT infrastructure, software development, and technical support",
    isActive: true,
  },
  {
    name: "Finance",
    description: "Handles accounting, budgeting, and financial reporting",
    isActive: true,
  },
  {
    name: "Marketing",
    description: "Manages brand strategy, marketing campaigns, and communications",
    isActive: true,
  },
  {
    name: "Operations",
    description: "Oversees day-to-day business operations and logistics",
    isActive: true,
  },
  {
    name: "Sales",
    description: "Responsible for business development and customer acquisition",
    isActive: true,
  },
  {
    name: "Research & Development",
    description: "Focuses on innovation and product development",
    isActive: true,
  },
  {
    name: "Customer Support",
    description: "Provides assistance and support to customers",
    isActive: true,
  },
];

/**
 * Synchronizes departments in the database
 * If no departments exist, creates default departments
 */
export const syncDepartments = async (): Promise<void> => {
  try {
    // Ensure database connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const departmentRepository = AppDataSource.getRepository(Department);
    
    // Check if any departments exist
    const departmentCount = await departmentRepository.count();
    
    if (departmentCount === 0) {
      logger.info("No departments found in database. Creating default departments...");
      
      // Create default departments
      const departmentsToCreate = DEFAULT_DEPARTMENTS.map(dept => {
        const department = new Department();
        department.name = dept.name;
        department.description = dept.description;
        department.isActive = dept.isActive;
        return department;
      });
      
      // Save departments to database
      await departmentRepository.save(departmentsToCreate);
      
      logger.info(`Successfully created ${departmentsToCreate.length} default departments`);
    } else {
      logger.info(`Found ${departmentCount} existing departments. No synchronization needed.`);
    }
  } catch (error) {
    logger.error("Error synchronizing departments:", error);
    throw error;
  }
};

// Allow running this script directly
if (require.main === module) {
  syncDepartments()
    .then(() => {
      logger.info("Department synchronization completed");
      process.exit(0);
    })
    .catch(error => {
      logger.error("Department synchronization failed:", error);
      process.exit(1);
    });
}