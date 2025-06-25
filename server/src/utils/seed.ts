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
  const count = await userRepository.count({
    where: { role: UserRole.SUPER_ADMIN },
  });

  if (count > 0) {
    logger.info("Super admin already exists, skipping creation");
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
};

const seedLeaveTypes = async (): Promise<void> => {
  const leaveTypeRepository = AppDataSource.getRepository(LeaveType);

  // Check if leave types already exist
  const count = await leaveTypeRepository.count();
  if (count > 0) {
    logger.info("Leave types already exist, skipping creation");
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

  const leaveTypeEntities = leaveTypes.map((data) => {
    const leaveType = new LeaveType();
    Object.assign(leaveType, data);
    return leaveType;
  });

  await leaveTypeRepository.save(leaveTypeEntities);

  logger.info("Leave types created successfully");
};

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedDatabase();
}
