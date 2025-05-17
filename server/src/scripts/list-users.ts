import { AppDataSource } from "../config/database";
import { User } from "../models";
import logger from "../utils/logger";

/**
 * Script to list all users in the database
 */
const listUsers = async () => {
  try {
    // Initialize the connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Connected to database");
    }

    const userRepository = AppDataSource.getRepository(User);

    // Get all users
    const users = await userRepository.find();

    if (users.length > 0) {
      logger.info(`Found ${users.length} users:`);
      
      users.forEach((user, index) => {
        logger.info(`\nUser ${index + 1}:`);
        logger.info(`ID: ${user.id}`);
        logger.info(`Name: ${user.firstName} ${user.lastName}`);
        logger.info(`Email: ${user.email}`);
        logger.info(`Role: ${user.role}`);
        logger.info(`Department: ${user.department || 'Not set'}`);
        logger.info(`Position: ${user.position || 'Not set'}`);
        logger.info(`Active: ${user.isActive}`);
      });
      
      logger.info("\nLogin credentials for all users:");
      logger.info("- Super Admin (admin@example.com): Admin@123");
      logger.info("- Test User (test@example.com): Test@123");
      logger.info("- All other users: Password is based on role (e.g., Employee@123, Manager@123, HR@123)");
    } else {
      logger.info("No users found in the database.");
    }
  } catch (error: any) {
    logger.error(`Error listing users: ${error.message}`);
  } finally {
    // Close the connection
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      logger.info("Connection closed");
    }
    process.exit(0);
  }
};

// Run the script
listUsers();