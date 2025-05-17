import { ServerRoute } from "@hapi/hapi";
import * as LeaveBalanceController from "../controllers/leaveBalanceController";

const leaveBalanceRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: "/api/leave-balances",
    handler: LeaveBalanceController.createLeaveBalance,
    options: {
      auth: "super_admin",
      description: "Create a new leave balance",
      tags: ["api", "leave-balances"],
    },
  },
  {
    method: "GET",
    path: "/api/leave-balances",
    handler: LeaveBalanceController.getAllLeaveBalances,
    options: {
      auth: { strategies: ["super_admin", "manager_hr"] },
      description: "Get all leave balances",
      tags: ["api", "leave-balances"],
    },
  },
  {
    method: "GET",
    path: "/api/leave-balances/{id}",
    handler: LeaveBalanceController.getLeaveBalanceById,
    options: {
      auth: { strategies: ["super_admin", "manager_hr"] },
      description: "Get leave balance by ID",
      tags: ["api", "leave-balances"],
    },
  },
  {
    method: "GET",
    path: "/api/leave-balances/my-balances",
    handler: LeaveBalanceController.getUserLeaveBalances,
    options: {
      auth: "all_roles",
      description: "Get current user leave balances",
      tags: ["api", "leave-balances"],
    },
  },
  {
    method: "PUT",
    path: "/api/leave-balances/{id}",
    handler: LeaveBalanceController.updateLeaveBalance,
    options: {
      auth: "super_admin",
      description: "Update leave balance",
      tags: ["api", "leave-balances"],
    },
  },
  {
    method: "DELETE",
    path: "/api/leave-balances/{id}",
    handler: LeaveBalanceController.deleteLeaveBalance,
    options: {
      auth: "super_admin",
      description: "Delete leave balance",
      tags: ["api", "leave-balances"],
    },
  },
  {
    method: "POST",
    path: "/api/leave-balances/bulk-create",
    handler: LeaveBalanceController.bulkCreateLeaveBalances,
    options: {
      auth: "super_admin",
      description: "Bulk create leave balances for all users",
      tags: ["api", "leave-balances"],
    },
  },
  {
    method: "POST",
    path: "/api/leave-balances/create-all-for-all-users",
    handler: LeaveBalanceController.createAllLeaveBalancesForAllUsers,
    options: {
      auth: "super_admin",
      description: "Create leave balances for all leave types and all users",
      tags: ["api", "leave-balances"],
    },
  },
  {
    method: "GET",
    path: "/api/leave-balances/check-flushed",
    handler: LeaveBalanceController.checkDatabaseFlushed,
    options: {
      auth: "super_admin",
      description: "Check if the database is flushed (no leave balances exist)",
      tags: ["api", "leave-balances"],
    },
  },
];

export default leaveBalanceRoutes;
