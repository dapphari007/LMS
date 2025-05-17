import { ServerRoute } from '@hapi/hapi';
import * as AuthController from '../controllers/authController';

const authRoutes: ServerRoute[] = [
  {
    method: 'POST',
    path: '/api/auth/register',
    handler: AuthController.register,
    options: {
      auth: false,
      description: 'Register a new user',
      tags: ['api', 'auth'],
    },
  },
  {
    method: 'POST',
    path: '/api/auth/login',
    handler: AuthController.login,
    options: {
      auth: false,
      description: 'Login and get JWT token',
      tags: ['api', 'auth'],
    },
  },
  {
    method: 'GET',
    path: '/api/auth/profile',
    handler: AuthController.getProfile,
    options: {
      auth: 'all_roles',
      description: 'Get user profile',
      tags: ['api', 'auth'],
    },
  },
  {
    method: 'PUT',
    path: '/api/auth/profile',
    handler: AuthController.updateProfile,
    options: {
      auth: 'all_roles',
      description: 'Update user profile',
      tags: ['api', 'auth'],
    },
  },
  {
    method: 'PUT',
    path: '/api/auth/change-password',
    handler: AuthController.changePassword,
    options: {
      auth: 'all_roles',
      description: 'Change user password',
      tags: ['api', 'auth'],
    },
  },
];

export default authRoutes;