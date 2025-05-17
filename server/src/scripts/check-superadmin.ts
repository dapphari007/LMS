import { AppDataSource } from "../config/database";
import { User } from "../models";
import logger from "../utils/logger";

/**
 * Script to check if the superadmin exists and display its credentials
 */
async function checkSuperAdmin() {
  try {
    // Initialize database connection
    await AppDataSource.initialize();
    logger.info("Connected to database");

    // Get the User repository
    const userRepository = AppDataSource.getRepository(User);

    // Find super admin by email
    const superAdmin = await userRepository.findOne({
      where: { email: "admin@example.com" },
    });

    if (!superAdmin) {
      logger.info(
        "Super admin not found. Please run the reset-superadmin script."
      );
    } else {
      logger.info("Super admin found:");
      logger.info(`Super admin ID: ${superAdmin.id}`);
      logger.info(`Super admin email: admin@example.com`);
      logger.info(`Super admin is active: ${superAdmin.isActive}`);
      logger.info(`Super admin role: ${superAdmin.role}`);
      logger.info(
        "Password: Admin@123 (if reset by the ensure-superadmin script)"
      );
    }

    // Close connection
    await AppDataSource.destroy();
    logger.info("Connection closed");
  } catch (error) {
    logger.error("Error checking super admin:", error);
  }
}

// Run the function
checkSuperAdmin();
