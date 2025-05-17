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

    // Check if department-based workflow already exists
    const existingWorkflow = await approvalWorkflowRepository.findOne({
      where: { name: 'Department-Based Approval Workflow' }
    });

    if (!existingWorkflow) {
      logger.info('Creating department-based approval workflow...');
      
      // Create a new department-specific approval workflow
      const departmentWorkflow = new ApprovalWorkflow();
      departmentWorkflow.name = 'Department-Based Approval Workflow';
      departmentWorkflow.minDays = 1;
      departmentWorkflow.maxDays = 30;
      departmentWorkflow.isActive = true;
      departmentWorkflow.approvalLevels = [
        {
          level: 1,
          approverType: 'teamLead',
          fallbackRoles: [UserRole.TEAM_LEAD],
          departmentSpecific: true
        },
        {
          level: 2,
          approverType: 'departmentHead',
          fallbackRoles: [UserRole.MANAGER],
          departmentSpecific: true
        },
        {
          level: 3,
          approverType: 'hr',
          fallbackRoles: [UserRole.HR],
          departmentSpecific: true
        }
      ];

      await approvalWorkflowRepository.save(departmentWorkflow);
      logger.info('Department-based approval workflow created successfully');
    } else {
      logger.info('Department-based approval workflow already exists');
    }

    // Check if standard workflow exists
    const standardWorkflow = await approvalWorkflowRepository.findOne({
      where: { name: 'Standard Approval Workflow' }
    });

    if (standardWorkflow) {
      // Check if standard workflow needs to be updated with department-specific approvers
      let needsUpdate = false;
      
      // Check if the first level has approverType
      if (standardWorkflow.approvalLevels.length > 0 && 
          !standardWorkflow.approvalLevels[0].approverType) {
        needsUpdate = true;
      }

      if (needsUpdate) {
        logger.info('Updating standard approval workflow with department-specific approvers...');
        
        // Update the workflow with department-specific approvers
        const updatedLevels = standardWorkflow.approvalLevels.map((level, index) => {
          if (index === 0) {
            return {
              ...level,
              approverType: 'teamLead',
              fallbackRoles: [UserRole.TEAM_LEAD],
              departmentSpecific: true
            };
          } else if (index === 1) {
            return {
              ...level,
              approverType: 'departmentHead',
              fallbackRoles: [UserRole.MANAGER],
              departmentSpecific: true
            };
          } else if (index === 2) {
            return {
              ...level,
              approverType: 'hr',
              fallbackRoles: [UserRole.HR],
              departmentSpecific: true
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
      
      // Check if the first level has approverType
      if (extendedWorkflow.approvalLevels.length > 0 && 
          !extendedWorkflow.approvalLevels[0].approverType) {
        needsUpdate = true;
      }

      if (needsUpdate) {
        logger.info('Updating extended approval workflow with department-specific approvers...');
        
        // Update the workflow with department-specific approvers
        const updatedLevels = extendedWorkflow.approvalLevels.map((level, index) => {
          if (index === 0) {
            return {
              ...level,
              approverType: 'teamLead',
              fallbackRoles: [UserRole.TEAM_LEAD],
              departmentSpecific: true
            };
          } else if (index === 1) {
            return {
              ...level,
              approverType: 'departmentHead',
              fallbackRoles: [UserRole.MANAGER],
              departmentSpecific: true
            };
          } else if (index === 2) {
            return {
              ...level,
              approverType: 'hr',
              fallbackRoles: [UserRole.HR],
              departmentSpecific: true
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