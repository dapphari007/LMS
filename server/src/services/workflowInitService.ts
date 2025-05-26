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
      // Workflows already exist, only create missing default workflows
      // DO NOT update existing ones to preserve custom changes
      logger.info(`Found ${existingWorkflows.length} existing workflows. Only adding missing defaults...`);
      
      // Get the names of existing workflows
      const existingWorkflowNames = existingWorkflows.map(w => w.name);
      
      // Only create default workflows that don't exist yet
      for (const defaultWorkflow of DEFAULT_APPROVAL_WORKFLOWS) {
        try {
          // Check if this default workflow already exists by name
          if (!existingWorkflowNames.includes(defaultWorkflow.name)) {
            // This default workflow doesn't exist, create it
            logger.info(`Creating missing default workflow: ${defaultWorkflow.name}`);
            
            const workflow = new ApprovalWorkflow();
            workflow.name = defaultWorkflow.name;
            workflow.minDays = defaultWorkflow.minDays;
            workflow.maxDays = defaultWorkflow.maxDays;
            workflow.approvalLevels = defaultWorkflow.approvalLevels;
            workflow.isActive = true;
            
            await workflowRepository.save(workflow);
            logger.info(`Created missing default workflow: ${defaultWorkflow.name}`);
          } else {
            logger.info(`Preserving existing workflow: ${defaultWorkflow.name}`);
          }
        } catch (updateError) {
          logger.error(`Error creating workflow ${defaultWorkflow.name}: ${updateError}`);
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