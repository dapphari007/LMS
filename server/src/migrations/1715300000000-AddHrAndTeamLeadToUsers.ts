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

    // Add foreign key constraint for hrId if it doesn't exist
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints 
          WHERE constraint_name = 'FK_users_hr' 
          AND table_name = 'users'
        ) THEN
          ALTER TABLE "users" 
          ADD CONSTRAINT "FK_users_hr" 
          FOREIGN KEY ("hrId") 
          REFERENCES "users"("id") 
          ON DELETE SET NULL 
          ON UPDATE CASCADE;
        END IF;
      END
      $$;
    `);

    // Add foreign key constraint for teamLeadId if it doesn't exist
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints 
          WHERE constraint_name = 'FK_users_teamLead' 
          AND table_name = 'users'
        ) THEN
          ALTER TABLE "users" 
          ADD CONSTRAINT "FK_users_teamLead" 
          FOREIGN KEY ("teamLeadId") 
          REFERENCES "users"("id") 
          ON DELETE SET NULL 
          ON UPDATE CASCADE;
        END IF;
      END
      $$;
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