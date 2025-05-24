import { useState } from 'react';
import { 
  updateLeaveRequestStatus, 
  approveDeleteLeaveRequest, 
  rejectDeleteLeaveRequest 
} from '../services/leaveRequestService';
import { UpdateLeaveRequestStatusData } from '../types';
import { getErrorMessage } from '../utils/errorUtils';

interface UseTeamLeaveRequestHandlersProps {
  refetch: () => void;
}

export const useTeamLeaveRequestHandlers = ({ refetch }: UseTeamLeaveRequestHandlersProps) => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [actionLeaveId, setActionLeaveId] = useState<string | null>(null);
  const [comments, setComments] = useState<string>("");
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [isApprovingDeletion, setIsApprovingDeletion] = useState(false);
  const [isRejectingDeletion, setIsRejectingDeletion] = useState(false);

  // Handle approve/reject leave request
  const handleUpdateStatus = async (
    id: string,
    status: "pending" | "approved" | "rejected" | "cancelled"
  ) => {
    if (status === "approved") {
      setIsApproving(true);
    } else if (status === "rejected") {
      setIsRejecting(true);
    }

    try {
      const data: UpdateLeaveRequestStatusData = {
        status,
        comments: comments.trim() || undefined,
      };

      console.log("Sending request with data:", data);

      const response = await updateLeaveRequestStatus(id, data);
      console.log("Response received:", response);

      setSuccessMessage(`Leave request ${status} successfully`);
      setActionLeaveId(null);
      setComments("");
      refetch();
    } catch (err) {
      console.error("Error updating leave request status:", err);
      setError(getErrorMessage(err));
    } finally {
      setIsApproving(false);
      setIsRejecting(false);
    }
  };
  
  // Handle approve deletion request
  const handleApproveDeleteRequest = async (id: string) => {
    setIsApprovingDeletion(true);
    
    try {
      await approveDeleteLeaveRequest(id, comments.trim() || undefined);
      setSuccessMessage("Leave deletion request approved successfully");
      setActionLeaveId(null);
      setComments("");
      refetch();
    } catch (err) {
      console.error("Error approving leave deletion:", err);
      setError(getErrorMessage(err));
    } finally {
      setIsApprovingDeletion(false);
    }
  };
  
  // Handle reject deletion request
  const handleRejectDeleteRequest = async (id: string) => {
    setIsRejectingDeletion(true);
    
    try {
      await rejectDeleteLeaveRequest(id, comments.trim() || undefined);
      setSuccessMessage("Leave deletion request rejected successfully");
      setActionLeaveId(null);
      setComments("");
      refetch();
    } catch (err) {
      console.error("Error rejecting leave deletion:", err);
      setError(getErrorMessage(err));
    } finally {
      setIsRejectingDeletion(false);
    }
  };

  return {
    error,
    setError,
    successMessage,
    setSuccessMessage,
    actionLeaveId,
    setActionLeaveId,
    comments,
    setComments,
    isApproving,
    isRejecting,
    isApprovingDeletion,
    isRejectingDeletion,
    handleUpdateStatus,
    handleApproveDeleteRequest,
    handleRejectDeleteRequest
  };
};