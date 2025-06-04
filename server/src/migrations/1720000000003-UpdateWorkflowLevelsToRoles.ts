import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateWorkflowLevelsToRoles1720000000003 implements MigrationInterface {
    name = 'UpdateWorkflowLevelsToRoles1720000000003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Check if workflow_levels table exists
        const tableExists = await queryRunner.hasTable("workflow_levels");
        
        if (tableExists) {
            // Drop the old approver_type column if it exists
            const hasApproverTypeColumn = await queryRunner.hasColumn("workflow_levels", "approver_type");
            if (hasApproverTypeColumn) {
                await queryRunner.dropColumn("workflow_levels", "approver_type");
            }
            
            // Drop the old fallback_roles column if it exists
            const hasFallbackRolesColumn = await queryRunner.hasColumn("workflow_levels", "fallback_roles");
            if (hasFallbackRolesColumn) {
                await queryRunner.dropColumn("workflow_levels", "fallback_roles");
            }
            
            // Add the new role_ids column if it doesn't exist
            const hasRoleIdsColumn = await queryRunner.hasColumn("workflow_levels", "role_ids");
            if (!hasRoleIdsColumn) {
                await queryRunner.query(`
                    ALTER TABLE "workflow_levels" 
                    ADD COLUMN "role_ids" jsonb NOT NULL DEFAULT '[]'::jsonb
                `);
            }
            
            // Add the new department_specific column if it doesn't exist
            const hasDepartmentSpecificColumn = await queryRunner.hasColumn("workflow_levels", "department_specific");
            if (!hasDepartmentSpecificColumn) {
                await queryRunner.query(`
                    ALTER TABLE "workflow_levels" 
                    ADD COLUMN "department_specific" boolean NOT NULL DEFAULT false
                `);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Check if workflow_levels table exists
        const tableExists = await queryRunner.hasTable("workflow_levels");
        
        if (tableExists) {
            // Remove the new columns
            const hasRoleIdsColumn = await queryRunner.hasColumn("workflow_levels", "role_ids");
            if (hasRoleIdsColumn) {
                await queryRunner.dropColumn("workflow_levels", "role_ids");
            }
            
            const hasDepartmentSpecificColumn = await queryRunner.hasColumn("workflow_levels", "department_specific");
            if (hasDepartmentSpecificColumn) {
                await queryRunner.dropColumn("workflow_levels", "department_specific");
            }
            
            // Recreate the old columns
            await queryRunner.query(`
                ALTER TABLE "workflow_levels" 
                ADD COLUMN "approver_type" character varying
            `);
            
            await queryRunner.query(`
                ALTER TABLE "workflow_levels" 
                ADD COLUMN "fallback_roles" jsonb
            `);
        }
    }
}