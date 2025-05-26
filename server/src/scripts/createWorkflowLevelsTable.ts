import { AppDataSource, initializeDatabase } from "../config/database";
import { WorkflowLevel } from "../models";
import { UserRole } from "../models/User";
import logger from "../utils/logger";

const createWorkflowLevelsTable = async () => {
  try {
    // Initialize the database connection
    await initializeDatabase();
    
    // Check if the workflow_levels table exists
    const tableExists = await AppDataSource.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'workflow_levels'
      )
    `);
    
    if (tableExists[0].exists) {
      logger.info("workflow_levels table already exists");
      
      // Check if there are any records
      const workflowLevelRepository = AppDataSource.getRepository(WorkflowLevel);
      const count = await workflowLevelRepository.count();
      
      if (count > 0) {
        logger.info(`Found ${count} workflow levels. Skipping creation.`);
        return;
      }
    } else {
      logger.info("Creating workflow_levels table...");
      
      // Create the table
      await AppDataSource.query(`
        CREATE TABLE workflow_levels (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          level INT NOT NULL,
          approver_type VARCHAR NOT NULL,
          fallback_roles JSONB NOT NULL DEFAULT '[]',
          is_active BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        )
      `);
      
      // Create index on level
      await AppDataSource.query(`
        CREATE INDEX IDX_WORKFLOW_LEVEL_NUMBER ON workflow_levels (level)
      `);
      
      logger.info("workflow_levels table created successfully");
    }
    
    // Insert default workflow levels
    logger.info("Inserting default workflow levels...");
    
    // Insert using direct SQL queries to match the column names in the database
    try {
      await AppDataSource.query(`
        INSERT INTO workflow_levels (level, approver_type, fallback_roles, is_active)
        VALUES (1, 'teamLead', '["team_lead"]'::jsonb, true)
      `);
      
      await AppDataSource.query(`
        INSERT INTO workflow_levels (level, approver_type, fallback_roles, is_active)
        VALUES (2, 'manager', '["manager"]'::jsonb, true)
      `);
      
      await AppDataSource.query(`
        INSERT INTO workflow_levels (level, approver_type, fallback_roles, is_active)
        VALUES (3, 'hr', '["hr"]'::jsonb, true)
      `);
      
      await AppDataSource.query(`
        INSERT INTO workflow_levels (level, approver_type, fallback_roles, is_active)
        VALUES (4, 'superAdmin', '["super_admin"]'::jsonb, true)
      `);
      
      logger.info("Default workflow levels inserted successfully");
    } catch (error) {
      logger.error("Error inserting default workflow levels:", error);
    }
    
    // Close the connection
    await AppDataSource.destroy();
    
    process.exit(0);
  } catch (error) {
    logger.error("Error creating workflow_levels table:", error);
    process.exit(1);
  }
};

createWorkflowLevelsTable();