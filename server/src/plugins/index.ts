import { Server } from '@hapi/hapi';
import { Boom } from '@hapi/boom';
import { authPlugin } from './auth';
import { loggingPlugin } from './logging';
import { errorHandler, notFoundHandler, validationErrorHandler } from '../middlewares/errorMiddleware';

export const registerPlugins = async (server: Server): Promise<void> => {
  // Register plugins
  await server.register([
    authPlugin,
    loggingPlugin,
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