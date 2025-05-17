import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1700000000000 implements MigrationInterface {
  name = "InitialSchema1700000000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create enum types if they don't exist
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role_enum') THEN
          CREATE TYPE "user_role_enum" AS ENUM ('super_admin', 'hr', 'manager', 'team_lead', 'employee');
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_level_enum') THEN
          CREATE TYPE "user_level_enum" AS ENUM ('1', '2', '3', '4');
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'gender_enum') THEN
          CREATE TYPE "gender_enum" AS ENUM ('male', 'female', 'other');
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'leave_request_status_enum') THEN
          CREATE TYPE "leave_request_status_enum" AS ENUM ('pending', 'approved', 'rejected', 'cancelled');
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'leave_request_type_enum') THEN
          CREATE TYPE "leave_request_type_enum" AS ENUM ('full_day', 'first_half', 'second_half');
        END IF;
      END
      $$;
    `);

    // Create users table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "firstName" character varying NOT NULL,
        "lastName" character varying NOT NULL,
        "email" character varying NOT NULL,
        "password" character varying NOT NULL,
        "phoneNumber" character varying,
        "address" character varying,
        "role" "user_role_enum" NOT NULL DEFAULT 'employee',
        "level" "user_level_enum" NOT NULL DEFAULT '1',
        "gender" "gender_enum",
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

    // Create leave_types table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "leave_types" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "description" character varying NOT NULL,
        "defaultDays" integer NOT NULL,
        "isCarryForward" boolean NOT NULL DEFAULT false,
        "maxCarryForwardDays" integer NOT NULL DEFAULT 0,
        "isActive" boolean NOT NULL DEFAULT true,
        "applicableGender" character varying,
        "isHalfDayAllowed" boolean NOT NULL DEFAULT false,
        "isPaidLeave" boolean NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_leave_types" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_leave_types_name" UNIQUE ("name")
      );
    `);

    // Create leave_balances table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "leave_balances" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "userId" uuid NOT NULL,
        "leaveTypeId" uuid NOT NULL,
        "balance" numeric(5,1) NOT NULL,
        "used" numeric(5,1) NOT NULL DEFAULT 0,
        "carryForward" numeric(5,1) NOT NULL DEFAULT 0,
        "year" integer NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_leave_balances" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_leave_balances_user_type_year" UNIQUE ("userId", "leaveTypeId", "year")
      );
    `);

    // Create leave_requests table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "leave_requests" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "userId" uuid NOT NULL,
        "leaveTypeId" uuid NOT NULL,
        "startDate" TIMESTAMP NOT NULL,
        "endDate" TIMESTAMP NOT NULL,
        "requestType" "leave_request_type_enum" NOT NULL DEFAULT 'full_day',
        "numberOfDays" numeric(5,1) NOT NULL,
        "reason" character varying NOT NULL,
        "status" "leave_request_status_enum" NOT NULL DEFAULT 'pending',
        "approverId" uuid,
        "approverComments" character varying,
        "approvedAt" TIMESTAMP,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_leave_requests" PRIMARY KEY ("id")
      );
    `);

    // Create holidays table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "holidays" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "date" TIMESTAMP NOT NULL,
        "description" character varying,
        "isActive" boolean NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_holidays" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_holidays_date" UNIQUE ("date")
      );
    `);

    // Create approval_workflows table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "approval_workflows" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "minDays" integer NOT NULL,
        "maxDays" integer NOT NULL,
        "approvalLevels" jsonb NOT NULL,
        "isActive" boolean NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_approval_workflows" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_approval_workflows_name" UNIQUE ("name")
      );
    `);

    // Add foreign key constraints - handle self-referencing constraint carefully
    await queryRunner.query(`
      DO $$
      BEGIN
        -- Check if the users table exists and has data
        IF EXISTS (
          SELECT 1 FROM information_schema.tables 
          WHERE table_name = 'users' AND table_schema = 'public'
        ) AND NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints 
          WHERE constraint_name = 'FK_users_manager' 
          AND table_name = 'users'
        ) THEN
          -- Only add the constraint if the table exists and doesn't have the constraint
          BEGIN
            ALTER TABLE "users" 
            ADD CONSTRAINT "FK_users_manager" 
            FOREIGN KEY ("managerId") 
            REFERENCES "users"("id") 
            ON DELETE SET NULL 
            ON UPDATE NO ACTION;
          EXCEPTION
            WHEN others THEN
              RAISE NOTICE 'Could not add FK_users_manager constraint: %', SQLERRM;
          END;
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints 
          WHERE constraint_name = 'FK_leave_balances_user' 
          AND table_name = 'leave_balances'
        ) THEN
          ALTER TABLE "leave_balances" 
          ADD CONSTRAINT "FK_leave_balances_user" 
          FOREIGN KEY ("userId") 
          REFERENCES "users"("id") 
          ON DELETE CASCADE 
          ON UPDATE NO ACTION;
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints 
          WHERE constraint_name = 'FK_leave_balances_leave_type' 
          AND table_name = 'leave_balances'
        ) THEN
          ALTER TABLE "leave_balances" 
          ADD CONSTRAINT "FK_leave_balances_leave_type" 
          FOREIGN KEY ("leaveTypeId") 
          REFERENCES "leave_types"("id") 
          ON DELETE CASCADE 
          ON UPDATE NO ACTION;
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints 
          WHERE constraint_name = 'FK_leave_requests_user' 
          AND table_name = 'leave_requests'
        ) THEN
          ALTER TABLE "leave_requests" 
          ADD CONSTRAINT "FK_leave_requests_user" 
          FOREIGN KEY ("userId") 
          REFERENCES "users"("id") 
          ON DELETE CASCADE 
          ON UPDATE NO ACTION;
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints 
          WHERE constraint_name = 'FK_leave_requests_leave_type' 
          AND table_name = 'leave_requests'
        ) THEN
          ALTER TABLE "leave_requests" 
          ADD CONSTRAINT "FK_leave_requests_leave_type" 
          FOREIGN KEY ("leaveTypeId") 
          REFERENCES "leave_types"("id") 
          ON DELETE CASCADE 
          ON UPDATE NO ACTION;
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints 
          WHERE constraint_name = 'FK_leave_requests_approver' 
          AND table_name = 'leave_requests'
        ) THEN
          ALTER TABLE "leave_requests" 
          ADD CONSTRAINT "FK_leave_requests_approver" 
          FOREIGN KEY ("approverId") 
          REFERENCES "users"("id") 
          ON DELETE SET NULL 
          ON UPDATE NO ACTION;
        END IF;
      END
      $$;
    `);

    // Create indexes for better performance
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_indexes WHERE indexname = 'IDX_users_role'
        ) THEN
          CREATE INDEX "IDX_users_role" ON "users" ("role");
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_indexes WHERE indexname = 'IDX_users_manager'
        ) THEN
          CREATE INDEX "IDX_users_manager" ON "users" ("managerId");
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_indexes WHERE indexname = 'IDX_leave_types_active'
        ) THEN
          CREATE INDEX "IDX_leave_types_active" ON "leave_types" ("isActive");
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_indexes WHERE indexname = 'IDX_leave_balances_user'
        ) THEN
          CREATE INDEX "IDX_leave_balances_user" ON "leave_balances" ("userId");
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_indexes WHERE indexname = 'IDX_leave_balances_leave_type'
        ) THEN
          CREATE INDEX "IDX_leave_balances_leave_type" ON "leave_balances" ("leaveTypeId");
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_indexes WHERE indexname = 'IDX_leave_balances_year'
        ) THEN
          CREATE INDEX "IDX_leave_balances_year" ON "leave_balances" ("year");
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_indexes WHERE indexname = 'IDX_leave_requests_user'
        ) THEN
          CREATE INDEX "IDX_leave_requests_user" ON "leave_requests" ("userId");
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_indexes WHERE indexname = 'IDX_leave_requests_leave_type'
        ) THEN
          CREATE INDEX "IDX_leave_requests_leave_type" ON "leave_requests" ("leaveTypeId");
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_indexes WHERE indexname = 'IDX_leave_requests_status'
        ) THEN
          CREATE INDEX "IDX_leave_requests_status" ON "leave_requests" ("status");
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_indexes WHERE indexname = 'IDX_leave_requests_dates'
        ) THEN
          CREATE INDEX "IDX_leave_requests_dates" ON "leave_requests" ("startDate", "endDate");
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_indexes WHERE indexname = 'IDX_holidays_date'
        ) THEN
          CREATE INDEX "IDX_holidays_date" ON "holidays" ("date");
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_indexes WHERE indexname = 'IDX_holidays_active'
        ) THEN
          CREATE INDEX "IDX_holidays_active" ON "holidays" ("isActive");
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_indexes WHERE indexname = 'IDX_approval_workflows_days'
        ) THEN
          CREATE INDEX "IDX_approval_workflows_days" ON "approval_workflows" ("minDays", "maxDays");
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_indexes WHERE indexname = 'IDX_approval_workflows_active'
        ) THEN
          CREATE INDEX "IDX_approval_workflows_active" ON "approval_workflows" ("isActive");
        END IF;
      END
      $$;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key constraints
    await queryRunner.query(`
      ALTER TABLE "leave_requests" DROP CONSTRAINT "FK_leave_requests_approver";
    `);

    await queryRunner.query(`
      ALTER TABLE "leave_requests" DROP CONSTRAINT "FK_leave_requests_leave_type";
    `);

    await queryRunner.query(`
      ALTER TABLE "leave_requests" DROP CONSTRAINT "FK_leave_requests_user";
    `);

    await queryRunner.query(`
      ALTER TABLE "leave_balances" DROP CONSTRAINT "FK_leave_balances_leave_type";
    `);

    await queryRunner.query(`
      ALTER TABLE "leave_balances" DROP CONSTRAINT "FK_leave_balances_user";
    `);

    await queryRunner.query(`
      ALTER TABLE "users" DROP CONSTRAINT "FK_users_manager";
    `);

    // Drop indexes
    await queryRunner.query(`
      DROP INDEX "IDX_approval_workflows_active";
    `);

    await queryRunner.query(`
      DROP INDEX "IDX_approval_workflows_days";
    `);

    await queryRunner.query(`
      DROP INDEX "IDX_holidays_active";
    `);

    await queryRunner.query(`
      DROP INDEX "IDX_holidays_date";
    `);

    await queryRunner.query(`
      DROP INDEX "IDX_leave_requests_dates";
    `);

    await queryRunner.query(`
      DROP INDEX "IDX_leave_requests_status";
    `);

    await queryRunner.query(`
      DROP INDEX "IDX_leave_requests_leave_type";
    `);

    await queryRunner.query(`
      DROP INDEX "IDX_leave_requests_user";
    `);

    await queryRunner.query(`
      DROP INDEX "IDX_leave_balances_year";
    `);

    await queryRunner.query(`
      DROP INDEX "IDX_leave_balances_leave_type";
    `);

    await queryRunner.query(`
      DROP INDEX "IDX_leave_balances_user";
    `);

    await queryRunner.query(`
      DROP INDEX "IDX_leave_types_active";
    `);

    await queryRunner.query(`
      DROP INDEX "IDX_users_manager";
    `);

    await queryRunner.query(`
      DROP INDEX "IDX_users_role";
    `);

    // Drop tables
    await queryRunner.query(`
      DROP TABLE "approval_workflows";
    `);

    await queryRunner.query(`
      DROP TABLE "holidays";
    `);

    await queryRunner.query(`
      DROP TABLE "leave_requests";
    `);

    await queryRunner.query(`
      DROP TABLE "leave_balances";
    `);

    await queryRunner.query(`
      DROP TABLE "leave_types";
    `);

    await queryRunner.query(`
      DROP TABLE "users";
    `);

    // Drop enum types
    await queryRunner.query(`
      DROP TYPE "leave_request_type_enum";
    `);

    await queryRunner.query(`
      DROP TYPE "leave_request_status_enum";
    `);

    await queryRunner.query(`
      DROP TYPE "gender_enum";
    `);

    await queryRunner.query(`
      DROP TYPE "user_level_enum";
    `);

    await queryRunner.query(`
      DROP TYPE "user_role_enum";
    `);
  }
}
