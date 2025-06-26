import { Request, ResponseToolkit } from "@hapi/hapi";
import {
  createWorkflowCategory,
  getAllWorkflowCategories,
  getWorkflowCategoryById,
  updateWorkflowCategory,
  deleteWorkflowCategory,
  toggleWorkflowCategoryStatus,
} from "../services/workflowCategoryService";
import logger from "../utils/logger";

/**
 * Create a new workflow category
 */
export const createWorkflowCategoryController = async (
  req: Request,
  h: ResponseToolkit
) => {
  try {
    // Check if user has permission to create workflow categories
    const userRole = req.auth.credentials.role;
    if (userRole !== 'super_admin' && userRole !== 'manager') {
      logger.error(`User ${req.auth.credentials.id} with role ${userRole} attempted to create a workflow category`);
      return h.response({ message: "You don't have permission to create workflow categories" }).code(403);
    }
    
    const { name, description, minDays, maxDays, isActive } = req.payload as any;

    // Validate required fields
    if (!name) {
      return h.response({ message: "Category name is required" }).code(400);
    }

    if (minDays === undefined || minDays === null) {
      return h.response({ message: "Minimum days is required" }).code(400);
    }

    if (maxDays === undefined || maxDays === null) {
      return h.response({ message: "Maximum days is required" }).code(400);
    }

    // Create workflow category
    const workflowCategory = await createWorkflowCategory({
      name,
      description,
      minDays: parseFloat(minDays),
      maxDays: parseFloat(maxDays),
      isActive: isActive !== undefined ? isActive : true,
    });

    return h.response({
      message: "Workflow category created successfully",
      workflowCategory,
    }).code(201);
  } catch (error) {
    logger.error(`Error in createWorkflowCategoryController: ${error}`);
    return h.response({
      message:
        error instanceof Error
          ? error.message
          : "Failed to create workflow category",
    }).code(500);
  }
};

/**
 * Get all workflow categories
 */
export const getAllWorkflowCategoriesController = async (
  req: Request,
  h: ResponseToolkit
) => {
  try {
    logger.info(`Getting all workflow categories - User: ${req.auth.credentials.id}, Role: ${req.auth.credentials.role}`);
    
    const { isActive } = req.query;
    const filters: { isActive?: boolean } = {};

    // Apply filters if provided
    if (isActive !== undefined) {
      filters.isActive = isActive === "true";
      logger.info(`Applying isActive filter: ${filters.isActive}`);
    }

    // Get workflow categories
    logger.info(`Fetching workflow categories with filters: ${JSON.stringify(filters)}`);
    const workflowCategories = await getAllWorkflowCategories(filters);
    logger.info(`Found ${workflowCategories.length} workflow categories`);

    return h.response({
      workflowCategories,
    }).code(200);
  } catch (error) {
    logger.error(`Error in getAllWorkflowCategoriesController: ${error}`);
    logger.error(`Stack trace: ${error instanceof Error ? error.stack : 'No stack trace'}`);
    return h.response({
      message: "Failed to get workflow categories",
    }).code(500);
  }
};

/**
 * Get workflow category by ID
 */
export const getWorkflowCategoryByIdController = async (
  req: Request,
  h: ResponseToolkit
) => {
  try {
    const { id } = req.params;

    // Get workflow category
    const workflowCategory = await getWorkflowCategoryById(id);

    return h.response({
      workflowCategory,
    }).code(200);
  } catch (error) {
    logger.error(`Error in getWorkflowCategoryByIdController: ${error}`);
    return h.response({
      message:
        error instanceof Error
          ? error.message
          : "Failed to get workflow category",
    }).code(404);
  }
};

/**
 * Update workflow category
 */
export const updateWorkflowCategoryController = async (
  req: Request,
  h: ResponseToolkit
) => {
  try {
    // Check if user has permission to update workflow categories
    const userRole = req.auth.credentials.role;
    if (userRole !== 'super_admin' && userRole !== 'manager') {
      logger.error(`User ${req.auth.credentials.id} with role ${userRole} attempted to update a workflow category`);
      return h.response({ message: "You don't have permission to update workflow categories" }).code(403);
    }
    
    const { id } = req.params;
    const { name, description, minDays, maxDays, isActive } = req.payload as any;

    // Update workflow category
    const workflowCategory = await updateWorkflowCategory(id, {
      name,
      description,
      minDays: minDays !== undefined ? parseFloat(minDays) : undefined,
      maxDays: maxDays !== undefined ? parseFloat(maxDays) : undefined,
      isActive,
    });

    return h.response({
      message: "Workflow category updated successfully",
      workflowCategory,
    }).code(200);
  } catch (error) {
    logger.error(`Error in updateWorkflowCategoryController: ${error}`);
    return h.response({
      message:
        error instanceof Error
          ? error.message
          : "Failed to update workflow category",
    }).code(400);
  }
};

/**
 * Delete workflow category
 */
export const deleteWorkflowCategoryController = async (
  req: Request,
  h: ResponseToolkit
) => {
  try {
    // Check if user has permission to delete workflow categories
    const userRole = req.auth.credentials.role;
    if (userRole !== 'super_admin' && userRole !== 'manager') {
      logger.error(`User ${req.auth.credentials.id} with role ${userRole} attempted to delete a workflow category`);
      return h.response({ message: "You don't have permission to delete workflow categories" }).code(403);
    }
    
    const { id } = req.params;

    // Delete workflow category
    await deleteWorkflowCategory(id);

    return h.response({
      message: "Workflow category deleted successfully",
    }).code(200);
  } catch (error) {
    logger.error(`Error in deleteWorkflowCategoryController: ${error}`);
    return h.response({
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete workflow category",
    }).code(400);
  }
};

/**
 * Toggle workflow category status
 */
export const toggleWorkflowCategoryStatusController = async (
  req: Request,
  h: ResponseToolkit
) => {
  try {
    const { id } = req.params;

    // Toggle workflow category status
    const workflowCategory = await toggleWorkflowCategoryStatus(id);

    return h.response({
      message: `Workflow category ${
        workflowCategory.isActive ? "activated" : "deactivated"
      } successfully`,
      workflowCategory,
    }).code(200);
  } catch (error) {
    logger.error(`Error in toggleWorkflowCategoryStatusController: ${error}`);
    return h.response({
      message:
        error instanceof Error
          ? error.message
          : "Failed to toggle workflow category status",
    }).code(400);
  }
};