# API Documentation

This document provides details about the API endpoints available in the Leave Management System.

## Authentication

### Register a New User

```
POST /api/auth/register
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123",
  "phoneNumber": "1234567890",
  "address": "123 Main St",
  "gender": "male"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "1234567890",
    "address": "123 Main St",
    "role": "employee",
    "level": 1,
    "gender": "male",
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Login

```
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "uuid",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "role": "employee",
    "level": 1
  }
}
```

### Get User Profile

```
GET /api/auth/profile
```

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "1234567890",
    "address": "123 Main St",
    "role": "employee",
    "level": 1,
    "gender": "male",
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Update User Profile

```
PUT /api/auth/profile
```

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "phoneNumber": "0987654321",
  "address": "456 Oak St"
}
```

**Response:**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "uuid",
    "firstName": "John",
    "lastName": "Smith",
    "email": "john.doe@example.com",
    "phoneNumber": "0987654321",
    "address": "456 Oak St",
    "role": "employee",
    "level": 1,
    "gender": "male",
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Change Password

```
PUT /api/auth/change-password
```

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Request Body:**
```json
{
  "currentPassword": "SecurePassword123",
  "newPassword": "NewSecurePassword123"
}
```

**Response:**
```json
{
  "message": "Password changed successfully"
}
```

## User Management (Admin Only)

### Create User

```
POST /api/users
```

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "password": "SecurePassword123",
  "phoneNumber": "1234567890",
  "address": "123 Main St",
  "role": "employee",
  "level": 1,
  "gender": "female",
  "managerId": "manager_uuid"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "uuid",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "phoneNumber": "1234567890",
    "address": "123 Main St",
    "role": "employee",
    "level": 1,
    "gender": "female",
    "managerId": "manager_uuid",
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Get All Users

```
GET /api/users
```

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Query Parameters:**
- `role` (optional): Filter by role (e.g., "employee", "manager")
- `isActive` (optional): Filter by active status (true/false)

**Response:**
```json
{
  "users": [
    {
      "id": "uuid",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "role": "employee",
      "level": 1,
      "isActive": true
    },
    {
      "id": "uuid",
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane.doe@example.com",
      "role": "employee",
      "level": 1,
      "isActive": true
    }
  ],
  "count": 2
}
```

## Leave Types

### Create Leave Type (Admin Only)

```
POST /api/leave-types
```

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Request Body:**
```json
{
  "name": "Annual Leave",
  "description": "Regular annual leave for all employees",
  "defaultDays": 20,
  "isCarryForward": true,
  "maxCarryForwardDays": 5,
  "isActive": true,
  "applicableGender": null,
  "isHalfDayAllowed": true,
  "isPaidLeave": true
}
```

**Response:**
```json
{
  "message": "Leave type created successfully",
  "leaveType": {
    "id": "uuid",
    "name": "Annual Leave",
    "description": "Regular annual leave for all employees",
    "defaultDays": 20,
    "isCarryForward": true,
    "maxCarryForwardDays": 5,
    "isActive": true,
    "applicableGender": null,
    "isHalfDayAllowed": true,
    "isPaidLeave": true,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Get All Leave Types

```
GET /api/leave-types
```

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Query Parameters:**
- `isActive` (optional): Filter by active status (true/false)

**Response:**
```json
{
  "leaveTypes": [
    {
      "id": "uuid",
      "name": "Annual Leave",
      "description": "Regular annual leave for all employees",
      "defaultDays": 20,
      "isCarryForward": true,
      "maxCarryForwardDays": 5,
      "isActive": true,
      "applicableGender": null,
      "isHalfDayAllowed": true,
      "isPaidLeave": true,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

## Leave Requests

### Create Leave Request

```
POST /api/leave-requests
```

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Request Body:**
```json
{
  "leaveTypeId": "leave_type_uuid",
  "startDate": "2023-02-01",
  "endDate": "2023-02-05",
  "requestType": "full_day",
  "reason": "Family vacation"
}
```

**Response:**
```json
{
  "message": "Leave request created successfully",
  "leaveRequest": {
    "id": "uuid",
    "userId": "user_uuid",
    "leaveTypeId": "leave_type_uuid",
    "startDate": "2023-02-01T00:00:00.000Z",
    "endDate": "2023-02-05T00:00:00.000Z",
    "requestType": "full_day",
    "numberOfDays": 5,
    "reason": "Family vacation",
    "status": "pending",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Get User's Leave Requests

```
GET /api/leave-requests/my-requests
```

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Query Parameters:**
- `status` (optional): Filter by status (e.g., "pending", "approved")
- `year` (optional): Filter by year (e.g., 2023)

**Response:**
```json
{
  "leaveRequests": [
    {
      "id": "uuid",
      "userId": "user_uuid",
      "leaveTypeId": "leave_type_uuid",
      "startDate": "2023-02-01T00:00:00.000Z",
      "endDate": "2023-02-05T00:00:00.000Z",
      "requestType": "full_day",
      "numberOfDays": 5,
      "reason": "Family vacation",
      "status": "pending",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z",
      "leaveType": {
        "id": "leave_type_uuid",
        "name": "Annual Leave"
      }
    }
  ],
  "count": 1
}
```

### Update Leave Request Status (Manager/HR Only)

```
PUT /api/leave-requests/{id}/status
```

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Request Body:**
```json
{
  "status": "approved",
  "comments": "Approved. Enjoy your vacation!"
}
```

**Response:**
```json
{
  "message": "Leave request approved successfully",
  "leaveRequest": {
    "id": "uuid",
    "userId": "user_uuid",
    "leaveTypeId": "leave_type_uuid",
    "startDate": "2023-02-01T00:00:00.000Z",
    "endDate": "2023-02-05T00:00:00.000Z",
    "requestType": "full_day",
    "numberOfDays": 5,
    "reason": "Family vacation",
    "status": "approved",
    "approverId": "approver_uuid",
    "approverComments": "Approved. Enjoy your vacation!",
    "approvedAt": "2023-01-01T00:00:00.000Z",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

## Holidays

### Create Holiday (Admin Only)

```
POST /api/holidays
```

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Request Body:**
```json
{
  "name": "New Year's Day",
  "date": "2023-01-01",
  "description": "Public holiday for New Year's Day",
  "isActive": true
}
```

**Response:**
```json
{
  "message": "Holiday created successfully",
  "holiday": {
    "id": "uuid",
    "name": "New Year's Day",
    "date": "2023-01-01T00:00:00.000Z",
    "description": "Public holiday for New Year's Day",
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Get All Holidays

```
GET /api/holidays
```

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Query Parameters:**
- `year` (optional): Filter by year (e.g., 2023)
- `isActive` (optional): Filter by active status (true/false)

**Response:**
```json
{
  "holidays": [
    {
      "id": "uuid",
      "name": "New Year's Day",
      "date": "2023-01-01T00:00:00.000Z",
      "description": "Public holiday for New Year's Day",
      "isActive": true,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

## Dashboard

### Get Manager Dashboard

```
GET /api/dashboard/manager
```

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "pendingRequests": [
    {
      "id": "uuid",
      "userId": "user_uuid",
      "leaveTypeId": "leave_type_uuid",
      "startDate": "2023-02-01T00:00:00.000Z",
      "endDate": "2023-02-05T00:00:00.000Z",
      "status": "pending",
      "user": {
        "id": "user_uuid",
        "firstName": "John",
        "lastName": "Doe"
      },
      "leaveType": {
        "id": "leave_type_uuid",
        "name": "Annual Leave"
      }
    }
  ],
  "pendingCount": 1,
  "approvedRequests": [],
  "approvedCount": 0,
  "teamAvailability": [
    {
      "date": "2023-01-01",
      "isWeekend": false,
      "isHoliday": true,
      "totalUsers": 5,
      "availableUsers": [
        {
          "id": "user_uuid",
          "name": "John Doe"
        }
      ],
      "availableCount": 1,
      "usersOnLeave": [
        {
          "id": "user_uuid",
          "name": "Jane Doe"
        }
      ],
      "onLeaveCount": 1
    }
  ],
  "upcomingHolidays": [
    {
      "id": "uuid",
      "name": "New Year's Day",
      "date": "2023-01-01T00:00:00.000Z",
      "description": "Public holiday for New Year's Day"
    }
  ]
}
```

### Get Employee Dashboard

```
GET /api/dashboard/employee
```

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "pendingRequests": [
    {
      "id": "uuid",
      "leaveTypeId": "leave_type_uuid",
      "startDate": "2023-02-01T00:00:00.000Z",
      "endDate": "2023-02-05T00:00:00.000Z",
      "status": "pending",
      "leaveType": {
        "id": "leave_type_uuid",
        "name": "Annual Leave"
      }
    }
  ],
  "pendingCount": 1,
  "upcomingRequests": [],
  "recentHistory": [],
  "upcomingHolidays": [
    {
      "id": "uuid",
      "name": "New Year's Day",
      "date": "2023-01-01T00:00:00.000Z",
      "description": "Public holiday for New Year's Day"
    }
  ],
  "leaveStatistics": [
    {
      "leaveType": "Annual Leave",
      "balance": 20,
      "used": 5,
      "carryForward": 0,
      "remaining": 15
    }
  ]
}
```

## Health Check

```
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2023-01-01T00:00:00.000Z"
}
```