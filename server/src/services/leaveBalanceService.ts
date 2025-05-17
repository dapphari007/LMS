import { AppDataSource } from '../config/database';
import { LeaveBalance, User, LeaveType } from '../models';
import { getCurrentYear } from '../utils/dateUtils';
import logger from '../utils/logger';

/**
 * Create a new leave balance
 */
export const createLeaveBalance = async (leaveBalanceData: Partial<LeaveBalance>): Promise<LeaveBalance> => {
  try {
    const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
    
    // Set default year if not provided
    if (!leaveBalanceData.year) {
      leaveBalanceData.year = getCurrentYear();
    }
    
    // Check if leave balance already exists for this user, leave type, and year
    const existingLeaveBalance = await leaveBalanceRepository.findOne({
      where: {
        userId: leaveBalanceData.userId,
        leaveTypeId: leaveBalanceData.leaveTypeId,
        year: leaveBalanceData.year,
      },
    });
    
    if (existingLeaveBalance) {
      throw new Error('Leave balance already exists for this user, leave type, and year');
    }
    
    // Create new leave balance
    const leaveBalance = leaveBalanceRepository.create(leaveBalanceData);
    return await leaveBalanceRepository.save(leaveBalance);
  } catch (error) {
    logger.error(`Error in createLeaveBalance service: ${error}`);
    throw error;
  }
};

/**
 * Get all leave balances with optional filters
 */
export const getAllLeaveBalances = async (filters: { userId?: string; leaveTypeId?: string; year?: number } = {}): Promise<LeaveBalance[]> => {
  try {
    const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
    
    // Build query
    const query: any = {};
    
    if (filters.userId) {
      query.userId = filters.userId;
    }
    
    if (filters.leaveTypeId) {
      query.leaveTypeId = filters.leaveTypeId;
    }
    
    if (filters.year) {
      query.year = filters.year;
    }
    
    // Get leave balances
    return await leaveBalanceRepository.find({
      where: query,
      relations: ['user', 'leaveType'],
      order: {
        year: 'DESC',
      },
    });
  } catch (error) {
    logger.error(`Error in getAllLeaveBalances service: ${error}`);
    throw error;
  }
};

/**
 * Get leave balance by ID
 */
export const getLeaveBalanceById = async (leaveBalanceId: string): Promise<LeaveBalance> => {
  try {
    const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
    
    // Find leave balance by ID
    const leaveBalance = await leaveBalanceRepository.findOne({
      where: { id: leaveBalanceId },
      relations: ['user', 'leaveType'],
    });
    
    if (!leaveBalance) {
      throw new Error('Leave balance not found');
    }
    
    return leaveBalance;
  } catch (error) {
    logger.error(`Error in getLeaveBalanceById service: ${error}`);
    throw error;
  }
};

/**
 * Get leave balances for a user
 */
export const getUserLeaveBalances = async (userId: string, year?: number): Promise<LeaveBalance[]> => {
  try {
    const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
    
    // Set default year if not provided
    if (!year) {
      year = getCurrentYear();
    }
    
    // Get leave balances for user and year
    return await leaveBalanceRepository.find({
      where: {
        userId,
        year,
      },
      relations: ['leaveType'],
      order: {
        leaveType: {
          name: 'ASC'
        },
      },
    });
  } catch (error) {
    logger.error(`Error in getUserLeaveBalances service: ${error}`);
    throw error;
  }
};

/**
 * Update leave balance
 */
export const updateLeaveBalance = async (leaveBalanceId: string, leaveBalanceData: Partial<LeaveBalance>): Promise<LeaveBalance> => {
  try {
    const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
    
    // Find leave balance by ID
    const leaveBalance = await leaveBalanceRepository.findOne({
      where: { id: leaveBalanceId },
    });
    
    if (!leaveBalance) {
      throw new Error('Leave balance not found');
    }
    
    // Update leave balance data
    leaveBalanceRepository.merge(leaveBalance, leaveBalanceData);
    
    // Save updated leave balance
    return await leaveBalanceRepository.save(leaveBalance);
  } catch (error) {
    logger.error(`Error in updateLeaveBalance service: ${error}`);
    throw error;
  }
};

/**
 * Delete leave balance
 */
export const deleteLeaveBalance = async (leaveBalanceId: string): Promise<void> => {
  try {
    const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
    
    // Find leave balance by ID
    const leaveBalance = await leaveBalanceRepository.findOne({
      where: { id: leaveBalanceId },
    });
    
    if (!leaveBalance) {
      throw new Error('Leave balance not found');
    }
    
    // Delete leave balance
    await leaveBalanceRepository.remove(leaveBalance);
  } catch (error) {
    logger.error(`Error in deleteLeaveBalance service: ${error}`);
    throw error;
  }
};

/**
 * Bulk create leave balances for all users
 */
export const bulkCreateLeaveBalances = async (leaveTypeId: string, year: number, resetExisting: boolean = false): Promise<number> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const leaveTypeRepository = AppDataSource.getRepository(LeaveType);
    const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
    
    // Get leave type
    const leaveType = await leaveTypeRepository.findOne({
      where: { id: leaveTypeId },
    });
    
    if (!leaveType) {
      throw new Error('Leave type not found');
    }
    
    // Get all active users
    const users = await userRepository.find({
      where: { isActive: true },
    });
    
    if (users.length === 0) {
      return 0;
    }
    
    let createdCount = 0;
    
    // Create leave balances for each user
    for (const user of users) {
      // Skip if leave type is gender-specific and user doesn't match
      if (leaveType.applicableGender && user.gender !== leaveType.applicableGender) {
        continue;
      }
      
      // Check if leave balance already exists
      const existingLeaveBalance = await leaveBalanceRepository.findOne({
        where: {
          userId: user.id,
          leaveTypeId,
          year,
        },
      });
      
      if (existingLeaveBalance) {
        if (resetExisting) {
          // Reset existing leave balance
          existingLeaveBalance.balance = leaveType.defaultDays;
          existingLeaveBalance.used = 0;
          existingLeaveBalance.carryForward = 0;
          await leaveBalanceRepository.save(existingLeaveBalance);
          createdCount++;
        }
      } else {
        // Create new leave balance
        const leaveBalance = new LeaveBalance();
        leaveBalance.userId = user.id;
        leaveBalance.leaveTypeId = leaveTypeId;
        leaveBalance.balance = leaveType.defaultDays;
        leaveBalance.used = 0;
        leaveBalance.carryForward = 0;
        leaveBalance.year = year;
        
        await leaveBalanceRepository.save(leaveBalance);
        createdCount++;
      }
    }
    
    return createdCount;
  } catch (error) {
    logger.error(`Error in bulkCreateLeaveBalances service: ${error}`);
    throw error;
  }
};

/**
 * Process carry forward for all users
 */
export const processCarryForward = async (fromYear: number, toYear: number): Promise<number> => {
  try {
    const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
    const leaveTypeRepository = AppDataSource.getRepository(LeaveType);
    
    // Get all leave types that allow carry forward
    const leaveTypes = await leaveTypeRepository.find({
      where: { isCarryForward: true },
    });
    
    if (leaveTypes.length === 0) {
      return 0;
    }
    
    let processedCount = 0;
    
    // Process carry forward for each leave type
    for (const leaveType of leaveTypes) {
      // Get all leave balances for this leave type and from year
      const fromLeaveBalances = await leaveBalanceRepository.find({
        where: {
          leaveTypeId: leaveType.id,
          year: fromYear,
        },
      });
      
      for (const fromLeaveBalance of fromLeaveBalances) {
        // Calculate remaining balance
        const remaining = fromLeaveBalance.balance + fromLeaveBalance.carryForward - fromLeaveBalance.used;
        
        if (remaining <= 0) {
          continue;
        }
        
        // Calculate carry forward amount (limited by max carry forward days)
        const carryForward = Math.min(remaining, leaveType.maxCarryForwardDays);
        
        // Check if leave balance already exists for to year
        let toLeaveBalance = await leaveBalanceRepository.findOne({
          where: {
            userId: fromLeaveBalance.userId,
            leaveTypeId: leaveType.id,
            year: toYear,
          },
        });
        
        if (toLeaveBalance) {
          // Update existing leave balance
          toLeaveBalance.carryForward = carryForward;
          await leaveBalanceRepository.save(toLeaveBalance);
        } else {
          // Create new leave balance
          toLeaveBalance = new LeaveBalance();
          toLeaveBalance.userId = fromLeaveBalance.userId;
          toLeaveBalance.leaveTypeId = leaveType.id;
          toLeaveBalance.balance = leaveType.defaultDays;
          toLeaveBalance.used = 0;
          toLeaveBalance.carryForward = carryForward;
          toLeaveBalance.year = toYear;
          
          await leaveBalanceRepository.save(toLeaveBalance);
        }
        
        processedCount++;
      }
    }
    
    return processedCount;
  } catch (error) {
    logger.error(`Error in processCarryForward service: ${error}`);
    throw error;
  }
};