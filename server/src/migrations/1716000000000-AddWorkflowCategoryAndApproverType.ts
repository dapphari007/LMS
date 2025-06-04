import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWorkflowCategoryAndApproverType1716000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create workflow_categories table if it doesn't exist
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "workflow_categories" (
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

    // Create approver_types table if it doesn't exist
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "approver_types" (
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
    
    // Store if approver_types table was just created or already existed
    const approverTypesExists = await queryRunner.hasTable("approver_types");

    // Add categoryId to approval_workflows table if it doesn't exist
    try {
      await queryRunner.query(`
        ALTER TABLE "approval_workflows" 
        ADD COLUMN IF NOT EXISTS "categoryId" UUID
      `);
      
      // Check if constraint exists before adding it
      const constraintExists = await queryRunner.query(`
        SELECT constraint_name 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'FK_approval_workflows_category'
      `);
      
      if (!constraintExists.length) {
        await queryRunner.query(`
          ALTER TABLE "approval_workflows" 
          ADD CONSTRAINT "FK_approval_workflows_category" 
          FOREIGN KEY ("categoryId") REFERENCES "workflow_categories"("id") 
          ON DELETE SET NULL ON UPDATE NO ACTION
        `);
      }
    } catch (error) {
      console.log("Column or constraint might already exist:", error);
    }

    // Create indexes if they don't exist
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_workflow_categories_active" ON "workflow_categories" ("isActive")
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_workflow_categories_days" ON "workflow_categories" ("minDays", "maxDays")
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_approver_types_active" ON "approver_types" ("isActive")
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_approval_workflows_category" ON "approval_workflows" ("categoryId")
    `);

    // Insert default approver types if they don't exist
    // Check if data already exists
    const existingTypes = await queryRunner.query(`
      SELECT COUNT(*) FROM "approver_types"
    `);
    
    if (parseInt(existingTypes[0].count) === 0) {
      // Insert default values only if table is empty
      await queryRunner.query(`
        INSERT INTO "approver_types" ("name", "description", "code") VALUES
        ('Team Lead', 'Direct team leader of the employee', 'team_lead'),
        ('Manager', 'Direct manager of the employee', 'manager'),
        ('HR', 'Human Resources department', 'hr'),
        ('Department Head', 'Head of the department', 'department_head'),
        ('Specific User', 'A specific user assigned as approver', 'specific_user')
      `);
    }
    
    // Insert default workflow categories if they don't exist
    const existingCategories = await queryRunner.query(`
      SELECT COUNT(*) FROM "workflow_categories"
    `);
    
    if (parseInt(existingCategories[0].count) === 0) {
      // Insert default workflow categories
      await queryRunner.query(`
        INSERT INTO "workflow_categories" ("name", "description", "minDays", "maxDays") VALUES
        ('Short Leave', 'For leave requests of 1-2 days', 0, 2),
        ('Medium Leave', 'For leave requests of 3-5 days', 3, 5),
        ('Long Leave', 'For leave requests of 6-14 days', 6, 14),
        ('Extended Leave', 'For leave requests of 15-30 days', 15, 30),
        ('Long-Term Leave', 'For leave requests of more than 30 days', 31, 365)
      `);
    }
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