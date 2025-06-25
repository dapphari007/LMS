import { Request, ResponseToolkit, ServerRoute } from '@hapi/hapi';
import { UserRole } from '../models';
import logger from '../utils/logger';

/**
 * Authentication strategy for all roles
 */
export const allRolesAuth = {
  name: 'all_roles',
  scheme: 'jwt',
  options: {
    key: process.env.JWT_SECRET || 'your_jwt_secret_key',
    validate: async (decoded: any, request: Request, h: ResponseToolkit) => {
      try {
        // Decoded token contains user information
        return { isValid: true, credentials: decoded };
      } catch (error) {
        logger.error(`Error validating token: ${error}`);
        return { isValid: false };
      }
    },
    verifyOptions: { algorithms: ['HS256'] },
  },
};

/**
 * Authentication strategy for super admin only
 */
export const superAdminAuth = {
  name: 'super_admin',
  scheme: 'jwt',
  options: {
    key: process.env.JWT_SECRET || 'your_jwt_secret_key',
    validate: async (decoded: any, request: Request, h: ResponseToolkit) => {
      try {
        // Check if user is a super admin
        if (decoded.role !== UserRole.SUPER_ADMIN) {
          return { isValid: false };
        }
        
        return { isValid: true, credentials: decoded };
      } catch (error) {
        logger.error(`Error validating token: ${error}`);
        return { isValid: false };
      }
    },
    verifyOptions: { algorithms: ['HS256'] },
  },
};

/**
 * Authentication strategy for managers, HR, and team leads
 */
export const managerHrAuth = {
  name: 'manager_hr',
  scheme: 'jwt',
  options: {
    key: process.env.JWT_SECRET || 'your_jwt_secret_key',
    validate: async (decoded: any, request: Request, h: ResponseToolkit) => {
      try {
        // Check if user is a manager, HR, team lead, or super admin
        if (
          decoded.role !== UserRole.MANAGER &&
          decoded.role !== UserRole.HR &&
          decoded.role !== UserRole.TEAM_LEAD &&
          decoded.role !== UserRole.SUPER_ADMIN
        ) {
          return { isValid: false };
        }
        
        return { isValid: true, credentials: decoded };
      } catch (error) {
        logger.error(`Error validating token: ${error}`);
        return { isValid: false };
      }
    },
    verifyOptions: { algorithms: ['HS256'] },
  },
};

/**
 * Authentication strategy for managers only
 */
export const managerAuth = {
  name: 'manager',
  scheme: 'jwt',
  options: {
    key: process.env.JWT_SECRET || 'your_jwt_secret_key',
    validate: async (decoded: any, request: Request, h: ResponseToolkit) => {
      try {
        // Check if user is a manager or super admin
        if (
          decoded.role !== UserRole.MANAGER &&
          decoded.role !== UserRole.SUPER_ADMIN
        ) {
          return { isValid: false };
        }
        
        return { isValid: true, credentials: decoded };
      } catch (error) {
        logger.error(`Error validating token: ${error}`);
        return { isValid: false };
      }
    },
    verifyOptions: { algorithms: ['HS256'] },
  },
};

/**
 * Authentication strategy for HR only
 */
export const hrAuth = {
  name: 'hr',
  scheme: 'jwt',
  options: {
    key: process.env.JWT_SECRET || 'your_jwt_secret_key',
    validate: async (decoded: any, request: Request, h: ResponseToolkit) => {
      try {
        // Check if user is HR or super admin
        if (
          decoded.role !== UserRole.HR &&
          decoded.role !== UserRole.SUPER_ADMIN
        ) {
          return { isValid: false };
        }
        
        return { isValid: true, credentials: decoded };
      } catch (error) {
        logger.error(`Error validating token: ${error}`);
        return { isValid: false };
      }
    },
    verifyOptions: { algorithms: ['HS256'] },
  },
};

/**
 * Authentication strategy for team leads only
 */
export const teamLeadAuth = {
  name: 'team_lead',
  scheme: 'jwt',
  options: {
    key: process.env.JWT_SECRET || 'your_jwt_secret_key',
    validate: async (decoded: any, request: Request, h: ResponseToolkit) => {
      try {
        // Check if user is a team lead or super admin
        if (
          decoded.role !== UserRole.TEAM_LEAD &&
          decoded.role !== UserRole.SUPER_ADMIN
        ) {
          return { isValid: false };
        }
        
        return { isValid: true, credentials: decoded };
      } catch (error) {
        logger.error(`Error validating token: ${error}`);
        return { isValid: false };
      }
    },
    verifyOptions: { algorithms: ['HS256'] },
  },
};