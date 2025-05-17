import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPartiallyApprovedToLeaveRequestStatus1715500000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add the new enum value to the leave_request_status_enum type
        await queryRunner.query(`
            ALTER TYPE leave_request_status_enum ADD VALUE IF NOT EXISTS 'partially_approved';
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // PostgreSQL doesn't support removing enum values directly
        // We would need to create a new type, update the column, and drop the old type
        // This is complex and risky, so we'll leave it as is in the down migration
        console.log("Cannot remove enum value in PostgreSQL. Skipping down migration.");
    }
}