import { useQuery } from "@tanstack/react-query";
import {
  getMyLeaveBalances,
  getUserLeaveBalances,
  GetLeaveBalancesParams,
} from "../services/leaveBalanceService";

export const useMyLeaveBalances = (params?: GetLeaveBalancesParams) => {
  return useQuery({
    queryKey: ["myLeaveBalances", params],
    queryFn: () => getMyLeaveBalances(params),
  });
};

export const useUserLeaveBalances = (
  userId: string,
  params?: GetLeaveBalancesParams
) => {
  return useQuery({
    queryKey: ["userLeaveBalances", userId, params],
    queryFn: () => getUserLeaveBalances(userId, params),
    enabled: !!userId,
  });
};
