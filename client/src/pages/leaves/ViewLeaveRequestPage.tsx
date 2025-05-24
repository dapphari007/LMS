import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLeaveRequest } from "../../services/leaveRequestService";
import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../utils/dateUtils";
import { renderStatusBadge as renderStatusBadgeUtil, getApprovalLevel as getApprovalLevelUtil, canApproveRequest as canApproveRequestUtil } from "../../utils/leaveStatusUtils";
import { 
  useUpdateLeaveStatusMutation,
  useCancelLeaveMutation,
  useDeleteLeaveMutation,
  useApproveDeleteLeaveMutation,
  useRejectDeleteLeaveMutation
} from "../../hooks/useLeaveRequestMutations";

export default function ViewLeaveRequestPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [leaveRequest, setLeaveRequest] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [approvalComment, setApprovalComment] = useState("");

  const isTeamLead = user?.role === "team_lead";
  const isManager = user?.role === "manager";
  const isHR = user?.role === "hr";
  const isSuperAdmin = user?.role === "admin" || user?.role === "super_admin";
  const isOwnRequest = leaveRequest?.userId === user?.id;
  const isPending = leaveRequest?.status === "pending";
  const isPartiallyApproved = leaveRequest?.status === "partially_approved";
  const isPendingDeletion = leaveRequest?.status === "pending_deletion";
  
  // Get approval level using the shared utility
  const getApprovalLevel = () => {
    return getApprovalLevelUtil(user?.role || '');
  };
  
  // Check if current user is eligible to approve at the next level in the workflow
  const canApproveRequest = useMemo(() => {
    if (!leaveRequest) return false;
    
    const hasCustomAdminRole = user?.roleObj?.permissions?.includes('admin') || false;
    return canApproveRequestUtil(
      user?.role || '', 
      hasCustomAdminRole,
      leaveRequest.status,
      leaveRequest.metadata
    );
  }, [user, leaveRequest]);

  useEffect(() => {
    const fetchLeaveRequest = async () => {
      try {
        setIsLoading(true);
        const response = await getLeaveRequest(id as string);
        setLeaveRequest(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load leave request");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchLeaveRequest();
    }
  }, [id]);

  // Use the shared mutation hooks with proper error handling
  const updateStatusMutation = useUpdateLeaveStatusMutation(
    id as string, 
    () => {
      // Refresh the current leave request data
      getLeaveRequest(id as string).then((response) => {
        setLeaveRequest(response.data);
      });
    },
    (err: any) => {
      setError(err.response?.data?.message || "Failed to update leave request status");
    }
  );

  const cancelMutation = useCancelLeaveMutation(
    id as string, 
    () => {
      // Refresh the current leave request data
      getLeaveRequest(id as string).then((response) => {
        setLeaveRequest(response.data);
      });
    },
    (err: any) => {
      setError(err.response?.data?.message || "Failed to cancel leave request");
    }
  );
  
  const deleteMutation = useDeleteLeaveMutation(
    id as string,
    undefined,
    (err: any) => {
      setError(err.response?.data?.message || "Failed to delete leave request");
    }
  );
  
  const approveDeleteMutation = useApproveDeleteLeaveMutation(
    id as string,
    undefined,
    (err: any) => {
      setError(err.response?.data?.message || "Failed to approve leave deletion");
    }
  );
  
  const rejectDeleteMutation = useRejectDeleteLeaveMutation(
    id as string, 
    () => {
      // Refresh the current leave request data
      getLeaveRequest(id as string).then((response) => {
        setLeaveRequest(response.data);
      });
    },
    (err: any) => {
      setError(err.response?.data?.message || "Failed to reject leave deletion");
    }
  );

  const handleApprove = () => {
    updateStatusMutation.mutate({
      status: "approved",
      comment: approvalComment,
    });
  };

  const handleReject = () => {
    updateStatusMutation.mutate({
      status: "rejected",
      comment: approvalComment,
    });
  };

  const handleCancel = () => {
    cancelMutation.mutate();
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this leave request? If it was approved, you will need to go through the approval process again for a new request.')) {
      deleteMutation.mutate();
    }
  };
  
  const handleApproveDelete = () => {
    if (window.confirm('Are you sure you want to approve this leave deletion request? This will permanently delete the leave request and restore the leave balance.')) {
      approveDeleteMutation.mutate(approvalComment || undefined);
    }
  };
  
  const handleRejectDelete = () => {
    if (window.confirm('Are you sure you want to reject this leave deletion request? The leave request will be restored to its original status.')) {
      rejectDeleteMutation.mutate(approvalComment || undefined);
    }
  };

  // Use the shared status badge renderer
  const renderStatusBadge = renderStatusBadgeUtil;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!leaveRequest) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Leave request not found or you don't have permission to view it.
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Leave Request Details</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
        >
          Back
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-semibold">
                {leaveRequest.leaveType?.name}
              </h2>
              <p className="text-gray-600">
                {formatDate(leaveRequest.startDate)} -{" "}
                {formatDate(leaveRequest.endDate)}
              </p>
            </div>
            <div>{renderStatusBadge(leaveRequest.status, leaveRequest.metadata)}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Request Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span>
                    {leaveRequest.duration}{" "}
                    {leaveRequest.duration === 1 ? "day" : "days"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Half Day:</span>
                  <span>{leaveRequest.isHalfDay ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Submitted On:</span>
                  <span>{formatDate(leaveRequest.createdAt)}</span>
                </div>
                {leaveRequest.status !== "pending" && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span>{formatDate(leaveRequest.updatedAt)}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Employee Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span>
                    {leaveRequest.user?.firstName} {leaveRequest.user?.lastName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span>{leaveRequest.user?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Department:</span>
                  <span>{leaveRequest.user?.department || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Position:</span>
                  <span>{leaveRequest.user?.position || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Reason</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p>{leaveRequest.reason || "No reason provided."}</p>
            </div>
          </div>

          {leaveRequest.status !== "pending" && leaveRequest.approverComments && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">
                {leaveRequest.status === "approved" || leaveRequest.status === "partially_approved" 
                  ? "Approval" 
                  : leaveRequest.status === "rejected" 
                    ? "Rejection" 
                    : "Status"}{" "}
                Comment
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>{leaveRequest.approverComments}</p>
              </div>
            </div>
          )}
          
          {/* Approval Workflow History */}
          {leaveRequest.metadata && leaveRequest.metadata.approvalHistory && leaveRequest.metadata.approvalHistory.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Approval Workflow</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-3">
                  {leaveRequest.metadata.approvalHistory.map((approval: any, index: number) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">
                          Level {approval.level} - Approved by {approval.approverName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatDate(approval.approvedAt)}
                        </p>
                        {approval.comments && (
                          <p className="text-sm mt-1 italic">"{approval.comments}"</p>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Show pending levels if partially approved */}
                  {leaveRequest.status === "partially_approved" && leaveRequest.metadata.currentApprovalLevel && leaveRequest.metadata.requiredApprovalLevels && (
                    <>
                      {leaveRequest.metadata.requiredApprovalLevels
                        .filter((level: number) => level > leaveRequest.metadata.currentApprovalLevel)
                        .map((level: number) => (
                          <div key={`pending-${level}`} className="flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium text-gray-600">
                                Level {level} - Pending Approval
                              </p>
                            </div>
                          </div>
                        ))
                      }
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Approval Actions */}
          {!isOwnRequest && canApproveRequest && (
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-lg font-medium mb-4">Approval Actions (Step {getApprovalLevel()})</h3>
              
              {isPartiallyApproved && leaveRequest?.metadata && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-md mb-4">
                  <p className="text-blue-800">
                    This leave request has been partially approved (Step {leaveRequest.metadata.currentApprovalLevel}) and requires your approval as Step {leaveRequest.metadata.currentApprovalLevel + 1}.
                  </p>
                </div>
              )}
              
              {isPending && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-md mb-4">
                  <p className="text-blue-800">
                    This leave request is pending your approval as L{getApprovalLevel()}.
                  </p>
                </div>
              )}
              
              {/* Debug information - remove in production */}
              <div className="bg-gray-100 p-4 rounded-md mb-4 text-xs">
                <p><strong>Debug Info:</strong></p>
                <p>User Role: {user?.role}</p>
                <p>User Approval Level: L{getApprovalLevel()}</p>
                <p>Request Status: {leaveRequest?.status}</p>
                <p>Is Team Lead: {isTeamLead ? 'Yes' : 'No'}</p>
                <p>Is Manager: {isManager ? 'Yes' : 'No'}</p>
                <p>Is HR: {isHR ? 'Yes' : 'No'}</p>
                <p>Is Super Admin: {isSuperAdmin ? 'Yes' : 'No'}</p>
                <p>Is Partially Approved: {isPartiallyApproved ? 'Yes' : 'No'}</p>
                <p>Can Approve Request: {canApproveRequest ? 'Yes' : 'No'}</p>
                {leaveRequest?.metadata && (
                  <>
                    <p>Current Approval Step: {leaveRequest.metadata.currentApprovalLevel}</p>
                    <p>Next Required Step: {leaveRequest.metadata.currentApprovalLevel + 1}</p>
                    <p>Required Approval Steps: {JSON.stringify(leaveRequest.metadata.requiredApprovalLevels)}</p>
                  </>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Comment (Optional)
                </label>
                <textarea
                  value={approvalComment}
                  onChange={(e) => setApprovalComment(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows={3}
                  placeholder="Add a comment about your decision..."
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleApprove}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  disabled={updateStatusMutation.isPending}
                >
                  {updateStatusMutation.isPending ? "Processing..." : "Approve"}
                </button>
                <button
                  onClick={handleReject}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  disabled={updateStatusMutation.isPending}
                >
                  {updateStatusMutation.isPending ? "Processing..." : "Reject"}
                </button>
              </div>
            </div>
          )}
          
          {/* Manager Deletion Approval Actions */}
          {isManager && !isOwnRequest && isPendingDeletion && (
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-lg font-medium mb-4">Deletion Request Actions</h3>
              
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md mb-4">
                <p className="text-yellow-800">
                  The employee has requested to delete this leave request. If approved, the leave will be permanently deleted and any leave balance will be restored.
                </p>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Comment (Optional)
                </label>
                <textarea
                  value={approvalComment}
                  onChange={(e) => setApprovalComment(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows={3}
                  placeholder="Add a comment about your decision..."
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleApproveDelete}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  disabled={approveDeleteMutation.isPending}
                >
                  {approveDeleteMutation.isPending ? "Processing..." : "Approve Deletion"}
                </button>
                <button
                  onClick={handleRejectDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  disabled={rejectDeleteMutation.isPending}
                >
                  {rejectDeleteMutation.isPending ? "Processing..." : "Reject Deletion"}
                </button>
              </div>
            </div>
          )}

          {/* Employee Actions */}
          {isOwnRequest && (
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-lg font-medium mb-4">Actions</h3>
              
              <div className="flex gap-4">
                {isPending && (
                  <button
                    onClick={handleCancel}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                    disabled={cancelMutation.isPending}
                  >
                    {cancelMutation.isPending ? "Cancelling..." : "Cancel Request"}
                  </button>
                )}
                
                <button
                  onClick={handleDelete}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? "Deleting..." : "Delete Request"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
