import { ServerRoute } from '@hapi/hapi';
import * as DashboardController from '../controllers/dashboardController';

const dashboardRoutes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/api/dashboard/manager',
    handler: DashboardController.getManagerDashboard,
    options: {
      auth: 'manager_hr', // Changed from 'manager' to 'manager_hr' to allow HR access
      description: 'Get manager dashboard data',
      tags: ['api', 'dashboard'],
    },
  },
  {
    method: 'GET',
    path: '/api/dashboard/employee',
    handler: DashboardController.getEmployeeDashboard,
    options: {
      auth: 'all_roles',
      description: 'Get employee dashboard data',
      tags: ['api', 'dashboard'],
    },
  },
  {
    method: 'GET',
    path: '/api/dashboard/hr',
    handler: DashboardController.getHRDashboard,
    options: {
      auth: 'manager_hr', // Changed from 'hr' to 'manager_hr' to be more flexible
      description: 'Get HR dashboard data',
      tags: ['api', 'dashboard'],
    },
  },
];

export default dashboardRoutes;