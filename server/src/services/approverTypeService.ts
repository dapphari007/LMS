import { AppDataSource } from "../config/database";
import { ApproverType } from "../models";
import logger from "../utils/logger";

/**
 * Create a new approver type
 */
export const createApproverType = async (
  approverTypeData: Partial<ApproverType>
): Promise<ApproverType> => {
  try {
    const approverTypeRepository = AppDataSource.getRepository(ApproverType);

    // Check if approver type with name already exists
    const existingApproverTypeByName = await approverTypeRepository.findOne({
      where: { name: approverTypeData.name },
    });

    if (existingApproverTypeByName) {
      throw new Error("Approver type with this name already exists");
    }

    // Check if approver type with code already exists
    const existingApproverTypeByCode = await approverTypeRepository.findOne({
      where: { code: approverTypeData.code },
    });

    if (existingApproverTypeByCode) {
      throw new Error("Approver type with this code already exists");
    }

    // Create new approver type
    const approverType = approverTypeRepository.create(approverTypeData);
    return await approverTypeRepository.save(approverType);
  } catch (error) {
    logger.error(`Error in createApproverType service: ${error}`);
    throw error;
  }
};

/**
 * Get all approver types with optional filters
 */
export const getAllApproverTypes = async (
  filters: { isActive?: boolean } = {}
): Promise<ApproverType[]> => {
  try {
    const approverTypeRepository = AppDataSource.getRepository(ApproverType);

    // Build query
    const query: any = {};

    if (filters.isActive !== undefined) {
      query.isActive = filters.isActive;
    }

    // Get approver types
    return await approverTypeRepository.find({
      where: query,
      order: {
        name: "ASC",
      },
    });
  } catch (error) {
    logger.error(`Error in getAllApproverTypes service: ${error}`);
    throw error;
  }
};

/**
 * Get approver type by ID
 */
export const getApproverTypeById = async (
  approverTypeId: string
): Promise<ApproverType> => {
  try {
    const approverTypeRepository = AppDataSource.getRepository(ApproverType);

    // Find approver type by ID
    const approverType = await approverTypeRepository.findOne({
      where: { id: approverTypeId },
    });

    if (!approverType) {
      throw new Error("Approver type not found");
    }

    return approverType;
  } catch (error) {
    logger.error(`Error in getApproverTypeById service: ${error}`);
    throw error;
  }
};

/**
 * Update approver type
 */
export const updateApproverType = async (
  approverTypeId: string,
  approverTypeData: Partial<ApproverType>
): Promise<ApproverType> => {
  try {
    const approverTypeRepository = AppDataSource.getRepository(ApproverType);

    // Find approver type by ID
    const approverType = await approverTypeRepository.findOne({
      where: { id: approverTypeId },
    });

    if (!approverType) {
      throw new Error("Approver type not found");
    }

    // If name is being updated, check if it's already in use
    if (
      approverTypeData.name &&
      approverTypeData.name !== approverType.name
    ) {
      const existingApproverType = await approverTypeRepository.findOne({
        where: { name: approverTypeData.name },
      });

      if (existingApproverType) {
        throw new Error("Approver type name is already in use");
      }
    }

    // If code is being updated, check if it's already in use
    if (
      approverTypeData.code &&
      approverTypeData.code !== approverType.code
    ) {
      const existingApproverType = await approverTypeRepository.findOne({
        where: { code: approverTypeData.code },
      });

      if (existingApproverType) {
        throw new Error("Approver type code is already in use");
      }
    }

    // Update approver type data
    approverTypeRepository.merge(approverType, approverTypeData);

    // Save updated approver type
    return await approverTypeRepository.save(approverType);
  } catch (error) {
    logger.error(`Error in updateApproverType service: ${error}`);
    throw error;
  }
};

/**
 * Delete approver type
 */
export const deleteApproverType = async (
  approverTypeId: string
): Promise<void> => {
  try {
    const approverTypeRepository = AppDataSource.getRepository(ApproverType);

    // Find approver type by ID
    const approverType = await approverTypeRepository.findOne({
      where: { id: approverTypeId },
    });

    if (!approverType) {
      throw new Error("Approver type not found");
    }

    // Delete approver type
    await approverTypeRepository.remove(approverType);
  } catch (error) {
    logger.error(`Error in deleteApproverType service: ${error}`);
    throw error;
  }
};

/**
 * Toggle approver type active status
 */
export const toggleApproverTypeStatus = async (
  approverTypeId: string
): Promise<ApproverType> => {
  try {
    const approverTypeRepository = AppDataSource.getRepository(ApproverType);

    // Find approver type by ID
    const approverType = await approverTypeRepository.findOne({
      where: { id: approverTypeId },
    });

    if (!approverType) {
      throw new Error("Approver type not found");
    }

    // Toggle active status
    approverType.isActive = !approverType.isActive;

    // Save updated approver type
    return await approverTypeRepository.save(approverType);
  } catch (error) {
    logger.error(`Error in toggleApproverTypeStatus service: ${error}`);
    throw error;
  }
};