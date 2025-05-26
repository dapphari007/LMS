import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";
import { UserRole } from "../models/User";

export class CreateWorkflowLevelsTable1720000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "workflow_levels",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "level",
            type: "int",
            isNullable: false,
          },
          {
            name: "approver_type",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "fallback_roles",
            type: "jsonb",
            isNullable: false,
            default: "[]",
          },
          {
            name: "is_active",
            type: "boolean",
            default: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
      true
    );

    // Create index on level for faster lookups
    await queryRunner.createIndex(
      "workflow_levels",
      new TableIndex({
        name: "IDX_WORKFLOW_LEVEL_NUMBER",
        columnNames: ["level"],
      })
    );

    // Insert default workflow levels with proper JSON format
    await queryRunner.query(`
      INSERT INTO workflow_levels (id, level, approver_type, fallback_roles, is_active)
      VALUES (uuid_generate_v4(), 1, 'teamLead', '["team_lead"]'::jsonb, true)
    `);
    
    await queryRunner.query(`
      INSERT INTO workflow_levels (id, level, approver_type, fallback_roles, is_active)
      VALUES (uuid_generate_v4(), 2, 'manager', '["manager"]'::jsonb, true)
    `);
    
    await queryRunner.query(`
      INSERT INTO workflow_levels (id, level, approver_type, fallback_roles, is_active)
      VALUES (uuid_generate_v4(), 3, 'hr', '["hr"]'::jsonb, true)
    `);
    
    await queryRunner.query(`
      INSERT INTO workflow_levels (id, level, approver_type, fallback_roles, is_active)
      VALUES (uuid_generate_v4(), 4, 'superAdmin', '["super_admin"]'::jsonb, true)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("workflow_levels");
  }
}