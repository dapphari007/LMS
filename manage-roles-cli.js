/**
 * Simple script to manage roles from the command line
 * 
 * Usage:
 *   node manage-roles-cli.js show                    # Show all roles
 *   node manage-roles-cli.js create NAME DESC PERMS  # Create a role
 * 
 * Example:
 *   node manage-roles-cli.js create "Project Manager" "Manages projects" '{"projects":{"create":true,"read":true,"update":true,"delete":false}}'
 */

// Import required modules
require('ts-node/register');
const { AppDataSource, initializeDatabase } = require('./server/src/config/database');
const { Role } = require('./server/src/models');

// Get command line arguments
const args = process.argv.slice(2);

// Function to show all roles
async function showRoles() {
  try {
    // Initialize database if not already connected
    if (!AppDataSource.isInitialized) {
      await initializeDatabase();
      console.log("Database connected successfully");
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

    await AppDataSource.destroy();
    console.log("Database connection closed");
    
    return roles;
  } catch (error) {
    console.error("Error showing roles:", error);
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
    throw error;
  }
}

// Function to create a custom role
async function createCustomRole(roleName, description, permissions) {
  try {
    // Initialize database if not already connected
    if (!AppDataSource.isInitialized) {
      await initializeDatabase();
      console.log("Database connected successfully");
    }

    const roleRepository = AppDataSource.getRepository(Role);

    // Check if role already exists
    const existingRole = await roleRepository.findOne({ where: { name: roleName } });
    if (existingRole) {
      console.log(`Role '${roleName}' already exists.`);
      
      // Show all roles
      await showRoles();
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

    // Show all roles after creation
    await showRoles();
  } catch (error) {
    console.error("Error creating custom role:", error);
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
    throw error;
  }
}

// Process commands
async function main() {
  try {
    if (args.length === 0 || args[0] === 'help') {
      console.log("Usage:");
      console.log("  node manage-roles-cli.js show                    # Show all roles");
      console.log("  node manage-roles-cli.js create NAME DESC PERMS  # Create a role");
      console.log("Example:");
      console.log('  node manage-roles-cli.js create "Project Manager" "Manages projects" \'{"projects":{"create":true,"read":true,"update":true,"delete":false}}\'');
      process.exit(0);
    } else if (args[0] === 'show') {
      // Show all roles
      await showRoles();
      process.exit(0);
    } else if (args[0] === 'create' && args.length >= 3) {
      // Create a role
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
      
      await createCustomRole(roleName, description, permissions);
      process.exit(0);
    } else {
      console.error("Invalid command or missing arguments.");
      console.log("Use 'node manage-roles-cli.js help' for usage information.");
      process.exit(1);
    }
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

// Run the script
main();