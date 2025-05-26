import { Request, ResponseToolkit } from "@hapi/hapi";
import { AppDataSource } from "../config/database";
import { User, UserRole, UserLevel } from "../models";
import { hashPassword, validateEmail, validatePassword } from "../utils/auth";
import logger from "../utils/logger";
import { In } from "typeorm";

export const createUser = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized in createUser");
    }

    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      address,
      role,
      level,
      gender,
      managerId,
      hrId,
      teamLeadId,
      department,
      position,
    } = request.payload as any;

    // Validate input
    if (!firstName || !lastName || !email || !password || !role) {
      return h
        .response({
          message:
            "First name, last name, email, password, and role are required",
        })
        .code(400);
    }

    if (!validateEmail(email)) {
      return h.response({ message: "Invalid email format" }).code(400);
    }

    if (!validatePassword(password)) {
      return h
        .response({
          message:
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
        })
        .code(400);
    }

    // Check if user already exists
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({ where: { email } });

    if (existingUser) {
      return h
        .response({ message: "User with this email already exists" })
        .code(409);
    }

    // Validate role
    if (!Object.values(UserRole).includes(role)) {
      return h.response({ message: "Invalid role" }).code(400);
    }

    // Validate level if provided
    if (level && !Object.values(UserLevel).includes(level)) {
      return h.response({ message: "Invalid level" }).code(400);
    }

    // Validate manager if provided
    if (managerId) {
      const manager = await userRepository.findOne({
        where: { id: managerId },
      });
      if (!manager) {
        return h.response({ message: "Manager not found" }).code(404);
      }

      // Check if manager has appropriate role
      if (
        manager.role !== UserRole.MANAGER &&
        manager.role !== UserRole.SUPER_ADMIN
      ) {
        return h.response({ message: "Invalid manager role" }).code(400);
      }
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = hashedPassword;
    user.phoneNumber = phoneNumber || null;
    user.address = address || null;
    user.role = role;
    user.level = level || UserLevel.LEVEL_1;
    user.gender = gender || null;
    user.managerId = managerId || null;
    user.hrId = hrId || null;
    user.teamLeadId = teamLeadId || null;
    user.department = department || null;
    user.position = position || null;

    // Save user to database
    const savedUser = await userRepository.save(user);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = savedUser;

    return h
      .response({
        message: "User created successfully",
        user: userWithoutPassword,
      })
      .code(201);
  } catch (error) {
    logger.error(`Error in createUser: ${error}`);
    return h
      .response({ message: "An error occurred while creating the user" })
      .code(500);
  }
};

export const getAllUsers = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized in getAllUsers");
    }

    const { role, isActive } = request.query as any;

    // Build query
    const userRepository = AppDataSource.getRepository(User);
    let query: any = {};

    if (role) {
      query.role = role;
    }

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    // Get users with relations
    const users = await userRepository.find({
      where: query,
      relations: ["roleObj", "departmentObj", "positionObj"],
      order: {
        createdAt: "DESC",
      },
    });

    // Collect all related user IDs (managers, HRs, team leads)
    const relatedUserIds = new Set<string>();
    users.forEach(user => {
      if (user.managerId) relatedUserIds.add(user.managerId);
      if (user.hrId) relatedUserIds.add(user.hrId);
      if (user.teamLeadId) relatedUserIds.add(user.teamLeadId);
    });
    
    // Fetch all related users in a single query
    const relatedUsers = await userRepository.find({
      where: { id: In([...relatedUserIds]) },
      select: ["id", "firstName", "lastName", "email", "role"]
    });
    
    // Create a map for quick lookup
    const relatedUserMap = new Map();
    relatedUsers.forEach(user => {
      relatedUserMap.set(user.id, user);
    });

    // Remove passwords from response and add related user details
    const usersWithoutPasswords = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      
      // Create a result object with additional properties
      const result: any = { ...userWithoutPassword };
      
      // Add manager, HR, and team lead details if they exist
      if (user.managerId && relatedUserMap.has(user.managerId)) {
        result.manager = relatedUserMap.get(user.managerId);
      }
      
      if (user.hrId && relatedUserMap.has(user.hrId)) {
        result.hr = relatedUserMap.get(user.hrId);
      }
      
      if (user.teamLeadId && relatedUserMap.has(user.teamLeadId)) {
        result.teamLead = relatedUserMap.get(user.teamLeadId);
      }
      
      return result;
    });

    return h
      .response({
        users: usersWithoutPasswords,
        count: usersWithoutPasswords.length,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in getAllUsers: ${error}`);
    return h
      .response({ message: "An error occurred while fetching users" })
      .code(500);
  }
};

export const getUserById = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized in getUserById");
    }

    const { id } = request.params;

    // Get user
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ 
      where: { id },
      relations: ["roleObj", "departmentObj", "positionObj"]
    });

    if (!user) {
      return h.response({ message: "User not found" }).code(404);
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    
    // Create a result object with additional properties
    const result: any = { ...userWithoutPassword };
    
    // Collect all related user IDs (manager, HR, team lead)
    const relatedUserIds = [];
    if (user.managerId) relatedUserIds.push(user.managerId);
    if (user.hrId) relatedUserIds.push(user.hrId);
    if (user.teamLeadId) relatedUserIds.push(user.teamLeadId);
    
    if (relatedUserIds.length > 0) {
      // Fetch all related users in a single query
      const relatedUsers = await userRepository.find({
        where: { id: In(relatedUserIds) },
        select: ["id", "firstName", "lastName", "email", "role"]
      });
      
      // Create a map for quick lookup
      const relatedUserMap = new Map();
      relatedUsers.forEach(relatedUser => {
        relatedUserMap.set(relatedUser.id, relatedUser);
      });
      
      // Add manager, HR, and team lead details if they exist
      if (user.managerId && relatedUserMap.has(user.managerId)) {
        result.manager = relatedUserMap.get(user.managerId);
      }
      
      if (user.hrId && relatedUserMap.has(user.hrId)) {
        result.hr = relatedUserMap.get(user.hrId);
      }
      
      if (user.teamLeadId && relatedUserMap.has(user.teamLeadId)) {
        result.teamLead = relatedUserMap.get(user.teamLeadId);
      }
    }
    
    return h
      .response({
        user: result,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in getUserById: ${error}`);
    return h
      .response({ message: "An error occurred while fetching the user" })
      .code(500);
  }
};

export const updateUser = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized in updateUser");
    }

    const { id } = request.params;
    const {
      firstName,
      lastName,
      phoneNumber,
      address,
      role,
      roleId,
      level,
      isActive,
      managerId,
      hrId,
      teamLeadId,
      department,
      position,
    } = request.payload as any;

    // Get user
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      return h.response({ message: "User not found" }).code(404);
    }

    // Validate role if provided
    if (role && !Object.values(UserRole).includes(role)) {
      return h.response({ message: "Invalid role" }).code(400);
    }

    // Validate level if provided
    if (level && !Object.values(UserLevel).includes(level)) {
      return h.response({ message: "Invalid level" }).code(400);
    }

    // Validate manager if provided
    if (managerId) {
      const manager = await userRepository.findOne({
        where: { id: managerId },
      });
      if (!manager) {
        return h.response({ message: "Manager not found" }).code(404);
      }

      // Check if manager has appropriate role
      if (
        manager.role !== UserRole.MANAGER &&
        manager.role !== UserRole.SUPER_ADMIN
      ) {
        return h.response({ message: "Invalid manager role" }).code(400);
      }

      // Prevent circular management relationships
      if (managerId === id) {
        return h
          .response({ message: "A user cannot be their own manager" })
          .code(400);
      }
    }

    // Validate HR if provided
    if (hrId) {
      const hr = await userRepository.findOne({
        where: { id: hrId },
      });
      if (!hr) {
        return h.response({ message: "HR not found" }).code(404);
      }

      // Check if HR has appropriate role
      if (hr.role !== UserRole.HR) {
        return h.response({ message: "Invalid HR role" }).code(400);
      }

      // Prevent circular relationships
      if (hrId === id) {
        return h
          .response({ message: "A user cannot be their own HR" })
          .code(400);
      }
    }

    // Validate Team Lead if provided
    if (teamLeadId) {
      const teamLead = await userRepository.findOne({
        where: { id: teamLeadId },
      });
      if (!teamLead) {
        return h.response({ message: "Team Lead not found" }).code(404);
      }

      // Check if Team Lead has appropriate role
      if (teamLead.role !== UserRole.TEAM_LEAD) {
        return h.response({ message: "Invalid Team Lead role" }).code(400);
      }

      // Prevent circular relationships
      if (teamLeadId === id) {
        return h
          .response({ message: "A user cannot be their own Team Lead" })
          .code(400);
      }
    }

    // Update user fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;
    if (address !== undefined) user.address = address;
    if (role) user.role = role;
    if (roleId !== undefined) user.roleId = roleId;
    if (level) user.level = level;
    if (isActive !== undefined) user.isActive = isActive;
    if (managerId !== undefined) user.managerId = managerId;
    if (hrId !== undefined) user.hrId = hrId;
    if (teamLeadId !== undefined) user.teamLeadId = teamLeadId;
    if (department !== undefined) user.department = department;
    if (position !== undefined) user.position = position;

    // Save updated user
    const updatedUser = await userRepository.save(user);

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;

    return h
      .response({
        message: "User updated successfully",
        user: userWithoutPassword,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in updateUser: ${error}`);
    return h
      .response({ message: "An error occurred while updating the user" })
      .code(500);
  }
};

export const deleteUser = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized in deleteUser");
    }

    const { id } = request.params;

    // Get user
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      return h.response({ message: "User not found" }).code(404);
    }

    // Check if user is a manager
    const managedUsers = await userRepository.find({
      where: { managerId: id },
    });
    if (managedUsers.length > 0) {
      return h
        .response({
          message:
            "Cannot delete a user who is a manager. Please reassign their team members first.",
        })
        .code(400);
    }

    // Delete user
    await userRepository.remove(user);

    return h
      .response({
        message: "User deleted successfully",
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in deleteUser: ${error}`);
    return h
      .response({ message: "An error occurred while deleting the user" })
      .code(500);
  }
};

export const resetUserPassword = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    // Ensure database connection is initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized in resetUserPassword");
    }

    const { id } = request.params;
    const { newPassword } = request.payload as any;

    // Validate input
    if (!newPassword) {
      return h.response({ message: "New password is required" }).code(400);
    }

    if (!validatePassword(newPassword)) {
      return h
        .response({
          message:
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
        })
        .code(400);
    }

    // Get user
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      return h.response({ message: "User not found" }).code(404);
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password
    user.password = hashedPassword;
    await userRepository.save(user);

    return h
      .response({
        message: "Password reset successfully",
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in resetUserPassword: ${error}`);
    return h
      .response({ message: "An error occurred while resetting the password" })
      .code(500);
  }
};

export const deactivateUser = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized in deactivateUser");
    }

    const { id } = request.params;

    // Get user
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      return h.response({ message: "User not found" }).code(404);
    }

    // Check if user is already deactivated
    if (!user.isActive) {
      return h.response({ message: "User is already deactivated" }).code(400);
    }

    // Deactivate user
    user.isActive = false;
    const updatedUser = await userRepository.save(user);

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;

    return h
      .response({
        message: "User deactivated successfully",
        user: userWithoutPassword,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in deactivateUser: ${error}`);
    return h
      .response({ message: "An error occurred while deactivating the user" })
      .code(500);
  }
};

export const activateUser = async (request: Request, h: ResponseToolkit) => {
  try {
    const { id } = request.params;

    // Get user
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      return h.response({ message: "User not found" }).code(404);
    }

    // Check if user is already activated
    if (user.isActive) {
      return h.response({ message: "User is already activated" }).code(400);
    }

    // Activate user
    user.isActive = true;
    const updatedUser = await userRepository.save(user);

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;

    return h
      .response({
        message: "User activated successfully",
        user: userWithoutPassword,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in activateUser: ${error}`);
    return h
      .response({ message: "An error occurred while activating the user" })
      .code(500);
  }
};

export const getUserApprovers = async (request: Request, h: ResponseToolkit) => {
  try {
    // Check if auth credentials exist
    if (!request.auth || !request.auth.credentials) {
      logger.error("No auth credentials found in request");
      return h.response({ message: "Authentication error" }).code(401);
    }
    
    // Get the authenticated user ID from credentials
    const userId = request.auth.credentials.id as string;
    const { workflowId } = request.query as any;
    
    // Get user repository
    const userRepository = AppDataSource.getRepository(User);
    
    // First, get the complete user record from the database
    const currentUser = await userRepository.findOne({
      where: { id: userId }
    });
    
    if (!currentUser) {
      return h.response({ message: "User not found" }).code(404);
    }
    
    // Find the user's approvers based on their hierarchy
    const approvers = [];
    
    // Special handling for different roles
    // If the user is a Team Lead, they should skip Level 1 approval
    if (currentUser.role === UserRole.TEAM_LEAD) {
      logger.info(`User ${userId} is a Team Lead, skipping Level 1 approval`);
      
      // For Team Leads, their manager is the first approver (Level 1)
      if (currentUser.managerId) {
        const manager = await userRepository.findOne({ 
          where: { id: currentUser.managerId },
          select: ["id", "firstName", "lastName", "email", "role"] 
        });
        
        if (manager) {
          approvers.push({
            ...manager,
            level: 1, // Make the manager the Level 1 approver for Team Leads
            isFallback: false
          });
        }
      }
      
      // Add HR as Level 2 approver
      if (currentUser.hrId) {
        const hr = await userRepository.findOne({ 
          where: { id: currentUser.hrId },
          select: ["id", "firstName", "lastName", "email", "role"] 
        });
        
        if (hr) {
          approvers.push({
            ...hr,
            level: 2, // HR becomes Level 2 for Team Leads
            isFallback: false
          });
        }
      }
    } 
    // If the user is a Manager, they should skip Level 1 and 2
    else if (currentUser.role === UserRole.MANAGER) {
      logger.info(`User ${userId} is a Manager, skipping Level 1 and 2 approval`);
      
      // For Managers, HR is the first approver (Level 1)
      if (currentUser.hrId) {
        const hr = await userRepository.findOne({ 
          where: { id: currentUser.hrId },
          select: ["id", "firstName", "lastName", "email", "role"] 
        });
        
        if (hr) {
          approvers.push({
            ...hr,
            level: 1, // Make HR the Level 1 approver for Managers
            isFallback: false
          });
        }
      } else {
        // If no specific HR is assigned, find an HR from the same department
        const departmentHR = await userRepository.findOne({
          where: { 
            role: UserRole.HR, 
            isActive: true,
            department: currentUser.department 
          },
          select: ["id", "firstName", "lastName", "email", "role"]
        });
        
        if (departmentHR) {
          approvers.push({
            ...departmentHR,
            level: 1,
            isFallback: true
          });
        } else {
          // If no HR in the same department, find any HR
          const anyHR = await userRepository.findOne({
            where: { role: UserRole.HR, isActive: true },
            select: ["id", "firstName", "lastName", "email", "role"]
          });
          
          if (anyHR) {
            approvers.push({
              ...anyHR,
              level: 1,
              isFallback: true
            });
          }
        }
      }
    }
    // If the user is HR, they should skip Level 1, 2, and 3
    else if (currentUser.role === UserRole.HR) {
      logger.info(`User ${userId} is HR, skipping to Super Admin approval`);
      
      // For HR, Super Admin is the first approver (Level 1)
      const admins = await userRepository.find({
        where: { role: UserRole.SUPER_ADMIN, isActive: true },
        select: ["id", "firstName", "lastName", "email", "role"]
      });
      
      if (admins.length > 0) {
        approvers.push({
          ...admins[0],
          level: 1, // Make Super Admin the Level 1 approver for HR
          isFallback: false
        });
      } else {
        // If no Super Admin is found, try another approach
        const superAdmins = await userRepository.find({
          where: { role: UserRole.SUPER_ADMIN, isActive: true },
          select: ["id", "firstName", "lastName", "email", "role"]
        });
        
        if (superAdmins.length > 0) {
          approvers.push({
            ...superAdmins[0],
            level: 1, // Make Super Admin the Level 1 approver for HR
            isFallback: true
          });
        }
      }
    }
    // Regular employee approval path
    else {
      // Add team lead if exists
      if (currentUser.teamLeadId) {
        const teamLead = await userRepository.findOne({ 
          where: { id: currentUser.teamLeadId },
          select: ["id", "firstName", "lastName", "email", "role"] 
        });
        
        if (teamLead) {
          approvers.push({
            ...teamLead,
            level: 1,
            isFallback: false
          });
        }
      }
      
      // Add manager if exists
      if (currentUser.managerId) {
        const manager = await userRepository.findOne({ 
          where: { id: currentUser.managerId },
          select: ["id", "firstName", "lastName", "email", "role"] 
        });
        
        if (manager) {
          approvers.push({
            ...manager,
            level: 2,
            isFallback: false
          });
        }
      }
      
      // Add HR if exists
      if (currentUser.hrId) {
        const hr = await userRepository.findOne({ 
          where: { id: currentUser.hrId },
          select: ["id", "firstName", "lastName", "email", "role"] 
        });
        
        if (hr) {
          approvers.push({
            ...hr,
            level: 3,
            isFallback: false
          });
        }
      }
    }
    
    // If no direct approvers found, find fallback approvers by role
    if (approvers.length === 0) {
      // For Team Leads, find managers directly
      if (currentUser.role === UserRole.TEAM_LEAD) {
        // Find managers in the same department if possible
        const managerFilter = currentUser.department 
          ? { role: UserRole.MANAGER, isActive: true, department: currentUser.department }
          : { role: UserRole.MANAGER, isActive: true };
          
        const managers = await userRepository.find({
          where: managerFilter,
          select: ["id", "firstName", "lastName", "email", "role"]
        });
        
        if (managers.length > 0) {
          approvers.push({
            ...managers[0],
            level: 1, // Level 1 for Team Leads is their manager
            isFallback: true
          });
        }
      }
      // For Managers, find HR directly
      else if (currentUser.role === UserRole.MANAGER) {
        // First try to find HR in the same department
        const departmentHRs = await userRepository.find({
          where: { 
            role: UserRole.HR, 
            isActive: true,
            department: currentUser.department 
          },
          select: ["id", "firstName", "lastName", "email", "role"]
        });
        
        if (departmentHRs.length > 0) {
          approvers.push({
            ...departmentHRs[0],
            level: 1, // Level 1 for Managers is HR
            isFallback: true
          });
        } else {
          // If no HR in the same department, find any HR
          const hrs = await userRepository.find({
            where: { role: UserRole.HR, isActive: true },
            select: ["id", "firstName", "lastName", "email", "role"]
          });
          
          if (hrs.length > 0) {
            approvers.push({
              ...hrs[0],
              level: 1, // Level 1 for Managers is HR
              isFallback: true
            });
          }
        }
      }
      // For HR, find Super Admin
      else if (currentUser.role === UserRole.HR) {
        // Find Super Admin
        const admins = await userRepository.find({
          where: { role: UserRole.SUPER_ADMIN, isActive: true },
          select: ["id", "firstName", "lastName", "email", "role"]
        });
        
        if (admins.length > 0) {
          approvers.push({
            ...admins[0],
            level: 1, // Level 1 for HR is Super Admin
            isFallback: true
          });
        } else {
          // If no Super Admin found, try again
          const superAdmins = await userRepository.find({
            where: { role: UserRole.SUPER_ADMIN, isActive: true },
            select: ["id", "firstName", "lastName", "email", "role"]
          });
          
          if (superAdmins.length > 0) {
            approvers.push({
              ...superAdmins[0],
              level: 1, // Level 1 for HR is Super Admin if no Admin
              isFallback: true
            });
          }
        }
      }
      // For regular employees, find team leads and managers
      else {
        // Find team leads in the same department if possible
        const departmentFilter = currentUser.department 
          ? { role: UserRole.TEAM_LEAD, isActive: true, department: currentUser.department }
          : { role: UserRole.TEAM_LEAD, isActive: true };
          
        const teamLeads = await userRepository.find({
          where: departmentFilter,
          select: ["id", "firstName", "lastName", "email", "role"]
        });
        
        if (teamLeads.length > 0) {
          approvers.push({
            ...teamLeads[0],
            level: 1,
            isFallback: true
          });
        }
        
        // Find managers in the same department if possible
        const managerFilter = currentUser.department 
          ? { role: UserRole.MANAGER, isActive: true, department: currentUser.department }
          : { role: UserRole.MANAGER, isActive: true };
          
        const managers = await userRepository.find({
          where: managerFilter,
          select: ["id", "firstName", "lastName", "email", "role"]
        });
        
        if (managers.length > 0) {
          approvers.push({
            ...managers[0],
            level: 2,
            isFallback: true
          });
        }
        
        // Find HR
        const hrs = await userRepository.find({
          where: { role: UserRole.HR, isActive: true },
          select: ["id", "firstName", "lastName", "email", "role"]
        });
        
        if (hrs.length > 0) {
          approvers.push({
            ...hrs[0],
            level: 3,
            isFallback: true
          });
        }
      }
    }
    
    // Sort approvers by level
    approvers.sort((a, b) => a.level - b.level);
    
    return h
      .response({
        approvers,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in getUserApprovers: ${error}`);
    return h
      .response({ 
        message: "An error occurred while fetching user approvers",
        error: error.message
      })
      .code(500);
  }
};
