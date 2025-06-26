import { DataSource } from "typeorm";
import config from "./config";
import path from "path";

// Use environment variables for database connection
export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  synchronize: false, 
  logging: false, 
  entities: [path.join(__dirname, "../models/**/*.{ts,js}")],
  migrations: [path.join(__dirname, "../migrations/**/*.{ts,js}")],
  subscribers: [path.join(__dirname, "../subscribers/**/*.{ts,js}")],
  cache: false, 
});

export const initializeDatabase = async (): Promise<void> => {
  try {
    // If the connection is already established, close it first
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }

    // Initialize the connection
    await AppDataSource.initialize();
    console.log("Database connection initialized successfully");

    // Check for pending migrations but don't run them here
    // They will be handled by the runMigrations function called in server.ts
    const pendingMigrations = await AppDataSource.showMigrations();
    if (pendingMigrations) {
      console.log("* There are pending migrations that need to be applied");
    } else {
      console.log("All expected database tables exist");
    }
  } catch (error) {
    console.error("Error during database initialization:", error);
    throw error;
  }
};

// Function to ensure database connection is established
export const ensureDatabaseConnection = async (): Promise<void> => {
  try {
    // Check if connection is initialized and connected
    if (!AppDataSource.isInitialized) {
      console.warn(
        "Database connection not initialized, attempting to initialize..."
      );
      await initializeDatabase();
      return;
    }

    // Test the connection with a simple query
    try {
      await AppDataSource.query("SELECT 1");
    } catch (error) {
      console.warn("Database connection test failed, reconnecting...");
      await initializeDatabase();
    }
  } catch (error) {
    console.error("Failed to ensure database connection:", error);
    throw error;
  }
};
