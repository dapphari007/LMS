# System Initialization Guide

This document provides information about the automatic system initialization process that runs when the server starts.

## Automatic Initialization

The system is configured to automatically initialize the database and create all necessary data when the server starts. This includes:

1. Running all pending migrations
2. Creating the super admin user
3. Creating the test user
4. Ensuring all default users exist
5. Synchronizing essential data (roles, departments, positions)
6. Fixing the positions table level column if needed

You don't need to do anything special to trigger this initialization - it happens automatically when you start the server with:

```bash
npm run dev
```

## Testing the Initialization

If you want to test the initialization process without starting the server, you can run:

```bash
node test-initialization.js
```

This script will:
1. Run the initialization script
2. Check if the super admin user exists
3. Check if the test user exists
4. List all users in the database

## Available Users

After initialization, the following users will be available:

1. Super Admin Users:
   - admin@example.com / Admin@123
   - test@example.com / Test@123
   - john.smith@example.com / Admin@123
   - sarah.johnson@example.com / Admin@123

2. Manager Users:
   - robert.miller@example.com / Manager@123
   - jennifer.davis@example.com / Manager@123

3. HR Users:
   - susan.clark@example.com / HR@123
   - richard.rodriguez@example.com / HR@123

4. Employee Users:
   - michael.brown@example.com / Employee@123
   - emily.wilson@example.com / Employee@123
   - david.taylor@example.com / Employee@123
   - lisa.martinez@example.com / Employee@123

## Reinitializing the Database

If you need to completely reinitialize the database:

1. Drop the database:
   ```bash
   cd server
   npx typeorm schema:drop -d src/config/database.ts
   ```

2. Start the server:
   ```bash
   npm run dev
   ```

The system will automatically recreate all tables, run migrations, and create all necessary data.

## Troubleshooting

If you encounter any issues with the initialization process:

1. Check the server logs for error messages
2. Run the test-initialization.js script to see if it completes successfully
3. Check if the database connection settings in server/src/config/config.ts are correct
4. Make sure the database server is running

If you need to manually reset the super admin user:

```bash
cd server
npx ts-node src/scripts/reset-superadmin.ts
```

This will create or reset the super admin user with the credentials:
- Email: admin@example.com
- Password: Admin@123