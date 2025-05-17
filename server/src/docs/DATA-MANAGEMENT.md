# Data Management Scripts

This document describes the scripts available for managing essential data in the system, including roles and approval workflows.

## Automatic Synchronization

The system automatically synchronizes essential data (roles and approval workflows) when the server starts. This ensures that all required roles and workflows are always available in the database.

## Manual Synchronization

You can also manually synchronize the essential data using the following scripts:

### Synchronize Essential Data

To synchronize roles and approval workflows:

```bash
node sync-data.js
```

This script will:
1. Check if roles and approval workflows exist in the database
2. Create any missing roles or workflows
3. Update existing roles and workflows with the latest configuration

### Check Essential Data

To check the current status of roles and approval workflows:

```bash
node check-data.js
```

This script will display:
1. All roles currently in the database
2. All approval workflows currently in the database

### Manage Roles

To manage roles directly from the command line:

```bash
# Show all roles
node direct-manage-roles.js show

# Create a new role
node direct-manage-roles.js create "Role Name" "Role Description" '{"resource":{"create":true,"read":true,"update":true,"delete":false}}'
```

## System Roles

The system automatically creates and maintains the following roles:

1. **Super Admin** - Full access to all system features
2. **Manager** - Team management access with approval capabilities
3. **HR** - Personnel management access with leave management capabilities
4. **Team Lead** - Limited team management access with first-level approval capabilities
5. **Employee** - Basic access for regular employees

## Approval Workflows

The system automatically creates and maintains the following approval workflows:

1. **Short Leave (1-2 days)** - Requires Team Lead approval
2. **Medium Leave (3-5 days)** - Requires Team Lead and Manager approval
3. **Long Leave (6-10 days)** - Requires Team Lead, Manager, and HR approval
4. **Extended Leave (11-20 days)** - Requires Team Lead, Manager, HR, and Super Admin approval
5. **Long-Term Leave (21+ days)** - Requires Team Lead, Manager, HR, and Super Admin approval