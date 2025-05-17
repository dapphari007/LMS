import { ServerRoute } from "@hapi/hapi";
import * as PageController from "../controllers/pageController";

const pageRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: "/api/pages",
    handler: PageController.createPage,
    options: {
      auth: "super_admin",
      description: "Create a new page",
      tags: ["api", "pages"],
    },
  },
  {
    method: "GET",
    path: "/api/pages",
    handler: PageController.getAllPages,
    options: {
      auth: "all_roles",
      description: "Get all pages",
      tags: ["api", "pages"],
    },
  },
  {
    method: "GET",
    path: "/api/pages/{id}",
    handler: PageController.getPageById,
    options: {
      auth: "all_roles",
      description: "Get page by ID",
      tags: ["api", "pages"],
    },
  },
  {
    method: "GET",
    path: "/api/pages/slug/{slug}",
    handler: PageController.getPageBySlug,
    options: {
      auth: "all_roles",
      description: "Get page by slug",
      tags: ["api", "pages"],
    },
  },
  {
    method: "PUT",
    path: "/api/pages/{id}",
    handler: PageController.updatePage,
    options: {
      auth: "super_admin",
      description: "Update page",
      tags: ["api", "pages"],
    },
  },
  {
    method: "DELETE",
    path: "/api/pages/{id}",
    handler: PageController.deletePage,
    options: {
      auth: "super_admin",
      description: "Delete page",
      tags: ["api", "pages"],
    },
  },
];

export default pageRoutes;