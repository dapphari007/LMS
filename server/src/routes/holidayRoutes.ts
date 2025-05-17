import { ServerRoute } from '@hapi/hapi';
import * as HolidayController from '../controllers/holidayController';

const holidayRoutes: ServerRoute[] = [
  {
    method: 'POST',
    path: '/api/holidays',
    handler: HolidayController.createHoliday,
    options: {
      auth: 'super_admin',
      description: 'Create a new holiday',
      tags: ['api', 'holidays'],
    },
  },
  {
    method: 'GET',
    path: '/api/holidays',
    handler: HolidayController.getAllHolidays,
    options: {
      auth: 'all_roles',
      description: 'Get all holidays',
      tags: ['api', 'holidays'],
    },
  },
  {
    method: 'GET',
    path: '/api/holidays/{id}',
    handler: HolidayController.getHolidayById,
    options: {
      auth: 'all_roles',
      description: 'Get holiday by ID',
      tags: ['api', 'holidays'],
    },
  },
  {
    method: 'PUT',
    path: '/api/holidays/{id}',
    handler: HolidayController.updateHoliday,
    options: {
      auth: 'super_admin',
      description: 'Update holiday',
      tags: ['api', 'holidays'],
    },
  },
  {
    method: 'DELETE',
    path: '/api/holidays/{id}',
    handler: HolidayController.deleteHoliday,
    options: {
      auth: 'super_admin',
      description: 'Delete holiday',
      tags: ['api', 'holidays'],
    },
  },
  {
    method: 'POST',
    path: '/api/holidays/bulk-create',
    handler: HolidayController.bulkCreateHolidays,
    options: {
      auth: 'super_admin',
      description: 'Bulk create holidays',
      tags: ['api', 'holidays'],
    },
  },
];

export default holidayRoutes;