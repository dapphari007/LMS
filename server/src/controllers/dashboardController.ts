import { Request, ResponseToolkit } from "@hapi/hapi";
import { AppDataSource } from "../config/database";
import { User, LeaveRequest, LeaveRequestStatus, Holiday, LeaveBalance, LeaveType } from "../models";
import { getCurrentYear } from "../utils/dateUtils";
import logger from "../utils/logger";
import { In, Between, LessThanOrEqual, MoreThanOrEqual } from "typeorm";

export const getManagerDashboard = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    // Ensure database connection is active
    try {
      await AppDataSource.query("SELECT 1");
    } catch (dbError) {
      logger.error("Database connection error in getManagerDashboard:", dbError);
      return h
        .response({
          message: "Database connection error",
          pendingRequests: [],
          pendingCount: 0,
          approvedRequests: [],
          approvedCount: 0,
          teamAvailability: [],
          upcomingHolidays: [],
        })
        .code(200); // Return 200 with empty data instead of 500
    }

    // Check if auth credentials exist
    if (!request.auth || !request.auth.credentials) {
      logger.error("No auth credentials found in request");
      return h
        .response({
          message: "Authentication error",
          pendingRequests: [],
          pendingCount: 0,
          approvedRequests: [],
          approvedCount: 0,
          teamAvailability: [],
          upcomingHolidays: [],
        })
        .code(200); // Return 200 with empty data instead of 500
    }

    const managerId = request.auth.credentials.id;
    const userRole = request.auth.credentials.role;
    
    logger.info(`Getting manager dashboard for user ${managerId} with role ${userRole}`);

    // Get all users managed by this manager
    const userRepository = AppDataSource.getRepository(User);
    let managedUsers = [];
    
    try {
      // For HR users, get all users in the system
      if (userRole === 'hr') {
        managedUsers = await userRepository.find({
          where: { isActive: true },
        });
        logger.info(`HR user found, returning all ${managedUsers.length} active users`);
      } else {
        // For managers, get only their direct reports
        managedUsers = await userRepository.find({
          where: { managerId: managerId as string },
        });
        logger.info(`Manager user found, returning ${managedUsers.length} managed users`);
      }
    } catch (userQueryError) {
      logger.error("Error querying users:", userQueryError);
      return h
        .response({
          message: "Error retrieving user data",
          pendingRequests: [],
          pendingCount: 0,
          approvedRequests: [],
          approvedCount: 0,
          teamAvailability: [],
          upcomingHolidays: [],
        })
        .code(200); // Return 200 with empty data instead of 500
    }

    if (managedUsers.length === 0) {
      logger.info(`No managed users found for user ${managerId}`);
      return h
        .response({
          pendingRequests: [],
          pendingCount: 0,
          approvedRequests: [],
          approvedCount: 0,
          teamAvailability: [],
          upcomingHolidays: [],
        })
        .code(200);
    }

    const managedUserIds = managedUsers.map((user) => user.id);

    // Get pending leave requests
    const leaveRequestRepository = AppDataSource.getRepository(LeaveRequest);
    const pendingRequests = await leaveRequestRepository.find({
      where: {
        userId: In(managedUserIds),
        status: LeaveRequestStatus.PENDING,
      },
      relations: ["user", "leaveType"],
      order: {
        createdAt: "DESC",
      },
      take: 5,
    });

    // Get approved leave requests for the current month
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const approvedRequests = await leaveRequestRepository.find({
      where: {
        userId: In(managedUserIds),
        status: LeaveRequestStatus.APPROVED,
        startDate: MoreThanOrEqual(startOfMonth),
        endDate: LessThanOrEqual(endOfMonth),
      },
      relations: ["user", "leaveType"],
      order: {
        startDate: "ASC",
      },
    });

    // Calculate team availability for the next 7 days
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const upcomingLeaves = await leaveRequestRepository.find({
      where: {
        userId: In(managedUserIds),
        status: LeaveRequestStatus.APPROVED,
        startDate: LessThanOrEqual(nextWeek),
        endDate: MoreThanOrEqual(today),
      },
      relations: ["user"],
    });

    // Get upcoming holidays
    const holidayRepository = AppDataSource.getRepository(Holiday);
    const upcomingHolidays = await holidayRepository.find({
      where: {
        date: Between(today, nextWeek),
        isActive: true,
      },
      order: {
        date: "ASC",
      },
    });

    // Calculate team availability
    const teamAvailability = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      date.setHours(0, 0, 0, 0);

      const formattedDate = formatDate(date);

      // Check if it's a weekend
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;

      // Check if it's a holiday
      const isHoliday = upcomingHolidays.some((holiday) => {
        const holidayDate = new Date(holiday.date);
        holidayDate.setHours(0, 0, 0, 0);
        return holidayDate.getTime() === date.getTime();
      });

      // Get users on leave for this date
      const usersOnLeave = upcomingLeaves
        .filter((leave) => {
          const startDate = new Date(leave.startDate);
          const endDate = new Date(leave.endDate);
          startDate.setHours(0, 0, 0, 0);
          endDate.setHours(0, 0, 0, 0);
          return date >= startDate && date <= endDate;
        })
        .map((leave) => ({
          id: leave.userId,
          name: `${leave.user.firstName} ${leave.user.lastName}`,
        }));

      // Calculate available users
      const availableUsers = managedUsers
        .filter(
          (user) => !usersOnLeave.some((leaveUser) => leaveUser.id === user.id)
        )
        .map((user) => ({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
        }));

      teamAvailability.push({
        date: formattedDate,
        isWeekend,
        isHoliday,
        totalUsers: managedUsers.length,
        availableUsers,
        availableCount: availableUsers.length,
        usersOnLeave,
        onLeaveCount: usersOnLeave.length,
      });
    }

    // Count pending requests
    const pendingCount = await leaveRequestRepository.count({
      where: {
        userId: In(managedUserIds),
        status: LeaveRequestStatus.PENDING,
      },
    });

    return h
      .response({
        pendingRequests,
        pendingCount,
        approvedRequests,
        approvedCount: approvedRequests.length,
        teamAvailability,
        upcomingHolidays,
      })
      .code(200);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`Error in getManagerDashboard: ${errorMessage}`);
    logger.error(`Error stack: ${error instanceof Error ? error.stack : 'No stack trace available'}`);
    
    // Return 200 with empty data instead of 500 to prevent UI errors
    return h
      .response({ 
        message: "An error occurred while fetching dashboard data",
        details: errorMessage,
        timestamp: new Date().toISOString(),
        pendingRequests: [],
        pendingCount: 0,
        approvedRequests: [],
        approvedCount: 0,
        teamAvailability: [],
        upcomingHolidays: [],
      })
      .code(200);
  }
};

export const getEmployeeDashboard = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    // Ensure database connection is active
    try {
      await AppDataSource.query("SELECT 1");
    } catch (dbError) {
      logger.error("Database connection error in getEmployeeDashboard:", dbError);
      return h
        .response({
          message: "Database connection error",
          pendingRequests: [],
          pendingCount: 0,
          approvedRequests: [],
          approvedCount: 0,
          recentHistory: [],
          upcomingHolidays: [],
          leaveBalance: [],
        })
        .code(200); // Return 200 with empty data instead of 500
    }

    // Check if auth credentials exist
    if (!request.auth || !request.auth.credentials) {
      logger.error("No auth credentials found in request");
      return h
        .response({
          message: "Authentication error",
          pendingRequests: [],
          pendingCount: 0,
          approvedRequests: [],
          approvedCount: 0,
          recentHistory: [],
          upcomingHolidays: [],
          leaveBalance: [],
        })
        .code(200); // Return 200 with empty data instead of 500
    }
    
    const userId = request.auth.credentials.id;

    // Get user's leave requests
    const leaveRequestRepository = AppDataSource.getRepository(LeaveRequest);

    // Get pending leave requests
    const pendingRequests = await leaveRequestRepository.find({
      where: {
        userId: userId as string,
        status: LeaveRequestStatus.PENDING,
      },
      relations: ["leaveType"],
      order: {
        createdAt: "DESC",
      },
    });

    // Get upcoming approved leave requests
    const today = new Date();
    const upcomingRequests = await leaveRequestRepository.find({
      where: {
        userId: userId as string,
        status: LeaveRequestStatus.APPROVED,
        startDate: MoreThanOrEqual(today),
      },
      relations: ["leaveType"],
      order: {
        startDate: "ASC",
      },
      take: 5,
    });

    // Get recent leave history
    const recentHistory = await leaveRequestRepository.find({
      where: {
        userId: userId as string,
        endDate: LessThanOrEqual(today),
      },
      relations: ["leaveType"],
      order: {
        endDate: "DESC",
      },
      take: 5,
    });

    // Get upcoming holidays
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);

    const holidayRepository = AppDataSource.getRepository(Holiday);
    const upcomingHolidays = await holidayRepository.find({
      where: {
        date: Between(today, nextMonth),
        isActive: true,
      },
      order: {
        date: "ASC",
      },
    });

    // Get leave statistics for the current year
    const currentYear = getCurrentYear();
    
    // First check if we have any leave balances for this user
    const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
    
    // Get all leave balances for this user, including relations
    const userLeaveBalances = await leaveBalanceRepository.find({
      where: { userId: userId as string, year: currentYear },
      relations: ["leaveType"]
    });
    
    const hasBalances = userLeaveBalances.length;

    let leaveBalance = [];
    
    if (hasBalances > 0) {
      // Try to use the already fetched balances first
      if (userLeaveBalances.length > 0 && userLeaveBalances[0].leaveType) {
        // Calculate pending days for each leave type
        const pendingDaysPromises = userLeaveBalances.map(async (balance) => {
          const pendingRequests = await AppDataSource.getRepository(LeaveRequest).count({
            where: {
              userId: userId as string,
              leaveTypeId: balance.leaveTypeId,
              status: LeaveRequestStatus.PENDING
            }
          });
          
          return {
            leaveTypeId: balance.leaveTypeId,
            pendingDays: pendingRequests || 0
          };
        });
        
        const pendingDaysResults = await Promise.all(pendingDaysPromises);
        
        // Format leave balances to match client expectations
        leaveBalance = userLeaveBalances.map(balance => {
          const pendingInfo = pendingDaysResults.find(p => p.leaveTypeId === balance.leaveTypeId);
          const pendingDays = pendingInfo ? pendingInfo.pendingDays : 0;
          
          return {
            id: balance.id,
            userId: balance.userId,
            leaveTypeId: balance.leaveTypeId,
            year: balance.year,
            totalDays: parseFloat(balance.balance.toString()) || 0,
            usedDays: parseFloat(balance.used.toString()) || 0,
            pendingDays: pendingDays,
            remainingDays: parseFloat((balance.balance + balance.carryForward - balance.used - pendingDays).toString()) || 0,
            carryForwardDays: parseFloat(balance.carryForward.toString()) || 0,
            leaveType: {
              id: balance.leaveType.id,
              name: balance.leaveType.name
            }
          };
        });
      } else {
        // Fallback to SQL query if relations aren't loaded properly
        const leaveStatistics = await AppDataSource.query(
          `
          SELECT 
            lt.id as "leaveTypeId",
            lt.name,
            lb.id,
            lb."userId",
            lb.balance as "totalDays",
            lb.used as "usedDays",
            COALESCE(
              (SELECT SUM(lr."numberOfDays") 
               FROM leave_requests lr 
               WHERE lr."userId" = lb."userId" 
               AND lr."leaveTypeId" = lb."leaveTypeId" 
               AND lr.status = 'pending'
              ), 0
            ) as "pendingDays",
            (lb.balance + lb."carryForward" - lb.used - 
              COALESCE(
                (SELECT SUM(lr."numberOfDays") 
                 FROM leave_requests lr 
                 WHERE lr."userId" = lb."userId" 
                 AND lr."leaveTypeId" = lb."leaveTypeId" 
                 AND lr.status = 'pending'
                ), 0
              )
            ) as "remainingDays",
            lb."carryForward" as "carryForwardDays",
            lb.year
          FROM leave_balances lb
          JOIN leave_types lt ON lb."leaveTypeId" = lt.id
          WHERE lb."userId" = $1 AND lb.year = $2
          `,
          [userId, currentYear]
        );

        // Format leave balances to match client expectations
        leaveBalance = leaveStatistics.map(balance => ({
          id: balance.id,
          userId: balance.userId,
          leaveTypeId: balance.leaveTypeId,
          year: balance.year,
          totalDays: parseFloat(balance.totalDays) || 0,
          usedDays: parseFloat(balance.usedDays) || 0,
          pendingDays: parseFloat(balance.pendingDays) || 0,
          remainingDays: parseFloat(balance.remainingDays) || 0,
          carryForwardDays: parseFloat(balance.carryForwardDays) || 0,
          leaveType: {
            id: balance.leaveTypeId,
            name: balance.name
          }
        }));
      }
    } else {
      // If no balances found, return an empty array
      // This ensures we only show leave balances that have been explicitly set by the SuperAdmin
      leaveBalance = [];
    }

    // Log the leave balance for debugging
    logger.info(`Leave balance for user ${userId}: ${JSON.stringify(leaveBalance)}`);

    return h
      .response({
        pendingRequests,
        pendingCount: pendingRequests.length,
        approvedRequests: upcomingRequests,
        approvedCount: upcomingRequests.length,
        recentHistory,
        upcomingHolidays,
        leaveBalance,
      })
      .code(200);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`Error in getEmployeeDashboard: ${errorMessage}`);
    logger.error(`Error stack: ${error instanceof Error ? error.stack : 'No stack trace available'}`);
    
    // Return 200 with empty data instead of 500 to prevent UI errors
    return h
      .response({ 
        message: "An error occurred while fetching employee dashboard data",
        details: errorMessage,
        timestamp: new Date().toISOString(),
        pendingRequests: [],
        pendingCount: 0,
        approvedRequests: [],
        approvedCount: 0,
        recentHistory: [],
        upcomingHolidays: [],
        leaveBalance: [],
      })
      .code(200);
  }
};

export const getHRDashboard = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    // Ensure database connection is active
    try {
      await AppDataSource.query("SELECT 1");
    } catch (dbError) {
      logger.error("Database connection error in getHRDashboard:", dbError);
      return h
        .response({
          message: "Database connection error",
          pendingRequests: [],
          pendingCount: 0,
          approvedRequests: [],
          approvedCount: 0,
          teamAvailability: [],
          upcomingHolidays: [],
        })
        .code(200);
    }

    // Check if auth credentials exist
    if (!request.auth || !request.auth.credentials) {
      logger.error("No auth credentials found in request");
      return h
        .response({
          message: "Authentication error",
          pendingRequests: [],
          pendingCount: 0,
          approvedRequests: [],
          approvedCount: 0,
          teamAvailability: [],
          upcomingHolidays: [],
        })
        .code(200);
    }

    const hrId = request.auth.credentials.id;
    const userRole = request.auth.credentials.role;
    
    logger.info(`Getting HR dashboard for user ${hrId} with role ${userRole}`);
    
    // Check if user has HR role
    if (userRole !== 'hr' && userRole !== 'super_admin') {
      logger.warn(`User ${hrId} with role ${userRole} attempted to access HR dashboard`);
      // Still return data but log the warning
    }
    logger.info(`Getting HR dashboard for user ${hrId}`);

    // Get all active users in the system
    const userRepository = AppDataSource.getRepository(User);
    let allUsers = [];
    
    try {
      allUsers = await userRepository.find({
        where: { isActive: true },
      });
      logger.info(`HR dashboard: found ${allUsers.length} active users`);
    } catch (userQueryError) {
      logger.error("Error querying users in HR dashboard:", userQueryError);
      return h
        .response({
          message: "Error retrieving user data",
          pendingRequests: [],
          pendingCount: 0,
          approvedRequests: [],
          approvedCount: 0,
          teamAvailability: [],
          upcomingHolidays: [],
        })
        .code(200);
    }

    if (allUsers.length === 0) {
      logger.info(`No active users found in the system`);
      return h
        .response({
          pendingRequests: [],
          pendingCount: 0,
          approvedRequests: [],
          approvedCount: 0,
          teamAvailability: [],
          upcomingHolidays: [],
        })
        .code(200);
    }

    const allUserIds = allUsers.map((user) => user.id);

    // Get pending leave requests
    const leaveRequestRepository = AppDataSource.getRepository(LeaveRequest);
    let pendingRequests = [];
    
    try {
      pendingRequests = await leaveRequestRepository.find({
        where: {
          userId: In(allUserIds),
          status: LeaveRequestStatus.PENDING,
        },
        relations: ["user", "leaveType"],
        order: {
          createdAt: "DESC",
        },
        take: 5,
      });
    } catch (error) {
      logger.error("Error fetching pending requests for HR dashboard:", error);
      pendingRequests = [];
    }

    // Get approved leave requests for the current month
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    let approvedRequests = [];
    try {
      approvedRequests = await leaveRequestRepository.find({
        where: {
          userId: In(allUserIds),
          status: LeaveRequestStatus.APPROVED,
          startDate: MoreThanOrEqual(startOfMonth),
          endDate: LessThanOrEqual(endOfMonth),
        },
        relations: ["user", "leaveType"],
        order: {
          startDate: "ASC",
        },
      });
    } catch (error) {
      logger.error("Error fetching approved requests for HR dashboard:", error);
      approvedRequests = [];
    }

    // Get upcoming holidays
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    let upcomingHolidays = [];
    try {
      const holidayRepository = AppDataSource.getRepository(Holiday);
      upcomingHolidays = await holidayRepository.find({
        where: {
          date: Between(today, nextWeek),
          isActive: true,
        },
        order: {
          date: "ASC",
        },
      });
    } catch (error) {
      logger.error("Error fetching holidays for HR dashboard:", error);
      upcomingHolidays = [];
    }

    // Calculate team availability for the next 7 days
    let teamAvailability = [];
    try {
      const upcomingLeaves = await leaveRequestRepository.find({
        where: {
          userId: In(allUserIds),
          status: LeaveRequestStatus.APPROVED,
          startDate: LessThanOrEqual(nextWeek),
          endDate: MoreThanOrEqual(today),
        },
        relations: ["user"],
      });

      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        date.setHours(0, 0, 0, 0);

        const formattedDate = formatDate(date);

        // Check if it's a weekend
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;

        // Check if it's a holiday
        const isHoliday = upcomingHolidays.some((holiday) => {
          const holidayDate = new Date(holiday.date);
          holidayDate.setHours(0, 0, 0, 0);
          return holidayDate.getTime() === date.getTime();
        });

        // Get users on leave for this date
        const usersOnLeave = upcomingLeaves
          .filter((leave) => {
            const startDate = new Date(leave.startDate);
            const endDate = new Date(leave.endDate);
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(0, 0, 0, 0);
            return date >= startDate && date <= endDate;
          })
          .map((leave) => ({
            id: leave.userId,
            name: `${leave.user.firstName} ${leave.user.lastName}`,
          }));

        // Calculate available users
        const availableUsers = allUsers
          .filter(
            (user) => !usersOnLeave.some((leaveUser) => leaveUser.id === user.id)
          )
          .map((user) => ({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
          }));

        teamAvailability.push({
          date: formattedDate,
          isWeekend,
          isHoliday,
          totalUsers: allUsers.length,
          availableUsers,
          availableCount: availableUsers.length,
          usersOnLeave,
          onLeaveCount: usersOnLeave.length,
        });
      }
    } catch (error) {
      logger.error("Error calculating team availability for HR dashboard:", error);
      teamAvailability = [];
    }

    // Count pending requests
    let pendingCount = 0;
    try {
      pendingCount = await leaveRequestRepository.count({
        where: {
          userId: In(allUserIds),
          status: LeaveRequestStatus.PENDING,
        },
      });
    } catch (error) {
      logger.error("Error counting pending requests for HR dashboard:", error);
      pendingCount = 0;
    }

    return h
      .response({
        pendingRequests,
        pendingCount,
        approvedRequests,
        approvedCount: approvedRequests.length,
        teamAvailability,
        upcomingHolidays,
      })
      .code(200);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`Error in getHRDashboard: ${errorMessage}`);
    logger.error(`Error stack: ${error instanceof Error ? error.stack : 'No stack trace available'}`);
    
    // Return 200 with empty data instead of 500 to prevent UI errors
    return h
      .response({ 
        message: "An error occurred while fetching HR dashboard data",
        details: errorMessage,
        timestamp: new Date().toISOString(),
        pendingRequests: [],
        pendingCount: 0,
        approvedRequests: [],
        approvedCount: 0,
        teamAvailability: [],
        upcomingHolidays: [],
      })
      .code(200);
  }
};

// Helper functions
function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}
