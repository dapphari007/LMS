import { ServerRoute } from '@hapi/hapi';
import * as DashboardController from '../controllers/dashboardController';

const dashboardRoutes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/api/dashboard/manager',
    handler: DashboardController.getManagerDashboard,
    options: {
      auth: 'manager',
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
];

export default dashboardRoutes;