import { Request, ResponseToolkit } from "@hapi/hapi";
import { AppDataSource, ensureDatabaseConnection } from "../config/database";
import { ApprovalWorkflow } from "../models";
import { UserRole } from "../models/User";
import logger from "../utils/logger";

/**
 * Get all approval workflows
 */
export const getAllWorkflows = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const workflowRepository = AppDataSource.getRepository(ApprovalWorkflow);
    const workflows = await workflowRepository.find({
      order: {
        minDays: "ASC",
        createdAt: "DESC",
      },
    });

    return h.response({
      workflows,
      count: workflows.length,
    }).code(200);
  } catch (error) {
    logger.error(`Error in getAllWorkflows: ${error}`);
    return h.response({
      message: "An error occurred while fetching workflows",
    }).code(500);
  }
};

/**
 * Get a workflow by ID
 */
export const getWorkflowById = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { id } = request.params;
    const workflowRepository = AppDataSource.getRepository(ApprovalWorkflow);
    const workflow = await workflowRepository.findOne({
      where: { id },
    });

    if (!workflow) {
      return h.response({ message: "Workflow not found" }).code(404);
    }

    return h.response({ workflow }).code(200);
  } catch (error) {
    logger.error(`Error in getWorkflowById: ${error}`);
    return h.response({
      message: "An error occurred while fetching the workflow",
    }).code(500);
  }
};

/**
 * Create a new workflow
 */
export const createWorkflow = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { name, minDays, maxDays, approvalLevels, isActive } = request.payload as any;

    // Validate input
    if (!name || minDays === undefined || maxDays === undefined || !approvalLevels) {
      return h.response({
        message: "Name, minDays, maxDays, and approvalLevels are required",
      }).code(400);
    }

    // Validate approval levels
    if (!Array.isArray(approvalLevels) || approvalLevels.length === 0) {
      return h.response({
        message: "approvalLevels must be a non-empty array",
      }).code(400);
    }

    for (const level of approvalLevels) {
      if (!level.level || !Array.isArray(level.roles) || level.roles.length === 0) {
        return h.response({
          message: "Each approval level must have a level number and at least one role",
        }).code(400);
      }
    }

    // Check if a workflow with the same name already exists
    const workflowRepository = AppDataSource.getRepository(ApprovalWorkflow);
    const existingWorkflow = await workflowRepository.findOne({
      where: { name },
    });

    if (existingWorkflow) {
      return h.response({
        message: "A workflow with this name already exists",
      }).code(409);
    }

    // Create new workflow
    const workflow = new ApprovalWorkflow();
    workflow.name = name;
    workflow.minDays = minDays;
    workflow.maxDays = maxDays;
    workflow.approvalLevels = approvalLevels;
    workflow.isActive = isActive !== undefined ? isActive : true;

    // Save workflow
    const savedWorkflow = await workflowRepository.save(workflow);

    return h.response({
      message: "Workflow created successfully",
      workflow: savedWorkflow,
    }).code(201);
  } catch (error) {
    logger.error(`Error in createWorkflow: ${error}`);
    return h.response({
      message: "An error occurred while creating the workflow",
    }).code(500);
  }
};

/**
 * Update a workflow
 */
export const updateWorkflow = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { id } = request.params;
    const { name, minDays, maxDays, approvalLevels, isActive } = request.payload as any;

    // Validate input
    if (!name && minDays === undefined && maxDays === undefined && !approvalLevels && isActive === undefined) {
      return h.response({
        message: "At least one field to update is required",
      }).code(400);
    }

    // Get workflow
    const workflowRepository = AppDataSource.getRepository(ApprovalWorkflow);
    const workflow = await workflowRepository.findOne({
      where: { id },
    });

    if (!workflow) {
      return h.response({ message: "Workflow not found" }).code(404);
    }

    // Update workflow fields
    if (name !== undefined) workflow.name = name;
    if (minDays !== undefined) workflow.minDays = minDays;
    if (maxDays !== undefined) workflow.maxDays = maxDays;
    if (isActive !== undefined) workflow.isActive = isActive;

    // Update approval levels if provided
    if (approvalLevels !== undefined) {
      // Validate approval levels
      if (!Array.isArray(approvalLevels) || approvalLevels.length === 0) {
        return h.response({
          message: "approvalLevels must be a non-empty array",
        }).code(400);
      }

      for (const level of approvalLevels) {
        if (!level.level || !Array.isArray(level.roles) || level.roles.length === 0) {
          return h.response({
            message: "Each approval level must have a level number and at least one role",
          }).code(400);
        }
      }

      workflow.approvalLevels = approvalLevels;
    }

    // Save updated workflow
    const updatedWorkflow = await workflowRepository.save(workflow);

    return h.response({
      message: "Workflow updated successfully",
      workflow: updatedWorkflow,
    }).code(200);
  } catch (error) {
    logger.error(`Error in updateWorkflow: ${error}`);
    return h.response({
      message: "An error occurred while updating the workflow",
    }).code(500);
  }
};

/**
 * Delete a workflow
 */
export const deleteWorkflow = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { id } = request.params;

    // Get workflow
    const workflowRepository = AppDataSource.getRepository(ApprovalWorkflow);
    const workflow = await workflowRepository.findOne({
      where: { id },
    });

    if (!workflow) {
      return h.response({ message: "Workflow not found" }).code(404);
    }

    // Delete workflow
    await workflowRepository.remove(workflow);

    return h.response({
      message: "Workflow deleted successfully",
    }).code(200);
  } catch (error) {
    logger.error(`Error in deleteWorkflow: ${error}`);
    return h.response({
      message: "An error occurred while deleting the workflow",
    }).code(500);
  }
};

/**
 * Reset workflows to default
 * This will delete all existing workflows and recreate the default ones
 */
export const resetWorkflows = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    // Get all workflows
    const workflowRepository = AppDataSource.getRepository(ApprovalWorkflow);
    const workflows = await workflowRepository.find();

    // Delete all workflows
    if (workflows.length > 0) {
      await workflowRepository.remove(workflows);
    }

    // Create default workflows
    const defaultWorkflows = [
      {
        name: "Standard Approval Workflow",
        minDays: 1,
        maxDays: 3,
        approvalLevels: [
          {
            level: 1,
            roles: [UserRole.TEAM_LEAD, UserRole.MANAGER]
          }
        ],
        isActive: true
      },
      {
        name: "Extended Approval Workflow",
        minDays: 4,
        maxDays: 7,
        approvalLevels: [
          {
            level: 1,
            roles: [UserRole.TEAM_LEAD]
          },
          {
            level: 2,
            roles: [UserRole.MANAGER]
          }
        ],
        isActive: true
      },
      {
        name: "Long Leave Approval Workflow",
        minDays: 8,
        maxDays: 999, // No upper limit
        approvalLevels: [
          {
            level: 1,
            roles: [UserRole.TEAM_LEAD]
          },
          {
            level: 2,
            roles: [UserRole.MANAGER]
          },
          {
            level: 3,
            roles: [UserRole.HR]
          }
        ],
        isActive: true
      }
    ];

    for (const workflowData of defaultWorkflows) {
      const workflow = workflowRepository.create(workflowData);
      await workflowRepository.save(workflow);
    }

    return h.response({
      message: "Workflows reset to default successfully",
    }).code(200);
  } catch (error) {
    logger.error(`Error in resetWorkflows: ${error}`);
    return h.response({
      message: "An error occurred while resetting workflows",
    }).code(500);
  }
};