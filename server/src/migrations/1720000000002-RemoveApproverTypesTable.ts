import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveApproverTypesTable1720000000002 implements MigrationInterface {
    name = 'RemoveApproverTypesTable1720000000002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop the approver_types table if it exists
        await queryRunner.query(`DROP TABLE IF EXISTS "approver_types"`);
        
        // Update approval_workflows table to remove approver type references
        // and simplify the structure to use only role IDs
        await queryRunner.query(`
            UPDATE "approval_workflows" 
            SET "approvalLevels" = (
                SELECT jsonb_agg(
                    jsonb_build_object(
                        'level', (level_data->>'level')::int,
                        'roleIds', CASE 
                            WHEN level_data->>'roleIds' IS NOT NULL THEN level_data->'roleIds'
                            ELSE '[]'::jsonb
                        END,
                        'departmentSpecific', COALESCE((level_data->>'departmentSpecific')::boolean, false),
                        'required', COALESCE((level_data->>'required')::boolean, true)
                    )
                )
                FROM jsonb_array_elements("approvalLevels") AS level_data
            )
            WHERE "approvalLevels" IS NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Recreate the approver_types table
        await queryRunner.query(`
            CREATE TABLE "approver_types" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "description" character varying,
                "code" character varying NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_approver_types" PRIMARY KEY ("id")
            )
        `);
        
        // Note: We cannot fully restore the old approval workflow structure
        // as the migration is destructive. This down migration only recreates
        // the table structure but not the data.
    }
}