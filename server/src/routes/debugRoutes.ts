import * as DebugController from "../controllers/debugController";
import { ServerRoute } from "@hapi/hapi";

export const debugRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/api/debug/check-leave-balance",
    handler: DebugController.checkLeaveBalance,
    options: {
      auth: "all_roles",
      description: "Check leave balance for a specific leave type",
      tags: ["api", "debug"],
    },
  },
];