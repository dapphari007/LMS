import { AppDataSource } from '../config/database';
import { LeaveType } from '../models';
import logger from '../utils/logger';

/**
 * Create a new leave type
 */
export const createLeaveType = async (leaveTypeData: Partial<LeaveType>): Promise<LeaveType> => {
  try {
    const leaveTypeRepository = AppDataSource.getRepository(LeaveType);
    
    // Check if leave type with name already exists
    const existingLeaveType = await leaveTypeRepository.findOne({
      where: { name: leaveTypeData.name },
    });
    
    if (existingLeaveType) {
      throw new Error('Leave type with this name already exists');
    }
    
    // Create new leave type
    const leaveType = leaveTypeRepository.create(leaveTypeData);
    return await leaveTypeRepository.save(leaveType);
  } catch (error) {
    logger.error(`Error in createLeaveType service: ${error}`);
    throw error;
  }
};

/**
 * Get all leave types with optional filters
 */
export const getAllLeaveTypes = async (filters: { isActive?: boolean } = {}): Promise<LeaveType[]> => {
  try {
    const leaveTypeRepository = AppDataSource.getRepository(LeaveType);
    
    // Build query
    const query: any = {};
    
    if (filters.isActive !== undefined) {
      query.isActive = filters.isActive;
    }
    
    // Get leave types
    return await leaveTypeRepository.find({
      where: query,
      order: {
        name: 'ASC',
      },
    });
  } catch (error) {
    logger.error(`Error in getAllLeaveTypes service: ${error}`);
    throw error;
  }
};

/**
 * Get leave type by ID
 */
export const getLeaveTypeById = async (leaveTypeId: string): Promise<LeaveType> => {
  try {
    const leaveTypeRepository = AppDataSource.getRepository(LeaveType);
    
    // Find leave type by ID
    const leaveType = await leaveTypeRepository.findOne({
      where: { id: leaveTypeId },
    });
    
    if (!leaveType) {
      throw new Error('Leave type not found');
    }
    
    return leaveType;
  } catch (error) {
    logger.error(`Error in getLeaveTypeById service: ${error}`);
    throw error;
  }
};

/**
 * Update leave type
 */
export const updateLeaveType = async (leaveTypeId: string, leaveTypeData: Partial<LeaveType>): Promise<LeaveType> => {
  try {
    const leaveTypeRepository = AppDataSource.getRepository(LeaveType);
    
    // Find leave type by ID
    const leaveType = await leaveTypeRepository.findOne({
      where: { id: leaveTypeId },
    });
    
    if (!leaveType) {
      throw new Error('Leave type not found');
    }
    
    // If name is being updated, check if it's already in use
    if (leaveTypeData.name && leaveTypeData.name !== leaveType.name) {
      const existingLeaveType = await leaveTypeRepository.findOne({
        where: { name: leaveTypeData.name },
      });
      
      if (existingLeaveType) {
        throw new Error('Leave type name is already in use');
      }
    }
    
    // Update leave type data
    leaveTypeRepository.merge(leaveType, leaveTypeData);
    
    // Save updated leave type
    return await leaveTypeRepository.save(leaveType);
  } catch (error) {
    logger.error(`Error in updateLeaveType service: ${error}`);
    throw error;
  }
};

/**
 * Delete leave type
 */
export const deleteLeaveType = async (leaveTypeId: string): Promise<void> => {
  try {
    const leaveTypeRepository = AppDataSource.getRepository(LeaveType);
    
    // Find leave type by ID
    const leaveType = await leaveTypeRepository.findOne({
      where: { id: leaveTypeId },
    });
    
    if (!leaveType) {
      throw new Error('Leave type not found');
    }
    
    // Delete leave type
    await leaveTypeRepository.remove(leaveType);
  } catch (error) {
    logger.error(`Error in deleteLeaveType service: ${error}`);
    throw error;
  }
};