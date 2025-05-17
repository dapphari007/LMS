import { AppDataSource, initializeDatabase } from "../config/database";
import { Role } from "../models/Role";
import logger from "../utils/logger";

/**
 * Script to display all roles in the database
 * This can be run independently to check the current roles
 */
export const showRoles = async (closeConnection = true) => {
  try {
    // Initialize database if not already connected
    if (!AppDataSource.isInitialized) {
      await initializeDatabase();
      logger.info("Database connected successfully");
    }

    const roleRepository = AppDataSource.getRepository(Role);
    
    // Get all roles
    const roles = await roleRepository.find({
      order: {
        isSystem: "DESC",
        name: "ASC"
      }
    });

    if (roles.length === 0) {
      console.log("No roles found in the database.");
    } else {
      console.log("\n=== ROLES IN DATABASE ===");
      console.log("Total roles:", roles.length);
      console.log("------------------------");
      
      roles.forEach((role, index) => {
        console.log(`${index + 1}. ${role.name} ${role.isSystem ? '(System)' : ''}`);
        console.log(`   ID: ${role.id}`);
        console.log(`   Description: ${role.description || 'N/A'}`);
        console.log(`   Active: ${role.isActive ? 'Yes' : 'No'}`);
        
        // Parse and display permissions in a readable format
        if (role.permissions) {
          try {
            const permissions = JSON.parse(role.permissions);
            console.log(`   Permissions: ${JSON.stringify(permissions, null, 2).substring(0, 100)}...`);
          } catch (e) {
            console.log(`   Permissions: ${role.permissions.substring(0, 100)}...`);
          }
        } else {
          console.log(`   Permissions: None`);
        }
        console.log("------------------------");
      });
    }

    if (closeConnection) {
      await AppDataSource.destroy();
      logger.info("Database connection closed");
    }
    
    return roles;
  } catch (error) {
    logger.error("Error showing roles:", error);
    if (closeConnection && AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
    throw error;
  }
};

// Run the script if called directly
if (require.main === module) {
  showRoles()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error("Error:", error);
      process.exit(1);
    });
}