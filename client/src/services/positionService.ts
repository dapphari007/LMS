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
  try {
    const response = await get<Position | { position: Position }>(`/positions/${id}`);
    
    // Handle both response formats (direct object or nested in 'position' property)
    if (response && typeof response === 'object') {
      if ('position' in response) {
        return response.position;
      } else if ('id' in response) {
        return response as Position;
      }
    }
    
    throw new Error('Invalid position data format received from server');
  } catch (error) {
    console.error(`Error fetching position ${id}:`, error);
    throw error;
  }
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
  try {
    const response = await put<Position | { position: Position }>(
      `/positions/${id}`,
      data
    );
    
    // Handle both response formats
    if (response && typeof response === 'object') {
      if ('position' in response) {
        return response.position;
      } else if ('id' in response) {
        return response as Position;
      }
    }
    
    throw new Error('Invalid position data format received from server');
  } catch (error) {
    console.error(`Error updating position ${id}:`, error);
    throw error;
  }
};

export const deletePosition = async (id: string): Promise<void> => {
  await del(`/positions/${id}`);
};