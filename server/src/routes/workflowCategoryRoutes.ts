import { ServerRoute } from "@hapi/hapi";
import * as WorkflowCategoryController from "../controllers/workflowCategoryController";

const workflowCategoryRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: "/api/workflow-categories",
    handler: WorkflowCategoryController.createWorkflowCategoryController,
    options: {
      auth: { strategies: ["super_admin", "admin"] },
      description: "Create a new workflow category",
      tags: ["api", "workflow-categories"],
    },
  },
  {
    method: "GET",
    path: "/api/workflow-categories",
    handler: WorkflowCategoryController.getAllWorkflowCategoriesController,
    options: {
      auth: { strategies: ["super_admin", "manager_hr", "admin"] },
      description: "Get all workflow categories",
      tags: ["api", "workflow-categories"],
    },
  },
  {
    method: "GET",
    path: "/api/workflow-categories/{id}",
    handler: WorkflowCategoryController.getWorkflowCategoryByIdController,
    options: {
      auth: { strategies: ["super_admin", "manager_hr", "admin"] },
      description: "Get workflow category by ID",
      tags: ["api", "workflow-categories"],
    },
  },
  {
    method: "PUT",
    path: "/api/workflow-categories/{id}",
    handler: WorkflowCategoryController.updateWorkflowCategoryController,
    options: {
      auth: { strategies: ["super_admin", "admin"] },
      description: "Update workflow category",
      tags: ["api", "workflow-categories"],
    },
  },
  {
    method: "DELETE",
    path: "/api/workflow-categories/{id}",
    handler: WorkflowCategoryController.deleteWorkflowCategoryController,
    options: {
      auth: { strategies: ["super_admin", "admin"] },
      description: "Delete workflow category",
      tags: ["api", "workflow-categories"],
    },
  },
  {
    method: "PATCH",
    path: "/api/workflow-categories/{id}/toggle-status",
    handler: WorkflowCategoryController.toggleWorkflowCategoryStatusController,
    options: {
      auth: { strategies: ["super_admin", "admin"] },
      description: "Toggle workflow category status",
      tags: ["api", "workflow-categories"],
    },
  },
];

export default workflowCategoryRoutes;