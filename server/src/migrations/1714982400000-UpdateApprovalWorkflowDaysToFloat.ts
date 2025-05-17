import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateApprovalWorkflowDaysToFloat1714982400000 implements MigrationInterface {
    name = 'UpdateApprovalWorkflowDaysToFloat1714982400000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // First, drop any existing workflows to avoid conversion issues
        await queryRunner.query(`DELETE FROM "approval_workflows"`);
        
        // Alter the column types from integer to float
        await queryRunner.query(`ALTER TABLE "approval_workflows" ALTER COLUMN "minDays" TYPE float`);
        await queryRunner.query(`ALTER TABLE "approval_workflows" ALTER COLUMN "maxDays" TYPE float`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Convert back to integer (note: this will truncate decimal values)
        await queryRunner.query(`ALTER TABLE "approval_workflows" ALTER COLUMN "minDays" TYPE integer`);
        await queryRunner.query(`ALTER TABLE "approval_workflows" ALTER COLUMN "maxDays" TYPE integer`);
    }
}