import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRolesDepartmentsPositionsPages1715000000000
  implements MigrationInterface
{
  name = "AddRolesDepartmentsPositionsPages1715000000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create roles table if it doesn't exist
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "roles" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(100) NOT NULL,
                "description" character varying(255),
                "isActive" boolean NOT NULL DEFAULT true,
                "permissions" text,
                "isSystem" boolean NOT NULL DEFAULT false,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_roles_name" UNIQUE ("name"),
                CONSTRAINT "PK_roles" PRIMARY KEY ("id")
            )
        `);

    // Create departments table if it doesn't exist
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "departments" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(100) NOT NULL,
                "description" character varying(255),
                "isActive" boolean NOT NULL DEFAULT true,
                "managerId" uuid,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_departments_name" UNIQUE ("name"),
                CONSTRAINT "PK_departments" PRIMARY KEY ("id")
            )
        `);

    // Create positions table if it doesn't exist
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "positions" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(100) NOT NULL,
                "description" character varying(255),
                "isActive" boolean NOT NULL DEFAULT true,
                "departmentId" uuid,
                "level" integer NOT NULL DEFAULT 1,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_positions" PRIMARY KEY ("id")
            )
        `);

    // Create pages table if it doesn't exist
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "pages" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(100) NOT NULL,
                "description" character varying(255),
                "slug" character varying(100) NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "isSystem" boolean NOT NULL DEFAULT false,
                "configuration" text,
                "accessRoles" text,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_pages_name" UNIQUE ("name"),
                CONSTRAINT "UQ_pages_slug" UNIQUE ("slug"),
                CONSTRAINT "PK_pages" PRIMARY KEY ("id")
            )
        `);

    // Add foreign key constraints if they don't exist
    await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM information_schema.table_constraints 
                    WHERE constraint_name = 'FK_positions_departments' 
                    AND table_name = 'positions'
                ) THEN
                    ALTER TABLE "positions" 
                    ADD CONSTRAINT "FK_positions_departments" 
                    FOREIGN KEY ("departmentId") 
                    REFERENCES "departments"("id") 
                    ON DELETE SET NULL;
                END IF;
            END
            $$;
        `);

    // Add new columns to users table if they don't exist
    await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM information_schema.columns 
                    WHERE table_name = 'users' AND column_name = 'roleId'
                ) THEN
                    ALTER TABLE "users" ADD COLUMN "roleId" uuid;
                END IF;
                
                IF NOT EXISTS (
                    SELECT 1 FROM information_schema.columns 
                    WHERE table_name = 'users' AND column_name = 'departmentId'
                ) THEN
                    ALTER TABLE "users" ADD COLUMN "departmentId" uuid;
                END IF;
                
                IF NOT EXISTS (
                    SELECT 1 FROM information_schema.columns 
                    WHERE table_name = 'users' AND column_name = 'positionId'
                ) THEN
                    ALTER TABLE "users" ADD COLUMN "positionId" uuid;
                END IF;
            END
            $$;
        `);

    // Add foreign key constraints to users table if they don't exist
    await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM information_schema.table_constraints 
                    WHERE constraint_name = 'FK_users_roles' 
                    AND table_name = 'users'
                ) THEN
                    ALTER TABLE "users" 
                    ADD CONSTRAINT "FK_users_roles" 
                    FOREIGN KEY ("roleId") 
                    REFERENCES "roles"("id") 
                    ON DELETE SET NULL;
                END IF;
            END
            $$;
        `);

    await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM information_schema.table_constraints 
                    WHERE constraint_name = 'FK_users_departments' 
                    AND table_name = 'users'
                ) THEN
                    ALTER TABLE "users" 
                    ADD CONSTRAINT "FK_users_departments" 
                    FOREIGN KEY ("departmentId") 
                    REFERENCES "departments"("id") 
                    ON DELETE SET NULL;
                END IF;
            END
            $$;
        `);

    await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM information_schema.table_constraints 
                    WHERE constraint_name = 'FK_users_positions' 
                    AND table_name = 'users'
                ) THEN
                    ALTER TABLE "users" 
                    ADD CONSTRAINT "FK_users_positions" 
                    FOREIGN KEY ("positionId") 
                    REFERENCES "positions"("id") 
                    ON DELETE SET NULL;
                END IF;
            END
            $$;
        `);

    // Add foreign key constraint for department manager if it doesn't exist
    await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM information_schema.table_constraints 
                    WHERE constraint_name = 'FK_departments_users' 
                    AND table_name = 'departments'
                ) THEN
                    ALTER TABLE "departments" 
                    ADD CONSTRAINT "FK_departments_users" 
                    FOREIGN KEY ("managerId") 
                    REFERENCES "users"("id") 
                    ON DELETE SET NULL;
                END IF;
            END
            $$;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove foreign key constraints from users table
    await queryRunner.query(`
            ALTER TABLE "users" 
            DROP CONSTRAINT IF EXISTS "FK_users_roles"
        `);

    await queryRunner.query(`
            ALTER TABLE "users" 
            DROP CONSTRAINT IF EXISTS "FK_users_departments"
        `);

    await queryRunner.query(`
            ALTER TABLE "users" 
            DROP CONSTRAINT IF EXISTS "FK_users_positions"
        `);

    // Remove foreign key constraint from departments table
    await queryRunner.query(`
            ALTER TABLE "departments" 
            DROP CONSTRAINT IF EXISTS "FK_departments_users"
        `);

    // Remove foreign key constraint from positions table
    await queryRunner.query(`
            ALTER TABLE "positions" 
            DROP CONSTRAINT IF EXISTS "FK_positions_departments"
        `);

    // Remove columns from users table
    await queryRunner.query(`
            ALTER TABLE "users" 
            DROP COLUMN IF EXISTS "roleId",
            DROP COLUMN IF EXISTS "departmentId",
            DROP COLUMN IF EXISTS "positionId"
        `);

    // Drop tables
    await queryRunner.query(`DROP TABLE IF EXISTS "pages"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "positions"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "departments"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "roles"`);
  }
}
