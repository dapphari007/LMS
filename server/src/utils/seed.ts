import { AppDataSource } from "../config/database";
import {
  User,
  UserRole,
  UserLevel,
  Gender,
  LeaveType,
  ApprovalWorkflow,
} from "../models";
import { hashPassword } from "./auth";
import logger from "./logger";

export const seedDatabase = async (): Promise<void> => {
  try {
    // Initialize database connection
    await AppDataSource.initialize();

    // Seed super admin user
    await seedSuperAdmin();

    // Seed leave types
    await seedLeaveTypes();

    // Seed approval workflows
    await seedApprovalWorkflows();

    logger.info("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    logger.error("Error seeding database:", error);
    process.exit(1);
  }
};

const seedSuperAdmin = async (): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);

  // Check if super admin already exists
  const existingSuperAdmin = await userRepository.findOne({
    where: { role: UserRole.SUPER_ADMIN },
  });

  if (existingSuperAdmin) {
    logger.info("Super admin already exists, skipping...");
    return;
  }

  // Create super admin
  const superAdmin = new User();
  superAdmin.firstName = "Super";
  superAdmin.lastName = "Admin";
  superAdmin.email = "admin@example.com";
  superAdmin.password = await hashPassword("Admin@123");
  superAdmin.role = UserRole.SUPER_ADMIN;
  superAdmin.level = UserLevel.LEVEL_4;
  superAdmin.gender = Gender.MALE;

  await userRepository.save(superAdmin);
  logger.info("Super admin created successfully");

  // Create team lead
  const teamLead = new User();
  teamLead.firstName = "Team";
  teamLead.lastName = "Lead";
  teamLead.email = "teamlead@example.com";
  teamLead.password = await hashPassword("TeamLead@123");
  teamLead.role = UserRole.TEAM_LEAD;
  teamLead.level = UserLevel.LEVEL_2;
  teamLead.gender = Gender.MALE;

  await userRepository.save(teamLead);
  logger.info("Team lead created successfully");
};

const seedLeaveTypes = async (): Promise<void> => {
  const leaveTypeRepository = AppDataSource.getRepository(LeaveType);

  // Check if leave types already exist
  const existingLeaveTypes = await leaveTypeRepository.find();

  if (existingLeaveTypes.length > 0) {
    logger.info("Leave types already exist, skipping...");
    return;
  }

  // Create leave types
  const leaveTypes = [
    {
      name: "Annual Leave",
      description: "Regular annual leave for all employees",
      defaultDays: 20,
      isCarryForward: true,
      maxCarryForwardDays: 5,
      isHalfDayAllowed: true,
      isPaidLeave: true,
    },
    {
      name: "Sick Leave",
      description: "Leave for medical reasons",
      defaultDays: 10,
      isCarryForward: false,
      maxCarryForwardDays: 0,
      isHalfDayAllowed: true,
      isPaidLeave: true,
    },
    {
      name: "Work From Home",
      description: "Working remotely from home",
      defaultDays: 15,
      isCarryForward: false,
      maxCarryForwardDays: 0,
      isHalfDayAllowed: true,
      isPaidLeave: true,
    },
    {
      name: "Casual Leave",
      description: "Leave for personal reasons",
      defaultDays: 12,
      isCarryForward: false,
      maxCarryForwardDays: 0,
      isHalfDayAllowed: true,
      isPaidLeave: true,
    },
    {
      name: "Earned Leave",
      description: "Leave earned through overtime or special projects",
      defaultDays: 0,
      isCarryForward: true,
      maxCarryForwardDays: 10,
      isHalfDayAllowed: true,
      isPaidLeave: true,
    },
    {
      name: "Maternity Leave",
      description:
        "Leave for female employees during pregnancy and after childbirth",
      defaultDays: 90,
      isCarryForward: false,
      maxCarryForwardDays: 0,
      isHalfDayAllowed: false,
      isPaidLeave: true,
      applicableGender: "female",
    },
    {
      name: "Paternity Leave",
      description: "Leave for male employees after the birth of their child",
      defaultDays: 10,
      isCarryForward: false,
      maxCarryForwardDays: 0,
      isHalfDayAllowed: false,
      isPaidLeave: true,
      applicableGender: "male",
    },
    {
      name: "Compensatory Off",
      description: "Leave granted for working on holidays or weekends",
      defaultDays: 0,
      isCarryForward: true,
      maxCarryForwardDays: 5,
      isHalfDayAllowed: true,
      isPaidLeave: true,
    },
    {
      name: "Loss of Pay",
      description: "Unpaid leave when other leave balances are exhausted",
      defaultDays: 0,
      isCarryForward: false,
      maxCarryForwardDays: 0,
      isHalfDayAllowed: true,
      isPaidLeave: false,
    },
  ];

  for (const leaveTypeData of leaveTypes) {
    const leaveType = new LeaveType();
    Object.assign(leaveType, leaveTypeData);
    await leaveTypeRepository.save(leaveType);
  }

  logger.info("Leave types created successfully");
};

const seedApprovalWorkflows = async (): Promise<void> => {
  const approvalWorkflowRepository =
    AppDataSource.getRepository(ApprovalWorkflow);

  // Check if approval workflows already exist
  const existingWorkflows = await approvalWorkflowRepository.find();

  if (existingWorkflows.length > 0) {
    logger.info("Approval workflows already exist, skipping...");
    return;
  }

  // Create approval workflows
  const workflows = [
    {
      name: "Short Leave Approval",
      minDays: 1,
      maxDays: 5,
      approvalLevels: [
        {
          level: 1,
          roles: [UserRole.TEAM_LEAD],
        },
        {
          level: 2,
          roles: [UserRole.MANAGER],
        },
      ],
    },
    {
      name: "Medium Leave Approval",
      minDays: 6,
      maxDays: 14,
      approvalLevels: [
        {
          level: 1,
          roles: [UserRole.TEAM_LEAD],
        },
        {
          level: 2,
          roles: [UserRole.MANAGER],
        },
        {
          level: 3,
          roles: [UserRole.HR],
        },
      ],
    },
    {
      name: "Long Leave Approval",
      minDays: 15,
      maxDays: 90,
      approvalLevels: [
        {
          level: 1,
          roles: [UserRole.TEAM_LEAD],
        },
        {
          level: 2,
          roles: [UserRole.MANAGER],
        },
        {
          level: 3,
          roles: [UserRole.HR],
        },
        {
          level: 4,
          roles: [UserRole.SUPER_ADMIN],
        },
      ],
    },
  ];

  for (const workflowData of workflows) {
    const workflow = new ApprovalWorkflow();

    // Set basic properties
    workflow.name = workflowData.name;
    workflow.minDays = workflowData.minDays;
    workflow.maxDays = workflowData.maxDays;
    workflow.isActive = true;

    // Ensure approvalLevels is stored as a proper JSON object, not a string
    workflow.approvalLevels = Array.isArray(workflowData.approvalLevels)
      ? workflowData.approvalLevels.map((level) => ({
          level: level.level,
          roles: Array.isArray(level.roles) ? level.roles : [level.roles],
        }))
      : workflowData.approvalLevels;

    await approvalWorkflowRepository.save(workflow);
  }

  logger.info("Approval workflows created successfully");
};

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedDatabase();
}
