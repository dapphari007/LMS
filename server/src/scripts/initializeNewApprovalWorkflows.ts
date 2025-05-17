import { AppDataSource } from "../config/database";
import { ApprovalWorkflow, UserRole } from "../models";
import logger from "../utils/logger";
import { DEFAULT_APPROVAL_WORKFLOWS } from "../controllers/approvalWorkflowController";

/**
 * Script to initialize approval workflows with the new format
 */
const initializeNewApprovalWorkflows = async () => {
  try {
    // Initialize the connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connected successfully");
    }

    const approvalWorkflowRepository = AppDataSource.getRepository(ApprovalWorkflow);
    
    // Delete existing workflows
    await approvalWorkflowRepository.delete({});
    logger.info("Deleted existing approval workflows");
    
    // Create new workflows
    for (const workflowData of DEFAULT_APPROVAL_WORKFLOWS) {
      const workflow = new ApprovalWorkflow();
      workflow.name = workflowData.name;
      workflow.minDays = workflowData.minDays;
      workflow.maxDays = workflowData.maxDays;
      workflow.approvalLevels = workflowData.approvalLevels;
      workflow.isActive = true;
      
      await approvalWorkflowRepository.save(workflow);
      logger.info(`Created workflow: ${workflow.name}`);
    }
    
    logger.info("New approval workflows initialized successfully");
    
    // Close the connection
    await AppDataSource.destroy();
    process.exit(0);
  } catch (error) {
    logger.error("Error initializing approval workflows:", error);
    process.exit(1);
  }
};

// Run the script
initializeNewApprovalWorkflows();