import Hapi from "@hapi/hapi";
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

// Utility: Check if tables exist
const tablesExist = async (tableNames: string[]): Promise<boolean> => {
  try {
    if (!AppDataSource.isInitialized) {
      logger.warn("Database connection not initialized when checking tables");
      await ensureDatabaseConnection();
    }
    for (const tableName of tableNames) {
      const result = await AppDataSource.query(
        `SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = $1
        )`,
        [tableName]
      );
      if (!result[0].exists) {
        logger.warn(`Table ${tableName} does not exist yet`);
        return false;
      }
    }
    return true;
  } catch (error) {
    logger.error("Error checking if tables exist:", error);
    return false;
  }
};

// Utility: Database health check
const startDbHealthCheck = () => setInterval(async () => {
  try {
    if (!AppDataSource.isInitialized) {
      logger.warn("Database connection lost, attempting to reconnect...");
      await ensureDatabaseConnection();
    } else {
      await AppDataSource.query("SELECT 1");
    }
  } catch (error) {
    logger.warn("Database health check failed, reconnecting...");
    await ensureDatabaseConnection();
  }
}, 30000);

// Utility: Graceful shutdown
const gracefulShutdown = async (server: Hapi.Server, dbHealthCheck: NodeJS.Timeout) => {
  logger.info("Shutting down server...");
  await server.stop();
  clearInterval(dbHealthCheck);
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
  process.exit(0);
};

const init = async () => {
  try {
    let retries = 3;
    while (retries > 0) {
      try {
        await initializeDatabase();
        break;
      } catch (error) {
        retries--;
        if (retries === 0) throw error;
        logger.warn(`Database connection failed, retrying... (${retries} attempts left)`);
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }

    const server = Hapi.server({
      port: config.server.port,
      host: config.server.host,
      routes: {
        cors: {
          origin: [
            "http://localhost:5173",
            "https://client-ptd2.onrender.com",
            "https://client-nyk3.onrender.com",
            "https://client-nyk3.onrender.com/"
          ],
          credentials: true,
          additionalHeaders: [
            "Authorization", "Content-Type", "Access-Control-Request-Headers", "Access-Control-Request-Method"
          ],
          additionalExposedHeaders: ["Authorization"],
          maxAge: 86400,
          preflightStatusCode: 200
        },
        validate: {
          failAction: async (request, h, err) => {
            const error = err as Error;
            logger.error(`Validation error: ${error?.message || "Unknown error"}`);
            throw process.env.NODE_ENV === "production"
              ? new Error("Invalid request payload input")
              : error;
          }
        }
      }
    });

    await registerPlugins(server);
    registerRoutes(server);

    // Migration logic
    try {
      const { runMigrations } = require("./scripts/runMigrations");
      await runMigrations(false);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (migrationError) {
      logger.error("Error in migration process:", migrationError);
    }

    // Start health check
    const dbHealthCheck = startDbHealthCheck();

    await server.start();
    console.log(`Server running on ${server.info.uri}`);

    // System initialization
    try {
      await initializeSystem();
    } catch (initError) {
      logger.error("Error during system initialization:", initError);
    }

    // Handle process events
    process.on("unhandledRejection", (err) => {
      logger.error("Unhandled rejection:", err);
      clearInterval(dbHealthCheck);
      process.exit(1);
    });

    process.on("SIGINT", async () => {
      await gracefulShutdown(server, dbHealthCheck);
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
export { showRoles, createCustomRole, syncEssentialData, checkEssentialData };
