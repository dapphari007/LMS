import api from "./api";

export interface WorkflowCategory {
  id: string;
  name: string;
  description?: string;
  minDays: number;
  maxDays: number;
  maxSteps: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const createWorkflowCategory = async (
  categoryData: Omit<WorkflowCategory, "id" | "createdAt" | "updatedAt">
) => {
  const response = await api.post("/workflow-categories", categoryData);
  return response.data;
};

export const getAllWorkflowCategories = async (filters?: { isActive?: boolean }) => {
  const params = new URLSearchParams();
  if (filters?.isActive !== undefined) {
    params.append("isActive", String(filters.isActive));
  }
  
  const response = await api.get(`/workflow-categories${params.toString() ? `?${params.toString()}` : ''}`);
  return response.data.workflowCategories || [];
};

export const getWorkflowCategoryById = async (id: string) => {
  const response = await api.get(`/workflow-categories/${id}`);
  return response.data.workflowCategory;
};

export const updateWorkflowCategory = async (
  id: string,
  categoryData: Partial<Omit<WorkflowCategory, "id" | "createdAt" | "updatedAt">>
) => {
  const response = await api.put(`/workflow-categories/${id}`, categoryData);
  return response.data;
};

export const deleteWorkflowCategory = async (id: string) => {
  const response = await api.delete(`/workflow-categories/${id}`);
  return response.data;
};

export const toggleWorkflowCategoryStatus = async (id: string) => {
  const response = await api.patch(`/workflow-categories/${id}/toggle-status`);
  return response.data;
};