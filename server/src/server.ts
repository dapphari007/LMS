import Hapi from "@hapi/hapi";
import Joi from "joi";
import { registerPlugins } from "./plugins";
import { registerRoutes } from "./routes";
import {
  initializeDatabase,
  ensureDatabaseConnection,
  AppDataSource,
} from "./config/database";
import config from "./config/config";
import logger from "./utils/logger";
import { ensureDefaultUsers } from "./utils/ensure-default-users";
import { createDefaultLeaveTypes } from "./scripts/createDefaultLeaveTypes";
import { initializeSystemRoles, updateUserRoleIds } from "./controllers/roleController";
import { initializeSystemPages } from "./controllers/pageController";
import { createTestUser } from "./scripts/createTestUser";
import { createDefaultDepartments } from "./scripts/createDefaultDepartments";
import { createDefaultPositions } from "./scripts/createDefaultPositions";
import { createDefaultRoles } from "./scripts/createDefaultRoles";
import { setupDefaultData } from "./scripts/setupDefaultData";
import { initializeWorkflows } from "./services/workflowInitService";
import { showRoles } from "./scripts/showRoles";
import { createCustomRole } from "./scripts/manageRoles";
import { syncEssentialData } from "./scripts/syncEssentialData";
import { checkEssentialData } from "./scripts/checkEssentialData";
import { initializeSystem } from "./scripts/initializeSystem";

const init = async () => {
  try {
    // Initialize database connection with retry mechanism
    let retries = 5;
    while (retries > 0) {
      try {
        await initializeDatabase();
        logger.info("Database connected successfully");
        break;
      } catch (error) {
        retries--;
        if (retries === 0) {
          throw error;
        }
        logger.warn(
          `Database connection failed, retrying... (${retries} attempts left)`
        );
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait 3 seconds before retrying
      }
    }

    // We'll handle all data setup in the initializeSystem function later

    // Create Hapi server
    const server = Hapi.server({
      port: config.server.port,
      host: config.server.host,
      routes: {
        cors: {
          origin: ["http://localhost:5173", "https://client-ptd2.onrender.com", "https://client-nyk3.onrender.com", "https://client-nyk3.onrender.com/"], // Include both with and without trailing slash
          credentials: true,
          additionalHeaders: ["Authorization", "Content-Type", "Access-Control-Request-Headers", "Access-Control-Request-Method"],
          additionalExposedHeaders: ["Authorization"],
          maxAge: 86400, // 24 hours
          preflightStatusCode: 200 // Status code for OPTIONS requests
        },
        validate: {
          failAction: async (request, h, err) => {
            const error = err as Error;
            if (process.env.NODE_ENV === "production") {
              // In production, log the error but return a generic message
              logger.error(
                `Validation error: ${error?.message || "Unknown error"}`
              );
              throw new Error(`Invalid request payload input`);
            } else {
              // During development, log and respond with the full error
              logger.error(
                `Validation error: ${error?.message || "Unknown error"}`
              );
              throw error;
            }
          },
        },
      },
    });

    // Register plugins
    await registerPlugins(server);

    // Register routes
    registerRoutes(server);

    // Run migrations if needed with improved error handling
    try {
      logger.info("Starting migration process with automatic fixes...");
      try {
        // Import the runMigrations function which now includes migration table fixes
        const { runMigrations } = require("./scripts/runMigrations");
        
        // Run migrations with improved error handling and automatic fixes
        await runMigrations(false); // Don't close the connection
        
        logger.info("Migration process completed successfully");

        // Add a small delay to ensure database is in a consistent state
        // before proceeding with other operations
        logger.info("Waiting for database to stabilize...");
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (migrationError) {
        logger.error("Error in migration process:", migrationError);
      }
    } catch (error) {
      logger.error("Error starting migration process:", error);
    }

    // Check if tables exist before initializing data
    const tablesExist = async (tableNames: string[]): Promise<boolean> => {
      try {
        // First ensure database connection is established
        if (!AppDataSource.isInitialized) {
          logger.warn(
            "Database connection not initialized when checking tables"
          );
          await ensureDatabaseConnection();
        }

        for (const tableName of tableNames) {
          try {
            const result = await AppDataSource.query(
              `
              SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = $1
              )
            `,
              [tableName]
            );

            if (!result[0].exists) {
              logger.warn(`Table ${tableName} does not exist yet`);
              return false;
            }
          } catch (tableError) {
            logger.warn(
              `Error checking if table ${tableName} exists:`,
              tableError
            );
            return false;
          }
        }
        return true;
      } catch (error) {
        logger.error("Error checking if tables exist:", error);
        return false;
      }
    };

    // We'll handle all system initialization in the initializeSystem function later

    // Set up database connection health check
    const dbHealthCheck = setInterval(async () => {
      try {
        if (!AppDataSource.isInitialized) {
          logger.warn("Database connection lost, attempting to reconnect...");
          await ensureDatabaseConnection();
        } else {
          // Test the connection with a simple query
          try {
            await AppDataSource.query("SELECT 1");
          } catch (error) {
            logger.warn("Database connection test failed, reconnecting...");
            await ensureDatabaseConnection();
          }
        }
      } catch (error) {
        logger.error("Database health check failed:", error);
      }
    }, 30000); // Check every 30 seconds

    // Start server
    await server.start();
    logger.info(`Server running on ${server.info.uri}`);
    
    // Run comprehensive system initialization
    try {
      logger.info("Starting comprehensive system initialization...");
      await initializeSystem();
      logger.info("System initialization completed successfully");
    } catch (initError) {
      logger.error("Error during system initialization:", initError);
    }

    // Handle unhandled rejections
    process.on("unhandledRejection", (err) => {
      logger.error("Unhandled rejection:", err);
      clearInterval(dbHealthCheck);
      process.exit(1);
    });

    // Handle graceful shutdown
    process.on("SIGINT", async () => {
      logger.info("Shutting down server...");
      await server.stop();
      clearInterval(dbHealthCheck);
      if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
      }
      process.exit(0);
    });

    return server;
  } catch (error) {
    logger.error("Error starting server:", error);
    process.exit(1);
  }
};

// Start the server
if (require.main === module) {
  init();
}

export default init;

// Export role management and synchronization functions for easy access
export { showRoles, createCustomRole, syncEssentialData, checkEssentialData };
