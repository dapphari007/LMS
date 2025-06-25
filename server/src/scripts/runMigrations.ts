import { AppDataSource } from "../config/database";
import logger from "../utils/logger";

/**
 * Helper function to safely extract timestamp from migration name.
 */
const extractTimestamp = (migrationName: string): number | null => {
  if (!migrationName || !migrationName.includes('-')) return null;
  const parts = migrationName.split('-');
  const timestamp = parseInt(parts[0]);
  return isNaN(timestamp) ? null : timestamp;
};

/**
 * Helper function to handle individual migration execution.
 */
const runIndividualMigration = async (migration: any, queryRunner: any) => {
  const migrationName = migration.name;
  const migrationTimestamp = extractTimestamp(migrationName) || Date.now();

  try {
    const migrationExists = await AppDataSource.query(
      `SELECT * FROM migrations WHERE name = $1`,
      [migrationName]
    );

    if (migrationExists.length > 0) {
      logger.info(`Migration ${migrationName} already applied, skipping`);
      return;
    }

    logger.info(`Running migration: ${migrationName}`);
    await queryRunner.startTransaction();

    try {
      await migration.up(queryRunner);
      await queryRunner.query(
        `INSERT INTO migrations(timestamp, name) VALUES ($1, $2)`,
        [migrationTimestamp, migrationName]
      );
      await queryRunner.commitTransaction();
      logger.info(`Migration ${migrationName} completed successfully`);
    } catch (transactionError) {
      await queryRunner.rollbackTransaction();
      logger.error(`Error in migration ${migrationName}: ${transactionError.message}`);
    }
  } catch (individualError) {
    logger.error(`Error processing migration ${migrationName}: ${individualError.message}`);
  }
};

/**
 * Script to run pending migrations with improved error handling and ordering.
 */
export const runMigrations = async (closeConnection = true): Promise<void> => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connected successfully");
    }

    const queryRunner = AppDataSource.createQueryRunner();

    try {
      const tableExists = await queryRunner.hasTable("migrations");

      if (tableExists) {
        const nullNames = await queryRunner.query(
          `SELECT id FROM migrations WHERE name IS NULL`
        );
        if (nullNames.length > 0) {
          logger.info(`Found ${nullNames.length} migrations with null names, removing them`);
          await queryRunner.query(`DELETE FROM migrations WHERE name IS NULL`);
        }

        const duplicates = await queryRunner.query(`
          SELECT name, COUNT(*) 
          FROM migrations 
          GROUP BY name 
          HAVING COUNT(*) > 1
        `);
        if (duplicates.length > 0) {
          logger.info(`Found ${duplicates.length} duplicate migrations, keeping only the latest`);
          for (const dup of duplicates) {
            await queryRunner.query(`
              DELETE FROM migrations 
              WHERE name = $1 
              AND id NOT IN (
                SELECT id FROM migrations 
                WHERE name = $1 
                ORDER BY timestamp DESC 
                LIMIT 1
              )
            `, [dup.name]);
          }
        }
      }
    } catch (fixError) {
      logger.error("Error fixing migrations table:", fixError);
    } finally {
      await queryRunner.release();
    }

    const pendingMigrations = await AppDataSource.showMigrations();
    if (pendingMigrations) {
      logger.info("Running pending migrations...");
      try {
        await AppDataSource.runMigrations({ transaction: "each" });
        logger.info("Migrations completed successfully");
      } catch (migrationError) {
        logger.error(`Error running migrations: ${migrationError.message}`);
        const migrations = await AppDataSource.migrations;
        const sortedMigrations = migrations.sort((a, b) => {
          const aTimestamp = extractTimestamp(a.name) || 0;
          const bTimestamp = extractTimestamp(b.name) || 0;
          return aTimestamp - bTimestamp;
        });

        logger.info(`Attempting to run ${sortedMigrations.length} migrations individually...`);
        for (const migration of sortedMigrations) {
          const queryRunner = AppDataSource.createQueryRunner();
          await queryRunner.connect();
          await runIndividualMigration(migration, queryRunner);
          await queryRunner.release();
        }
      }
    } else {
      logger.info("No pending migrations to run");
    }
  } catch (error) {
    logger.error(`Error in migration process: ${error.message}`);
    throw error;
  } finally {
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