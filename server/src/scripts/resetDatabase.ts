import { AppDataSource } from "../config/database";
import config from "../config/config";
import { Client } from "pg";

/**
 * Script to reset the database by dropping and recreating it
 * This is useful for development and testing
 */
const resetDatabase = async () => {
  console.log("Starting database reset process...");

  // Create a client to connect to PostgreSQL
  const client = new Client({
    host: config.database.host,
    port: config.database.port,
    user: config.database.username,
    password: config.database.password,
    database: "postgres", // Connect to default postgres database
  });

  try {
    // Connect to PostgreSQL
    await client.connect();
    console.log("Connected to PostgreSQL");

    // Drop the database if it exists
    const dbName = config.database.database;
    console.log(`Attempting to drop database: ${dbName}`);

    // First terminate all connections to the database
    await client.query(`
      SELECT pg_terminate_backend(pg_stat_activity.pid)
      FROM pg_stat_activity
      WHERE pg_stat_activity.datname = '${dbName}'
      AND pid <> pg_backend_pid();
    `);

    // Drop the database
    await client.query(`DROP DATABASE IF EXISTS "${dbName}";`);
    console.log(`Database ${dbName} dropped successfully`);

    // Create the database again
    await client.query(`CREATE DATABASE "${dbName}";`);
    console.log(`Database ${dbName} created successfully`);

    // Close the client connection
    await client.end();
    console.log("PostgreSQL client disconnected");

    console.log("Database reset completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error resetting database:", error);
    process.exit(1);
  }
};

// Run the script if it's called directly
if (require.main === module) {
  resetDatabase();
}

export default resetDatabase;
