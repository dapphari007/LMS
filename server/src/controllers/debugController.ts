import { Request, ResponseToolkit } from "@hapi/hapi";
import { AppDataSource } from "../config/database";
import { LeaveBalance, LeaveRequest } from "../models";
import { getCurrentYear } from "../utils/dateUtils";
import logger from "../utils/logger";

export const checkLeaveBalance = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    const userId = request.auth.credentials.id as string;
    const { leaveTypeId } = request.query as { leaveTypeId: string };

    if (!leaveTypeId) {
      return h
        .response({ message: "Leave type ID is required" })
        .code(400);
    }

    // Get leave balance
    const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
    const leaveBalance = await leaveBalanceRepository.findOne({
      where: {
        userId,
        leaveTypeId,
        year: getCurrentYear(),
      },
      relations: ["leaveType"],
    });

    if (!leaveBalance) {
      return h
        .response({ message: "Leave balance not found" })
        .code(404);
    }

    // Get pending leave requests
    const leaveRequestRepository = AppDataSource.getRepository(LeaveRequest);
    const pendingRequests = await leaveRequestRepository.createQueryBuilder('lr')
      .select('SUM(lr.numberOfDays)', 'pendingDays')
      .where('lr.userId = :userId', { userId: userId })
      .andWhere('lr.leaveTypeId = :leaveTypeId', { leaveTypeId: leaveTypeId })
      .andWhere('lr.status = :status', { status: 'pending' })
      .getRawOne();

    const pendingDays = pendingRequests?.pendingDays ? parseFloat(pendingRequests.pendingDays) : 0;
    
    // Calculate remaining days - ensure we're working with numbers
    const balance = parseFloat(leaveBalance.balance.toString()) || 0;
    const carryForward = parseFloat(leaveBalance.carryForward.toString()) || 0;
    const used = parseFloat(leaveBalance.used.toString()) || 0;
    
    // Calculate remaining days and ensure it's a valid number
    const remainingDays = balance + carryForward - used - pendingDays;
    
    // Log detailed calculation for debugging
    console.log('Detailed calculation:', {
      balanceRaw: leaveBalance.balance,
      balanceParsed: balance,
      carryForwardRaw: leaveBalance.carryForward,
      carryForwardParsed: carryForward,
      usedRaw: leaveBalance.used,
      usedParsed: used,
      pendingDaysRaw: pendingRequests?.pendingDays,
      pendingDaysParsed: pendingDays,
      calculation: `${balance} + ${carryForward} - ${used} - ${pendingDays} = ${remainingDays}`
    });
    
    // Debug the calculation
    console.log(`Leave balance calculation for ${leaveBalance.id} (${leaveBalance.leaveType?.name}):`, {
      balance,
      carryForward,
      used,
      pendingDays,
      remainingDays
    });

    // Ensure remainingDays is a valid number
    const formattedRemainingDays = isNaN(remainingDays) ? 0 : remainingDays;
    
    return h
      .response({
        leaveBalance: {
          ...leaveBalance,
          totalDays: balance,
          usedDays: used,
          pendingDays,
          remainingDays: formattedRemainingDays, // Ensure this is a valid number, not null
          carryForwardDays: carryForward
        },
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in checkLeaveBalance: ${error}`);
    return h
      .response({ message: "An error occurred while checking leave balance" })
      .code(500);
  }
};