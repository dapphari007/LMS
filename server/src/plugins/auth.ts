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

            // If roles are specified, check if the user has the required role
            if (options.roles && options.roles.length > 0) {
              const userRole = credentials.role as UserRole;
              if (!options.roles.includes(userRole)) {
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
