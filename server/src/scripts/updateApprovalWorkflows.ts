import { AppDataSource } from "../config/database";
import { ApprovalWorkflow, UserRole } from "../models";
import logger from "../utils/logger";
import { DEFAULT_APPROVAL_WORKFLOWS } from "../controllers/approvalWorkflowController";

/**
 * Script to update approval workflows to the new format
 */
const updateApprovalWorkflows = async () => {
  try {
    // Initialize the connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connected successfully");
    }

    const approvalWorkflowRepository = AppDataSource.getRepository(ApprovalWorkflow);
    
    // Get all existing approval workflows
    const existingWorkflows = await approvalWorkflowRepository.find();
    
    logger.info(`Found ${existingWorkflows.length} existing approval workflows`);
    
    // Update each workflow to the new format
    for (const workflow of existingWorkflows) {
      // Find the matching default workflow
      const matchingDefault = DEFAULT_APPROVAL_WORKFLOWS.find(
        (defaultWorkflow) => defaultWorkflow.name === workflow.name
      );
      
      if (matchingDefault) {
        logger.info(`Updating workflow: ${workflow.name}`);
        
        // Convert existing approval levels to the new format
        const updatedLevels = workflow.approvalLevels.map((level: any) => {
          // Map the old roles to the new format
          let approverType = "";
          if (level.roles.includes(UserRole.TEAM_LEAD)) {
            approverType = "teamLead";
          } else if (level.roles.includes(UserRole.MANAGER)) {
            approverType = "manager";
          } else if (level.roles.includes(UserRole.HR)) {
            approverType = "hr";
          } else if (level.roles.includes(UserRole.SUPER_ADMIN)) {
            approverType = "superAdmin";
          }
          
          return {
            level: level.level,
            approverType,
            fallbackRoles: level.roles,
            roles: level.roles // Keep the old roles for backward compatibility
          };
        });
        
        workflow.approvalLevels = updatedLevels;
        
        // Save the updated workflow
        await approvalWorkflowRepository.save(workflow);
        
        logger.info(`Updated workflow: ${workflow.name}`);
      } else {
        logger.warn(`No matching default workflow found for: ${workflow.name}`);
      }
    }
    
    logger.info("Approval workflows updated successfully");
    
    // Close the connection
    await AppDataSource.destroy();
    process.exit(0);
  } catch (error) {
    logger.error("Error updating approval workflows:", error);
    process.exit(1);
  }
};

// Run the script
updateApprovalWorkflows();