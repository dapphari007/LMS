import { Server, ServerRoute } from "@hapi/hapi";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import leaveTypeRoutes from "./leaveTypeRoutes";
import leaveBalanceRoutes from "./leaveBalanceRoutes";
import leaveRequestRoutes from "./leaveRequestRoutes";
import holidayRoutes from "./holidayRoutes";
import approvalWorkflowRoutes from "./approvalWorkflowRoutes";
import workflowCategoryRoutes from "./workflowCategoryRoutes";
import workflowLevelRoutes from "./workflowLevelRoutes";
import approverTypeRoutes from "./approverTypeRoutes";
import dashboardRoutes from "./dashboardRoutes";
import roleRoutes from "./roleRoutes";
import departmentRoutes from "./departmentRoutes";
import positionRoutes from "./positionRoutes";
import pageRoutes from "./pageRoutes";
import scriptRoutes from "./scriptRoutes";
import { debugRoutes } from "./debugRoutes";

export const registerRoutes = (server: Server): void => {
  const healthCheckRoute: ServerRoute = {
    method: "GET",
    path: "/api/health",
    handler: () => ({ status: "ok", timestamp: new Date().toISOString() }),
    options: {
      auth: false,
      description: "Health check endpoint",
      tags: ["api", "health"],
    },
  };

  server.route([
    ...authRoutes,
    ...userRoutes,
    ...leaveTypeRoutes,
    ...leaveBalanceRoutes,
    ...leaveRequestRoutes,
    ...holidayRoutes,
    ...approvalWorkflowRoutes,
    ...workflowCategoryRoutes,
    ...workflowLevelRoutes,
    ...approverTypeRoutes,
    ...dashboardRoutes,
    ...roleRoutes,
    ...departmentRoutes,
    ...positionRoutes,
    ...pageRoutes,
    ...scriptRoutes,
    ...debugRoutes,
    // Health check route
    healthCheckRoute,
  ]);
};
