import { MigrationInterface, QueryRunner } from "typeorm";

export class AddHrAndTeamLeadToUsers1715300000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add hrId column
    await queryRunner.query(`
      ALTER TABLE "users" 
      ADD COLUMN IF NOT EXISTS "hrId" uuid NULL
    `);

    // Add teamLeadId column
    await queryRunner.query(`
      ALTER TABLE "users" 
      ADD COLUMN IF NOT EXISTS "teamLeadId" uuid NULL
    `);

    // Add foreign key constraint for hrId
    await queryRunner.query(`
      ALTER TABLE "users" 
      ADD CONSTRAINT "FK_users_hr" 
      FOREIGN KEY ("hrId") 
      REFERENCES "users"("id") 
      ON DELETE SET NULL 
      ON UPDATE CASCADE
    `);

    // Add foreign key constraint for teamLeadId
    await queryRunner.query(`
      ALTER TABLE "users" 
      ADD CONSTRAINT "FK_users_teamLead" 
      FOREIGN KEY ("teamLeadId") 
      REFERENCES "users"("id") 
      ON DELETE SET NULL 
      ON UPDATE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key constraints
    await queryRunner.query(`
      ALTER TABLE "users" 
      DROP CONSTRAINT IF EXISTS "FK_users_teamLead"
    `);

    await queryRunner.query(`
      ALTER TABLE "users" 
      DROP CONSTRAINT IF EXISTS "FK_users_hr"
    `);

    // Drop columns
    await queryRunner.query(`
      ALTER TABLE "users" 
      DROP COLUMN IF EXISTS "teamLeadId"
    `);

    await queryRunner.query(`
      ALTER TABLE "users" 
      DROP COLUMN IF EXISTS "hrId"
    `);
  }
}