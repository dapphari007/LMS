import { Request, ResponseToolkit } from "@hapi/hapi";
import { AppDataSource, ensureDatabaseConnection } from "../config/database";
import { Department, User } from "../models";
import logger from "../utils/logger";

export const createDepartment = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    console.log("createDepartment called with payload:", request.payload);
    
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();
    console.log("Database connection established");

    const { name, description, managerId, isActive } = request.payload as any;
    console.log("Parsed payload:", { name, description, managerId, isActive });

    // Validate input
    if (!name) {
      console.log("Validation failed: Department name is required");
      return h.response({ message: "Department name is required" }).code(400);
    }

    // Check if department already exists
    const departmentRepository = AppDataSource.getRepository(Department);
    console.log("Checking if department already exists with name:", name);
    
    const existingDepartment = await departmentRepository.findOne({
      where: { name },
    });

    if (existingDepartment) {
      console.log("Department already exists:", existingDepartment);
      return h
        .response({ message: "Department with this name already exists" })
        .code(409);
    }

    // Validate manager if provided
    if (managerId) {
      console.log("Validating manager with ID:", managerId);
      const userRepository = AppDataSource.getRepository(User);
      const manager = await userRepository.findOne({
        where: { id: managerId },
      });
      
      if (!manager) {
        console.log("Manager not found with ID:", managerId);
        return h.response({ message: "Manager not found" }).code(404);
      }
      
      console.log("Manager found:", manager);
    }

    // Create new department
    console.log("Creating new department");
    const department = new Department();
    department.name = name;
    department.description = description || null;
    department.managerId = managerId || null;
    department.isActive = isActive !== undefined ? isActive : true;

    console.log("Department object created:", department);

    // Save department to database
    console.log("Saving department to database");
    const savedDepartment = await departmentRepository.save(department);
    console.log("Department saved successfully:", savedDepartment);

    return h
      .response({
        message: "Department created successfully",
        department: savedDepartment,
      })
      .code(201);
  } catch (error) {
    console.error("Error creating department:", error);
    
    // Log detailed error information
    if (error instanceof Error) {
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    
    logger.error(`Error in createDepartment: ${error}`);
    return h
      .response({ 
        message: "An error occurred while creating the department",
        error: error instanceof Error ? error.message : String(error)
      })
      .code(500);
  }
};

export const getAllDepartments = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    console.log("getAllDepartments called with query:", request.query);
    
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();
    console.log("Database connection established");

    const { isActive } = request.query as any;

    // Build query
    const departmentRepository = AppDataSource.getRepository(Department);
    let query: any = {};

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
      console.log("Filtering by isActive:", isActive);
    }

    console.log("Executing department query with:", { query });
    
    // Get departments
    const departments = await departmentRepository.find({
      where: query,
      relations: ["manager"],
      order: {
        name: "ASC",
      },
    });

    console.log(`Found ${departments.length} departments`);
    
    // Log the first few departments for debugging
    if (departments.length > 0) {
      console.log("First department:", JSON.stringify(departments[0]));
    } else {
      console.log("No departments found");
    }

    return h
      .response({
        departments,
        count: departments.length,
      })
      .code(200);
  } catch (error) {
    console.error("Error fetching departments:", error);
    
    // Log detailed error information
    if (error instanceof Error) {
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    
    logger.error(`Error in getAllDepartments: ${error}`);
    return h
      .response({ 
        message: "An error occurred while fetching departments",
        error: error instanceof Error ? error.message : String(error)
      })
      .code(500);
  }
};

export const getDepartmentById = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { id } = request.params;
    console.log(`Getting department by ID: ${id}`);

    // Get department
    const departmentRepository = AppDataSource.getRepository(Department);
    
    try {
      const department = await departmentRepository.findOne({
        where: { id },
        relations: ["manager", "users", "positions"],
      });

      if (!department) {
        console.log(`Department with ID ${id} not found`);
        return h.response({ error: "Department not found" }).code(404);
      }

      // Handle case where manager might be null
      if (department.managerId && !department.manager) {
        console.log(`Manager with ID ${department.managerId} not found for department ${department.id}`);
        // Set manager to null to avoid client-side errors
        department.manager = null;
      }

      console.log(`Successfully retrieved department: ${department.name}`);
      return h.response(department).code(200);
    } catch (queryError) {
      console.error(`Error in database query for department ${id}:`, queryError);
      
      // Try to get the department without relations as a fallback
      try {
        const basicDepartment = await departmentRepository.findOne({
          where: { id }
        });
        
        if (basicDepartment) {
          console.log(`Retrieved department ${id} without relations as fallback`);
          return h.response(basicDepartment).code(200);
        } else {
          return h.response({ error: "Department not found" }).code(404);
        }
      } catch (fallbackError) {
        console.error(`Fallback query also failed:`, fallbackError);
        throw fallbackError; // Re-throw to be caught by outer catch
      }
    }
  } catch (error) {
    console.error("Error fetching department:", error);
    logger.error(`Error in getDepartmentById: ${error}`);
    return h.response({ 
      error: "Failed to fetch department",
      message: error instanceof Error ? error.message : String(error)
    }).code(500);
  }
};

export const updateDepartment = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { id } = request.params;
    const { name, description, managerId, isActive } = request.payload as any;
    
    console.log(`Updating department ${id} with:`, { name, description, managerId, isActive });

    // Get department
    const departmentRepository = AppDataSource.getRepository(Department);
    const department = await departmentRepository.findOne({ where: { id } });

    if (!department) {
      console.log(`Department with ID ${id} not found during update`);
      return h.response({ error: "Department not found" }).code(404);
    }

    // Check if name is being changed and if it already exists
    if (name && name !== department.name) {
      console.log(`Checking if department name "${name}" already exists`);
      const existingDepartment = await departmentRepository.findOne({
        where: { name },
      });
      if (existingDepartment && existingDepartment.id !== id) {
        console.log(`Department with name "${name}" already exists`);
        return h
          .response({ message: "Department with this name already exists" })
          .code(409);
      }
    }

    // Validate manager if provided
    let validManager = true;
    if (managerId) {
      try {
        console.log(`Validating manager with ID: ${managerId}`);
        const userRepository = AppDataSource.getRepository(User);
        const manager = await userRepository.findOne({
          where: { id: managerId },
        });
        if (!manager) {
          console.log(`Manager with ID ${managerId} not found`);
          validManager = false;
        } else {
          console.log(`Manager found: ${manager.id}`);
        }
      } catch (managerError) {
        console.error(`Error checking manager ${managerId}:`, managerError);
        validManager = false;
      }
    }

    // Update department fields
    if (name) department.name = name;
    if (description !== undefined) department.description = description;
    
    // Only update managerId if the manager is valid or if it's being set to null/undefined
    if (managerId === null || managerId === undefined) {
      department.managerId = null;
    } else if (validManager) {
      department.managerId = managerId;
    }
    // If manager is invalid, keep the existing managerId
    
    if (isActive !== undefined) department.isActive = isActive;

    // Save updated department
    console.log(`Saving updated department: ${department.name}`);
    const updatedDepartment = await departmentRepository.save(department);
    console.log(`Department updated successfully: ${updatedDepartment.id}`);

    return h
      .response({
        message: "Department updated successfully",
        department: updatedDepartment,
      })
      .code(200);
  } catch (error) {
    console.error("Error updating department:", error);
    logger.error(`Error in updateDepartment: ${error}`);
    return h.response({ 
      error: "Failed to update department",
      message: error instanceof Error ? error.message : String(error)
    }).code(500);
  }
};

export const deleteDepartment = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { id } = request.params;

    // Get department
    const departmentRepository = AppDataSource.getRepository(Department);
    const department = await departmentRepository.findOne({ where: { id } });

    if (!department) {
      return h.response({ error: "Department not found" }).code(404);
    }

    // Check if department is being used by any users
    const userRepository = AppDataSource.getRepository(User);
    const usersInDepartment = await userRepository.find({
      where: { departmentId: id },
    });

    if (usersInDepartment.length > 0) {
      return h
        .response({
          message:
            "Cannot delete a department that has users assigned to it. Please reassign users first.",
        })
        .code(400);
    }

    // Delete department
    await departmentRepository.remove(department);

    return h
      .response({
        message: "Department deleted successfully",
      })
      .code(200);
  } catch (error) {
    logger.error("Error deleting department:", error);
    return h.response({ error: "Failed to delete department" }).code(500);
  }
};
