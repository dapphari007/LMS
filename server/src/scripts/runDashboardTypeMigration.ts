import { AppDataSource } from "../config/database";
import { AddDashboardTypeToRoles1716100000000 } from "../migrations/1716100000000-AddDashboardTypeToRoles";
import logger from "../utils/logger";

async function runMigration() {
  try {
    // Initialize the database connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized");
    }

    // Create a query runner
    const queryRunner = AppDataSource.createQueryRunner();
    
    // Create an instance of the migration
    const migration = new AddDashboardTypeToRoles1716100000000();
    
    // Run the migration
    logger.info("Running AddDashboardTypeToRoles migration...");
    await migration.up(queryRunner);
    
    // Release the query runner
    await queryRunner.release();
    
    logger.info("Migration completed successfully");
    
    // Close the connection
    await AppDataSource.destroy();
    
    process.exit(0);
  } catch (error) {
    logger.error("Error running migration:", error);
    process.exit(1);
  }
}

// Run the migration
runMigration();