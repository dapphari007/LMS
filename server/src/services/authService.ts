import { AppDataSource } from '../config/database';
import { User } from '../models';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';
import logger from '../utils/logger';

/**
 * Register a new user
 */
export const registerUser = async (userData: Partial<User>): Promise<User> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    
    // Check if user with email already exists
    const existingUser = await userRepository.findOne({
      where: { email: userData.email },
    });
    
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Hash password
    if (userData.password) {
      userData.password = await hashPassword(userData.password);
    }
    
    // Create new user
    const user = userRepository.create(userData);
    return await userRepository.save(user);
  } catch (error) {
    logger.error(`Error in registerUser service: ${error}`);
    throw error;
  }
};

/**
 * Authenticate user and generate token
 */
export const loginUser = async (email: string, password: string): Promise<{ user: Partial<User>; token: string }> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    
    // Find user by email with role information
    const user = await userRepository.findOne({
      where: { email },
      relations: ['roleObj'],
    });
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Check if user is active
    if (!user.isActive) {
      throw new Error('User account is inactive');
    }
    
    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);
    
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }
    
    // Generate JWT token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      level: user.level,
    });
    
    // Return user data (excluding password) and token
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      user: userWithoutPassword,
      token,
    };
  } catch (error) {
    logger.error(`Error in loginUser service: ${error}`);
    throw error;
  }
};

/**
 * Get user profile by ID
 */
export const getUserProfile = async (userId: string): Promise<Partial<User>> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    
    // Find user by ID with role information
    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ['manager', 'roleObj'],
    });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Return user data (excluding password)
    const { password, ...userWithoutPassword } = user;
    
    return userWithoutPassword;
  } catch (error) {
    logger.error(`Error in getUserProfile service: ${error}`);
    throw error;
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (userId: string, userData: Partial<User>): Promise<Partial<User>> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    
    // Find user by ID
    const user = await userRepository.findOne({
      where: { id: userId },
    });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Update user data
    userRepository.merge(user, userData);
    
    // Save updated user
    const updatedUser = await userRepository.save(user);
    
    // Return updated user data (excluding password)
    const { password, ...userWithoutPassword } = updatedUser;
    
    return userWithoutPassword;
  } catch (error) {
    logger.error(`Error in updateUserProfile service: ${error}`);
    throw error;
  }
};

/**
 * Change user password
 */
export const changeUserPassword = async (userId: string, currentPassword: string, newPassword: string): Promise<void> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    
    // Find user by ID
    const user = await userRepository.findOne({
      where: { id: userId },
    });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Verify current password
    const isPasswordValid = await comparePassword(currentPassword, user.password);
    
    if (!isPasswordValid) {
      throw new Error('Current password is incorrect');
    }
    
    // Hash new password
    const hashedPassword = await hashPassword(newPassword);
    
    // Update password
    user.password = hashedPassword;
    
    // Save updated user
    await userRepository.save(user);
  } catch (error) {
    logger.error(`Error in changeUserPassword service: ${error}`);
    throw error;
  }
};

/**
 * Reset user password (admin only)
 */
export const resetUserPassword = async (userId: string, newPassword: string): Promise<void> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    
    // Find user by ID
    const user = await userRepository.findOne({
      where: { id: userId },
    });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Hash new password
    const hashedPassword = await hashPassword(newPassword);
    
    // Update password
    user.password = hashedPassword;
    
    // Save updated user
    await userRepository.save(user);
  } catch (error) {
    logger.error(`Error in resetUserPassword service: ${error}`);
    throw error;
  }
};