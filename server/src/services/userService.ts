import { AppDataSource } from '../config/database';
import { User, UserRole } from '../models';
import { hashPassword } from '../utils/auth';
import logger from '../utils/logger';

/**
 * Create a new user
 */
export const createUser = async (userData: Partial<User>): Promise<User> => {
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
    logger.error(`Error in createUser service: ${error}`);
    throw error;
  }
};

/**
 * Get all users with optional filters
 */
export const getAllUsers = async (filters: { role?: UserRole; isActive?: boolean } = {}): Promise<User[]> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    
    // Build query
    const query: any = {};
    
    if (filters.role) {
      query.role = filters.role;
    }
    
    if (filters.isActive !== undefined) {
      query.isActive = filters.isActive;
    }
    
    // Get users
    const users = await userRepository.find({
      where: query,
      relations: ['manager'],
      order: {
        firstName: 'ASC',
        lastName: 'ASC',
      },
    });
    
    // Remove passwords from response
    return users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword as User;
    });
  } catch (error) {
    logger.error(`Error in getAllUsers service: ${error}`);
    throw error;
  }
};

/**
 * Get user by ID
 */
export const getUserById = async (userId: string): Promise<Partial<User>> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    
    // Find user by ID
    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ['manager'],
    });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Return user data (excluding password)
    const { password, ...userWithoutPassword } = user;
    
    return userWithoutPassword;
  } catch (error) {
    logger.error(`Error in getUserById service: ${error}`);
    throw error;
  }
};

/**
 * Update user
 */
export const updateUser = async (userId: string, userData: Partial<User>): Promise<Partial<User>> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    
    // Find user by ID
    const user = await userRepository.findOne({
      where: { id: userId },
    });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // If email is being updated, check if it's already in use
    if (userData.email && userData.email !== user.email) {
      const existingUser = await userRepository.findOne({
        where: { email: userData.email },
      });
      
      if (existingUser) {
        throw new Error('Email is already in use');
      }
    }
    
    // Update user data
    userRepository.merge(user, userData);
    
    // Save updated user
    const updatedUser = await userRepository.save(user);
    
    // Return updated user data (excluding password)
    const { password, ...userWithoutPassword } = updatedUser;
    
    return userWithoutPassword;
  } catch (error) {
    logger.error(`Error in updateUser service: ${error}`);
    throw error;
  }
};

/**
 * Delete user
 */
export const deleteUser = async (userId: string): Promise<void> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    
    // Find user by ID
    const user = await userRepository.findOne({
      where: { id: userId },
    });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Delete user
    await userRepository.remove(user);
  } catch (error) {
    logger.error(`Error in deleteUser service: ${error}`);
    throw error;
  }
};

/**
 * Get users by manager ID
 */
export const getUsersByManagerId = async (managerId: string): Promise<User[]> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    
    // Get users by manager ID
    const users = await userRepository.find({
      where: { managerId },
      order: {
        firstName: 'ASC',
        lastName: 'ASC',
      },
    });
    
    // Remove passwords from response
    return users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword as User;
    });
  } catch (error) {
    logger.error(`Error in getUsersByManagerId service: ${error}`);
    throw error;
  }
};