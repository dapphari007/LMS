/**
 * Script to check the current status of essential data (roles and approval workflows)
 * 
 * Usage:
 *   node check-essential-data.js
 */

// Import required modules
require('ts-node/register');
const { AppDataSource } = require('./server/src/config/database');
const { Role, ApprovalWorkflow } = require('./server/src/models');

async function main() {
  try {
    console.log("Checking essential data in the database...");
    
    // Initialize database connection
    if (!AppDataSource.isInitialized) {
      console.log("Initializing database connection...");
      await AppDataSource.initialize();
      console.log("Database connection established");
    }
    
    // Check roles
    console.log("\n=== CHECKING ROLES ===");
    try {
      const roleRepository = AppDataSource.getRepository(Role);
      const roles = await roleRepository.find({
        order: {
          isSystem: "DESC",
          name: "ASC"
        }
      });
      
      if (roles.length === 0) {
        console.log("No roles found in the database.");
      } else {
        console.log(`Found ${roles.length} roles:`);
        roles.forEach((role, index) => {
          console.log(`${index + 1}. ${role.name} ${role.isSystem ? '(System)' : ''}`);
        });
      }
    } catch (error) {
      console.error("Error checking roles:", error);
    }
    
    // Check approval workflows
    console.log("\n=== CHECKING APPROVAL WORKFLOWS ===");
    try {
      const workflowRepository = AppDataSource.getRepository(ApprovalWorkflow);
      const workflows = await workflowRepository.find({
        order: {
          minDays: "ASC"
        }
      });
      
      if (workflows.length === 0) {
        console.log("No approval workflows found in the database.");
      } else {
        console.log(`Found ${workflows.length} approval workflows:`);
        workflows.forEach((workflow, index) => {
          console.log(`${index + 1}. ${workflow.name} (${workflow.minDays}-${workflow.maxDays} days)`);
        });
      }
    } catch (error) {
      console.error("Error checking approval workflows:", error);
    }
    
    // Close database connection
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log("\nDatabase connection closed");
    }
    
    process.exit(0);
  } catch (error) {
    console.error("Error during check:", error);
    
    // Ensure database connection is closed
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
    
    process.exit(1);
  }
}

// Run the script
main();