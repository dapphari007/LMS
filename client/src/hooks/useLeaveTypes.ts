import { useQuery } from "@tanstack/react-query";
import { getLeaveTypes, getLeaveType } from "../services/leaveTypeService";

export const useLeaveTypes = () => {
  return useQuery({
    queryKey: ["leaveTypes"],
    queryFn: () => getLeaveTypes(),
  });
};

export const useLeaveType = (id: string | undefined) => {
  return useQuery({
    queryKey: ["leaveType", id],
    queryFn: async () => {
      if (!id) {
        throw new Error("Leave type ID is required");
      }
      console.log("Fetching leave type with ID:", id);
      const response = await getLeaveType(id);
      console.log("Leave type API response:", response);
      return response;
    },
    enabled: !!id,
    retry: 1,
  });
};
