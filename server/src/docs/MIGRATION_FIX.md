# Migration Fix Instructions

This document provides instructions on how to fix the database migration issues in the Leave Management System.

## Problems

The application is encountering two main issues:

1. **Migration Order Issue**: The migrations are being run in the wrong order. Specifically, the migration `1683500000000-AddLevelToPosition.ts` is trying to add a column to the `positions` table before the table itself is created by the migration `1715000000000-AddRolesDepartmentsPositionsPages.ts`.

2. **Missing Column Issue**: The `level` column is defined in the `Position` entity model but is missing from the database table schema, causing errors when trying to synchronize positions.

## Solution

We've implemented several fixes to resolve these issues:

1. Updated the `AddLevelToPosition` migration to check if the table exists before attempting to modify it
2. Added the `level` column to the positions table creation in the `AddRolesDepartmentsPositionsPages` migration
3. Created a script to fix the positions table by adding the missing level column
4. Created a script to fix positions data by ensuring all positions have appropriate level values
5. Created an improved migration runner with better error handling
6. Created a script to fix the migration order by ensuring tables are created before modifications
7. Updated the server.ts file to use our improved migration handling

## How to Fix

### Option 1: Run the Fix Script

We've created a simple script that will fix all the migration issues for you:

```bash
node fix-migrations.js
```

This script will:
1. Run the migration fix script to ensure tables are created in the correct order
2. Fix the positions table by adding the missing level column
3. Fix positions data by ensuring all positions have appropriate level values
4. Apply all pending migrations

After running this script, you should be able to start the server normally with:

```bash
npm run dev
```

### Option 2: Manual Fix

If you prefer to fix the issues manually, follow these steps:

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Run the migration fix script:
   ```bash
   npx ts-node src/scripts/fixMigrationOrder.ts
   ```

3. Run the positions table fix script:
   ```bash
   npx ts-node src/scripts/fixPositionsTable.ts
   ```

4. Run the positions data fix script:
   ```bash
   npx ts-node src/scripts/fixPositionsData.ts
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

## Preventing Future Issues

To prevent similar issues in the future:

1. Always name migration files with timestamps that reflect their dependencies
2. Add checks in migrations to verify prerequisites (like table existence)
3. Ensure entity models and database schemas are in sync
4. Test migrations on a clean database before deploying
5. Add validation in synchronization scripts to handle missing columns gracefully

## Technical Details

### Migration Order Issue

The issue was caused by the timestamp ordering of the migration files. TypeORM runs migrations in ascending order based on the timestamp in the filename. The migration that adds a column to the `positions` table had a timestamp from 2023 (1683500000000), while the migration that creates the table had a timestamp from 2024 (1715000000000).

### Missing Column Issue

The `level` column was defined in the `Position` entity model but was missing from the database schema. This caused errors when trying to synchronize positions because the code was trying to set a value for a column that didn't exist in the database.

Our fix ensures that:
1. The migration that creates tables runs first
2. Migrations that modify tables run only after the tables exist
3. The positions table includes the level column
4. Error handling is improved to provide better diagnostics

If you encounter any issues with this fix, please contact the development team.