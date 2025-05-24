import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getMyLeaveRequests, GetLeaveRequestsResponse } from '../../services/leaveRequestService';
import { LeaveRequest } from '../../types';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import { formatDate } from '../../utils/dateUtils';
import { renderStatusBadge as renderStatusBadgeUtil } from '../../utils/leaveStatusUtils';
import ApprovalWorkflowModal from '../../components/leaves/ApprovalWorkflowModal';
import { useLeaveRequestActions } from '../../hooks/useLeaveRequestActions';
import { useLeaveFilters } from '../../hooks/useLeaveFilters';
import { getErrorMessage } from '../../utils/errorUtils';

const MyLeavesPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState<boolean>(false);
  const [selectedLeaveRequest, setSelectedLeaveRequest] = useState<LeaveRequest | null>(null);
  
  // Use the shared leave filters hook
  const {
    selectedYear,
    setSelectedYear,
    selectedStatus,
    setSelectedStatus,
    yearOptions,
    statusOptions
  } = useLeaveFilters();

  // Fetch leave requests
  const { data, isLoading, refetch, error: queryError } = useQuery<GetLeaveRequestsResponse>({
    queryKey: ['myLeaveRequests', selectedYear, selectedStatus],
    queryFn: () => getMyLeaveRequests({
      year: selectedYear,
      status: selectedStatus !== 'all' ? selectedStatus as any : undefined,
    }),
  });
  
  // Use the shared leave request actions hook
  const {
    error: actionError,
    setError: setActionError,
    successMessage: actionSuccessMessage,
    setSuccessMessage: setActionSuccessMessage,
    handleCancelRequest,
    handleDeleteRequest
  } = useLeaveRequestActions({ refetch });

  // Handle query error
  React.useEffect(() => {
    if (queryError) {
      setError(getErrorMessage(queryError));
    }
  }, [queryError]);

  // Sync error and success messages between local state and hook state
  React.useEffect(() => {
    if (actionError) {
      setError(actionError);
      setActionError(null);
    }
    if (actionSuccessMessage) {
      setSuccessMessage(actionSuccessMessage);
      setActionSuccessMessage(null);
    }
  }, [actionError, actionSuccessMessage, setActionError, setActionSuccessMessage]);
  
  // Handle view approval workflow
  const handleViewApprovalWorkflow = (leaveRequest: LeaveRequest) => {
    setSelectedLeaveRequest(leaveRequest);
    setIsApprovalModalOpen(true);
  };

  // Helper function to render leave status badge using the shared utility
  const renderStatusBadge = renderStatusBadgeUtil;

  // Use the shared approval workflow modal component

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">My Leave Requests</h1>
        <Link to="/apply-leave">
          <Button>Apply for Leave</Button>
        </Link>
      </div>
      
      <ApprovalWorkflowModal
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
        leaveRequest={selectedLeaveRequest}
      />

      {error && (
        <Alert 
          variant="error" 
          message={error} 
          onClose={() => setError(null)} 
          className="mb-6"
        />
      )}

      {successMessage && (
        <Alert 
          variant="success" 
          message={successMessage} 
          onClose={() => setSuccessMessage(null)} 
          className="mb-6"
        />
      )}

      <Card className="mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="w-full sm:w-auto">
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <select
              id="year"
              className="form-input"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full sm:w-auto">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              className="form-input"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {data?.leaveRequests && data.leaveRequests.length > 0 ? (
            data.leaveRequests.map((request: LeaveRequest) => (
              <Card key={request.id}>
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {request.leaveType?.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {request.startDate ? formatDate(request.startDate) : 'N/A'} - {request.endDate ? formatDate(request.endDate) : 'N/A'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-medium">Duration:</span> {request.numberOfDays} day(s)
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-medium">Type:</span> {request.requestType.replace('_', ' ')}
                    </p>
                    {request.reason && (
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="font-medium">Reason:</span> {request.reason}
                      </p>
                    )}
                    {request.approverComments && (
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="font-medium">Comments:</span> {request.approverComments}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {renderStatusBadge(request.status, request.metadata)}
                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleViewApprovalWorkflow(request)}
                      >
                        View Status
                      </Button>
                      {request.status === 'pending' && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleCancelRequest(request.id)}
                        >
                          Cancel Request
                        </Button>
                      )}
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleDeleteRequest(request.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card>
              <p className="text-center text-gray-500 py-8">
                No leave requests found for the selected filters.
              </p>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default MyLeavesPage;