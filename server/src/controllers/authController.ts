import { Request, ResponseToolkit } from "@hapi/hapi";
import { AppDataSource } from "../config/database";
import { User } from "../models";
import {
  hashPassword,
  comparePassword,
  generateToken,
  validateEmail,
  validatePassword,
} from "../utils/auth";
import logger from "../utils/logger";

export const register = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized in register");
    }

    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      address,
      gender,
    } = request.payload as any;

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      return h
        .response({
          message: "First name, last name, email, and password are required",
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

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = hashedPassword;
    user.phoneNumber = phoneNumber;
    user.address = address;
    user.gender = gender;

    // Save user to database
    const savedUser = await userRepository.save(user);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = savedUser;

    return h
      .response({
        message: "User registered successfully",
        user: userWithoutPassword,
      })
      .code(201);
  } catch (error) {
    logger.error(`Error in register: ${error}`);
    return h
      .response({ message: "An error occurred while registering the user" })
      .code(500);
  }
};

export const login = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized in login");
    }

    const { email, password } = request.payload as any;

    // Validate input
    if (!email || !password) {
      return h
        .response({ message: "Email and password are required" })
        .code(400);
    }

    // Find user by email with role information
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ 
      where: { email },
      relations: ['roleObj']
    });

    if (!user) {
      return h.response({ message: "Invalid email or password" }).code(401);
    }

    // Check if user is active
    if (!user.isActive) {
      return h
        .response({
          message:
            "Your account has been deactivated. Please contact an administrator.",
        })
        .code(403);
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return h.response({ message: "Invalid email or password" }).code(401);
    }

    // Generate JWT token
    const token = generateToken(user);

    // Set dashboard type based on role
    if (user.roleObj) {
      user.setDashboardType();
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    // Ensure all necessary fields are included in the response
    const userResponse = {
      ...userWithoutPassword,
      managerId: user.managerId,
      hrId: user.hrId,
      teamLeadId: user.teamLeadId,
      department: user.department,
      position: user.position,
      dashboardType: user.dashboardType,
      roleObj: user.roleObj,
    };

    return h
      .response({
        message: "Login successful",
        token,
        user: userResponse,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in login: ${error}`);
    return h
      .response({ message: "An error occurred while logging in" })
      .code(500);
  }
};

export const getProfile = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized in getProfile");
    }

    const userId = request.auth.credentials.id;

    // Find user by ID with role information
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: userId as string },
      relations: ['roleObj'],
    });

    if (!user) {
      return h.response({ message: "User not found" }).code(404);
    }

    // Set dashboard type based on role
    if (user.roleObj) {
      user.setDashboardType();
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    // Ensure all necessary fields are included in the response
    const userResponse = {
      ...userWithoutPassword,
      managerId: user.managerId,
      hrId: user.hrId,
      teamLeadId: user.teamLeadId,
      department: user.department,
      position: user.position,
      dashboardType: user.dashboardType,
      roleObj: user.roleObj,
    };

    return h
      .response({
        user: userResponse,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in getProfile: ${error}`);
    return h
      .response({
        message: "An error occurred while fetching the user profile",
      })
      .code(500);
  }
};

export const updateProfile = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized in updateProfile");
    }

    const userId = request.auth.credentials.id;
    const { firstName, lastName, phoneNumber, address } =
      request.payload as any;

    // Find user by ID
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: userId as string },
    });

    if (!user) {
      return h.response({ message: "User not found" }).code(404);
    }

    // Update user fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (address) user.address = address;

    // Save updated user
    const updatedUser = await userRepository.save(user);

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;

    return h
      .response({
        message: "Profile updated successfully",
        user: userWithoutPassword,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in updateProfile: ${error}`);
    return h
      .response({
        message: "An error occurred while updating the user profile",
      })
      .code(500);
  }
};

export const changePassword = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized in changePassword");
    }

    const userId = request.auth.credentials.id;
    const { currentPassword, newPassword } = request.payload as any;

    // Validate input
    if (!currentPassword || !newPassword) {
      return h
        .response({ message: "Current password and new password are required" })
        .code(400);
    }

    if (!validatePassword(newPassword)) {
      return h
        .response({
          message:
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
        })
        .code(400);
    }

    // Find user by ID
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: userId as string },
    });

    if (!user) {
      return h.response({ message: "User not found" }).code(404);
    }

    // Verify current password
    const isPasswordValid = await comparePassword(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return h.response({ message: "Current password is incorrect" }).code(401);
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password
    user.password = hashedPassword;
    await userRepository.save(user);

    return h
      .response({
        message: "Password changed successfully",
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in changePassword: ${error}`);
    return h
      .response({ message: "An error occurred while changing the password" })
      .code(500);
  }
};
