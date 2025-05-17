import { ServerRoute } from "@hapi/hapi";
import {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/departmentController";

const departmentRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/api/departments",
    handler: getAllDepartments,
    options: {
      auth: "all_roles",
      description: "Get all departments",
      tags: ["api", "departments"],
    },
  },
  {
    method: "GET",
    path: "/api/departments/{id}",
    handler: getDepartmentById,
    options: {
      auth: "all_roles",
      description: "Get department by ID",
      tags: ["api", "departments"],
    },
  },
  {
    method: "POST",
    path: "/api/departments",
    handler: createDepartment,
    options: {
      auth: "super_admin",
      description: "Create a new department",
      tags: ["api", "departments"],
    },
  },
  {
    method: "PUT",
    path: "/api/departments/{id}",
    handler: updateDepartment,
    options: {
      auth: "super_admin",
      description: "Update department",
      tags: ["api", "departments"],
    },
  },
  {
    method: "DELETE",
    path: "/api/departments/{id}",
    handler: deleteDepartment,
    options: {
      auth: "super_admin",
      description: "Delete department",
      tags: ["api", "departments"],
    },
  },
];

export default departmentRoutes;
