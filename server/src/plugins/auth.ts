import { Server } from "@hapi/hapi";
import jwt from "@hapi/jwt";
import { UserRole } from "../models";
import config from "../config/config";
import logger from "../utils/logger";

interface AuthOptions {
  roles?: UserRole[];
}

interface JwtPayload {
  id: string;
  email: string;
  role: UserRole;
  level?: string;
  permissions?: string[];
}

interface Credentials extends JwtPayload {}

const hasCustomRolePermission = (
  userPermissions: string[] | undefined,
  allowedRoles: UserRole[]
): boolean => {
  if (!Array.isArray(userPermissions)) return false;
  return (
    (allowedRoles.includes(UserRole.HR) && userPermissions.includes("hr")) ||
    (allowedRoles.includes(UserRole.MANAGER) && userPermissions.includes("manager")) ||
    (allowedRoles.includes(UserRole.TEAM_LEAD) && userPermissions.includes("team_lead"))
  );
};

const registerRoleStrategy = (
  server: Server,
  name: string,
  roles: UserRole[]
) => {
  server.auth.strategy(name, "role-based", { roles });
};

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
          const { payload } = decoded as { payload: JwtPayload };

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
              permissions: payload.permissions,
            } as Credentials,
          };
        } catch (error) {
          logger.error(`Auth validation error: ${error}`);
          return { isValid: false };
        }
      },
    });

    server.auth.default("jwt");

    server.auth.scheme("role-based", (server, options: AuthOptions) => ({
      authenticate: async (request, h) => {
        try {
          const { credentials } = await server.auth.test("jwt", request);

          if (!credentials) {
            return h.unauthenticated(new Error("Invalid credentials"));
          }

          if (options.roles && options.roles.length > 0) {
            const userRole = credentials.role as UserRole;
            const userPermissions = Array.isArray(credentials.permissions) ? credentials.permissions : undefined;

            if (
              !options.roles.includes(userRole) &&
              !hasCustomRolePermission(userPermissions, options.roles)
            ) {
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
    }));

    // Register role-based strategies using helper
    registerRoleStrategy(server, "super_admin", [UserRole.SUPER_ADMIN]);
    registerRoleStrategy(server, "manager", [UserRole.SUPER_ADMIN, UserRole.MANAGER]);
    registerRoleStrategy(server, "hr", [UserRole.SUPER_ADMIN, UserRole.HR]);
    registerRoleStrategy(server, "team_lead", [
      UserRole.SUPER_ADMIN,
      UserRole.MANAGER,
      UserRole.TEAM_LEAD,
    ]);
    registerRoleStrategy(server, "employee", [
      UserRole.SUPER_ADMIN,
      UserRole.MANAGER,
      UserRole.HR,
      UserRole.TEAM_LEAD,
      UserRole.EMPLOYEE,
    ]);
    // Backward compatibility
    registerRoleStrategy(server, "admin", [UserRole.SUPER_ADMIN, UserRole.MANAGER]);
    registerRoleStrategy(server, "all_roles", [
      UserRole.SUPER_ADMIN,
      UserRole.MANAGER,
      UserRole.HR,
      UserRole.TEAM_LEAD,
      UserRole.EMPLOYEE,
    ]);
  },
};
