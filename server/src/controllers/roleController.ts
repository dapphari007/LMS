import { Request, ResponseToolkit } from "@hapi/hapi";
import { AppDataSource, ensureDatabaseConnection } from "../config/database";
import { Role, User, UserRole } from "../models";
import logger from "../utils/logger";

export const createRole = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { name, description, permissions, isActive } = request.payload as any;

    // Validate input
    if (!name) {
      return h.response({ message: "Role name is required" }).code(400);
    }

    // Check if role already exists
    const roleRepository = AppDataSource.getRepository(Role);
    const existingRole = await roleRepository.findOne({ where: { name } });

    if (existingRole) {
      return h
        .response({ message: "Role with this name already exists" })
        .code(409);
    }

    // Create new role
    const role = new Role();
    role.name = name;
    role.description = description || null;
    role.permissions = permissions ? JSON.stringify(permissions) : null;
    role.isActive = isActive !== undefined ? isActive : true;
    role.isSystem = false; // User-created roles are not system roles

    // Save role to database
    const savedRole = await roleRepository.save(role);

    return h
      .response({
        message: "Role created successfully",
        role: savedRole,
      })
      .code(201);
  } catch (error) {
    logger.error(`Error in createRole: ${error}`);
    return h
      .response({ message: "An error occurred while creating the role" })
      .code(500);
  }
};

export const getAllRoles = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { isActive } = request.query as any;

    // Build query
    const roleRepository = AppDataSource.getRepository(Role);
    let query: any = {};

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    // Get roles
    const roles = await roleRepository.find({
      where: query,
      order: {
        createdAt: "DESC",
      },
    });

    return h
      .response({
        roles,
        count: roles.length,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in getAllRoles: ${error}`);
    return h
      .response({ message: "An error occurred while fetching roles" })
      .code(500);
  }
};

export const getRoleById = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { id } = request.params;

    // Get role
    const roleRepository = AppDataSource.getRepository(Role);
    const role = await roleRepository.findOne({ where: { id } });

    if (!role) {
      return h.response({ message: "Role not found" }).code(404);
    }

    return h
      .response({
        role,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in getRoleById: ${error}`);
    return h
      .response({ message: "An error occurred while fetching the role" })
      .code(500);
  }
};

export const updateRole = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { id } = request.params;
    const { name, description, permissions, isActive } = request.payload as any;

    // Get role
    const roleRepository = AppDataSource.getRepository(Role);
    const role = await roleRepository.findOne({ where: { id } });

    if (!role) {
      return h.response({ message: "Role not found" }).code(404);
    }

    // Check if this is a system role
    if (role.isSystem) {
      return h
        .response({ message: "System roles cannot be modified" })
        .code(400);
    }

    // Check if name is being changed and if it already exists
    if (name && name !== role.name) {
      const existingRole = await roleRepository.findOne({ where: { name } });
      if (existingRole) {
        return h
          .response({ message: "Role with this name already exists" })
          .code(409);
      }
    }

    // Update role fields
    if (name) role.name = name;
    if (description !== undefined) role.description = description;
    if (permissions !== undefined)
      role.permissions = permissions ? JSON.stringify(permissions) : null;
    if (isActive !== undefined) role.isActive = isActive;

    // Save updated role
    const updatedRole = await roleRepository.save(role);

    return h
      .response({
        message: "Role updated successfully",
        role: updatedRole,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in updateRole: ${error}`);
    return h
      .response({ message: "An error occurred while updating the role" })
      .code(500);
  }
};

export const deleteRole = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { id } = request.params;

    // Get role
    const roleRepository = AppDataSource.getRepository(Role);
    const role = await roleRepository.findOne({ where: { id } });

    if (!role) {
      return h.response({ message: "Role not found" }).code(404);
    }

    // Check if this is a system role
    if (role.isSystem) {
      return h
        .response({ message: "System roles cannot be deleted" })
        .code(400);
    }

    // Check if role is being used by any users
    const userRepository = AppDataSource.getRepository(User);
    const usersWithRole = await userRepository.find({ where: { roleId: id } });

    if (usersWithRole.length > 0) {
      return h
        .response({
          message:
            "Cannot delete a role that is assigned to users. Please reassign users first.",
        })
        .code(400);
    }

    // Delete role
    await roleRepository.remove(role);

    return h
      .response({
        message: "Role deleted successfully",
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in deleteRole: ${error}`);
    return h
      .response({ message: "An error occurred while deleting the role" })
      .code(500);
  }
};

// Function to initialize system roles
export const initializeSystemRoles = async () => {
  try {
    // Ensure database connection is established
    await ensureDatabaseConnection();

    const roleRepository = AppDataSource.getRepository(Role);

    // Define system roles based on UserRole enum
    const systemRoles = [
      {
        name: UserRole.SUPER_ADMIN,
        description: "Super Administrator with full access",
        permissions: JSON.stringify({
          users: { create: true, read: true, update: true, delete: true },
          roles: { create: true, read: true, update: true, delete: true },
          departments: { create: true, read: true, update: true, delete: true },
          positions: { create: true, read: true, update: true, delete: true },
          pages: { create: true, read: true, update: true, delete: true },
          leaveRequests: {
            create: true,
            read: true,
            update: true,
            delete: true,
          },
          leaveTypes: { create: true, read: true, update: true, delete: true },
          leaveBalances: {
            create: true,
            read: true,
            update: true,
            delete: true,
          },
          holidays: { create: true, read: true, update: true, delete: true },
          approvalWorkflows: {
            create: true,
            read: true,
            update: true,
            delete: true,
          },
        }),
        isSystem: true,
      },
      {
        name: UserRole.MANAGER,
        description: "Manager with team management access",
        permissions: JSON.stringify({
          users: { create: false, read: true, update: true, delete: false },
          roles: { create: false, read: true, update: false, delete: false },
          departments: {
            create: false,
            read: true,
            update: false,
            delete: false,
          },
          positions: {
            create: false,
            read: true,
            update: false,
            delete: false,
          },
          pages: { create: false, read: true, update: false, delete: false },
          leaveRequests: {
            create: true,
            read: true,
            update: true,
            delete: false,
          },
          leaveTypes: {
            create: false,
            read: true,
            update: false,
            delete: false,
          },
          leaveBalances: {
            create: false,
            read: true,
            update: false,
            delete: false,
          },
          holidays: { create: false, read: true, update: false, delete: false },
          approvalWorkflows: {
            create: false,
            read: true,
            update: false,
            delete: false,
          },
        }),
        isSystem: true,
      },
      {
        name: UserRole.HR,
        description: "HR with personnel management access",
        permissions: JSON.stringify({
          users: { create: true, read: true, update: true, delete: false },
          roles: { create: false, read: true, update: false, delete: false },
          departments: {
            create: false,
            read: true,
            update: false,
            delete: false,
          },
          positions: {
            create: false,
            read: true,
            update: false,
            delete: false,
          },
          pages: { create: false, read: true, update: false, delete: false },
          leaveRequests: {
            create: true,
            read: true,
            update: true,
            delete: false,
          },
          leaveTypes: { create: true, read: true, update: true, delete: true },
          leaveBalances: {
            create: true,
            read: true,
            update: true,
            delete: false,
          },
          holidays: { create: true, read: true, update: true, delete: true },
          approvalWorkflows: {
            create: true,
            read: true,
            update: true,
            delete: true,
          },
        }),
        isSystem: true,
      },
      {
        name: UserRole.TEAM_LEAD,
        description: "Team Lead with limited team management access",
        permissions: JSON.stringify({
          users: { create: false, read: true, update: false, delete: false },
          roles: { create: false, read: true, update: false, delete: false },
          departments: {
            create: false,
            read: true,
            update: false,
            delete: false,
          },
          positions: {
            create: false,
            read: true,
            update: false,
            delete: false,
          },
          pages: { create: false, read: true, update: false, delete: false },
          leaveRequests: {
            create: true,
            read: true,
            update: true,
            delete: false,
          },
          leaveTypes: {
            create: false,
            read: true,
            update: false,
            delete: false,
          },
          leaveBalances: {
            create: false,
            read: true,
            update: false,
            delete: false,
          },
          holidays: { create: false, read: true, update: false, delete: false },
          approvalWorkflows: {
            create: false,
            read: true,
            update: false,
            delete: false,
          },
        }),
        isSystem: true,
      },
      {
        name: UserRole.EMPLOYEE,
        description: "Regular employee with basic access",
        permissions: JSON.stringify({
          users: { create: false, read: false, update: false, delete: false },
          roles: { create: false, read: false, update: false, delete: false },
          departments: {
            create: false,
            read: true,
            update: false,
            delete: false,
          },
          positions: {
            create: false,
            read: true,
            update: false,
            delete: false,
          },
          pages: { create: false, read: false, update: false, delete: false },
          leaveRequests: {
            create: true,
            read: true,
            update: false,
            delete: false,
          },
          leaveTypes: {
            create: false,
            read: true,
            update: false,
            delete: false,
          },
          leaveBalances: {
            create: false,
            read: true,
            update: false,
            delete: false,
          },
          holidays: { create: false, read: true, update: false, delete: false },
          approvalWorkflows: {
            create: false,
            read: false,
            update: false,
            delete: false,
          },
        }),
        isSystem: true,
      },
    ];

    // Create or update system roles
    for (const roleData of systemRoles) {
      let role = await roleRepository.findOne({
        where: { name: roleData.name },
      });

      if (!role) {
        role = new Role();
        role.name = roleData.name;
        role.isSystem = true;
      }

      role.description = roleData.description;
      role.permissions = roleData.permissions;
      role.isActive = true;

      await roleRepository.save(role);
      logger.info(`System role ${roleData.name} initialized`);
    }

    logger.info("System roles initialization completed");
  } catch (error) {
    logger.error(`Error initializing system roles: ${error}`);
  }
};

export const getRoles = async (request: Request, h: ResponseToolkit) => {
  try {
    const roleRepository = AppDataSource.getRepository(Role);
    const roles = await roleRepository.find({
      relations: ["users"],
    });
    return h.response(roles).code(200);
  } catch (error) {
    logger.error("Error fetching roles:", error);
    return h.response({ error: "Failed to fetch roles" }).code(500);
  }
};
