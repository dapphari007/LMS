import { AppDataSource } from "../config/database";
import logger from "../utils/logger";

/**
 * Script to run pending migrations with improved error handling and ordering
 */
export const runMigrations = async (closeConnection = true): Promise<void> => {
  try {
    // Initialize the connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connected successfully");
    }

    // Check for pending migrations
    const pendingMigrations = await AppDataSource.showMigrations();
    
    if (pendingMigrations) {
      logger.info("Running pending migrations...");
      
      try {
        // Run all pending migrations in the correct order with transaction for each migration
        await AppDataSource.runMigrations({ transaction: "each" });
        logger.info("Migrations completed successfully");
      } catch (migrationError: any) {
        logger.error(`Error running migrations: ${migrationError.message}`);
        
        // If there's an error with a specific migration, try to run them one by one
        const migrations = await AppDataSource.migrations;
        
        // Sort migrations by timestamp to ensure correct order
        const sortedMigrations = migrations.sort((a, b) => {
          const aTimestamp = parseInt(a.name.split('-')[0]);
          const bTimestamp = parseInt(b.name.split('-')[0]);
          return aTimestamp - bTimestamp;
        });
        
        logger.info(`Attempting to run ${sortedMigrations.length} migrations individually...`);
        
        for (const migration of sortedMigrations) {
          try {
            // Check if migration has already been applied
            const migrationName = migration.name;
            const migrationTimestamp = migrationName.split('-')[0];
            
            const migrationExists = await AppDataSource.query(
              `SELECT * FROM migrations WHERE name = $1`,
              [migrationName]
            );
            
            if (migrationExists && migrationExists.length > 0) {
              logger.info(`Migration ${migrationName} already applied, skipping`);
              continue;
            }
            
            logger.info(`Running migration: ${migrationName}`);
            
            // Create a separate query runner for this migration
            const queryRunner = AppDataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
            
            try {
              // Run the migration
              await migration.up(queryRunner);
              
              // Mark the migration as complete
              await queryRunner.query(
                `INSERT INTO migrations(timestamp, name) VALUES ($1, $2)`,
                [migrationTimestamp, migrationName]
              );
              
              // Commit the transaction
              await queryRunner.commitTransaction();
              logger.info(`Migration ${migrationName} completed successfully`);
            } catch (transactionError: any) {
              // Rollback the transaction if there's an error
              await queryRunner.rollbackTransaction();
              logger.error(`Error in migration ${migrationName}: ${transactionError.message}`);
            } finally {
              // Release the query runner
              await queryRunner.release();
            }
          } catch (individualError: any) {
            logger.error(`Error processing migration ${migration.name}: ${individualError.message}`);
            // Continue with the next migration
          }
        }
      }
    } else {
      logger.info("No pending migrations to run");
    }
  } catch (error: any) {
    logger.error(`Error in migration process: ${error.message}`);
    throw error;
  } finally {
    // Close the connection if requested
    if (closeConnection && AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
};

// Run the script if called directly
if (require.main === module) {
  runMigrations(true)
    .then(() => {
      logger.info("Migration script completed");
      process.exit(0);
    })
    .catch((error) => {
      logger.error("Migration script failed:", error);
      process.exit(1);
    });
}