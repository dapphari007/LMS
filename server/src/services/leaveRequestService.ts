import { AppDataSource, ensureDatabaseConnection } from "../config/database";
import {
  LeaveRequest,
  LeaveRequestStatus,
  LeaveRequestType,
  LeaveType,
  User,
  LeaveBalance,
  ApprovalWorkflow,
} from "../models";
import { calculateBusinessDays } from "../utils/dateUtils";
import emailService from "../utils/emailService";
import logger from "../utils/logger";
import {
  LessThanOrEqual as TypeORMLessThanOrEqual,
  MoreThanOrEqual as TypeORMMoreThanOrEqual,
  Between as TypeORMBetween,
  In as TypeORMIn,
} from "typeorm";

/**
 * Create a new leave request
 */
export const createLeaveRequest = async (
  userId: string,
  leaveRequestData: Partial<LeaveRequest>
): Promise<LeaveRequest> => {
  try {
    const leaveRequestRepository = AppDataSource.getRepository(LeaveRequest);
    const leaveTypeRepository = AppDataSource.getRepository(LeaveType);
    const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
    const userRepository = AppDataSource.getRepository(User);

    // Get user
    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ["manager"],
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Get leave type
    const leaveType = await leaveTypeRepository.findOne({
      where: { id: leaveRequestData.leaveTypeId },
    });

    if (!leaveType) {
      throw new Error("Leave type not found");
    }

    // Check if leave type is applicable for user's gender
    if (
      leaveType.applicableGender &&
      user.gender !== leaveType.applicableGender
    ) {
      throw new Error(
        `This leave type is only applicable for ${leaveType.applicableGender} employees`
      );
    }

    // Check if half-day is allowed for this leave type
    if (
      (leaveRequestData.requestType === LeaveRequestType.HALF_DAY_MORNING ||
        leaveRequestData.requestType === LeaveRequestType.HALF_DAY_AFTERNOON) &&
      !leaveType.isHalfDayAllowed
    ) {
      throw new Error("Half-day leave is not allowed for this leave type");
    }

    // Calculate number of days
    const startDate = new Date(leaveRequestData.startDate);
    const endDate = new Date(leaveRequestData.endDate);

    if (startDate > endDate) {
      throw new Error("Start date cannot be after end date");
    }

    let numberOfDays: number;

    // Adjust for half-day
    if (
      leaveRequestData.requestType === LeaveRequestType.HALF_DAY_MORNING ||
      leaveRequestData.requestType === LeaveRequestType.HALF_DAY_AFTERNOON
    ) {
      if (startDate.getTime() !== endDate.getTime()) {
        throw new Error(
          "Start date and end date must be the same for half-day leave"
        );
      }
      numberOfDays = 0.5;
    } else {
      // Calculate business days for full day requests
      numberOfDays = await calculateBusinessDays(startDate, endDate);
    }

    if (numberOfDays <= 0) {
      throw new Error("Invalid date range");
    }

    // Check for overlapping leave requests
    const overlappingRequests = await leaveRequestRepository.find({
      where: {
        userId,
        status: LeaveRequestStatus.APPROVED,
        startDate: TypeORMLessThanOrEqual(endDate),
        endDate: TypeORMMoreThanOrEqual(startDate),
      },
    });

    if (overlappingRequests.length > 0) {
      throw new Error(
        "You already have an approved leave request for this period"
      );
    }

    // Get leave balance for current year
    const currentYear = new Date().getFullYear();
    let leaveBalance = await leaveBalanceRepository.findOne({
      where: {
        userId,
        leaveTypeId: leaveType.id,
        year: currentYear,
      },
    });

    if (!leaveBalance) {
      // Create leave balance if it doesn't exist
      leaveBalance = new LeaveBalance();
      leaveBalance.userId = userId;
      leaveBalance.leaveTypeId = leaveType.id;
      leaveBalance.balance = leaveType.defaultDays;
      leaveBalance.used = 0;
      leaveBalance.carryForward = 0;
      leaveBalance.year = currentYear;

      leaveBalance = await leaveBalanceRepository.save(leaveBalance);
    }

    // Check if user has enough leave balance
    const availableBalance =
      leaveBalance.balance + leaveBalance.carryForward - leaveBalance.used;

    if (numberOfDays > availableBalance && leaveType.isPaidLeave) {
      throw new Error(
        `Insufficient leave balance. Available: ${availableBalance} days, Requested: ${numberOfDays} days`
      );
    }

    // Create leave request
    const leaveRequest = new LeaveRequest();
    leaveRequest.userId = userId;
    leaveRequest.leaveTypeId = leaveType.id;
    leaveRequest.startDate = startDate;
    leaveRequest.endDate = endDate;
    leaveRequest.requestType =
      leaveRequestData.requestType || LeaveRequestType.FULL_DAY;
    leaveRequest.numberOfDays = numberOfDays;
    leaveRequest.reason = leaveRequestData.reason;
    leaveRequest.status = LeaveRequestStatus.PENDING;

    const savedLeaveRequest = await leaveRequestRepository.save(leaveRequest);

    // Send email notification to manager
    if (user.managerId) {
      try {
        const manager = await userRepository.findOne({
          where: { id: user.managerId },
        });
        if (manager) {
          await emailService.sendLeaveRequestNotification(
            manager.email,
            `${user.firstName} ${user.lastName}`,
            leaveType.name,
            startDate.toDateString(),
            endDate.toDateString(),
            leaveRequestData.reason
          );
        }
      } catch (emailError) {
        logger.error(`Error sending email notification: ${emailError}`);
      }
    }

    return savedLeaveRequest;
  } catch (error) {
    logger.error(`Error in createLeaveRequest service: ${error}`);
    throw error;
  }
};

/**
 * Get all leave requests with optional filters
 */
export const getAllLeaveRequests = async (
  filters: {
    userId?: string;
    status?: LeaveRequestStatus;
    startDate?: Date;
    endDate?: Date;
  } = {}
): Promise<LeaveRequest[]> => {
  try {
    const leaveRequestRepository = AppDataSource.getRepository(LeaveRequest);

    // Build query
    const query: any = {};

    if (filters.userId) {
      query.userId = filters.userId;
    }

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.startDate) {
      query.startDate = TypeORMMoreThanOrEqual(filters.startDate);
    }

    if (filters.endDate) {
      query.endDate = TypeORMLessThanOrEqual(filters.endDate);
    }

    // Get leave requests
    return await leaveRequestRepository.find({
      where: query,
      relations: ["user", "leaveType", "approver"],
      order: {
        createdAt: "DESC",
      },
    });
  } catch (error) {
    logger.error(`Error in getAllLeaveRequests service: ${error}`);
    throw error;
  }
};

/**
 * Get leave request by ID
 */
export const getLeaveRequestById = async (
  leaveRequestId: string
): Promise<LeaveRequest> => {
  try {
    const leaveRequestRepository = AppDataSource.getRepository(LeaveRequest);

    // Find leave request by ID
    const leaveRequest = await leaveRequestRepository.findOne({
      where: { id: leaveRequestId },
      relations: ["user", "leaveType", "approver"],
    });

    if (!leaveRequest) {
      throw new Error("Leave request not found");
    }

    return leaveRequest;
  } catch (error) {
    logger.error(`Error in getLeaveRequestById service: ${error}`);
    throw error;
  }
};

/**
 * Get leave requests for a user
 */
export const getUserLeaveRequests = async (
  userId: string,
  filters: { status?: LeaveRequestStatus; year?: number } = {}
): Promise<LeaveRequest[]> => {
  try {
    const leaveRequestRepository = AppDataSource.getRepository(LeaveRequest);

    // Build query
    const query: any = { userId };

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.year) {
      const startOfYear = new Date(filters.year, 0, 1);
      const endOfYear = new Date(filters.year, 11, 31);
      query.startDate = TypeORMMoreThanOrEqual(startOfYear);
      query.endDate = TypeORMLessThanOrEqual(endOfYear);
    }

    // Get leave requests
    return await leaveRequestRepository.find({
      where: query,
      relations: ["leaveType", "approver"],
      order: {
        createdAt: "DESC",
      },
    });
  } catch (error) {
    logger.error(`Error in getUserLeaveRequests service: ${error}`);
    throw error;
  }
};

/**
 * Get leave requests for a manager's team
 */
export const getManagerLeaveRequests = async (
  managerId: string,
  filters: {
    status?: LeaveRequestStatus;
    startDate?: Date;
    endDate?: Date;
  } = {}
): Promise<LeaveRequest[]> => {
  try {
    const userRepository = AppDataSource.getRepository(User);

    // Get users managed by this manager
    const managedUsers = await userRepository.find({
      where: { managerId },
    });

    if (managedUsers.length === 0) {
      return [];
    }

    const managedUserIds = managedUsers.map((user) => user.id);

    const leaveRequestRepository = AppDataSource.getRepository(LeaveRequest);

    // Build query
    const query: any = { userId: TypeORMIn(managedUserIds) };

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.startDate) {
      query.startDate = TypeORMMoreThanOrEqual(filters.startDate);
    }

    if (filters.endDate) {
      query.endDate = TypeORMLessThanOrEqual(filters.endDate);
    }

    // Get leave requests
    return await leaveRequestRepository.find({
      where: query,
      relations: ["user", "leaveType"],
      order: {
        createdAt: "DESC",
      },
    });
  } catch (error) {
    logger.error(`Error in getManagerLeaveRequests service: ${error}`);
    throw error;
  }
};

/**
 * Update leave request status
 */
export const updateLeaveRequestStatus = async (
  leaveRequestId: string,
  status: LeaveRequestStatus,
  approverId: string,
  comments?: string
): Promise<LeaveRequest> => {
  try {
    const leaveRequestRepository = AppDataSource.getRepository(LeaveRequest);
    const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
    const userRepository = AppDataSource.getRepository(User);

    // Find leave request by ID
    const leaveRequest = await leaveRequestRepository.findOne({
      where: { id: leaveRequestId },
      relations: ["user", "leaveType"],
    });

    if (!leaveRequest) {
      throw new Error("Leave request not found");
    }

    // Check if leave request is already in the requested status
    if (leaveRequest.status === status) {
      throw new Error(`Leave request is already ${status}`);
    }

    // Check if leave request is pending
    if (leaveRequest.status !== LeaveRequestStatus.PENDING) {
      throw new Error(
        `Cannot update status of a ${leaveRequest.status} leave request`
      );
    }

    // Get approver
    const approver = await userRepository.findOne({
      where: { id: approverId },
    });

    if (!approver) {
      throw new Error("Approver not found");
    }

    // Update leave request status
    leaveRequest.status = status;
    leaveRequest.approverId = approverId;
    leaveRequest.approverComments = comments;
    leaveRequest.approvedAt = new Date();

    // If approved, update leave balance
    if (
      status === LeaveRequestStatus.APPROVED &&
      leaveRequest.leaveType.isPaidLeave
    ) {
      const currentYear = new Date().getFullYear();
      const leaveBalance = await leaveBalanceRepository.findOne({
        where: {
          userId: leaveRequest.userId,
          leaveTypeId: leaveRequest.leaveTypeId,
          year: currentYear,
        },
      });

      if (leaveBalance) {
        leaveBalance.used += leaveRequest.numberOfDays;
        await leaveBalanceRepository.save(leaveBalance);
      }
    }

    const updatedLeaveRequest = await leaveRequestRepository.save(leaveRequest);

    // Send email notification to user
    try {
      await emailService.sendLeaveStatusUpdateNotification(
        leaveRequest.user.email,
        leaveRequest.leaveType.name,
        leaveRequest.startDate.toDateString(),
        leaveRequest.endDate.toDateString(),
        status,
        comments
      );
    } catch (emailError) {
      logger.error(`Error sending email notification: ${emailError}`);
    }

    return updatedLeaveRequest;
  } catch (error) {
    logger.error(`Error in updateLeaveRequestStatus service: ${error}`);
    throw error;
  }
};

/**
 * Cancel leave request
 */
export const cancelLeaveRequest = async (
  leaveRequestId: string,
  userId: string
): Promise<LeaveRequest> => {
  try {
    const leaveRequestRepository = AppDataSource.getRepository(LeaveRequest);
    const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);

    // Find leave request by ID
    const leaveRequest = await leaveRequestRepository.findOne({
      where: { id: leaveRequestId },
      relations: ["leaveType"],
    });

    if (!leaveRequest) {
      throw new Error("Leave request not found");
    }

    // Check if leave request belongs to the user
    if (leaveRequest.userId !== userId) {
      throw new Error("You can only cancel your own leave requests");
    }

    // Check if leave request can be cancelled
    if (leaveRequest.status === LeaveRequestStatus.CANCELLED) {
      throw new Error("Leave request is already cancelled");
    }

    const wasApproved = leaveRequest.status === LeaveRequestStatus.APPROVED;

    // Update leave request status
    leaveRequest.status = LeaveRequestStatus.CANCELLED;

    // If it was approved, restore leave balance
    if (wasApproved && leaveRequest.leaveType.isPaidLeave) {
      const currentYear = new Date().getFullYear();
      const leaveBalance = await leaveBalanceRepository.findOne({
        where: {
          userId: leaveRequest.userId,
          leaveTypeId: leaveRequest.leaveTypeId,
          year: currentYear,
        },
      });

      if (leaveBalance) {
        leaveBalance.used -= leaveRequest.numberOfDays;
        if (leaveBalance.used < 0) {
          leaveBalance.used = 0;
        }
        await leaveBalanceRepository.save(leaveBalance);
      }
    }

    return await leaveRequestRepository.save(leaveRequest);
  } catch (error) {
    logger.error(`Error in cancelLeaveRequest service: ${error}`);
    throw error;
  }
};

/**
 * Get approval workflow for leave request
 */
export const getApprovalWorkflow = async (
  numberOfDays: number
): Promise<ApprovalWorkflow> => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const approvalWorkflowRepository =
      AppDataSource.getRepository(ApprovalWorkflow);

    // Find approval workflow for the number of days
    const approvalWorkflow = await approvalWorkflowRepository.findOne({
      where: {
        minDays: TypeORMLessThanOrEqual(numberOfDays),
        maxDays: TypeORMMoreThanOrEqual(numberOfDays),
        isActive: true,
      },
    });

    if (!approvalWorkflow) {
      throw new Error("No approval workflow found for this leave duration");
    }

    // Parse the approvalLevels JSON string
    if (typeof approvalWorkflow.approvalLevels === "string") {
      try {
        approvalWorkflow.approvalLevels = JSON.parse(
          approvalWorkflow.approvalLevels
        );
        // Handle the case where it might be double-stringified
        if (typeof approvalWorkflow.approvalLevels === "string") {
          approvalWorkflow.approvalLevels = JSON.parse(
            approvalWorkflow.approvalLevels
          );
        }
      } catch (error) {
        logger.error(`Error parsing approvalLevels: ${error}`);
        throw new Error("Error parsing approval workflow levels");
      }
    }

    return approvalWorkflow;
  } catch (error) {
    logger.error(`Error in getApprovalWorkflow service: ${error}`);
    throw error;
  }
};

// Helper functions for TypeORM operators
// TypeORM operators are imported at the top of the file
