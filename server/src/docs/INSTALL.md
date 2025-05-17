# Installation Guide

This guide will help you set up and run the Leave Management System.

## Prerequisites

Before you begin, ensure you have the following installed:

1. Node.js (v14 or higher)
2. PostgreSQL (v12 or higher)
3. npm (usually comes with Node.js)

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd leave_mgmt_new
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Set Up the Database

1. Create a PostgreSQL database:

```bash
createdb leave_management
```

2. Configure environment variables:

```bash
cp .env.example .env
```

3. Edit the `.env` file with your database credentials and other settings:

```
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_DATABASE=leave_management

# JWT Configuration
JWT_SECRET=your_secure_random_string
```

## Step 4: Build the Project

```bash
npm run build
```

## Step 5: Seed the Database

This will create a default super admin user and other necessary data:

```bash
npm run seed
```

Default credentials after seeding:

- Email: admin@example.com
- Password: Admin@123

## Step 6: Start the Server

For production:

```bash
npm start
```

For development with hot reloading:

```bash
npm run dev
```

The server will start on http://localhost:3000 (or the port you specified in the .env file).

## Database Migrations

If you need to make changes to the database schema:

1. Generate a migration:

```bash
npm run migration:generate MigrationName
```

2. Run migrations:

```bash
npm run migration:run
```

3. Revert the last migration if needed:

```bash
npm run migration:revert
```

## Troubleshooting

1. **Database Connection Issues**:

   - Ensure PostgreSQL is running
   - Verify the database credentials in your .env file
   - Check that the database exists

2. **Port Already in Use**:

   - Change the PORT value in your .env file

3. **TypeORM Errors**:
   - Make sure your database schema matches the entity definitions
   - Run migrations to update the schema

For more detailed information, refer to the README.md file.
