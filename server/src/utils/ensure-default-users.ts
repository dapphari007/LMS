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
        SELECT "roleId" FROM "users" LIMIT 1
      `).catch(() => {
        throw new Error("roleId column does not exist");
      });
      roleIdExists = true;
    } catch (error) {
      // Column doesn't exist yet
    }
    
    try {
      // Check if departmentId column exists
      await AppDataSource.query(`
        SELECT "departmentId" FROM "users" LIMIT 1
      `).catch(() => {
        throw new Error("departmentId column does not exist");
      });
      departmentIdExists = true;
    } catch (error) {
      // Column doesn't exist yet
    }
    
    try {
      // Check if positionId column exists
      await AppDataSource.query(`
        SELECT "positionId" FROM "users" LIMIT 1
      `).catch(() => {
        throw new Error("positionId column does not exist");
      });
      positionIdExists = true;
    } catch (error) {
      // Column doesn't exist yet
    }
    
    // Log column status in a single message
    const missingColumns = [];
    if (!roleIdExists) missingColumns.push("roleId");
    if (!departmentIdExists) missingColumns.push("departmentId");
    if (!positionIdExists) missingColumns.push("positionId");
    
    if (missingColumns.length > 0) {
      console.log(`Missing columns in users table: ${missingColumns.join(", ")}`);
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
        // Roles table not available yet
      }
    }

    if (departmentIdExists) {
      try {
        departmentRepository = AppDataSource.getRepository(Department);
        await departmentRepository.find({ take: 1 });
        departmentsExist = true;
      } catch (error) {
        // Departments table not available yet
      }
    }

    if (positionIdExists) {
      try {
        positionRepository = AppDataSource.getRepository(Position);
        await positionRepository.find({ take: 1 });
        positionsExist = true;
      } catch (error) {
        // Positions table not available yet
      }
    }
    
    // Log missing tables in a single message
    const missingTables = [];
    if (!rolesExist && roleIdExists) missingTables.push("roles");
    if (!departmentsExist && departmentIdExists) missingTables.push("departments");
    if (!positionsExist && positionIdExists) missingTables.push("positions");
    
    if (missingTables.length > 0) {
      console.log(`Missing tables: ${missingTables.join(", ")}`);
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
    let createdCount = 0;
    let existingCount = 0;
    
    for (const userData of defaultUsers) {
      // Check if user already exists
      const existingUser = await userRepository.findOne({
        where: { email: userData.email },
      });

      if (existingUser) {
        existingCount++;
        
        // Update department and position if they're not set
        if (!existingUser.department || !existingUser.position) {
          existingUser.department = userData.department;
          existingUser.position = userData.position;
          await userRepository.save(existingUser);
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
      createdCount++;
      createdUsers.push(savedUser);
    }
    
    console.log(`Users: ${createdCount} created, ${existingCount} already exist`)

    // Now set manager IDs for employees
    const engineeringManager = createdUsers.find(
      (user) =>
        user.role === UserRole.MANAGER && user.department === "Engineering"
    );

    const marketingManager = createdUsers.find(
      (user) =>
        user.role === UserRole.MANAGER && user.department === "Marketing"
    );

    let managerAssignments = 0;

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
          managerAssignments++;
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
          managerAssignments++;
        }
      }
    }
    
    if (managerAssignments > 0) {
      console.log(`Manager relationships: ${managerAssignments} assignments completed`);
    }

    // If the new tables exist and columns exist, set up the relationships
    if (rolesExist && departmentsExist && positionsExist && 
        roleIdExists && departmentIdExists && positionIdExists) {
      console.log("Setting up user relationships with roles, departments, and positions");
      
      let relationshipsUpdated = 0;
      let departmentsCreated = 0;
      let positionsCreated = 0;
      
      // Link users to roles, departments, and positions
      for (const user of createdUsers) {
        try {
          let updated = false;
          
          // Find or create role
          let role = await roleRepository.findOne({ where: { name: user.role } });
          if (role && !user.roleId) {
            user.roleId = role.id;
            updated = true;
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
            departmentsCreated++;
          }

          if (department && !user.departmentId) {
            user.departmentId = department.id;
            updated = true;
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
            positionsCreated++;
          }

          if (position && !user.positionId) {
            user.positionId = position.id;
            updated = true;
          }

          // Save the updated user
          if (updated) {
            await userRepository.save(user);
            relationshipsUpdated++;
          }
        } catch (error) {
          console.error(`Error setting up relationships for user ${user.email}:`, error);
          // Continue with next user
        }
      }
      
      console.log(`Relationships: ${relationshipsUpdated} users updated, ${departmentsCreated} departments and ${positionsCreated} positions created`);
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
