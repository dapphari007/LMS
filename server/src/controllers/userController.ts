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
