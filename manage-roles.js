/**
 * Simple script to manage roles from the command line
 * 
 * Usage:
 *   node manage-roles.js show                    # Show all roles
 *   node manage-roles.js create NAME DESC PERMS  # Create a role
 * 
 * Example:
 *   node manage-roles.js create "Project Manager" "Manages projects" '{"projects":{"create":true,"read":true,"update":true,"delete":false}}'
 */

// Import required modules
require('ts-node/register');
const { showRoles, createCustomRole } = require('./server/src/server');

// Get command line arguments
const args = process.argv.slice(2);

// Process commands
async function main() {
  try {
    if (args.length === 0 || args[0] === 'help') {
      console.log("Usage:");
      console.log("  node manage-roles.js show                    # Show all roles");
      console.log("  node manage-roles.js create NAME DESC PERMS  # Create a role");
      console.log("Example:");
      console.log('  node manage-roles.js create "Project Manager" "Manages projects" \'{"projects":{"create":true,"read":true,"update":true,"delete":false}}\'');
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
      console.log("Use 'node manage-roles.js help' for usage information.");
      process.exit(1);
    }
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

// Run the script
main();