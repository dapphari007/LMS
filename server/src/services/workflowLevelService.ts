import { AppDataSource } from "../config/database";
import { WorkflowLevel, UserRole } from "../models";
import logger from "../utils/logger";

/**
 * Create a new workflow level
 */
export const createWorkflowLevel = async (
  levelData: Partial<WorkflowLevel>
): Promise<WorkflowLevel> => {
  try {
    const workflowLevelRepository = AppDataSource.getRepository(WorkflowLevel);

    // Check if level with the same number already exists
    const existingLevel = await workflowLevelRepository.findOne({
      where: { level: levelData.level },
    });

    if (existingLevel) {
      throw new Error(`A workflow level with number ${levelData.level} already exists`);
    }

    // Create new workflow level
    const workflowLevel = workflowLevelRepository.create(levelData);
    return await workflowLevelRepository.save(workflowLevel);
  } catch (error) {
    logger.error(`Error in createWorkflowLevel service: ${error}`);
    throw error;
  }
};

/**
 * Get all workflow levels with optional filters
 */
export const getAllWorkflowLevels = async (
  filters: { isActive?: boolean } = {}
): Promise<WorkflowLevel[]> => {
  try {
    const workflowLevelRepository = AppDataSource.getRepository(WorkflowLevel);

    // Build query
    const query: any = {};

    if (filters.isActive !== undefined) {
      query.isActive = filters.isActive;
    }

    // Get workflow levels
    return await workflowLevelRepository.find({
      where: query,
      order: {
        level: "ASC",
      },
    });
  } catch (error) {
    logger.error(`Error in getAllWorkflowLevels service: ${error}`);
    throw error;
  }
};

/**
 * Get workflow level by ID
 */
export const getWorkflowLevelById = async (
  levelId: string
): Promise<WorkflowLevel> => {
  try {
    const workflowLevelRepository = AppDataSource.getRepository(WorkflowLevel);

    // Find workflow level by ID
    const workflowLevel = await workflowLevelRepository.findOne({
      where: { id: levelId },
    });

    if (!workflowLevel) {
      throw new Error("Workflow level not found");
    }

    return workflowLevel;
  } catch (error) {
    logger.error(`Error in getWorkflowLevelById service: ${error}`);
    throw error;
  }
};

/**
 * Get workflow level by level number
 */
export const getWorkflowLevelByNumber = async (
  level: number
): Promise<WorkflowLevel> => {
  try {
    const workflowLevelRepository = AppDataSource.getRepository(WorkflowLevel);

    // Find workflow level by level number
    const workflowLevel = await workflowLevelRepository.findOne({
      where: { level },
    });

    if (!workflowLevel) {
      throw new Error(`Workflow level ${level} not found`);
    }

    return workflowLevel;
  } catch (error) {
    logger.error(`Error in getWorkflowLevelByNumber service: ${error}`);
    throw error;
  }
};

/**
 * Update workflow level
 */
export const updateWorkflowLevel = async (
  levelId: string,
  levelData: Partial<WorkflowLevel>
): Promise<WorkflowLevel> => {
  try {
    const workflowLevelRepository = AppDataSource.getRepository(WorkflowLevel);

    // Find workflow level by ID
    const workflowLevel = await workflowLevelRepository.findOne({
      where: { id: levelId },
    });

    if (!workflowLevel) {
      throw new Error("Workflow level not found");
    }

    // If level number is being updated, check if it's already in use
    if (levelData.level !== undefined && levelData.level !== workflowLevel.level) {
      const existingLevel = await workflowLevelRepository.findOne({
        where: { level: levelData.level },
      });

      if (existingLevel && existingLevel.id !== levelId) {
        throw new Error(`A workflow level with number ${levelData.level} already exists`);
      }
    }

    // Update workflow level data
    workflowLevelRepository.merge(workflowLevel, levelData);

    // Save updated workflow level
    return await workflowLevelRepository.save(workflowLevel);
  } catch (error) {
    logger.error(`Error in updateWorkflowLevel service: ${error}`);
    throw error;
  }
};

/**
 * Delete workflow level
 */
export const deleteWorkflowLevel = async (
  levelId: string
): Promise<void> => {
  try {
    const workflowLevelRepository = AppDataSource.getRepository(WorkflowLevel);

    // Find workflow level by ID
    const workflowLevel = await workflowLevelRepository.findOne({
      where: { id: levelId },
    });

    if (!workflowLevel) {
      throw new Error("Workflow level not found");
    }

    // Delete workflow level
    await workflowLevelRepository.remove(workflowLevel);
  } catch (error) {
    logger.error(`Error in deleteWorkflowLevel service: ${error}`);
    throw error;
  }
};

/**
 * Reset workflow levels to default
 */
export const resetWorkflowLevelsToDefault = async (): Promise<void> => {
  try {
    const workflowLevelRepository = AppDataSource.getRepository(WorkflowLevel);

    // Delete all existing workflow levels
    await workflowLevelRepository.clear();

    // Create default workflow levels
    const defaultLevels = [
      {
        level: 1,
        approverType: "teamLead",
        fallbackRoles: [UserRole.TEAM_LEAD],
        isActive: true,
      },
      {
        level: 2,
        approverType: "manager",
        fallbackRoles: [UserRole.MANAGER],
        isActive: true,
      },
      {
        level: 3,
        approverType: "hr",
        fallbackRoles: [UserRole.HR],
        isActive: true,
      },
      {
        level: 4,
        approverType: "superAdmin",
        fallbackRoles: [UserRole.SUPER_ADMIN],
        isActive: true,
      },
    ];

    for (const levelData of defaultLevels) {
      const workflowLevel = workflowLevelRepository.create(levelData);
      await workflowLevelRepository.save(workflowLevel);
    }
  } catch (error) {
    logger.error(`Error in resetWorkflowLevelsToDefault service: ${error}`);
    throw error;
  }
};

/**
 * Get all active workflow levels
 */
export const getActiveWorkflowLevels = async (): Promise<WorkflowLevel[]> => {
  try {
    return await getAllWorkflowLevels({ isActive: true });
  } catch (error) {
    logger.error(`Error in getActiveWorkflowLevels service: ${error}`);
    throw error;
  }
};