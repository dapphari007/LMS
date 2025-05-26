import api from "./api";
import { WorkflowCategory } from "./workflowCategoryService";

export interface ApprovalWorkflow {
  id: string;
  name: string;
  description?: string;
  minDays: number;
  maxDays: number;
  approvalLevels: {
    level: number;
    roles: string[];
    approverType?: string;
    fallbackRoles?: string[];
    departmentSpecific?: boolean;
    required?: boolean;
  }[];
  isActive: boolean;
  categoryId?: string;
  category?: WorkflowCategory;
  createdAt: string;
  updatedAt: string;
}

export const createApprovalWorkflow = async (
  workflowData: Omit<ApprovalWorkflow, "id" | "createdAt" | "updatedAt" | "category">
) => {
  const response = await api.post("/approval-workflows", workflowData);
  return response.data;
};

export const getAllApprovalWorkflows = async (filters?: { isActive?: boolean, categoryId?: string }) => {
  const params = new URLSearchParams();
  if (filters?.isActive !== undefined) {
    params.append("isActive", String(filters.isActive));
  }
  if (filters?.categoryId) {
    params.append("categoryId", filters.categoryId);
  }
  
  const response = await api.get(`/approval-workflows${params.toString() ? `?${params.toString()}` : ''}`);
  return response.data.approvalWorkflows || [];
};

export const getApprovalWorkflowById = async (id: string) => {
  const response = await api.get(`/approval-workflows/${id}`);
  return response.data.approvalWorkflow;
};

export const updateApprovalWorkflow = async (
  id: string,
  workflowData: Partial<
    Omit<ApprovalWorkflow, "id" | "createdAt" | "updatedAt" | "category">
  >
) => {
  console.log(`Updating workflow ${id} with data:`, workflowData);
  try {
    const response = await api.put(`/approval-workflows/${id}`, workflowData);
    console.log('Update response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating workflow:', error);
    throw error;
  }
};

export const deleteApprovalWorkflow = async (id: string) => {
  const response = await api.delete(`/approval-workflows/${id}`);
  return response.data;
};

export const initializeDefaultWorkflows = async () => {
  const response = await api.post('/approval-workflows/initialize-defaults');
  return response.data;
};

export const getApprovalWorkflowForDuration = async (days: number) => {
  try {
    const response = await api.get(`/approval-workflows/for-duration/${days}`);
    return response.data.approvalWorkflow;
  } catch (error) {
    console.error('Error fetching approval workflow for duration:', error);
    throw error;
  }
};
