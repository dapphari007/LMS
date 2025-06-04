import { get, post, put } from "./api";
import { ApiResponse, CreateLeaveTypeData, LeaveType } from "../types";
import config from "../config";

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
  try {
    console.log(`Fetching leave type with ID: ${id}`);
    // Add debugging to see the full URL being requested
    console.log(`Making request to: ${window.location.origin}${config.apiUrl}/leave-types/${id}`);
    const response = await get<ApiResponse<LeaveType>>(`/leave-types/${id}`);
    console.log('Leave type response:', response);
    
    // Check if the response contains a valid leave type
    if (!response || !response.leaveType) {
      console.warn(`No leave type found with ID: ${id}`);
      return {
        leaveType: null,
        message: "Leave type not found or you don't have permission to view it."
      };
    }
    
    return response;
  } catch (error: any) {
    console.error(`Error fetching leave type with ID ${id}:`, error);
    
    // Provide more detailed error messages based on the error type
    if (error.response?.status === 404) {
      return {
        leaveType: null,
        message: "Leave type not found or you don't have permission to view it."
      };
    } else if (error.response?.status === 403) {
      return {
        leaveType: null,
        message: "You don't have permission to view this leave type."
      };
    } else if (error.response?.status === 401) {
      return {
        leaveType: null,
        message: "Authentication required. Please log in again."
      };
    } else if (error.response?.data?.message) {
      return {
        leaveType: null,
        message: error.response.data.message
      };
    }
    
    // For network errors or other unexpected issues
    return {
      leaveType: null,
      message: "Failed to fetch leave type. Please check your connection and try again."
    };
  }
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
