import { Request, ResponseToolkit } from "@hapi/hapi";
import { AppDataSource } from "../config/database";
import { ApprovalWorkflow, UserRole } from "../models";
import logger from "../utils/logger";
import { LessThanOrEqual, MoreThanOrEqual, Not } from "typeorm";

// Default approval workflows configuration
export const DEFAULT_APPROVAL_WORKFLOWS = [
  {
    name: "Short Leave (0.5-2 days)",
    minDays: 0.5,
    maxDays: 2,
    approvalLevels: [
      {
        level: 1, // L-1 (Team Lead)
        approverType: "teamLead",
        fallbackRoles: [UserRole.TEAM_LEAD],
      },
    ],
  },
  {
    name: "Medium Leave (3-5 days)",
    minDays: 3,
    maxDays: 5,
    approvalLevels: [
      {
        level: 1, // L-1 (Team Lead)
        approverType: "teamLead",
        fallbackRoles: [UserRole.TEAM_LEAD],
      },
      {
        level: 2, // L-2 (Manager)
        approverType: "manager",
        fallbackRoles: [UserRole.MANAGER],
      },
    ],
  },
  {
    name: "Long Leave (6-10 days)",
    minDays: 6,
    maxDays: 10,
    approvalLevels: [
      {
        level: 1, // L-1 (Team Lead)
        approverType: "teamLead",
        fallbackRoles: [UserRole.TEAM_LEAD],
      },
      {
        level: 2, // L-2 (Manager)
        approverType: "manager",
        fallbackRoles: [UserRole.MANAGER],
      },
      {
        level: 3, // L-3 (HR)
        approverType: "hr",
        fallbackRoles: [UserRole.HR],
      },
    ],
  },
  {
    name: "Extended Leave (11-20 days)",
    minDays: 11,
    maxDays: 20,
    approvalLevels: [
      {
        level: 1, // L-1 (Team Lead)
        approverType: "teamLead",
        fallbackRoles: [UserRole.TEAM_LEAD],
      },
      {
        level: 2, // L-2 (Manager)
        approverType: "manager",
        fallbackRoles: [UserRole.MANAGER],
      },
      {
        level: 3, // L-3 (HR)
        approverType: "hr",
        fallbackRoles: [UserRole.HR],
      },
      {
        level: 4, // L-4 (Super Admin)
        approverType: "superAdmin",
        fallbackRoles: [UserRole.SUPER_ADMIN],
      },
    ],
  },
  {
    name: "Long-Term Leave (21+ days)",
    minDays: 21,
    maxDays: 365,
    approvalLevels: [
      {
        level: 1, // L-1 (Team Lead)
        approverType: "teamLead",
        fallbackRoles: [UserRole.TEAM_LEAD],
      },
      {
        level: 2, // L-2 (Manager)
        approverType: "manager",
        fallbackRoles: [UserRole.MANAGER],
      },
      {
        level: 3, // L-3 (HR)
        approverType: "hr",
        fallbackRoles: [UserRole.HR],
      },
      {
        level: 4, // L-4 (Super Admin)
        approverType: "superAdmin",
        fallbackRoles: [UserRole.SUPER_ADMIN],
      },
    ],
  },
];

export const createApprovalWorkflow = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    const { name, minDays, maxDays, approvalLevels, isActive } =
      request.payload as any;

    // Validate input
    if (
      !name ||
      minDays === undefined ||
      maxDays === undefined ||
      !approvalLevels
    ) {
      return h
        .response({
          message: "Name, minDays, maxDays, and approvalLevels are required",
        })
        .code(400);
    }

    if (minDays < 0 || maxDays < 0) {
      return h
        .response({ message: "minDays and maxDays must be non-negative" })
        .code(400);
    }
    
    // Validate that minDays is either a whole number or 0.5 (half day)
    if (minDays !== Math.floor(minDays) && minDays !== 0.5) {
      return h
        .response({ message: "minDays must be either a whole number or 0.5 for half-day" })
        .code(400);
    }

    if (minDays > maxDays) {
      return h
        .response({ message: "minDays cannot be greater than maxDays" })
        .code(400);
    }

    if (!Array.isArray(approvalLevels) || approvalLevels.length === 0) {
      return h
        .response({ message: "approvalLevels must be a non-empty array" })
        .code(400);
    }

    // Validate approval levels
    for (const level of approvalLevels) {
      if (
        !level.level ||
        !level.roles ||
        !Array.isArray(level.roles) ||
        level.roles.length === 0
      ) {
        return h
          .response({
            message:
              "Each approval level must have a level number and non-empty roles array",
          })
          .code(400);
      }

      for (const role of level.roles) {
        if (!Object.values(UserRole).includes(role)) {
          return h.response({ message: `Invalid role: ${role}` }).code(400);
        }
      }
    }

    // Check for overlapping workflows
    const approvalWorkflowRepository =
      AppDataSource.getRepository(ApprovalWorkflow);
    const overlappingWorkflows = await approvalWorkflowRepository.find({
      where: [
        {
          minDays: LessThanOrEqual(maxDays),
          maxDays: MoreThanOrEqual(minDays),
        },
      ],
    });

    if (overlappingWorkflows.length > 0) {
      return h
        .response({
          message: "This workflow overlaps with an existing workflow",
        })
        .code(409);
    }

    // Create new approval workflow
    const approvalWorkflow = new ApprovalWorkflow();
    approvalWorkflow.name = name;
    approvalWorkflow.minDays = minDays;
    approvalWorkflow.maxDays = maxDays;

    // Ensure approvalLevels is stored as a proper JSON object, not a string
    // This prevents issues with double-stringification
    approvalWorkflow.approvalLevels = Array.isArray(approvalLevels)
      ? approvalLevels.map((level) => ({
          level: level.level,
          roles: Array.isArray(level.roles) ? level.roles : [level.roles],
        }))
      : approvalLevels;

    approvalWorkflow.isActive = isActive !== undefined ? isActive : true;

    // Save approval workflow to database
    const savedApprovalWorkflow = await approvalWorkflowRepository.save(
      approvalWorkflow
    );

    return h
      .response({
        message: "Approval workflow created successfully",
        approvalWorkflow: savedApprovalWorkflow,
      })
      .code(201);
  } catch (error) {
    logger.error(`Error in createApprovalWorkflow: ${error}`);
    return h
      .response({
        message: "An error occurred while creating the approval workflow",
      })
      .code(500);
  }
};

export const getAllApprovalWorkflows = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    const { isActive } = request.query as any;

    // Build query
    const approvalWorkflowRepository =
      AppDataSource.getRepository(ApprovalWorkflow);
    let query: any = {};

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    // Get approval workflows
    const approvalWorkflows = await approvalWorkflowRepository.find({
      where: query,
      order: {
        minDays: "ASC",
      },
    });

    return h
      .response({
        approvalWorkflows,
        count: approvalWorkflows.length,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in getAllApprovalWorkflows: ${error}`);
    return h
      .response({
        message: "An error occurred while fetching approval workflows",
      })
      .code(500);
  }
};

export const getApprovalWorkflowById = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    const { id } = request.params;

    // Get approval workflow
    const approvalWorkflowRepository =
      AppDataSource.getRepository(ApprovalWorkflow);
    const approvalWorkflow = await approvalWorkflowRepository.findOne({
      where: { id },
    });

    if (!approvalWorkflow) {
      return h.response({ message: "Approval workflow not found" }).code(404);
    }

    return h
      .response({
        approvalWorkflow,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in getApprovalWorkflowById: ${error}`);
    return h
      .response({
        message: "An error occurred while fetching the approval workflow",
      })
      .code(500);
  }
};

export const updateApprovalWorkflow = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    const { id } = request.params;
    const { name, minDays, maxDays, approvalLevels, isActive } =
      request.payload as any;

    // Get approval workflow
    const approvalWorkflowRepository =
      AppDataSource.getRepository(ApprovalWorkflow);
    const approvalWorkflow = await approvalWorkflowRepository.findOne({
      where: { id },
    });

    if (!approvalWorkflow) {
      return h.response({ message: "Approval workflow not found" }).code(404);
    }

    // Validate approval levels if provided
    if (approvalLevels) {
      if (!Array.isArray(approvalLevels) || approvalLevels.length === 0) {
        return h
          .response({ message: "approvalLevels must be a non-empty array" })
          .code(400);
      }

      for (const level of approvalLevels) {
        if (
          !level.level ||
          !level.roles ||
          !Array.isArray(level.roles) ||
          level.roles.length === 0
        ) {
          return h
            .response({
              message:
                "Each approval level must have a level number and non-empty roles array",
            })
            .code(400);
        }

        for (const role of level.roles) {
          // Skip validation for user IDs (which might not be in UserRole enum)
          if (typeof role === 'string' && role.length > 10) {
            continue; // Likely a UUID, skip validation
          }
          
          if (!Object.values(UserRole).includes(role)) {
            return h.response({ message: `Invalid role: ${role}` }).code(400);
          }
        }
      }
    }

    // Check for overlapping workflows if changing min/max days
    if (
      (minDays !== undefined && minDays !== approvalWorkflow.minDays) ||
      (maxDays !== undefined && maxDays !== approvalWorkflow.maxDays)
    ) {
      const newMinDays =
        minDays !== undefined ? minDays : approvalWorkflow.minDays;
      const newMaxDays =
        maxDays !== undefined ? maxDays : approvalWorkflow.maxDays;

      if (newMinDays < 0 || newMaxDays < 0) {
        return h
          .response({ message: "minDays and maxDays must be non-negative" })
          .code(400);
      }
      
      // Validate that minDays is either a whole number or 0.5 (half day)
      if (newMinDays !== Math.floor(newMinDays) && newMinDays !== 0.5) {
        return h
          .response({ message: "minDays must be either a whole number or 0.5 for half-day" })
          .code(400);
      }

      if (newMinDays > newMaxDays) {
        return h
          .response({ message: "minDays cannot be greater than maxDays" })
          .code(400);
      }

      const overlappingWorkflows = await approvalWorkflowRepository.find({
        where: [
          {
            id: Not(id),
            minDays: LessThanOrEqual(newMaxDays),
            maxDays: MoreThanOrEqual(newMinDays),
          },
        ],
      });

      if (overlappingWorkflows.length > 0) {
        return h
          .response({
            message: "This workflow would overlap with an existing workflow",
          })
          .code(409);
      }
    }

    // Update approval workflow fields
    if (name) approvalWorkflow.name = name;
    if (minDays !== undefined) approvalWorkflow.minDays = minDays;
    if (maxDays !== undefined) approvalWorkflow.maxDays = maxDays;

    // Ensure approvalLevels is stored as a proper JSON object, not a string
    if (approvalLevels) {
      approvalWorkflow.approvalLevels = Array.isArray(approvalLevels)
        ? approvalLevels.map((level) => ({
            level: level.level,
            roles: Array.isArray(level.roles) ? level.roles : [level.roles],
          }))
        : approvalLevels;
    }

    if (isActive !== undefined) approvalWorkflow.isActive = isActive;

    // Save updated approval workflow
    const updatedApprovalWorkflow = await approvalWorkflowRepository.save(
      approvalWorkflow
    );

    return h
      .response({
        message: "Approval workflow updated successfully",
        approvalWorkflow: updatedApprovalWorkflow,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in updateApprovalWorkflow: ${error}`);
    return h
      .response({
        message: "An error occurred while updating the approval workflow",
      })
      .code(500);
  }
};

export const deleteApprovalWorkflow = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    const { id } = request.params;

    // Get approval workflow
    const approvalWorkflowRepository =
      AppDataSource.getRepository(ApprovalWorkflow);
    const approvalWorkflow = await approvalWorkflowRepository.findOne({
      where: { id },
    });

    if (!approvalWorkflow) {
      return h.response({ message: "Approval workflow not found" }).code(404);
    }

    // Delete approval workflow
    await approvalWorkflowRepository.remove(approvalWorkflow);

    return h
      .response({
        message: "Approval workflow deleted successfully",
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in deleteApprovalWorkflow: ${error}`);
    return h
      .response({
        message: "An error occurred while deleting the approval workflow",
      })
      .code(500);
  }
};

/**
 * Initialize default approval workflows with team lead at L-1 and multi-level approvals
 * based on leave days
 */
export const initializeDefaultApprovalWorkflows = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    const approvalWorkflowRepository =
      AppDataSource.getRepository(ApprovalWorkflow);

    // Check if there are existing workflows
    const existingWorkflows = await approvalWorkflowRepository.find();

    // If there are existing workflows, delete them first
    if (existingWorkflows.length > 0) {
      await approvalWorkflowRepository.remove(existingWorkflows);
    }

    // Create default approval workflows
    const createdWorkflows = [];

    for (const workflowConfig of DEFAULT_APPROVAL_WORKFLOWS) {
      const workflow = new ApprovalWorkflow();
      workflow.name = workflowConfig.name;
      workflow.minDays = workflowConfig.minDays;
      workflow.maxDays = workflowConfig.maxDays;
      workflow.approvalLevels = workflowConfig.approvalLevels;
      workflow.isActive = true;

      const savedWorkflow = await approvalWorkflowRepository.save(workflow);
      createdWorkflows.push(savedWorkflow);
    }

    return h
      .response({
        message: "Default approval workflows initialized successfully",
        workflows: createdWorkflows,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in initializeDefaultApprovalWorkflows: ${error}`);
    return h
      .response({
        message:
          "An error occurred while initializing default approval workflows",
        error: error.message,
      })
      .code(500);
  }
};
