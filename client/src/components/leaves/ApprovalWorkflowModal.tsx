import React from 'react';
import Modal from '../ui/Modal';
import { LeaveRequest } from '../../types';
import { formatDate } from '../../utils/dateUtils';
import { renderStatusBadge } from '../../utils/leaveStatusUtils';

interface ApprovalWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  leaveRequest: LeaveRequest | null;
}

const ApprovalWorkflowModal: React.FC<ApprovalWorkflowModalProps> = ({
  isOpen,
  onClose,
  leaveRequest
}) => {
  if (!leaveRequest) return null;
  
  const metadata = leaveRequest.metadata || {};
  const approvalHistory = metadata.approvalHistory || [];
  const currentLevel = metadata.currentApprovalLevel || 0;
  const requiredLevels = metadata.requiredApprovalLevels || [];
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Approval Workflow Status"
      size="md"
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">
            {leaveRequest.user?.firstName} {leaveRequest.user?.lastName} - {leaveRequest.leaveType?.name}
          </h3>
          {renderStatusBadge(leaveRequest.status, metadata)}
        </div>
        
        <div className="text-sm text-gray-600">
          <p>Request Date: {leaveRequest.createdAt ? formatDate(leaveRequest.createdAt) : 'N/A'}</p>
          <p>Leave Period: {leaveRequest.startDate ? formatDate(leaveRequest.startDate) : 'N/A'} - {leaveRequest.endDate ? formatDate(leaveRequest.endDate) : 'N/A'}</p>
          <p>Duration: {leaveRequest.numberOfDays} day(s)</p>
          {leaveRequest.reason && (
            <p>Reason: {leaveRequest.reason}</p>
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
                      {approval.approvedAt ? formatDate(approval.approvedAt) : 'N/A'}
                    </p>
                    {approval.comments && (
                      <p className="text-sm mt-1 italic">"{approval.comments}"</p>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Pending approval levels */}
              {leaveRequest.status === "partially_approved" && (
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
              {leaveRequest.status === "pending" ? (
                <p>This request is awaiting approval.</p>
              ) : leaveRequest.status === "approved" ? (
                <p>This request was approved without a multi-level workflow.</p>
              ) : leaveRequest.status === "rejected" ? (
                <p>This request was rejected.</p>
              ) : (
                <p>No approval workflow information available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ApprovalWorkflowModal;