import { MigrationInterface, QueryRunner } from "typeorm";

export class FixMigrationsTable1720000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if migrations table exists
    const tableExists = await queryRunner.hasTable("migrations");
    if (!tableExists) {
      console.log("Migrations table does not exist, skipping fix");
      return;
    }

    // Check for null values in the name column
    const nullNames = await queryRunner.query(
      `SELECT id FROM migrations WHERE name IS NULL`
    );

    if (nullNames.length > 0) {
      console.log(`Found ${nullNames.length} migrations with null names, removing them`);
      
      // Delete migrations with null names
      await queryRunner.query(`DELETE FROM migrations WHERE name IS NULL`);
    }

    // Check for duplicate migrations
    const duplicates = await queryRunner.query(`
      SELECT name, COUNT(*) 
      FROM migrations 
      GROUP BY name 
      HAVING COUNT(*) > 1
    `);

    if (duplicates.length > 0) {
      console.log(`Found ${duplicates.length} duplicate migrations, keeping only the latest`);
      
      for (const dup of duplicates) {
        const name = dup.name;
        
        // Keep only the latest migration with this name
        await queryRunner.query(`
          DELETE FROM migrations 
          WHERE name = $1 
          AND id NOT IN (
            SELECT id FROM migrations 
            WHERE name = $1 
            ORDER BY timestamp DESC 
            LIMIT 1
          )
        `, [name]);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // This is a fix migration, no down migration needed
  }
}