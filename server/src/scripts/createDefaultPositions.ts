import { AppDataSource } from "../config/database";
import { Position } from "../models/Position";
import { Department } from "../models/Department";
import logger from "../utils/logger";

export const createDefaultPositions = async (closeConnection = true) => {
  try {
    const positionRepository = AppDataSource.getRepository(Position);
    const departmentRepository = AppDataSource.getRepository(Department);

    // Check if positions already exist
    const existingPositions = await positionRepository.find();
    if (existingPositions.length > 0) {
      logger.info("Positions already exist, skipping creation");
      if (closeConnection) {
        await AppDataSource.destroy();
      }
      return;
    }

    // Get all departments
    const departments = await departmentRepository.find();
    if (departments.length === 0) {
      logger.warn("No departments found. Please create departments first.");
      if (closeConnection) {
        await AppDataSource.destroy();
      }
      return;
    }
    
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

    const defaultPositions = [
      // Human Resources Positions
      {
        name: "HR Director",
        description: "Oversees all HR operations and strategic planning",
        departmentId: departments.find((d) => d.name === "Human Resources")?.id,
        level: 4,
      },
      {
        name: "HR Manager",
        description: "Manages HR team and daily HR operations",
        departmentId: departments.find((d) => d.name === "Human Resources")?.id,
        level: 3,
      },
      {
        name: "HR Specialist",
        description: "Handles recruitment, employee relations, and benefits",
        departmentId: departments.find((d) => d.name === "Human Resources")?.id,
        level: 2,
      },
      {
        name: "HR Coordinator",
        description: "Provides administrative support to HR department",
        departmentId: departments.find((d) => d.name === "Human Resources")?.id,
        level: 1,
      },

      // Information Technology Positions
      {
        name: "IT Director",
        description: "Leads IT strategy and oversees all technology operations",
        departmentId: departments.find(
          (d) => d.name === "Information Technology"
        )?.id,
        level: 4,
      },
      {
        name: "IT Manager",
        description: "Manages IT team and technology infrastructure",
        departmentId: departments.find(
          (d) => d.name === "Information Technology"
        )?.id,
        level: 3,
      },
      {
        name: "Senior Software Engineer",
        description: "Leads development projects and mentors junior developers",
        departmentId: departments.find(
          (d) => d.name === "Information Technology"
        )?.id,
        level: 2,
      },
      {
        name: "Software Engineer",
        description: "Develops and maintains software applications",
        departmentId: departments.find(
          (d) => d.name === "Information Technology"
        )?.id,
        level: 1,
      },

      // Finance Positions
      {
        name: "Finance Director",
        description: "Oversees all financial operations and strategy",
        departmentId: departments.find((d) => d.name === "Finance")?.id,
        level: 4,
      },
      {
        name: "Finance Manager",
        description: "Manages financial operations and reporting",
        departmentId: departments.find((d) => d.name === "Finance")?.id,
        level: 3,
      },
      {
        name: "Senior Accountant",
        description: "Handles complex accounting tasks and financial analysis",
        departmentId: departments.find((d) => d.name === "Finance")?.id,
        level: 2,
      },
      {
        name: "Accountant",
        description: "Manages financial records and basic accounting tasks",
        departmentId: departments.find((d) => d.name === "Finance")?.id,
        level: 1,
      },

      // Operations Positions
      {
        name: "Operations Director",
        description: "Oversees all operational activities and strategy",
        departmentId: departments.find((d) => d.name === "Operations")?.id,
        level: 4,
      },
      {
        name: "Operations Manager",
        description: "Manages daily operations and process optimization",
        departmentId: departments.find((d) => d.name === "Operations")?.id,
        level: 3,
      },
      {
        name: "Operations Supervisor",
        description: "Supervises operational staff and ensures efficiency",
        departmentId: departments.find((d) => d.name === "Operations")?.id,
        level: 2,
      },
      {
        name: "Operations Specialist",
        description: "Handles day-to-day operational tasks",
        departmentId: departments.find((d) => d.name === "Operations")?.id,
        level: 1,
      },

      // Marketing Positions
      {
        name: "Marketing Director",
        description: "Leads marketing strategy and brand development",
        departmentId: departments.find((d) => d.name === "Marketing")?.id,
        level: 4,
      },
      {
        name: "Marketing Manager",
        description: "Manages marketing campaigns and team",
        departmentId: departments.find((d) => d.name === "Marketing")?.id,
        level: 3,
      },
      {
        name: "Marketing Specialist",
        description: "Executes marketing strategies and content creation",
        departmentId: departments.find((d) => d.name === "Marketing")?.id,
        level: 2,
      },
      {
        name: "Marketing Coordinator",
        description: "Supports marketing activities and campaign execution",
        departmentId: departments.find((d) => d.name === "Marketing")?.id,
        level: 1,
      },

      // Sales Positions
      {
        name: "Sales Director",
        description: "Leads sales strategy and revenue growth",
        departmentId: departments.find((d) => d.name === "Sales")?.id,
        level: 4,
      },
      {
        name: "Sales Manager",
        description: "Manages sales team and customer relationships",
        departmentId: departments.find((d) => d.name === "Sales")?.id,
        level: 3,
      },
      {
        name: "Senior Sales Representative",
        description: "Handles key accounts and complex sales",
        departmentId: departments.find((d) => d.name === "Sales")?.id,
        level: 2,
      },
      {
        name: "Sales Representative",
        description: "Manages customer relationships and sales activities",
        departmentId: departments.find((d) => d.name === "Sales")?.id,
        level: 1,
      },
    ];

    // Filter out the level property if the column doesn't exist
    const positionsToSave = defaultPositions.map(pos => {
      const position = {
        name: pos.name,
        description: pos.description,
        departmentId: pos.departmentId,
        isActive: true
      };
      
      // Only include level if the column exists
      if (hasLevelColumn) {
        position['level'] = pos.level || 1;
      }
      
      return position;
    });
    
    await positionRepository.save(positionsToSave);
    logger.info("Default positions created successfully");

    if (closeConnection) {
      await AppDataSource.destroy();
    }
  } catch (error) {
    logger.error("Error creating default positions:", error);
    if (closeConnection) {
      await AppDataSource.destroy();
    }
    throw error;
  }
};
