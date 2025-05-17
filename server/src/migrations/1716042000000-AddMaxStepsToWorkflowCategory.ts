import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMaxStepsToWorkflowCategory1716042000000 implements MigrationInterface {
    name = 'AddMaxStepsToWorkflowCategory1716042000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add maxSteps column with default value 3
        await queryRunner.query(`ALTER TABLE "workflow_categories" ADD "maxSteps" integer NOT NULL DEFAULT 3`);
        
        // Update existing categories with specific maxSteps values
        await queryRunner.query(`UPDATE "workflow_categories" SET "maxSteps" = 2 WHERE "name" = 'Short Leave'`);
        await queryRunner.query(`UPDATE "workflow_categories" SET "maxSteps" = 3 WHERE "name" = 'Medium Leave'`);
        await queryRunner.query(`UPDATE "workflow_categories" SET "maxSteps" = 4 WHERE "name" = 'Long Leave'`);
        await queryRunner.query(`UPDATE "workflow_categories" SET "maxSteps" = 5 WHERE "name" = 'Extended Leave'`);
        await queryRunner.query(`UPDATE "workflow_categories" SET "maxSteps" = 6 WHERE "name" = 'Long-Term Leave'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove the maxSteps column
        await queryRunner.query(`ALTER TABLE "workflow_categories" DROP COLUMN "maxSteps"`);
    }
}