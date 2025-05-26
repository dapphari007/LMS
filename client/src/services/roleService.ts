import { get, post, put, del } from "./api";

export interface Role {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  permissions: string;
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetRolesResponse {
  roles: Role[];
  count: number;
}

export const getAllRoles = async (params?: { isActive?: boolean }): Promise<GetRolesResponse> => {
  return get<GetRolesResponse>("/roles", { params });
};

export const getActiveRoles = async (): Promise<Role[]> => {
  try {
    const response = await getAllRoles({ isActive: true });
    
    // Handle different response formats
    if (Array.isArray(response)) {
      return response;
    } else if (response.roles && Array.isArray(response.roles)) {
      return response.roles;
    } else {
      console.error("Unexpected roles response format:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching active roles:", error);
    return [];
  }
};

export const getRoleById = async (id: string): Promise<Role> => {
  const response = await get<{ role: Role }>(`/roles/${id}`);
  return response.role;
};

export const createRole = async (data: Partial<Role>): Promise<Role> => {
  const response = await post<{ role: Role }>("/roles", data);
  return response.role;
};

export const updateRole = async (id: string, data: Partial<Role>): Promise<Role> => {
  const response = await put<{ role: Role }>(`/roles/${id}`, data);
  return response.role;
};

export const deleteRole = async (id: string): Promise<void> => {
  try {
    await del(`/roles/${id}`);
  } catch (error) {
    console.error("Error deleting role:", error);
    throw error;
  }
};