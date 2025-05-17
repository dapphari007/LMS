# Super Admin Features

This document outlines the new features that allow super admins to create and manage roles, departments, positions, and pages with flexible configurations.

## Overview

The system now supports the following new features:

1. **Role Management**: Create, update, and delete custom roles with specific permissions
2. **Department Management**: Create, update, and delete departments
3. **Position Management**: Create, update, and delete positions linked to departments
4. **Page Management**: Create, update, and delete custom pages with flexible configurations

## Setup Instructions

### 1. Run Migrations

Before using the new features, you need to run the migrations to create the necessary database tables:

```bash
npm run run:migrations
```

This will create the following tables:
- `roles`
- `departments`
- `positions`
- `pages`

And add the necessary foreign key columns to the `users` table.

### 2. System Initialization

The system will automatically initialize default roles and pages when the server starts. This includes:

- **System Roles**: Super Admin, Manager, HR, Team Lead, Employee
- **System Pages**: Dashboard, Leave Requests, User Management, Role Management, Department Management, Position Management, Page Management

## API Endpoints

### Role Management

- `POST /api/roles` - Create a new role (Super Admin only)
- `GET /api/roles` - Get all roles (Manager, HR, Super Admin)
- `GET /api/roles/{id}` - Get role by ID (Manager, HR, Super Admin)
- `PUT /api/roles/{id}` - Update role (Super Admin only)
- `DELETE /api/roles/{id}` - Delete role (Super Admin only)

### Department Management

- `POST /api/departments` - Create a new department (Super Admin only)
- `GET /api/departments` - Get all departments (All roles)
- `GET /api/departments/{id}` - Get department by ID (All roles)
- `PUT /api/departments/{id}` - Update department (Super Admin only)
- `DELETE /api/departments/{id}` - Delete department (Super Admin only)

### Position Management

- `POST /api/positions` - Create a new position (Super Admin only)
- `GET /api/positions` - Get all positions (All roles)
- `GET /api/positions/{id}` - Get position by ID (All roles)
- `PUT /api/positions/{id}` - Update position (Super Admin only)
- `DELETE /api/positions/{id}` - Delete position (Super Admin only)

### Page Management

- `POST /api/pages` - Create a new page (Super Admin only)
- `GET /api/pages` - Get all pages (All roles)
- `GET /api/pages/{id}` - Get page by ID (All roles)
- `GET /api/pages/slug/{slug}` - Get page by slug (All roles)
- `PUT /api/pages/{id}` - Update page (Super Admin only)
- `DELETE /api/pages/{id}` - Delete page (Super Admin only)

## Data Models

### Role

```typescript
{
  id: string;
  name: string;
  description: string | null;
  permissions: string | null; // JSON string of permissions
  isActive: boolean;
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Department

```typescript
{
  id: string;
  name: string;
  description: string | null;
  managerId: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Position

```typescript
{
  id: string;
  name: string;
  description: string | null;
  departmentId: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Page

```typescript
{
  id: string;
  name: string;
  description: string | null;
  slug: string;
  configuration: string | null; // JSON string of page configuration
  accessRoles: string | null; // JSON string of roles that can access this page
  isActive: boolean;
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## Example Usage

### Creating a Custom Role

```json
POST /api/roles
{
  "name": "Project Manager",
  "description": "Manages specific projects and teams",
  "permissions": {
    "users": { "create": false, "read": true, "update": false, "delete": false },
    "leaveRequests": { "create": true, "read": true, "update": true, "delete": false }
  }
}
```

### Creating a Department

```json
POST /api/departments
{
  "name": "Research & Development",
  "description": "R&D Department",
  "managerId": "user-uuid-here"
}
```

### Creating a Position

```json
POST /api/positions
{
  "name": "Senior Developer",
  "description": "Senior software developer position",
  "departmentId": "department-uuid-here"
}
```

### Creating a Custom Page

```json
POST /api/pages
{
  "name": "Team Dashboard",
  "description": "Custom dashboard for team performance",
  "slug": "team-dashboard",
  "configuration": {
    "layout": "two-column",
    "widgets": [
      { "type": "teamPerformance", "position": "left" },
      { "type": "leaveCalendar", "position": "right" }
    ]
  },
  "accessRoles": ["manager", "team_lead"]
}
```