import { get, post, put, del } from './api';
import { ApiResponse, CreateHolidayData, Holiday } from '../types';

export interface GetHolidaysParams {
  year?: number;
  isActive?: boolean;
}

export interface GetHolidaysResponse {
  holidays: Holiday[];
  count: number;
}

export interface BulkCreateHolidaysData {
  holidays: CreateHolidayData[];
}

export const createHoliday = async (data: CreateHolidayData): Promise<ApiResponse<Holiday>> => {
  return post<ApiResponse<Holiday>>('/holidays', data);
};

export const getHolidays = async (params?: GetHolidaysParams): Promise<GetHolidaysResponse> => {
  return get<GetHolidaysResponse>('/holidays', { params });
};

export const getHoliday = async (id: string): Promise<ApiResponse<Holiday>> => {
  return get<ApiResponse<Holiday>>(`/holidays/${id}`);
};

export const updateHoliday = async (id: string, data: Partial<CreateHolidayData>): Promise<ApiResponse<Holiday>> => {
  return put<ApiResponse<Holiday>>(`/holidays/${id}`, data);
};

export const deleteHoliday = async (id: string): Promise<void> => {
  await del(`/holidays/${id}`);
};

export const activateHoliday = async (id: string): Promise<ApiResponse<Holiday>> => {
  return put<ApiResponse<Holiday>>(`/holidays/${id}/activate`);
};

export const deactivateHoliday = async (id: string): Promise<ApiResponse<Holiday>> => {
  return put<ApiResponse<Holiday>>(`/holidays/${id}/deactivate`);
};

export const bulkCreateHolidays = async (data: BulkCreateHolidaysData): Promise<ApiResponse<Holiday[]>> => {
  return post<ApiResponse<Holiday[]>>('/holidays/bulk-create', data);
};