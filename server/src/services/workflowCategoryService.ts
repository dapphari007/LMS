import { AppDataSource } from "../config/database";
import { WorkflowCategory } from "../models";
import logger from "../utils/logger";
import {
  LessThanOrEqual as TypeORMLessThanOrEqual,
  MoreThanOrEqual as TypeORMMoreThanOrEqual,
  Not as TypeORMNot,
} from "typeorm";

/**
 * Create a new workflow category
 */
export const createWorkflowCategory = async (
  categoryData: Partial<WorkflowCategory>
): Promise<WorkflowCategory> => {
  try {
    const workflowCategoryRepository =
      AppDataSource.getRepository(WorkflowCategory);

    // Check if category with name already exists
    const existingCategory = await workflowCategoryRepository.findOne({
      where: { name: categoryData.name },
    });

    if (existingCategory) {
      throw new Error("Workflow category with this name already exists");
    }

    // Check for overlapping categories
    const overlappingCategories = await workflowCategoryRepository.find({
      where: [
        {
          minDays: TypeORMLessThanOrEqual(categoryData.maxDays),
          maxDays: TypeORMMoreThanOrEqual(categoryData.minDays),
        },
      ],
    });

    if (overlappingCategories.length > 0) {
      throw new Error("This category overlaps with an existing category");
    }

    // Create new workflow category
    const workflowCategory = workflowCategoryRepository.create(categoryData);
    return await workflowCategoryRepository.save(workflowCategory);
  } catch (error) {
    logger.error(`Error in createWorkflowCategory service: ${error}`);
    throw error;
  }
};

/**
 * Get all workflow categories with optional filters
 */
export const getAllWorkflowCategories = async (
  filters: { isActive?: boolean } = {}
): Promise<WorkflowCategory[]> => {
  try {
    const workflowCategoryRepository =
      AppDataSource.getRepository(WorkflowCategory);

    // Build query
    const query: any = {};

    if (filters.isActive !== undefined) {
      query.isActive = filters.isActive;
    }

    // Get workflow categories
    return await workflowCategoryRepository.find({
      where: query,
      order: {
        minDays: "ASC",
      },
    });
  } catch (error) {
    logger.error(`Error in getAllWorkflowCategories service: ${error}`);
    throw error;
  }
};

/**
 * Get workflow category by ID
 */
export const getWorkflowCategoryById = async (
  categoryId: string
): Promise<WorkflowCategory> => {
  try {
    const workflowCategoryRepository =
      AppDataSource.getRepository(WorkflowCategory);

    // Find workflow category by ID
    const workflowCategory = await workflowCategoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!workflowCategory) {
      throw new Error("Workflow category not found");
    }

    return workflowCategory;
  } catch (error) {
    logger.error(`Error in getWorkflowCategoryById service: ${error}`);
    throw error;
  }
};

/**
 * Update workflow category
 */
export const updateWorkflowCategory = async (
  categoryId: string,
  categoryData: Partial<WorkflowCategory>
): Promise<WorkflowCategory> => {
  try {
    const workflowCategoryRepository =
      AppDataSource.getRepository(WorkflowCategory);

    // Find workflow category by ID
    const workflowCategory = await workflowCategoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!workflowCategory) {
      throw new Error("Workflow category not found");
    }

    // If name is being updated, check if it's already in use
    if (categoryData.name && categoryData.name !== workflowCategory.name) {
      const existingCategory = await workflowCategoryRepository.findOne({
        where: { name: categoryData.name },
      });

      if (existingCategory) {
        throw new Error("Workflow category name is already in use");
      }
    }

    // Check for overlapping categories if changing min/max days
    if (
      (categoryData.minDays !== undefined &&
        categoryData.minDays !== workflowCategory.minDays) ||
      (categoryData.maxDays !== undefined &&
        categoryData.maxDays !== workflowCategory.maxDays)
    ) {
      const newMinDays =
        categoryData.minDays !== undefined
          ? categoryData.minDays
          : workflowCategory.minDays;
      const newMaxDays =
        categoryData.maxDays !== undefined
          ? categoryData.maxDays
          : workflowCategory.maxDays;

      const overlappingCategories = await workflowCategoryRepository.find({
        where: [
          {
            id: TypeORMNot(categoryId),
            minDays: TypeORMLessThanOrEqual(newMaxDays),
            maxDays: TypeORMMoreThanOrEqual(newMinDays),
          },
        ],
      });

      if (overlappingCategories.length > 0) {
        throw new Error(
          "This category would overlap with an existing category"
        );
      }
    }

    // Update workflow category data
    workflowCategoryRepository.merge(workflowCategory, categoryData);

    // Save updated workflow category
    return await workflowCategoryRepository.save(workflowCategory);
  } catch (error) {
    logger.error(`Error in updateWorkflowCategory service: ${error}`);
    throw error;
  }
};

/**
 * Delete workflow category
 */
export const deleteWorkflowCategory = async (
  categoryId: string
): Promise<void> => {
  try {
    const workflowCategoryRepository =
      AppDataSource.getRepository(WorkflowCategory);

    // Find workflow category by ID
    const workflowCategory = await workflowCategoryRepository.findOne({
      where: { id: categoryId },
      relations: ["workflows"],
    });

    if (!workflowCategory) {
      throw new Error("Workflow category not found");
    }

    // Check if category is used in any workflows
    if (workflowCategory.workflows && workflowCategory.workflows.length > 0) {
      throw new Error("Cannot delete category that is used in workflows");
    }

    // Delete workflow category
    await workflowCategoryRepository.remove(workflowCategory);
  } catch (error) {
    logger.error(`Error in deleteWorkflowCategory service: ${error}`);
    throw error;
  }
};

/**
 * Toggle workflow category active status
 */
export const toggleWorkflowCategoryStatus = async (
  categoryId: string
): Promise<WorkflowCategory> => {
  try {
    const workflowCategoryRepository =
      AppDataSource.getRepository(WorkflowCategory);

    // Find workflow category by ID
    const workflowCategory = await workflowCategoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!workflowCategory) {
      throw new Error("Workflow category not found");
    }

    // Toggle active status
    workflowCategory.isActive = !workflowCategory.isActive;

    // Save updated workflow category
    return await workflowCategoryRepository.save(workflowCategory);
  } catch (error) {
    logger.error(`Error in toggleWorkflowCategoryStatus service: ${error}`);
    throw error;
  }
};