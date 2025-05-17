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
  const response = await get<{ department: Department }>(`/departments/${id}`);
  return response.department;
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
  const response = await put<{ department: Department }>(
    `/departments/${id}`,
    data
  );
  return response.department;
};

export const deleteDepartment = async (id: string): Promise<void> => {
  await del(`/departments/${id}`);
};