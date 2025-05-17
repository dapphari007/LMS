import { Request, ResponseToolkit } from "@hapi/hapi";
import { AppDataSource } from "../config/database";
import { LeaveBalance, User, LeaveType, Gender, LeaveRequest } from "../models";
import { getCurrentYear } from "../utils/dateUtils";
import emailService from "../utils/emailService";
import logger from "../utils/logger";

export const createLeaveBalance = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    const { userId, leaveTypeId, balance, used, carryForward, year } =
      request.payload as any;

    // Validate input
    if (!userId || !leaveTypeId || balance === undefined) {
      return h
        .response({
          message: "User ID, leave type ID, and balance are required",
        })
        .code(400);
    }

    // Check if user exists
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return h.response({ message: "User not found" }).code(404);
    }

    // Check if leave type exists
    const leaveTypeRepository = AppDataSource.getRepository(LeaveType);
    const leaveType = await leaveTypeRepository.findOne({
      where: { id: leaveTypeId },
    });

    if (!leaveType) {
      return h.response({ message: "Leave type not found" }).code(404);
    }

    // Check if leave type is applicable for the user's gender
    if (
      leaveType.applicableGender &&
      user.gender !== leaveType.applicableGender
    ) {
      return h
        .response({
          message: `This leave type is only applicable for ${leaveType.applicableGender} employees`,
        })
        .code(400);
    }

    // Check if leave balance already exists for this user, leave type, and year
    const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
    const existingLeaveBalance = await leaveBalanceRepository.findOne({
      where: {
        userId,
        leaveTypeId,
        year: year || getCurrentYear(),
      },
    });

    if (existingLeaveBalance) {
      return h
        .response({
          message:
            "Leave balance already exists for this user, leave type, and year",
        })
        .code(409);
    }

    // Create new leave balance
    const leaveBalance = new LeaveBalance();
    leaveBalance.userId = userId;
    leaveBalance.leaveTypeId = leaveTypeId;
    leaveBalance.balance = balance;
    leaveBalance.used = used || 0;
    leaveBalance.carryForward = carryForward || 0;
    leaveBalance.year = year || getCurrentYear();

    // Save leave balance to database
    const savedLeaveBalance = await leaveBalanceRepository.save(leaveBalance);

    // Send email notification
    await emailService.sendLeaveBalanceUpdateNotification(
      user.email,
      leaveType.name,
      balance
    );

    return h
      .response({
        message: "Leave balance created successfully",
        leaveBalance: savedLeaveBalance,
      })
      .code(201);
  } catch (error) {
    logger.error(`Error in createLeaveBalance: ${error}`);
    return h
      .response({
        message: "An error occurred while creating the leave balance",
      })
      .code(500);
  }
};

export const getAllLeaveBalances = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    const { userId, leaveTypeId, year } = request.query as any;

    // Build query
    const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (leaveTypeId) {
      query.leaveTypeId = leaveTypeId;
    }

    if (year) {
      query.year = year;
    }

    // Get leave balances with relations
    const leaveBalances = await leaveBalanceRepository.find({
      where: query,
      relations: ["user", "leaveType"],
      order: {
        year: "DESC",
      },
    });

    // Get pending days for each leave balance
    const leaveRequestRepository = AppDataSource.getRepository(LeaveRequest);
    const enhancedLeaveBalances = await Promise.all(
      leaveBalances.map(async (balance) => {
        try {
          // Get pending leave requests for this user and leave type
          const pendingRequests = await leaveRequestRepository.createQueryBuilder('lr')
            .select('SUM(lr.numberOfDays)', 'pendingDays')
            .where('lr.userId = :userId', { userId: balance.userId })
            .andWhere('lr.leaveTypeId = :leaveTypeId', { leaveTypeId: balance.leaveTypeId })
            .andWhere('lr.status = :status', { status: 'pending' })
            .getRawOne();

          const pendingDays = pendingRequests?.pendingDays ? parseFloat(pendingRequests.pendingDays) : 0;
          
          // Calculate remaining days
          const remainingDays = balance.balance + balance.carryForward - balance.used - pendingDays;
          
          // Return enhanced balance with additional fields for client compatibility
          return {
            ...balance,
            // Add client-side field names
            totalDays: balance.balance,
            usedDays: balance.used,
            pendingDays,
            remainingDays,
            carryForwardDays: balance.carryForward
          };
        } catch (error) {
          logger.error(`Error calculating pending days for balance ${balance.id}: ${error}`);
          return {
            ...balance,
            // Add client-side field names with default values
            totalDays: balance.balance,
            usedDays: balance.used,
            pendingDays: 0,
            remainingDays: balance.balance + balance.carryForward - balance.used,
            carryForwardDays: balance.carryForward
          };
        }
      })
    );

    return h
      .response({
        leaveBalances: enhancedLeaveBalances,
        count: enhancedLeaveBalances.length,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in getAllLeaveBalances: ${error}`);
    return h
      .response({ message: "An error occurred while fetching leave balances" })
      .code(500);
  }
};

export const getLeaveBalanceById = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    const { id } = request.params;

    // Get leave balance
    const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
    const leaveBalance = await leaveBalanceRepository.findOne({
      where: { id },
      relations: ["user", "leaveType"],
    });

    if (!leaveBalance) {
      return h.response({ message: "Leave balance not found" }).code(404);
    }

    // Get pending days for this leave balance
    const leaveRequestRepository = AppDataSource.getRepository(LeaveRequest);
    try {
      // Get pending leave requests for this user and leave type
      const pendingRequests = await leaveRequestRepository.createQueryBuilder('lr')
        .select('SUM(lr.numberOfDays)', 'pendingDays')
        .where('lr.userId = :userId', { userId: leaveBalance.userId })
        .andWhere('lr.leaveTypeId = :leaveTypeId', { leaveTypeId: leaveBalance.leaveTypeId })
        .andWhere('lr.status = :status', { status: 'pending' })
        .getRawOne();

      const pendingDays = pendingRequests?.pendingDays ? parseFloat(pendingRequests.pendingDays) : 0;
      
      // Calculate remaining days
      const remainingDays = leaveBalance.balance + leaveBalance.carryForward - leaveBalance.used - pendingDays;
      
      // Return enhanced balance with additional fields for client compatibility
      const enhancedLeaveBalance = {
        ...leaveBalance,
        // Add client-side field names
        totalDays: leaveBalance.balance,
        usedDays: leaveBalance.used,
        pendingDays,
        remainingDays,
        carryForwardDays: leaveBalance.carryForward
      };

      return h
        .response({
          leaveBalance: enhancedLeaveBalance,
        })
        .code(200);
    } catch (error) {
      logger.error(`Error calculating pending days for balance ${id}: ${error}`);
      
      // Return with default values if there's an error
      const enhancedLeaveBalance = {
        ...leaveBalance,
        // Add client-side field names with default values
        totalDays: leaveBalance.balance,
        usedDays: leaveBalance.used,
        pendingDays: 0,
        remainingDays: leaveBalance.balance + leaveBalance.carryForward - leaveBalance.used,
        carryForwardDays: leaveBalance.carryForward
      };
      
      return h
        .response({
          leaveBalance: enhancedLeaveBalance,
        })
        .code(200);
    }
  } catch (error) {
    logger.error(`Error in getLeaveBalanceById: ${error}`);
    return h
      .response({
        message: "An error occurred while fetching the leave balance",
      })
      .code(500);
  }
};

export const getUserLeaveBalances = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    const userId = request.auth.credentials.id;
    const { year } = request.query as any;

    // Build query
    const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
    let query: any = { userId };

    if (year) {
      query.year = year;
    } else {
      query.year = getCurrentYear();
    }

    // Get leave balances
    const leaveBalances = await leaveBalanceRepository.find({
      where: query,
      relations: ["leaveType"],
      order: {
        leaveType: {
          name: "ASC",
        },
      },
    });
    
    // Debug the raw leave balances
    console.log(`Raw leave balances for user ${userId}:`, JSON.stringify(leaveBalances, null, 2));

    // Get pending days for each leave balance
    const leaveRequestRepository = AppDataSource.getRepository(LeaveRequest);
    
    // Enhance leave balances with pending days and remaining days
    const enhancedLeaveBalances = await Promise.all(
      leaveBalances.map(async (balance) => {
        try {
          // Get pending leave requests for this user and leave type
          const pendingRequests = await leaveRequestRepository.createQueryBuilder('lr')
            .select('SUM(lr.numberOfDays)', 'pendingDays')
            .where('lr.userId = :userId', { userId: balance.userId })
            .andWhere('lr.leaveTypeId = :leaveTypeId', { leaveTypeId: balance.leaveTypeId })
            .andWhere('lr.status = :status', { status: 'pending' })
            .getRawOne();

          const pendingDays = pendingRequests?.pendingDays ? parseFloat(pendingRequests.pendingDays) : 0;
          
          // Calculate remaining days
          const remainingDays = balance.balance + balance.carryForward - balance.used - pendingDays;
          
          // Return enhanced balance with additional fields for client compatibility
          return {
            ...balance,
            // Add client-side field names
            totalDays: balance.balance,
            usedDays: balance.used,
            pendingDays,
            remainingDays,
            carryForwardDays: balance.carryForward
          };
        } catch (error) {
          logger.error(`Error calculating pending days for balance ${balance.id}: ${error}`);
          return {
            ...balance,
            // Add client-side field names with default values
            totalDays: balance.balance,
            usedDays: balance.used,
            pendingDays: 0,
            remainingDays: balance.balance + balance.carryForward - balance.used,
            carryForwardDays: balance.carryForward
          };
        }
      })
    );

    return h
      .response({
        leaveBalances: enhancedLeaveBalances,
        count: enhancedLeaveBalances.length,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in getUserLeaveBalances: ${error}`);
    return h
      .response({ message: "An error occurred while fetching leave balances" })
      .code(500);
  }
};

export const updateLeaveBalance = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    const { id } = request.params;
    const { totalDays, adjustmentReason, balance, used, carryForward } = request.payload as any;

    // Get leave balance
    const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
    const leaveBalance = await leaveBalanceRepository.findOne({
      where: { id },
      relations: ["user", "leaveType"],
    });

    if (!leaveBalance) {
      return h.response({ message: "Leave balance not found" }).code(404);
    }

    // Update leave balance fields
    // Handle both formats - the admin UI sends totalDays, while API might send balance directly
    if (totalDays !== undefined) {
      leaveBalance.balance = totalDays;
      logger.info(`Updating leave balance for ${id} to ${totalDays} days (reason: ${adjustmentReason || 'Not provided'})`);
    } else if (balance !== undefined) {
      leaveBalance.balance = balance;
    }
    
    if (used !== undefined) leaveBalance.used = used;
    if (carryForward !== undefined) leaveBalance.carryForward = carryForward;

    // Save updated leave balance
    const updatedLeaveBalance = await leaveBalanceRepository.save(leaveBalance);

    // Send email notification
    if ((totalDays !== undefined || balance !== undefined) && leaveBalance.user && leaveBalance.leaveType) {
      await emailService.sendLeaveBalanceUpdateNotification(
        leaveBalance.user.email,
        leaveBalance.leaveType.name,
        totalDays !== undefined ? totalDays : balance
      );
    }

    return h
      .response({
        message: "Leave balance updated successfully",
        leaveBalance: updatedLeaveBalance,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in updateLeaveBalance: ${error}`);
    return h
      .response({
        message: "An error occurred while updating the leave balance",
      })
      .code(500);
  }
};

export const deleteLeaveBalance = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    const { id } = request.params;

    // Get leave balance
    const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
    const leaveBalance = await leaveBalanceRepository.findOne({
      where: { id },
    });

    if (!leaveBalance) {
      return h.response({ message: "Leave balance not found" }).code(404);
    }

    // Delete leave balance
    await leaveBalanceRepository.remove(leaveBalance);

    return h
      .response({
        message: "Leave balance deleted successfully",
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in deleteLeaveBalance: ${error}`);
    return h
      .response({
        message: "An error occurred while deleting the leave balance",
      })
      .code(500);
  }
};

export const bulkCreateLeaveBalances = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    const { leaveTypeId, year, resetExisting } = request.payload as any;

    // Validate input
    if (!leaveTypeId) {
      return h.response({ message: "Leave type ID is required" }).code(400);
    }

    // Check if leave type exists
    const leaveTypeRepository = AppDataSource.getRepository(LeaveType);
    const leaveType = await leaveTypeRepository.findOne({
      where: { id: leaveTypeId },
    });

    if (!leaveType) {
      return h.response({ message: "Leave type not found" }).code(404);
    }

    // Get all active users
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find({ where: { isActive: true } });

    // Get current year if not provided
    const targetYear = year || getCurrentYear();

    // Create leave balances for all users
    const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
    const results = {
      created: 0,
      updated: 0,
      skipped: 0,
    };

    for (const user of users) {
      // Skip users with incompatible gender for gender-specific leave types
      if (
        leaveType.applicableGender &&
        user.gender !== leaveType.applicableGender
      ) {
        results.skipped++;
        continue;
      }

      // Check if leave balance already exists
      const existingLeaveBalance = await leaveBalanceRepository.findOne({
        where: {
          userId: user.id,
          leaveTypeId,
          year: targetYear,
        },
      });

      if (existingLeaveBalance) {
        if (resetExisting) {
          // Update existing leave balance
          existingLeaveBalance.balance = leaveType.defaultDays;
          existingLeaveBalance.used = 0;

          // Calculate carry forward if enabled
          if (leaveType.isCarryForward) {
            const previousYearBalance = await leaveBalanceRepository.findOne({
              where: {
                userId: user.id,
                leaveTypeId,
                year: targetYear - 1,
              },
            });

            if (previousYearBalance) {
              const remainingBalance =
                previousYearBalance.balance - previousYearBalance.used;
              existingLeaveBalance.carryForward = Math.min(
                remainingBalance > 0 ? remainingBalance : 0,
                leaveType.maxCarryForwardDays
              );
            }
          } else {
            existingLeaveBalance.carryForward = 0;
          }

          await leaveBalanceRepository.save(existingLeaveBalance);
          results.updated++;

          // Send email notification
          await emailService.sendLeaveBalanceUpdateNotification(
            user.email,
            leaveType.name,
            existingLeaveBalance.balance + existingLeaveBalance.carryForward
          );
        } else {
          results.skipped++;
        }
      } else {
        // Create new leave balance
        const leaveBalance = new LeaveBalance();
        leaveBalance.userId = user.id;
        leaveBalance.leaveTypeId = leaveTypeId;
        leaveBalance.balance = leaveType.defaultDays;
        leaveBalance.used = 0;

        // Calculate carry forward if enabled
        if (leaveType.isCarryForward) {
          const previousYearBalance = await leaveBalanceRepository.findOne({
            where: {
              userId: user.id,
              leaveTypeId,
              year: targetYear - 1,
            },
          });

          if (previousYearBalance) {
            const remainingBalance =
              previousYearBalance.balance - previousYearBalance.used;
            leaveBalance.carryForward = Math.min(
              remainingBalance > 0 ? remainingBalance : 0,
              leaveType.maxCarryForwardDays
            );
          } else {
            leaveBalance.carryForward = 0;
          }
        } else {
          leaveBalance.carryForward = 0;
        }

        leaveBalance.year = targetYear;

        await leaveBalanceRepository.save(leaveBalance);
        results.created++;

        // Send email notification
        await emailService.sendLeaveBalanceUpdateNotification(
          user.email,
          leaveType.name,
          leaveBalance.balance + leaveBalance.carryForward
        );
      }
    }

    return h
      .response({
        message: "Bulk leave balance creation completed",
        results,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in bulkCreateLeaveBalances: ${error}`);
    return h
      .response({ message: "An error occurred while creating leave balances" })
      .code(500);
  }
};

export const createAllLeaveBalancesForAllUsers = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    // Get all active leave types
    const leaveTypeRepository = AppDataSource.getRepository(LeaveType);
    const leaveTypes = await leaveTypeRepository.find({
      where: { isActive: true },
    });

    if (leaveTypes.length === 0) {
      return h.response({ message: "No active leave types found" }).code(404);
    }

    // Get all active users
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find({ where: { isActive: true } });

    if (users.length === 0) {
      return h.response({ message: "No active users found" }).code(404);
    }

    // Get current year
    const targetYear = getCurrentYear();

    // Create leave balances for all users and all leave types
    const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
    const results = {
      created: 0,
      updated: 0,
      skipped: 0,
      leaveTypes: leaveTypes.length,
      users: users.length,
    };

    for (const leaveType of leaveTypes) {
      for (const user of users) {
        // Skip users with incompatible gender for gender-specific leave types
        if (
          leaveType.applicableGender &&
          user.gender !== leaveType.applicableGender
        ) {
          results.skipped++;
          continue;
        }

        // Check if leave balance already exists
        const existingLeaveBalance = await leaveBalanceRepository.findOne({
          where: {
            userId: user.id,
            leaveTypeId: leaveType.id,
            year: targetYear,
          },
        });

        if (existingLeaveBalance) {
          // Update existing leave balance
          existingLeaveBalance.balance = leaveType.defaultDays;

          // Calculate carry forward if enabled
          if (leaveType.isCarryForward) {
            const previousYearBalance = await leaveBalanceRepository.findOne({
              where: {
                userId: user.id,
                leaveTypeId: leaveType.id,
                year: targetYear - 1,
              },
            });

            if (previousYearBalance) {
              const remainingBalance =
                previousYearBalance.balance - previousYearBalance.used;
              existingLeaveBalance.carryForward = Math.min(
                remainingBalance > 0 ? remainingBalance : 0,
                leaveType.maxCarryForwardDays
              );
            }
          }

          await leaveBalanceRepository.save(existingLeaveBalance);
          results.updated++;

          // Send email notification
          await emailService.sendLeaveBalanceUpdateNotification(
            user.email,
            leaveType.name,
            existingLeaveBalance.balance + existingLeaveBalance.carryForward
          );
        } else {
          // Create new leave balance
          const leaveBalance = new LeaveBalance();
          leaveBalance.userId = user.id;
          leaveBalance.leaveTypeId = leaveType.id;
          leaveBalance.balance = leaveType.defaultDays;
          leaveBalance.used = 0;
          leaveBalance.carryForward = 0;
          leaveBalance.year = targetYear;

          await leaveBalanceRepository.save(leaveBalance);
          results.created++;

          // Send email notification
          await emailService.sendLeaveBalanceUpdateNotification(
            user.email,
            leaveType.name,
            leaveType.defaultDays
          );
        }
      }
    }

    return h
      .response({
        message: "All leave balances creation completed for all users",
        results,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in createAllLeaveBalancesForAllUsers: ${error}`);
    return h
      .response({ message: "An error occurred while creating leave balances" })
      .code(500);
  }
};

export const checkDatabaseFlushed = async (
  req: Request,
  h: ResponseToolkit
) => {
  try {
    const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
    const leaveBalances = await leaveBalanceRepository.find();
    const isFlushed = leaveBalances.length === 0;
    return h.response({ isFlushed }).code(200);
  } catch (error) {
    console.error("Error checking database flush status:", error);
    return h
      .response({ message: "Error checking database flush status" })
      .code(500);
  }
};
