import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ApprovalWorkflow } from '../../services/approvalWorkflowService';
import { getUserById } from '../../services/userService';
import { getApprovalWorkflowForDuration } from '../../services/approvalWorkflowService';
import { getUserApprovers } from '../../services/userService';
import Card from '../ui/Card';
import { useAuth } from '../../context/AuthContext';

// Mock data for development/preview until API endpoints are ready
const MOCK_WORKFLOW: ApprovalWorkflow = {
  id: 'mock-workflow-1',
  name: 'Medium Leave (3-5 days)',
  minDays: 3,
  maxDays: 5,
  approvalLevels: [
    {
      level: 1,
      roles: ['team_lead'],
      approverType: 'teamLead',
      fallbackRoles: ['team_lead']
    },
    {
      level: 2,
      roles: ['manager'],
      approverType: 'manager',
      fallbackRoles: ['manager']
    }
  ],
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const MOCK_APPROVERS = [
  {
    id: 'mock-approver-1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    role: 'team_lead',
    level: 1,
    isFallback: false
  },
  {
    id: 'mock-approver-2',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    role: 'manager',
    level: 2,
    isFallback: false
  }
];

interface ApprovalWorkflowPreviewProps {
  duration: number;
  isLoading?: boolean;
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
  isLoading 
}) => {
  const [approvers, setApprovers] = useState<Approver[]>([]);
  const { user } = useAuth(); // Get the current user
  const userRole = user?.role || '';
  const isTeamLead = userRole === 'team_lead';
  const isManager = userRole === 'manager';
  const isHR = userRole === 'hr';
  
  // Fetch the approval workflow based on the duration
  const { 
    data: workflowData,
    isLoading: isLoadingWorkflow,
    error: workflowError
  } = useQuery({
    queryKey: ['approvalWorkflow', duration],
    queryFn: () => getApprovalWorkflowForDuration(duration)
      .catch(error => {
        console.error('Error fetching workflow:', error);
        // Return mock data for development/preview
        return MOCK_WORKFLOW;
      }),
    enabled: !!duration && duration > 0,
  });
  
  // Fetch the user's approvers based on the workflow
  const {
    data: approversData,
    isLoading: isLoadingApprovers,
    error: approversError
  } = useQuery({
    queryKey: ['userApprovers', workflowData?.id, userRole],
    queryFn: () => getUserApprovers()
      .catch(error => {
        console.error('Error fetching approvers:', error);
        // Return mock data for development/preview
        return { approvers: MOCK_APPROVERS };
      }),
    enabled: !!workflowData?.id,
  });
  
  // Process approvers data when it's available
  useEffect(() => {
    if (approversData && workflowData) {
      try {
        // Map approvers to levels based on the workflow
        const mappedApprovers = approversData.approvers.map((approver: any) => ({
          ...approver,
          level: approver.level || 0,
        }));
        
        // Sort by level
        mappedApprovers.sort((a: Approver, b: Approver) => a.level - b.level);
        
        // For Team Leads, Managers, and HR, we need to adjust the display to show the correct approval path
        if (isTeamLead) {
          console.log('User is a Team Lead, adjusting approval path display');
          // Filter out any Team Lead approvers (they shouldn't approve their own requests)
          const filteredApprovers = mappedApprovers.filter(
            approver => approver.role !== 'team_lead'
          );
          setApprovers(filteredApprovers);
        } else if (isManager) {
          console.log('User is a Manager, adjusting approval path display');
          // Filter out any Manager approvers (they shouldn't approve their own requests)
          const filteredApprovers = mappedApprovers.filter(
            approver => approver.role !== 'manager'
          );
          setApprovers(filteredApprovers);
        } else if (isHR) {
          console.log('User is HR, adjusting approval path display');
          // Filter out any HR approvers (they shouldn't approve their own requests)
          const filteredApprovers = mappedApprovers.filter(
            approver => approver.role !== 'hr'
          );
          setApprovers(filteredApprovers);
        } else {
          setApprovers(mappedApprovers);
        }
      } catch (error) {
        console.error('Error processing approvers data:', error);
        // Use mock data as fallback
        if (isTeamLead) {
          // For Team Leads, filter out Team Lead approvers from mock data
          const filteredMockApprovers = MOCK_APPROVERS.filter(
            approver => approver.role !== 'team_lead'
          );
          setApprovers(filteredMockApprovers);
        } else {
          setApprovers(MOCK_APPROVERS);
        }
      }
    } else if (workflowData && !approversData) {
      // If we have workflow but no approvers, use mock approvers
      if (isTeamLead) {
        // For Team Leads, filter out Team Lead approvers from mock data
        const filteredMockApprovers = MOCK_APPROVERS.filter(
          approver => approver.role !== 'team_lead'
        );
        setApprovers(filteredMockApprovers);
      } else if (isManager) {
        // For Managers, filter out Manager approvers from mock data
        const filteredMockApprovers = MOCK_APPROVERS.filter(
          approver => approver.role !== 'manager'
        );
        setApprovers(filteredMockApprovers);
      } else if (isHR) {
        // For HR, filter out HR approvers from mock data
        const filteredMockApprovers = MOCK_APPROVERS.filter(
          approver => approver.role !== 'hr'
        );
        setApprovers(filteredMockApprovers);
      } else {
        setApprovers(MOCK_APPROVERS);
      }
    }
  }, [approversData, workflowData, isTeamLead]);
  
  if (isLoading || isLoadingWorkflow || isLoadingApprovers) {
    return (
      <Card className="mt-4 p-4">
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
  
  // We're now handling errors by returning mock data, so this block will rarely be triggered
  // But we'll keep it as a fallback
  if ((workflowError && !workflowData) || (approversError && !approversData)) {
    console.warn('Using fallback UI for approval workflow due to errors:', { workflowError, approversError });
    return (
      <Card className="mt-4 p-4">
        <div className="text-sm text-amber-600">
          <p>Showing preview of approval workflow (development mode).</p>
          <p className="text-xs text-gray-500 mt-1">Note: This is sample data. The actual approval workflow will be shown in production.</p>
        </div>
      </Card>
    );
  }
  
  // If we don't have workflow data and we're not loading, use mock data
  if (!workflowData && !isLoadingWorkflow) {
    console.log('No workflow data available, using mock data');
    // This should rarely happen since we're returning mock data in the query error handler
    return (
      <Card className="mt-4 p-4">
        <h3 className="text-md font-medium mb-2">Approval Workflow Preview</h3>
        <p className="text-sm text-gray-600 mb-3">
          Based on your leave duration ({duration} days), your request will follow this approval path:
        </p>
        
        <div className="space-y-3">
          {MOCK_WORKFLOW.approvalLevels.map((level, index) => (
            <div key={`level-${level.level}`} className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3">
                <span className="text-xs font-medium">{level.level}</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">
                  Level {level.level}: {level.approverType ? level.approverType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) : 'Approver'}
                </p>
                
                <div className="mt-1">
                  {MOCK_APPROVERS.filter(a => a.level === level.level).map((approver, i) => (
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
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4 italic">Note: This is preview data. The actual approval workflow will be shown when the system is fully configured.</p>
      </Card>
    );
  }
  
  // Determine if we're using mock data
  const isMockData = !workflowData || workflowData === MOCK_WORKFLOW;
  const workflowToUse = workflowData || MOCK_WORKFLOW;
  
  return (
    <Card className="mt-4 p-4">
      <h3 className="text-md font-medium mb-2">
        Approval Workflow
        {isMockData && <span className="text-xs text-amber-600 ml-2">(Preview)</span>}
      </h3>
      <p className="text-sm text-gray-600 mb-3">
        Based on your leave duration ({duration} days), your request will follow this approval path:
      </p>
      
      <div className="space-y-3">
        {workflowToUse.approvalLevels && workflowToUse.approvalLevels.length > 0 ? (
          // If user is a Team Lead, Manager, or HR, we need to adjust the display
          (isTeamLead || isManager || isHR) ? (
            // For Team Leads, Managers, and HR, show their approvers with adjusted levels
            approvers.map((approver, index) => (
              <div key={`level-${index+1}`} className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3">
                  <span className="text-xs font-medium">{index+1}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">
                    Level {index+1}: {approver.role === 'manager' ? 'Manager' : 
                                     approver.role === 'hr' ? 'HR' : 
                                     approver.role === 'super_admin' ? 'Super Admin' : 'Approver'}
                  </p>
                  
                  <div className="mt-1">
                    <div className="text-sm text-gray-700 flex items-center">
                      <span className={approver.isFallback ? 'text-orange-600' : ''}>
                        {approver.firstName} {approver.lastName}
                      </span>
                      {approver.isFallback && (
                        <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded">
                          Fallback
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // For regular employees, show the standard workflow
            workflowToUse.approvalLevels.map((level, index) => {
              // Find approvers for this level
              const levelApprovers = approvers.filter(a => a.level === level.level);
              
              return (
                <div key={`level-${level.level}`} className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3">
                    <span className="text-xs font-medium">{level.level}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">
                      Level {level.level}: {level.approverType ? level.approverType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) : 'Approver'}
                    </p>
                    
                    {levelApprovers.length > 0 ? (
                      <div className="mt-1">
                        {levelApprovers.map((approver, i) => (
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
                      <p className="text-sm text-gray-500 italic">
                        Approver will be assigned based on your department and role hierarchy
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          )
        ) : (
          <p className="text-sm text-gray-500 italic">
            No approval levels defined for this leave duration.
          </p>
        )}
      </div>
      
      {isMockData && (
        <p className="text-xs text-gray-500 mt-4 italic">
          Note: This is preview data. The actual approval workflow will be shown when the system is fully configured.
        </p>
      )}
    </Card>
  );
};

export default ApprovalWorkflowPreview;