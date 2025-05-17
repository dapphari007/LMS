import { get, post, put } from "./api";
import { ApiResponse, CreateLeaveTypeData, LeaveType } from "../types";

export interface GetLeaveTypesParams {
  isActive?: boolean;
}

export interface GetLeaveTypesResponse {
  leaveTypes: LeaveType[];
  count: number;
}

export const createLeaveType = async (
  data: CreateLeaveTypeData
): Promise<ApiResponse<LeaveType>> => {
  return post<ApiResponse<LeaveType>>("/leave-types", data);
};

export const getLeaveTypes = async (
  params?: GetLeaveTypesParams
): Promise<GetLeaveTypesResponse> => {
  return get<GetLeaveTypesResponse>("/leave-types", { params });
};

export const getLeaveType = async (
  id: string
): Promise<ApiResponse<LeaveType>> => {
  return get<ApiResponse<LeaveType>>(`/leave-types/${id}`);
};

export const updateLeaveType = async (
  id: string,
  data: Partial<CreateLeaveTypeData>
): Promise<ApiResponse<LeaveType>> => {
  return put<ApiResponse<LeaveType>>(`/leave-types/${id}`, data);
};

export const activateLeaveType = async (
  id: string
): Promise<ApiResponse<LeaveType>> => {
  return put<ApiResponse<LeaveType>>(`/leave-types/${id}/activate`);
};

export const deactivateLeaveType = async (
  id: string
): Promise<ApiResponse<LeaveType>> => {
  return put<ApiResponse<LeaveType>>(`/leave-types/${id}/deactivate`);
};

// Add missing export
export const getAllLeaveTypes = async (): Promise<LeaveType[]> => {
  const response = await getLeaveTypes();
  return response.leaveTypes;
};
