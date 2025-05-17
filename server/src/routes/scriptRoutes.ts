import { ServerRoute } from "@hapi/hapi";
import { exec } from "child_process";
import path from "path";
import logger from "../utils/logger";

const scriptRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: "/api/scripts/run-role-script",
    handler: async (request, h) => {
      try {
        const { command } = request.payload as any;
        
        if (!command || typeof command !== "string") {
          return h.response({ message: "Invalid command" }).code(400);
        }
        
        // Validate command to prevent command injection
        const allowedCommands = ["show", "create"];
        const commandParts = command.split(" ");
        
        if (!allowedCommands.includes(commandParts[0])) {
          return h.response({ message: "Invalid command" }).code(400);
        }
        
        // Build the full command
        const scriptPath = path.resolve(__dirname, "../../../direct-manage-roles.js");
        const fullCommand = `node ${scriptPath} ${command}`;
        
        // Execute the command
        const result = await new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
          exec(fullCommand, { maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
            if (error) {
              logger.error(`Error executing script: ${error.message}`);
              reject(error);
              return;
            }
            resolve({ stdout, stderr });
          });
        });
        
        return h.response({
          message: "Script executed successfully",
          output: result.stdout,
          error: result.stderr,
        }).code(200);
      } catch (error) {
        logger.error(`Error in run-role-script: ${error}`);
        return h.response({ 
          message: "An error occurred while executing the script",
          error: error.message
        }).code(500);
      }
    },
    options: {
      auth: "super_admin",
      description: "Run role management script",
      tags: ["api", "scripts"],
    },
  },
];

export default scriptRoutes;