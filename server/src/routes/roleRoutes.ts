import { ServerRoute } from "@hapi/hapi";
import {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  toggleRoleStatus,
} from "../controllers/roleController";

const roleRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/api/roles",
    handler: getAllRoles,
    options: {
      auth: "manager_hr",
      description: "Get all roles",
      tags: ["api", "roles"],
    },
  },
  {
    method: "GET",
    path: "/api/roles/{id}",
    handler: getRoleById,
    options: {
      auth: "manager_hr",
      description: "Get role by ID",
      tags: ["api", "roles"],
    },
  },
  {
    method: "POST",
    path: "/api/roles",
    handler: createRole,
    options: {
      auth: "super_admin",
      description: "Create a new role",
      tags: ["api", "roles"],
    },
  },
  {
    method: "PUT",
    path: "/api/roles/{id}",
    handler: updateRole,
    options: {
      auth: "super_admin",
      description: "Update role",
      tags: ["api", "roles"],
    },
  },
  {
    method: "DELETE",
    path: "/api/roles/{id}",
    handler: deleteRole,
    options: {
      auth: "super_admin",
      description: "Delete role",
      tags: ["api", "roles"],
    },
  },
  {
    method: "PATCH",
    path: "/api/roles/{id}/toggle-status",
    handler: toggleRoleStatus,
    options: {
      auth: "super_admin",
      description: "Toggle role active status",
      tags: ["api", "roles"],
    },
  },
];

export default roleRoutes;
