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
        break;
      } catch (error) {
        retries--;
        if (retries === 0) {
          throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait 3 seconds before retrying
      }
    }

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
              throw new Error(`Invalid request payload input`);
            } else {
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

    // Run migrations if needed
    try {
      const { runMigrations } = require("./scripts/runMigrations");
      await runMigrations(false); // Don't close the connection
    } catch (migrationError) {
      logger.error("Error in migration process:", migrationError);
    }

    // Check if tables exist before initializing data
    const tablesExist = async (tableNames: string[]): Promise<boolean> => {
      try {
        if (!AppDataSource.isInitialized) {
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
              return false;
            }
          } catch {
            return false;
          }
        }
        return true;
      } catch {
        return false;
      }
    };

    // Set up database connection health check
    const dbHealthCheck = setInterval(async () => {
      try {
        if (!AppDataSource.isInitialized) {
          await ensureDatabaseConnection();
        } else {
          try {
            await AppDataSource.query("SELECT 1");
          } catch {
            await ensureDatabaseConnection();
          }
        }
      } catch {}
    }, 30000); // Check every 30 seconds

    // Start server
    await server.start();
    logger.info(`Server running on ${server.info.uri}`);
    
    // Run comprehensive system initialization
    try {
      await initializeSystem();
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
