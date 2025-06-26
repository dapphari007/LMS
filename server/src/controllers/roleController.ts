import { Request, ResponseToolkit } from "@hapi/hapi";
import { AppDataSource, ensureDatabaseConnection } from "../config/database";
import { Role, User, UserRole, DashboardType } from "../models";
import logger from "../utils/logger";

// Define interfaces for the API responses
interface UserBasicInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
}

interface RoleWithUsers {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  permissions: string;
  isSystem: boolean;
  dashboardType: DashboardType;
  createdAt: Date;
  updatedAt: Date;
  users: UserBasicInfo[];
  userCount: number;
}

export const createRole = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { name, description, permissions, isActive, dashboardType } = request.payload as any;

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
    
    // Set dashboard type if provided, otherwise default to EMPLOYEE
    if (dashboardType && Object.values(DashboardType).includes(dashboardType)) {
      role.dashboardType = dashboardType;
    } else {
      role.dashboardType = DashboardType.EMPLOYEE;
    }

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

    const { isActive, includeUsers } = request.query as any;

    // Build query
    const roleRepository = AppDataSource.getRepository(Role);
    let query: any = {};

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    // First, get all roles without relations
    const roles = await roleRepository.find({
      where: query,
      order: {
        createdAt: "DESC",
      },
    });

    // If users are requested, fetch them separately for each role
    let responseRoles: Role[] | RoleWithUsers[] = roles;
    
    if (includeUsers === "true" && roles.length > 0) {
      const userRepository = AppDataSource.getRepository(User);
      
      // Create an array of promises to fetch users for each role
      const rolePromises = roles.map(async (role) => {
        // Try to find users by roleId first, then fall back to role enum if needed
        let users = await userRepository.find({
          where: { roleId: role.id },
          select: ["id", "firstName", "lastName", "email", "isActive"]
        });
        
        // If no users found by roleId, try to match by role name (for backward compatibility)
        if (users.length === 0 && role.name) {
          // Convert role name to enum value format (lowercase with underscores)
          const roleEnumValue = role.name.toLowerCase().replace(/\s+/g, '_');
          
          // Check if the role name matches any of the UserRole enum values
          const matchingRoles = Object.values(UserRole).filter(enumValue => 
            enumValue === roleEnumValue
          );
          
          if (matchingRoles.length > 0) {
            // If there's a match, use the enum value
            users = await userRepository.find({
              where: { role: matchingRoles[0] as UserRole },
              select: ["id", "firstName", "lastName", "email", "isActive"]
            });
          }
        }
        
        // Create a new object with the role properties and the users array
        const roleWithUsers: RoleWithUsers = {
          id: role.id,
          name: role.name,
          description: role.description,
          isActive: role.isActive,
          permissions: role.permissions,
          isSystem: role.isSystem,
          dashboardType: role.dashboardType,
          createdAt: role.createdAt,
          updatedAt: role.updatedAt,
          users: users,
          userCount: users.length
        };
        
        return roleWithUsers;
      });
      
      // Wait for all promises to resolve
      responseRoles = await Promise.all(rolePromises);
    }

    return h
      .response({
        roles: responseRoles,
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
    const { includeUsers } = request.query as any;

    // Get role
    const roleRepository = AppDataSource.getRepository(Role);
    
    // Get role without relations
    const role = await roleRepository.findOne({ 
      where: { id }
    });

    if (!role) {
      return h.response({ message: "Role not found" }).code(404);
    }

    // If users are requested, fetch them separately
    let responseRole: Role | RoleWithUsers = role;
    
    if (includeUsers === "true") {
      const userRepository = AppDataSource.getRepository(User);
      
      // Try to find users by roleId first, then fall back to role enum if needed
      let users = await userRepository.find({
        where: { roleId: role.id },
        select: ["id", "firstName", "lastName", "email", "isActive"]
      });
      
      // If no users found by roleId, try to match by role name (for backward compatibility)
      if (users.length === 0 && role.name) {
        // Convert role name to enum value format (lowercase with underscores)
        const roleEnumValue = role.name.toLowerCase().replace(/\s+/g, '_');
        
        // Check if the role name matches any of the UserRole enum values
        const matchingRoles = Object.values(UserRole).filter(enumValue => 
          enumValue === roleEnumValue
        );
        
        if (matchingRoles.length > 0) {
          // If there's a match, use the enum value
          users = await userRepository.find({
            where: { role: matchingRoles[0] as UserRole },
            select: ["id", "firstName", "lastName", "email", "isActive"]
          });
        }
      }
      
      // Create a new object with the role properties and the users array
      const roleWithUsers: RoleWithUsers = {
        id: role.id,
        name: role.name,
        description: role.description,
        isActive: role.isActive,
        permissions: role.permissions,
        isSystem: role.isSystem,
        dashboardType: role.dashboardType,
        createdAt: role.createdAt,
        updatedAt: role.updatedAt,
        users: users,
        userCount: users.length
      };
      
      responseRole = roleWithUsers;
    }

    return h
      .response({
        role: responseRole,
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
    const { name, description, permissions, isActive, dashboardType } = request.payload as any;

    // Get role
    const roleRepository = AppDataSource.getRepository(Role);
    const role = await roleRepository.findOne({ where: { id } });

    if (!role) {
      return h.response({ message: "Role not found" }).code(404);
    }

    // Allow super_admin to modify system roles, but prevent others
    const credentials = request.auth.credentials as any;
    if (role.isSystem && credentials.role !== "super_admin") {
      return h
        .response({ message: "System roles can only be modified by super administrators" })
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
    
    // Update dashboard type if provided
    if (dashboardType && Object.values(DashboardType).includes(dashboardType)) {
      role.dashboardType = dashboardType;
    }

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

    // Allow super_admin to delete system roles, but prevent others
    const credentials = request.auth.credentials as any;
    if (role.isSystem && credentials.role !== "super_admin") {
      return h
        .response({ message: "System roles can only be deleted by super administrators" })
        .code(400);
    }

    // Check if role is being used by any users
    const userRepository = AppDataSource.getRepository(User);
    const usersWithRole = await userRepository.find({ where: { roleId: id } });
    if (usersWithRole.length > 0 && credentials.role !== "super_admin") {
      return h
        .response({
          message:
            "Cannot delete a role that is assigned to users. Please reassign users first.",
        })
        .code(400);
    }
    
    // If super_admin is deleting a role with users, reassign those users to the default employee role
    if (usersWithRole.length > 0 && credentials.role === "super_admin") {
      // Find the default employee role (or create one if it doesn't exist)
      let defaultRole = await roleRepository.findOne({ where: { name: "Employee" } });
      
      if (!defaultRole) {
        // If no Employee role exists, use any other active role
        defaultRole = await roleRepository.findOne({ where: { isActive: true } });
        
        if (!defaultRole || defaultRole.id === id) {
          return h
            .response({
              message: "Cannot delete the last active role in the system.",
            })
            .code(400);
        }
      }
      
      // Reassign users to the default role
      for (const user of usersWithRole) {
        user.roleId = defaultRole.id;
        await userRepository.save(user);
      }
      
      logger.info(`Reassigned ${usersWithRole.length} users from role ${role.name} to ${defaultRole.name}`);
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

export const toggleRoleStatus = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { id } = request.params;
    const { isActive } = request.payload as any;

    // Get role
    const roleRepository = AppDataSource.getRepository(Role);
    const role = await roleRepository.findOne({ where: { id } });

    if (!role) {
      return h.response({ message: "Role not found" }).code(404);
    }

    // Allow super_admin to modify system roles, but prevent others
    const credentials = request.auth.credentials as any;
    if (role.isSystem && credentials.role !== "super_admin") {
      return h
        .response({ message: "System roles can only be modified by super administrators" })
        .code(400);
    }

    // Update role status
    role.isActive = isActive;
    const updatedRole = await roleRepository.save(role);

    return h
      .response({
        message: `Role ${isActive ? "activated" : "deactivated"} successfully`,
        role: updatedRole,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in toggleRoleStatus: ${error}`);
    return h
      .response({ message: "An error occurred while updating the role status" })
      .code(500);
  }
};

// Function to update user roleIds based on their role enum values
export const updateUserRoleIds = async () => {
  try {
    // Ensure database connection is established
    await ensureDatabaseConnection();
    
    const roleRepository = AppDataSource.getRepository(Role);
    const userRepository = AppDataSource.getRepository(User);
    
    // Get all roles
    const roles = await roleRepository.find();
    
    // Get all users
    const users = await userRepository.find();
    
    // Create a map of role enum values to role IDs
    const roleMap = new Map();
    roles.forEach(role => {
      // Convert role name to enum format (lowercase with underscores)
      const roleEnumValue = role.name.toLowerCase().replace(/\s+/g, '_');
      roleMap.set(roleEnumValue, role.id);
    });
    
    // Update users with missing roleId
    for (const user of users) {
      if (!user.roleId && user.role) {
        // Get the string value of the enum
        const userRoleValue = user.role.toString();
        
        if (roleMap.has(userRoleValue)) {
          user.roleId = roleMap.get(userRoleValue);
          await userRepository.save(user);
          logger.info(`Updated roleId for user ${user.id} (${user.firstName} ${user.lastName})`);
        }
      }
    }
    
    logger.info('User roleIds have been updated successfully');
  } catch (error) {
    logger.error(`Error in updateUserRoleIds: ${error}`);
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
        dashboardType: DashboardType.SUPER_ADMIN,
        isSystem: true,
      },
      {
        name: "Admin",
        description: "Administrator with advanced system access",
        permissions: JSON.stringify({
          users: { create: true, read: true, update: true, delete: true },
          roles: { create: true, read: true, update: true, delete: false },
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
        dashboardType: DashboardType.ADMIN,
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
        dashboardType: DashboardType.MANAGER,
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
        dashboardType: DashboardType.HR,
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
        dashboardType: DashboardType.MANAGER,
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
        dashboardType: DashboardType.EMPLOYEE,
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
