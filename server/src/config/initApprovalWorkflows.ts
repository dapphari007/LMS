import { AppDataSource } from "./database";
import { ApprovalWorkflow } from "../models";
import { UserRole } from "../models/User";
import logger from "../utils/logger";

/**
 * Initialize department-specific approval workflows if they don't exist
 */
export const initApprovalWorkflows = async (): Promise<void> => {
  try {
    // Ensure database connection is established
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const approvalWorkflowRepository = AppDataSource.getRepository(ApprovalWorkflow);

    // Department-Based Approval Workflow creation has been removed
    logger.info('Department-Based Approval Workflow creation has been skipped');
    
    // Check if any workflows exist
    const existingWorkflowsCount = await approvalWorkflowRepository.count();
    
    if (existingWorkflowsCount === 0) {
      // No workflows exist, so there's nothing to update
      logger.info('No existing workflows found. Skipping workflow updates.');
      return;
    }
    
    // If we have workflows, we'll only check for updates, not create new ones
    logger.info(`Found ${existingWorkflowsCount} existing workflows. Only checking for updates.`);
    
    // We won't create any new workflows, only update existing ones if needed
    // Check if standard workflow exists
    const standardWorkflow = await approvalWorkflowRepository.findOne({
      where: { name: 'Standard Approval Workflow' }
    });

    if (standardWorkflow) {
      // Check if standard workflow needs to be updated with department-specific approvers
      let needsUpdate = false;
      
      // Check if the first level has roleIds
      if (standardWorkflow.approvalLevels.length > 0 && 
          (!standardWorkflow.approvalLevels[0].roleIds || standardWorkflow.approvalLevels[0].roleIds.length === 0)) {
        needsUpdate = true;
      }

      if (needsUpdate) {
        logger.info('Updating standard approval workflow with department-specific approvers...');
        
        // Update the workflow with department-specific approvers
        const updatedLevels = standardWorkflow.approvalLevels.map((level, index) => {
          if (index === 0) {
            return {
              ...level,
              roleIds: [], // Will be populated with actual role IDs when roles are created
              departmentSpecific: true,
              required: true
            };
          } else if (index === 1) {
            return {
              ...level,
              roleIds: [], // Will be populated with actual role IDs when roles are created
              departmentSpecific: true,
              required: true
            };
          } else if (index === 2) {
            return {
              ...level,
              roleIds: [], // Will be populated with actual role IDs when roles are created
              departmentSpecific: true,
              required: true
            };
          }
          return level;
        });

        standardWorkflow.approvalLevels = updatedLevels;
        await approvalWorkflowRepository.save(standardWorkflow);
        logger.info('Standard approval workflow updated successfully');
      } else {
        logger.info('Standard approval workflow already has department-specific approvers');
      }
    }

    // Check if extended workflow exists
    const extendedWorkflow = await approvalWorkflowRepository.findOne({
      where: { name: 'Extended Approval Workflow' }
    });

    if (extendedWorkflow) {
      // Check if extended workflow needs to be updated with department-specific approvers
      let needsUpdate = false;
      
      // Check if the first level has roleIds
      if (extendedWorkflow.approvalLevels.length > 0 && 
          (!extendedWorkflow.approvalLevels[0].roleIds || extendedWorkflow.approvalLevels[0].roleIds.length === 0)) {
        needsUpdate = true;
      }

      if (needsUpdate) {
        logger.info('Updating extended approval workflow with department-specific approvers...');
        
        // Update the workflow with department-specific approvers
        const updatedLevels = extendedWorkflow.approvalLevels.map((level, index) => {
          if (index === 0) {
            return {
              ...level,
              roleIds: [], // Will be populated with actual role IDs when roles are created
              departmentSpecific: true,
              required: true
            };
          } else if (index === 1) {
            return {
              ...level,
              roleIds: [], // Will be populated with actual role IDs when roles are created
              departmentSpecific: true,
              required: true
            };
          } else if (index === 2) {
            return {
              ...level,
              roleIds: [], // Will be populated with actual role IDs when roles are created
              departmentSpecific: true,
              required: true
            };
          }
          return level;
        });

        extendedWorkflow.approvalLevels = updatedLevels;
        await approvalWorkflowRepository.save(extendedWorkflow);
        logger.info('Extended approval workflow updated successfully');
      } else {
        logger.info('Extended approval workflow already has department-specific approvers');
      }
    }

    logger.info('Approval workflows initialization completed');
  } catch (error) {
    logger.error(`Error initializing approval workflows: ${error}`);
  }
};