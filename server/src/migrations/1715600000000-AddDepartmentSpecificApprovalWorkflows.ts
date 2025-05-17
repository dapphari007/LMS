import { MigrationInterface, QueryRunner } from "typeorm";
import logger from "../utils/logger";

export class AddDepartmentSpecificApprovalWorkflows1715600000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      // Check if the table exists
      const tableExists = await queryRunner.hasTable("approval_workflows");
      if (!tableExists) {
        logger.warn("Table approval_workflows does not exist yet. Skipping this migration.");
        return;
      }

      // Check if the minDays column exists
      const minDaysExists = await queryRunner.hasColumn("approval_workflows", "minDays");
      if (!minDaysExists) {
        logger.warn("Column minDays does not exist in approval_workflows table. Adding it first.");
        
        // Add the minDays column if it doesn't exist
        await queryRunner.query(`
          ALTER TABLE "approval_workflows" 
          ADD COLUMN IF NOT EXISTS "minDays" FLOAT
        `);
      }

      // Check if the maxDays column exists
      const maxDaysExists = await queryRunner.hasColumn("approval_workflows", "maxDays");
      if (!maxDaysExists) {
        logger.warn("Column maxDays does not exist in approval_workflows table. Adding it first.");
        
        // Add the maxDays column if it doesn't exist
        await queryRunner.query(`
          ALTER TABLE "approval_workflows" 
          ADD COLUMN IF NOT EXISTS "maxDays" FLOAT
        `);
      }

      // Check if the approvalLevels column exists
      const approvalLevelsExists = await queryRunner.hasColumn("approval_workflows", "approvalLevels");
      if (!approvalLevelsExists) {
        logger.warn("Column approvalLevels does not exist in approval_workflows table. Adding it first.");
        
        // Add the approvalLevels column if it doesn't exist
        await queryRunner.query(`
          ALTER TABLE "approval_workflows" 
          ADD COLUMN IF NOT EXISTS "approvalLevels" JSONB DEFAULT '[]'::jsonb
        `);
      }

      // Check if the workflow already exists
      const existingWorkflow = await queryRunner.query(`
        SELECT id FROM approval_workflows
        WHERE name = 'Department-Based Approval Workflow'
      `);

      if (existingWorkflow.length > 0) {
        logger.info("Department-Based Approval Workflow already exists. Skipping creation.");
      } else {
        // Create a new department-specific approval workflow
        await queryRunner.query(`
          INSERT INTO approval_workflows (
            id, 
            name, 
            "minDays", 
            "maxDays", 
            "approvalLevels", 
            "isActive", 
            "createdAt", 
            "updatedAt"
          ) 
          VALUES (
            uuid_generate_v4(), 
            'Department-Based Approval Workflow', 
            1, 
            30, 
            '[
              {
                "level": 1,
                "approverType": "teamLead",
                "fallbackRoles": ["team_lead"]
              },
              {
                "level": 2,
                "approverType": "departmentHead",
                "fallbackRoles": ["manager"]
              },
              {
                "level": 3,
                "approverType": "hr",
                "fallbackRoles": ["hr"]
              }
            ]'::jsonb, 
            true, 
            NOW(), 
            NOW()
          )
        `);
        logger.info("Department-Based Approval Workflow created successfully.");
      }

      // Check if Standard Approval Workflow exists
      const standardWorkflow = await queryRunner.query(`
        SELECT id FROM approval_workflows
        WHERE name = 'Standard Approval Workflow'
      `);

      if (standardWorkflow.length > 0) {
        // Update existing approval workflows to include department-specific approvers
        await queryRunner.query(`
          UPDATE approval_workflows
          SET "approvalLevels" = jsonb_set(
            "approvalLevels",
            '{0}',
            jsonb_build_object(
              'level', ("approvalLevels"->0->>'level')::int,
              'approverType', 'teamLead',
              'fallbackRoles', ARRAY['team_lead']::text[]
            )::jsonb
          )
          WHERE name = 'Standard Approval Workflow'
        `);

        await queryRunner.query(`
          UPDATE approval_workflows
          SET "approvalLevels" = jsonb_set(
            "approvalLevels",
            '{1}',
            jsonb_build_object(
              'level', ("approvalLevels"->1->>'level')::int,
              'approverType', 'departmentHead',
              'fallbackRoles', ARRAY['manager']::text[]
            )::jsonb
          )
          WHERE name = 'Standard Approval Workflow' AND jsonb_array_length("approvalLevels") > 1
        `);
        logger.info("Standard Approval Workflow updated successfully.");
      } else {
        logger.info("Standard Approval Workflow does not exist. Skipping update.");
      }
    } catch (error) {
      logger.error("Error in AddDepartmentSpecificApprovalWorkflows migration:", error);
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      // Check if the table exists
      const tableExists = await queryRunner.hasTable("approval_workflows");
      if (!tableExists) {
        logger.warn("Table approval_workflows does not exist. Skipping rollback.");
        return;
      }

      // Remove the department-specific workflow
      await queryRunner.query(`
        DELETE FROM approval_workflows
        WHERE name = 'Department-Based Approval Workflow'
      `);
      logger.info("Department-Based Approval Workflow removed successfully.");

      // Check if Standard Approval Workflow exists
      const standardWorkflow = await queryRunner.query(`
        SELECT id FROM approval_workflows
        WHERE name = 'Standard Approval Workflow'
      `);

      if (standardWorkflow.length > 0) {
        // Revert changes to existing workflows
        await queryRunner.query(`
          UPDATE approval_workflows
          SET "approvalLevels" = jsonb_set(
            "approvalLevels",
            '{0}',
            jsonb_build_object(
              'level', ("approvalLevels"->0->>'level')::int,
              'roles', ARRAY['team_lead']::text[]
            )::jsonb
          )
          WHERE name = 'Standard Approval Workflow'
        `);

        await queryRunner.query(`
          UPDATE approval_workflows
          SET "approvalLevels" = jsonb_set(
            "approvalLevels",
            '{1}',
            jsonb_build_object(
              'level', ("approvalLevels"->1->>'level')::int,
              'roles', ARRAY['manager']::text[]
            )::jsonb
          )
          WHERE name = 'Standard Approval Workflow' AND jsonb_array_length("approvalLevels") > 1
        `);
        logger.info("Standard Approval Workflow reverted successfully.");
      } else {
        logger.info("Standard Approval Workflow does not exist. Skipping revert.");
      }
    } catch (error) {
      logger.error("Error in AddDepartmentSpecificApprovalWorkflows rollback:", error);
      throw error;
    }
  }
}