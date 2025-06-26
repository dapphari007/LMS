import { AppDataSource } from "../config/database";
import { Department } from "../models/Department";
import logger from "../utils/logger";

export const createDefaultDepartments = async (closeConnection = true) => {
  try {
    const departmentRepository = AppDataSource.getRepository(Department);

    // Check if departments already exist
    const existingDepartments = await departmentRepository.find();
    if (existingDepartments.length > 0) {
      logger.info("Departments already exist, skipping creation");
      if (closeConnection) {
        await AppDataSource.destroy();
      }
      return;
    }

    const defaultDepartments = [
      {
        name: "Human Resources",
        description:
          "Oversees employee relations, recruitment, benefits administration, and organizational development",
      },
      {
        name: "Information Technology",
        description:
          "Manages technology infrastructure, software development, cybersecurity, and technical support",
      },
      {
        name: "Finance",
        description:
          "Handles financial planning, accounting, budgeting, and financial reporting",
      },
      {
        name: "Operations",
        description:
          "Manages day-to-day business operations, process optimization, and quality control",
      },
      {
        name: "Marketing",
        description:
          "Handles brand management, digital marketing, content creation, and market research",
      },
      {
        name: "Sales",
        description:
          "Manages customer relationships, sales operations, and revenue generation",
      },
      {
        name: "Customer Support",
        description:
          "Provides customer service, technical support, and client relationship management",
      },
      {
        name: "Research & Development",
        description:
          "Focuses on innovation, product development, and technological advancement",
      },
      {
        name: "Legal & Compliance",
        description:
          "Handles legal matters, regulatory compliance, and risk management",
      },
      {
        name: "Administration",
        description:
          "Manages office operations, facilities, and administrative support services",
      },
    ];

    await departmentRepository.save(defaultDepartments);
    logger.info("Default departments created successfully");

    if (closeConnection) {
      await AppDataSource.destroy();
    }
  } catch (error) {
    logger.error("Error creating default departments:", error);
    if (closeConnection) {
      await AppDataSource.destroy();
    }
    throw error;
  }
};
