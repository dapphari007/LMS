import { useQuery } from '@tanstack/react-query';
import { 
  getAllApprovalWorkflows, 
  getApprovalWorkflowById,
  ApprovalWorkflow
} from '../services/approvalWorkflowService';

export const useApprovalWorkflows = (filters?: { isActive?: boolean, categoryId?: string }) => {
  return useQuery<ApprovalWorkflow[]>({
    queryKey: ['approvalWorkflows', filters],
    queryFn: () => getAllApprovalWorkflows(filters),
  });
};

export const useApprovalWorkflow = (id: string | undefined) => {
  return useQuery<ApprovalWorkflow>({
    queryKey: ['approvalWorkflow', id],
    queryFn: () => getApprovalWorkflowById(id as string),
    enabled: !!id,
  });
};