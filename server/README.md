# Leave Management System

A comprehensive leave management system built with Hapi.js, TypeORM, and PostgreSQL.

## Features

### Admin Features
1. **Admin Management**
   * CRUD Operations: Create, read, update role, and delete users.
   * Role-Based Access Control: Define roles (Super Admin, Manager, HR, Employee) and their respective permissions.

2. **Leave Policy Configuration**
   * Define Leave Types: Annual, Sick, WFH, Casual Leave, Earned Leave, Maternity Leave, Paternity Leave, Compensatory Off, Half-day Leave, LOP.
   * Set Leave Limits: Maximum days allowed per leave type.
   * Carry-Over Policies: Define if unused leaves can be carried forward and the limits.

3. **Approval Workflows**
   * Multi-Level Approval: Implement tiered approval for long leaves (>5 days).

4. **Holiday Calendar**
   * CRUD Operations: Add, view, update, and delete holidays with reasons and dates.

### Employee Features
1. **Leave Applications**
   * Apply for Leave: Select leave type, start/end dates, and provide a reason.

2. **Leave Balance**
   * Query available leave balance by leave type.

3. **Leave History**
   * Retrieve past leave applications with details (type, duration, status).

4. **Personal Leave Calendar**
   * Display employee-specific calendar of approved leaves and holidays.

5. **Profile Management**
   * Enable updates to personal information like email, phone number, or address.

### Manager Features
1. **Approve/Reject Leave**
   * Review Leave Requests: Approve/reject with optional comments.

2. **Manager Dashboard**
   * Display visual statistics of leave approvals, pending requests, and team availability.

3. **Team Leave Calendar**
   * Shared calendar to view team leaves and availability.

### Shared Features
1. **Email Notifications**
   * Automate updates for leave submissions, approvals, rejections, and policy changes.

## Technical Stack

- **Backend**: Hapi.js for RESTful APIs
- **Authentication**: JWT-Based Role Management
- **Database**: PostgreSQL
- **ORM**: TypeORM (DataMapper Pattern)
- **Plugins**: Authentication and Logging
- **Middleware**: Centralized logging, validation, and error handling

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)

## Installation

### Option 1: Standard Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd leave_mgmt_new
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a PostgreSQL database:
   ```
   createdb leave_management
   ```

4. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the database connection details and other configurations

5. Build the project:
   ```
   npm run build
   ```

6. Seed the database with initial data:
   ```
   npm run seed
   ```

7. Start the server:
   ```
   npm start
   ```

   For development with hot reloading:
   ```
   npm run dev
   ```

### Option 2: Using Setup Script

1. Clone the repository:
   ```
   git clone <repository-url>
   cd leave_mgmt_new
   ```

2. Run the setup script:
   - On Windows: `setup.bat`
   - On Unix/Mac: `chmod +x setup.sh && ./setup.sh`

3. Follow the instructions provided by the script.

### Option 3: Using Docker

1. Clone the repository:
   ```
   git clone <repository-url>
   cd leave_mgmt_new
   ```

2. Start the application using Docker Compose:
   ```
   docker-compose up -d
   ```

3. Seed the database:
   ```
   docker-compose exec app npm run seed
   ```

4. Access the application at http://localhost:3000

5. To stop the application:
   ```
   docker-compose down
   ```

## API Documentation

The API endpoints are organized by resource:

- **Auth**: `/api/auth/*` - Authentication and user profile
- **Users**: `/api/users/*` - User management
- **Leave Types**: `/api/leave-types/*` - Leave type management
- **Leave Balances**: `/api/leave-balances/*` - Leave balance management
- **Leave Requests**: `/api/leave-requests/*` - Leave request management
- **Holidays**: `/api/holidays/*` - Holiday management
- **Approval Workflows**: `/api/approval-workflows/*` - Approval workflow management
- **Dashboard**: `/api/dashboard/*` - Dashboard data

## Default Credentials

After seeding the database, you can log in with the following credentials:

- **Email**: admin@example.com
- **Password**: Admin@123

## License

This project is licensed under the ISC License.