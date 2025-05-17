import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getTeamLeaveRequests,
  updateLeaveRequestStatus,
  approveDeleteLeaveRequest,
  rejectDeleteLeaveRequest,
} from "../../services/leaveRequestService";
import { LeaveRequest, UpdateLeaveRequestStatusData } from "../../types";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import Textarea from "../../components/ui/Textarea";
import Modal from "../../components/ui/Modal";
import { formatDate } from "../../utils/dateUtils";
import { getErrorMessage } from "../../utils/errorUtils";
import { useAuth } from "../../context/AuthContext";

const TeamLeavesPage: React.FC = () => {
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedStatus, setSelectedStatus] = useState<string>("pending");
  const [comments, setComments] = useState<string>("");
  const [actionLeaveId, setActionLeaveId] = useState<string | null>(null);
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [isApprovingDeletion, setIsApprovingDeletion] = useState(false);
  const [isRejectingDeletion, setIsRejectingDeletion] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState<boolean>(false);
  const [selectedLeaveRequest, setSelectedLeaveRequest] = useState<LeaveRequest | null>(null);

  // Determine user role for approval level
  const userRole = user?.role || "";
  const isTeamLead = userRole === "team_lead";
  const isManager = userRole === "manager";
  const isHR = userRole === "hr";
  const isSuperAdmin = userRole === "super_admin";
  const isAdmin = userRole === "admin";

  // Determine approval level based on role
  const getApprovalLevel = () => {
    if (isTeamLead) return 1;
    if (isManager) return 2;
    if (isHR) return 3;
    if (isAdmin) return 4;
    if (isSuperAdmin) return 5;
    return 0;
  };
  
  // Check if the current user can approve a specific leave request
  const canApproveRequest = (request: LeaveRequest) => {
    const userApprovalLevel = getApprovalLevel();
    
    // If user has no approval level, they can't approve anything
    if (userApprovalLevel === 0) return false;
    
    // Super admins and admins can approve any request
    if (isSuperAdmin || isAdmin) return true;
    
    // For pending requests, only L1 approvers can approve
    if (request.status === "pending") {
      return userApprovalLevel === 1;
    }
    
    // For partially approved requests, check if the user's level matches the next required level
    if (request.status === "partially_approved" && request.metadata) {
      const currentApprovalLevel = request.metadata.currentApprovalLevel || 0;
      const nextRequiredLevel = currentApprovalLevel + 1;
      
      return userApprovalLevel === nextRequiredLevel;
    }
    
    return false;
  };

  // Fetch team leave requests
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["teamLeaveRequests", selectedYear, selectedStatus],
    queryFn: () => {
      // If status is "pending", also include "partially_approved" status
      // to show leave requests that need approval at higher levels
      if (selectedStatus === "pending") {
        return getTeamLeaveRequests({
          year: selectedYear,
          status: "pending_approval", // This is a special status that will fetch both pending and partially_approved
        });
      } else {
        return getTeamLeaveRequests({
          year: selectedYear,
          status: selectedStatus !== "all" ? (selectedStatus as any) : undefined,
        });
      }
    },
    onError: (err: any) => setError(getErrorMessage(err)),
  });

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
  
  // Handle view approval workflow
  const handleViewApprovalWorkflow = (leaveRequest: LeaveRequest) => {
    setSelectedLeaveRequest(leaveRequest);
    setIsApprovalModalOpen(true);
  };

  // Helper function to render leave status badge
  const renderStatusBadge = (status: string, metadata?: any) => {
    // If it's partially approved and has metadata, show the approval level status
    if (status === "partially_approved" && metadata) {
      const currentLevel = metadata.currentApprovalLevel || 0;
      
      return (
        <div className="flex flex-col">
          <Badge variant="warning">Partially Approved</Badge>
          <span className="text-xs text-gray-600 mt-1">
            L-{currentLevel} approved
          </span>
        </div>
      );
    }
    
    switch (status) {
      case "pending":
        return <Badge variant="warning">Pending</Badge>;
      case "approved":
        return <Badge variant="success">Approved</Badge>;
      case "rejected":
        return <Badge variant="danger">Rejected</Badge>;
      case "cancelled":
        return <Badge variant="default">Cancelled</Badge>;
      case "partially_approved":
        return <Badge variant="warning">Partially Approved</Badge>;
      case "pending_deletion":
        return <Badge variant="warning">Pending Deletion</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Generate year options for filter
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 3 }, (_, i) => currentYear - i);

  // Render approval workflow modal
  const renderApprovalWorkflowModal = () => {
    if (!selectedLeaveRequest) return null;
    
    const metadata = selectedLeaveRequest.metadata || {};
    const approvalHistory = metadata.approvalHistory || [];
    const currentLevel = metadata.currentApprovalLevel || 0;
    const requiredLevels = metadata.requiredApprovalLevels || [];
    
    return (
      <Modal
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
        title="Approval Workflow Status"
        size="md"
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">
              {selectedLeaveRequest.user?.firstName} {selectedLeaveRequest.user?.lastName} - {selectedLeaveRequest.leaveType?.name}
            </h3>
            {renderStatusBadge(selectedLeaveRequest.status, metadata)}
          </div>
          
          <div className="text-sm text-gray-600">
            <p>Request Date: {formatDate(selectedLeaveRequest.createdAt)}</p>
            <p>Leave Period: {formatDate(selectedLeaveRequest.startDate)} - {formatDate(selectedLeaveRequest.endDate)}</p>
            <p>Duration: {selectedLeaveRequest.numberOfDays} day(s)</p>
            {selectedLeaveRequest.reason && (
              <p>Reason: {selectedLeaveRequest.reason}</p>
            )}
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-medium mb-3">Approval Workflow</h4>
            
            {approvalHistory.length > 0 ? (
              <div className="space-y-3">
                {/* Completed approval levels */}
                {approvalHistory.map((approval: any, index: number) => (
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
                
                {/* Pending approval levels */}
                {selectedLeaveRequest.status === "partially_approved" && (
                  <>
                    {requiredLevels
                      .filter((level: number) => level > currentLevel)
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
            ) : (
              <div className="text-center py-4 text-gray-500">
                {selectedLeaveRequest.status === "pending" ? (
                  <p>This request is awaiting approval.</p>
                ) : selectedLeaveRequest.status === "approved" ? (
                  <p>This request was approved without a multi-level workflow.</p>
                ) : selectedLeaveRequest.status === "rejected" ? (
                  <p>This request was rejected.</p>
                ) : (
                  <p>No approval workflow information available.</p>
                )}
              </div>
            )}
          </div>
          
          <div className="flex justify-end mt-4">
            <Button 
              variant="secondary" 
              onClick={() => setIsApprovalModalOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Team Leave Requests
        </h1>
        <Badge variant="primary" className="text-sm">
          Approval Level: {getApprovalLevel()}
        </Badge>
      </div>
      
      {renderApprovalWorkflowModal()}

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
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
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
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              className="form-input"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="pending">Pending Approval</option>
              <option value="partially_approved">Partially Approved</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="cancelled">Cancelled</option>
              <option value="pending_deletion">Pending Deletion</option>
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
              <Card 
                key={request.id} 
                className={request.status === "partially_approved" ? "border-l-4 border-l-blue-500" : ""}
              >
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {request.user?.firstName} {request.user?.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Leave Type:</span>{" "}
                      {request.leaveType?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Duration:</span>{" "}
                      {formatDate(request.startDate)} -{" "}
                      {formatDate(request.endDate)} ({request.numberOfDays}{" "}
                      day(s))
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Type:</span>{" "}
                      {request.requestType.replace("_", " ")}
                    </p>
                    {request.reason && (
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Reason:</span>{" "}
                        {request.reason}
                      </p>
                    )}
                    
                    {request.status === "partially_approved" && request.metadata && (
                      <p className={`text-sm mt-1 ${canApproveRequest(request) ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                        {canApproveRequest(request) 
                          ? `This request needs your approval as L${request.metadata.currentApprovalLevel + 1}`
                          : `This request needs L${request.metadata.currentApprovalLevel + 1} approval`}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {renderStatusBadge(request.status, request.metadata)}

                    <div className="flex space-x-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleViewApprovalWorkflow(request)}
                      >
                        View Status
                      </Button>
                      
                      {(((request.status === "pending" || request.status === "partially_approved") && canApproveRequest(request)) || request.status === "pending_deletion") && (
                        <>
                          {actionLeaveId !== request.id ? (
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => setActionLeaveId(request.id)}
                            >
                              {request.status === "pending_deletion" 
                                ? "Review Deletion" 
                                : request.status === "partially_approved" 
                                  ? `Approve/Reject as L${request.metadata?.currentApprovalLevel + 1}` 
                                  : `Approve/Reject as L${getApprovalLevel()}`}
                            </Button>
                          ) : (
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => {
                                setActionLeaveId(null);
                                setComments("");
                              }}
                            >
                              Cancel
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {actionLeaveId === request.id && (
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <Textarea
                      label="Comments (optional)"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      placeholder="Add comments for the employee"
                      rows={2}
                    />
                    <div className="mt-4 flex justify-end space-x-2">
                      {request.status === "pending_deletion" ? (
                        <>
                          <Button
                            variant="danger"
                            size="sm"
                            isLoading={isRejectingDeletion}
                            onClick={() => handleRejectDeleteRequest(request.id)}
                          >
                            Reject Deletion
                          </Button>
                          <Button
                            variant="success"
                            size="sm"
                            isLoading={isApprovingDeletion}
                            onClick={() => handleApproveDeleteRequest(request.id)}
                          >
                            Approve Deletion
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="danger"
                            size="sm"
                            isLoading={isRejecting}
                            onClick={() => handleUpdateStatus(request.id, "rejected")}
                          >
                            Reject
                          </Button>
                          <Button
                            variant="success"
                            size="sm"
                            isLoading={isApproving}
                            onClick={() => handleUpdateStatus(request.id, "approved")}
                          >
                            Approve
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                )}
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

export default TeamLeavesPage;
