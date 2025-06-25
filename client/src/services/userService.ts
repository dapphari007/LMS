import { get, post, put, del } from "./api";
import { ApiResponse, User } from "../types";

export interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
  role?: "employee" | "team_lead" | "manager" | "hr" | "admin" | "super_admin"; // Keep for backward compatibility
  roleId?: string; // New field for Role entity
  level?: number;
  gender?: "male" | "female" | "other";
  managerId?: string;
  hrId?: string;
  teamLeadId?: string;
  department?: string;
  position?: string;
}

export interface GetUsersParams {
  role?: string; // Changed to string to support role IDs
  roleId?: string; // Added to support role entity IDs
  isActive?: boolean;
}

export interface GetUsersResponse {
  users: User[];
  count: number;
}

export interface ResetPasswordData {
  newPassword: string;
}

export const createUser = async (
  data: CreateUserData
): Promise<ApiResponse<User>> => {
  return post<ApiResponse<User>>("/users", data);
};

export const getUsers = async (
  params?: GetUsersParams
): Promise<GetUsersResponse> => {
  return get<GetUsersResponse>("/users", { params });
};

export const getUser = async (id: string): Promise<ApiResponse<User>> => {
  return get<ApiResponse<User>>(`/users/${id}`);
};

export const updateUser = async (
  id: string,
  data: Partial<CreateUserData>
): Promise<ApiResponse<User>> => {
  return put<ApiResponse<User>>(`/users/${id}`, data);
};

export const activateUser = async (id: string): Promise<ApiResponse<User>> => {
  return put<ApiResponse<User>>(`/users/${id}/activate`);
};

export const deactivateUser = async (
  id: string
): Promise<ApiResponse<User>> => {
  return put<ApiResponse<User>>(`/users/${id}/deactivate`);
};

export const deleteUser = async (id: string): Promise<ApiResponse<void>> => {
  return del<ApiResponse<void>>(`/users/${id}`);
};

export const resetUserPassword = async (
  id: string,
  data: ResetPasswordData
): Promise<ApiResponse<any>> => {
  return put<ApiResponse<any>>(`/users/${id}/reset-password`, data);
};

// Add missing exports
export const getAllUsers = async (): Promise<User[]> => {
  const response = await getUsers();
  return response.users;
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await getUser(id);
  if (!response.data) {
    throw new Error("User not found");
  }
  return response.data;
};

export const getUserApprovers = async (workflowId?: string): Promise<{ approvers: any[] }> => {
  try {
    const params = new URLSearchParams();
    if (workflowId) {
      params.append("workflowId", workflowId);
    }
    
    return get<{ approvers: any[] }>(`/users/my-approvers${params.toString() ? `?${params.toString()}` : ''}`);
  } catch (error) {
    console.error('Error fetching user approvers:', error);
    throw error;
  }
};
