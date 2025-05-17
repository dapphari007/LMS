import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import { getErrorMessage } from '../../utils/errorUtils';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

interface ApprovalLevel {
  level: number;
  roles: string[];
}

interface Workflow {
  id: string;
  name: string;
  minDays: number;
  maxDays: number;
  approvalLevels: ApprovalLevel[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const WorkflowsPage: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const isSuperAdmin = user?.role === 'super_admin';

  // Fetch workflows
  const { data, isLoading } = useQuery({
    queryKey: ['workflows'],
    queryFn: async () => {
      const response = await api.get('/api/approval-workflows');
      return response.data;
    },
    onError: (err: any) => setError(getErrorMessage(err)),
  });

  // Reset workflows mutation
  const resetMutation = useMutation({
    mutationFn: async () => {
      return api.post('/api/approval-workflows/initialize-defaults');
    },
    onSuccess: () => {
      setSuccessMessage('Workflows have been reset to default successfully');
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
    },
    onError: (err: any) => setError(getErrorMessage(err)),
  });

  // Toggle workflow active status
  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      return api.put(`/api/approval-workflows/${id}`, { isActive });
    },
    onSuccess: () => {
      setSuccessMessage('Workflow status updated successfully');
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
    },
    onError: (err: any) => setError(getErrorMessage(err)),
  });

  const handleResetWorkflows = () => {
    if (window.confirm('Are you sure you want to reset all workflows to default? This will delete any custom workflows.')) {
      resetMutation.mutate();
    }
  };

  const handleToggleActive = (workflow: Workflow) => {
    toggleActiveMutation.mutate({
      id: workflow.id,
      isActive: !workflow.isActive,
    });
  };

  // Helper function to render role names
  const renderRoles = (roles: string[]) => {
    return roles.map(role => {
      const formattedRole = role
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      return formattedRole;
    }).join(', ');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Approval Workflows</h1>
        {isSuperAdmin && (
          <Button
            variant="primary"
            onClick={handleResetWorkflows}
            isLoading={resetMutation.isPending}
          >
            Reset to Default
          </Button>
        )}
      </div>

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

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-md mb-6">
        <h2 className="text-lg font-medium text-blue-800 mb-2">About Approval Workflows</h2>
        <p className="text-blue-700">
          Approval workflows define the approval process for leave requests based on the number of days requested.
          Each workflow specifies which roles are required to approve the request at each level.
        </p>
        <p className="text-blue-700 mt-2">
          These workflows are automatically initialized when the server starts, ensuring that there are always
          default workflows available in the system.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data?.approvalWorkflows?.map((workflow: Workflow) => (
            <Card key={workflow.id} className={!workflow.isActive ? 'opacity-70' : ''}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{workflow.name}</h3>
                  <p className="text-sm text-gray-500">
                    {workflow.minDays === 0.5 ? '½' : workflow.minDays} - {workflow.maxDays >= 365 ? '∞' : workflow.maxDays} days
                  </p>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 py-1 text-xs rounded-full ${workflow.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {workflow.isActive ? 'Active' : 'Inactive'}
                  </span>
                  {isSuperAdmin && (
                    <Button
                      variant="secondary"
                      size="sm"
                      className="ml-2"
                      onClick={() => handleToggleActive(workflow)}
                    >
                      {workflow.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Approval Levels</h4>
                <div className="space-y-2">
                  {workflow.approvalLevels
                    .sort((a, b) => a.level - b.level)
                    .map((level, index) => (
                      <div key={index} className="flex items-center">
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mr-3">
                          {level.level}
                        </div>
                        <div>
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Approvers:</span> {renderRoles(level.roles)}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkflowsPage;