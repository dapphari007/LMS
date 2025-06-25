import { Server } from '@hapi/hapi';
import { errorHandler, notFoundHandler, validationErrorHandler } from './errorMiddleware';
import { allRolesAuth, superAdminAuth, managerHrAuth, managerAuth, hrAuth, teamLeadAuth } from './authMiddleware';
import * as validationSchemas from './validationMiddleware';

/**
 * Register all middlewares
 */
export const registerMiddlewares = (server: Server): void => {
  // Register error handlers
  server.ext('onPreResponse', errorHandler);
  
  // Register authentication strategies
  server.auth.strategy('all_roles', 'jwt', allRolesAuth.options);
  server.auth.strategy('super_admin', 'jwt', superAdminAuth.options);
  server.auth.strategy('manager_hr', 'jwt', managerHrAuth.options);
  server.auth.strategy('manager', 'jwt', managerAuth.options);
  server.auth.strategy('hr', 'jwt', hrAuth.options);
  server.auth.strategy('team_lead', 'jwt', teamLeadAuth.options);
  
  // Set default authentication strategy
  server.auth.default('all_roles');
};

export { validationSchemas };