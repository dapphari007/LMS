import { Request, ResponseToolkit } from "@hapi/hapi";
import { AppDataSource, ensureDatabaseConnection } from "../config/database";
import { ApprovalWorkflow, UserRole, WorkflowLevel, WorkflowCategory } from "../models";
import logger from "../utils/logger";
import { getActiveWorkflowLevels } from "../services/workflowLevelService";
import { LessThanOrEqual, MoreThanOrEqual, Not } from "typeorm";
import { getApprovalWorkflowForDuration as getWorkflowForDuration } from "../services/approvalWorkflowService";

// Helper function to normalize role values to match UserRole enum values
const normalizeRole = (role: string): string => {
  if (typeof role !== 'string') return role;
  
  // If it's a UUID or other non-role string, return as is
  if (role.length > 10) return role;
  
  // Handle the case where the input is the enum key (e.g., "TEAM_LEAD")
  // We need to convert it to the enum value (e.g., "team_lead")
  if (role === role.toUpperCase()) {
    // It's likely an uppercase enum key
    const enumKey = Object.keys(UserRole).find(
      key => key.toUpperCase() === role.toUpperCase()
    );
    if (enumKey) {
      return UserRole[enumKey as keyof typeof UserRole];
    }
  }
  
  // Check if it's already a valid enum value
  const enumValues = Object.values(UserRole);
  if (enumValues.includes(role as UserRole)) {
    return role;
  }
  
  // Try to find a matching enum value (case-insensitive)
  const matchingValue = enumValues.find(
    value => value.toLowerCase() === role.toLowerCase()
  );
  if (matchingValue) {
    return matchingValue;
  }
  
  return role; // Return original if no match found
};

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
    const { name, minDays, maxDays, approvalLevels, isActive, categoryId } =
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
        // Check if the role matches any UserRole value (case-insensitive)
        const validRoles = Object.values(UserRole);
        const isValidRole = validRoles.some(validRole => 
          validRole.toLowerCase() === role.toLowerCase() || 
          validRole === role
        );
        
        if (!isValidRole) {
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
      ? approvalLevels.map((level) => {
          // Log the incoming level data for debugging
          logger.info(`Processing approval level for create: ${JSON.stringify(level)}`);
          
          return {
            level: level.level,
            roles: Array.isArray(level.roles) 
              ? level.roles.map(role => normalizeRole(role))
              : [normalizeRole(level.roles)],
            approverType: level.approverType,
            fallbackRoles: Array.isArray(level.fallbackRoles)
              ? level.fallbackRoles.map(role => normalizeRole(role))
              : level.fallbackRoles ? [normalizeRole(level.fallbackRoles)] : undefined,
            departmentSpecific: level.departmentSpecific,
            required: level.required
          };
        })
      : approvalLevels;
      
    // Log the final approval levels for debugging
    logger.info(`Final approval levels for create: ${JSON.stringify(approvalWorkflow.approvalLevels)}`);

    approvalWorkflow.isActive = isActive !== undefined ? isActive : true;
    
    // Set categoryId if provided
    if (categoryId) {
      approvalWorkflow.categoryId = categoryId;
    }

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
    const { isActive, categoryId } = request.query as any;

    // Build query
    const approvalWorkflowRepository =
      AppDataSource.getRepository(ApprovalWorkflow);
    let query: any = {};

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }
    
    if (categoryId) {
      query.categoryId = categoryId;
    }

    // Get approval workflows
    const approvalWorkflows = await approvalWorkflowRepository.find({
      where: query,
      order: {
        minDays: "ASC",
      },
      relations: ["category"]
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
      relations: ["category"]
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
    const { name, minDays, maxDays, approvalLevels, isActive, categoryId } =
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
          
          // Check if the role matches any UserRole value (case-insensitive)
          const validRoles = Object.values(UserRole);
          const isValidRole = validRoles.some(validRole => 
            validRole.toLowerCase() === role.toLowerCase() || 
            validRole === role
          );
          
          if (!isValidRole) {
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
        ? approvalLevels.map((level) => {
            // Log the incoming level data for debugging
            logger.info(`Processing approval level: ${JSON.stringify(level)}`);
            
            return {
              level: level.level,
              roles: Array.isArray(level.roles) 
                ? level.roles.map(role => normalizeRole(role))
                : [normalizeRole(level.roles)],
              approverType: level.approverType,
              fallbackRoles: Array.isArray(level.fallbackRoles)
                ? level.fallbackRoles.map(role => normalizeRole(role))
                : level.fallbackRoles ? [normalizeRole(level.fallbackRoles)] : undefined,
              departmentSpecific: level.departmentSpecific,
              required: level.required
            };
          })
        : approvalLevels;
        
      // Log the final approval levels for debugging
      logger.info(`Final approval levels: ${JSON.stringify(approvalWorkflow.approvalLevels)}`);
    }

    if (isActive !== undefined) approvalWorkflow.isActive = isActive;
    
    // Update categoryId if provided
    if (categoryId !== undefined) {
      approvalWorkflow.categoryId = categoryId;
    }

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

export const getApprovalWorkflowForDuration = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    const { days } = request.params;
    const numDays = parseFloat(days);
    
    if (isNaN(numDays) || numDays < 0) {
      return h
        .response({ message: "Days must be a non-negative number" })
        .code(400);
    }
    
    // Get the approval workflow for the specified duration
    const approvalWorkflow = await getWorkflowForDuration(numDays);
    
    // Check if auth credentials exist
    if (!request.auth || !request.auth.credentials) {
      logger.error("No auth credentials found in request");
      return h.response({ message: "Authentication error" }).code(401);
    }
    
    // Get the user ID from the request credentials
    const userId = request.auth.credentials.id as string;
    
    // Enhance the workflow with user-specific approver information
    // This would typically come from a service that maps workflow roles to actual users
    // based on the requesting user's department, team, etc.
    
    return h
      .response({
        approvalWorkflow,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in getApprovalWorkflowForDuration: ${error}`);
    
    // Handle specific error for no workflow found
    if (error.message === "No approval workflow found for this leave duration") {
      return h
        .response({ 
          message: "No approval workflow found for this leave duration",
          error: error.message
        })
        .code(404);
    }
    
    return h
      .response({
        message: "An error occurred while fetching the approval workflow",
        error: error.message,
      })
      .code(500);
  }
};
