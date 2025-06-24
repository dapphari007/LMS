import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRequesterRoleIdToApprovalWorkflows1720000000004 implements MigrationInterface {
    name = 'AddRequesterRoleIdToApprovalWorkflows1720000000004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add requesterRoleId column to approval_workflows table
        await queryRunner.query(`
            ALTER TABLE "approval_workflows" 
            ADD COLUMN "requesterRoleId" uuid NULL
        `);

        // Add foreign key constraint
        await queryRunner.query(`
            ALTER TABLE "approval_workflows" 
            ADD CONSTRAINT "FK_approval_workflows_requester_role" 
            FOREIGN KEY ("requesterRoleId") 
            REFERENCES "roles"("id") 
            ON DELETE SET NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraint
        await queryRunner.query(`
            ALTER TABLE "approval_workflows" 
            DROP CONSTRAINT "FK_approval_workflows_requester_role"
        `);

        // Drop requesterRoleId column
        await queryRunner.query(`
            ALTER TABLE "approval_workflows" 
            DROP COLUMN "requesterRoleId"
        `);
    }
}