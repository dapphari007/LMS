import { useQuery } from '@tanstack/react-query';
import { getMyLeaveRequests, getTeamLeaveRequests, GetLeaveRequestsParams } from '../services/leaveRequestService';

export const useMyLeaveRequests = (params?: GetLeaveRequestsParams) => {
  return useQuery({
    queryKey: ['myLeaveRequests', params],
    queryFn: () => getMyLeaveRequests(params),
  });
};

export const useTeamLeaveRequests = (params?: GetLeaveRequestsParams) => {
  return useQuery({
    queryKey: ['teamLeaveRequests', params],
    queryFn: () => getTeamLeaveRequests(params),
    refetchInterval: 60000, // Refetch every minute to keep team leave requests up to date
  });
};