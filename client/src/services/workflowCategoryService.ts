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
  try {
    const response = await api.post("/workflow-categories", categoryData);
    return response.data;
  } catch (error) {
    console.error('Error creating workflow category:', error);
    throw error;
  }
};

export const getAllWorkflowCategories = async (filters?: { isActive?: boolean }) => {
  try {
    const params = new URLSearchParams();
    if (filters?.isActive !== undefined) {
      params.append("isActive", String(filters.isActive));
    }
    
    console.log('Fetching workflow categories with URL:', `/workflow-categories${params.toString() ? `?${params.toString()}` : ''}`);
    const response = await api.get(`/workflow-categories${params.toString() ? `?${params.toString()}` : ''}`);
    console.log('Workflow categories response:', response.data);
    return response.data.workflowCategories || [];
  } catch (error) {
    console.error('Error fetching workflow categories:', error);
    // Return empty array instead of throwing to prevent UI errors
    return [];
  }
};

export const getWorkflowCategoryById = async (id: string) => {
  try {
    const response = await api.get(`/workflow-categories/${id}`);
    return response.data.workflowCategory;
  } catch (error) {
    console.error(`Error fetching workflow category with ID ${id}:`, error);
    throw error;
  }
};

export const updateWorkflowCategory = async (
  id: string,
  categoryData: Partial<Omit<WorkflowCategory, "id" | "createdAt" | "updatedAt">>
) => {
  try {
    const response = await api.put(`/workflow-categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    console.error(`Error updating workflow category with ID ${id}:`, error);
    throw error;
  }
};

export const deleteWorkflowCategory = async (id: string) => {
  try {
    const response = await api.delete(`/workflow-categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting workflow category with ID ${id}:`, error);
    throw error;
  }
};

export const toggleWorkflowCategoryStatus = async (id: string) => {
  try {
    const response = await api.patch(`/workflow-categories/${id}/toggle-status`);
    return response.data;
  } catch (error) {
    console.error(`Error toggling workflow category status with ID ${id}:`, error);
    throw error;
  }
};