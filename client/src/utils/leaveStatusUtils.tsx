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
  
  // Assign approval levels based on role hierarchy
  if (isTeamLead) return 1;
  if (isManager) return 2;
  if (isHR) return 3;
  if (isAdmin || hasCustomAdminRole) return 4;
  if (isSuperAdmin) return 5;
  return 0;
};

/**
 * Checks if a user can approve a specific leave request based on approval workflow
 * @param userRole The user's role
 * @param hasCustomAdminRole Whether the user has custom admin permissions
 * @param requestStatus The leave request status
 * @param metadata The leave request metadata containing approval workflow information
 * @returns Boolean indicating if the user can approve the request
 */
export const canApproveRequest = (
  userRole: string,
  hasCustomAdminRole: boolean = false,
  requestStatus: string,
  metadata?: LeaveRequestMetadata
): boolean => {
  const userApprovalLevel = getApprovalLevel(userRole, hasCustomAdminRole);
  const isAdmin = userRole === "admin";
  const isSuperAdmin = userRole === "super_admin";
  const isTeamLead = userRole === "team_lead";
  
  console.log(`canApproveRequest called with:`, {
    userRole,
    hasCustomAdminRole,
    requestStatus,
    metadata,
    userApprovalLevel
  });
  
  // If user has no approval level, they can't approve anything
  if (userApprovalLevel === 0) {
    console.log('User has no approval level');
    return false;
  }
  
  // Super admins and admins can approve any request, but we'll still log it
  if (isSuperAdmin || isAdmin || hasCustomAdminRole) {
    console.log('User is admin or super admin');
    return true;
  }
  
  // For pending deletion requests, only admins and super admins can approve
  if (requestStatus === "pending_deletion") {
    console.log('Request is pending deletion, only admins can approve');
    return isAdmin || isSuperAdmin || hasCustomAdminRole;
  }
  
  // For initial pending requests (no approval history yet)
  if (requestStatus === "pending") {
    console.log(`Processing initial pending request by ${userRole} with level ${userApprovalLevel}`);
    
    // If there's a custom approval workflow defined
    if (metadata && metadata.requiredApprovalLevels && metadata.requiredApprovalLevels.length > 0) {
      // Get the first required approval level
      const firstRequiredLevel = Math.min(...metadata.requiredApprovalLevels);
      console.log(`First required approval level: ${firstRequiredLevel}, user level: ${userApprovalLevel}`);
      
      // Check for special cases based on the request user's role
      if (metadata.requestUserRole) {
        // If request is from a Manager and approver is HR
        if (metadata.requestUserRole === 'manager' && userRole === 'hr') {
          console.log('HR can approve manager request');
          return true;
        }
        
        // If request is from HR and approver is Super Admin
        if (metadata.requestUserRole === 'hr' && userRole === 'super_admin') {
          console.log('Super Admin can approve HR request');
          return true;
        }
        
        // If request is from a Team Lead and approver is a Manager
        if (metadata.requestUserRole === 'team_lead' && userRole === 'manager') {
          console.log('Manager can approve team lead request');
          return true;
        }
      }
      
      // User can approve if their level matches the first required level
      const canApprove = userApprovalLevel === firstRequiredLevel;
      
      if (canApprove) {
        console.log(`User with role ${userRole} can approve as their level ${userApprovalLevel} matches the first required level ${firstRequiredLevel}`);
      } else {
        console.log(`User with role ${userRole} cannot approve as their level ${userApprovalLevel} does not match the first required level ${firstRequiredLevel}`);
      }
      
      return canApprove;
    } else {
      // Check if the request is from a team lead and the approver is a manager
      if (metadata && metadata.requestUserRole === 'team_lead' && userRole === 'manager') {
        console.log('Manager can approve team lead request');
        return true;
      }
      
      // If no custom workflow, only team leads can approve initial requests
      if (isTeamLead) {
        console.log('Team lead can approve initial pending request');
        return true;
      }
      
      console.log('Only team leads can approve initial pending requests');
      return false;
    }
  }
  
  // For partially approved requests, strictly enforce the approval hierarchy
  if (requestStatus === "partially_approved" && metadata) {
    const currentApprovalLevel = metadata.currentApprovalLevel || 0;
    
    // If there's a custom approval workflow defined
    if (metadata.requiredApprovalLevels && metadata.requiredApprovalLevels.length > 0) {
      // Sort the required levels to ensure they're in ascending order
      const sortedLevels = [...metadata.requiredApprovalLevels].sort((a, b) => a - b);
      
      // Find the next required level in the workflow
      const nextRequiredLevel = sortedLevels.find(level => level > currentApprovalLevel);
      
      console.log(`Processing partially approved request with custom workflow:`, {
        userRole,
        currentApprovalLevel,
        nextRequiredLevel,
        requiredLevels: sortedLevels,
        userApprovalLevel,
        requestUserRole: metadata.requestUserRole
      });
      
      // If there's no next level, the request is fully approved at all required levels
      if (!nextRequiredLevel) {
        console.log('No next level required, request is fully approved at all required levels');
        return false;
      }
      
      // Check for special cases based on the request user's role
      if (metadata.requestUserRole) {
        // If request is from a Manager and approver is HR
        if (metadata.requestUserRole === 'manager' && userRole === 'hr') {
          console.log('HR can approve manager request in partially approved state');
          return true;
        }
        
        // If request is from HR and approver is Super Admin
        if (metadata.requestUserRole === 'hr' && userRole === 'super_admin') {
          console.log('Super Admin can approve HR request in partially approved state');
          return true;
        }
        
        // If request is from a Team Lead and approver is a Manager
        if (metadata.requestUserRole === 'team_lead' && userRole === 'manager') {
          console.log('Manager can approve team lead request in partially approved state');
          return true;
        }
      }
      
      // User can approve only if their level exactly matches the next required level
      const canApprove = userApprovalLevel === nextRequiredLevel;
      
      if (canApprove) {
        console.log(`User with role ${userRole} can approve as their level ${userApprovalLevel} matches the required next level ${nextRequiredLevel}`);
      } else {
        console.log(`User with role ${userRole} cannot approve as their level ${userApprovalLevel} does not match the required next level ${nextRequiredLevel}`);
      }
      
      return canApprove;
    } else {
      // If no custom workflow, use the default sequential workflow
      const nextRequiredLevel = currentApprovalLevel + 1;
      
      console.log(`Processing partially approved request with default workflow:`, {
        userRole,
        currentApprovalLevel,
        nextRequiredLevel,
        userApprovalLevel,
        requestUserRole: metadata.requestUserRole
      });
      
      // Check for special cases based on the request user's role
      if (metadata.requestUserRole) {
        // If request is from a Manager and approver is HR
        if (metadata.requestUserRole === 'manager' && userRole === 'hr') {
          console.log('HR can approve manager request in default workflow');
          return true;
        }
        
        // If request is from HR and approver is Super Admin
        if (metadata.requestUserRole === 'hr' && userRole === 'super_admin') {
          console.log('Super Admin can approve HR request in default workflow');
          return true;
        }
        
        // If request is from a Team Lead and approver is a Manager
        if (metadata.requestUserRole === 'team_lead' && userRole === 'manager') {
          console.log('Manager can approve team lead request in default workflow');
          return true;
        }
      }
      
      // User can approve only if their level exactly matches the next required level
      const canApprove = userApprovalLevel === nextRequiredLevel;
      
      if (canApprove) {
        console.log(`User with role ${userRole} can approve as their level ${userApprovalLevel} matches the required next level ${nextRequiredLevel}`);
      } else {
        console.log(`User with role ${userRole} cannot approve as their level ${userApprovalLevel} does not match the required next level ${nextRequiredLevel}`);
      }
      
      return canApprove;
    }
  }
  
  console.log('No approval condition met');
  return false;
};