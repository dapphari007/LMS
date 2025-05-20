// User Types
export enum UserRole {
  SUPER_ADMIN = "super_admin",
  MANAGER = "manager",
  HR = "hr",
  EMPLOYEE = "employee",
}

export type DashboardType = "employee" | "manager" | "hr" | "admin" | "super_admin";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  role: "super_admin" | "employee" | "team_lead" | "manager" | "admin" | "hr";
  roleId?: string; // Added for custom roles
  roleObj?: { 
    id: string; 
    name: string; 
    dashboardType?: DashboardType;
    permissions?: string[]; // Added for role permissions
  }; 
  level: number;
  gender?: "male" | "female" | "other";
  isActive: boolean;
  managerId?: string;
  hrId?: string;
  teamLeadId?: string;
  department?: string;
  position?: string;
  dashboardType?: DashboardType; // Added for custom dashboard type
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "super_admin" | "employee" | "team_lead" | "manager" | "admin" | "hr";
  roleId?: string; // Added for custom roles
  roleObj?: { 
    id: string; 
    name: string; 
    dashboardType?: DashboardType;
    permissions?: string[]; // Added for role permissions
  }; 
  level: number;
  managerId?: string;
  hrId?: string;
  teamLeadId?: string;
  department?: string;
  position?: string;
  dashboardType?: DashboardType; // Added for custom dashboard type
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
  gender?: "male" | "female" | "other";
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

// Leave Types
export interface LeaveType {
  id: string;
  name: string;
  description: string;
  defaultDays: number;
  isCarryForward: boolean;
  maxCarryForwardDays?: number;
  isActive: boolean;
  applicableGender?: "male" | "female" | null;
  isHalfDayAllowed: boolean;
  isPaidLeave: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateLeaveTypeData {
  name: string;
  description: string;
  defaultDays: number;
  isCarryForward: boolean;
  maxCarryForwardDays?: number;
  isActive: boolean;
  applicableGender?: "male" | "female" | null;
  isHalfDayAllowed: boolean;
  isPaidLeave: boolean;
}

// Leave Request Types
export interface LeaveRequest {
  id: string;
  userId: string;
  leaveTypeId: string;
  startDate: string;
  endDate: string;
  requestType: "full_day" | "half_day_morning" | "half_day_afternoon";
  numberOfDays: number;
  reason: string;
  status: "pending" | "approved" | "rejected" | "cancelled" | "partially_approved" | "pending_deletion";
  approverId?: string;
  approverComments?: string;
  approvedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  metadata?: {
    currentApprovalLevel?: number;
    requiredApprovalLevels?: number[];
    isFullyApproved?: boolean;
    approvalHistory?: {
      level: number;
      approverId: string;
      approverName: string;
      approvedAt: string;
      comments?: string;
    }[];
    originalStatus?: string;
    deletionRequestedBy?: string;
    deletionRequestedAt?: string;
    deletionRejectedBy?: string;
    deletionRejectedAt?: string;
    deletionRejectionComments?: string;
  };
  leaveType?: {
    id: string;
    name: string;
  };
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    department?: string;
    position?: string;
  };
}

export interface CreateLeaveRequestData {
  leaveTypeId: string;
  startDate: string;
  endDate: string;
  requestType: "full_day" | "half_day_morning" | "half_day_afternoon";
  reason: string;
}

export interface UpdateLeaveRequestStatusData {
  status: "pending" | "approved" | "rejected" | "cancelled" | "partially_approved";
  comments?: string;
}

// Holiday Types
export interface Holiday {
  id: string;
  name: string;
  date: string;
  description: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateHolidayData {
  name: string;
  date: string;
  description: string;
  isActive: boolean;
}

// Dashboard Types
export interface ManagerDashboard {
  pendingRequests: LeaveRequest[];
  pendingCount: number;
  approvedRequests: LeaveRequest[];
  approvedCount: number;
  teamAvailability: TeamAvailability[];
  upcomingHolidays: Holiday[];
}

export interface EmployeeDashboard {
  pendingRequests: LeaveRequest[];
  pendingCount: number;
  approvedRequests: LeaveRequest[];
  approvedCount: number;
  leaveBalance: LeaveBalance[];
  upcomingHolidays: Holiday[];
}

export interface TeamAvailability {
  date: string;
  isWeekend: boolean;
  isHoliday: boolean;
  totalUsers: number;
  availableUsers: {
    id: string;
    name: string;
  }[];
  availableCount: number;
  usersOnLeave: {
    id: string;
    name: string;
  }[];
  onLeaveCount: number;
}

// Leave Balance Types
export interface LeaveBalance {
  id: string;
  userId: string;
  leaveTypeId: string;
  year: number;
  totalDays: number;
  usedDays: number;
  pendingDays: number;
  remainingDays: number;
  carryForwardDays?: number;
  createdAt?: string;
  updatedAt?: string;
  leaveType?: {
    id: string;
    name: string;
  };
}

// API Response Types
export interface ApiResponse<T> {
  message?: string;
  [key: string]: any;
  data?: T;
}
