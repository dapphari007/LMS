import api from "./api";
import { UserRole } from "../types/index";

export interface WorkflowLevel {
  id: string;
  level: number;
  approverType: string;
  fallbackRoles: UserRole[];
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const createWorkflowLevel = async (
  levelData: Omit<WorkflowLevel, "id" | "createdAt" | "updatedAt">
) => {
  const response = await api.post("/workflow-levels", levelData);
  return response.data;
};

export const getAllWorkflowLevels = async (filters?: { isActive?: boolean }) => {
  try {
    const params = new URLSearchParams();
    if (filters?.isActive !== undefined) {
      params.append("isActive", String(filters.isActive));
    }
    
    console.log('Fetching workflow levels with URL:', `/workflow-levels${params.toString() ? `?${params.toString()}` : ''}`);
    const response = await api.get(`/workflow-levels${params.toString() ? `?${params.toString()}` : ''}`);
    console.log('Workflow levels response:', response.data);
    return response.data.workflowLevels || [];
  } catch (error) {
    console.error('Error fetching workflow levels:', error);
    throw error;
  }
};

export const getWorkflowLevelById = async (id: string) => {
  const response = await api.get(`/workflow-levels/${id}`);
  return response.data.workflowLevel;
};

export const updateWorkflowLevel = async (
  id: string,
  levelData: Partial<Omit<WorkflowLevel, "id" | "createdAt" | "updatedAt">>
) => {
  const response = await api.put(`/workflow-levels/${id}`, levelData);
  return response.data;
};

export const deleteWorkflowLevel = async (id: string) => {
  const response = await api.delete(`/workflow-levels/${id}`);
  return response.data;
};

export const toggleWorkflowLevelStatus = async (id: string) => {
  const response = await api.patch(`/workflow-levels/${id}/toggle-status`);
  return response.data;
};

export const resetWorkflowLevelsToDefault = async () => {
  const response = await api.post('/workflow-levels/reset-defaults');
  return response.data;
};

export const getWorkflowLevelsForApprovalWorkflow = async () => {
  const response = await api.get('/workflow-levels/for-approval-workflow');
  return response.data.workflowLevels || [];
};