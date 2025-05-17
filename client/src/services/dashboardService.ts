import { get } from './api';
import { EmployeeDashboard, ManagerDashboard } from '../types';

export const getManagerDashboard = async (): Promise<ManagerDashboard> => {
  return get<ManagerDashboard>('/dashboard/manager');
};

export const getEmployeeDashboard = async (): Promise<EmployeeDashboard> => {
  return get<EmployeeDashboard>('/dashboard/employee');
};