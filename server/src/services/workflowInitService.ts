import { AppDataSource } from "../config/database";
import { ApprovalWorkflow } from "../models";
import { UserRole } from "../models/User";
import logger from "../utils/logger";
import { DEFAULT_APPROVAL_WORKFLOWS } from "../controllers/approvalWorkflowController";

/**
 * Initialize default approval workflows if they don't exist
 */
export const initializeWorkflows = async (): Promise<void> => {
  try {
    logger.info("Initializing default approval workflows...");
    
    const workflowRepository = AppDataSource.getRepository(ApprovalWorkflow);
    
    // Check if workflows already exist
    let existingWorkflows: ApprovalWorkflow[] = [];
    try {
      existingWorkflows = await workflowRepository.find();
    } catch (findError) {
      logger.error(`Error finding existing workflows: ${findError}`);
      // If there's an error finding workflows, we'll assume there are none
      // and try to create them (which might fail if there's a schema issue)
    }
    
    if (existingWorkflows.length === 0) {
      // No workflows exist, create the default ones
      logger.info("No existing workflows found. Creating default workflows...");
      
      for (const workflowConfig of DEFAULT_APPROVAL_WORKFLOWS) {
        try {
          const workflow = new ApprovalWorkflow();
          workflow.name = workflowConfig.name;
          workflow.minDays = workflowConfig.minDays;
          workflow.maxDays = workflowConfig.maxDays;
          workflow.approvalLevels = workflowConfig.approvalLevels;
          workflow.isActive = true;
          
          await workflowRepository.save(workflow);
          logger.info(`Created workflow: ${workflowConfig.name}`);
        } catch (saveError) {
          logger.error(`Error creating workflow ${workflowConfig.name}: ${saveError}`);
          // Continue with the next workflow instead of failing completely
        }
      }
      
      logger.info("Default workflows creation process completed.");
    } else {
      // Workflows already exist, check if we need to update any
      logger.info(`Found ${existingWorkflows.length} existing workflows. Checking for updates...`);
      
      // Check if all default workflows exist by name
      for (const defaultWorkflow of DEFAULT_APPROVAL_WORKFLOWS) {
        try {
          const existingWorkflow = existingWorkflows.find(w => w.name === defaultWorkflow.name);
          
          if (!existingWorkflow) {
            // This default workflow doesn't exist, create it
            logger.info(`Creating missing workflow: ${defaultWorkflow.name}`);
            
            const workflow = new ApprovalWorkflow();
            workflow.name = defaultWorkflow.name;
            workflow.minDays = defaultWorkflow.minDays;
            workflow.maxDays = defaultWorkflow.maxDays;
            workflow.approvalLevels = defaultWorkflow.approvalLevels;
            workflow.isActive = true;
            
            await workflowRepository.save(workflow);
            logger.info(`Created missing workflow: ${defaultWorkflow.name}`);
          }
        } catch (updateError) {
          logger.error(`Error updating workflow ${defaultWorkflow.name}: ${updateError}`);
          // Continue with the next workflow instead of failing completely
        }
      }
    }
    
    logger.info("Workflow initialization completed.");
  } catch (error) {
    logger.error(`Error initializing workflows: ${error}`);
    // Don't throw the error, just log it, so the server can continue starting up
  }
};