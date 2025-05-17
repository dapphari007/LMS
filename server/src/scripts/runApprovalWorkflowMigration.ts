import { AppDataSource } from "../config/database";
import logger from "../utils/logger";

/**
 * Script to manually run the approval workflow migration
 */
const runApprovalWorkflowMigration = async () => {
  try {
    // Initialize the connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connected successfully");
    }

    // Get all existing approval workflows
    const workflows = await AppDataSource.query(`
      SELECT id, "approvalLevels" FROM approval_workflows
    `);
    
    logger.info(`Found ${workflows.length} approval workflows`);
    
    // Update each workflow to include the new fields
    for (const workflow of workflows) {
      try {
        const approvalLevels = workflow.approvalLevels;
        
        // Convert each level to the new format
        const updatedLevels = approvalLevels.map((level: any) => {
          let approverType = "";
          let roles = level.roles || [];
          
          // Handle string roles
          if (typeof roles === 'string') {
            try {
              roles = JSON.parse(roles);
            } catch (e) {
              roles = [roles];
            }
          }
          
          // If roles is still not an array, make it one
          if (!Array.isArray(roles)) {
            roles = [roles];
          }
          
          // Determine approverType based on roles
          if (roles.includes("team_lead")) {
            approverType = "teamLead";
          } else if (roles.includes("manager")) {
            approverType = "manager";
          } else if (roles.includes("hr")) {
            approverType = "hr";
          } else if (roles.includes("super_admin")) {
            approverType = "superAdmin";
          }
          
          return {
            level: level.level,
            roles: roles, // Keep for backward compatibility
            approverType,
            fallbackRoles: roles
          };
        });
        
        // Update the workflow with the new format
        await AppDataSource.query(`
          UPDATE approval_workflows
          SET "approvalLevels" = $1
          WHERE id = $2
        `, [JSON.stringify(updatedLevels), workflow.id]);
        
        logger.info(`Updated workflow ${workflow.id}`);
      } catch (error) {
        logger.error(`Error updating workflow ${workflow.id}:`, error);
      }
    }
    
    logger.info("Migration completed successfully");
    
    // Close the connection
    await AppDataSource.destroy();
    process.exit(0);
  } catch (error) {
    logger.error("Error running migration:", error);
    process.exit(1);
  }
};

// Run the script
runApprovalWorkflowMigration();