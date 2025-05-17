import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWorkflowCategoryAndApproverType1716000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create workflow_categories table
    await queryRunner.query(`
      CREATE TABLE "workflow_categories" (
        "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
        "name" VARCHAR NOT NULL,
        "description" VARCHAR,
        "minDays" FLOAT NOT NULL,
        "maxDays" FLOAT NOT NULL,
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_workflow_categories" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_workflow_categories_name" UNIQUE ("name")
      )
    `);

    // Create approver_types table
    await queryRunner.query(`
      CREATE TABLE "approver_types" (
        "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
        "name" VARCHAR NOT NULL,
        "description" VARCHAR,
        "code" VARCHAR NOT NULL,
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_approver_types" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_approver_types_name" UNIQUE ("name"),
        CONSTRAINT "UQ_approver_types_code" UNIQUE ("code")
      )
    `);

    // Add categoryId to approval_workflows table
    await queryRunner.query(`
      ALTER TABLE "approval_workflows" 
      ADD COLUMN "categoryId" UUID,
      ADD CONSTRAINT "FK_approval_workflows_category" 
      FOREIGN KEY ("categoryId") REFERENCES "workflow_categories"("id") 
      ON DELETE SET NULL ON UPDATE NO ACTION
    `);

    // Create indexes
    await queryRunner.query(`
      CREATE INDEX "IDX_workflow_categories_active" ON "workflow_categories" ("isActive")
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_workflow_categories_days" ON "workflow_categories" ("minDays", "maxDays")
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_approver_types_active" ON "approver_types" ("isActive")
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_approval_workflows_category" ON "approval_workflows" ("categoryId")
    `);

    // Insert default approver types
    await queryRunner.query(`
      INSERT INTO "approver_types" ("name", "description", "code") VALUES
      ('Team Lead', 'Direct team leader of the employee', 'team_lead'),
      ('Manager', 'Direct manager of the employee', 'manager'),
      ('HR', 'Human Resources department', 'hr'),
      ('Department Head', 'Head of the department', 'department_head'),
      ('Specific User', 'A specific user assigned as approver', 'specific_user')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove foreign key constraint
    await queryRunner.query(`
      ALTER TABLE "approval_workflows" DROP CONSTRAINT "FK_approval_workflows_category"
    `);

    // Drop categoryId column
    await queryRunner.query(`
      ALTER TABLE "approval_workflows" DROP COLUMN "categoryId"
    `);

    // Drop indexes
    await queryRunner.query(`DROP INDEX "IDX_workflow_categories_active"`);
    await queryRunner.query(`DROP INDEX "IDX_workflow_categories_days"`);
    await queryRunner.query(`DROP INDEX "IDX_approver_types_active"`);
    await queryRunner.query(`DROP INDEX "IDX_approval_workflows_category"`);

    // Drop tables
    await queryRunner.query(`DROP TABLE "workflow_categories"`);
    await queryRunner.query(`DROP TABLE "approver_types"`);
  }
}