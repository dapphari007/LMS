import { Server } from '@hapi/hapi';
import { Boom } from '@hapi/boom';
import { authPlugin } from './auth';
import { loggingPlugin } from './logging';
import { errorHandler, notFoundHandler, validationErrorHandler } from '../middlewares/errorMiddleware';
import logger from '../utils/logger';

// Create a CORS handler plugin
const corsPlugin = {
  name: 'cors-handler',
  register: async (server: Server) => {
    // Add a special handler for OPTIONS requests
    server.route({
      method: 'OPTIONS',
      path: '/{p*}',
      handler: (request, h) => {
        logger.info(`Handling OPTIONS request for: ${request.path}`);
        
        // Set CORS headers for preflight requests
        const response = h.response().code(200);
        
        // Get the origin from the request
        const origin = request.headers.origin;
        const allowedOrigins = ["http://localhost:5173", "https://client-ptd2.onrender.com", "https://client-nyk3.onrender.com", "https://client-nyk3.onrender.com/"];
        
        // Set the appropriate Access-Control-Allow-Origin header
        if (origin && allowedOrigins.includes(origin)) {
          response.header('Access-Control-Allow-Origin', origin);
        } else {
          // Default to the client domain if origin is not in the allowed list
          response.header('Access-Control-Allow-Origin', 'https://client-nyk3.onrender.com');
        }
        
        response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        response.header('Access-Control-Allow-Headers', 'Authorization, Content-Type, Access-Control-Request-Headers, Access-Control-Request-Method');
        response.header('Access-Control-Allow-Credentials', 'true');
        response.header('Access-Control-Max-Age', '86400');
        
        return response;
      },
      options: {
        auth: false, // No authentication for OPTIONS requests
        description: 'Handle CORS preflight requests',
        tags: ['api', 'cors'],
      },
    });
  }
};

export const registerPlugins = async (server: Server): Promise<void> => {
  // Register plugins
  await server.register([
    authPlugin,
    loggingPlugin,
    corsPlugin,
  ]);
  
  // Register error handlers
  server.ext('onPreResponse', errorHandler);
  
  // Register not found handler
  server.ext('onPreResponse', (request, h) => {
    const response = request.response;
    if (response instanceof Boom && response.output?.statusCode === 404) {
      return notFoundHandler(request, h);
    }
    return h.continue;
  });
  
  // Register validation error handler
  server.ext('onPreResponse', (request, h) => {
    const response = request.response;
    if (response instanceof Boom && response.output?.statusCode === 400) {
      return validationErrorHandler(request, h, response as Error);
    }
    return h.continue;
  });
};