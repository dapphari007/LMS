import { MigrationInterface, QueryRunner } from "typeorm";
import logger from "../utils/logger";

export class UpdateApprovalWorkflowSchema1715400000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // We don't need to modify the column structure since it's a JSONB column
    // We just need to update the data format
    
    try {
      // Check if the table exists
      const tableExists = await queryRunner.hasTable("approval_workflows");
      if (!tableExists) {
        logger.warn("Table approval_workflows does not exist yet. Skipping this migration.");
        return;
      }
      
      // Get all existing approval workflows
      const workflows = await queryRunner.query(`
        SELECT id, "approvalLevels" FROM approval_workflows
      `);
      
      // Update each workflow to include the new fields
      for (const workflow of workflows) {
        try {
          const approvalLevels = workflow.approvalLevels;
          
          // Skip if approvalLevels is null or not an array
          if (!approvalLevels || !Array.isArray(approvalLevels)) {
            logger.warn(`Workflow ${workflow.id} has invalid approvalLevels. Skipping.`);
            continue;
          }
          
          // Convert each level to the new format
          const updatedLevels = approvalLevels.map((level: any) => {
            let approverType = "";
            
            // Determine approverType based on roles
            if (level.roles && Array.isArray(level.roles)) {
              if (level.roles.includes("team_lead")) {
                approverType = "teamLead";
              } else if (level.roles.includes("manager")) {
                approverType = "manager";
              } else if (level.roles.includes("hr")) {
                approverType = "hr";
              } else if (level.roles.includes("super_admin")) {
                approverType = "superAdmin";
              }
            } else {
              // Default to the level number if roles is not available
              approverType = level.level === 1 ? "teamLead" : 
                            level.level === 2 ? "manager" : 
                            level.level === 3 ? "hr" : "superAdmin";
            }
            
            return {
              level: level.level,
              roles: level.roles || [], // Keep for backward compatibility
              approverType,
              fallbackRoles: level.roles || []
            };
          });
          
          // Update the workflow with the new format
          await queryRunner.query(`
            UPDATE approval_workflows
            SET "approvalLevels" = $1
            WHERE id = $2
          `, [JSON.stringify(updatedLevels), workflow.id]);
          
          logger.info(`Successfully updated workflow ${workflow.id}`);
        } catch (error) {
          logger.error(`Error updating workflow ${workflow.id}:`, error);
        }
      }
    } catch (error) {
      logger.error("Error in UpdateApprovalWorkflowSchema migration:", error);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      // Check if the table exists
      const tableExists = await queryRunner.hasTable("approval_workflows");
      if (!tableExists) {
        logger.warn("Table approval_workflows does not exist yet. Skipping this migration rollback.");
        return;
      }
      
      // Get all existing approval workflows
      const workflows = await queryRunner.query(`
        SELECT id, "approvalLevels" FROM approval_workflows
      `);
      
      // Revert each workflow to the old format
      for (const workflow of workflows) {
        try {
          const approvalLevels = workflow.approvalLevels;
          
          // Skip if approvalLevels is null or not an array
          if (!approvalLevels || !Array.isArray(approvalLevels)) {
            logger.warn(`Workflow ${workflow.id} has invalid approvalLevels. Skipping rollback.`);
            continue;
          }
          
          // Convert each level back to the old format
          const revertedLevels = approvalLevels.map((level: any) => {
            return {
              level: level.level,
              roles: level.roles || level.fallbackRoles || []
            };
          });
          
          // Update the workflow with the old format
          await queryRunner.query(`
            UPDATE approval_workflows
            SET "approvalLevels" = $1
            WHERE id = $2
          `, [JSON.stringify(revertedLevels), workflow.id]);
          
          logger.info(`Successfully reverted workflow ${workflow.id}`);
        } catch (error) {
          logger.error(`Error reverting workflow ${workflow.id}:`, error);
        }
      }
    } catch (error) {
      logger.error("Error in UpdateApprovalWorkflowSchema rollback:", error);
    }
  }
}