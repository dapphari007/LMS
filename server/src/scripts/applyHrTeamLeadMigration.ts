import { AppDataSource } from "../config/database";
import logger from "../utils/logger";

/**
 * Script to manually apply the HR and Team Lead migration
 */
const applyHrTeamLeadMigration = async () => {
  try {
    // Initialize the connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connected successfully");
    }

    // Add hrId column
    await AppDataSource.query(`
      ALTER TABLE "users" 
      ADD COLUMN IF NOT EXISTS "hrId" uuid NULL
    `);
    logger.info("Added hrId column");

    // Add teamLeadId column
    await AppDataSource.query(`
      ALTER TABLE "users" 
      ADD COLUMN IF NOT EXISTS "teamLeadId" uuid NULL
    `);
    logger.info("Added teamLeadId column");

    // Add foreign key constraint for hrId if it doesn't exist
    try {
      await AppDataSource.query(`
        ALTER TABLE "users" 
        ADD CONSTRAINT "FK_users_hr" 
        FOREIGN KEY ("hrId") 
        REFERENCES "users"("id") 
        ON DELETE SET NULL 
        ON UPDATE CASCADE
      `);
      logger.info("Added FK constraint for hrId");
    } catch (error) {
      logger.info("FK constraint for hrId already exists");
    }

    // Add foreign key constraint for teamLeadId if it doesn't exist
    try {
      await AppDataSource.query(`
        ALTER TABLE "users" 
        ADD CONSTRAINT "FK_users_teamLead" 
        FOREIGN KEY ("teamLeadId") 
        REFERENCES "users"("id") 
        ON DELETE SET NULL 
        ON UPDATE CASCADE
      `);
      logger.info("Added FK constraint for teamLeadId");
    } catch (error) {
      logger.info("FK constraint for teamLeadId already exists");
    }

    // Update migrations table to mark our migration as run
    await AppDataSource.query(`
      INSERT INTO migrations (timestamp, name) 
      VALUES (1715300000000, 'AddHrAndTeamLeadToUsers1715300000000')
      ON CONFLICT DO NOTHING
    `);
    logger.info("Updated migrations table");

    logger.info("Migration completed successfully");

    // Close the connection
    await AppDataSource.destroy();
    process.exit(0);
  } catch (error) {
    logger.error("Error applying migration:", error);
    process.exit(1);
  }
};

// Run the script
applyHrTeamLeadMigration();