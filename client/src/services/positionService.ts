import { get, post, put, del } from "./api";

export interface Position {
  id: string;
  name: string;
  description: string | null;
  departmentId: string | null;
  level: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  department?: {
    id: string;
    name: string;
  };
  departmentName?: string; // For display purposes
}

export interface GetPositionsParams {
  departmentId?: string;
  isActive?: boolean;
}

export interface CreatePositionData {
  name: string;
  description?: string;
  departmentId?: string;
  level?: number;
  isActive?: boolean;
}

export interface UpdatePositionData {
  name?: string;
  description?: string;
  departmentId?: string;
  level?: number;
  isActive?: boolean;
}

export const getAllPositions = async (
  params?: GetPositionsParams
): Promise<Position[]> => {
  const response = await get<{ positions: Position[]; count: number }>(
    "/positions",
    { params }
  );
  return response.positions || [];
};

export const getPositionById = async (id: string): Promise<Position> => {
  const response = await get<{ position: Position }>(`/positions/${id}`);
  return response.position;
};

export const createPosition = async (
  data: CreatePositionData
): Promise<Position> => {
  const response = await post<{ position: Position }>("/positions", data);
  return response.position;
};

export const updatePosition = async (
  id: string,
  data: UpdatePositionData
): Promise<Position> => {
  const response = await put<{ position: Position }>(
    `/positions/${id}`,
    data
  );
  return response.position;
};

export const deletePosition = async (id: string): Promise<void> => {
  await del(`/positions/${id}`);
};