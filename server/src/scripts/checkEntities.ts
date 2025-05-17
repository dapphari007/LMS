import { initializeDatabase, AppDataSource } from "../config/database";

async function checkEntities() {
  try {
    // Initialize database connection
    await initializeDatabase();
    console.log("Database connected successfully");

    // Get all entity metadata
    const entities = AppDataSource.entityMetadatas;
    
    console.log("\n=== Registered Entities ===");
    entities.forEach((entity) => {
      console.log(`Entity: ${entity.name}`);
      console.log(`Table: ${entity.tableName}`);
      console.log("----------------------------");
    });

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

// Run the function
checkEntities();