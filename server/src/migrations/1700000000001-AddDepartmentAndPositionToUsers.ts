//file can be removed

import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDepartmentAndPositionToUsers1700000000001
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Migration removed as redundant - proper relation columns are added in AddRolesDepartmentsPositionsPages
    console.log('Migration removed as redundant');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Migration removed as redundant
  }
}
