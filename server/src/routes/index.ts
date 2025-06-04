import { Server, ServerRoute } from "@hapi/hapi";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import leaveTypeRoutes from "./leaveTypeRoutes";
import leaveBalanceRoutes from "./leaveBalanceRoutes";
import leaveRequestRoutes from "./leaveRequestRoutes";
import holidayRoutes from "./holidayRoutes";
import approvalWorkflowRoutes from "./approvalWorkflowRoutes";
import workflowCategoryRoutes from "./workflowCategoryRoutes";

import dashboardRoutes from "./dashboardRoutes";
import roleRoutes from "./roleRoutes";
import departmentRoutes from "./departmentRoutes";
import positionRoutes from "./positionRoutes";
import pageRoutes from "./pageRoutes";

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
  
  // Add a root route handler
  const rootRoute: ServerRoute = {
    method: "GET",
    path: "/",
    handler: () => ({ 
      status: "ok", 
      message: "Leave Management API Server is running",
      timestamp: new Date().toISOString() 
    }),
    options: {
      auth: false,
      description: "Root endpoint",
      tags: ["api", "root"],
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

    ...dashboardRoutes,
    ...roleRoutes,
    ...departmentRoutes,
    ...positionRoutes,
    ...pageRoutes,
    // Health check route
    healthCheckRoute,
    // Root route
    rootRoute,
  ]);


};
