# Sample Users for Leave Management System

This directory contains scripts to create sample users for the leave management system, specifically for admin, manager, and HR roles.

## Available Files

1. **sample-users.ts** - TypeScript script to programmatically create sample users using TypeORM
2. **sample-users.sql** - SQL script to directly insert sample users into the database
3. **sample-users.json** - JSON file containing the sample user data for reference

## User Credentials

### Admins (5 users)
- Email format: `firstname.lastname@example.com` (e.g., john.smith@example.com)
- Password: `Admin@123`
- Role: `super_admin`

### Managers (6 users)
- Email format: `firstname.lastname@example.com` (e.g., robert.miller@example.com)
- Password: `Manager@123`
- Role: `manager`

### HR Personnel (5 users)
- Email format: `firstname.lastname@example.com` (e.g., susan.clark@example.com)
- Password: `HR@123`
- Role: `hr`

## How to Use

### Using TypeScript Script (Recommended)

Run the following command from the project root:

```bash
npm run seed:sample-users
```

This will create all the sample users in the database using TypeORM.

### Using SQL Script

If you prefer to use the SQL script directly:

1. Connect to your PostgreSQL database
2. Run the SQL commands in `sample-users.sql`

Example using psql:

```bash
psql -U your_username -d your_database -f src/scripts/sample-users.sql
```

## Notes

- The script checks for existing users with the same email before creating new ones to avoid duplicates
- All users are created with `isActive` set to `true`
- The TypeScript script uses the proper password hashing function from the auth utils
- The SQL script contains example password hashes that may not work with your actual system configuration