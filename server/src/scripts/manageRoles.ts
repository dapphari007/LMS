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

/**
 * Script to create a new role and display all roles
 * This can be run independently to manage roles
 */
export const createCustomRole = async (
  roleName: string,
  description: string,
  permissions: any,
  closeConnection = true
) => {
  try {
    // Initialize database if not already connected
    if (!AppDataSource.isInitialized) {
      await initializeDatabase();
      logger.info("Database connected successfully");
    }

    const roleRepository = AppDataSource.getRepository(Role);

    // Check if role already exists
    const existingRole = await roleRepository.findOne({ where: { name: roleName } });
    if (existingRole) {
      console.log(`Role '${roleName}' already exists.`);
      
      // Show all roles
      await showRoles(closeConnection);
      return;
    }

    // Create new role
    const role = new Role();
    role.name = roleName;
    role.description = description;
    role.permissions = permissions ? JSON.stringify(permissions) : null;
    role.isActive = true;
    role.isSystem = false;

    // Save role to database
    const savedRole = await roleRepository.save(role);
    console.log(`Role '${roleName}' created successfully.`);

    // Show all roles
    await showRoles(closeConnection);
  } catch (error) {
    logger.error("Error creating custom role:", error);
    if (closeConnection && AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
    throw error;
  }
};

// Run the script if called directly
if (require.main === module) {
  // Check command line arguments
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--show') {
    // Just show roles if no arguments or --show flag
    showRoles()
      .then(() => {
        process.exit(0);
      })
      .catch((error) => {
        console.error("Error:", error);
        process.exit(1);
      });
  } else if (args[0] === '--create' && args.length >= 3) {
    // Create a role if --create flag and required arguments
    const roleName = args[1];
    const description = args[2];
    
    // Parse permissions if provided
    let permissions = null;
    if (args.length >= 4) {
      try {
        permissions = JSON.parse(args[3]);
      } catch (e) {
        console.error("Error parsing permissions JSON:", e);
        process.exit(1);
      }
    }
    
    createCustomRole(roleName, description, permissions)
      .then(() => {
        process.exit(0);
      })
      .catch((error) => {
        console.error("Error:", error);
        process.exit(1);
      });
  } else {
    console.log("Usage:");
    console.log("  node manageRoles.js --show                    # Show all roles");
    console.log("  node manageRoles.js --create NAME DESC PERMS  # Create a role");
    console.log("Example:");
    console.log('  node manageRoles.js --create "Project Manager" "Manages projects" \'{"projects":{"create":true,"read":true,"update":true,"delete":false}}\'');
    process.exit(1);
  }
}