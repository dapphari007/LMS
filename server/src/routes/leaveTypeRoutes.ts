import { ServerRoute } from "@hapi/hapi";
import * as LeaveTypeController from "../controllers/leaveTypeController";

const leaveTypeRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: "/api/leave-types",
    handler: LeaveTypeController.createLeaveType,
    options: {
      auth: "super_admin",
      description: "Create a new leave type",
      tags: ["api", "leave-types"],
    },
  },
  {
    method: "GET",
    path: "/api/leave-types",
    handler: LeaveTypeController.getAllLeaveTypes,
    options: {
      auth: "all_roles",
      description: "Get all leave types",
      tags: ["api", "leave-types"],
    },
  },
  {
    method: "GET",
    path: "/api/leave-types/{id}",
    handler: LeaveTypeController.getLeaveTypeById,
    options: {
      auth: "all_roles",
      description: "Get leave type by ID",
      tags: ["api", "leave-types"],
    },
  },
  {
    method: "PUT",
    path: "/api/leave-types/{id}",
    handler: LeaveTypeController.updateLeaveType,
    options: {
      auth: "super_admin",
      description: "Update leave type",
      tags: ["api", "leave-types"],
    },
  },
  {
    method: "DELETE",
    path: "/api/leave-types/{id}",
    handler: LeaveTypeController.deleteLeaveType,
    options: {
      auth: "super_admin",
      description: "Delete leave type",
      tags: ["api", "leave-types"],
    },
  },
  {
    method: "PUT",
    path: "/api/leave-types/{id}/activate",
    handler: LeaveTypeController.activateLeaveType,
    options: {
      auth: "super_admin",
      description: "Activate a leave type",
      tags: ["api", "leave-types"],
    },
  },
  {
    method: "PUT",
    path: "/api/leave-types/{id}/deactivate",
    handler: LeaveTypeController.deactivateLeaveType,
    options: {
      auth: "super_admin",
      description: "Deactivate a leave type",
      tags: ["api", "leave-types"],
    },
  },
];

export default leaveTypeRoutes;
