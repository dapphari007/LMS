import { AppDataSource } from "../config/database";
import logger from "../utils/logger";

function extractTimestamp(name: string): string {
  if (!name || !name.includes('-')) return '';
  const parts = name.split('-');
  return parts[0];
}

async function cleanMigrationsTable() {
  const queryRunner = AppDataSource.createQueryRunner();
  try {
    const tableExists = await queryRunner.hasTable("migrations");
    if (!tableExists) return;

    // Remove null names
    const nullNames = await queryRunner.query(`SELECT id FROM migrations WHERE name IS NULL`);
    if (nullNames.length > 0) {
      logger.info(`Found ${nullNames.length} migrations with null names, removing them`);
      await queryRunner.query(`DELETE FROM migrations WHERE name IS NULL`);
    }

    // Remove duplicates, keep latest
    const duplicates = await queryRunner.query(`
      SELECT name, COUNT(*) as count
      FROM migrations
      GROUP BY name
      HAVING COUNT(*) > 1
    `);

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
      logger.info(`Removed duplicates for migration: ${name}`);
    }
  } catch (err) {
    logger.error("Error fixing migrations table:", err);
  } finally {
    await queryRunner.release();
  }
}

async function runMigrationsIndividually(migrations: any[]) {
  // Sort migrations by timestamp
  const sortedMigrations = migrations.sort((a, b) => {
    const aTimestamp = parseInt(extractTimestamp(a.name));
    const bTimestamp = parseInt(extractTimestamp(b.name));
    if (isNaN(aTimestamp) || isNaN(bTimestamp)) return 0;
    return aTimestamp - bTimestamp;
  });

  logger.info(`Attempting to run ${sortedMigrations.length} migrations individually...`);

  for (const migration of sortedMigrations) {
    const migrationName = migration.name;
    let migrationTimestamp = extractTimestamp(migrationName);
    if (!migrationTimestamp || isNaN(parseInt(migrationTimestamp))) {
      logger.warn(`Could not extract timestamp from migration name: ${migrationName}`);
      migrationTimestamp = Date.now().toString();
      logger.info(`Using current timestamp instead: ${migrationTimestamp}`);
    }

    try {
      const migrationExists = await AppDataSource.query(
        `SELECT * FROM migrations WHERE name = $1`,
        [migrationName]
      );
      if (migrationExists.length > 0) {
        logger.info(`Migration ${migrationName} already applied, skipping`);
        continue;
      }

      logger.info(`Running migration: ${migrationName}`);
      const queryRunner = AppDataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        await migration.up(queryRunner);
        await queryRunner.query(
          `INSERT INTO migrations(timestamp, name) VALUES ($1, $2)`,
          [migrationTimestamp, migrationName]
        );
        await queryRunner.commitTransaction();
        logger.info(`Migration ${migrationName} completed successfully`);
      } catch (transactionError: any) {
        await queryRunner.rollbackTransaction();
        logger.error(`Error in migration ${migrationName}: ${transactionError.message}`);
      } finally {
        await queryRunner.release();
      }
    } catch (individualError: any) {
      logger.error(`Error processing migration ${migrationName}: ${individualError.message}`);
    }
  }
}

export const runMigrations = async (closeConnection = true): Promise<void> => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connected successfully");
    }

    await cleanMigrationsTable();

    const pendingMigrations = await AppDataSource.showMigrations();
    if (!pendingMigrations) return;

    logger.info("Running pending migrations...");
    try {
      await AppDataSource.runMigrations({ transaction: "each" });
      logger.info("Migrations completed successfully");
    } catch (migrationError: any) {
      logger.error(`Error running migrations: ${migrationError.message}`);
      const migrations = await AppDataSource.migrations;
      await runMigrationsIndividually(migrations);
    }
  } catch (error: any) {
    logger.error(`Error in migration process: ${error.message}`);
    throw error;
  } finally {
    if (closeConnection && AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
};

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