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

    // First, try to fix the migrations table if needed
    logger.info("Checking migrations table for issues...");
    const queryRunner = AppDataSource.createQueryRunner();
    
    try {
      // Check if migrations table exists
      const tableExists = await queryRunner.hasTable("migrations");
      
      if (tableExists) {
        // Check for null values in the name column
        const nullNames = await queryRunner.query(
          `SELECT id FROM migrations WHERE name IS NULL`
        );

        if (nullNames.length > 0) {
          logger.info(`Found ${nullNames.length} migrations with null names, removing them`);
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
        }
      }
    } catch (fixError) {
      logger.error("Error fixing migrations table:", fixError);
    } finally {
      await queryRunner.release();
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
          // Check if migration names are properly formatted
          if (!a.name || !b.name) {
            logger.error(`Invalid migration name found: ${a.name || 'undefined'} or ${b.name || 'undefined'}`);
            return 0;
          }
          
          // Safely extract timestamps
          const aParts = a.name.split('-');
          const bParts = b.name.split('-');
          
          if (!aParts || !aParts.length || !bParts || !bParts.length) {
            logger.error(`Migration name doesn't contain timestamp: ${a.name} or ${b.name}`);
            return 0;
          }
          
          const aTimestamp = parseInt(aParts[0]);
          const bTimestamp = parseInt(bParts[0]);
          
          // Check if timestamps are valid numbers
          if (isNaN(aTimestamp) || isNaN(bTimestamp)) {
            logger.error(`Invalid timestamp in migration: ${a.name} or ${b.name}`);
            return 0;
          }
          
          return aTimestamp - bTimestamp;
        });
        
        logger.info(`Attempting to run ${sortedMigrations.length} migrations individually...`);
        
        for (const migration of sortedMigrations) {
          try {
            // Check if migration has already been applied
            const migrationName = migration.name;
            
            // Safely extract timestamp
            let migrationTimestamp = '';
            if (migrationName && migrationName.includes('-')) {
              const parts = migrationName.split('-');
              if (parts && parts.length > 0) {
                migrationTimestamp = parts[0];
              }
            }
            
            // If we couldn't extract a valid timestamp, generate one
            if (!migrationTimestamp || isNaN(parseInt(migrationTimestamp))) {
              logger.warn(`Could not extract timestamp from migration name: ${migrationName}`);
              migrationTimestamp = Date.now().toString();
              logger.info(`Using current timestamp instead: ${migrationTimestamp}`);
            }
            
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