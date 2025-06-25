import { Server, Request, ResponseObject } from "@hapi/hapi";
import { Boom } from "@hapi/boom";
import logger from "../utils/logger";

export const loggingPlugin = {
  name: "logging",
  version: "1.0.0",
  register: async function (server: Server) {
    // Log all requests
    server.ext("onRequest", (request: Request, h) => {
      const { method, path, headers } = request;
      logger.info(
        `Request: ${method.toUpperCase()} ${path} - Headers: ${JSON.stringify(
          headers
        )}`
      );
      return h.continue;
    });

    // Log all responses
    server.ext("onPreResponse", (request: Request, h) => {
      const response = request.response;
      const responseTime = Date.now() - request.info.received;

      const { statusCode, errorPayload } = getResponseDetails(response);

      const logMessage = `Response: ${request.method.toUpperCase()} ${
        request.path
      } - Status: ${statusCode} - Time: ${responseTime}ms`;

      if (statusCode >= 400) {
        logger.error(`${logMessage} - Error: ${JSON.stringify(errorPayload)}`);
      } else {
        logger.info(logMessage);
      }

      return h.continue;
    });

    // Log server errors
    server.events.on(
      { name: "request", channels: "error" },
      (request, event, tags) => {
        if (tags.error) {
          const errorObj = event.error as Error;
          logger.error(`Server error: ${errorObj?.message || "Unknown error"}`);
          if (errorObj?.stack) {
            logger.error(`Stack: ${errorObj.stack}`);
          }
        }
      }
    );

    logger.info("Logging plugin registered");
  },
};

// Helper function to extract response details
function getResponseDetails(response: any): { statusCode: number; errorPayload: any } {
  if (response instanceof Boom) {
    return {
      statusCode: response.output?.statusCode || 500,
      errorPayload: response.output?.payload,
    };
  }
  return {
    statusCode: (response as ResponseObject).statusCode || 200,
    errorPayload: (response as ResponseObject).source,
  };
}
