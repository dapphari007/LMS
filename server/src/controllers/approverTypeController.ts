import { Request, ResponseToolkit } from "@hapi/hapi";
import {
  createApproverType,
  getAllApproverTypes,
  getApproverTypeById,
  updateApproverType,
  deleteApproverType,
  toggleApproverTypeStatus,
} from "../services/approverTypeService";
import logger from "../utils/logger";

/**
 * Create a new approver type
 */
export const createApproverTypeController = async (
  req: Request,
  h: ResponseToolkit
) => {
  try {
    const { name, description, code, isActive } = req.payload as any;

    // Validate required fields
    if (!name) {
      return h.response({ message: "Approver type name is required" }).code(400);
    }

    if (!code) {
      return h.response({ message: "Approver type code is required" }).code(400);
    }

    // Create approver type
    const approverType = await createApproverType({
      name,
      description,
      code,
      isActive: isActive !== undefined ? isActive : true,
    });

    return h.response({
      message: "Approver type created successfully",
      approverType,
    }).code(201);
  } catch (error) {
    logger.error(`Error in createApproverTypeController: ${error}`);
    return h.response({
      message:
        error instanceof Error
          ? error.message
          : "Failed to create approver type",
    }).code(500);
  }
};

/**
 * Get all approver types
 */
export const getAllApproverTypesController = async (
  req: Request,
  h: ResponseToolkit
) => {
  try {
    const { isActive } = req.query;
    const filters: { isActive?: boolean } = {};

    // Apply filters if provided
    if (isActive !== undefined) {
      filters.isActive = isActive === "true";
    }

    // Get approver types
    const approverTypes = await getAllApproverTypes(filters);

    return h.response({
      approverTypes,
    }).code(200);
  } catch (error) {
    logger.error(`Error in getAllApproverTypesController: ${error}`);
    return h.response({
      message: "Failed to get approver types",
    }).code(500);
  }
};

/**
 * Get approver type by ID
 */
export const getApproverTypeByIdController = async (
  req: Request,
  h: ResponseToolkit
) => {
  try {
    const { id } = req.params;

    // Get approver type
    const approverType = await getApproverTypeById(id);

    return h.response({
      approverType,
    }).code(200);
  } catch (error) {
    logger.error(`Error in getApproverTypeByIdController: ${error}`);
    return h.response({
      message:
        error instanceof Error ? error.message : "Failed to get approver type",
    }).code(404);
  }
};

/**
 * Update approver type
 */
export const updateApproverTypeController = async (
  req: Request,
  h: ResponseToolkit
) => {
  try {
    const { id } = req.params;
    const { name, description, code, isActive } = req.payload as any;

    // Update approver type
    const approverType = await updateApproverType(id, {
      name,
      description,
      code,
      isActive,
    });

    return h.response({
      message: "Approver type updated successfully",
      approverType,
    }).code(200);
  } catch (error) {
    logger.error(`Error in updateApproverTypeController: ${error}`);
    return h.response({
      message:
        error instanceof Error
          ? error.message
          : "Failed to update approver type",
    }).code(400);
  }
};

/**
 * Delete approver type
 */
export const deleteApproverTypeController = async (
  req: Request,
  h: ResponseToolkit
) => {
  try {
    const { id } = req.params;

    // Delete approver type
    await deleteApproverType(id);

    return h.response({
      message: "Approver type deleted successfully",
    }).code(200);
  } catch (error) {
    logger.error(`Error in deleteApproverTypeController: ${error}`);
    return h.response({
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete approver type",
    }).code(400);
  }
};

/**
 * Toggle approver type status
 */
export const toggleApproverTypeStatusController = async (
  req: Request,
  h: ResponseToolkit
) => {
  try {
    const { id } = req.params;

    // Toggle approver type status
    const approverType = await toggleApproverTypeStatus(id);

    return h.response({
      message: `Approver type ${
        approverType.isActive ? "activated" : "deactivated"
      } successfully`,
      approverType,
    }).code(200);
  } catch (error) {
    logger.error(`Error in toggleApproverTypeStatusController: ${error}`);
    return h.response({
      message:
        error instanceof Error
          ? error.message
          : "Failed to toggle approver type status",
    }).code(400);
  }
};