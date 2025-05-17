import api from "./api";

export interface ApproverType {
  id: string;
  name: string;
  description?: string;
  code: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const createApproverType = async (
  approverTypeData: Omit<ApproverType, "id" | "createdAt" | "updatedAt">
) => {
  const response = await api.post("/approver-types", approverTypeData);
  return response.data;
};

export const getAllApproverTypes = async (filters?: { isActive?: boolean }) => {
  const params = new URLSearchParams();
  if (filters?.isActive !== undefined) {
    params.append("isActive", String(filters.isActive));
  }
  
  const response = await api.get(`/approver-types${params.toString() ? `?${params.toString()}` : ''}`);
  return response.data.approverTypes || [];
};

export const getApproverTypeById = async (id: string) => {
  const response = await api.get(`/approver-types/${id}`);
  return response.data.approverType;
};

export const updateApproverType = async (
  id: string,
  approverTypeData: Partial<Omit<ApproverType, "id" | "createdAt" | "updatedAt">>
) => {
  const response = await api.put(`/approver-types/${id}`, approverTypeData);
  return response.data;
};

export const deleteApproverType = async (id: string) => {
  const response = await api.delete(`/approver-types/${id}`);
  return response.data;
};

export const toggleApproverTypeStatus = async (id: string) => {
  const response = await api.patch(`/approver-types/${id}/toggle-status`);
  return response.data;
};