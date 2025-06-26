import { Request, ResponseToolkit } from "@hapi/hapi";
import { AppDataSource, ensureDatabaseConnection } from "../config/database";
import { Position, Department, User } from "../models";
import logger from "../utils/logger";

export const createPosition = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { name, description, departmentId, isActive, level } =
      request.payload as any;

    // Validate input
    if (!name) {
      return h.response({ message: "Position name is required" }).code(400);
    }

    // Check if position already exists with the same name in the same department
    const positionRepository = AppDataSource.getRepository(Position);

    let query: any = { name };
    if (departmentId) {
      query.departmentId = departmentId;
    }

    const existingPosition = await positionRepository.findOne({
      where: query,
    });

    if (existingPosition) {
      return h
        .response({
          message: "Position with this name already exists in this department",
        })
        .code(409);
    }

    // Validate department if provided
    let finalDepartmentId = departmentId;
    if (departmentId) {
      try {
        const departmentRepository = AppDataSource.getRepository(Department);
        const department = await departmentRepository.findOne({
          where: { id: departmentId },
        });
        if (!department) {
          logger.warn(`Department with ID ${departmentId} not found during position creation`);
          finalDepartmentId = null; // Set to null if department not found
        }
      } catch (deptError) {
        logger.error(`Error checking department ${departmentId}:`, deptError);
        finalDepartmentId = null; // Set to null if error occurs
      }
    }

    // Create new position
    const position = new Position();
    position.name = name;
    position.description = description || null;
    position.departmentId = finalDepartmentId || null;
    position.isActive = isActive !== undefined ? isActive : true;
    position.level = level !== undefined ? level : 1;

    // Save position to database
    const savedPosition = await positionRepository.save(position);

    return h
      .response({
        message: "Position created successfully",
        position: savedPosition,
      })
      .code(201);
  } catch (error) {
    logger.error(`Error in createPosition: ${error}`);
    return h
      .response({ message: "An error occurred while creating the position" })
      .code(500);
  }
};

export const getAllPositions = async (request: Request, h: ResponseToolkit) => {
  try {
    console.log("getAllPositions called");
    console.log("Request query:", request.query);
    
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();
    console.log("Database connection established");

    const { departmentId, isActive } = request.query as any;

    // Build query
    const positionRepository = AppDataSource.getRepository(Position);
    let query: any = {};

    if (departmentId) {
      query.departmentId = departmentId;
      console.log("Filtering by departmentId:", departmentId);
    }

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
      console.log("Filtering by isActive:", isActive);
    }

    console.log("Executing position query with:", { query });
    
    // Get positions
    const positions = await positionRepository.find({
      where: query,
      relations: ["department"],
      order: {
        name: "ASC",
      },
    });

    console.log(`Found ${positions.length} positions`);
    
    // Log the first few positions for debugging
    if (positions.length > 0) {
      console.log("First position:", JSON.stringify(positions[0]));
    } else {
      console.log("No positions found");
      
      // Check if there are any positions in the database
      const totalPositions = await positionRepository.count();
      console.log(`Total positions in database: ${totalPositions}`);
      
      if (totalPositions === 0) {
        // If no positions exist, create default positions
        console.log("No positions found in database, creating default positions");
        const { syncPositions } = require("../scripts/sync-positions");
        await syncPositions();
        
        // Try to fetch positions again
        const newPositions = await positionRepository.find({
          relations: ["department"],
          order: { name: "ASC" },
        });
        
        console.log(`Created ${newPositions.length} default positions`);
        
        return h
          .response({
            positions: newPositions,
            count: newPositions.length,
          })
          .code(200);
      }
    }

    return h
      .response({
        positions,
        count: positions.length,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in getAllPositions: ${error}`);
    console.error("Error fetching positions:", error);
    return h
      .response({ 
        message: "An error occurred while fetching positions",
        error: error.message 
      })
      .code(500);
  }
};

export const getPositionById = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { id } = request.params;

    // Get position
    const positionRepository = AppDataSource.getRepository(Position);
    
    try {
      const position = await positionRepository.findOne({
        where: { id },
        relations: ["department", "users"],
      });

      if (!position) {
        return h.response({ error: "Position not found" }).code(404);
      }

      // Handle case where department might be null
      if (position.departmentId && !position.department) {
        logger.warn(`Department with ID ${position.departmentId} not found for position ${position.id}`);
        // Set department to null to avoid client-side errors
        position.department = null;
      }

      return h.response(position).code(200);
    } catch (queryError) {
      logger.error(`Error in database query for position ${id}:`, queryError);
      
      // Try to get the position without relations as a fallback
      const basicPosition = await positionRepository.findOne({
        where: { id }
      });
      
      if (basicPosition) {
        logger.info(`Retrieved position ${id} without relations as fallback`);
        return h.response(basicPosition).code(200);
      } else {
        return h.response({ error: "Position not found" }).code(404);
      }
    }
  } catch (error) {
    logger.error("Error fetching position:", error);
    return h.response({ error: "Failed to fetch position" }).code(500);
  }
};

export const updatePosition = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { id } = request.params;
    const { name, description, departmentId, isActive, level } =
      request.payload as any;

    // Get position
    const positionRepository = AppDataSource.getRepository(Position);
    const position = await positionRepository.findOne({ where: { id } });

    if (!position) {
      return h.response({ error: "Position not found" }).code(404);
    }

    // Check if name and department combination is being changed and if it already exists
    if (
      (name && name !== position.name) ||
      (departmentId !== undefined && departmentId !== position.departmentId)
    ) {
      let query: any = { name: name || position.name };
      if (departmentId !== undefined) {
        query.departmentId = departmentId;
      } else if (position.departmentId) {
        query.departmentId = position.departmentId;
      }

      const existingPosition = await positionRepository.findOne({
        where: query,
      });

      if (existingPosition && existingPosition.id !== id) {
        return h
          .response({
            message:
              "Position with this name already exists in this department",
          })
          .code(409);
      }
    }

    // Validate department if provided
    let validDepartment = true;
    if (departmentId) {
      try {
        const departmentRepository = AppDataSource.getRepository(Department);
        const department = await departmentRepository.findOne({
          where: { id: departmentId },
        });
        if (!department) {
          logger.warn(`Department with ID ${departmentId} not found during position update`);
          validDepartment = false;
        }
      } catch (deptError) {
        logger.error(`Error checking department ${departmentId}:`, deptError);
        validDepartment = false;
      }
    }

    // Update position fields
    if (name) position.name = name;
    if (description !== undefined) position.description = description;
    
    // Only update departmentId if the department is valid or if it's being set to null/undefined
    if (departmentId === null || departmentId === undefined) {
      position.departmentId = null;
    } else if (validDepartment) {
      position.departmentId = departmentId;
    }
    // If department is invalid, keep the existing departmentId
    
    if (isActive !== undefined) position.isActive = isActive;
    if (level !== undefined) position.level = level;

    // Save updated position
    const updatedPosition = await positionRepository.save(position);

    return h
      .response({
        message: "Position updated successfully",
        position: updatedPosition,
      })
      .code(200);
  } catch (error) {
    logger.error("Error updating position:", error);
    return h.response({ error: "Failed to update position" }).code(500);
  }
};

export const deletePosition = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { id } = request.params;

    // Get position
    const positionRepository = AppDataSource.getRepository(Position);
    const position = await positionRepository.findOne({ where: { id } });

    if (!position) {
      return h.response({ error: "Position not found" }).code(404);
    }

    // Check if position is being used by any users
    const userRepository = AppDataSource.getRepository(User);
    const usersWithPosition = await userRepository.find({
      where: { positionId: id },
    });

    if (usersWithPosition.length > 0) {
      return h
        .response({
          message:
            "Cannot delete a position that is assigned to users. Please reassign users first.",
        })
        .code(400);
    }

    // Delete position
    await positionRepository.remove(position);

    return h
      .response({
        message: "Position deleted successfully",
      })
      .code(200);
  } catch (error) {
    logger.error("Error deleting position:", error);
    return h.response({ error: "Failed to delete position" }).code(500);
  }
};
