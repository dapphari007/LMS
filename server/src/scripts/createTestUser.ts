import { AppDataSource } from "../config/database";
import { User, UserRole, UserLevel, Gender } from "../models";
import { hashPassword } from "../utils/auth";
import logger from "../utils/logger";

export const createTestUser = async (): Promise<void> => {
  try {
    // Initialize database connection if not already initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized in createTestUser");
    }

    // Check if users table exists
    try {
      await AppDataSource.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'users'
        )
      `);
      logger.info("Users table exists");
    } catch (error) {
      logger.error("Users table does not exist:", error);

      // Try to create the users table
      try {
        await AppDataSource.query(`
          CREATE TABLE IF NOT EXISTS "users" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "firstName" character varying NOT NULL,
            "lastName" character varying NOT NULL,
            "email" character varying NOT NULL,
            "password" character varying NOT NULL,
            "phoneNumber" character varying,
            "address" character varying,
            "role" character varying NOT NULL DEFAULT 'employee',
            "level" character varying NOT NULL DEFAULT '1',
            "gender" character varying,
            "managerId" uuid,
            "department" character varying(100),
            "position" character varying(100),
            "roleId" uuid,
            "departmentId" uuid,
            "positionId" uuid,
            "isActive" boolean NOT NULL DEFAULT true,
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_users" PRIMARY KEY ("id"),
            CONSTRAINT "UQ_users_email" UNIQUE ("email")
          );
        `);
        logger.info("Users table created");
      } catch (createError) {
        logger.error("Failed to create users table:", createError);
        return;
      }
    }

    // Create a test user
    const userRepository = AppDataSource.getRepository(User);

    // Check if test user already exists
    const existingUser = await userRepository.findOne({
      where: { email: "test@example.com" },
    });

    if (existingUser) {
      logger.info("Test user already exists");
      return;
    }

    // Create new test user
    const user = new User();
    user.firstName = "Test";
    user.lastName = "User";
    user.email = "test@example.com";
    user.password = await hashPassword("Test@123");
    user.role = UserRole.SUPER_ADMIN;
    user.level = UserLevel.LEVEL_4;
    user.gender = Gender.MALE;
    user.isActive = true;

    const savedUser = await userRepository.save(user);
    logger.info(`Test user created with ID: ${savedUser.id}`);
  } catch (error) {
    logger.error("Error creating test user:", error);
  }
};

// Run the function if this script is executed directly
if (require.main === module) {
  createTestUser()
    .then(() => {
      logger.info("Test user creation completed");
      process.exit(0);
    })
    .catch((error) => {
      logger.error("Error in test user creation script:", error);
      process.exit(1);
    });
}
