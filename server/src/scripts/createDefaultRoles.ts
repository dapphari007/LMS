import { AppDataSource } from "../config/database";
import { Role } from "../models/Role";
import logger from "../utils/logger";

export const createDefaultRoles = async (closeConnection = true) => {
  try {
    const roleRepository = AppDataSource.getRepository(Role);

    // Check if roles already exist
    const existingRoles = await roleRepository.find();
    if (existingRoles.length > 0) {
      logger.info("Roles already exist, skipping creation");
      if (closeConnection) {
        await AppDataSource.destroy();
      }
      return;
    }

    const defaultRoles = [
      {
        name: "Super Admin",
        description:
          "System administrator with full access to all features and settings",
        permissions: JSON.stringify([
          "manage_users",
          "manage_roles",
          "manage_departments",
          "manage_positions",
          "manage_leave_types",
          "manage_holidays",
          "manage_leave_balances",
          "manage_approval_workflows",
          "view_all_leaves",
          "approve_all_leaves",
          "manage_system_settings",
          "view_audit_logs",
          "manage_notifications",
          "export_reports",
        ]),
      },
      {
        name: "HR Manager",
        description:
          "Human Resources manager with access to employee management and leave administration",
        permissions: JSON.stringify([
          "manage_users",
          "manage_leave_types",
          "manage_holidays",
          "manage_leave_balances",
          "view_all_leaves",
          "approve_all_leaves",
          "manage_employee_records",
          "view_hr_reports",
          "manage_employee_onboarding",
          "manage_employee_offboarding",
        ]),
      },
      {
        name: "Department Manager",
        description:
          "Department head with access to team management and leave approvals",
        permissions: JSON.stringify([
          "view_department_users",
          "view_department_leaves",
          "approve_department_leaves",
          "manage_team_schedules",
          "view_team_reports",
          "manage_team_assignments",
          "view_team_performance",
        ]),
      },
      {
        name: "Team Lead",
        description:
          "Team leader with access to team management and basic approvals",
        permissions: JSON.stringify([
          "view_team_members",
          "view_team_leaves",
          "approve_team_leaves",
          "manage_team_schedules",
          "view_team_reports",
        ]),
      },
      {
        name: "Employee",
        description:
          "Regular employee with access to personal leave management",
        permissions: JSON.stringify([
          "view_own_profile",
          "apply_leave",
          "view_own_leaves",
          "view_own_leave_balance",
          "view_team_calendar",
          "view_company_holidays",
        ]),
      },
    ];

    await roleRepository.save(defaultRoles);
    logger.info("Default roles created successfully");

    if (closeConnection) {
      await AppDataSource.destroy();
    }
  } catch (error) {
    logger.error("Error creating default roles:", error);
    if (closeConnection) {
      await AppDataSource.destroy();
    }
    throw error;
  }
};
