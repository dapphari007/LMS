# Migration Fixes

This document outlines the changes made to fix the migration issues in the leave management system.

## Issues Fixed

1. **Enum Type Already Exists**: Modified the migration to check if enum types exist before creating them.
2. **Foreign Key Constraint Error**: Added error handling for foreign key constraints, especially self-referencing ones.
3. **Missing Columns**: Added checks to ensure required columns exist in the users table.
4. **Missing Tables**: Added checks to ensure tables exist before trying to access them.

## Changes Made

### 1. Migration Files

- **InitialSchema1700000000000**: 
  - Added `IF NOT EXISTS` checks for all enum types
  - Added `IF NOT EXISTS` checks for all table creation statements
  - Added conditional logic for foreign key constraints
  - Added conditional logic for index creation

- **AddRolesDepartmentsPositionsPages1715000000000**:
  - Added `IF NOT EXISTS` checks for all table creation statements
  - Added conditional logic for foreign key constraints
  - Added conditional logic for column additions

- **Created EnsureUserRelationColumns1715000000001**:
  - New migration to ensure roleId, departmentId, and positionId columns exist
  - Adds foreign key constraints if they don't exist

### 2. Server Initialization

- Modified the server.ts file to:
  - Run migrations one by one with better error handling
  - Check if tables exist before initializing data
  - Skip initialization steps if required tables don't exist

### 3. User Model

- Made roleId, departmentId, and positionId columns optional with nullable relationships

### 4. Default Users Initialization

- Added checks to ensure columns exist before trying to use them
- Added error handling to continue even if some users can't be created
- Added a new function to ensure relationship columns exist

### 5. Database Reset Script

- Created a script to reset the database for development and testing
- Added npm scripts to reset the database and start fresh

## How to Use

### Reset Database and Start Fresh

```bash
npm run db:fresh
```

This will:
1. Drop the existing database
2. Create a new database
3. Start the server, which will run migrations and initialize data

### Run Migrations Only

```bash
npm run migration:run
```

### Ensure Default Users

```bash
npm run ensure:default-users
```

## Troubleshooting

If you still encounter migration issues:

1. Check the PostgreSQL logs for detailed error messages
2. Ensure the database user has sufficient privileges
3. Try resetting the database with `npm run db:reset`
4. Check if the enum types already exist in the database
5. Verify that all required extensions (like uuid-ossp) are installed