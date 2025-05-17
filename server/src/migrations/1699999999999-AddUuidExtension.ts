import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUuidExtension1699999999999 implements MigrationInterface {
  name = "AddUuidExtension1699999999999";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add UUID extension for PostgreSQL
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop UUID extension
    await queryRunner.query(`
      DROP EXTENSION IF EXISTS "uuid-ossp";
    `);
  }
}
