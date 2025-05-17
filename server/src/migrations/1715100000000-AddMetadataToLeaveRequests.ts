import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMetadataToLeaveRequests1715100000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if the column already exists to avoid errors
    const columnExists = await queryRunner.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'leave_requests' 
      AND column_name = 'metadata'
    `);

    if (columnExists.length === 0) {
      // Add the metadata column to the leave_requests table
      await queryRunner.query(`
        ALTER TABLE "leave_requests"
        ADD COLUMN "metadata" JSONB NULL
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Check if the column exists before trying to drop it
    const columnExists = await queryRunner.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'leave_requests' 
      AND column_name = 'metadata'
    `);

    if (columnExists.length > 0) {
      // Remove the metadata column from the leave_requests table
      await queryRunner.query(`
        ALTER TABLE "leave_requests"
        DROP COLUMN "metadata"
      `);
    }
  }
}