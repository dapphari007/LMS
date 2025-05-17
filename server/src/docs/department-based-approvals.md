# Department-Based Leave Approval System

This document outlines the implementation of department-based leave approvals in the system.

## Overview

The system now ensures that leave requests are approved by the appropriate people based on the user's department and role. This means:

1. Team leads can approve leave requests for employees in their department
2. Department heads (managers assigned to a department) can approve leave requests for employees in their department
3. HR representatives can approve leave requests for employees in their department
4. Super admins can approve any leave request

## Implementation Details

### Approver Service

The approver service has been enhanced to:

1. Find approvers based on department
2. Prioritize department-specific approvers over general approvers
3. Add a new approver type: `departmentHead`
4. Check if an approver is authorized based on department and role

### Approval Workflow

A new department-based approval workflow has been added with the following levels:

1. **Level 1**: Team Lead (from the same department)
2. **Level 2**: Department Head (manager assigned to the department)
3. **Level 3**: HR (from the same department)

### Authorization Check

Before a leave request can be approved or rejected, the system now checks:

1. If the approver is the user's assigned manager, team lead, or HR
2. If the approver is from the same department as the user
3. If the approver has the appropriate role for the current approval level

## How It Works

1. When a user submits a leave request, the system identifies the appropriate approvers based on the user's department
2. The leave request is routed to the appropriate approver(s) based on the approval workflow
3. Approvers can only approve leave requests for users in their department (unless they are super admins)
4. If an approver tries to approve a leave request for a user in a different department, they will receive an error message

## Automatic Initialization

The department-based approval workflows are automatically created when the server initializes:

1. The system checks if the department-based workflow already exists
2. If it doesn't exist, it creates a new workflow with department-specific approvers
3. It also updates existing workflows to include department-specific approvers if needed
4. This ensures that the approval workflows are always properly configured

## Manual Initialization

You can also manually initialize or update the approval workflows using the following command:

```bash
npm run init:approval-workflows
```

This is useful if you need to reset or update the workflows without restarting the server.

## Migration

A migration has been added to create a new department-based approval workflow and update existing workflows to include department-specific approvers.

## Testing

To test the department-based approval system:

1. Create users in different departments with different roles
2. Submit leave requests from users in different departments
3. Try to approve leave requests as users with different roles and from different departments
4. Verify that only appropriate approvers can approve leave requests