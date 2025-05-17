import { AppDataSource } from "../config/database";
import { User } from "../models";
import logger from "../utils/logger";

/**
 * Script to check if the test user exists
 */
const checkTestUser = async () => {
  try {
    // Initialize the connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Connected to database");
    }

    const userRepository = AppDataSource.getRepository(User);

    // Check if test user exists
    const testUser = await userRepository.findOne({
      where: { email: "test@example.com" },
    });

    if (testUser) {
      logger.info("Test user found:");
      logger.info(`ID: ${testUser.id}`);
      logger.info(`Email: test@example.com`);
      logger.info(`Password: Test@123 (if created by the createTestUser script)`);
      logger.info(`Role: ${testUser.role}`);
      logger.info(`Active: ${testUser.isActive}`);
    } else {
      logger.info("Test user not found. Please run the createTestUser script.");
    }
  } catch (error: any) {
    logger.error(`Error checking test user: ${error.message}`);
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
checkTestUser();