import { AppDataSource, ensureDatabaseConnection } from "../config/database";
import { Role, ApprovalWorkflow, UserRole, Department, Position, LeaveType, WorkflowCategory, LeaveBalance } from "../models";
import logger from "../utils/logger";
import { DEFAULT_APPROVAL_WORKFLOWS } from "../controllers/approvalWorkflowController";
import { initApprovalWorkflows } from "../config/initApprovalWorkflows";
import { getCurrentYear } from "../utils/dateUtils";

/**
 * Default departments to create if none exist in the database
 */
const DEFAULT_DEPARTMENTS = [
  {
    name: "Human Resources",
    description: "Responsible for recruiting, onboarding, and employee relations",
    isActive: true,
  },
  {
    name: "Information Technology",
    description: "Manages IT infrastructure, software development, and technical support",
    isActive: true,
  },
  {
    name: "Finance",
    description: "Handles accounting, budgeting, and financial reporting",
    isActive: true,
  },
  {
    name: "Marketing",
    description: "Manages brand strategy, marketing campaigns, and communications",
    isActive: true,
  },
  {
    name: "Operations",
    description: "Oversees day-to-day business operations and logistics",
    isActive: true,
  },
  {
    name: "Sales",
    description: "Responsible for business development and customer acquisition",
    isActive: true,
  },
  {
    name: "Research & Development",
    description: "Focuses on innovation and product development",
    isActive: true,
  },
  {
    name: "Customer Support",
    description: "Provides assistance and support to customers",
    isActive: true,
  },
];

/**
 * Default positions to create if none exist in the database
 * Each position can be associated with a department by name
 */
const DEFAULT_POSITIONS = [
  // HR Department positions
  {
    name: "HR Director",
    description: "Oversees all HR operations and strategic planning",
    departmentName: "Human Resources",
    isActive: true,
    level: 4,
  },
  {
    name: "HR Manager",
    description: "Manages the HR department and oversees all HR functions",
    departmentName: "Human Resources",
    isActive: true,
    level: 3,
  },
  {
    name: "HR Specialist",
    description: "Handles specific HR functions like recruitment or employee relations",
    departmentName: "Human Resources",
    isActive: true,
    level: 2,
  },
  {
    name: "HR Coordinator",
    description: "Provides administrative support to HR department",
    departmentName: "Human Resources",
    isActive: true,
    level: 1,
  },
  {
    name: "Recruiter",
    description: "Responsible for sourcing and hiring new talent",
    departmentName: "Human Resources",
    isActive: true,
    level: 2,
  },
  
  // IT Department positions
  {
    name: "IT Director",
    description: "Oversees all IT operations and strategy",
    departmentName: "Information Technology",
    isActive: true,
    level: 4,
  },
  {
    name: "IT Manager",
    description: "Manages IT team and technology infrastructure",
    departmentName: "Information Technology",
    isActive: true,
    level: 3,
  },
  {
    name: "Senior Software Engineer",
    description: "Leads development projects and mentors junior developers",
    departmentName: "Information Technology",
    isActive: true,
    level: 3,
  },
  {
    name: "Software Engineer",
    description: "Develops and maintains software applications",
    departmentName: "Information Technology",
    isActive: true,
    level: 2,
  },
  {
    name: "Junior Software Engineer",
    description: "Assists in software development under supervision",
    departmentName: "Information Technology",
    isActive: true,
    level: 1,
  },
  {
    name: "System Administrator",
    description: "Manages and maintains IT infrastructure",
    departmentName: "Information Technology",
    isActive: true,
    level: 2,
  },
  {
    name: "QA Engineer",
    description: "Tests software for quality assurance",
    departmentName: "Information Technology",
    isActive: true,
    level: 2,
  },
  
  // Finance Department positions
  {
    name: "Finance Director",
    description: "Oversees all financial operations and strategy",
    departmentName: "Finance",
    isActive: true,
    level: 4,
  },
  {
    name: "Finance Manager",
    description: "Oversees financial operations and reporting",
    departmentName: "Finance",
    isActive: true,
    level: 3,
  },
  {
    name: "Senior Accountant",
    description: "Handles complex accounting tasks and financial analysis",
    departmentName: "Finance",
    isActive: true,
    level: 2,
  },
  {
    name: "Accountant",
    description: "Manages accounting and financial records",
    departmentName: "Finance",
    isActive: true,
    level: 1,
  },
  {
    name: "Financial Analyst",
    description: "Analyzes financial data and provides insights",
    departmentName: "Finance",
    isActive: true,
    level: 2,
  },
  
  // Marketing Department positions
  {
    name: "Marketing Director",
    description: "Leads marketing strategy and campaigns",
    departmentName: "Marketing",
    isActive: true,
    level: 4,
  },
  {
    name: "Marketing Manager",
    description: "Manages marketing campaigns and team",
    departmentName: "Marketing",
    isActive: true,
    level: 3,
  },
  {
    name: "Marketing Specialist",
    description: "Implements marketing campaigns and initiatives",
    departmentName: "Marketing",
    isActive: true,
    level: 2,
  },
  {
    name: "Marketing Coordinator",
    description: "Supports marketing activities and campaign execution",
    departmentName: "Marketing",
    isActive: true,
    level: 1,
  },
  {
    name: "Content Creator",
    description: "Creates content for marketing materials",
    departmentName: "Marketing",
    isActive: true,
    level: 2,
  },
  
  // Operations Department positions
  {
    name: "Operations Director",
    description: "Oversees all operational activities and strategy",
    departmentName: "Operations",
    isActive: true,
    level: 4,
  },
  {
    name: "Operations Manager",
    description: "Oversees day-to-day business operations",
    departmentName: "Operations",
    isActive: true,
    level: 3,
  },
  {
    name: "Operations Supervisor",
    description: "Supervises operational staff and ensures efficiency",
    departmentName: "Operations",
    isActive: true,
    level: 2,
  },
  {
    name: "Operations Specialist",
    description: "Handles day-to-day operational tasks",
    departmentName: "Operations",
    isActive: true,
    level: 1,
  },
  {
    name: "Project Manager",
    description: "Manages projects from initiation to completion",
    departmentName: "Operations",
    isActive: true,
    level: 3,
  },
  
  // Sales Department positions
  {
    name: "Sales Director",
    description: "Leads sales strategy and team",
    departmentName: "Sales",
    isActive: true,
    level: 4,
  },
  {
    name: "Sales Manager",
    description: "Manages sales team and customer relationships",
    departmentName: "Sales",
    isActive: true,
    level: 3,
  },
  {
    name: "Senior Sales Representative",
    description: "Handles key accounts and complex sales",
    departmentName: "Sales",
    isActive: true,
    level: 2,
  },
  {
    name: "Sales Representative",
    description: "Sells products or services to customers",
    departmentName: "Sales",
    isActive: true,
    level: 1,
  },
  {
    name: "Account Manager",
    description: "Manages relationships with existing clients",
    departmentName: "Sales",
    isActive: true,
    level: 2,
  },
  
  // R&D Department positions
  {
    name: "Research Director",
    description: "Leads research and development initiatives",
    departmentName: "Research & Development",
    isActive: true,
    level: 4,
  },
  {
    name: "Research Manager",
    description: "Manages research teams and projects",
    departmentName: "Research & Development",
    isActive: true,
    level: 3,
  },
  {
    name: "Senior Researcher",
    description: "Conducts advanced research and leads research projects",
    departmentName: "Research & Development",
    isActive: true,
    level: 2,
  },
  {
    name: "Product Developer",
    description: "Develops new products and features",
    departmentName: "Research & Development",
    isActive: true,
    level: 2,
  },
  {
    name: "Research Assistant",
    description: "Assists with research activities and data collection",
    departmentName: "Research & Development",
    isActive: true,
    level: 1,
  },
  
  // Customer Support Department positions
  {
    name: "Support Director",
    description: "Oversees all customer support operations",
    departmentName: "Customer Support",
    isActive: true,
    level: 4,
  },
  {
    name: "Support Manager",
    description: "Manages customer support operations",
    departmentName: "Customer Support",
    isActive: true,
    level: 3,
  },
  {
    name: "Senior Support Specialist",
    description: "Handles complex customer issues and mentors junior staff",
    departmentName: "Customer Support",
    isActive: true,
    level: 2,
  },
  {
    name: "Customer Support Specialist",
    description: "Provides direct support to customers",
    departmentName: "Customer Support",
    isActive: true,
    level: 1,
  },
];

/**
 * Default leave types to create if none exist in the database
 */
const DEFAULT_LEAVE_TYPES = [
  {
    name: "Annual Leave",
    description: "Regular paid time off for vacation or personal matters",
    defaultDays: 20,
    isCarryForward: true,
    maxCarryForwardDays: 5,
    isActive: true,
    applicableGender: null, // For all genders
    isHalfDayAllowed: true,
    isPaidLeave: true,
  },
  {
    name: "Sick Leave",
    description: "Leave for medical reasons or illness",
    defaultDays: 10,
    isCarryForward: false,
    maxCarryForwardDays: 0,
    isActive: true,
    applicableGender: null, // For all genders
    isHalfDayAllowed: true,
    isPaidLeave: true,
  },
  {
    name: "Maternity Leave",
    description: "Leave for female employees before and after childbirth",
    defaultDays: 90,
    isCarryForward: false,
    maxCarryForwardDays: 0,
    isActive: true,
    applicableGender: "female",
    isHalfDayAllowed: false,
    isPaidLeave: true,
  },
  {
    name: "Paternity Leave",
    description: "Leave for male employees after the birth of their child",
    defaultDays: 10,
    isCarryForward: false,
    maxCarryForwardDays: 0,
    isActive: true,
    applicableGender: "male",
    isHalfDayAllowed: false,
    isPaidLeave: true,
  },
  {
    name: "Bereavement Leave",
    description: "Leave due to the death of a family member",
    defaultDays: 5,
    isCarryForward: false,
    maxCarryForwardDays: 0,
    isActive: true,
    applicableGender: null, // For all genders
    isHalfDayAllowed: false,
    isPaidLeave: true,
  },
  {
    name: "Unpaid Leave",
    description: "Leave without pay for personal reasons",
    defaultDays: 30,
    isCarryForward: false,
    maxCarryForwardDays: 0,
    isActive: true,
    applicableGender: null, // For all genders
    isHalfDayAllowed: true,
    isPaidLeave: false,
  },
  {
    name: "Work From Home",
    description: "Working remotely from home",
    defaultDays: 15,
    isCarryForward: false,
    maxCarryForwardDays: 0,
    isActive: true,
    applicableGender: null, // For all genders
    isHalfDayAllowed: true,
    isPaidLeave: true,
  },
  {
    name: "Compensatory Off",
    description: "Leave granted for working on holidays or weekends",
    defaultDays: 0, // Accumulates based on work
    isCarryForward: true,
    maxCarryForwardDays: 5,
    isActive: true,
    applicableGender: null, // For all genders
    isHalfDayAllowed: true,
    isPaidLeave: true,
  },
];

/**
 * Default workflow categories that match the approval workflows
 */
const DEFAULT_WORKFLOW_CATEGORIES = [
  {
    name: "Short Leave",
    description: "For short leaves between 0.5 to 2 days",
    minDays: 0.5,
    maxDays: 2,
    maxSteps: 2,
    isActive: true,
  },
  {
    name: "Medium Leave",
    description: "For medium-length leaves between 3 to 5 days",
    minDays: 3,
    maxDays: 5,
    maxSteps: 3,
    isActive: true,
  },
  {
    name: "Long Leave",
    description: "For longer leaves between 6 to 10 days",
    minDays: 6,
    maxDays: 10,
    maxSteps: 4,
    isActive: true,
  },
  {
    name: "Extended Leave",
    description: "For extended leaves between 11 to 20 days",
    minDays: 11,
    maxDays: 20,
    maxSteps: 5,
    isActive: true,
  },
  {
    name: "Long-Term Leave",
    description: "For long-term leaves of 21 days or more",
    minDays: 21,
    maxDays: 365,
    maxSteps: 6,
    isActive: true,
  },
];

/**
 * Script to synchronize essential data (roles, departments, positions, leave types, workflow categories, and approval workflows)
 * This can be run independently or as part of the server startup process
 */
export const syncEssentialData = async (closeConnection = true, skipWorkflows = false) => {
  try {
    logger.info("Starting essential data synchronization...");
    
    // Ensure database connection
    await ensureDatabaseConnection();
    
    // Sync roles
    await syncRoles();
    
    // Sync departments
    await syncDepartments();
    
    // Sync positions
    await syncPositions();
    
    // Sync leave types
    await syncLeaveTypes();
    
    // Sync workflow categories
    await syncWorkflowCategories();
    
    // Sync approval workflows (only if not skipped)
    if (!skipWorkflows) {
      logger.info("Synchronizing approval workflows as part of essential data sync...");
      await syncApprovalWorkflows();
    } 
    
    // Close connection if requested
    if (closeConnection && AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      logger.info("Database connection closed");
    }
  } catch (error) {
    logger.error(`Error during essential data synchronization: ${error}`);
    
    // Ensure connection is closed on error
    if (closeConnection && AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
    
    throw error;
  }
};

/**
 * Synchronizes departments in the database
 * If no departments exist, creates default departments
 */
export const syncDepartments = async (): Promise<void> => {
  try {
    // Ensure database connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const departmentRepository = AppDataSource.getRepository(Department);
    
    // Check if any departments exist
    const departmentCount = await departmentRepository.count();
    
    if (departmentCount === 0) {
      logger.info("No departments found in database. Creating default departments...");
      
      // Create default departments
      const departmentsToCreate = DEFAULT_DEPARTMENTS.map(dept => {
        const department = new Department();
        department.name = dept.name;
        department.description = dept.description;
        department.isActive = dept.isActive;
        return department;
      });
      
      // Save departments to database
      await departmentRepository.save(departmentsToCreate);
      
      logger.info(`Successfully created ${departmentsToCreate.length} default departments`);
    } else {
      logger.info(`Found ${departmentCount} existing departments. No synchronization needed.`);
    }
  } catch (error) {
    logger.error("Error synchronizing departments:", error);
    throw error;
  }
};

/**
 * Synchronizes positions in the database
 * If no positions exist, creates default positions
 */
export const syncPositions = async (): Promise<void> => {
  try {
    // Ensure database connection
    await ensureDatabaseConnection();

    const positionRepository = AppDataSource.getRepository(Position);
    const departmentRepository = AppDataSource.getRepository(Department);
    
    // Check if any positions exist
    const positionCount = await positionRepository.count();
    
    // Check if level column exists in the positions table
    let hasLevelColumn = false;
    try {
      // Try to get the metadata for the Position entity
      const positionMetadata = AppDataSource.getMetadata(Position);
      hasLevelColumn = positionMetadata.columns.some(column => column.propertyName === 'level');
      logger.info(`Level column ${hasLevelColumn ? 'exists' : 'does not exist'} in positions table`);
    } catch (error) {
      logger.warn("Could not check if level column exists:", error);
    }
    
    if (positionCount === 0) {
      logger.info("No positions found in database. Creating default positions...");
      
      // Get all departments to map names to IDs
      const departments = await departmentRepository.find();
      const departmentMap = new Map<string, string>();
      
      departments.forEach(dept => {
        departmentMap.set(dept.name, dept.id);
      });
      
      // Create default positions
      const positionsToCreate = [];
      
      for (const pos of DEFAULT_POSITIONS) {
        const position = new Position();
        position.name = pos.name;
        position.description = pos.description;
        position.isActive = pos.isActive;
        
        // Only set level if the column exists
        if (hasLevelColumn) {
          position.level = pos.level || 1; // Default to level 1 if not specified
        }
        
        // Set department ID if the department exists
        if (pos.departmentName && departmentMap.has(pos.departmentName)) {
          position.departmentId = departmentMap.get(pos.departmentName);
        }
        
        positionsToCreate.push(position);
      }
      
      // Save positions to database
      await positionRepository.save(positionsToCreate);
      
      logger.info(`Successfully created ${positionsToCreate.length} default positions`);
    } else {
      logger.info(`Found ${positionCount} existing positions. No synchronization needed.`);
    }
  } catch (error) {
    logger.error("Error synchronizing positions:", error);
    throw error;
  }
};

/**
 * Synchronize system roles
 */
const syncRoles = async (): Promise<void> => {
  try {
    logger.info("Synchronizing system roles...");
    
    // Check if roles table exists
    const tableExists = await checkTableExists("roles");
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
};

/**
 * Synchronize approval workflows
 */
const syncApprovalWorkflows = async (): Promise<void> => {
  try {
    logger.info("Synchronizing approval workflows...");
    
    // Check if approval_workflows table exists
    const tableExists = await checkTableExists("approval_workflows");
    if (!tableExists) {
      logger.warn("Approval workflows table does not exist, skipping workflow synchronization");
      return;
    }
    
    const workflowRepository = AppDataSource.getRepository(ApprovalWorkflow);
    
    // Check if any workflows exist
    const existingWorkflowsCount = await workflowRepository.count();
    
    if (existingWorkflowsCount > 0) {
      // If any workflows exist, don't create new ones
      logger.info(`Found ${existingWorkflowsCount} existing approval workflows. No synchronization needed.`);
      
      // Log existing workflows for information
      const existingWorkflows = await workflowRepository.find();
      for (const workflow of existingWorkflows) {
        logger.info(`Preserving existing approval workflow: ${workflow.name}`);
      }
      
      return;
    }
    
    // Only create default workflows if none exist
    logger.info("No existing approval workflows found. Creating default workflows...");
    
    // Create all default workflows
    for (const workflowData of DEFAULT_APPROVAL_WORKFLOWS) {
      try {
        const workflow = new ApprovalWorkflow();
        workflow.name = workflowData.name;
        workflow.minDays = workflowData.minDays;
        workflow.maxDays = workflowData.maxDays;
        workflow.approvalLevels = workflowData.approvalLevels;
        workflow.isActive = true;
        
        await workflowRepository.save(workflow);
        logger.info(`Created approval workflow: ${workflowData.name}`);
      } catch (error) {
        logger.error(`Error creating workflow ${workflowData.name}: ${error}`);
      }
    }
    
    logger.info("Approval workflows synchronization completed");
  } catch (error) {
    logger.error(`Error synchronizing approval workflows: ${error}`);
  }
};

/**
 * Synchronize leave types
 */
const syncLeaveTypes = async (): Promise<void> => {
  try {
    logger.info("Synchronizing leave types...");
    
    // Check if leave_types table exists
    const tableExists = await checkTableExists("leave_types");
    if (!tableExists) {
      logger.warn("Leave types table does not exist, skipping leave types synchronization");
      return;
    }
    
    const leaveTypeRepository = AppDataSource.getRepository(LeaveType);
    
    // Create leave types if they don't exist
    let created = 0;
    let skipped = 0;

    for (const leaveTypeData of DEFAULT_LEAVE_TYPES) {
      try {
        // Check if leave type already exists
        const existingLeaveType = await leaveTypeRepository.findOne({
          where: { name: leaveTypeData.name },
        });

        if (!existingLeaveType) {
          // Create new leave type
          const leaveType = new LeaveType();
          Object.assign(leaveType, leaveTypeData);
          await leaveTypeRepository.save(leaveType);
          created++;
          logger.info(`Created leave type: ${leaveTypeData.name}`);
        } else {
          skipped++;
        }
      } catch (leaveTypeError) {
        // Log the error but continue with the next leave type
        logger.error(
          `Error processing leave type ${leaveTypeData.name}: ${leaveTypeError}`
        );
        skipped++;
      }
    }

    logger.info(
      `Leave types synchronization completed. Created: ${created}, Skipped: ${skipped}`
    );
  } catch (error) {
    logger.error(`Error synchronizing leave types: ${error}`);
  }
};

/**
 * Synchronize workflow categories
 */
const syncWorkflowCategories = async (): Promise<void> => {
  try {
    logger.info("Synchronizing workflow categories...");
    
    // Check if workflow_categories table exists
    const tableExists = await checkTableExists("workflow_categories");
    if (!tableExists) {
      logger.warn("Workflow categories table does not exist, skipping workflow categories synchronization");
      return;
    }
    
    // Check if the maxSteps column exists, and add it if it doesn't
    try {
      const queryRunner = AppDataSource.createQueryRunner();
      await queryRunner.connect();
      
      try {
        const table = await queryRunner.getTable("workflow_categories");
        if (table) {
          const maxStepsColumn = table.findColumnByName("maxSteps");
          
          if (!maxStepsColumn) {
            logger.info("Adding maxSteps column to workflow_categories table");
            
            // Add maxSteps column with default value 3
            await queryRunner.query(`ALTER TABLE "workflow_categories" ADD COLUMN IF NOT EXISTS "maxSteps" integer NOT NULL DEFAULT 3`);
            
            // Update existing categories with specific maxSteps values
            await queryRunner.query(`UPDATE "workflow_categories" SET "maxSteps" = 2 WHERE "name" = 'Short Leave'`);
            await queryRunner.query(`UPDATE "workflow_categories" SET "maxSteps" = 3 WHERE "name" = 'Medium Leave'`);
            await queryRunner.query(`UPDATE "workflow_categories" SET "maxSteps" = 4 WHERE "name" = 'Long Leave'`);
            await queryRunner.query(`UPDATE "workflow_categories" SET "maxSteps" = 5 WHERE "name" = 'Extended Leave'`);
            await queryRunner.query(`UPDATE "workflow_categories" SET "maxSteps" = 6 WHERE "name" = 'Long-Term Leave'`);
            
            logger.info("Successfully added maxSteps column to workflow_categories table");
          } else {
            logger.info("maxSteps column already exists in workflow_categories table");
          }
        }
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      logger.error("Error checking/adding maxSteps column:", error);
    }

    const workflowCategoryRepository = AppDataSource.getRepository(WorkflowCategory);

    // Check if any workflow categories already exist
    const existingCategories = await workflowCategoryRepository.find();

    if (existingCategories.length > 0) {
      logger.info(`Found ${existingCategories.length} existing workflow categories.`);

      // Create only the missing categories
      for (const categoryData of DEFAULT_WORKFLOW_CATEGORIES) {
        const existingCategory = existingCategories.find(
          (cat) => cat.name === categoryData.name
        );

        if (!existingCategory) {
          try {
            // Check for overlapping categories
            const overlappingCategories = await workflowCategoryRepository.find({
              where: [
                {
                  minDays: categoryData.minDays,
                  maxDays: categoryData.maxDays,
                },
              ],
            });

            if (overlappingCategories.length > 0) {
              logger.warn(
                `Skipping creation of category "${categoryData.name}" as it overlaps with existing categories`
              );
              continue;
            }

            // Create the missing category
            const category = new WorkflowCategory();
            category.name = categoryData.name;
            category.description = categoryData.description;
            category.minDays = categoryData.minDays;
            category.maxDays = categoryData.maxDays;
            category.maxSteps = categoryData.maxSteps || 3; // Default to 3 if not specified
            category.isActive = categoryData.isActive;

            await workflowCategoryRepository.save(category);
            logger.info(`Created workflow category: ${categoryData.name}`);
          } catch (error) {
            logger.error(
              `Error creating workflow category ${categoryData.name}:`,
              error
            );
          }
        }
      }
    } else {
      logger.info("No existing workflow categories found. Creating defaults...");

      // Create all default categories
      for (const categoryData of DEFAULT_WORKFLOW_CATEGORIES) {
        try {
          const category = new WorkflowCategory();
          category.name = categoryData.name;
          category.description = categoryData.description;
          category.minDays = categoryData.minDays;
          category.maxDays = categoryData.maxDays;
          category.maxSteps = categoryData.maxSteps || 3; // Default to 3 if not specified
          category.isActive = categoryData.isActive;

          await workflowCategoryRepository.save(category);
          logger.info(`Created workflow category: ${categoryData.name}`);
        } catch (error) {
          logger.error(
            `Error creating workflow category ${categoryData.name}:`,
            error
          );
        }
      }
    }
    
    logger.info("Workflow categories synchronization completed");
  } catch (error) {
    logger.error(`Error synchronizing workflow categories: ${error}`);
  }
};

/**
 * Check if a table exists in the database
 */
const checkTableExists = async (tableName: string): Promise<boolean> => {
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
};

/**
 * Script to check the current status of essential data (roles, departments, positions, leave types, workflow categories, and approval workflows)
 * This can be run independently to verify the database state
 */
export const checkEssentialData = async (closeConnection = true) => {
  try {
    logger.info("Checking essential data in the database...");
    
    // Ensure database connection
    await ensureDatabaseConnection();
    
    // Check roles
    await checkRoles();
    
    // Check departments
    await checkDepartments();
    
    // Check positions
    await checkPositions();
    
    // Check leave types
    await checkLeaveTypes();
    
    // Check workflow categories
    await checkWorkflowCategories();
    
    // Check approval workflows
    await checkApprovalWorkflows();
    
    logger.info("Essential data check completed");
    
    // Close connection if requested
    if (closeConnection && AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      logger.info("Database connection closed");
    }
  } catch (error) {
    logger.error(`Error during essential data check: ${error}`);
    
    // Ensure connection is closed on error
    if (closeConnection && AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
    
    throw error;
  }
};

/**
 * Check roles in the database
 */
const checkRoles = async (): Promise<void> => {
  try {
    logger.info("Checking roles...");
    
    // Check if roles table exists
    const tableExists = await checkTableExists("roles");
    if (!tableExists) {
      logger.warn("Roles table does not exist");
      return;
    }
    
    const roleRepository = AppDataSource.getRepository(Role);
    const roles = await roleRepository.find({
      order: {
        isSystem: "DESC",
        name: "ASC"
      }
    });
    
    if (roles.length === 0) {
      logger.warn("No roles found in the database");
    } else {
      logger.info(`Found ${roles.length} roles:`);
      roles.forEach((role, index) => {
        logger.info(`${index + 1}. ${role.name} ${role.isSystem ? '(System)' : ''}`);
      });
    }
  } catch (error) {
    logger.error(`Error checking roles: ${error}`);
  }
};

/**
 * Check departments in the database
 */
const checkDepartments = async (): Promise<void> => {
  try {
    logger.info("Checking departments...");
    
    // Check if departments table exists
    const tableExists = await checkTableExists("departments");
    if (!tableExists) {
      logger.warn("Departments table does not exist");
      return;
    }
    
    const departmentRepository = AppDataSource.getRepository(Department);
    const departments = await departmentRepository.find({
      order: {
        name: "ASC"
      }
    });
    
    if (departments.length === 0) {
      logger.warn("No departments found in the database");
    } else {
      logger.info(`Found ${departments.length} departments:`);
      departments.forEach((department, index) => {
        logger.info(`${index + 1}. ${department.name} ${department.isActive ? '(Active)' : '(Inactive)'}`);
      });
    }
  } catch (error) {
    logger.error(`Error checking departments: ${error}`);
  }
};

/**
 * Check positions in the database
 */
const checkPositions = async (): Promise<void> => {
  try {
    logger.info("Checking positions...");
    
    // Check if positions table exists
    const tableExists = await checkTableExists("positions");
    if (!tableExists) {
      logger.warn("Positions table does not exist");
      return;
    }
    
    const positionRepository = AppDataSource.getRepository(Position);
    const positions = await positionRepository.find({
      relations: ["department"],
      order: {
        name: "ASC"
      }
    });
    
    if (positions.length === 0) {
      logger.warn("No positions found in the database");
    } else {
      logger.info(`Found ${positions.length} positions:`);
      positions.forEach((position, index) => {
        const departmentName = position.department ? position.department.name : 'No Department';
        logger.info(`${index + 1}. ${position.name} - ${departmentName} ${position.isActive ? '(Active)' : '(Inactive)'}`);
      });
    }
  } catch (error) {
    logger.error(`Error checking positions: ${error}`);
  }
};

/**
 * Check approval workflows in the database
 */
const checkApprovalWorkflows = async (): Promise<void> => {
  try {
    logger.info("Checking approval workflows...");
    
    // Check if approval_workflows table exists
    const tableExists = await checkTableExists("approval_workflows");
    if (!tableExists) {
      logger.warn("Approval workflows table does not exist");
      return;
    }
    
    const workflowRepository = AppDataSource.getRepository(ApprovalWorkflow);
    const workflows = await workflowRepository.find({
      order: {
        minDays: "ASC"
      }
    });
    
    if (workflows.length === 0) {
      logger.warn("No approval workflows found in the database");
    } else {
      logger.info(`Found ${workflows.length} approval workflows:`);
      workflows.forEach((workflow, index) => {
        logger.info(`${index + 1}. ${workflow.name} (${workflow.minDays}-${workflow.maxDays} days)`);
      });
    }
  } catch (error) {
    logger.error(`Error checking approval workflows: ${error}`);
  }
};

/**
 * Check leave types in the database
 */
const checkLeaveTypes = async (): Promise<void> => {
  try {
    logger.info("Checking leave types...");
    
    // Check if leave_types table exists
    const tableExists = await checkTableExists("leave_types");
    if (!tableExists) {
      logger.warn("Leave types table does not exist");
      return;
    }
    
    const leaveTypeRepository = AppDataSource.getRepository(LeaveType);
    const leaveTypes = await leaveTypeRepository.find({
      order: {
        name: "ASC"
      }
    });
    
    if (leaveTypes.length === 0) {
      logger.warn("No leave types found in the database");
    } else {
      logger.info(`Found ${leaveTypes.length} leave types:`);
      leaveTypes.forEach((leaveType, index) => {
        logger.info(`${index + 1}. ${leaveType.name} (${leaveType.defaultDays} days) ${leaveType.isActive ? '(Active)' : '(Inactive)'}`);
      });
    }
  } catch (error) {
    logger.error(`Error checking leave types: ${error}`);
  }
};

/**
 * Check workflow categories in the database
 */
const checkWorkflowCategories = async (): Promise<void> => {
  try {
    logger.info("Checking workflow categories...");
    
    // Check if workflow_categories table exists
    const tableExists = await checkTableExists("workflow_categories");
    if (!tableExists) {
      logger.warn("Workflow categories table does not exist");
      return;
    }
    
    const workflowCategoryRepository = AppDataSource.getRepository(WorkflowCategory);
    const categories = await workflowCategoryRepository.find({
      order: {
        minDays: "ASC"
      }
    });
    
    if (categories.length === 0) {
      logger.warn("No workflow categories found in the database");
    } else {
      logger.info(`Found ${categories.length} workflow categories:`);
      categories.forEach((category, index) => {
        logger.info(`${index + 1}. ${category.name} (${category.minDays}-${category.maxDays} days, max ${category.maxSteps} steps) ${category.isActive ? '(Active)' : '(Inactive)'}`);
      });
    }
  } catch (error) {
    logger.error(`Error checking workflow categories: ${error}`);
  }
};

/**
 * Initialize approval workflows using the config module
 * This is a wrapper around the initApprovalWorkflows function for consistency
 */
export const runInitApprovalWorkflows = async (closeConnection = true): Promise<void> => {
  try {
    logger.info("Starting approval workflows initialization...");

    // Initialize the database connection if not already initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized");
    }

    // Initialize approval workflows
    await initApprovalWorkflows();

    logger.info("Approval workflows initialization completed successfully");
  } catch (error) {
    logger.error(`Error during approval workflows initialization: ${error}`);
    throw error;
  } finally {
    // Close the database connection if requested
    if (closeConnection && AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      logger.info("Database connection closed");
    }
  }
};

/**
 * Check if a specific leave type exists by ID and display its details
 * @param leaveTypeId - The ID of the leave type to check
 * @param closeConnection - Whether to close the database connection after execution
 */
export const checkSpecificLeaveType = async (leaveTypeId: string, closeConnection = true): Promise<void> => {
  try {
    logger.info(`Checking for leave type with ID: ${leaveTypeId}`);
    
    // Initialize the database connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized");
    }
    
    // Check if the leave type exists
    const leaveTypeRepository = AppDataSource.getRepository(LeaveType);
    const leaveType = await leaveTypeRepository.findOne({ where: { id: leaveTypeId } });
    
    if (leaveType) {
      logger.info("Leave type found:");
      logger.info({
        id: leaveType.id,
        name: leaveType.name,
        description: leaveType.description,
        defaultDays: leaveType.defaultDays,
        isActive: leaveType.isActive,
        createdAt: leaveType.createdAt,
        updatedAt: leaveType.updatedAt
      });
    } else {
      logger.info(`No leave type found with ID: ${leaveTypeId}`);
      
      // Check if any leave types exist
      const allLeaveTypes = await leaveTypeRepository.find({ take: 5 });
      
      if (allLeaveTypes.length > 0) {
        logger.info(`Found ${allLeaveTypes.length} other leave types. Here are the first 5:`);
        allLeaveTypes.forEach(lt => {
          logger.info(`- ${lt.id}: ${lt.name}`);
        });
      } else {
        logger.info("No leave types found in the database.");
      }
    }
  } catch (error) {
    logger.error("Error checking leave type:", error);
    throw error;
  } finally {
    // Close the database connection if requested
    if (closeConnection && AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
};

/**
 * Check leave type balances for a specific leave type and year
 * @param leaveTypeId - The ID of the leave type to check balances for
 * @param year - The year to check balances for (optional, defaults to current year)
 * @param closeConnection - Whether to close the database connection after execution
 */
export const checkLeaveTypeBalances = async (leaveTypeId: string, year?: number, closeConnection = true): Promise<void> => {
  try {
    const checkYear = year || getCurrentYear();
    logger.info(`Checking leave balances for leave type ID: ${leaveTypeId}, year: ${checkYear}`);
    
    // Initialize the database connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized");
    }
    
    // First check if the leave type exists
    const leaveTypeRepository = AppDataSource.getRepository(LeaveType);
    const leaveType = await leaveTypeRepository.findOne({ where: { id: leaveTypeId } });
    
    if (!leaveType) {
      logger.info(`Leave type with ID ${leaveTypeId} not found`);
      
      // Check if any leave types exist
      const allLeaveTypes = await leaveTypeRepository.find({ take: 5 });
      
      if (allLeaveTypes.length > 0) {
        logger.info(`Found ${allLeaveTypes.length} other leave types. Here are the first 5:`);
        allLeaveTypes.forEach(lt => {
          logger.info(`- ${lt.id}: ${lt.name}`);
        });
      } else {
        logger.info("No leave types found in the database.");
      }
      
      return;
    }
    
    logger.info(`Found leave type: ${leaveType.name}`);
    
    // Check if leave balances exist for this leave type and year
    const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
    const leaveBalances = await leaveBalanceRepository.find({
      where: {
        leaveTypeId: leaveTypeId,
        year: checkYear
      },
      relations: ["user"],
      take: 10
    });
    
    logger.info(`Found ${leaveBalances.length} leave balances for leave type ${leaveTypeId} and year ${checkYear}`);
    
    if (leaveBalances.length > 0) {
      logger.info("Sample leave balances:");
      leaveBalances.forEach(balance => {
        logger.info(`- ID: ${balance.id}, User: ${balance.user?.email || 'Unknown'}, Balance: ${balance.balance}, Used: ${balance.used}`);
      });
    } else {
      logger.info("No leave balances found for this leave type and year.");
      
      // Check if there are any leave balances in the system
      const totalBalances = await leaveBalanceRepository.count();
      logger.info(`Total leave balances in the system: ${totalBalances}`);
      
      if (totalBalances > 0) {
        // Check if there are any leave balances for this leave type (any year)
        const typeBalances = await leaveBalanceRepository.count({
          where: { leaveTypeId: leaveTypeId }
        });
        
        logger.info(`Leave balances for this leave type (any year): ${typeBalances}`);
        
        if (typeBalances > 0) {
          const otherYearBalances = await leaveBalanceRepository.find({
            where: { leaveTypeId: leaveTypeId },
            take: 5
          });
          
          logger.info("Leave balances for this leave type in other years:");
          otherYearBalances.forEach(balance => {
            logger.info(`- Year: ${balance.year}, Balance: ${balance.balance}, Used: ${balance.used}`);
          });
        }
      }
    }
  } catch (error) {
    logger.error("Error checking leave type balances:", error);
    throw error;
  } finally {
    // Close the database connection if requested
    if (closeConnection && AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
};

/**
 * Setup default data wrapper function for backward compatibility
 * This function ensures workflow categories are created if the table exists
 */
export const setupDefaultData = async (): Promise<void> => {
  try {
    logger.info("SetupDefaultData");

    // Check if tables exist
    const workflowCategoriesTableExists = await checkTableExists("workflow_categories");

    if (!workflowCategoriesTableExists) {
      logger.warn(
        "Workflow categories table does not exist. Skipping workflow categories creation."
      );
    } else {
      // Create workflow categories
      await syncWorkflowCategories();
      logger.info("Default workflow categories created");
    }

    logger.info("SetupDefaultData completed successfully");
  } catch (error) {
    logger.error("Error setting up default data:", error);
    throw error;
  }
};

/**
 * Fix migrations table issues
 * This function can be used to repair common issues with the migrations table
 */
export const fixMigrationsTable = async (closeConnection = true): Promise<void> => {
  try {
    logger.info("Starting migrations table fix...");
    
    // Initialize the database connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized");
    }

    const queryRunner = AppDataSource.createQueryRunner();
    
    try {
      // Check if migrations table exists
      const tableExists = await queryRunner.hasTable("migrations");
      
      if (!tableExists) {
        logger.info("Migrations table does not exist, creating it");
        
        // Create migrations table
        await queryRunner.query(`
          CREATE TABLE IF NOT EXISTS "migrations" (
            "id" SERIAL PRIMARY KEY,
            "timestamp" BIGINT NOT NULL,
            "name" VARCHAR NOT NULL
          )
        `);
        
        logger.info("Migrations table created successfully");
        return;
      }
      
      // Check for null values in the name column
      const nullNames = await queryRunner.query(
        `SELECT id FROM migrations WHERE name IS NULL`
      );

      if (nullNames.length > 0) {
        logger.info(`Found ${nullNames.length} migrations with null names, removing them`);
        await queryRunner.query(`DELETE FROM migrations WHERE name IS NULL`);
        logger.info("Null migration entries removed");
      }

      // Check for duplicate migrations
      const duplicates = await queryRunner.query(`
        SELECT name, COUNT(*) 
        FROM migrations 
        GROUP BY name 
        HAVING COUNT(*) > 1
      `);

      if (duplicates.length > 0) {
        logger.info(`Found ${duplicates.length} duplicate migrations, keeping only the latest`);
        
        for (const dup of duplicates) {
          const name = dup.name;
          
          await queryRunner.query(`
            DELETE FROM migrations 
            WHERE name = $1 
            AND id NOT IN (
              SELECT id FROM migrations 
              WHERE name = $1 
              ORDER BY timestamp DESC 
              LIMIT 1
            )
          `, [name]);
        }
        
        logger.info("Duplicate migrations cleaned up");
      }
      
      // List all migrations in the database
      const migrations = await queryRunner.query(`SELECT * FROM migrations ORDER BY timestamp`);
      logger.info(`Current migrations in database (${migrations.length}):`);
      
      for (const migration of migrations) {
        logger.info(`- ${migration.name} (timestamp: ${migration.timestamp})`);
      }
      
      logger.info("Migration table fix completed successfully");
    } finally {
      await queryRunner.release();
    }
  } catch (error) {
    logger.error("Error fixing migrations table:", error);
    throw error;
  } finally {
    if (closeConnection && AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
};

// Export individual sync functions and utility functions for use in other modules
// Note: Most functions are already exported individually at their definitions
export { 
  syncLeaveTypes, 
  syncWorkflowCategories
};

// Run the script if called directly
if (require.main === module) {
  syncEssentialData()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error("Error:", error);
      process.exit(1);
    });
}