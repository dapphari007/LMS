import { ServerRoute } from "@hapi/hapi";
import * as ApproverTypeController from "../controllers/approverTypeController";

const approverTypeRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: "/api/approver-types",
    handler: ApproverTypeController.createApproverTypeController,
    options: {
      auth: { strategies: ["super_admin", "admin"] },
      description: "Create a new approver type",
      tags: ["api", "approver-types"],
    },
  },
  {
    method: "GET",
    path: "/api/approver-types",
    handler: ApproverTypeController.getAllApproverTypesController,
    options: {
      auth: { strategies: ["super_admin", "manager_hr", "admin"] },
      description: "Get all approver types",
      tags: ["api", "approver-types"],
    },
  },
  {
    method: "GET",
    path: "/api/approver-types/{id}",
    handler: ApproverTypeController.getApproverTypeByIdController,
    options: {
      auth: { strategies: ["super_admin", "manager_hr", "admin"] },
      description: "Get approver type by ID",
      tags: ["api", "approver-types"],
    },
  },
  {
    method: "PUT",
    path: "/api/approver-types/{id}",
    handler: ApproverTypeController.updateApproverTypeController,
    options: {
      auth: { strategies: ["super_admin", "admin"] },
      description: "Update approver type",
      tags: ["api", "approver-types"],
    },
  },
  {
    method: "DELETE",
    path: "/api/approver-types/{id}",
    handler: ApproverTypeController.deleteApproverTypeController,
    options: {
      auth: { strategies: ["super_admin", "admin"] },
      description: "Delete approver type",
      tags: ["api", "approver-types"],
    },
  },
  {
    method: "PATCH",
    path: "/api/approver-types/{id}/toggle-status",
    handler: ApproverTypeController.toggleApproverTypeStatusController,
    options: {
      auth: { strategies: ["super_admin", "admin"] },
      description: "Toggle approver type status",
      tags: ["api", "approver-types"],
    },
  },
];

export default approverTypeRoutes;