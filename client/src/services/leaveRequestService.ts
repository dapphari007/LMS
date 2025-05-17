import { get, post, put, del } from "./api";
import {
  ApiResponse,
  CreateLeaveRequestData,
  LeaveRequest,
  UpdateLeaveRequestStatusData,
} from "../types";

export interface GetLeaveRequestsParams {
  status?: "pending" | "approved" | "rejected" | "cancelled" | "partially_approved" | "pending_approval";
  year?: number;
  startDate?: string;
  endDate?: string;
  userId?: string;
  leaveTypeId?: string;
}

export interface GetLeaveRequestsResponse {
  leaveRequests: LeaveRequest[];
  count: number;
}

export const createLeaveRequest = async (
  data: CreateLeaveRequestData
): Promise<ApiResponse<LeaveRequest>> => {
  return post<ApiResponse<LeaveRequest>>("/leave-requests", data);
};

export const getMyLeaveRequests = async (
  params?: GetLeaveRequestsParams
): Promise<GetLeaveRequestsResponse> => {
  return get<GetLeaveRequestsResponse>("/leave-requests/my-requests", {
    params,
  });
};

export const getTeamLeaveRequests = async (
  params?: GetLeaveRequestsParams
): Promise<GetLeaveRequestsResponse> => {
  return get<GetLeaveRequestsResponse>("/leave-requests/team-requests", {
    params,
  });
};

export const getLeaveRequest = async (
  id: string
): Promise<ApiResponse<LeaveRequest>> => {
  return get<ApiResponse<LeaveRequest>>(`/leave-requests/${id}`);
};

export const updateLeaveRequestStatus = async (
  id: string,
  data: UpdateLeaveRequestStatusData
): Promise<ApiResponse<LeaveRequest>> => {
  return put<ApiResponse<LeaveRequest>>(`/leave-requests/${id}/status`, data);
};

export const cancelLeaveRequest = async (
  id: string
): Promise<ApiResponse<LeaveRequest>> => {
  return put<ApiResponse<LeaveRequest>>(`/leave-requests/${id}/cancel`);
};

export const getAllLeaveRequests = async (
  params?: GetLeaveRequestsParams
): Promise<GetLeaveRequestsResponse> => {
  return get<GetLeaveRequestsResponse>("/leave-requests", { params });
};

export const deleteLeaveRequest = async (
  id: string
): Promise<ApiResponse<any>> => {
  return del<ApiResponse<any>>(`/leave-requests/${id}`);
};

export const approveDeleteLeaveRequest = async (
  id: string,
  comments?: string
): Promise<ApiResponse<LeaveRequest>> => {
  return put<ApiResponse<LeaveRequest>>(`/leave-requests/${id}/approve-deletion`, { comments });
};

export const rejectDeleteLeaveRequest = async (
  id: string,
  comments?: string
): Promise<ApiResponse<LeaveRequest>> => {
  return put<ApiResponse<LeaveRequest>>(`/leave-requests/${id}/reject-deletion`, { comments });
};
