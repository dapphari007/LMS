import { AppDataSource } from "../config/database";
import { Role } from "../models/Role";
import logger from "../utils/logger";
import "../models"; // Import all models to ensure they're registered

export const createDefaultRoles = async (closeConnection = true, forceRecreate = false) => {
  try {
    // Initialize database connection if not already initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized");
    }
    
    const roleRepository = AppDataSource.getRepository(Role);

    // Check if roles already exist
    const existingRoles = await roleRepository.find();
    
    // Clean up duplicate roles with title case names
    const standardRoleNames = ["super_admin", "manager", "hr", "team_lead", "employee"];
    const duplicateRoles = existingRoles.filter(role => {
      // Check if this is a title case version of a standard role
      const lowercaseName = role.name.toLowerCase();
      return !standardRoleNames.includes(role.name) && 
             standardRoleNames.some(stdRole => stdRole.toLowerCase() === lowercaseName);
    });

    if (duplicateRoles.length > 0) {
      logger.info(`Found ${duplicateRoles.length} duplicate roles to remove`);
      for (const role of duplicateRoles) {
        logger.info(`Removing duplicate role: ${role.name}`);
        await roleRepository.remove(role);
      }
      logger.info('Duplicate roles removed successfully');
    }
    
    // If roles exist and we're not forcing recreation, skip creation
    if (existingRoles.length > 0 && !forceRecreate) {
      logger.info("Roles already exist, skipping creation");
      if (closeConnection) {
        await AppDataSource.destroy();
      }
      return;
    }
    
    // If forceRecreate is true, remove existing standard roles
    if (forceRecreate && existingRoles.length > 0) {
      logger.info("Force recreating roles - removing existing standard roles");
      const standardRoles = existingRoles.filter(role => 
        standardRoleNames.includes(role.name)
      );
      
      for (const role of standardRoles) {
        logger.info(`Removing standard role: ${role.name}`);
        await roleRepository.remove(role);
      }
    }

    const defaultRoles = [
      {
        name: "super_admin",
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
        name: "hr",
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
        name: "manager",
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
        name: "team_lead",
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
        name: "employee",
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

// Run the script if executed directly
if (require.main === module) {
  // Check if --force flag is provided
  const forceRecreate = process.argv.includes('--force');
  
  createDefaultRoles(true, forceRecreate)
    .then(() => {
      console.log(`Default roles ${forceRecreate ? 'recreated' : 'created'} successfully`);
      process.exit(0);
    })
    .catch((error) => {
      console.error("Error creating default roles:", error);
      process.exit(1);
    });
}
