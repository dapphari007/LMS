import { AppDataSource, ensureDatabaseConnection } from "../config/database";
import { Position, Department } from "../models";
import logger from "../utils/logger";

/**
 * Default positions to create if none exist in the database
 * Each position can be associated with a department by name
 */
const DEFAULT_POSITIONS = [
  // HR Department positions
  {
    name: "HR Director",
    description: "Oversees all HR operations and strategic planning",
    departmentName: "Human Resources",
    isActive: true,
    level: 4,
  },
  {
    name: "HR Manager",
    description: "Manages the HR department and oversees all HR functions",
    departmentName: "Human Resources",
    isActive: true,
    level: 3,
  },
  {
    name: "HR Specialist",
    description: "Handles specific HR functions like recruitment or employee relations",
    departmentName: "Human Resources",
    isActive: true,
    level: 2,
  },
  {
    name: "HR Coordinator",
    description: "Provides administrative support to HR department",
    departmentName: "Human Resources",
    isActive: true,
    level: 1,
  },
  {
    name: "Recruiter",
    description: "Responsible for sourcing and hiring new talent",
    departmentName: "Human Resources",
    isActive: true,
    level: 2,
  },
  
  // IT Department positions
  {
    name: "IT Director",
    description: "Oversees all IT operations and strategy",
    departmentName: "Information Technology",
    isActive: true,
    level: 4,
  },
  {
    name: "IT Manager",
    description: "Manages IT team and technology infrastructure",
    departmentName: "Information Technology",
    isActive: true,
    level: 3,
  },
  {
    name: "Senior Software Engineer",
    description: "Leads development projects and mentors junior developers",
    departmentName: "Information Technology",
    isActive: true,
    level: 3,
  },
  {
    name: "Software Engineer",
    description: "Develops and maintains software applications",
    departmentName: "Information Technology",
    isActive: true,
    level: 2,
  },
  {
    name: "Junior Software Engineer",
    description: "Assists in software development under supervision",
    departmentName: "Information Technology",
    isActive: true,
    level: 1,
  },
  {
    name: "System Administrator",
    description: "Manages and maintains IT infrastructure",
    departmentName: "Information Technology",
    isActive: true,
    level: 2,
  },
  {
    name: "QA Engineer",
    description: "Tests software for quality assurance",
    departmentName: "Information Technology",
    isActive: true,
    level: 2,
  },
  
  // Finance Department positions
  {
    name: "Finance Director",
    description: "Oversees all financial operations and strategy",
    departmentName: "Finance",
    isActive: true,
    level: 4,
  },
  {
    name: "Finance Manager",
    description: "Oversees financial operations and reporting",
    departmentName: "Finance",
    isActive: true,
    level: 3,
  },
  {
    name: "Senior Accountant",
    description: "Handles complex accounting tasks and financial analysis",
    departmentName: "Finance",
    isActive: true,
    level: 2,
  },
  {
    name: "Accountant",
    description: "Manages accounting and financial records",
    departmentName: "Finance",
    isActive: true,
    level: 1,
  },
  {
    name: "Financial Analyst",
    description: "Analyzes financial data and provides insights",
    departmentName: "Finance",
    isActive: true,
    level: 2,
  },
  
  // Marketing Department positions
  {
    name: "Marketing Director",
    description: "Leads marketing strategy and campaigns",
    departmentName: "Marketing",
    isActive: true,
    level: 4,
  },
  {
    name: "Marketing Manager",
    description: "Manages marketing campaigns and team",
    departmentName: "Marketing",
    isActive: true,
    level: 3,
  },
  {
    name: "Marketing Specialist",
    description: "Implements marketing campaigns and initiatives",
    departmentName: "Marketing",
    isActive: true,
    level: 2,
  },
  {
    name: "Marketing Coordinator",
    description: "Supports marketing activities and campaign execution",
    departmentName: "Marketing",
    isActive: true,
    level: 1,
  },
  {
    name: "Content Creator",
    description: "Creates content for marketing materials",
    departmentName: "Marketing",
    isActive: true,
    level: 2,
  },
  
  // Operations Department positions
  {
    name: "Operations Director",
    description: "Oversees all operational activities and strategy",
    departmentName: "Operations",
    isActive: true,
    level: 4,
  },
  {
    name: "Operations Manager",
    description: "Oversees day-to-day business operations",
    departmentName: "Operations",
    isActive: true,
    level: 3,
  },
  {
    name: "Operations Supervisor",
    description: "Supervises operational staff and ensures efficiency",
    departmentName: "Operations",
    isActive: true,
    level: 2,
  },
  {
    name: "Operations Specialist",
    description: "Handles day-to-day operational tasks",
    departmentName: "Operations",
    isActive: true,
    level: 1,
  },
  {
    name: "Project Manager",
    description: "Manages projects from initiation to completion",
    departmentName: "Operations",
    isActive: true,
    level: 3,
  },
  
  // Sales Department positions
  {
    name: "Sales Director",
    description: "Leads sales strategy and team",
    departmentName: "Sales",
    isActive: true,
    level: 4,
  },
  {
    name: "Sales Manager",
    description: "Manages sales team and customer relationships",
    departmentName: "Sales",
    isActive: true,
    level: 3,
  },
  {
    name: "Senior Sales Representative",
    description: "Handles key accounts and complex sales",
    departmentName: "Sales",
    isActive: true,
    level: 2,
  },
  {
    name: "Sales Representative",
    description: "Sells products or services to customers",
    departmentName: "Sales",
    isActive: true,
    level: 1,
  },
  {
    name: "Account Manager",
    description: "Manages relationships with existing clients",
    departmentName: "Sales",
    isActive: true,
    level: 2,
  },
  
  // R&D Department positions
  {
    name: "Research Director",
    description: "Leads research and development initiatives",
    departmentName: "Research & Development",
    isActive: true,
    level: 4,
  },
  {
    name: "Research Manager",
    description: "Manages research teams and projects",
    departmentName: "Research & Development",
    isActive: true,
    level: 3,
  },
  {
    name: "Senior Researcher",
    description: "Conducts advanced research and leads research projects",
    departmentName: "Research & Development",
    isActive: true,
    level: 2,
  },
  {
    name: "Product Developer",
    description: "Develops new products and features",
    departmentName: "Research & Development",
    isActive: true,
    level: 2,
  },
  {
    name: "Research Assistant",
    description: "Assists with research activities and data collection",
    departmentName: "Research & Development",
    isActive: true,
    level: 1,
  },
  
  // Customer Support Department positions
  {
    name: "Support Director",
    description: "Oversees all customer support operations",
    departmentName: "Customer Support",
    isActive: true,
    level: 4,
  },
  {
    name: "Support Manager",
    description: "Manages customer support operations",
    departmentName: "Customer Support",
    isActive: true,
    level: 3,
  },
  {
    name: "Senior Support Specialist",
    description: "Handles complex customer issues and mentors junior staff",
    departmentName: "Customer Support",
    isActive: true,
    level: 2,
  },
  {
    name: "Customer Support Specialist",
    description: "Provides direct support to customers",
    departmentName: "Customer Support",
    isActive: true,
    level: 1,
  },
];

/**
 * Synchronizes positions in the database
 * If no positions exist, creates default positions
 */
export const syncPositions = async (): Promise<void> => {
  try {
    // Ensure database connection
    await ensureDatabaseConnection();

    const positionRepository = AppDataSource.getRepository(Position);
    const departmentRepository = AppDataSource.getRepository(Department);
    
    // Check if any positions exist
    const positionCount = await positionRepository.count();
    
    // Check if level column exists in the positions table
    let hasLevelColumn = false;
    try {
      // Try to get the metadata for the Position entity
      const positionMetadata = AppDataSource.getMetadata(Position);
      hasLevelColumn = positionMetadata.columns.some(column => column.propertyName === 'level');
      logger.info(`Level column ${hasLevelColumn ? 'exists' : 'does not exist'} in positions table`);
    } catch (error) {
      logger.warn("Could not check if level column exists:", error);
    }
    
    if (positionCount === 0) {
      logger.info("No positions found in database. Creating default positions...");
      
      // Get all departments to map names to IDs
      const departments = await departmentRepository.find();
      const departmentMap = new Map<string, string>();
      
      departments.forEach(dept => {
        departmentMap.set(dept.name, dept.id);
      });
      
      // Create default positions
      const positionsToCreate = [];
      
      for (const pos of DEFAULT_POSITIONS) {
        const position = new Position();
        position.name = pos.name;
        position.description = pos.description;
        position.isActive = pos.isActive;
        
        // Only set level if the column exists
        if (hasLevelColumn) {
          position.level = pos.level || 1; // Default to level 1 if not specified
        }
        
        // Set department ID if the department exists
        if (pos.departmentName && departmentMap.has(pos.departmentName)) {
          position.departmentId = departmentMap.get(pos.departmentName);
        }
        
        positionsToCreate.push(position);
      }
      
      // Save positions to database
      await positionRepository.save(positionsToCreate);
      
      logger.info(`Successfully created ${positionsToCreate.length} default positions`);
    } else {
      logger.info(`Found ${positionCount} existing positions. No synchronization needed.`);
    }
  } catch (error) {
    logger.error("Error synchronizing positions:", error);
    throw error;
  }
};

// Allow running this script directly
if (require.main === module) {
  syncPositions()
    .then(() => {
      logger.info("Position synchronization completed");
      process.exit(0);
    })
    .catch(error => {
      logger.error("Position synchronization failed:", error);
      process.exit(1);
    });
}