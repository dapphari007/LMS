//file can be removed

import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLevelToPosition1683500000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Migration removed as redundant - level column is already included in positions table creation
        console.log('Migration removed as redundant');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Migration removed as redundant
    }
}