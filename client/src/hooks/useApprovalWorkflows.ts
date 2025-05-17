import { useQuery } from '@tanstack/react-query';
import { 
  getAllApprovalWorkflows, 
  getApprovalWorkflowById 
} from '../services/approvalWorkflowService';

export const useApprovalWorkflows = () => {
  return useQuery({
    queryKey: ['approvalWorkflows'],
    queryFn: getAllApprovalWorkflows,
  });
};

export const useApprovalWorkflow = (id: string | undefined) => {
  return useQuery({
    queryKey: ['approvalWorkflow', id],
    queryFn: () => getApprovalWorkflowById(id as string),
    enabled: !!id,
  });
};