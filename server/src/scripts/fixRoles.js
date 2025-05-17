require('dotenv').config();
const { Client } = require('pg');

async function fixRoles() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // 1. Delete duplicate title-case roles
    const deleteQuery = `
      DELETE FROM roles 
      WHERE name IN ('Super Admin', 'HR Manager', 'Department Manager', 'Team Lead', 'Employee')
    `;
    
    const deleteResult = await client.query(deleteQuery);
    console.log(`Deleted ${deleteResult.rowCount} duplicate roles`);

    // 2. Make sure we have the standard lowercase roles
    const standardRoles = [
      {
        name: "super_admin",
        description: "System administrator with full access to all features and settings",
        permissions: JSON.stringify([
          "manage_users", "manage_roles", "manage_departments", "manage_positions",
          "manage_leave_types", "manage_holidays", "manage_leave_balances",
          "manage_approval_workflows", "view_all_leaves", "approve_all_leaves",
          "manage_system_settings", "view_audit_logs", "manage_notifications", "export_reports"
        ])
      },
      {
        name: "hr",
        description: "Human Resources manager with access to employee management and leave administration",
        permissions: JSON.stringify([
          "manage_users", "manage_leave_types", "manage_holidays", "manage_leave_balances",
          "view_all_leaves", "approve_all_leaves", "manage_employee_records",
          "view_hr_reports", "manage_employee_onboarding", "manage_employee_offboarding"
        ])
      },
      {
        name: "manager",
        description: "Department head with access to team management and leave approvals",
        permissions: JSON.stringify([
          "view_department_users", "view_department_leaves", "approve_department_leaves",
          "manage_team_schedules", "view_team_reports", "manage_team_assignments", "view_team_performance"
        ])
      },
      {
        name: "team_lead",
        description: "Team leader with access to team management and basic approvals",
        permissions: JSON.stringify([
          "view_team_members", "view_team_leaves", "approve_team_leaves",
          "manage_team_schedules", "view_team_reports"
        ])
      },
      {
        name: "employee",
        description: "Regular employee with access to personal leave management",
        permissions: JSON.stringify([
          "view_own_profile", "apply_leave", "view_own_leaves",
          "view_own_leave_balance", "view_team_calendar", "view_company_holidays"
        ])
      }
    ];

    // Check if each standard role exists, if not create it
    for (const role of standardRoles) {
      const checkQuery = `SELECT id FROM roles WHERE name = $1`;
      const checkResult = await client.query(checkQuery, [role.name]);
      
      if (checkResult.rows.length === 0) {
        // Role doesn't exist, create it
        const insertQuery = `
          INSERT INTO roles (name, description, permissions, "isActive", "isSystem", "createdAt", "updatedAt")
          VALUES ($1, $2, $3, true, true, NOW(), NOW())
        `;
        await client.query(insertQuery, [role.name, role.description, role.permissions]);
        console.log(`Created role: ${role.name}`);
      } else {
        // Role exists, update it
        const updateQuery = `
          UPDATE roles 
          SET description = $2, permissions = $3, "updatedAt" = NOW()
          WHERE name = $1
        `;
        await client.query(updateQuery, [role.name, role.description, role.permissions]);
        console.log(`Updated role: ${role.name}`);
      }
    }

    console.log('Role cleanup completed successfully');
  } catch (error) {
    console.error('Error fixing roles:', error);
  } finally {
    await client.end();
    console.log('Database connection closed');
  }
}

fixRoles().catch(console.error);