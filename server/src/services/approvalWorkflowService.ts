import { AppDataSource } from "../config/database";
import { ApprovalWorkflow, Role, User, UserRole } from "../models";
import logger from "../utils/logger";
import {
  LessThanOrEqual as TypeORMLessThanOrEqual,
  MoreThanOrEqual as TypeORMMoreThanOrEqual,
  Not as TypeORMNot,
  In as TypeORMIn,
} from "typeorm";

/**
 * Create a new approval workflow
 */
export const createApprovalWorkflow = async (
  workflowData: Partial<ApprovalWorkflow>
): Promise<ApprovalWorkflow> => {
  try {
    const approvalWorkflowRepository =
      AppDataSource.getRepository(ApprovalWorkflow);

    // Check if workflow with name already exists
    const existingWorkflow = await approvalWorkflowRepository.findOne({
      where: { name: workflowData.name },
    });

    if (existingWorkflow) {
      throw new Error("Approval workflow with this name already exists");
    }

    // Check for overlapping workflows
    const overlappingWorkflows = await approvalWorkflowRepository.find({
      where: [
        {
          minDays: TypeORMLessThanOrEqual(workflowData.maxDays),
          maxDays: TypeORMMoreThanOrEqual(workflowData.minDays),
        },
      ],
    });

    if (overlappingWorkflows.length > 0) {
      throw new Error("This workflow overlaps with an existing workflow");
    }

    // Create new approval workflow
    const approvalWorkflow = approvalWorkflowRepository.create(workflowData);
    return await approvalWorkflowRepository.save(approvalWorkflow);
  } catch (error) {
    logger.error(`Error in createApprovalWorkflow service: ${error}`);
    throw error;
  }
};

/**
 * Get all approval workflows with optional filters
 */
export const getAllApprovalWorkflows = async (
  filters: { isActive?: boolean } = {}
): Promise<ApprovalWorkflow[]> => {
  try {
    const approvalWorkflowRepository =
      AppDataSource.getRepository(ApprovalWorkflow);

    // Build query
    const query: any = {};

    if (filters.isActive !== undefined) {
      query.isActive = filters.isActive;
    }

    // Get approval workflows
    return await approvalWorkflowRepository.find({
      where: query,
      order: {
        minDays: "ASC",
      },
    });
  } catch (error) {
    logger.error(`Error in getAllApprovalWorkflows service: ${error}`);
    throw error;
  }
};

/**
 * Get approval workflow by ID
 */
export const getApprovalWorkflowById = async (
  workflowId: string
): Promise<ApprovalWorkflow> => {
  try {
    const approvalWorkflowRepository =
      AppDataSource.getRepository(ApprovalWorkflow);

    // Find approval workflow by ID
    const approvalWorkflow = await approvalWorkflowRepository.findOne({
      where: { id: workflowId },
    });

    if (!approvalWorkflow) {
      throw new Error("Approval workflow not found");
    }

    return approvalWorkflow;
  } catch (error) {
    logger.error(`Error in getApprovalWorkflowById service: ${error}`);
    throw error;
  }
};

/**
 * Update approval workflow
 */
export const updateApprovalWorkflow = async (
  workflowId: string,
  workflowData: Partial<ApprovalWorkflow>
): Promise<ApprovalWorkflow> => {
  try {
    const approvalWorkflowRepository =
      AppDataSource.getRepository(ApprovalWorkflow);

    // Find approval workflow by ID
    const approvalWorkflow = await approvalWorkflowRepository.findOne({
      where: { id: workflowId },
    });

    if (!approvalWorkflow) {
      throw new Error("Approval workflow not found");
    }

    // If name is being updated, check if it's already in use
    if (workflowData.name && workflowData.name !== approvalWorkflow.name) {
      const existingWorkflow = await approvalWorkflowRepository.findOne({
        where: { name: workflowData.name },
      });

      if (existingWorkflow) {
        throw new Error("Approval workflow name is already in use");
      }
    }

    // Check for overlapping workflows if changing min/max days
    if (
      (workflowData.minDays !== undefined &&
        workflowData.minDays !== approvalWorkflow.minDays) ||
      (workflowData.maxDays !== undefined &&
        workflowData.maxDays !== approvalWorkflow.maxDays)
    ) {
      const newMinDays =
        workflowData.minDays !== undefined
          ? workflowData.minDays
          : approvalWorkflow.minDays;
      const newMaxDays =
        workflowData.maxDays !== undefined
          ? workflowData.maxDays
          : approvalWorkflow.maxDays;

      const overlappingWorkflows = await approvalWorkflowRepository.find({
        where: [
          {
            id: TypeORMNot(workflowId),
            minDays: TypeORMLessThanOrEqual(newMaxDays),
            maxDays: TypeORMMoreThanOrEqual(newMinDays),
          },
        ],
      });

      if (overlappingWorkflows.length > 0) {
        throw new Error(
          "This workflow would overlap with an existing workflow"
        );
      }
    }

    // Update approval workflow data
    approvalWorkflowRepository.merge(approvalWorkflow, workflowData);

    // Save updated approval workflow
    return await approvalWorkflowRepository.save(approvalWorkflow);
  } catch (error) {
    logger.error(`Error in updateApprovalWorkflow service: ${error}`);
    throw error;
  }
};

/**
 * Delete approval workflow
 */
export const deleteApprovalWorkflow = async (
  workflowId: string
): Promise<void> => {
  try {
    const approvalWorkflowRepository =
      AppDataSource.getRepository(ApprovalWorkflow);

    // Find approval workflow by ID
    const approvalWorkflow = await approvalWorkflowRepository.findOne({
      where: { id: workflowId },
    });

    if (!approvalWorkflow) {
      throw new Error("Approval workflow not found");
    }

    // Delete approval workflow
    await approvalWorkflowRepository.remove(approvalWorkflow);
  } catch (error) {
    logger.error(`Error in deleteApprovalWorkflow service: ${error}`);
    throw error;
  }
};

/**
 * Get approval workflow for leave duration
 */
export const getApprovalWorkflowForDuration = async (
  days: number
): Promise<ApprovalWorkflow> => {
  try {
    const approvalWorkflowRepository =
      AppDataSource.getRepository(ApprovalWorkflow);

    // Find approval workflow for the number of days
    const approvalWorkflow = await approvalWorkflowRepository.findOne({
      where: {
        minDays: TypeORMLessThanOrEqual(days),
        maxDays: TypeORMMoreThanOrEqual(days),
        isActive: true,
      },
    });

    if (!approvalWorkflow) {
      throw new Error("No approval workflow found for this leave duration");
    }

    return approvalWorkflow;
  } catch (error) {
    logger.error(`Error in getApprovalWorkflowForDuration service: ${error}`);
    throw error;
  }
};

/**
 * Get potential approvers for a workflow level using roles
 */
export const getApproversForWorkflowLevel = async (
  level: {
    level: number;
    roleIds: string[];
    departmentSpecific?: boolean;
    required?: boolean;
  },
  requesterId?: string,
  departmentId?: string
): Promise<User[]> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    
    let potentialApprovers: User[] = [];

    // Get users by role IDs
    if (level.roleIds && level.roleIds.length > 0) {
      const roleUsers = await userRepository.find({
        where: {
          roleId: TypeORMIn(level.roleIds),
          isActive: true,
        },
        relations: ["roleObj", "departmentObj"],
      });
      potentialApprovers.push(...roleUsers);
    }

    // Apply department filtering if specified
    if (level.departmentSpecific && departmentId) {
      potentialApprovers = potentialApprovers.filter(
        user => user.departmentId === departmentId
      );
    }

    // Remove the requester from potential approvers
    if (requesterId) {
      potentialApprovers = potentialApprovers.filter(
        user => user.id !== requesterId
      );
    }

    // Remove duplicates based on user ID
    const uniqueApprovers = potentialApprovers.filter(
      (user, index, self) => self.findIndex(u => u.id === user.id) === index
    );

    return uniqueApprovers;
  } catch (error) {
    logger.error(`Error in getApproversForWorkflowLevel: ${error}`);
    throw error;
  }
};

/**
 * Get all potential approvers for a workflow
 */
export const getApproversForWorkflow = async (
  workflowId: string,
  requesterId?: string,
  departmentId?: string
): Promise<{ level: number; approvers: User[] }[]> => {
  try {
    const workflow = await getApprovalWorkflowById(workflowId);
    
    const approversByLevel = await Promise.all(
      workflow.approvalLevels.map(async (level) => ({
        level: level.level,
        approvers: await getApproversForWorkflowLevel(level, requesterId, departmentId),
      }))
    );

    return approversByLevel;
  } catch (error) {
    logger.error(`Error in getApproversForWorkflow: ${error}`);
    throw error;
  }
};

// TypeORM operators are imported at the top of the file
