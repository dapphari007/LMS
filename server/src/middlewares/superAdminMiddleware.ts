import { Request, ResponseToolkit } from "@hapi/hapi";
import { UserRole } from "../models/User";

export const superAdminMiddleware = {
  method: (request: Request, h: ResponseToolkit) => {
    const user = request.auth.credentials as any;
    
    if (!user || user.role !== UserRole.SUPER_ADMIN) {
      return h.response({ 
        message: "Access denied. Super administrator privileges required." 
      }).code(403).takeover();
    }
    
    return h.continue;
  },
  assign: "superAdminCheck",
};