import Badge from '../components/ui/Badge';

// Type for leave request status
export type LeaveRequestStatus = 
  | "pending" 
  | "approved" 
  | "rejected" 
  | "cancelled" 
  | "partially_approved"
  | "pending_deletion";

// Type for metadata
export interface LeaveRequestMetadata {
  currentApprovalLevel?: number;
  requiredApprovalLevels?: number[];
  approvalHistory?: any[];
  [key: string]: any;
}

/**
 * Renders a status badge for leave requests
 * @param status The leave request status
 * @param metadata Optional metadata for partially approved requests
 * @returns JSX element with appropriate badge
 */
export const renderStatusBadge = (status: string, metadata?: LeaveRequestMetadata) => {
  // If it's partially approved and has metadata, show the approval level status
  if (status === "partially_approved" && metadata) {
    const currentLevel = metadata.currentApprovalLevel || 0;
    
    return (
      <div className="flex flex-col items-end">
        <Badge variant="warning">Partially Approved</Badge>
        <span className="text-xs text-gray-600 mt-1">
          L-{currentLevel} approved, L-{currentLevel + 1} pending
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

/**
 * Determines the approval level based on user role
 * @param userRole The user's role
 * @param hasCustomAdminRole Whether the user has custom admin permissions
 * @returns Numeric approval level (0-5)
 */
export const getApprovalLevel = (
  userRole: string,
  hasCustomAdminRole: boolean = false
): number => {
  const isTeamLead = userRole === "team_lead";
  const isManager = userRole === "manager";
  const isHR = userRole === "hr";
  const isAdmin = userRole === "admin";
  const isSuperAdmin = userRole === "super_admin";
  
  if (isTeamLead) return 1;
  if (isManager) return 2;
  if (isHR) return 3;
  if (isAdmin || hasCustomAdminRole) return 4;
  if (isSuperAdmin) return 5;
  return 0;
};

/**
 * Checks if a user can approve a specific leave request
 * @param userRole The user's role
 * @param hasCustomAdminRole Whether the user has custom admin permissions
 * @param requestStatus The leave request status
 * @param metadata The leave request metadata
 * @param requestUserRole Optional: The role of the user who made the request
 * @returns Boolean indicating if the user can approve the request
 */
export const canApproveRequest = (
  userRole: string,
  hasCustomAdminRole: boolean = false,
  requestStatus: string,
  metadata?: LeaveRequestMetadata,
  requestUserRole?: string
): boolean => {
  const userApprovalLevel = getApprovalLevel(userRole, hasCustomAdminRole);
  const isAdmin = userRole === "admin";
  const isSuperAdmin = userRole === "super_admin";
  const isManager = userRole === "manager";
  
  // If user has no approval level, they can't approve anything
  if (userApprovalLevel === 0) return false;
  
  // Super admins and admins can approve any request
  if (isSuperAdmin || isAdmin || hasCustomAdminRole) return true;
  
  // Special case for Team Lead requests - Managers can approve them directly
  if (requestUserRole === "team_lead" && isManager && requestStatus === "pending") {
    return true;
  }
  
  // Special case for Manager requests - HR can approve them directly
  if (requestUserRole === "manager" && userRole === "hr" && requestStatus === "pending") {
    return true;
  }
  
  // Special case for HR requests - Admins can approve them directly
  if (requestUserRole === "hr" && (userRole === "admin" || userRole === "super_admin") && requestStatus === "pending") {
    return true;
  }
  
  // For pending requests, only L1 approvers can approve (unless it's a special case)
  if (requestStatus === "pending") {
    return userApprovalLevel === 1;
  }
  
  // For partially approved requests, check if the user's level matches the next required level
  if (requestStatus === "partially_approved" && metadata) {
    const currentApprovalLevel = metadata.currentApprovalLevel || 0;
    const nextRequiredLevel = currentApprovalLevel + 1;
    
    return userApprovalLevel === nextRequiredLevel;
  }
  
  return false;
};