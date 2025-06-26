import { Request, ResponseToolkit } from "@hapi/hapi";
import { AppDataSource, ensureDatabaseConnection } from "../config/database";
import { Page } from "../models";
import logger from "../utils/logger";

export const createPage = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { name, description, slug, configuration, accessRoles, isActive } =
      request.payload as any;

    // Validate input
    if (!name || !slug) {
      return h
        .response({ message: "Page name and slug are required" })
        .code(400);
    }

    // Check if page already exists
    const pageRepository = AppDataSource.getRepository(Page);
    const existingPageByName = await pageRepository.findOne({
      where: { name },
    });

    if (existingPageByName) {
      return h
        .response({ message: "Page with this name already exists" })
        .code(409);
    }

    const existingPageBySlug = await pageRepository.findOne({
      where: { slug },
    });

    if (existingPageBySlug) {
      return h
        .response({ message: "Page with this slug already exists" })
        .code(409);
    }

    // Create new page
    const page = new Page();
    page.name = name;
    page.description = description || null;
    page.slug = slug;
    page.configuration = configuration ? JSON.stringify(configuration) : null;
    page.accessRoles = accessRoles ? JSON.stringify(accessRoles) : null;
    page.isActive = isActive !== undefined ? isActive : true;
    page.isSystem = false; // User-created pages are not system pages

    // Save page to database
    const savedPage = await pageRepository.save(page);

    return h
      .response({
        message: "Page created successfully",
        page: savedPage,
      })
      .code(201);
  } catch (error) {
    logger.error(`Error in createPage: ${error}`);
    return h
      .response({ message: "An error occurred while creating the page" })
      .code(500);
  }
};

export const getAllPages = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { isActive } = request.query as any;

    // Build query
    const pageRepository = AppDataSource.getRepository(Page);
    let query: any = {};

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    // Get pages
    const pages = await pageRepository.find({
      where: query,
      order: {
        name: "ASC",
      },
    });

    return h
      .response({
        pages,
        count: pages.length,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in getAllPages: ${error}`);
    return h
      .response({ message: "An error occurred while fetching pages" })
      .code(500);
  }
};

export const getPageById = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { id } = request.params;

    // Get page
    const pageRepository = AppDataSource.getRepository(Page);
    const page = await pageRepository.findOne({ where: { id } });

    if (!page) {
      return h.response({ message: "Page not found" }).code(404);
    }

    return h
      .response({
        page,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in getPageById: ${error}`);
    return h
      .response({ message: "An error occurred while fetching the page" })
      .code(500);
  }
};

export const getPageBySlug = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { slug } = request.params;

    // Get page
    const pageRepository = AppDataSource.getRepository(Page);
    const page = await pageRepository.findOne({ where: { slug } });

    if (!page) {
      return h.response({ message: "Page not found" }).code(404);
    }

    // Check if page is active
    if (!page.isActive) {
      return h.response({ message: "This page is inactive" }).code(403);
    }

    return h
      .response({
        page,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in getPageBySlug: ${error}`);
    return h
      .response({ message: "An error occurred while fetching the page" })
      .code(500);
  }
};

export const updatePage = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { id } = request.params;
    const { name, description, slug, configuration, accessRoles, isActive } =
      request.payload as any;

    // Get page
    const pageRepository = AppDataSource.getRepository(Page);
    const page = await pageRepository.findOne({ where: { id } });

    if (!page) {
      return h.response({ message: "Page not found" }).code(404);
    }

    // Check if this is a system page
    if (page.isSystem) {
      return h
        .response({ message: "System pages cannot be modified" })
        .code(400);
    }

    // Check if name is being changed and if it already exists
    if (name && name !== page.name) {
      const existingPage = await pageRepository.findOne({ where: { name } });
      if (existingPage && existingPage.id !== id) {
        return h
          .response({ message: "Page with this name already exists" })
          .code(409);
      }
    }

    // Check if slug is being changed and if it already exists
    if (slug && slug !== page.slug) {
      const existingPage = await pageRepository.findOne({ where: { slug } });
      if (existingPage && existingPage.id !== id) {
        return h
          .response({ message: "Page with this slug already exists" })
          .code(409);
      }
    }

    // Update page fields
    if (name) page.name = name;
    if (description !== undefined) page.description = description;
    if (slug) page.slug = slug;
    if (configuration !== undefined)
      page.configuration = configuration
        ? JSON.stringify(configuration)
        : null;
    if (accessRoles !== undefined)
      page.accessRoles = accessRoles ? JSON.stringify(accessRoles) : null;
    if (isActive !== undefined) page.isActive = isActive;

    // Save updated page
    const updatedPage = await pageRepository.save(page);

    return h
      .response({
        message: "Page updated successfully",
        page: updatedPage,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in updatePage: ${error}`);
    return h
      .response({ message: "An error occurred while updating the page" })
      .code(500);
  }
};

export const deletePage = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is established before proceeding
    await ensureDatabaseConnection();

    const { id } = request.params;

    // Get page
    const pageRepository = AppDataSource.getRepository(Page);
    const page = await pageRepository.findOne({ where: { id } });

    if (!page) {
      return h.response({ message: "Page not found" }).code(404);
    }

    // Check if this is a system page
    if (page.isSystem) {
      return h
        .response({ message: "System pages cannot be deleted" })
        .code(400);
    }

    // Delete page
    await pageRepository.remove(page);

    return h
      .response({
        message: "Page deleted successfully",
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in deletePage: ${error}`);
    return h
      .response({ message: "An error occurred while deleting the page" })
      .code(500);
  }
};

// Function to initialize system pages
export const initializeSystemPages = async () => {
  try {
    // Ensure database connection is established
    await ensureDatabaseConnection();

    const pageRepository = AppDataSource.getRepository(Page);

    // Define system pages
    const systemPages = [
      {
        name: "Dashboard",
        description: "Main dashboard page",
        slug: "dashboard",
        configuration: JSON.stringify({
          layout: "default",
          widgets: [
            { type: "leaveBalance", position: "top" },
            { type: "pendingRequests", position: "middle" },
            { type: "upcomingHolidays", position: "bottom" },
          ],
        }),
        accessRoles: JSON.stringify(["super_admin", "manager", "hr", "team_lead", "employee"]),
        isSystem: true,
      },
      {
        name: "Leave Requests",
        description: "Manage leave requests",
        slug: "leave-requests",
        configuration: JSON.stringify({
          layout: "default",
          features: ["create", "view", "approve", "reject"],
        }),
        accessRoles: JSON.stringify(["super_admin", "manager", "hr", "team_lead", "employee"]),
        isSystem: true,
      },
      {
        name: "User Management",
        description: "Manage users",
        slug: "users",
        configuration: JSON.stringify({
          layout: "default",
          features: ["create", "view", "edit", "delete"],
        }),
        accessRoles: JSON.stringify(["super_admin", "hr"]),
        isSystem: true,
      },
      {
        name: "Role Management",
        description: "Manage roles",
        slug: "roles",
        configuration: JSON.stringify({
          layout: "default",
          features: ["create", "view", "edit", "delete"],
        }),
        accessRoles: JSON.stringify(["super_admin"]),
        isSystem: true,
      },
      {
        name: "Department Management",
        description: "Manage departments",
        slug: "departments",
        configuration: JSON.stringify({
          layout: "default",
          features: ["create", "view", "edit", "delete"],
        }),
        accessRoles: JSON.stringify(["super_admin"]),
        isSystem: true,
      },
      {
        name: "Position Management",
        description: "Manage positions",
        slug: "positions",
        configuration: JSON.stringify({
          layout: "default",
          features: ["create", "view", "edit", "delete"],
        }),
        accessRoles: JSON.stringify(["super_admin"]),
        isSystem: true,
      },
      {
        name: "Page Management",
        description: "Manage pages",
        slug: "pages",
        configuration: JSON.stringify({
          layout: "default",
          features: ["create", "view", "edit", "delete"],
        }),
        accessRoles: JSON.stringify(["super_admin"]),
        isSystem: true,
      },
    ];

    // Create or update system pages
    for (const pageData of systemPages) {
      let page = await pageRepository.findOne({ where: { slug: pageData.slug } });

      if (!page) {
        page = new Page();
        page.slug = pageData.slug;
        page.isSystem = true;
      }

      page.name = pageData.name;
      page.description = pageData.description;
      page.configuration = pageData.configuration;
      page.accessRoles = pageData.accessRoles;
      page.isActive = true;

      await pageRepository.save(page);
      logger.info(`System page ${pageData.name} initialized`);
    }

    logger.info("System pages initialization completed");
  } catch (error) {
    logger.error(`Error initializing system pages: ${error}`);
  }
};