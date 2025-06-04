import { Request, ResponseToolkit } from "@hapi/hapi";
import { AppDataSource, ensureDatabaseConnection } from "../config/database";
import {
  LeaveRequest,
  LeaveRequestStatus,
  LeaveRequestType,
  User,
  UserRole,
  LeaveType,
  LeaveBalance,
  ApprovalWorkflow,
} from "../models";
import {
  calculateBusinessDays,
  calculateHalfDayValue,
  getCurrentYear,
  formatDate,
  checkForHolidaysInRange,
  isDateAHoliday,
} from "../utils/dateUtils";
import emailService from "../utils/emailService";
import logger from "../utils/logger";
import * as approverService from "../services/approverService";
import * as leaveRequestService from "../services/leaveRequestService";
import { LessThanOrEqual, MoreThanOrEqual, In, Not } from "typeorm";

export const createLeaveRequest = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const userId = request.auth.credentials.id;
    const { leaveTypeId, startDate, endDate, requestType, reason } =
      request.payload as any;

    // Validate input
    if (!leaveTypeId || !startDate || !endDate || !reason) {
      return h
        .response({
          message: "Leave type, start date, end date, and reason are required",
        })
        .code(400);
    }

    // Check if start date is before end date
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      return h
        .response({ message: "Start date cannot be after end date" })
        .code(400);
    }

    // Check if start date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      return h
        .response({
          message: "Cannot apply for leave with a start date in the past",
        })
        .code(400);
    }

    // Check if the leave dates fall on holidays
    const holidayCheck = await checkForHolidaysInRange(start, end);
    if (holidayCheck.hasHolidays) {
      const holidayNames = holidayCheck.holidays.map(h => h.name).join(', ');
      return h
        .response({
          message: `Cannot apply for leave on holidays. The following holidays fall within your selected dates: ${holidayNames}`,
          holidays: holidayCheck.holidays,
        })
        .code(400);
    }

    // Check if leave type exists
    const leaveTypeRepository = AppDataSource.getRepository(LeaveType);
    const leaveType = await leaveTypeRepository.findOne({
      where: { id: leaveTypeId },
    });

    if (!leaveType) {
      return h.response({ message: "Leave type not found" }).code(404);
    }

    // Check if leave type is active
    if (!leaveType.isActive) {
      return h
        .response({ message: "This leave type is currently inactive" })
        .code(400);
    }

    // Get user
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: userId as string },
    });

    if (!user) {
      return h.response({ message: "User not found" }).code(404);
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

    // Check if half-day is allowed for this leave type
    if (
      requestType &&
      requestType !== LeaveRequestType.FULL_DAY &&
      !leaveType.isHalfDayAllowed
    ) {
      return h
        .response({
          message: "Half-day leave is not allowed for this leave type",
        })
        .code(400);
    }

    // Calculate number of days
    let numberOfDays = await calculateBusinessDays(start, end);

    // Adjust for half-day if applicable
    if (requestType && requestType !== LeaveRequestType.FULL_DAY) {
      if (start.getTime() !== end.getTime()) {
        return h
          .response({
            message: "Half-day leave can only be applied for a single day",
          })
          .code(400);
      }
      numberOfDays = calculateHalfDayValue(true);
    }

    // Check if there are overlapping leave requests (including same day)
    const leaveRequestRepository = AppDataSource.getRepository(LeaveRequest);
    const overlappingLeaveRequests = await leaveRequestRepository.find({
      where: [
        {
          userId: userId as string,
          status: LeaveRequestStatus.PENDING,
          startDate: LessThanOrEqual(end),
          endDate: MoreThanOrEqual(start),
        },
        {
          userId: userId as string,
          status: LeaveRequestStatus.APPROVED,
          startDate: LessThanOrEqual(end),
          endDate: MoreThanOrEqual(start),
        },
      ],
    });

    if (overlappingLeaveRequests.length > 0) {
      // Check for exact same day conflicts
      const conflictingRequest = overlappingLeaveRequests.find(request => {
        const requestStart = new Date(request.startDate);
        const requestEnd = new Date(request.endDate);
        requestStart.setHours(0, 0, 0, 0);
        requestEnd.setHours(0, 0, 0, 0);
        
        // Check if any day in the new request overlaps with existing request
        const currentDate = new Date(start);
        while (currentDate <= end) {
          if (currentDate >= requestStart && currentDate <= requestEnd) {
            return true;
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
        return false;
      });

      if (conflictingRequest) {
        const conflictStart = formatDate(conflictingRequest.startDate);
        const conflictEnd = formatDate(conflictingRequest.endDate);
        const conflictPeriod = conflictStart === conflictEnd ? conflictStart : `${conflictStart} to ${conflictEnd}`;
        
        return h
          .response({
            message: `You already have a ${conflictingRequest.status.toLowerCase()} leave request for ${conflictPeriod}. Multiple leave requests on the same day(s) are not allowed.`,
            conflictingRequest: {
              id: conflictingRequest.id,
              startDate: conflictStart,
              endDate: conflictEnd,
              status: conflictingRequest.status,
            },
          })
          .code(409);
      }
    }

    // Check leave balance
    const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
    const leaveBalance = await leaveBalanceRepository.findOne({
      where: {
        userId: userId as string,
        leaveTypeId: leaveTypeId as string,
        year: getCurrentYear(),
      },
    });

    if (!leaveBalance) {
      return h
        .response({ message: "No leave balance found for this leave type" })
        .code(404);
    }

    // Calculate pending leave days
    const pendingLeaveRequests = await leaveRequestRepository.find({
      where: {
        userId: userId as string,
        leaveTypeId: leaveTypeId as string,
        status: LeaveRequestStatus.PENDING,
      },
    });

    const pendingDays = pendingLeaveRequests.reduce(
      (total, request) => total + request.numberOfDays,
      0
    );

    // Calculate available balance considering pending requests
    const availableBalance =
      leaveBalance.balance + leaveBalance.carryForward - leaveBalance.used - pendingDays;

    if (numberOfDays > availableBalance) {
      return h
        .response({
          message: `Insufficient leave balance. Available: ${availableBalance.toFixed(1)}, Requested: ${numberOfDays}, Pending: ${pendingDays}`,
          availableBalance: availableBalance,
          requestedDays: numberOfDays,
          pendingDays: pendingDays,
          success: false
        })
        .code(400);
    }

    // Create new leave request
    const leaveRequest = new LeaveRequest();
    leaveRequest.userId = userId as string;
    leaveRequest.leaveTypeId = leaveTypeId as string;
    leaveRequest.startDate = start;
    leaveRequest.endDate = end;
    leaveRequest.requestType = requestType || LeaveRequestType.FULL_DAY;
    leaveRequest.numberOfDays = numberOfDays;
    leaveRequest.reason = reason;
    leaveRequest.status = LeaveRequestStatus.PENDING;
    
    // Add metadata with user role for approval workflow and set up approval levels
    const metadata: any = {
      requestUserRole: user.role,
      isFullyApproved: false,
      approvalHistory: []
    };
    
    // Get the appropriate approval workflow based on the number of days
    try {
      // Get the workflow based on the number of days
      const approvalWorkflow = await leaveRequestService.getApprovalWorkflow(numberOfDays);
      
      // Set the current approval level to 0 (starting point)
      metadata.currentApprovalLevel = 0;
      
      // Parse the approval levels from the workflow
      let approvalLevels = approvalWorkflow.approvalLevels;
      if (typeof approvalLevels === "string") {
        try {
          approvalLevels = JSON.parse(approvalLevels);
          if (typeof approvalLevels === "string") {
            approvalLevels = JSON.parse(approvalLevels);
          }
        } catch (error) {
          logger.error(`Error parsing approvalLevels: ${error}`);
        }
      }
      
      // Sort the levels to ensure proper order
      const sortedLevels = Array.isArray(approvalLevels) 
        ? [...approvalLevels].sort((a, b) => a.level - b.level)
        : [];
      
      // Determine required approval levels from the workflow
      let requiredLevels = sortedLevels.map(level => level.level);
      
      // Apply dynamic role-based skipping logic - skip levels where the requester's role matches the approver role
      requiredLevels = requiredLevels.filter(level => {
        const levelDef = sortedLevels.find(l => l.level === level);
        // Skip this level if the user's role is included in the approver roles for this level
        return !(levelDef && levelDef.roleIds && levelDef.roleIds.includes(user.role));
      });
      
      // Store the required approval levels in metadata
      metadata.requiredApprovalLevels = requiredLevels;
      
      // Store the workflow ID for reference
      metadata.workflowId = approvalWorkflow.id;
      
    } catch (error) {
      // If no workflow is found or there's an error, return an error response
      logger.error(`Error getting approval workflow: ${error}`);
      return h
        .response({
          message: "No approval workflow found for this leave duration. Please contact your administrator.",
          success: false
        })
        .code(400);
    }
    
    leaveRequest.metadata = metadata;

    // Save leave request to database
    const savedLeaveRequest = await leaveRequestRepository.save(leaveRequest);

    // Find approvers to notify based on the dynamic workflow
    try {
      // Get the first level approvers from the metadata
      if (leaveRequest.metadata && leaveRequest.metadata.requiredApprovalLevels && 
          leaveRequest.metadata.requiredApprovalLevels.length > 0) {
        
        // Get the first level that needs approval
        const firstApprovalLevel = leaveRequest.metadata.requiredApprovalLevels[0];
        
        // Find approvers for this level
        let approversToNotify: User[] = [];
        
        // If we have a workflow ID, get the workflow to find the approver type
        if (leaveRequest.metadata.workflowId) {
          const approvalWorkflowRepository = AppDataSource.getRepository(ApprovalWorkflow);
          const workflow = await approvalWorkflowRepository.findOne({
            where: { id: leaveRequest.metadata.workflowId }
          });
          
          if (workflow) {
            // Parse approval levels if needed
            let approvalLevels = workflow.approvalLevels;
            if (typeof approvalLevels === "string") {
              try {
                approvalLevels = JSON.parse(approvalLevels);
                if (typeof approvalLevels === "string") {
                  approvalLevels = JSON.parse(approvalLevels);
                }
              } catch (error) {
                logger.error(`Error parsing approvalLevels: ${error}`);
              }
            }
            
            // Find the level definition for the first required level
            const levelDefinition = Array.isArray(approvalLevels) 
              ? approvalLevels.find(l => l.level === firstApprovalLevel)
              : null;
              
            if (levelDefinition) {
              // Find approvers by role IDs
              if (levelDefinition.roleIds && levelDefinition.roleIds.length > 0) {
                const roleApprovers = await approverService.findApproversByRoleIds(
                  levelDefinition.roleIds,
                  user.department
                );
                approversToNotify = [...roleApprovers];
              }
            }
          }
        }
        
        // If no approvers were found through the workflow, log a warning
        if (approversToNotify.length === 0) {
          logger.warn(`No approvers found for leave request from user ${user.id} using workflow. Please ensure approval workflows are properly configured.`);
          
          // Return a message to the user
          return h
            .response({
              message: "No approvers found for your leave request. Please contact your administrator to set up the approval workflow.",
              success: false
            })
            .code(400);
        }
        
        // Send notifications to all identified approvers
        for (const approver of approversToNotify) {
          let roleInfo = "";
          if (user.role !== UserRole.EMPLOYEE) {
            roleInfo = ` (${user.role})`;
          }
          
          let additionalNote = "";
          if (leaveRequest.metadata.requiredApprovalLevels.length > 1) {
            additionalNote = "\n\nNote: This leave request requires multi-level approval.";
          }
          
          await emailService.sendLeaveRequestNotification(
            approver.email,
            `${user.firstName} ${user.lastName}${roleInfo}`,
            leaveType.name,
            formatDate(start),
            formatDate(end),
            reason + additionalNote
          );
        }
      }
    } catch (error) {
      logger.error(`Error sending notifications for leave request: ${error}`);
      // Continue with the process even if notifications fail
    }

    return h
      .response({
        message: "Leave request created successfully",
        leaveRequest: savedLeaveRequest,
      })
      .code(201);
  } catch (error) {
    logger.error(`Error in createLeaveRequest: ${error}`);
    return h
      .response({
        message: "An error occurred while creating the leave request",
      })
      .code(500);
  }
};

export const getAllLeaveRequests = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { userId, leaveTypeId, status, startDate, endDate } =
      request.query as any;

    // Build query
    const leaveRequestRepository = AppDataSource.getRepository(LeaveRequest);
    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (leaveTypeId) {
      query.leaveTypeId = leaveTypeId;
    }

    if (status) {
      query.status = status;
    }

    if (startDate && endDate) {
      query.startDate = MoreThanOrEqual(new Date(startDate));
      query.endDate = LessThanOrEqual(new Date(endDate));
    } else if (startDate) {
      query.startDate = MoreThanOrEqual(new Date(startDate));
    } else if (endDate) {
      query.endDate = LessThanOrEqual(new Date(endDate));
    }

    // Get leave requests with relations
    const leaveRequests = await leaveRequestRepository.find({
      where: query,
      relations: ["user", "leaveType", "approver"],
      order: {
        createdAt: "DESC",
      },
    });

    return h
      .response({
        leaveRequests,
        count: leaveRequests.length,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in getAllLeaveRequests: ${error}`);
    return h
      .response({ message: "An error occurred while fetching leave requests" })
      .code(500);
  }
};

export const getLeaveRequestById = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { id } = request.params;

    // Get leave request
    const leaveRequestRepository = AppDataSource.getRepository(LeaveRequest);
    const leaveRequest = await leaveRequestRepository.findOne({
      where: { id },
      relations: ["user", "leaveType", "approver"],
    });

    if (!leaveRequest) {
      return h.response({ message: "Leave request not found" }).code(404);
    }

    return h
      .response({
        leaveRequest,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in getLeaveRequestById: ${error}`);
    return h
      .response({
        message: "An error occurred while fetching the leave request",
      })
      .code(500);
  }
};

export const getUserLeaveRequests = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const userId = request.auth.credentials.id;
    const { status, year } = request.query as any;

    // Build query
    const leaveRequestRepository = AppDataSource.getRepository(LeaveRequest);
    let query: any = { userId };

    if (status) {
      query.status = status;
    }

    if (year) {
      const startOfYear = new Date(parseInt(year), 0, 1);
      const endOfYear = new Date(parseInt(year), 11, 31);
      query.startDate = MoreThanOrEqual(startOfYear);
      query.endDate = LessThanOrEqual(endOfYear);
    }

    // Get leave requests
    const leaveRequests = await leaveRequestRepository.find({
      where: query,
      relations: ["leaveType", "approver"],
      order: {
        createdAt: "DESC",
      },
    });

    return h
      .response({
        leaveRequests,
        count: leaveRequests.length,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in getUserLeaveRequests: ${error}`);
    return h
      .response({ message: "An error occurred while fetching leave requests" })
      .code(500);
  }
};

export const getManagerLeaveRequests = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const userId = request.auth.credentials.id;
    const userRole = request.auth.credentials.role;
    const { status } = request.query as any;

    // If user is a regular employee, return their own leave requests
    if (userRole === UserRole.EMPLOYEE) {
      return getUserLeaveRequests(request, h);
    }

    const userRepository = AppDataSource.getRepository(User);
    let managedUserIds: string[] = [];

    // For HR and admins, get all users' leave requests
    if (userRole === UserRole.HR || userRole === UserRole.SUPER_ADMIN) {
      const allUsers = await userRepository.find();
      managedUserIds = allUsers.map((user) => user.id);
    }
    // For managers, get their team members and their own leave requests
    else if (userRole === UserRole.MANAGER) {
      // Get all users managed by this manager
      const managedUsers = await userRepository.find({
        where: { managerId: userId as string },
      });

      // Include the manager's own ID to see their own leave requests
      managedUserIds = [...managedUsers.map((user) => user.id), userId as string];
      
      if (managedUserIds.length === 1 && managedUserIds[0] === userId) {
        // If the manager has no team members, they should still see their own leave requests
        // No need to return early
      } else if (managedUserIds.length === 0) {
        return h
          .response({
            leaveRequests: [],
            count: 0,
          })
          .code(200);
      }
    }
    // For team leads, get their team members and their own leave requests
    else if (userRole === UserRole.TEAM_LEAD) {
      // Get all users where this user is the team lead
      const teamMembers = await userRepository.find({
        where: { teamLeadId: userId as string },
      });

      // Include the team lead's own ID to see their own leave requests
      managedUserIds = [...teamMembers.map((user) => user.id), userId as string];
      
      if (managedUserIds.length === 1 && managedUserIds[0] === userId) {
        // If the team lead has no team members, they should still see their own leave requests
        // No need to return early
      } else if (managedUserIds.length === 0) {
        return h
          .response({
            leaveRequests: [],
            count: 0,
          })
          .code(200);
      }
    }

    // Build query
    const leaveRequestRepository = AppDataSource.getRepository(LeaveRequest);
    let query: any = { userId: In(managedUserIds) };

    if (status) {
      // Special case for "pending_approval" - include both pending and partially_approved
      if (status === "pending_approval") {
        query.status = In([LeaveRequestStatus.PENDING, LeaveRequestStatus.PARTIALLY_APPROVED]);
      } else {
        query.status = status;
      }
    }

    // Get leave requests
    const leaveRequests = await leaveRequestRepository.find({
      where: query,
      relations: ["user", "leaveType"],
      order: {
        createdAt: "DESC",
      },
    });

    return h
      .response({
        leaveRequests,
        count: leaveRequests.length,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in getManagerLeaveRequests: ${error}`);
    return h
      .response({ message: "An error occurred while fetching leave requests" })
      .code(500);
  }
};

export const updateLeaveRequestStatus = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { id } = request.params;
    const { status, comments } = request.payload as any;
    const approverId = request.auth.credentials.id;

    // Validate input
    if (!status) {
      return h.response({ message: "Status is required" }).code(400);
    }

    // Normalize status to ensure it matches the enum values
    const normalizedStatus = status.toLowerCase() as LeaveRequestStatus;

    // Check if the status is valid
    if (!Object.values(LeaveRequestStatus).includes(normalizedStatus)) {
      logger.error(
        `Invalid status: ${status}, normalized: ${normalizedStatus}`
      );
      return h
        .response({
          message: "Invalid status",
          validValues: Object.values(LeaveRequestStatus),
        })
        .code(400);
    }

    // We'll use normalizedStatus instead of status from here on

    // Get leave request
    const leaveRequestRepository = AppDataSource.getRepository(LeaveRequest);
    const leaveRequest = await leaveRequestRepository.findOne({
      where: { id },
      relations: ["user", "leaveType"],
    });

    if (!leaveRequest) {
      return h.response({ message: "Leave request not found" }).code(404);
    }

    // Check if leave request is already in the requested status
    if (leaveRequest.status === normalizedStatus) {
      return h
        .response({ message: `Leave request is already ${normalizedStatus}` })
        .code(400);
    }

    // Check if leave request is pending or partially approved
    if (
      leaveRequest.status !== LeaveRequestStatus.PENDING &&
      leaveRequest.status !== LeaveRequestStatus.PARTIALLY_APPROVED &&
      normalizedStatus !== LeaveRequestStatus.CANCELLED
    ) {
      return h
        .response({
          message: "Only pending or partially approved leave requests can be approved or rejected",
        })
        .code(400);
    }

    // Check if the user is authorized to update the status
    const userRepository = AppDataSource.getRepository(User);
    const approver = await userRepository.findOne({
      where: { id: approverId as string },
    });

    if (!approver) {
      return h.response({ message: "Approver not found" }).code(404);
    }

    // Get the request user for additional checks
    const requestUser = await userRepository.findOne({
      where: { id: leaveRequest.userId },
    });

    if (!requestUser) {
      return h.response({ message: "User not found" }).code(404);
    }

    const isManager = requestUser.managerId === approverId;
    const isTeamLead = requestUser.teamLeadId === approverId;
    const isAdminOrHR =
      approver.role === UserRole.SUPER_ADMIN || approver.role === UserRole.HR;
    const isSelfCancellation =
      leaveRequest.userId === approverId &&
      normalizedStatus === LeaveRequestStatus.CANCELLED;
    
    // Check if the approver is authorized based on department and role
    const authorizationCheck = await approverService.isApproverAuthorized(
      approverId as string,
      leaveRequest.userId
    );
    
    // Allow self-cancellation
    if (!authorizationCheck.isAuthorized && !isSelfCancellation) {
      return h
        .response({
          message: authorizationCheck.reason || "You are not authorized to update this leave request",
        })
        .code(403);
    }
    
    // Log the authorization
    logger.info(`User ${approverId} is authorized to update leave request ${leaveRequest.id} for user ${leaveRequest.userId}`);

    // Check if multi-level approval is required
    if (normalizedStatus === LeaveRequestStatus.APPROVED) {
      const approvalWorkflowRepository =
        AppDataSource.getRepository(ApprovalWorkflow);
      const approvalWorkflows = await approvalWorkflowRepository.find({
        where: { isActive: true },
        order: { minDays: "DESC" },
      });

      // For partially approved requests, we need to continue the existing workflow
      let applicableWorkflow;
      
      if (leaveRequest.status === LeaveRequestStatus.PARTIALLY_APPROVED && leaveRequest.metadata) {
        // Find the workflow that matches the existing metadata
        applicableWorkflow = approvalWorkflows.find(
          (workflow) => {
            // Parse the approvalLevels if needed
            let approvalLevels = workflow.approvalLevels;
            if (typeof approvalLevels === "string") {
              try {
                approvalLevels = JSON.parse(approvalLevels);
                if (typeof approvalLevels === "string") {
                  approvalLevels = JSON.parse(approvalLevels);
                }
              } catch (error) {
                logger.error(`Error parsing approvalLevels: ${error}`);
                return false;
              }
            }
            
            // Check if this workflow has the same required levels as in the metadata
            if (Array.isArray(approvalLevels) && leaveRequest.metadata.requiredApprovalLevels) {
              const workflowLevels = approvalLevels.map(l => l.level).sort();
              const requiredLevels = [...leaveRequest.metadata.requiredApprovalLevels].sort();
              
              // Check if arrays are equal
              return workflowLevels.length === requiredLevels.length && 
                     workflowLevels.every((val, idx) => val === requiredLevels[idx]);
            }
            
            return false;
          }
        );
      } else {
        // For new approvals, find the workflow based on the number of days
        applicableWorkflow = approvalWorkflows.find(
          (workflow) =>
            leaveRequest.numberOfDays >= workflow.minDays &&
            leaveRequest.numberOfDays <= workflow.maxDays
        );
      }

      if (applicableWorkflow) {
        // Handle approvalLevels which might be a string or an object
        let approvalLevels = applicableWorkflow.approvalLevels;

        // Parse the approvalLevels if it's a string
        if (typeof approvalLevels === "string") {
          try {
            approvalLevels = JSON.parse(approvalLevels);
            // Handle the case where it might be double-stringified
            if (typeof approvalLevels === "string") {
              approvalLevels = JSON.parse(approvalLevels);
            }
          } catch (error) {
            logger.error(`Error parsing approvalLevels: ${error}`);
            return h
              .response({
                message: "An error occurred while processing approval workflow",
              })
              .code(500);
          }
        }

        // Check if approvalLevels is an array before using find method
        if (!Array.isArray(approvalLevels)) {
          logger.error(
            `Error: approvalLevels is not an array: ${JSON.stringify(
              approvalLevels
            )}`
          );
          return h
            .response({
              message: "An error occurred while processing approval workflow",
            })
            .code(500);
        }

        // Sort approval levels by level number to ensure proper hierarchy
        const sortedLevels = [...approvalLevels].sort(
          (a, b) => a.level - b.level
        );

        // Find the current approver's level
        let currentApproverLevel = null;
        
        // For partially approved requests, we need to check if this approver is for the next level
        if (leaveRequest.status === LeaveRequestStatus.PARTIALLY_APPROVED && leaveRequest.metadata) {
          const nextLevel = leaveRequest.metadata.currentApprovalLevel + 1;
          
          // Find the level definition for the next level
          const nextLevelDefinition = sortedLevels.find(l => l.level === nextLevel);
          
          if (nextLevelDefinition) {
            // Check if this approver matches the next level
            if (nextLevelDefinition.roleIds && nextLevelDefinition.roleIds.length > 0) {
              // Check if the current approver has one of the required roles for this level
              if (approver.roleId && nextLevelDefinition.roleIds.includes(approver.roleId)) {
                currentApproverLevel = nextLevel;
              }
            } else {
              // Legacy format - check by role
              const roles = Array.isArray(nextLevelDefinition.roles)
                ? nextLevelDefinition.roles
                : [nextLevelDefinition.roles];
              if (roles.includes(approver.role)) {
                currentApproverLevel = nextLevel;
              }
            }
          }
        } else {
          // Regular approval flow - no special cases
          // For new approvals, check all levels
          for (const level of sortedLevels) {
            // Check if this is a new format level with roleIds
            if (level.roleIds && level.roleIds.length > 0) {
              // Check if the current approver has one of the required roles for this level
              if (approver.roleId && level.roleIds.includes(approver.roleId)) {
                currentApproverLevel = level.level;
                break;
              }
            } else {
              // Legacy format - check by role
              const roles = Array.isArray(level.roles)
                ? level.roles
                : [level.roles];
              if (roles.includes(approver.role)) {
                currentApproverLevel = level.level;
                break;
              }
            }
          }
        }

        if (currentApproverLevel === null) {
          return h
            .response({
              message:
                "You do not have the required role to approve this leave request",
            })
            .code(403);
        }

        // Check if this is the highest level required for this leave request
        const highestRequiredLevel =
          sortedLevels[sortedLevels.length - 1].level;

        // If this is not the highest level required, mark as "pending_next_approval" instead of fully approved
        if (currentApproverLevel < highestRequiredLevel) {
          // Store the current approval level in the comments for tracking
          const currentApprovalComment = `Approved at level ${currentApproverLevel} by ${approver.firstName} ${approver.lastName}`;
          const existingComments = leaveRequest.approverComments || "";

          leaveRequest.approverComments = existingComments
            ? `${existingComments}\n${currentApprovalComment}`
            : currentApprovalComment;

          if (comments) {
            leaveRequest.approverComments += `\nComments: ${comments}`;
          }

          // Check for overlapping approved leave requests before partial approval
          const overlappingLeaveRequests = await leaveRequestRepository.find({
            where: [
              {
                userId: leaveRequest.userId,
                status: LeaveRequestStatus.APPROVED,
                startDate: LessThanOrEqual(leaveRequest.endDate),
                endDate: MoreThanOrEqual(leaveRequest.startDate),
                id: Not(leaveRequest.id) // Exclude the current request
              }
            ],
          });

          if (overlappingLeaveRequests.length > 0) {
            // Log the overlapping requests for debugging
            logger.warn(`Overlapping leave requests found for user ${leaveRequest.userId} when partially approving request ${leaveRequest.id}`);
            for (const overlap of overlappingLeaveRequests) {
              logger.warn(`Overlapping leave: ID ${overlap.id}, Start: ${formatDate(overlap.startDate)}, End: ${formatDate(overlap.endDate)}`);
            }
            
            return h
              .response({
                message: "Cannot approve this leave request as it overlaps with already approved leave requests",
                overlappingRequests: overlappingLeaveRequests.map(r => ({
                  id: r.id,
                  startDate: formatDate(r.startDate),
                  endDate: formatDate(r.endDate),
                  leaveTypeId: r.leaveTypeId
                }))
              })
              .code(409);
          }

          // Update status to PARTIALLY_APPROVED
          leaveRequest.status = LeaveRequestStatus.PARTIALLY_APPROVED;
          leaveRequest.approverId = approverId as string;

          // Add metadata about the current approval level
          const metadata = leaveRequest.metadata || {};
          metadata.currentApprovalLevel = currentApproverLevel;
          metadata.requiredApprovalLevels = sortedLevels.map((l) => l.level);
          
          // Preserve the requestUserRole if it exists
          if (!metadata.requestUserRole && requestUser) {
            metadata.requestUserRole = requestUser.role;
          }

          // Add to approval history
          if (!metadata.approvalHistory) {
            metadata.approvalHistory = [];
          }

          metadata.approvalHistory.push({
            level: currentApproverLevel,
            approverId: approverId as string,
            approverName: `${approver.firstName} ${approver.lastName}`,
            approvedAt: new Date(),
            comments: comments || undefined,
          });

          leaveRequest.metadata = metadata;

          // Save the updated leave request
          const updatedLeaveRequest = await leaveRequestRepository.save(
            leaveRequest
          );

          // Find the next approver(s) based on the next level
          const nextLevel = sortedLevels.find(
            (l) => l.level === currentApproverLevel + 1
          );
          if (nextLevel) {
            let potentialApprovers: User[] = [];
            
            // Check if this is a new format level with roleIds
            if (nextLevel.roleIds && nextLevel.roleIds.length > 0) {
              // Get potential approvers by role IDs
              potentialApprovers = await approverService.findApproversByRoleIds(
                nextLevel.roleIds,
                nextLevel.departmentSpecific ? leaveRequest.user?.department : undefined
              );
            } else {
              // Legacy format - find by role
              const nextRoles = Array.isArray(nextLevel.roles)
                ? nextLevel.roles
                : [nextLevel.roles];
                
              // Notify the next level approvers
              potentialApprovers = await userRepository.find({
                where: { role: In(nextRoles), isActive: true },
              });
            }

            if (potentialApprovers.length > 0) {
              for (const nextApprover of potentialApprovers) {
                // Send notification to the next approver
                await emailService.sendLeaveRequestNotification(
                  nextApprover.email,
                  `${requestUser.firstName} ${requestUser.lastName}`,
                  leaveRequest.leaveType.name,
                  formatDate(leaveRequest.startDate),
                  formatDate(leaveRequest.endDate),
                  `${
                    leaveRequest.reason
                  }\n\nThis request has been approved at L-${currentApproverLevel} and requires your approval at L-${
                    currentApproverLevel + 1
                  }.`
                );
              }
            }
          }

          // Notify the employee about partial approval
          if (leaveRequest.user && leaveRequest.leaveType) {
            await emailService.sendLeaveStatusUpdateNotification(
              leaveRequest.user.email,
              leaveRequest.leaveType.name,
              formatDate(leaveRequest.startDate),
              formatDate(leaveRequest.endDate),
              LeaveRequestStatus.PARTIALLY_APPROVED,
              `Your leave request has been approved at L-${currentApproverLevel} by ${approver.firstName} ${approver.lastName} and is awaiting further approval.`
            );
          }

          return h
            .response({
              message: `Leave request approved at L-${currentApproverLevel}, pending higher level approval`,
              leaveRequest: updatedLeaveRequest,
            })
            .code(200);
        }

        // If we reach here, this is the highest level approval needed, so fully approve
        // Add to approval history
        const metadata = leaveRequest.metadata || {};
        if (!metadata.approvalHistory) {
          metadata.approvalHistory = [];
        }

        metadata.approvalHistory.push({
          level: currentApproverLevel,
          approverId: approverId as string,
          approverName: `${approver.firstName} ${approver.lastName}`,
          approvedAt: new Date(),
          comments: comments || undefined,
        });

        metadata.isFullyApproved = true;
        leaveRequest.metadata = metadata;
      }
    }

    // Update leave request status
    leaveRequest.status = normalizedStatus;

    // Store comments in the database
    if (comments) {
      leaveRequest.approverComments = comments;
    }

    leaveRequest.approverId = approverId as string;
    leaveRequest.approvedAt = new Date();

    // If this is a final approval after partial approvals, update the metadata
    if (
      normalizedStatus === LeaveRequestStatus.APPROVED &&
      leaveRequest.metadata
    ) {
      const metadata = leaveRequest.metadata;

      // Add to approval history if it exists
      if (metadata.approvalHistory) {
        metadata.approvalHistory.push({
          level: metadata.currentApprovalLevel
            ? metadata.currentApprovalLevel + 1
            : 1,
          approverId: approverId as string,
          approverName: `${approver.firstName} ${approver.lastName}`,
          approvedAt: new Date(),
          comments: comments || undefined,
        });

        // Mark as fully approved
        metadata.isFullyApproved = true;
        leaveRequest.metadata = metadata;
      }
    }

    // Save updated leave request
    const updatedLeaveRequest = await leaveRequestRepository.save(leaveRequest);

    // Update leave balance if approved
    if (normalizedStatus === LeaveRequestStatus.APPROVED) {
      // Check for overlapping approved leave requests (excluding the current one)
      const overlappingLeaveRequests = await leaveRequestRepository.find({
        where: [
          {
            userId: leaveRequest.userId,
            status: LeaveRequestStatus.APPROVED,
            startDate: LessThanOrEqual(leaveRequest.endDate),
            endDate: MoreThanOrEqual(leaveRequest.startDate),
            id: Not(leaveRequest.id) // Exclude the current request
          }
        ],
      });

      if (overlappingLeaveRequests.length > 0) {
        // Log the overlapping requests for debugging
        logger.warn(`Overlapping leave requests found for user ${leaveRequest.userId} when approving request ${leaveRequest.id}`);
        for (const overlap of overlappingLeaveRequests) {
          logger.warn(`Overlapping leave: ID ${overlap.id}, Start: ${formatDate(overlap.startDate)}, End: ${formatDate(overlap.endDate)}`);
        }
        
        return h
          .response({
            message: "Cannot approve this leave request as it overlaps with already approved leave requests",
            overlappingRequests: overlappingLeaveRequests.map(r => ({
              id: r.id,
              startDate: formatDate(r.startDate),
              endDate: formatDate(r.endDate),
              leaveTypeId: r.leaveTypeId
            }))
          })
          .code(409);
      }

      const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
      const leaveBalance = await leaveBalanceRepository.findOne({
        where: {
          userId: leaveRequest.userId,
          leaveTypeId: leaveRequest.leaveTypeId,
          year: getCurrentYear(),
        },
      });

      if (leaveBalance) {
        // Ensure both values are treated as numbers by using parseFloat
        const currentUsed = parseFloat(leaveBalance.used.toString());
        const daysToAdd = parseFloat(leaveRequest.numberOfDays.toString());
        leaveBalance.used = currentUsed + daysToAdd;
        await leaveBalanceRepository.save(leaveBalance);
      }
    }

    // Send email notification to the user
    if (leaveRequest.user && leaveRequest.leaveType) {
      await emailService.sendLeaveStatusUpdateNotification(
        leaveRequest.user.email,
        leaveRequest.leaveType.name,
        formatDate(leaveRequest.startDate),
        formatDate(leaveRequest.endDate),
        normalizedStatus,
        comments
      );
    }

    return h
      .response({
        message: `Leave request ${normalizedStatus} successfully`,
        leaveRequest: updatedLeaveRequest,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in updateLeaveRequestStatus: ${error}`);
    logger.error(`Error details: ${JSON.stringify(error)}`);
    logger.error(`Request payload: ${JSON.stringify(request.payload)}`);
    logger.error(`Request params: ${JSON.stringify(request.params)}`);

    return h
      .response({
        message: "An error occurred while updating the leave request status",
        error: error.message,
      })
      .code(500);
  }
};

export const cancelLeaveRequest = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { id } = request.params;
    const userId = request.auth.credentials.id;

    // Get leave request
    const leaveRequestRepository = AppDataSource.getRepository(LeaveRequest);
    const leaveRequest = await leaveRequestRepository.findOne({
      where: { id },
      relations: ["user", "leaveType"],
    });

    if (!leaveRequest) {
      return h.response({ message: "Leave request not found" }).code(404);
    }

    // Check if the user is the owner of the leave request
    if (leaveRequest.userId !== userId) {
      return h
        .response({ message: "You can only cancel your own leave requests" })
        .code(403);
    }

    // Check if leave request is already cancelled
    if (leaveRequest.status === LeaveRequestStatus.CANCELLED) {
      return h
        .response({ message: "Leave request is already cancelled" })
        .code(400);
    }

    // Check if leave request is already approved and the start date is in the past
    if (leaveRequest.status === LeaveRequestStatus.APPROVED) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (new Date(leaveRequest.startDate) < today) {
        return h
          .response({
            message: "Cannot cancel an approved leave that has already started",
          })
          .code(400);
      }

      // Update leave balance
      const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
      const leaveBalance = await leaveBalanceRepository.findOne({
        where: {
          userId: leaveRequest.userId,
          leaveTypeId: leaveRequest.leaveTypeId,
          year: getCurrentYear(),
        },
      });

      if (leaveBalance) {
        leaveBalance.used -= leaveRequest.numberOfDays;
        await leaveBalanceRepository.save(leaveBalance);
      }
    }

    // Update leave request status
    leaveRequest.status = LeaveRequestStatus.CANCELLED;

    // Save updated leave request
    const updatedLeaveRequest = await leaveRequestRepository.save(leaveRequest);

    // Send email notification to the manager if exists
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId as string } });

    if (user && user.managerId) {
      const manager = await userRepository.findOne({
        where: { id: user.managerId },
      });
      if (manager && leaveRequest.leaveType) {
        await emailService.sendLeaveStatusUpdateNotification(
          manager.email,
          leaveRequest.leaveType.name,
          formatDate(leaveRequest.startDate),
          formatDate(leaveRequest.endDate),
          LeaveRequestStatus.CANCELLED,
          "Cancelled by employee"
        );
      }
    }

    return h
      .response({
        message: "Leave request cancelled successfully",
        leaveRequest: updatedLeaveRequest,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in cancelLeaveRequest: ${error}`);
    return h
      .response({
        message: "An error occurred while cancelling the leave request",
      })
      .code(500);
  }
};

export const rejectDeleteLeaveRequest = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { id } = request.params;
    const { comments } = request.payload as any;
    const approverId = request.auth.credentials.id;

    // Get leave request
    const leaveRequestRepository = AppDataSource.getRepository(LeaveRequest);
    const leaveRequest = await leaveRequestRepository.findOne({
      where: { id },
      relations: ["user", "leaveType"],
    });

    if (!leaveRequest) {
      return h.response({ message: "Leave request not found" }).code(404);
    }

    // Check if the leave request is pending deletion
    if (leaveRequest.status !== LeaveRequestStatus.PENDING_DELETION) {
      return h
        .response({ message: "This leave request is not pending deletion approval" })
        .code(400);
    }

    // Check if the user is authorized to reject the deletion
    const userRepository = AppDataSource.getRepository(User);
    const approver = await userRepository.findOne({
      where: { id: approverId as string },
    });

    if (!approver) {
      return h.response({ message: "Approver not found" }).code(404);
    }

    // Get the user who requested the leave
    const requestUser = await userRepository.findOne({
      where: { id: leaveRequest.userId },
    });

    if (!requestUser) {
      return h.response({ message: "User not found" }).code(404);
    }

    // Check if the approver is authorized (manager, HR, or admin)
    const isManager = requestUser.managerId === approverId;
    const isAdminOrHR =
      approver.role === UserRole.SUPER_ADMIN || approver.role === UserRole.HR;

    if (!isManager && !isAdminOrHR) {
      return h
        .response({
          message: "You are not authorized to reject this deletion request",
        })
        .code(403);
    }

    // Restore the original status
    leaveRequest.status = (leaveRequest.metadata?.originalStatus as LeaveRequestStatus) || LeaveRequestStatus.APPROVED;
    
    // Update metadata
    const metadata = leaveRequest.metadata || {};
    metadata.deletionRejectedBy = approverId as string;
    metadata.deletionRejectedAt = new Date();
    metadata.deletionRejectionComments = comments;
    
    leaveRequest.metadata = metadata;
    
    // Save the updated leave request
    const updatedLeaveRequest = await leaveRequestRepository.save(leaveRequest);
    logger.info(`Leave request ${id} deletion rejected by ${approverId}`);

    // Send email notification to the employee
    if (requestUser && leaveRequest.leaveType) {
      await emailService.sendLeaveStatusUpdateNotification(
        requestUser.email,
        leaveRequest.leaveType.name,
        formatDate(leaveRequest.startDate),
        formatDate(leaveRequest.endDate),
        leaveRequest.status,
        `Your request to delete this leave has been rejected by ${approver.firstName} ${approver.lastName}${comments ? `. Comments: ${comments}` : ''}`
      );
    }

    return h
      .response({
        message: "Leave request deletion rejected successfully",
        leaveRequest: updatedLeaveRequest,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in rejectDeleteLeaveRequest: ${error}`);
    return h
      .response({
        message: "An error occurred while rejecting the leave request deletion",
        error: error.message,
      })
      .code(500);
  }
};

export const approveDeleteLeaveRequest = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { id } = request.params;
    const { comments } = request.payload as any;
    const approverId = request.auth.credentials.id;
    const approverRole = request.auth.credentials.role;

    // Get leave request
    const leaveRequestRepository = AppDataSource.getRepository(LeaveRequest);
    const leaveRequest = await leaveRequestRepository.findOne({
      where: { id },
      relations: ["user", "leaveType"],
    });

    if (!leaveRequest) {
      return h.response({ message: "Leave request not found" }).code(404);
    }

    // Check if the leave request is pending deletion
    if (leaveRequest.status !== LeaveRequestStatus.PENDING_DELETION) {
      return h
        .response({ message: "This leave request is not pending deletion approval" })
        .code(400);
    }

    // Check if the user is authorized to approve the deletion
    const userRepository = AppDataSource.getRepository(User);
    const approver = await userRepository.findOne({
      where: { id: approverId as string },
    });

    if (!approver) {
      return h.response({ message: "Approver not found" }).code(404);
    }

    // Get the user who requested the leave
    const requestUser = await userRepository.findOne({
      where: { id: leaveRequest.userId },
    });

    if (!requestUser) {
      return h.response({ message: "User not found" }).code(404);
    }

    // Check if the approver is authorized (manager, HR, or admin)
    const isManager = requestUser.managerId === approverId;
    const isAdminOrHR =
      approver.role === UserRole.SUPER_ADMIN || approver.role === UserRole.HR;

    if (!isManager && !isAdminOrHR) {
      return h
        .response({
          message: "You are not authorized to approve this deletion request",
        })
        .code(403);
    }

    // If leave request was approved or partially approved, revert the leave balance
    if (
      leaveRequest.metadata?.originalStatus === LeaveRequestStatus.APPROVED.toString() ||
      leaveRequest.metadata?.originalStatus === LeaveRequestStatus.PARTIALLY_APPROVED.toString()
    ) {
      // Update leave balance
      const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
      const leaveBalance = await leaveBalanceRepository.findOne({
        where: {
          userId: leaveRequest.userId,
          leaveTypeId: leaveRequest.leaveTypeId,
          year: new Date(leaveRequest.startDate).getFullYear(),
        },
      });

      if (leaveBalance) {
        // Revert the used days
        leaveBalance.used -= leaveRequest.numberOfDays;
        
        // Ensure used days doesn't go below 0
        if (leaveBalance.used < 0) {
          leaveBalance.used = 0;
        }
        
        await leaveBalanceRepository.save(leaveBalance);
        logger.info(`Leave balance updated for user ${leaveRequest.userId}: ${leaveBalance.used} days used`);
      }
    }

    // Store leave request details for notification before deleting
    const leaveDetails = {
      leaveType: leaveRequest.leaveType,
      startDate: leaveRequest.startDate,
      endDate: leaveRequest.endDate,
      numberOfDays: leaveRequest.numberOfDays,
      status: leaveRequest.status
    };

    // Delete the leave request
    await leaveRequestRepository.remove(leaveRequest);
    logger.info(`Leave request ${id} deletion approved by ${approverId}`);

    // Send email notification to the employee
    if (requestUser && leaveDetails.leaveType) {
      await emailService.sendLeaveStatusUpdateNotification(
        requestUser.email,
        leaveDetails.leaveType.name,
        formatDate(leaveDetails.startDate),
        formatDate(leaveDetails.endDate),
        "deleted",
        `Your request to delete this leave has been approved by ${approver.firstName} ${approver.lastName}${comments ? `. Comments: ${comments}` : ''}`
      );
    }

    return h
      .response({
        message: "Leave request deletion approved successfully and leave balance has been reverted",
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in approveDeleteLeaveRequest: ${error}`);
    return h
      .response({
        message: "An error occurred while approving the leave request deletion",
        error: error.message,
      })
      .code(500);
  }
};

export const deleteLeaveRequest = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { id } = request.params;
    const userId = request.auth.credentials.id;
    const userRole = request.auth.credentials.role;

    // Get leave request
    const leaveRequestRepository = AppDataSource.getRepository(LeaveRequest);
    const leaveRequest = await leaveRequestRepository.findOne({
      where: { id },
      relations: ["user", "leaveType"],
    });

    if (!leaveRequest) {
      return h.response({ message: "Leave request not found" }).code(404);
    }

    // Check if the user is the owner of the leave request or has appropriate role
    const isOwner = leaveRequest.userId === userId;
    const isAdminOrHR = userRole === UserRole.SUPER_ADMIN || userRole === UserRole.HR;
    
    if (!isOwner && !isAdminOrHR) {
      return h
        .response({ message: "You can only delete your own leave requests" })
        .code(403);
    }

    // Check if multi-level approval is required for deletion
    // For approved or partially approved leaves, we need to check the workflow
    if (
      (leaveRequest.status === LeaveRequestStatus.APPROVED ||
      leaveRequest.status === LeaveRequestStatus.PARTIALLY_APPROVED) &&
      isOwner && // Only check for owners, not admins/HR
      !isAdminOrHR // Admins/HR can bypass workflow
    ) {
      const approvalWorkflowRepository = AppDataSource.getRepository(ApprovalWorkflow);
      const approvalWorkflows = await approvalWorkflowRepository.find({
        where: { isActive: true },
        order: { minDays: "DESC" },
      });

      const applicableWorkflow = approvalWorkflows.find(
        (workflow) =>
          leaveRequest.numberOfDays >= workflow.minDays &&
          leaveRequest.numberOfDays <= workflow.maxDays
      );

      if (applicableWorkflow) {
        // Handle approvalLevels which might be a string or an object
        let approvalLevels = applicableWorkflow.approvalLevels;

        // Parse the approvalLevels if it's a string
        if (typeof approvalLevels === "string") {
          try {
            approvalLevels = JSON.parse(approvalLevels);
            // Handle the case where it might be double-stringified
            if (typeof approvalLevels === "string") {
              approvalLevels = JSON.parse(approvalLevels);
            }
          } catch (error) {
            logger.error(`Error parsing approvalLevels: ${error}`);
            return h
              .response({
                message: "An error occurred while processing approval workflow",
              })
              .code(500);
          }
        }

        // Check if approvalLevels is an array
        if (Array.isArray(approvalLevels) && approvalLevels.length > 1) {
          // Store the original status before changing it
          const originalStatus = leaveRequest.status;
          
          // Mark the leave request as pending deletion approval instead of deleting it immediately
          leaveRequest.status = LeaveRequestStatus.PENDING_DELETION;
          
          // Add metadata for deletion approval
          const metadata = leaveRequest.metadata || {};
          metadata.deletionRequestedBy = userId as string;
          metadata.deletionRequestedAt = new Date();
          metadata.originalStatus = originalStatus;
          
          leaveRequest.metadata = metadata;
          
          // Save the updated leave request
          await leaveRequestRepository.save(leaveRequest);
          
          // Notify the manager about the deletion request
          const userRepository = AppDataSource.getRepository(User);
          const user = await userRepository.findOne({ where: { id: userId as string } });

          if (user && user.managerId) {
            const manager = await userRepository.findOne({
              where: { id: user.managerId },
            });
            if (manager && leaveRequest.leaveType) {
              await emailService.sendLeaveStatusUpdateNotification(
                manager.email,
                leaveRequest.leaveType.name,
                formatDate(leaveRequest.startDate),
                formatDate(leaveRequest.endDate),
                "pending_deletion",
                "Employee has requested to delete this leave. Please review and approve."
              );
            }
          }
          
          return h
            .response({
              message: "Leave deletion request submitted and pending approval",
              leaveRequest,
            })
            .code(200);
        }
      }
    }

    // If leave request is approved or partially approved, revert the leave balance
    if (
      leaveRequest.status === LeaveRequestStatus.APPROVED ||
      leaveRequest.status === LeaveRequestStatus.PARTIALLY_APPROVED
    ) {
      // Update leave balance
      const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
      const leaveBalance = await leaveBalanceRepository.findOne({
        where: {
          userId: leaveRequest.userId,
          leaveTypeId: leaveRequest.leaveTypeId,
          year: new Date(leaveRequest.startDate).getFullYear(),
        },
      });

      if (leaveBalance) {
        // Revert the used days
        leaveBalance.used -= leaveRequest.numberOfDays;
        
        // Ensure used days doesn't go below 0
        if (leaveBalance.used < 0) {
          leaveBalance.used = 0;
        }
        
        await leaveBalanceRepository.save(leaveBalance);
        logger.info(`Leave balance updated for user ${leaveRequest.userId}: ${leaveBalance.used} days used`);
      }
    }

    // Store leave request details for notification before deleting
    const leaveDetails = {
      leaveType: leaveRequest.leaveType,
      startDate: leaveRequest.startDate,
      endDate: leaveRequest.endDate,
      numberOfDays: leaveRequest.numberOfDays,
      status: leaveRequest.status
    };

    // Delete the leave request
    await leaveRequestRepository.remove(leaveRequest);
    logger.info(`Leave request ${id} deleted by user ${userId}`);

    // Send email notification to the manager if exists
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId as string } });

    if (user && user.managerId) {
      const manager = await userRepository.findOne({
        where: { id: user.managerId },
      });
      if (manager && leaveDetails.leaveType) {
        await emailService.sendLeaveStatusUpdateNotification(
          manager.email,
          leaveDetails.leaveType.name,
          formatDate(leaveDetails.startDate),
          formatDate(leaveDetails.endDate),
          "deleted",
          "Deleted by employee"
        );
      }
    }

    return h
      .response({
        message: "Leave request deleted successfully and leave balance has been reverted",
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in deleteLeaveRequest: ${error}`);
    return h
      .response({
        message: "An error occurred while deleting the leave request",
        error: error.message,
      })
      .code(500);
  }
};
