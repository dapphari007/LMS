import { ServerRoute } from "@hapi/hapi";
import * as UserController from "../controllers/userController";

const userRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: "/api/users",
    handler: UserController.createUser,
    options: {
      auth: "jwt",
      description: "Create a new user",
      tags: ["api", "users"],
    },
  },
  {
    method: "GET",
    path: "/api/users",
    handler: UserController.getAllUsers,
    options: {
      auth: "jwt",
      description: "Get all users",
      tags: ["api", "users"],
    },
  },
  {
    method: "GET",
    path: "/api/users/{id}",
    handler: UserController.getUserById,
    options: {
      auth: "jwt",
      description: "Get user by ID",
      tags: ["api", "users"],
    },
  },
  {
    method: "PUT",
    path: "/api/users/{id}",
    handler: UserController.updateUser,
    options: {
      auth: "jwt",
      description: "Update user",
      tags: ["api", "users"],
    },
  },
  {
    method: "DELETE",
    path: "/api/users/{id}",
    handler: UserController.deleteUser,
    options: {
      auth: "jwt",
      description: "Delete user",
      tags: ["api", "users"],
    },
  },
  {
    method: "PUT",
    path: "/api/users/{id}/reset-password",
    handler: UserController.resetUserPassword,
    options: {
      auth: "jwt",
      description: "Reset user password",
      tags: ["api", "users"],
    },
  },
  {
    method: "PUT",
    path: "/api/users/{id}/deactivate",
    handler: UserController.deactivateUser,
    options: {
      auth: "jwt",
      description: "Deactivate user",
      tags: ["api", "users"],
    },
  },
  {
    method: "PUT",
    path: "/api/users/{id}/activate",
    handler: UserController.activateUser,
    options: {
      auth: "jwt",
      description: "Activate user",
      tags: ["api", "users"],
    },
  },
  {
    method: "GET",
    path: "/api/users/my-approvers",
    handler: UserController.getUserApprovers,
    options: {
      auth: "jwt",
      description: "Get user's approvers based on their role and department",
      tags: ["api", "users", "approvers"],
    },
  },
];

export default userRoutes;
