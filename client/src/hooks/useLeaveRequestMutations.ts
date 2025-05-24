import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateLeaveRequestStatus,
  cancelLeaveRequest,
  deleteLeaveRequest,
  approveDeleteLeaveRequest,
  rejectDeleteLeaveRequest,
  getLeaveRequest
} from "../services/leaveRequestService";
import { useNavigate } from "react-router-dom";

// Type for leave request status
export type LeaveRequestStatus = "pending" | "approved" | "rejected" | "cancelled" | "partially_approved";

// Hook for invalidating common queries
export const useInvalidateLeaveQueries = () => {
  const queryClient = useQueryClient();
  
  return (id?: string) => {
    // Common invalidations for all leave-related mutations
    queryClient.invalidateQueries({ queryKey: ["leaveRequests"] });
    queryClient.invalidateQueries({ queryKey: ["myLeaveRequests"] });
    
    // Conditional invalidations
    if (id) {
      queryClient.invalidateQueries({ queryKey: ["leaveRequest", id] });
    }
    
    // Team leave requests are only needed for some operations
    queryClient.invalidateQueries({ queryKey: ["teamLeaveRequests"] });
  };
};

// Hook for update status mutation
export const useUpdateLeaveStatusMutation = (id: string, onSuccess?: () => void, onError?: (error: Error) => void) => {
  const queryClient = useQueryClient();
  const invalidateQueries = useInvalidateLeaveQueries();
  
  return useMutation({
    mutationFn: ({ status, comment }: { status: LeaveRequestStatus; comment: string }) =>
      updateLeaveRequestStatus(id, { status, comments: comment }),
    onSuccess: () => {
      invalidateQueries(id);
      
      // Refresh the current leave request data
      if (id) {
        getLeaveRequest(id).then((response) => {
          // Store in query cache
          queryClient.setQueryData(["leaveRequest", id], response);
        });
      }
      
      // Call additional success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: onError
  });
};

// Hook for cancel leave request mutation
export const useCancelLeaveMutation = (id: string, onSuccess?: () => void, onError?: (error: Error) => void) => {
  const queryClient = useQueryClient();
  const invalidateQueries = useInvalidateLeaveQueries();
  
  return useMutation({
    mutationFn: () => cancelLeaveRequest(id),
    onSuccess: () => {
      invalidateQueries(id);
      
      // Refresh the current leave request data
      if (id) {
        getLeaveRequest(id).then((response) => {
          queryClient.setQueryData(["leaveRequest", id], response);
        });
      }
      
      // Call additional success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: onError
  });
};

// Hook for delete leave request mutation
export const useDeleteLeaveMutation = (id: string, onSuccess?: () => void, onError?: (error: Error) => void) => {
  const navigate = useNavigate();
  const invalidateQueries = useInvalidateLeaveQueries();
  
  return useMutation({
    mutationFn: () => deleteLeaveRequest(id),
    onSuccess: () => {
      invalidateQueries();
      
      // Call additional success callback if provided
      if (onSuccess) {
        onSuccess();
      } else {
        // Navigate back after successful deletion
        navigate("/my-leaves", { 
          state: { message: "Leave request deleted successfully. If it was approved, the leave balance has been restored." } 
        });
      }
    },
    onError: onError
  });
};

// Hook for approve delete leave request mutation
export const useApproveDeleteLeaveMutation = (id: string, onSuccess?: () => void, onError?: (error: Error) => void) => {
  const navigate = useNavigate();
  const invalidateQueries = useInvalidateLeaveQueries();
  
  return useMutation({
    mutationFn: (comment?: string) => approveDeleteLeaveRequest(id, comment),
    onSuccess: () => {
      invalidateQueries();
      
      // Call additional success callback if provided
      if (onSuccess) {
        onSuccess();
      } else {
        // Navigate back after successful approval
        navigate("/team-leaves", { 
          state: { message: "Leave deletion request approved successfully. The leave balance has been restored." } 
        });
      }
    },
    onError: onError
  });
};

// Hook for reject delete leave request mutation
export const useRejectDeleteLeaveMutation = (id: string, onSuccess?: () => void, onError?: (error: Error) => void) => {
  const queryClient = useQueryClient();
  const invalidateQueries = useInvalidateLeaveQueries();
  
  return useMutation({
    mutationFn: (comment?: string) => rejectDeleteLeaveRequest(id, comment),
    onSuccess: () => {
      invalidateQueries(id);
      
      // Refresh the current leave request data
      if (id) {
        getLeaveRequest(id).then((response) => {
          queryClient.setQueryData(["leaveRequest", id], response);
        });
      }
      
      // Call additional success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: onError
  });
};