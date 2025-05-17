import { AppDataSource } from "../config/database";
import { Role } from "../models/Role";
import { UserRole } from "../models/User";
import logger from "../utils/logger";
import "../models"; // Import all models to ensure they're registered

/**
 * Script to clean up duplicate roles and ensure consistency
 */
export const cleanupRoles = async (closeConnection = true) => {
  try {
    // Initialize database connection if not already initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const roleRepository = AppDataSource.getRepository(Role);

    // Get all roles
    const allRoles = await roleRepository.find();
    logger.info(`Found ${allRoles.length} roles in the database`);

    // Define the standard roles based on UserRole enum
    const standardRoleNames = Object.values(UserRole) as string[];
    
    // Find duplicate roles (title case versions of the standard roles)
    const duplicateRoles = allRoles.filter(role => {
      // Check if this is a title case version of a standard role
      const lowercaseName = role.name.toLowerCase();
      return !standardRoleNames.includes(role.name) && 
             standardRoleNames.some(stdRole => stdRole.toLowerCase() === lowercaseName);
    });

    logger.info(`Found ${duplicateRoles.length} duplicate roles to remove`);

    // Delete duplicate roles
    if (duplicateRoles.length > 0) {
      for (const role of duplicateRoles) {
        logger.info(`Removing duplicate role: ${role.name}`);
        await roleRepository.remove(role);
      }
      logger.info('Duplicate roles removed successfully');
    }

    // Update display names for standard roles to be more user-friendly
    const standardRoles = await roleRepository.find({
      where: standardRoleNames.map(name => ({ name }))
    });

    for (const role of standardRoles) {
      // Create a user-friendly display name
      let displayName = role.name;
      
      // Update description to include display name
      if (!role.description || !role.description.includes("Display Name:")) {
        // Format the display name (e.g., "super_admin" -> "Super Admin")
        displayName = role.name
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
          
        role.description = `Display Name: ${displayName}\n${role.description || ''}`;
        logger.info(`Updating role ${role.name} with display name: ${displayName}`);
        await roleRepository.save(role);
      }
    }

    logger.info('Role cleanup completed successfully');

    if (closeConnection) {
      await AppDataSource.destroy();
    }
  } catch (error) {
    logger.error(`Error cleaning up roles: ${error}`);
    if (closeConnection) {
      await AppDataSource.destroy();
    }
    throw error;
  }
};

// Run the script if executed directly
if (require.main === module) {
  cleanupRoles()
    .then(() => {
      logger.info('Role cleanup script completed');
      process.exit(0);
    })
    .catch((error) => {
      logger.error(`Role cleanup script failed: ${error}`);
      process.exit(1);
    });
}