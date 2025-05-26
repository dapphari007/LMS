import { ServerRoute } from "@hapi/hapi";
import * as ApprovalWorkflowController from "../controllers/approvalWorkflowController";

const approvalWorkflowRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: "/api/approval-workflows",
    handler: ApprovalWorkflowController.createApprovalWorkflow,
    options: {
      auth: { strategies: ["super_admin", "admin"] },
      description: "Create a new approval workflow",
      tags: ["api", "approval-workflows"],
    },
  },
  {
    method: "GET",
    path: "/api/approval-workflows",
    handler: ApprovalWorkflowController.getAllApprovalWorkflows,
    options: {
      auth: { strategies: ["super_admin", "manager_hr", "admin"] },
      description: "Get all approval workflows",
      tags: ["api", "approval-workflows"],
    },
  },
  {
    method: "GET",
    path: "/api/approval-workflows/{id}",
    handler: ApprovalWorkflowController.getApprovalWorkflowById,
    options: {
      auth: { strategies: ["super_admin", "manager_hr", "admin"] },
      description: "Get approval workflow by ID",
      tags: ["api", "approval-workflows"],
    },
  },
  {
    method: "PUT",
    path: "/api/approval-workflows/{id}",
    handler: ApprovalWorkflowController.updateApprovalWorkflow,
    options: {
      auth: { strategies: ["super_admin", "admin"] },
      description: "Update approval workflow",
      tags: ["api", "approval-workflows"],
    },
  },
  {
    method: "DELETE",
    path: "/api/approval-workflows/{id}",
    handler: ApprovalWorkflowController.deleteApprovalWorkflow,
    options: {
      auth: { strategies: ["super_admin", "admin"] },
      description: "Delete approval workflow",
      tags: ["api", "approval-workflows"],
    },
  },
  {
    method: "POST",
    path: "/api/approval-workflows/initialize-defaults",
    handler: ApprovalWorkflowController.initializeDefaultApprovalWorkflows,
    options: {
      auth: { strategies: ["super_admin", "admin"] },
      description:
        "Initialize default approval workflows with team lead at L-1",
      tags: ["api", "approval-workflows"],
    },
  },
  {
    method: "GET",
    path: "/api/approval-workflows/for-duration/{days}",
    handler: ApprovalWorkflowController.getApprovalWorkflowForDuration,
    options: {
      auth: "all_roles",
      description: "Get approval workflow for a specific leave duration",
      tags: ["api", "approval-workflows"],
    },
  },
];

export default approvalWorkflowRoutes;
