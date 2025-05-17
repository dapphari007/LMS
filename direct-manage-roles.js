/**
 * Simple script to manage roles directly from the command line
 * 
 * Usage:
 *   node direct-manage-roles.js show                    # Show all roles
 *   node direct-manage-roles.js create NAME DESC PERMS  # Create a role
 * 
 * Example:
 *   node direct-manage-roles.js create "Project Manager" "Manages projects" '{"projects":{"create":true,"read":true,"update":true,"delete":false}}'
 */

const { Client } = require('pg');
require('dotenv').config({ path: './server/.env' });

// Get command line arguments
const args = process.argv.slice(2);

// Database connection
const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'leave_management',
});

// Function to show all roles
async function showRoles() {
  try {
    await client.connect();
    console.log("Database connected successfully");

    // Get all roles
    const result = await client.query(`
      SELECT * FROM roles
      ORDER BY "isSystem" DESC, name ASC
    `);

    const roles = result.rows;

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

    await client.end();
    console.log("Database connection closed");
    
    return roles;
  } catch (error) {
    console.error("Error showing roles:", error);
    try {
      await client.end();
    } catch (e) {
      // Ignore error on disconnect
    }
    throw error;
  }
}

// Function to create a custom role
async function createCustomRole(roleName, description, permissions) {
  try {
    await client.connect();
    console.log("Database connected successfully");

    // Check if role already exists
    const checkResult = await client.query(
      'SELECT * FROM roles WHERE name = $1',
      [roleName]
    );
    
    if (checkResult.rows.length > 0) {
      console.log(`Role '${roleName}' already exists.`);
      
      // Show all roles
      await client.end();
      await showRoles();
      return;
    }

    // Create new role
    const permissionsStr = permissions ? JSON.stringify(permissions) : null;
    const now = new Date();
    
    await client.query(
      `INSERT INTO roles (name, description, permissions, "isActive", "isSystem", "createdAt", "updatedAt") 
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [roleName, description, permissionsStr, true, false, now, now]
    );
    
    console.log(`Role '${roleName}' created successfully.`);

    // Close connection before showing roles
    await client.end();
    
    // Show all roles after creation
    await showRoles();
  } catch (error) {
    console.error("Error creating custom role:", error);
    try {
      await client.end();
    } catch (e) {
      // Ignore error on disconnect
    }
    throw error;
  }
}

// Process commands
async function main() {
  try {
    if (args.length === 0 || args[0] === 'help') {
      console.log("Usage:");
      console.log("  node direct-manage-roles.js show                    # Show all roles");
      console.log("  node direct-manage-roles.js create NAME DESC PERMS  # Create a role");
      console.log("Example:");
      console.log('  node direct-manage-roles.js create "Project Manager" "Manages projects" \'{"projects":{"create":true,"read":true,"update":true,"delete":false}}\'');
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
      console.log("Use 'node direct-manage-roles.js help' for usage information.");
      process.exit(1);
    }
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

// Run the script
main();