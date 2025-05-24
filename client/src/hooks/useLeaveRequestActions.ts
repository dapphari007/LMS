import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  cancelLeaveRequest, 
  deleteLeaveRequest 
} from '../services/leaveRequestService';
import { getErrorMessage } from '../utils/errorUtils';

interface UseLeaveRequestActionsProps {
  refetch: () => void;
}

/**
 * A custom hook for handling common leave request actions
 * like cancellation and deletion
 */
export const useLeaveRequestActions = ({ refetch }: UseLeaveRequestActionsProps) => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  // Handle cancel leave request
  const handleCancelRequest = async (id: string) => {
    try {
      await cancelLeaveRequest(id);
      setSuccessMessage('Leave request cancelled successfully');
      refetch();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };
  
  // Handle delete leave request
  const handleDeleteRequest = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this leave request? If it was approved, you will need to go through the approval process again for a new request.')) {
      try {
        await deleteLeaveRequest(id);
        setSuccessMessage('Leave request deleted successfully. If it was approved, the leave balance has been restored.');
        refetch();
      } catch (err) {
        setError(getErrorMessage(err));
      }
    }
  };

  // Navigate to view leave request page
  const navigateToLeaveRequest = (id: string) => {
    navigate(`/leave-requests/${id}`);
  };

  return {
    error,
    setError,
    successMessage,
    setSuccessMessage,
    handleCancelRequest,
    handleDeleteRequest,
    navigateToLeaveRequest
  };
};