import { AppDataSource } from "../config/database";
import { ApprovalWorkflow } from "../models";
import logger from "../utils/logger";
import {
  LessThanOrEqual as TypeORMLessThanOrEqual,
  MoreThanOrEqual as TypeORMMoreThanOrEqual,
  Not as TypeORMNot,
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

// TypeORM operators are imported at the top of the file
