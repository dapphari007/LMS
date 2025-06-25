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
    roleIds?: string[];
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

export const getAllApprovalWorkflows = async (filters?: { 
  isActive?: boolean, 
  categoryId?: string, 
  roles?: string[],
  roleId?: string,
  departmentId?: string
}) => {
  try {
    const params = new URLSearchParams();
    if (filters?.isActive !== undefined) {
      params.append("isActive", String(filters.isActive));
    }
    if (filters?.categoryId) {
      params.append("categoryId", filters.categoryId);
    }
    if (filters?.roleId) {
      params.append("roleId", filters.roleId);
    }
    if (filters?.departmentId) {
      params.append("departmentId", filters.departmentId);
    }
    
    const queryString = params.toString() ? `?${params.toString()}` : '';
    console.log(`Fetching all approval workflows with query: ${queryString}`);
    
    const response = await api.get(`/approval-workflows${queryString}`);
    console.log('All approval workflows response:', response.data);
    
    let workflows = response.data.approvalWorkflows || [];
    
    // Client-side filtering for roles if specified
    if (filters?.roles && filters.roles.length > 0) {
      workflows = workflows.filter((workflow: ApprovalWorkflow) => 
        workflow.approvalLevels.some(level => 
          level.roles?.some(role => filters.roles?.includes(role))
        )
      );
    }
    
    return workflows;
  } catch (error) {
    console.error('Error fetching all approval workflows:', error);
    // Return empty array instead of throwing to prevent UI errors
    return [];
  }
};

export const getApprovalWorkflowById = async (id: string) => {
  try {
    console.log(`Fetching approval workflow with ID: ${id}`);
    const response = await api.get(`/approval-workflows/${id}`);
    console.log('Approval workflow response:', response.data);
    
    if (!response.data.approvalWorkflow) {
      throw new Error('Workflow not found or you don\'t have permission to view it.');
    }
    
    return response.data.approvalWorkflow;
  } catch (error: any) {
    console.error(`Error fetching approval workflow with ID ${id}:`, error);
    
    // Provide more detailed error messages
    if (error.response?.status === 404) {
      throw new Error('Workflow not found. It may have been deleted or you may not have permission to access it.');
    } else if (error.response?.status === 403) {
      throw new Error('You do not have permission to view this workflow.');
    } else if (error.response?.data?.message) {
      throw new Error(`Failed to fetch workflow: ${error.response.data.message}`);
    } else if (error.message) {
      throw new Error(error.message);
    }
    
    throw new Error('Failed to fetch workflow. Please try again later.');
  }
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
  } catch (error: any) {
    console.error('Error updating workflow:', error);
    
    // Provide more detailed error messages
    if (error.response?.status === 404) {
      throw new Error('Workflow not found. It may have been deleted or you may not have permission to access it.');
    } else if (error.response?.status === 403) {
      throw new Error('You do not have permission to update this workflow.');
    } else if (error.response?.data?.message) {
      throw new Error(`Failed to update workflow: ${error.response.data.message}`);
    }
    
    throw error;
  }
};

export const deleteApprovalWorkflow = async (id: string) => {
  try {
    console.log(`Deleting approval workflow with ID: ${id}`);
    const response = await api.delete(`/approval-workflows/${id}`);
    console.log('Delete workflow response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error(`Error deleting approval workflow with ID ${id}:`, error);
    
    // Provide more detailed error messages
    if (error.response?.status === 404) {
      throw new Error('Workflow not found. It may have been deleted already or you may not have permission to access it.');
    } else if (error.response?.status === 403) {
      throw new Error('You do not have permission to delete this workflow.');
    } else if (error.response?.data?.message) {
      throw new Error(`Failed to delete workflow: ${error.response.data.message}`);
    }
    
    throw error;
  }
};

export const initializeDefaultWorkflows = async () => {
  try {
    console.log('Initializing default approval workflows');
    const response = await api.post('/approval-workflows/initialize-defaults');
    console.log('Initialize default workflows response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error initializing default approval workflows:', error);
    
    if (error.response?.data?.message) {
      throw new Error(`Failed to initialize default workflows: ${error.response.data.message}`);
    }
    
    throw new Error('Failed to initialize default workflows. Please try again later.');
  }
};

export const getApprovalWorkflowForDuration = async (days: number) => {
  try {
    console.log(`Fetching approval workflow for duration: ${days} days`);
    const response = await api.get(`/approval-workflows/for-duration/${days}`);
    console.log('Approval workflow for duration response:', response.data);
    return response.data.approvalWorkflow;
  } catch (error: any) {
    console.error(`Error fetching approval workflow for duration ${days}:`, error);
    
    // Provide more detailed error messages
    if (error.response?.status === 404) {
      console.warn(`No approval workflow found for duration: ${days} days`);
      return null;
    } else if (error.response?.data?.message) {
      throw new Error(`Failed to fetch workflow: ${error.response.data.message}`);
    }
    
    throw new Error('Failed to fetch approval workflow. Please try again later.');
  }
};
