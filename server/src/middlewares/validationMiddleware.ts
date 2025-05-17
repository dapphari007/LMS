import Joi from "joi";

/**
 * User validation schemas
 */
export const userValidation = {
  create: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    phoneNumber: Joi.string().allow("", null),
    address: Joi.string().allow("", null),
    role: Joi.string()
      .valid("super_admin", "hr", "manager", "employee")
      .default("employee"),
    level: Joi.number().integer().min(1).max(4).default(1),
    gender: Joi.string().valid("male", "female", "other").required(),
    managerId: Joi.string().uuid().allow(null),
    isActive: Joi.boolean().default(true),
  }),
  update: Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    phoneNumber: Joi.string().allow("", null),
    address: Joi.string().allow("", null),
    role: Joi.string().valid("super_admin", "hr", "manager", "employee"),
    level: Joi.number().integer().min(1).max(4),
    gender: Joi.string().valid("male", "female", "other"),
    managerId: Joi.string().uuid().allow(null),
    isActive: Joi.boolean(),
  }),
  changePassword: Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(8).required(),
  }),
  resetPassword: Joi.object({
    newPassword: Joi.string().min(8).required(),
  }),
};

/**
 * Authentication validation schemas
 */
export const authValidation = {
  register: userValidation.create,
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  updateProfile: Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    phoneNumber: Joi.string().allow("", null),
    address: Joi.string().allow("", null),
  }),
};

/**
 * Leave type validation schemas
 */
export const leaveTypeValidation = {
  create: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    defaultDays: Joi.number().integer().min(0).required(),
    isCarryForward: Joi.boolean().default(false),
    maxCarryForwardDays: Joi.number().integer().min(0).default(0),
    isActive: Joi.boolean().default(true),
    applicableGender: Joi.string().valid("male", "female", "other").allow(null),
    isHalfDayAllowed: Joi.boolean().default(false),
    isPaidLeave: Joi.boolean().default(true),
  }),
  update: Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    defaultDays: Joi.number().integer().min(0),
    isCarryForward: Joi.boolean(),
    maxCarryForwardDays: Joi.number().integer().min(0),
    isActive: Joi.boolean(),
    applicableGender: Joi.string().valid("male", "female", "other").allow(null),
    isHalfDayAllowed: Joi.boolean(),
    isPaidLeave: Joi.boolean(),
  }),
};

/**
 * Leave balance validation schemas
 */
export const leaveBalanceValidation = {
  create: Joi.object({
    userId: Joi.string().uuid().required(),
    leaveTypeId: Joi.string().uuid().required(),
    balance: Joi.number().min(0).required(),
    used: Joi.number().min(0).default(0),
    carryForward: Joi.number().min(0).default(0),
    year: Joi.number().integer().min(2000).max(2100),
  }),
  update: Joi.object({
    balance: Joi.number().min(0),
    used: Joi.number().min(0),
    carryForward: Joi.number().min(0),
  }),
  bulkCreate: Joi.object({
    leaveTypeId: Joi.string().uuid().required(),
    year: Joi.number().integer().min(2000).max(2100),
    resetExisting: Joi.boolean().default(false),
  }),
};

/**
 * Leave request validation schemas
 */
export const leaveRequestValidation = {
  create: Joi.object({
    leaveTypeId: Joi.string().uuid().required(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required(),
    requestType: Joi.string()
      .valid("full_day", "first_half", "second_half")
      .default("full_day"),
    reason: Joi.string().required(),
  }),
  updateStatus: Joi.object({
    status: Joi.string().valid("approved", "rejected", "cancelled").required(),
    comments: Joi.string().allow("", null),
  }),
};

/**
 * Holiday validation schemas
 */
export const holidayValidation = {
  create: Joi.object({
    name: Joi.string().required(),
    date: Joi.date().iso().required(),
    description: Joi.string().allow("", null),
    isActive: Joi.boolean().default(true),
  }),
  update: Joi.object({
    name: Joi.string(),
    date: Joi.date().iso(),
    description: Joi.string().allow("", null),
    isActive: Joi.boolean(),
  }),
  bulkCreate: Joi.object({
    holidays: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          date: Joi.date().iso().required(),
          description: Joi.string().allow("", null),
        })
      )
      .min(1)
      .required(),
  }),
};

/**
 * Approval workflow validation schemas
 */
export const approvalWorkflowValidation = {
  create: Joi.object({
    name: Joi.string().required(),
    minDays: Joi.number().integer().min(0).required(),
    maxDays: Joi.number().integer().min(0).required(),
    approvalLevels: Joi.array()
      .items(
        Joi.object({
          level: Joi.number().integer().min(1).required(),
          roles: Joi.array()
            .items(Joi.string().valid("super_admin", "hr", "manager"))
            .min(1)
            .required(),
        })
      )
      .min(1)
      .required(),
    isActive: Joi.boolean().default(true),
  }),
  update: Joi.object({
    name: Joi.string(),
    minDays: Joi.number().integer().min(0),
    maxDays: Joi.number().integer().min(0),
    approvalLevels: Joi.array()
      .items(
        Joi.object({
          level: Joi.number().integer().min(1).required(),
          roles: Joi.array()
            .items(Joi.string().valid("super_admin", "hr", "manager"))
            .min(1)
            .required(),
        })
      )
      .min(1),
    isActive: Joi.boolean(),
  }),
};
