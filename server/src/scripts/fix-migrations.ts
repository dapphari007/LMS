import { AppDataSource } from "../config/database";
import logger from "../utils/logger";

/**
 * Script to fix issues with the migrations table
 * Run with: npx ts-node src/scripts/fix-migrations.ts
 */
async function fixMigrationsTable() {
  try {
    // Initialize the database connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized");
    }

    const queryRunner = AppDataSource.createQueryRunner();
    
    try {
      // Check if migrations table exists
      const tableExists = await queryRunner.hasTable("migrations");
      
      if (!tableExists) {
        logger.info("Migrations table does not exist, creating it");
        
        // Create migrations table
        await queryRunner.query(`
          CREATE TABLE IF NOT EXISTS "migrations" (
            "id" SERIAL PRIMARY KEY,
            "timestamp" BIGINT NOT NULL,
            "name" VARCHAR NOT NULL
          )
        `);
        
        logger.info("Migrations table created successfully");
        return;
      }
      
      // Check for null values in the name column
      const nullNames = await queryRunner.query(
        `SELECT id FROM migrations WHERE name IS NULL`
      );

      if (nullNames.length > 0) {
        logger.info(`Found ${nullNames.length} migrations with null names, removing them`);
        await queryRunner.query(`DELETE FROM migrations WHERE name IS NULL`);
        logger.info("Null migration entries removed");
      }

      // Check for duplicate migrations
      const duplicates = await queryRunner.query(`
        SELECT name, COUNT(*) 
        FROM migrations 
        GROUP BY name 
        HAVING COUNT(*) > 1
      `);

      if (duplicates.length > 0) {
        logger.info(`Found ${duplicates.length} duplicate migrations, keeping only the latest`);
        
        for (const dup of duplicates) {
          const name = dup.name;
          
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
        
        logger.info("Duplicate migrations cleaned up");
      }
      
      // List all migrations in the database
      const migrations = await queryRunner.query(`SELECT * FROM migrations ORDER BY timestamp`);
      logger.info(`Current migrations in database (${migrations.length}):`);
      
      for (const migration of migrations) {
        logger.info(`- ${migration.name} (timestamp: ${migration.timestamp})`);
      }
      
      logger.info("Migration table fix completed successfully");
    } finally {
      await queryRunner.release();
    }
    
    await AppDataSource.destroy();
    
  } catch (error) {
    logger.error("Error fixing migrations table:", error);
  }
}

// Run the function
fixMigrationsTable().catch(error => {
  logger.error("Unhandled error:", error);
  process.exit(1);
});