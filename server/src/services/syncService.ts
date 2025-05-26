import { AppDataSource, ensureDatabaseConnection } from "../config/database";
import { Role, ApprovalWorkflow, UserRole } from "../models";
import logger from "../utils/logger";
import { DEFAULT_APPROVAL_WORKFLOWS } from "../controllers/approvalWorkflowController";

/**
 * Service to synchronize essential data in the database
 * This ensures that roles and approval workflows are always properly set up
 */
export class SyncService {
  /**
   * Synchronize all essential data
   */
  public static async syncAll(): Promise<void> {
    try {
      logger.info("Starting data synchronization...");
      
      // Ensure database connection
      await ensureDatabaseConnection();
      
      // Sync in sequence to avoid any potential conflicts
      await this.syncRoles();
      await this.syncApprovalWorkflows();
      
      logger.info("Data synchronization completed successfully");
    } catch (error) {
      logger.error(`Error during data synchronization: ${error}`);
    }
  }
  
  /**
   * Synchronize system roles
   */
  private static async syncRoles(): Promise<void> {
    try {
      logger.info("Synchronizing system roles...");
      
      // Check if roles table exists
      const tableExists = await this.tableExists("roles");
      if (!tableExists) {
        logger.warn("Roles table does not exist, skipping role synchronization");
        return;
      }
      
      const roleRepository = AppDataSource.getRepository(Role);
      
      // Define system roles based on UserRole enum
      const systemRoles = [
        {
          name: UserRole.SUPER_ADMIN,
          description: "Super Administrator with full access",
          permissions: JSON.stringify({
            users: { create: true, read: true, update: true, delete: true },
            roles: { create: true, read: true, update: true, delete: true },
            departments: { create: true, read: true, update: true, delete: true },
            positions: { create: true, read: true, update: true, delete: true },
            pages: { create: true, read: true, update: true, delete: true },
            leaveRequests: { create: true, read: true, update: true, delete: true },
            leaveTypes: { create: true, read: true, update: true, delete: true },
            leaveBalances: { create: true, read: true, update: true, delete: true },
            holidays: { create: true, read: true, update: true, delete: true },
            approvalWorkflows: { create: true, read: true, update: true, delete: true },
          }),
          isSystem: true,
        },
        {
          name: UserRole.MANAGER,
          description: "Manager with team management access",
          permissions: JSON.stringify({
            users: { create: false, read: true, update: true, delete: false },
            roles: { create: false, read: true, update: false, delete: false },
            departments: { create: false, read: true, update: false, delete: false },
            positions: { create: false, read: true, update: false, delete: false },
            pages: { create: false, read: true, update: false, delete: false },
            leaveRequests: { create: true, read: true, update: true, delete: false },
            leaveTypes: { create: false, read: true, update: false, delete: false },
            leaveBalances: { create: false, read: true, update: false, delete: false },
            holidays: { create: false, read: true, update: false, delete: false },
            approvalWorkflows: { create: false, read: true, update: false, delete: false },
          }),
          isSystem: true,
        },
        {
          name: UserRole.HR,
          description: "HR with personnel management access",
          permissions: JSON.stringify({
            users: { create: true, read: true, update: true, delete: false },
            roles: { create: false, read: true, update: false, delete: false },
            departments: { create: false, read: true, update: false, delete: false },
            positions: { create: false, read: true, update: false, delete: false },
            pages: { create: false, read: true, update: false, delete: false },
            leaveRequests: { create: true, read: true, update: true, delete: false },
            leaveTypes: { create: true, read: true, update: true, delete: true },
            leaveBalances: { create: true, read: true, update: true, delete: false },
            holidays: { create: true, read: true, update: true, delete: true },
            approvalWorkflows: { create: true, read: true, update: true, delete: true },
          }),
          isSystem: true,
        },
        {
          name: UserRole.TEAM_LEAD,
          description: "Team Lead with limited team management access",
          permissions: JSON.stringify({
            users: { create: false, read: true, update: false, delete: false },
            roles: { create: false, read: true, update: false, delete: false },
            departments: { create: false, read: true, update: false, delete: false },
            positions: { create: false, read: true, update: false, delete: false },
            pages: { create: false, read: true, update: false, delete: false },
            leaveRequests: { create: true, read: true, update: true, delete: false },
            leaveTypes: { create: false, read: true, update: false, delete: false },
            leaveBalances: { create: false, read: true, update: false, delete: false },
            holidays: { create: false, read: true, update: false, delete: false },
            approvalWorkflows: { create: false, read: true, update: false, delete: false },
          }),
          isSystem: true,
        },
        {
          name: UserRole.EMPLOYEE,
          description: "Regular employee with basic access",
          permissions: JSON.stringify({
            users: { create: false, read: false, update: false, delete: false },
            roles: { create: false, read: false, update: false, delete: false },
            departments: { create: false, read: true, update: false, delete: false },
            positions: { create: false, read: true, update: false, delete: false },
            pages: { create: false, read: false, update: false, delete: false },
            leaveRequests: { create: true, read: true, update: false, delete: false },
            leaveTypes: { create: false, read: true, update: false, delete: false },
            leaveBalances: { create: false, read: true, update: false, delete: false },
            holidays: { create: false, read: true, update: false, delete: false },
            approvalWorkflows: { create: false, read: false, update: false, delete: false },
          }),
          isSystem: true,
        },
      ];
      
      // Create or update system roles
      for (const roleData of systemRoles) {
        try {
          let role = await roleRepository.findOne({
            where: { name: roleData.name },
          });
          
          if (!role) {
            // Create new role
            role = new Role();
            role.name = roleData.name;
            role.isSystem = true;
            logger.info(`Creating system role: ${roleData.name}`);
          } else {
            logger.info(`Updating system role: ${roleData.name}`);
          }
          
          // Update role properties
          role.description = roleData.description;
          role.permissions = roleData.permissions;
          role.isActive = true;
          
          await roleRepository.save(role);
        } catch (error) {
          logger.error(`Error synchronizing role ${roleData.name}: ${error}`);
        }
      }
      
      logger.info("System roles synchronization completed");
    } catch (error) {
      logger.error(`Error synchronizing roles: ${error}`);
    }
  }
  
  /**
   * Synchronize approval workflows
   */
  private static async syncApprovalWorkflows(): Promise<void> {
    try {
      logger.info("Synchronizing approval workflows...");
      
      // Check if approval_workflows table exists
      const tableExists = await this.tableExists("approval_workflows");
      if (!tableExists) {
        logger.warn("Approval workflows table does not exist, skipping workflow synchronization");
        return;
      }
      
      const workflowRepository = AppDataSource.getRepository(ApprovalWorkflow);
      
      // Only create missing default workflows, don't update existing ones
      for (const workflowData of DEFAULT_APPROVAL_WORKFLOWS) {
        try {
          let workflow = await workflowRepository.findOne({
            where: { name: workflowData.name },
          });
          
          if (!workflow) {
            // Create new workflow only if it doesn't exist
            workflow = new ApprovalWorkflow();
            workflow.name = workflowData.name;
            workflow.minDays = workflowData.minDays;
            workflow.maxDays = workflowData.maxDays;
            workflow.approvalLevels = workflowData.approvalLevels;
            workflow.isActive = true;
            
            await workflowRepository.save(workflow);
            logger.info(`Created missing approval workflow: ${workflowData.name}`);
          } else {
            // Don't update existing workflows to preserve custom changes
            logger.info(`Preserving existing approval workflow: ${workflowData.name}`);
          }
        } catch (error) {
          logger.error(`Error synchronizing workflow ${workflowData.name}: ${error}`);
        }
      }
      
      logger.info("Approval workflows synchronization completed");
    } catch (error) {
      logger.error(`Error synchronizing approval workflows: ${error}`);
    }
  }
  
  /**
   * Check if a table exists in the database
   */
  private static async tableExists(tableName: string): Promise<boolean> {
    try {
      const result = await AppDataSource.query(
        `SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = $1
        )`,
        [tableName]
      );
      return result[0].exists;
    } catch (error) {
      logger.error(`Error checking if table ${tableName} exists: ${error}`);
      return false;
    }
  }
}