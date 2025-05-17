import { ServerRoute } from "@hapi/hapi";
import * as LeaveRequestController from "../controllers/leaveRequestController";

const leaveRequestRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: "/api/leave-requests",
    handler: LeaveRequestController.createLeaveRequest,
    options: {
      auth: "all_roles",
      description: "Create a new leave request",
      tags: ["api", "leave-requests"],
    },
  },
  {
    method: "GET",
    path: "/api/leave-requests",
    handler: LeaveRequestController.getAllLeaveRequests,
    options: {
      auth: "manager_hr",
      description: "Get all leave requests",
      tags: ["api", "leave-requests"],
    },
  },
  {
    method: "GET",
    path: "/api/leave-requests/{id}",
    handler: LeaveRequestController.getLeaveRequestById,
    options: {
      auth: "all_roles",
      description: "Get leave request by ID",
      tags: ["api", "leave-requests"],
    },
  },
  {
    method: "GET",
    path: "/api/leave-requests/my-requests",
    handler: LeaveRequestController.getUserLeaveRequests,
    options: {
      auth: "all_roles",
      description: "Get current user leave requests",
      tags: ["api", "leave-requests"],
    },
  },
  {
    method: "GET",
    path: "/api/leave-requests/team-requests",
    handler: LeaveRequestController.getManagerLeaveRequests,
    options: {
      auth: "all_roles",
      description: "Get leave requests for team members",
      tags: ["api", "leave-requests"],
    },
  },
  {
    method: "PUT",
    path: "/api/leave-requests/{id}/status",
    handler: LeaveRequestController.updateLeaveRequestStatus,
    options: {
      auth: "manager_hr", // Includes SUPER_ADMIN, MANAGER, HR, and TEAM_LEAD roles
      description: "Update leave request status",
      tags: ["api", "leave-requests"],
    },
  },
  {
    method: "PUT",
    path: "/api/leave-requests/{id}/cancel",
    handler: LeaveRequestController.cancelLeaveRequest,
    options: {
      auth: "all_roles",
      description: "Cancel leave request",
      tags: ["api", "leave-requests"],
    },
  },
  {
    method: "PUT",
    path: "/api/leave-requests/{id}/approve-deletion",
    handler: LeaveRequestController.approveDeleteLeaveRequest,
    options: {
      auth: "manager_hr",
      description: "Approve leave request deletion",
      tags: ["api", "leave-requests"],
    },
  },
  {
    method: "PUT",
    path: "/api/leave-requests/{id}/reject-deletion",
    handler: LeaveRequestController.rejectDeleteLeaveRequest,
    options: {
      auth: "manager_hr",
      description: "Reject leave request deletion",
      tags: ["api", "leave-requests"],
    },
  },
  {
    method: "DELETE",
    path: "/api/leave-requests/{id}",
    handler: LeaveRequestController.deleteLeaveRequest,
    options: {
      auth: "all_roles",
      description: "Delete leave request and revert balances if approved",
      tags: ["api", "leave-requests"],
    },
  },
];

export default leaveRequestRoutes;
