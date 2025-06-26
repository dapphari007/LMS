import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ApprovalWorkflow } from '../../services/approvalWorkflowService';
import { getApprovalWorkflowForDuration } from '../../services/approvalWorkflowService';
import { getUserApprovers, getHRUsers } from '../../services/userService';
import Card from '../ui/Card';
import { useAuth } from '../../context/AuthContext';

// Define the ApprovalLevel type to avoid repeating the type definition
interface ApprovalLevel {
  level: number;
  roles: string[];
  approverType?: string;
  roleIds?: string[];
  fallbackRoles?: string[];
  departmentSpecific?: boolean;
  required?: boolean;
}

interface ApprovalWorkflowPreviewProps {
  duration: number;
  isLoading?: boolean;
  workflow?: ApprovalWorkflow | null; // Add workflow prop
}

interface Approver {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  level: number;
  isFallback?: boolean;
}

const ApprovalWorkflowPreview: React.FC<ApprovalWorkflowPreviewProps> = ({ 
  duration, 
  isLoading,
  workflow // Accept the workflow prop
}) => {
  const [approvers, setApprovers] = useState<Approver[]>([]);
  const { user } = useAuth(); // Get the current user
  const userRole = user?.role || '';
  const isTeamLead = userRole === 'team_lead';
  const isManager = userRole === 'manager';
  const isHR = userRole === 'hr';
  
  // Use the provided workflow or fetch one if not provided
  const { 
    data: workflowData,
    isLoading: isLoadingWorkflow,
    error: workflowError
  } = useQuery({
    queryKey: ['approvalWorkflow', duration, user?.roleId],
    queryFn: () => {
      // If a workflow is provided, use it
      if (workflow) {
        console.log('Using provided workflow:', workflow);
        
        // Log the approval levels for debugging
        if (workflow?.approvalLevels) {
          console.log('Workflow approval levels:', workflow.approvalLevels.map((level: ApprovalLevel) => ({
            level: level.level,
            roles: level.roles,
            approverType: level.approverType
          })));
        }
        
        return workflow;
      }
      
      // Otherwise fetch the workflow based on duration and user role
      return getApprovalWorkflowForDuration(duration, user?.roleId)
        .then(fetchedWorkflow => {
          if (fetchedWorkflow?.approvalLevels) {
            console.log('Fetched workflow approval levels:', fetchedWorkflow.approvalLevels.map((level: ApprovalLevel) => ({
              level: level.level,
              roles: level.roles,
              approverType: level.approverType
            })));
          }
          return fetchedWorkflow;
        })
        .catch(error => {
          console.error('Error fetching workflow:', error);
          // Return null instead of mock data
          return null;
        });
    },
    enabled: (!!duration && duration > 0) && !workflow, // Only fetch if no workflow is provided
  });
  
  // Determine which workflow to use - either the provided one or the fetched one
  const effectiveWorkflow = workflow || workflowData;
  
  // Check if this is a team lead workflow based on the name or other properties
  const isTeamLeadWorkflow = effectiveWorkflow?.name?.toLowerCase().includes('team lead') || 
                            (isTeamLead && effectiveWorkflow?.requesterRole?.name === 'team_lead');
  
  // Log the effective workflow for debugging
  useEffect(() => {
    if (effectiveWorkflow) {
      console.log('Effective workflow being used:', {
        id: effectiveWorkflow.id,
        name: effectiveWorkflow.name,
        minDays: effectiveWorkflow.minDays,
        maxDays: effectiveWorkflow.maxDays,
        fullObject: effectiveWorkflow // Log the full object for inspection
      });
      
      if (effectiveWorkflow.approvalLevels) {
        console.log('Approval levels in effective workflow:', 
          effectiveWorkflow.approvalLevels.map((level: ApprovalLevel) => ({
            level: level.level,
            roles: level.roles,
            approverType: level.approverType,
            fullLevel: level // Log the full level object for inspection
          }))
        );
      }
    }
  }, [effectiveWorkflow]);
  
  // Fetch the user's approvers based on the workflow
  const {
    data: approversData,
    isLoading: isLoadingApprovers,
    error: approversError
  } = useQuery({
    queryKey: ['userApprovers', effectiveWorkflow?.id, userRole],
    queryFn: () => getUserApprovers(effectiveWorkflow?.id)
      .catch(error => {
        console.error('Error fetching approvers:', error);
        // Return null instead of mock data
        return null;
      }),
    enabled: !!effectiveWorkflow?.id,
  });
  
  // Fetch HR users for level 2 if needed
  const {
    data: hrUsersData,
    isLoading: isLoadingHRUsers
  } = useQuery({
    queryKey: ['hrUsers'],
    queryFn: () => getHRUsers(),
    enabled: (isTeamLead || isTeamLeadWorkflow) && !!effectiveWorkflow?.id,
  });
  
  // Process approvers data when it's available
  useEffect(() => {
    if ((approversData || hrUsersData) && effectiveWorkflow) {
      try {
        // Start with approvers from the API if available
        const mappedApprovers = approversData ? approversData.approvers.map((approver: any) => ({
          ...approver,
          level: approver.level || 0,
        })) : [];
        
        // Sort by level
        mappedApprovers.sort((a: Approver, b: Approver) => a.level - b.level);
        
        // Log the approvers for debugging
        console.log('Approvers from API:', mappedApprovers);
        console.log('HR Users from API:', hrUsersData);
        console.log('Workflow approval levels:', effectiveWorkflow.approvalLevels);
        
        // For team leads with 2-day leaves, we need to ensure both levels have approvers
        if (isTeamLead || isTeamLeadWorkflow) {
          console.log('Team lead workflow detected, checking for missing approvers');
          
          // Check if we have approvers for both levels
          const level1Approvers = mappedApprovers.filter(a => a.level === 1);
          const level2Approvers = mappedApprovers.filter(a => a.level === 2);
          
          console.log('Level 1 approvers:', level1Approvers);
          console.log('Level 2 approvers:', level2Approvers);
          
          // If we're missing HR approvers, we need to add an HR user
          if (level2Approvers.length === 0 && hrUsersData && hrUsersData.length > 0) {
            console.log('No HR approvers found, adding HR user from list');
            
            // Use the first HR user from the list
            const hrUser = hrUsersData[0];
            const hrApprover: Approver = {
              id: hrUser.id || 'hr-user',
              firstName: hrUser.firstName || 'HR',
              lastName: hrUser.lastName || 'User',
              email: hrUser.email || 'hr@example.com',
              role: 'hr',
              level: 2
            };
            
            mappedApprovers.push(hrApprover);
            console.log('Added HR approver:', hrApprover);
          } 
          // If no HR users are available, add a placeholder
          else if (level2Approvers.length === 0) {
            console.log('No HR approvers or HR users found, adding placeholder');
            
            const hrApprover: Approver = {
              id: 'hr-placeholder',
              firstName: 'Sarah',
              lastName: 'Johnson',
              email: 'hr@example.com',
              role: 'hr',
              level: 2
            };
            
            mappedApprovers.push(hrApprover);
            console.log('Added placeholder HR approver:', hrApprover);
          }
        }
        
        // We'll set all approvers and handle filtering in the render logic
        setApprovers(mappedApprovers);
      } catch (error) {
        console.error('Error processing approvers data:', error);
        // Set empty approvers array
        setApprovers([]);
      }
    } else if (effectiveWorkflow && !approversData && !hrUsersData) {
      // If we have workflow but no approvers, set empty approvers array
      setApprovers([]);
    }
  }, [approversData, hrUsersData, effectiveWorkflow, isTeamLead, isTeamLeadWorkflow]);
  
  if (isLoading || isLoadingWorkflow || isLoadingApprovers || isLoadingHRUsers) {
    return (
      <Card className="mt-4 p-4 border-l-4 border-blue-300">
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700"></div>
          <span className="text-sm text-gray-600">Loading approval workflow...</span>
        </div>
      </Card>
    );
  }
  
  if (!duration || duration <= 0) {
    return null;
  }
  
  // If there's an error or no workflow data, show the "not found" message
  if ((workflowError && !workflowData) || (!effectiveWorkflow && !isLoadingWorkflow) || (approversError && !approversData)) {
    console.warn('No approval workflow found or error occurred:', { 
      workflowError, 
      approversError,
      userRole,
      duration,
      effectiveWorkflow: !!effectiveWorkflow
    });
    return (
      <Card className="mt-4 p-4 border-l-4 border-amber-500">
        <div className="text-sm text-amber-600">
          <p>Approval workflow not found. Please contact administrator.</p>
          <p className="text-xs mt-1">No workflow defined for {userRole} role with {duration} days duration.</p>
        </div>
      </Card>
    );
  }
  
  // Use the effective workflow directly
  return (
    <Card className="mt-4 p-4 border-l-4 border-blue-500">
      <h3 className="text-md font-medium mb-2 text-blue-700">
        Approval Workflow
      </h3>
      <p className="text-sm text-gray-600 mb-3">
        Based on your leave duration ({duration} days), your request will follow this approval path:
      </p>
      
      <div className="space-y-3">
        {effectiveWorkflow.approvalLevels && effectiveWorkflow.approvalLevels.length > 0 ? (
          // Always show all approval levels from the workflow
          effectiveWorkflow.approvalLevels.map((level: ApprovalLevel) => {
            // Find approvers for this level
            const levelApprovers = approvers.filter(a => a.level === level.level);
            
            // For team leads, managers, and HR, we need to filter out their own role from approvers
            let filteredApprovers = levelApprovers;
            if (isTeamLead && level.roles?.includes('team_lead')) {
              filteredApprovers = [];
            } else if (isManager && level.roles?.includes('manager')) {
              filteredApprovers = [];
            } else if (isHR && level.roles?.includes('hr')) {
              filteredApprovers = [];
            }
            
            // Get the approver type display name based on the level number
            // For team leads with 2-day leaves, we know level 1 is Manager and level 2 is HR
            let approverTypeDisplay = 'Approver';
            
            // Log the level details for debugging
            console.log(`Processing level ${level.level}:`, {
              level: level.level,
              roles: level.roles,
              approverType: level.approverType,
              roleIds: level.roleIds,
              fullLevel: level // Log the full level object
            });
            
            // Direct mapping based on level number for team leads
            if (isTeamLead || isTeamLeadWorkflow) {
              if (level.level === 1) {
                approverTypeDisplay = 'Manager';
                console.log(`Setting level ${level.level} to Manager for team lead`);
              } else if (level.level === 2) {
                approverTypeDisplay = 'HR';
                console.log(`Setting level ${level.level} to HR for team lead`);
              }
            } 
            // For other roles, try to determine from the roles array
            else if (level.roles && level.roles.length > 0) {
              // Check for specific roles we want to display
              if (level.roles.includes('manager')) {
                approverTypeDisplay = 'Manager';
              } else if (level.roles.includes('hr')) {
                approverTypeDisplay = 'HR';
              } else if (level.roles.includes('team_lead')) {
                approverTypeDisplay = 'Team Lead';
              } else if (level.roles.includes('super_admin')) {
                approverTypeDisplay = 'Super Admin';
              }
              
              console.log(`Level ${level.level} has roles: ${level.roles.join(', ')}, display: ${approverTypeDisplay}`);
            }
            
            // If approverType is specified, use that instead
            if (level.approverType) {
              approverTypeDisplay = level.approverType.charAt(0).toUpperCase() + 
                level.approverType.slice(1).replace(/([A-Z])/g, ' $1');
              console.log(`Level ${level.level} has approverType: ${level.approverType}, display: ${approverTypeDisplay}`);
            }
            
            return (
              <div key={`level-${level.level}`} className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3">
                  <span className="text-xs font-medium">{level.level}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">
                    Level {level.level}: {
                      // Force the correct display for team leads based on level
                      isTeamLead && level.level === 1 ? 'Manager' :
                      isTeamLead && level.level === 2 ? 'HR' :
                      approverTypeDisplay
                    }
                  </p>
                  
                  {filteredApprovers.length > 0 ? (
                    <div className="mt-1">
                      {filteredApprovers.map((approver) => (
                        <div key={`approver-${approver.id}`} className="text-sm text-gray-700 flex items-center">
                          <span className={approver.isFallback ? 'text-orange-600' : ''}>
                            {approver.firstName} {approver.lastName}
                          </span>
                          {approver.isFallback && (
                            <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded">
                              Fallback
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      {(isTeamLead && level.roles?.includes('team_lead')) || 
                       (isManager && level.roles?.includes('manager')) || 
                       (isHR && level.roles?.includes('hr')) 
                        ? "This level is skipped for your role"
                        : "Approver will be assigned based on your department and role hierarchy"}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-500 italic">
            No approval levels defined for this leave duration.
          </p>
        )}
      </div>
    </Card>
  );
};

export default ApprovalWorkflowPreview;