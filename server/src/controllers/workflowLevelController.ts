import { Request, ResponseToolkit } from "@hapi/hapi";
import { AppDataSource, ensureDatabaseConnection } from "../config/database";
import { WorkflowLevel, UserRole } from "../models";
import logger from "../utils/logger";

// Default workflow levels configuration
export const DEFAULT_WORKFLOW_LEVELS = [
  {
    level: 1,
    approverType: "teamLead",
    fallbackRoles: [UserRole.TEAM_LEAD],
    isActive: true
  },
  {
    level: 2,
    approverType: "manager",
    fallbackRoles: [UserRole.MANAGER],
    isActive: true
  },
  {
    level: 3,
    approverType: "hr",
    fallbackRoles: [UserRole.HR],
    isActive: true
  },
  {
    level: 4,
    approverType: "superAdmin",
    fallbackRoles: [UserRole.SUPER_ADMIN],
    isActive: true
  }
];

/**
 * Get all workflow levels
 */
export const getAllWorkflowLevels = async (request: Request, h: ResponseToolkit) => {
  try {
    await ensureDatabaseConnection();

    const { isActive } = request.query as any;

    // Build query
    const workflowLevelRepository = AppDataSource.getRepository(WorkflowLevel);
    let query: any = {};

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    // Get workflow levels
    const workflowLevels = await workflowLevelRepository.find({
      where: query,
      order: {
        level: "ASC"
      }
    });

    return h.response({
      workflowLevels,
      count: workflowLevels.length
    }).code(200);
  } catch (error) {
    logger.error(`Error in getAllWorkflowLevels: ${error}`);
    return h.response({
      message: "An error occurred while fetching workflow levels"
    }).code(500);
  }
};

/**
 * Get a workflow level by ID
 */
export const getWorkflowLevelById = async (request: Request, h: ResponseToolkit) => {
  try {
    await ensureDatabaseConnection();

    const { id } = request.params;
    const workflowLevelRepository = AppDataSource.getRepository(WorkflowLevel);
    const workflowLevel = await workflowLevelRepository.findOne({
      where: { id }
    });

    if (!workflowLevel) {
      return h.response({ message: "Workflow level not found" }).code(404);
    }

    return h.response({
      workflowLevel
    }).code(200);
  } catch (error) {
    logger.error(`Error in getWorkflowLevelById: ${error}`);
    return h.response({
      message: "An error occurred while fetching the workflow level"
    }).code(500);
  }
};

/**
 * Create a new workflow level
 */
export const createWorkflowLevel = async (request: Request, h: ResponseToolkit) => {
  try {
    await ensureDatabaseConnection();

    const { level, approverType, fallbackRoles, isActive } = request.payload as any;

    // Validate input
    if (!level || !approverType || !fallbackRoles) {
      return h.response({
        message: "Level, approverType, and fallbackRoles are required"
      }).code(400);
    }

    if (level < 1) {
      return h.response({
        message: "Level must be a positive integer"
      }).code(400);
    }

    if (!Array.isArray(fallbackRoles) || fallbackRoles.length === 0) {
      return h.response({
        message: "fallbackRoles must be a non-empty array"
      }).code(400);
    }

    // Check if a level with the same number already exists
    const workflowLevelRepository = AppDataSource.getRepository(WorkflowLevel);
    const existingLevel = await workflowLevelRepository.findOne({
      where: { level }
    });

    if (existingLevel) {
      return h.response({
        message: `A workflow level with number ${level} already exists`
      }).code(409);
    }

    // Create new workflow level
    const workflowLevel = new WorkflowLevel();
    workflowLevel.level = level;
    workflowLevel.approverType = approverType;
    workflowLevel.fallbackRoles = fallbackRoles;
    workflowLevel.isActive = isActive !== undefined ? isActive : true;

    // Save workflow level
    const savedWorkflowLevel = await workflowLevelRepository.save(workflowLevel);

    return h.response({
      message: "Workflow level created successfully",
      workflowLevel: savedWorkflowLevel
    }).code(201);
  } catch (error) {
    logger.error(`Error in createWorkflowLevel: ${error}`);
    return h.response({
      message: "An error occurred while creating the workflow level"
    }).code(500);
  }
};

/**
 * Update a workflow level
 */
export const updateWorkflowLevel = async (request: Request, h: ResponseToolkit) => {
  try {
    await ensureDatabaseConnection();

    const { id } = request.params;
    const { level, approverType, fallbackRoles, isActive } = request.payload as any;

    // Validate input
    if (!level && !approverType && !fallbackRoles && isActive === undefined) {
      return h.response({
        message: "At least one field to update is required"
      }).code(400);
    }

    if (level !== undefined && level < 1) {
      return h.response({
        message: "Level must be a positive integer"
      }).code(400);
    }

    if (fallbackRoles !== undefined && (!Array.isArray(fallbackRoles) || fallbackRoles.length === 0)) {
      return h.response({
        message: "fallbackRoles must be a non-empty array"
      }).code(400);
    }

    // Get workflow level
    const workflowLevelRepository = AppDataSource.getRepository(WorkflowLevel);
    const workflowLevel = await workflowLevelRepository.findOne({
      where: { id }
    });

    if (!workflowLevel) {
      return h.response({ message: "Workflow level not found" }).code(404);
    }

    // Check if the new level number conflicts with an existing one
    if (level !== undefined && level !== workflowLevel.level) {
      const existingLevel = await workflowLevelRepository.findOne({
        where: { level }
      });

      if (existingLevel && existingLevel.id !== id) {
        return h.response({
          message: `A workflow level with number ${level} already exists`
        }).code(409);
      }
    }

    // Update workflow level fields
    if (level !== undefined) workflowLevel.level = level;
    if (approverType !== undefined) workflowLevel.approverType = approverType;
    if (fallbackRoles !== undefined) workflowLevel.fallbackRoles = fallbackRoles;
    if (isActive !== undefined) workflowLevel.isActive = isActive;

    // Save updated workflow level
    const updatedWorkflowLevel = await workflowLevelRepository.save(workflowLevel);

    return h.response({
      message: "Workflow level updated successfully",
      workflowLevel: updatedWorkflowLevel
    }).code(200);
  } catch (error) {
    logger.error(`Error in updateWorkflowLevel: ${error}`);
    return h.response({
      message: "An error occurred while updating the workflow level"
    }).code(500);
  }
};

/**
 * Delete a workflow level
 */
export const deleteWorkflowLevel = async (request: Request, h: ResponseToolkit) => {
  try {
    await ensureDatabaseConnection();

    const { id } = request.params;

    // Get workflow level
    const workflowLevelRepository = AppDataSource.getRepository(WorkflowLevel);
    const workflowLevel = await workflowLevelRepository.findOne({
      where: { id }
    });

    if (!workflowLevel) {
      return h.response({ message: "Workflow level not found" }).code(404);
    }

    // Delete workflow level
    await workflowLevelRepository.remove(workflowLevel);

    return h.response({
      message: "Workflow level deleted successfully"
    }).code(200);
  } catch (error) {
    logger.error(`Error in deleteWorkflowLevel: ${error}`);
    return h.response({
      message: "An error occurred while deleting the workflow level"
    }).code(500);
  }
};

/**
 * Toggle workflow level status
 */
export const toggleWorkflowLevelStatus = async (request: Request, h: ResponseToolkit) => {
  try {
    await ensureDatabaseConnection();

    const { id } = request.params;

    // Get workflow level
    const workflowLevelRepository = AppDataSource.getRepository(WorkflowLevel);
    const workflowLevel = await workflowLevelRepository.findOne({
      where: { id }
    });

    if (!workflowLevel) {
      return h.response({ message: "Workflow level not found" }).code(404);
    }

    // Toggle status
    workflowLevel.isActive = !workflowLevel.isActive;

    // Save updated workflow level
    const updatedWorkflowLevel = await workflowLevelRepository.save(workflowLevel);

    return h.response({
      message: `Workflow level ${updatedWorkflowLevel.isActive ? 'activated' : 'deactivated'} successfully`,
      workflowLevel: updatedWorkflowLevel
    }).code(200);
  } catch (error) {
    logger.error(`Error in toggleWorkflowLevelStatus: ${error}`);
    return h.response({
      message: "An error occurred while toggling the workflow level status"
    }).code(500);
  }
};

/**
 * Reset workflow levels to default
 */
export const resetWorkflowLevelsToDefault = async (request: Request, h: ResponseToolkit) => {
  try {
    await ensureDatabaseConnection();

    // Get all workflow levels
    const workflowLevelRepository = AppDataSource.getRepository(WorkflowLevel);
    const workflowLevels = await workflowLevelRepository.find();

    // Delete all workflow levels
    if (workflowLevels.length > 0) {
      await workflowLevelRepository.remove(workflowLevels);
    }

    // Create default workflow levels
    for (const levelData of DEFAULT_WORKFLOW_LEVELS) {
      const workflowLevel = workflowLevelRepository.create(levelData);
      await workflowLevelRepository.save(workflowLevel);
    }

    return h.response({
      message: "Workflow levels reset to default successfully"
    }).code(200);
  } catch (error) {
    logger.error(`Error in resetWorkflowLevelsToDefault: ${error}`);
    return h.response({
      message: "An error occurred while resetting workflow levels"
    }).code(500);
  }
};

/**
 * Get active workflow levels for approval workflow creation
 */
export const getWorkflowLevelsForApprovalWorkflow = async (request: Request, h: ResponseToolkit) => {
  try {
    await ensureDatabaseConnection();

    // Get active workflow levels
    const workflowLevelRepository = AppDataSource.getRepository(WorkflowLevel);
    const workflowLevels = await workflowLevelRepository.find({
      where: { isActive: true },
      order: { level: "ASC" }
    });

    // Format the response for the approval workflow creation page
    const formattedLevels = workflowLevels.map(level => ({
      level: level.level,
      approverType: level.approverType,
      fallbackRoles: level.fallbackRoles,
      name: getApproverTypeName(level.approverType),
      description: getApproverTypeDescription(level.approverType)
    }));

    return h.response({
      workflowLevels: formattedLevels,
      count: formattedLevels.length
    }).code(200);
  } catch (error) {
    logger.error(`Error in getWorkflowLevelsForApprovalWorkflow: ${error}`);
    return h.response({
      message: "An error occurred while fetching workflow levels for approval workflow"
    }).code(500);
  }
};

// Helper function to get approver type name
const getApproverTypeName = (approverType: string): string => {
  switch (approverType) {
    case "teamLead":
      return "Team Lead";
    case "manager":
      return "Manager";
    case "hr":
      return "HR";
    case "superAdmin":
      return "Super Admin";
    case "departmentHead":
      return "Department Head";
    case "specificUser":
      return "Specific User";
    default:
      return approverType;
  }
};

// Helper function to get approver type description
const getApproverTypeDescription = (approverType: string): string => {
  switch (approverType) {
    case "teamLead":
      return "The team lead of the employee requesting leave";
    case "manager":
      return "The manager of the employee requesting leave";
    case "hr":
      return "HR personnel responsible for leave management";
    case "superAdmin":
      return "System administrator with highest level of access";
    case "departmentHead":
      return "Head of the department the employee belongs to";
    case "specificUser":
      return "A specific user selected for approval";
    default:
      return "";
  }
};