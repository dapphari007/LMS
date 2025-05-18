import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDashboardTypeToRoles1716100000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if enum type already exists
    const enumExists = await queryRunner.query(`
      SELECT EXISTS (
        SELECT 1 FROM pg_type 
        WHERE typname = 'dashboard_type_enum'
      );
    `);
    
    // Create enum type for dashboard types if it doesn't exist
    if (!enumExists[0].exists) {
      await queryRunner.query(`
        CREATE TYPE "dashboard_type_enum" AS ENUM (
          'employee',
          'manager',
          'hr',
          'admin',
          'super_admin'
        )
      `);
    }

    // Check if column already exists
    const columnExists = await queryRunner.query(`
      SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'roles' AND column_name = 'dashboardType'
      );
    `);
    
    // Add dashboardType column to roles table if it doesn't exist
    if (!columnExists[0].exists) {
      await queryRunner.query(`
        ALTER TABLE "roles"
        ADD COLUMN "dashboardType" dashboard_type_enum DEFAULT 'employee'
      `);
    }

    // Update existing system roles with appropriate dashboard types
    await queryRunner.query(`
      UPDATE "roles" SET "dashboardType" = 'super_admin' WHERE "name" = 'super_admin';
      UPDATE "roles" SET "dashboardType" = 'admin' WHERE "name" = 'admin';
      UPDATE "roles" SET "dashboardType" = 'hr' WHERE "name" = 'hr';
      UPDATE "roles" SET "dashboardType" = 'manager' WHERE "name" = 'manager' OR "name" = 'team_lead';
      UPDATE "roles" SET "dashboardType" = 'employee' WHERE "name" = 'employee';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Check if column exists
    const columnExists = await queryRunner.query(`
      SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'roles' AND column_name = 'dashboardType'
      );
    `);
    
    // Remove dashboardType column from roles table if it exists
    if (columnExists[0].exists) {
      await queryRunner.query(`
        ALTER TABLE "roles" DROP COLUMN "dashboardType"
      `);
    }

    // Check if enum type exists and if it's not used by other tables
    const enumUsed = await queryRunner.query(`
      SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE data_type = 'USER-DEFINED' AND udt_name = 'dashboard_type_enum'
      );
    `);
    
    // Drop the enum type if it exists and is not used elsewhere
    if (!enumUsed[0].exists) {
      await queryRunner.query(`
        DROP TYPE IF EXISTS "dashboard_type_enum"
      `);
    }
  }
}