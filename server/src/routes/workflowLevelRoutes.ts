import { ServerRoute } from "@hapi/hapi";
import * as WorkflowLevelController from "../controllers/workflowLevelController";

const workflowLevelRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: "/api/workflow-levels",
    handler: WorkflowLevelController.createWorkflowLevel,
    options: {
      auth: { strategies: ["super_admin", "admin"] },
      description: "Create a new workflow level",
      tags: ["api", "workflow-levels"],
    },
  },
  {
    method: "GET",
    path: "/api/workflow-levels",
    handler: WorkflowLevelController.getAllWorkflowLevels,
    options: {
      auth: { strategies: ["super_admin", "manager_hr", "admin"] },
      description: "Get all workflow levels",
      tags: ["api", "workflow-levels"],
    },
  },
  {
    method: "GET",
    path: "/api/workflow-levels/{id}",
    handler: WorkflowLevelController.getWorkflowLevelById,
    options: {
      auth: { strategies: ["super_admin", "manager_hr", "admin"] },
      description: "Get workflow level by ID",
      tags: ["api", "workflow-levels"],
    },
  },
  {
    method: "PUT",
    path: "/api/workflow-levels/{id}",
    handler: WorkflowLevelController.updateWorkflowLevel,
    options: {
      auth: { strategies: ["super_admin", "admin"] },
      description: "Update workflow level",
      tags: ["api", "workflow-levels"],
    },
  },
  {
    method: "DELETE",
    path: "/api/workflow-levels/{id}",
    handler: WorkflowLevelController.deleteWorkflowLevel,
    options: {
      auth: { strategies: ["super_admin", "admin"] },
      description: "Delete workflow level",
      tags: ["api", "workflow-levels"],
    },
  },
  {
    method: "PATCH",
    path: "/api/workflow-levels/{id}/toggle-status",
    handler: WorkflowLevelController.toggleWorkflowLevelStatus,
    options: {
      auth: { strategies: ["super_admin", "admin"] },
      description: "Toggle workflow level status",
      tags: ["api", "workflow-levels"],
    },
  },
  {
    method: "POST",
    path: "/api/workflow-levels/reset-defaults",
    handler: WorkflowLevelController.resetWorkflowLevelsToDefault,
    options: {
      auth: { strategies: ["super_admin", "admin"] },
      description: "Reset workflow levels to default",
      tags: ["api", "workflow-levels"],
    },
  },
  {
    method: "GET",
    path: "/api/workflow-levels/for-approval-workflow",
    handler: WorkflowLevelController.getWorkflowLevelsForApprovalWorkflow,
    options: {
      auth: { strategies: ["super_admin", "manager_hr", "admin"] },
      description: "Get workflow levels for approval workflow creation",
      tags: ["api", "workflow-levels"],
    },
  },
];

export default workflowLevelRoutes;