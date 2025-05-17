import { ServerRoute } from "@hapi/hapi";
import {
  getAllPositions,
  getPositionById,
  createPosition,
  updatePosition,
  deletePosition,
} from "../controllers/positionController";

const positionRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/api/positions",
    handler: getAllPositions,
    options: {
      auth: "all_roles",
      description: "Get all positions",
      tags: ["api", "positions"],
    },
  },
  {
    method: "GET",
    path: "/api/positions/{id}",
    handler: getPositionById,
    options: {
      auth: "all_roles",
      description: "Get position by ID",
      tags: ["api", "positions"],
    },
  },
  {
    method: "POST",
    path: "/api/positions",
    handler: createPosition,
    options: {
      auth: "super_admin",
      description: "Create a new position",
      tags: ["api", "positions"],
    },
  },
  {
    method: "PUT",
    path: "/api/positions/{id}",
    handler: updatePosition,
    options: {
      auth: "super_admin",
      description: "Update position",
      tags: ["api", "positions"],
    },
  },
  {
    method: "DELETE",
    path: "/api/positions/{id}",
    handler: deletePosition,
    options: {
      auth: "super_admin",
      description: "Delete position",
      tags: ["api", "positions"],
    },
  },
];

export default positionRoutes;
