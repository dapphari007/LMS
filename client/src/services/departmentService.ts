import { get, post, put, del } from "./api";

export interface Department {
  id: string;
  name: string;
  description: string | null;
  managerId: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetDepartmentsParams {
  isActive?: boolean;
}

export interface CreateDepartmentData {
  name: string;
  description?: string;
  managerId?: string;
  isActive?: boolean;
}

export interface UpdateDepartmentData {
  name?: string;
  description?: string;
  managerId?: string;
  isActive?: boolean;
}

export const getAllDepartments = async (
  params?: GetDepartmentsParams
): Promise<Department[]> => {
  const response = await get<{ departments: Department[]; count: number }>(
    "/departments",
    { params }
  );
  return response.departments || [];
};

export const getDepartmentById = async (id: string): Promise<Department> => {
  try {
    const response = await get<Department | { department: Department }>(`/departments/${id}`);
    
    // Handle both response formats (direct object or nested in 'department' property)
    if (response && typeof response === 'object') {
      if ('department' in response) {
        return response.department;
      } else if ('id' in response) {
        return response as Department;
      }
    }
    
    throw new Error('Invalid department data format received from server');
  } catch (error) {
    console.error(`Error fetching department ${id}:`, error);
    throw error;
  }
};

export const createDepartment = async (
  data: CreateDepartmentData
): Promise<Department> => {
  const response = await post<{ department: Department }>("/departments", data);
  return response.department;
};

export const updateDepartment = async (
  id: string,
  data: UpdateDepartmentData
): Promise<Department> => {
  try {
    const response = await put<Department | { department: Department }>(
      `/departments/${id}`,
      data
    );
    
    // Handle both response formats
    if (response && typeof response === 'object') {
      if ('department' in response) {
        return response.department;
      } else if ('id' in response) {
        return response as Department;
      }
    }
    
    throw new Error('Invalid department data format received from server');
  } catch (error) {
    console.error(`Error updating department ${id}:`, error);
    throw error;
  }
};

export const deleteDepartment = async (id: string): Promise<void> => {
  await del(`/departments/${id}`);
};