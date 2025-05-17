import { Request, ResponseToolkit } from "@hapi/hapi";
import { AppDataSource } from "../config/database";
import { LeaveType, Gender } from "../models";
import logger from "../utils/logger";

export const createLeaveType = async (request: Request, h: ResponseToolkit) => {
  try {
    const {
      name,
      description,
      defaultDays,
      isCarryForward,
      maxCarryForwardDays,
      isActive,
      applicableGender,
      isHalfDayAllowed,
      isPaidLeave,
    } = request.payload as any;

    // Validate input
    if (!name || !description || defaultDays === undefined) {
      return h
        .response({
          message: "Name, description, and defaultDays are required",
        })
        .code(400);
    }

    // Check if leave type already exists
    const leaveTypeRepository = AppDataSource.getRepository(LeaveType);
    const existingLeaveType = await leaveTypeRepository.findOne({
      where: { name },
    });

    if (existingLeaveType) {
      return h
        .response({ message: "Leave type with this name already exists" })
        .code(409);
    }

    // Validate applicable gender if provided
    if (
      applicableGender &&
      !["male", "female", "other"].includes(applicableGender)
    ) {
      return h.response({ message: "Invalid applicable gender" }).code(400);
    }

    // Create new leave type
    const leaveType = new LeaveType();
    leaveType.name = name;
    leaveType.description = description;
    leaveType.defaultDays = defaultDays;
    leaveType.isCarryForward =
      isCarryForward !== undefined ? isCarryForward : false;
    leaveType.maxCarryForwardDays =
      maxCarryForwardDays !== undefined ? maxCarryForwardDays : 0;
    leaveType.isActive = isActive !== undefined ? isActive : true;
    leaveType.applicableGender = applicableGender || null;
    leaveType.isHalfDayAllowed =
      isHalfDayAllowed !== undefined ? isHalfDayAllowed : false;
    leaveType.isPaidLeave = isPaidLeave !== undefined ? isPaidLeave : true;

    // Save leave type to database
    const savedLeaveType = await leaveTypeRepository.save(leaveType);

    return h
      .response({
        message: "Leave type created successfully",
        leaveType: savedLeaveType,
      })
      .code(201);
  } catch (error) {
    logger.error(`Error in createLeaveType: ${error}`);
    return h
      .response({ message: "An error occurred while creating the leave type" })
      .code(500);
  }
};

export const getAllLeaveTypes = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    const { isActive } = request.query as any;

    // Build query
    const leaveTypeRepository = AppDataSource.getRepository(LeaveType);
    let query: any = {};

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    // Get leave types
    const leaveTypes = await leaveTypeRepository.find({
      where: query,
      order: {
        name: "ASC",
      },
    });

    return h
      .response({
        leaveTypes,
        count: leaveTypes.length,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in getAllLeaveTypes: ${error}`);
    return h
      .response({ message: "An error occurred while fetching leave types" })
      .code(500);
  }
};

export const getLeaveTypeById = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    const { id } = request.params;

    // Get leave type
    const leaveTypeRepository = AppDataSource.getRepository(LeaveType);
    const leaveType = await leaveTypeRepository.findOne({ where: { id } });

    if (!leaveType) {
      return h.response({ message: "Leave type not found" }).code(404);
    }

    return h
      .response({
        leaveType,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in getLeaveTypeById: ${error}`);
    return h
      .response({ message: "An error occurred while fetching the leave type" })
      .code(500);
  }
};

export const updateLeaveType = async (request: Request, h: ResponseToolkit) => {
  try {
    const { id } = request.params;
    const {
      name,
      description,
      defaultDays,
      isCarryForward,
      maxCarryForwardDays,
      isActive,
      applicableGender,
      isHalfDayAllowed,
      isPaidLeave,
    } = request.payload as any;

    // Get leave type
    const leaveTypeRepository = AppDataSource.getRepository(LeaveType);
    const leaveType = await leaveTypeRepository.findOne({ where: { id } });

    if (!leaveType) {
      return h.response({ message: "Leave type not found" }).code(404);
    }

    // Check if name is being changed and if it already exists
    if (name && name !== leaveType.name) {
      const existingLeaveType = await leaveTypeRepository.findOne({
        where: { name },
      });
      if (existingLeaveType) {
        return h
          .response({ message: "Leave type with this name already exists" })
          .code(409);
      }
    }

    // Validate applicable gender if provided
    if (
      applicableGender &&
      !["male", "female", "other"].includes(applicableGender)
    ) {
      return h.response({ message: "Invalid applicable gender" }).code(400);
    }

    // Update leave type fields
    if (name) leaveType.name = name;
    if (description) leaveType.description = description;
    if (defaultDays !== undefined) leaveType.defaultDays = defaultDays;
    if (isCarryForward !== undefined) leaveType.isCarryForward = isCarryForward;
    if (maxCarryForwardDays !== undefined)
      leaveType.maxCarryForwardDays = maxCarryForwardDays;
    if (isActive !== undefined) leaveType.isActive = isActive;
    if (applicableGender !== undefined)
      leaveType.applicableGender = applicableGender;
    if (isHalfDayAllowed !== undefined)
      leaveType.isHalfDayAllowed = isHalfDayAllowed;
    if (isPaidLeave !== undefined) leaveType.isPaidLeave = isPaidLeave;

    // Save updated leave type
    const updatedLeaveType = await leaveTypeRepository.save(leaveType);

    return h
      .response({
        message: "Leave type updated successfully",
        leaveType: updatedLeaveType,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in updateLeaveType: ${error}`);
    return h
      .response({ message: "An error occurred while updating the leave type" })
      .code(500);
  }
};

export const deleteLeaveType = async (request: Request, h: ResponseToolkit) => {
  try {
    const { id } = request.params;

    // Get leave type
    const leaveTypeRepository = AppDataSource.getRepository(LeaveType);
    const leaveType = await leaveTypeRepository.findOne({
      where: { id },
      relations: ["leaveRequests", "leaveBalances"],
    });

    if (!leaveType) {
      return h.response({ message: "Leave type not found" }).code(404);
    }

    // Check if leave type is being used
    if (leaveType.leaveRequests && leaveType.leaveRequests.length > 0) {
      return h
        .response({
          message:
            "Cannot delete leave type that is associated with leave requests",
        })
        .code(400);
    }

    if (leaveType.leaveBalances && leaveType.leaveBalances.length > 0) {
      return h
        .response({
          message:
            "Cannot delete leave type that is associated with leave balances",
        })
        .code(400);
    }

    // Delete leave type
    await leaveTypeRepository.remove(leaveType);

    return h
      .response({
        message: "Leave type deleted successfully",
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in deleteLeaveType: ${error}`);
    return h
      .response({ message: "An error occurred while deleting the leave type" })
      .code(500);
  }
};

export const activateLeaveType = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    const { id } = request.params;

    // Get leave type
    const leaveTypeRepository = AppDataSource.getRepository(LeaveType);
    const leaveType = await leaveTypeRepository.findOne({ where: { id } });

    if (!leaveType) {
      return h.response({ message: "Leave type not found" }).code(404);
    }

    // Check if already active
    if (leaveType.isActive) {
      return h.response({ message: "Leave type is already active" }).code(400);
    }

    // Activate leave type
    leaveType.isActive = true;
    const updatedLeaveType = await leaveTypeRepository.save(leaveType);

    return h
      .response({
        message: "Leave type activated successfully",
        leaveType: updatedLeaveType,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in activateLeaveType: ${error}`);
    return h
      .response({
        message: "An error occurred while activating the leave type",
      })
      .code(500);
  }
};

export const deactivateLeaveType = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    const { id } = request.params;

    // Get leave type
    const leaveTypeRepository = AppDataSource.getRepository(LeaveType);
    const leaveType = await leaveTypeRepository.findOne({ where: { id } });

    if (!leaveType) {
      return h.response({ message: "Leave type not found" }).code(404);
    }

    // Check if already inactive
    if (!leaveType.isActive) {
      return h
        .response({ message: "Leave type is already inactive" })
        .code(400);
    }

    // Deactivate leave type
    leaveType.isActive = false;
    const updatedLeaveType = await leaveTypeRepository.save(leaveType);

    return h
      .response({
        message: "Leave type deactivated successfully",
        leaveType: updatedLeaveType,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in deactivateLeaveType: ${error}`);
    return h
      .response({
        message: "An error occurred while deactivating the leave type",
      })
      .code(500);
  }
};
