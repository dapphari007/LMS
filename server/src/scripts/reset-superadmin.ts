import { AppDataSource } from "../config/database";
import { User, UserRole, UserLevel, Gender } from "../models";
import { hashPassword } from "../utils/auth";
import logger from "../utils/logger";

/**
 * Script to reset the super admin user
 */
const resetSuperAdmin = async () => {
  try {
    // Initialize the connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connected successfully");
    }

    const userRepository = AppDataSource.getRepository(User);

    // Check if super admin exists
    let superAdmin = await userRepository.findOne({
      where: { email: "admin@example.com" },
    });

    if (superAdmin) {
      // Update the super admin password
      superAdmin.password = await hashPassword("Admin@123");
      await userRepository.save(superAdmin);
      logger.info("Super admin password reset successfully");
    } else {
      // Create a new super admin
      superAdmin = new User();
      superAdmin.firstName = "Super";
      superAdmin.lastName = "Admin";
      superAdmin.email = "admin@example.com";
      superAdmin.password = await hashPassword("Admin@123");
      superAdmin.role = UserRole.SUPER_ADMIN;
      superAdmin.level = UserLevel.LEVEL_4;
      superAdmin.gender = Gender.MALE;
      superAdmin.isActive = true;

      await userRepository.save(superAdmin);
      logger.info("Super admin created successfully");
    }

    logger.info("Super admin details:");
    logger.info(`Email: admin@example.com`);
    logger.info(`Password: Admin@123`);
  } catch (error: any) {
    logger.error(`Error resetting super admin: ${error.message}`);
  } finally {
    // Close the connection
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      logger.info("Database connection closed");
    }
    process.exit(0);
  }
};

// Run the script
resetSuperAdmin();