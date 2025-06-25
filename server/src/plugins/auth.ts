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

    // Configure JWT authentication strategy
    server.auth.strategy("jwt", "jwt", {
      keys: config.jwt.secret,
      verify: {
        aud: false,
        iss: false,
        sub: false,
        maxAgeSec: 14 * 24 * 60 * 60, // 14 days
      },
      validate: async (artifacts: any) => {
        const { decoded } = artifacts;
        const { payload } = decoded;

        if (!payload || !payload.id) {
          return { isValid: false };
        }

        return {
          isValid: true,
          credentials: {
            id: payload.id,
            email: payload.email,
            role: payload.role,
            level: payload.level,
          },
        };
      },
    });

    server.auth.default("jwt");

    // Role-based authentication scheme
    server.auth.scheme("role-based", (server, options: AuthOptions) => ({
      authenticate: async (request, h) => {
        try {
          const { credentials } = await server.auth.test("jwt", request);

          if (!credentials) {
            throw new Error("Invalid credentials");
          }

          if (options.roles?.length) {
            const userRole = credentials.role as UserRole;
            const permissions = request.auth?.credentials?.permissions;

            const hasCustomPermissions =
              Array.isArray(permissions) &&
              options.roles.some((role) =>
                permissions.includes(role.toLowerCase())
              );

            if (!options.roles.includes(userRole) && !hasCustomPermissions) {
              throw new Error("Insufficient permissions to access this resource");
            }
          }

          return h.authenticated({ credentials });
        } catch (error) {
          return h.unauthenticated(error);
        }
      },
    }));

    // Helper function to create role-based strategies
    const createRoleStrategy = (name: string, roles: UserRole[]) => {
      server.auth.strategy(name, "role-based", { roles });
    };

    // Define role-based strategies
    createRoleStrategy("super_admin", [UserRole.SUPER_ADMIN]);
    createRoleStrategy("manager", [UserRole.SUPER_ADMIN, UserRole.MANAGER]);
    createRoleStrategy("hr", [UserRole.SUPER_ADMIN, UserRole.HR]);
    createRoleStrategy("team_lead", [
      UserRole.SUPER_ADMIN,
      UserRole.MANAGER,
      UserRole.TEAM_LEAD,
    ]);
    createRoleStrategy("manager_hr", [
      UserRole.SUPER_ADMIN,
      UserRole.MANAGER,
      UserRole.HR,
      UserRole.TEAM_LEAD,
    ]);
    createRoleStrategy("admin", [UserRole.SUPER_ADMIN, UserRole.MANAGER]); // Backward compatibility
    createRoleStrategy("all_roles", [
      UserRole.SUPER_ADMIN,
      UserRole.MANAGER,
      UserRole.HR,
      UserRole.TEAM_LEAD,
      UserRole.EMPLOYEE,
    ]);

    logger.info("Auth plugin registered");
  },
};
