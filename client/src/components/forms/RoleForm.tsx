import React, { useState } from "react";
import Button from "../ui/Button";


interface PermissionSection {
  [key: string]: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  };
}

// Define dashboard types
export enum DashboardType {
  EMPLOYEE = "employee",
  MANAGER = "manager",
  HR = "hr",
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
}

interface RoleFormProps {
  initialData?: {
    name: string;
    description: string;
    permissions: PermissionSection;
    dashboardType?: DashboardType;
  };
  onSubmit: (data: {
    name: string;
    description: string;
    permissions: PermissionSection;
    dashboardType: DashboardType;
  }) => void;
  loading: boolean;
  isEditing?: boolean;
}

const defaultPermissionSections = [
  "users",
  "roles",
  "departments",
  "positions",
  "leaveRequests",
  "leaveTypes",
  "leaveBalances",
  "holidays",
  "approvalWorkflows",
];

const RoleForm: React.FC<RoleFormProps> = ({
  initialData,
  onSubmit,
  loading,
  isEditing = false,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [dashboardType, setDashboardType] = useState<DashboardType>(
    initialData?.dashboardType || DashboardType.EMPLOYEE
  );
  const [permissions, setPermissions] = useState<PermissionSection>(
    initialData?.permissions || {}
  );

  // Initialize permissions on component mount
  React.useEffect(() => {
    // Initialize permissions for sections that don't exist yet
    const initializePermissions = () => {
      const updatedPermissions = { ...permissions };
      
      defaultPermissionSections.forEach((section) => {
        if (!updatedPermissions[section]) {
          updatedPermissions[section] = {
            create: false,
            read: false,
            update: false,
            delete: false,
          };
        }
      });
      
      if (JSON.stringify(updatedPermissions) !== JSON.stringify(permissions)) {
        setPermissions(updatedPermissions);
      }
    };

    if (Object.keys(permissions).length === 0) {
      initializePermissions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePermissionChange = (
    section: string,
    action: "create" | "read" | "update" | "delete",
    value: boolean
  ) => {
    setPermissions({
      ...permissions,
      [section]: {
        ...permissions[section],
        [action]: value,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      permissions,
      dashboardType,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Role Name *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="dashboardType"
            className="block text-sm font-medium text-gray-700"
          >
            Dashboard Type *
          </label>
          <select
            id="dashboardType"
            value={dashboardType}
            onChange={(e) => setDashboardType(e.target.value as DashboardType)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          >
            <option value={DashboardType.EMPLOYEE}>Employee Dashboard</option>
            <option value={DashboardType.MANAGER}>Manager Dashboard</option>
            <option value={DashboardType.HR}>HR Dashboard</option>
            <option value={DashboardType.ADMIN}>Admin Dashboard</option>
            <option value={DashboardType.SUPER_ADMIN}>Super Admin Dashboard</option>
          </select>
          <p className="mt-1 text-sm text-gray-500">
            Select the dashboard type that will be shown to users with this role.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Permissions</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resource
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Create
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Read
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Update
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.keys(permissions).length > 0 &&
                  defaultPermissionSections.map((section) => (
                    <tr key={section}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {section.charAt(0).toUpperCase() + section.slice(1)}
                        </div>
                      </td>
                      {["create", "read", "update", "delete"].map((action) => (
                        <td
                          key={`${section}-${action}`}
                          className="px-6 py-4 whitespace-nowrap text-center"
                        >
                          <input
                            type="checkbox"
                            checked={
                              permissions[section]?.[action as keyof typeof permissions[typeof section]] || false
                            }
                            onChange={(e) =>
                              handlePermissionChange(
                                section,
                                action as "create" | "read" | "update" | "delete",
                                e.target.checked
                              )
                            }
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={loading}>
          {isEditing ? "Update Role" : "Create Role"}
        </Button>
      </div>
    </form>
  );
};

export default RoleForm;