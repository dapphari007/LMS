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
      try {
        // Add more detailed logging
        console.log(`About to call getLeaveType with ID: ${id}`);
        const response = await getLeaveType(id);
        console.log("Leave type API response:", response);
        
        // If the response contains a message but no leave type, it's likely a 404 that was handled gracefully
        if (!response) {
          console.error("No response received from server");
          throw new Error("Invalid response from server");
        }
        
        // If there's no leave type but there is a message, throw an error with the message
        if (!response.leaveType && response.message) {
          console.error(`Error message from server: ${response.message}`);
          throw new Error(response.message);
        }
        
        // Return the response (which should contain a valid leave type at this point)
        console.log("Successfully retrieved leave type:", response.leaveType);
        return response;
      } catch (error) {
        console.error("Error fetching leave type:", error);
        throw error;
      }
    },
    enabled: !!id,
    retry: 1,
    staleTime: 30000, // Data remains fresh for 30 seconds
    retryDelay: 1000, // Wait 1 second between retries
  });
};
