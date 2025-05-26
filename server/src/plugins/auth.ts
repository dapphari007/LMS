import { Server } from "@hapi/hapi";
import jwt from "@hapi/jwt";
import { UserRole } from "../models";
import config from "../config/config";
import logger from "../utils/logger";

interface AuthOptions {
  roles?: UserRole[];
}

export const authPlugin = {
  name: "auth",
  version: "1.0.0",
  register: async function (server: Server) {
    await server.register(jwt);

    server.auth.strategy("jwt", "jwt", {
      keys: config.jwt.secret,
      verify: {
        aud: false,
        iss: false,
        sub: false,
        maxAgeSec: 14 * 24 * 60 * 60, // 14 days
      },
      validate: async (artifacts: any) => {
        try {
          const { decoded } = artifacts;
          const { payload } = decoded;

          if (!payload || !payload.id) {
            return { isValid: false };
          }

          // You can add additional validation here, like checking if the user exists in the database
          return {
            isValid: true,
            credentials: {
              id: payload.id,
              email: payload.email,
              role: payload.role,
              level: payload.level,
            },
          };
        } catch (error) {
          logger.error(`Auth validation error: ${error}`);
          return { isValid: false };
        }
      },
    });

    server.auth.default("jwt");

    // Create a scheme for role-based access control
    server.auth.scheme("role-based", (server, options: AuthOptions) => {
      return {
        authenticate: async (request, h) => {
          try {
            // First, authenticate using JWT
            const { credentials } = await server.auth.test("jwt", request);
            
            // Ensure credentials exist
            if (!credentials) {
              return h.unauthenticated(new Error("Invalid credentials"));
            }

            // If roles are specified, check if the user has the required role
            if (options.roles && options.roles.length > 0) {
              const userRole = credentials.role as UserRole;
              
              // Check if user has custom role permissions
              // Safely access permissions with null checks
              const hasCustomPermissions = request.auth?.credentials?.permissions;
              // Type guard to check if hasCustomPermissions is an array
              const isPermissionsArray = Array.isArray(hasCustomPermissions);
              
              const isCustomRoleWithPermission = isPermissionsArray && 
                ((options.roles.includes(UserRole.HR) && hasCustomPermissions.includes('hr')) ||
                 (options.roles.includes(UserRole.MANAGER) && hasCustomPermissions.includes('manager')) ||
                 (options.roles.includes(UserRole.TEAM_LEAD) && hasCustomPermissions.includes('team_lead')));
              
              // Allow access if user has the role or custom permissions
              if (!options.roles.includes(userRole) && !isCustomRoleWithPermission) {
                return h.unauthenticated(
                  new Error("Insufficient permissions to access this resource")
                );
              }
            }

            return h.authenticated({ credentials });
          } catch (error) {
            return h.unauthenticated(error);
          }
        },
      };
    });

    // Create strategies for different roles
    server.auth.strategy("super_admin", "role-based", {
      roles: [UserRole.SUPER_ADMIN],
    });

    server.auth.strategy("manager", "role-based", {
      roles: [UserRole.SUPER_ADMIN, UserRole.MANAGER],
    });

    server.auth.strategy("hr", "role-based", {
      roles: [UserRole.SUPER_ADMIN, UserRole.HR],
    });

    server.auth.strategy("team_lead", "role-based", {
      roles: [UserRole.SUPER_ADMIN, UserRole.MANAGER, UserRole.TEAM_LEAD],
    });

    server.auth.strategy("manager_hr", "role-based", {
      roles: [UserRole.SUPER_ADMIN, UserRole.MANAGER, UserRole.HR, UserRole.TEAM_LEAD],
    });
    
    // Add admin strategy - for backward compatibility
    server.auth.strategy("admin", "role-based", {
      roles: [UserRole.SUPER_ADMIN, UserRole.MANAGER],
    });

    server.auth.strategy("all_roles", "role-based", {
      roles: [
        UserRole.SUPER_ADMIN,
        UserRole.MANAGER,
        UserRole.HR,
        UserRole.TEAM_LEAD,
        UserRole.EMPLOYEE,
      ],
    });

    logger.info("Auth plugin registered");
  },
};
