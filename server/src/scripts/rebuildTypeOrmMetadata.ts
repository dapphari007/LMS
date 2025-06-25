import { AppDataSource } from "../config/database";
import { WorkflowCategory } from "../models/WorkflowCategory";
import logger from "../utils/logger";
import path from "path";
import fs from "fs";
import { DataSource } from "typeorm";

/**
 * Rebuild TypeORM metadata by reloading all entity files
 */
const rebuildTypeOrmMetadata = async (): Promise<void> => {
  try {
    // Close the connection if it's already initialized
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      logger.info("Closed existing database connection");
    }
    
    // Modify the AppDataSource configuration to force reload of entities
    const modifiedDataSource = Object.assign({}, AppDataSource.options, {
      synchronize: false,
      cache: false,
      entities: [path.join(__dirname, "../models/**/*.{ts,js}")],
    });
    
    // Create a new DataSource with the modified configuration
    const newDataSource = new DataSource(modifiedDataSource);
    
    // Initialize the new DataSource
    await newDataSource.initialize();
    logger.info("Initialized new DataSource with reloaded entities");
    
    // Check if the WorkflowCategory entity has the maxSteps property
    const metadata = newDataSource.getMetadata(WorkflowCategory);
    const maxStepsColumn = metadata.columns.find(column => column.propertyName === "maxSteps");
    
    if (maxStepsColumn) {
      logger.info(`maxSteps column exists in entity metadata: ${maxStepsColumn.propertyName} (${maxStepsColumn.databaseName})`);
    } else {
      logger.error("maxSteps column does not exist in entity metadata");
    }
    
    // Close the new DataSource
    await newDataSource.destroy();
    logger.info("Closed new DataSource");
    
    logger.info("TypeORM metadata rebuild completed");
  } catch (error) {
    logger.error("Error rebuilding TypeORM metadata:", error);
    throw error;
  }
};

// Run the script if executed directly
if (require.main === module) {
  rebuildTypeOrmMetadata()
    .then(() => {
      logger.info("Script completed");
      process.exit(0);
    })
    .catch((error) => {
      logger.error("Script failed:", error);
      process.exit(1);
    });
}