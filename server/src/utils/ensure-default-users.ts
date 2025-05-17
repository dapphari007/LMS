import { AppDataSource } from "../config/database";
import {
  User,
  UserRole,
  UserLevel,
  Gender,
  Role,
  Department,
  Position,
} from "../models";
import { hashPassword } from "./auth";
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export const ensureDefaultUsers = async (): Promise<void> => {
  try {
    // First, ensure the User entity has department and position columns
    await ensureDepartmentAndPositionColumns();
    
    // Also ensure roleId, departmentId, and positionId columns exist
    await ensureRelationshipColumns();

    const userRepository = AppDataSource.getRepository(User);
    
    // Check if the roles, departments, and positions tables exist
    let rolesExist = false;
    let departmentsExist = false;
    let positionsExist = false;
    
    // Check if the required columns exist in the users table
    let roleIdExists = false;
    let departmentIdExists = false;
    let positionIdExists = false;
    
    try {
      // Check if roleId column exists
      await AppDataSource.query(`
        SELECT roleId FROM users LIMIT 1
      `).catch(() => {
        throw new Error("roleId column does not exist");
      });
      roleIdExists = true;
    } catch (error) {
      console.log("roleId column not available yet, skipping role assignments");
    }
    
    try {
      // Check if departmentId column exists
      await AppDataSource.query(`
        SELECT departmentId FROM users LIMIT 1
      `).catch(() => {
        throw new Error("departmentId column does not exist");
      });
      departmentIdExists = true;
    } catch (error) {
      console.log("departmentId column not available yet, skipping department assignments");
    }
    
    try {
      // Check if positionId column exists
      await AppDataSource.query(`
        SELECT positionId FROM users LIMIT 1
      `).catch(() => {
        throw new Error("positionId column does not exist");
      });
      positionIdExists = true;
    } catch (error) {
      console.log("positionId column not available yet, skipping position assignments");
    }

    // Only try to use repositories if the columns exist
    let roleRepository;
    let departmentRepository;
    let positionRepository;
    
    if (roleIdExists) {
      try {
        roleRepository = AppDataSource.getRepository(Role);
        await roleRepository.find({ take: 1 });
        rolesExist = true;
      } catch (error) {
        console.log("Roles table not available yet, skipping role assignments");
      }
    }

    if (departmentIdExists) {
      try {
        departmentRepository = AppDataSource.getRepository(Department);
        await departmentRepository.find({ take: 1 });
        departmentsExist = true;
      } catch (error) {
        console.log(
          "Departments table not available yet, skipping department assignments"
        );
      }
    }

    if (positionIdExists) {
      try {
        positionRepository = AppDataSource.getRepository(Position);
        await positionRepository.find({ take: 1 });
        positionsExist = true;
      } catch (error) {
        console.log(
          "Positions table not available yet, skipping position assignments"
        );
      }
    }

    // Define 10 default users with department and position
    const defaultUsers = [
      {
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@example.com",
        password: "Admin@123",
        phoneNumber: "+1-555-123-4567",
        address: "123 Admin Street, New York, NY 10001",
        role: UserRole.SUPER_ADMIN,
        level: UserLevel.LEVEL_4,
        gender: Gender.MALE,
        department: "Executive",
        position: "CEO",
      },
      {
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah.johnson@example.com",
        password: "Admin@123",
        phoneNumber: "+1-555-234-5678",
        address: "456 Admin Avenue, San Francisco, CA 94105",
        role: UserRole.SUPER_ADMIN,
        level: UserLevel.LEVEL_4,
        gender: Gender.FEMALE,
        department: "Executive",
        position: "CTO",
      },
      {
        firstName: "Robert",
        lastName: "Miller",
        email: "robert.miller@example.com",
        password: "Manager@123",
        phoneNumber: "+1-555-678-9012",
        address: "303 Manager Street, Boston, MA 02108",
        role: UserRole.MANAGER,
        level: UserLevel.LEVEL_3,
        gender: Gender.MALE,
        department: "Engineering",
        position: "Engineering Manager",
      },
      {
        firstName: "Jennifer",
        lastName: "Davis",
        email: "jennifer.davis@example.com",
        password: "Manager@123",
        phoneNumber: "+1-555-789-0123",
        address: "404 Manager Avenue, Denver, CO 80202",
        role: UserRole.MANAGER,
        level: UserLevel.LEVEL_3,
        gender: Gender.FEMALE,
        department: "Marketing",
        position: "Marketing Manager",
      },
      {
        firstName: "Susan",
        lastName: "Clark",
        email: "susan.clark@example.com",
        password: "HR@123",
        phoneNumber: "+1-555-234-5678",
        address: "909 HR Street, Philadelphia, PA 19103",
        role: UserRole.HR,
        level: UserLevel.LEVEL_3,
        gender: Gender.FEMALE,
        department: "Human Resources",
        position: "HR Director",
      },
      {
        firstName: "Richard",
        lastName: "Rodriguez",
        email: "richard.rodriguez@example.com",
        password: "HR@123",
        phoneNumber: "+1-555-345-6789",
        address: "1010 HR Avenue, San Diego, CA 92101",
        role: UserRole.HR,
        level: UserLevel.LEVEL_2,
        gender: Gender.MALE,
        department: "Human Resources",
        position: "HR Manager",
      },
      {
        firstName: "Michael",
        lastName: "Brown",
        email: "michael.brown@example.com",
        password: "Employee@123",
        phoneNumber: "+1-555-456-7890",
        address: "505 Employee Road, Chicago, IL 60601",
        role: UserRole.EMPLOYEE,
        level: UserLevel.LEVEL_1,
        gender: Gender.MALE,
        department: "Engineering",
        position: "Software Engineer",
        managerId: null, // Will be set after managers are created
      },
      {
        firstName: "Emily",
        lastName: "Wilson",
        email: "emily.wilson@example.com",
        password: "Employee@123",
        phoneNumber: "+1-555-567-8901",
        address: "606 Employee Lane, Seattle, WA 98101",
        role: UserRole.EMPLOYEE,
        level: UserLevel.LEVEL_1,
        gender: Gender.FEMALE,
        department: "Engineering",
        position: "QA Engineer",
        managerId: null, // Will be set after managers are created
      },
      {
        firstName: "David",
        lastName: "Taylor",
        email: "david.taylor@example.com",
        password: "Employee@123",
        phoneNumber: "+1-555-678-9012",
        address: "707 Employee Blvd, Austin, TX 78701",
        role: UserRole.EMPLOYEE,
        level: UserLevel.LEVEL_1,
        gender: Gender.MALE,
        department: "Marketing",
        position: "Marketing Specialist",
        managerId: null, // Will be set after managers are created
      },
      {
        firstName: "Lisa",
        lastName: "Martinez",
        email: "lisa.martinez@example.com",
        password: "Employee@123",
        phoneNumber: "+1-555-789-0123",
        address: "808 Employee Court, Miami, FL 33131",
        role: UserRole.EMPLOYEE,
        level: UserLevel.LEVEL_1,
        gender: Gender.FEMALE,
        department: "Marketing",
        position: "Content Writer",
        managerId: null, // Will be set after managers are created
      },
    ];

    // First, check and create all users
    const createdUsers = [];
    for (const userData of defaultUsers) {
      // Check if user already exists
      const existingUser = await userRepository.findOne({
        where: { email: userData.email },
      });

      if (existingUser) {
        console.log(
          `User ${userData.email} already exists, skipping creation...`
        );

        // Update department and position if they're not set
        if (!existingUser.department || !existingUser.position) {
          existingUser.department = userData.department;
          existingUser.position = userData.position;
          await userRepository.save(existingUser);
          console.log(`Updated department and position for ${userData.email}`);
        }

        createdUsers.push(existingUser);
        continue;
      }

      // Create new user
      const user = new User();
      Object.assign(user, {
        ...userData,
        password: await hashPassword(userData.password),
      });

      const savedUser = await userRepository.save(user);
      console.log(`User ${userData.email} created successfully`);
      createdUsers.push(savedUser);
    }

    // Now set manager IDs for employees
    const engineeringManager = createdUsers.find(
      (user) =>
        user.role === UserRole.MANAGER && user.department === "Engineering"
    );

    const marketingManager = createdUsers.find(
      (user) =>
        user.role === UserRole.MANAGER && user.department === "Marketing"
    );

    if (engineeringManager) {
      // Find engineering employees and set their manager
      const engineeringEmployees = createdUsers.filter(
        (user) =>
          user.role === UserRole.EMPLOYEE && user.department === "Engineering"
      );

      for (const employee of engineeringEmployees) {
        if (!employee.managerId) {
          employee.managerId = engineeringManager.id;
          await userRepository.save(employee);
          console.log(`Set manager for ${employee.email}`);
        }
      }
    }

    if (marketingManager) {
      // Find marketing employees and set their manager
      const marketingEmployees = createdUsers.filter(
        (user) =>
          user.role === UserRole.EMPLOYEE && user.department === "Marketing"
      );

      for (const employee of marketingEmployees) {
        if (!employee.managerId) {
          employee.managerId = marketingManager.id;
          await userRepository.save(employee);
          console.log(`Set manager for ${employee.email}`);
        }
      }
    }

    // If the new tables exist and columns exist, set up the relationships
    if (rolesExist && departmentsExist && positionsExist && 
        roleIdExists && departmentIdExists && positionIdExists) {
      console.log("Setting up relationships for users with roles, departments, and positions");
      
      // Link users to roles, departments, and positions
      for (const user of createdUsers) {
        try {
          // Find or create role
          let role = await roleRepository.findOne({ where: { name: user.role } });
          if (role) {
            user.roleId = role.id;
          }

          // Find or create department
          let department = await departmentRepository.findOne({
            where: { name: user.department },
          });
          if (!department && user.department) {
            department = new Department();
            department.name = user.department;
            department.description = `${user.department} Department`;
            department.isActive = true;
            department = await departmentRepository.save(department);
            console.log(`Created department: ${department.name}`);
          }

          if (department) {
            user.departmentId = department.id;
          }

          // Find or create position
          let position = null;
          if (department) {
            position = await positionRepository.findOne({
              where: {
                name: user.position,
                departmentId: department.id,
              },
            });
          } else {
            position = await positionRepository.findOne({
              where: { name: user.position },
            });
          }

          if (!position && user.position) {
            position = new Position();
            position.name = user.position;
            position.description = `${user.position} Position`;
            position.isActive = true;
            if (department) {
              position.departmentId = department.id;
            }
            position = await positionRepository.save(position);
            console.log(`Created position: ${position.name}`);
          }

          if (position) {
            user.positionId = position.id;
          }

          // Save the updated user
          await userRepository.save(user);
          console.log(`Updated relationships for user: ${user.email}`);
        } catch (error) {
          console.error(`Error setting up relationships for user ${user.email}:`, error);
          // Continue with next user
        }
      }
    } else {
      console.log("Skipping relationship setup due to missing tables or columns");
    }

    console.log("Default users check completed");
  } catch (error) {
    console.error("Error ensuring default users:", error);
    throw error;
  }
};

/**
 * Ensures that the User entity has department and position columns
 * Uses TypeORM's migration API to add columns if they don't exist
 */
const ensureDepartmentAndPositionColumns = async (): Promise<void> => {
  try {
    // Create a migration to add the columns
    const migration: MigrationInterface = {
      name: "AddDepartmentAndPositionColumns",
      async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("users");
        if (!table) {
          console.log("Users table does not exist yet, skipping column check");
          return;
        }

        // Check if department column exists in the database
        const departmentColumn = table.findColumnByName("department");
        if (!departmentColumn) {
          await queryRunner.addColumn(
            "users",
            new TableColumn({
              name: "department",
              type: "varchar",
              length: "100",
              isNullable: true,
            })
          );
          console.log("Department column added to users table");
        }

        // Check if position column exists in the database
        const positionColumn = table.findColumnByName("position");
        if (!positionColumn) {
          await queryRunner.addColumn(
            "users",
            new TableColumn({
              name: "position",
              type: "varchar",
              length: "100",
              isNullable: true,
            })
          );
          console.log("Position column added to users table");
        }
      },

      async down(queryRunner: QueryRunner): Promise<void> {
        // This method is required but we don't need to implement it
      },
    };

    // Run the migration
    const queryRunner = AppDataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      await migration.up(queryRunner);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  } catch (error) {
    console.error("Error ensuring department and position columns:", error);
    // Don't throw the error, just log it and continue
    console.log("Continuing despite error in ensuring columns");
  }
};

/**
 * Ensures that the User entity has roleId, departmentId, and positionId columns
 * Uses TypeORM's migration API to add columns if they don't exist
 */
const ensureRelationshipColumns = async (): Promise<void> => {
  try {
    // Create a migration to add the columns
    const migration: MigrationInterface = {
      name: "AddRelationshipColumns",
      async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("users");
        if (!table) {
          console.log("Users table does not exist yet, skipping column check");
          return;
        }

        // Check if roleId column exists in the database
        const roleIdColumn = table.findColumnByName("roleId");
        if (!roleIdColumn) {
          await queryRunner.addColumn(
            "users",
            new TableColumn({
              name: "roleId",
              type: "uuid",
              isNullable: true,
            })
          );
          console.log("roleId column added to users table");
        }

        // Check if departmentId column exists in the database
        const departmentIdColumn = table.findColumnByName("departmentId");
        if (!departmentIdColumn) {
          await queryRunner.addColumn(
            "users",
            new TableColumn({
              name: "departmentId",
              type: "uuid",
              isNullable: true,
            })
          );
          console.log("departmentId column added to users table");
        }

        // Check if positionId column exists in the database
        const positionIdColumn = table.findColumnByName("positionId");
        if (!positionIdColumn) {
          await queryRunner.addColumn(
            "users",
            new TableColumn({
              name: "positionId",
              type: "uuid",
              isNullable: true,
            })
          );
          console.log("positionId column added to users table");
        }
      },

      async down(queryRunner: QueryRunner): Promise<void> {
        // This method is required but we don't need to implement it
      },
    };

    // Run the migration
    const queryRunner = AppDataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      await migration.up(queryRunner);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  } catch (error) {
    console.error("Error ensuring relationship columns:", error);
    // Don't throw the error, just log it and continue
    console.log("Continuing despite error in ensuring columns");
  }
};
