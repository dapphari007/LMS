import { useQuery } from '@tanstack/react-query';
import { getEmployeeDashboard, getManagerDashboard } from '../services/dashboardService';
import { useAuth } from '../context/AuthContext';

export const useDashboard = () => {
  const { user } = useAuth();
  const isManager = user?.role === 'manager' || user?.role === 'admin';

  const employeeDashboardQuery = useQuery({
    queryKey: ['employeeDashboard'],
    queryFn: getEmployeeDashboard,
  });

  const managerDashboardQuery = useQuery({
    queryKey: ['managerDashboard'],
    queryFn: getManagerDashboard,
    enabled: isManager,
  });

  return {
    employeeDashboard: employeeDashboardQuery.data,
    managerDashboard: managerDashboardQuery.data,
    isLoading: employeeDashboardQuery.isLoading || (isManager && managerDashboardQuery.isLoading),
    isError: employeeDashboardQuery.isError || (isManager && managerDashboardQuery.isError),
    error: employeeDashboardQuery.error || (isManager && managerDashboardQuery.error),
  };
};