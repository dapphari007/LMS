import { get } from './api';
import { EmployeeDashboard, ManagerDashboard } from '../types';

export const getManagerDashboard = async (): Promise<ManagerDashboard> => {
  try {
    console.log('Fetching manager dashboard data...');
    const data = await get<ManagerDashboard>('/dashboard/manager');
    console.log('Manager dashboard data fetched successfully');
    return data;
  } catch (error) {
    console.error('Error fetching manager dashboard:', error);
    throw error;
  }
};

export const getEmployeeDashboard = async (): Promise<EmployeeDashboard> => {
  try {
    console.log('Fetching employee dashboard data...');
    const data = await get<EmployeeDashboard>('/dashboard/employee');
    console.log('Employee dashboard data fetched successfully');
    return data;
  } catch (error) {
    console.error('Error fetching employee dashboard:', error);
    throw error;
  }
};

export const getHRDashboard = async (): Promise<ManagerDashboard> => {
  try {
    console.log('Fetching HR dashboard data...');
    const data = await get<ManagerDashboard>('/dashboard/hr');
    console.log('HR dashboard data fetched successfully');
    return data;
  } catch (error) {
    console.error('Error fetching HR dashboard:', error);
    throw error;
  }
};