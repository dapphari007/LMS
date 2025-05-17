import { AppDataSource, ensureDatabaseConnection } from "../config/database";
import logger from "../utils/logger";

/**
 * Run a specific migration by name
 */
const runMigration = async (migrationName: string): Promise<void> => {
  try {
    // Ensure database connection
    await ensureDatabaseConnection();
    
    logger.info(`Running migration: ${migrationName}`);
    
    // Check if the migration has already been applied
    const appliedMigrations = await AppDataSource.query(
      `SELECT * FROM migrations WHERE name = $1`,
      [migrationName]
    );
    
    if (appliedMigrations && appliedMigrations.length > 0) {
      logger.info(`Migration ${migrationName} has already been applied`);
      return;
    }
    
    // Run the migration manually
    if (migrationName === 'AddLevelToPosition1683500000000') {
      // Check if the level column already exists
      const result = await AppDataSource.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.columns 
          WHERE table_name = 'positions' AND column_name = 'level'
        )
      `);
      
      const hasLevelColumn = result[0].exists;
      
      if (!hasLevelColumn) {
        // Add level column with default value 1
        await AppDataSource.query(`ALTER TABLE "positions" ADD "level" integer DEFAULT 1`);
        logger.info("Added level column to positions table");
        
        // Record the migration as applied
        await AppDataSource.query(
          `INSERT INTO migrations (timestamp, name) VALUES ($1, $2)`,
          [Date.now(), migrationName]
        );
        
        logger.info(`Migration ${migrationName} applied successfully`);
      } else {
        logger.info("Level column already exists in positions table");
      }
    } else {
      logger.warn(`Unknown migration: ${migrationName}`);
    }
  } catch (error) {
    logger.error(`Error running migration ${migrationName}:`, error);
    throw error;
  }
};

// Run the migration if called directly
if (require.main === module) {
  const migrationName = process.argv[2] || 'AddLevelToPosition1683500000000';
  
  runMigration(migrationName)
    .then(() => {
      logger.info("Migration completed");
      process.exit(0);
    })
    .catch(error => {
      logger.error("Migration failed:", error);
      process.exit(1);
    });
}

export default runMigration;