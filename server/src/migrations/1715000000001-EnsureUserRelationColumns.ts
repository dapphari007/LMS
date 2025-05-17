//file can be removed

import { MigrationInterface, QueryRunner } from "typeorm";

export class EnsureUserRelationColumns1715000000001 implements MigrationInterface {
  name = "EnsureUserRelationColumns1715000000001";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Migration removed as redundant - columns and constraints are already added in AddRolesDepartmentsPositionsPages
    console.log('Migration removed as redundant');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Migration removed as redundant
  }
}