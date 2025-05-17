# Leave Management System

A comprehensive leave management system built with Hapi.js, TypeORM, PostgreSQL, and React.

## Project Structure

- `client/` - React frontend application
- `server/` - Hapi.js backend API

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)

## Setup Instructions

### Server Setup

1. Navigate to the server directory:

   ```
   cd server
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the server directory with the following content (adjust as needed):

   ```
   NODE_ENV=development
   PORT=3001

   # Database
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   DB_DATABASE=leave_management

   # JWT
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:
   ```
   npm run dev
   ```

### Client Setup

1. Navigate to the client directory:

   ```
   cd client
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the client directory with the following content:

   ```
   REACT_APP_API_URL=http://localhost:3001/api
   ```

4. Start the client:
   ```
   npm start
   ```

## Default Users

The system automatically creates 10 default users with various roles if they don't already exist:

### Super Admins

- Email: john.smith@example.com, Password: Admin@123
- Email: sarah.johnson@example.com, Password: Admin@123

### Managers

- Email: robert.miller@example.com, Password: Manager@123 (Engineering)
- Email: jennifer.davis@example.com, Password: Manager@123 (Marketing)

### HR

- Email: susan.clark@example.com, Password: HR@123
- Email: richard.rodriguez@example.com, Password: HR@123

### Employees

- Email: michael.brown@example.com, Password: Employee@123 (Engineering)
- Email: emily.wilson@example.com, Password: Employee@123 (Engineering)
- Email: david.taylor@example.com, Password: Employee@123 (Marketing)
- Email: lisa.martinez@example.com, Password: Employee@123 (Marketing)

## Features

- User management with different roles (Super Admin, Manager, HR, Employee)
- Department and position tracking
- Leave request management
- Leave approval workflows
- Leave balance tracking
- Holiday management
- Dashboard with analytics

## Scripts

### Server Scripts

- `npm run dev` - Start the server in development mode
- `npm run build` - Build the server for production
- `npm start` - Start the server in production mode
- `npm run ensure:default-users` - Ensure default users exist in the database
- `npm run migration:generate` - Generate a new TypeORM migration
- `npm run migration:run` - Run pending TypeORM migrations
- `npm run migration:revert` - Revert the last TypeORM migration

### Client Scripts

- `npm start` - Start the client in development mode
- `npm run build` - Build the client for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App
