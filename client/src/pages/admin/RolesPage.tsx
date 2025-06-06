import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import config from "../../config";
import { PlusIcon, PencilIcon, TrashIcon, UserGroupIcon, UserIcon } from "@heroicons/react/24/outline";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../components/ui/Modal";

import { DashboardType } from "../../components/forms/RoleForm";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  dashboardType?: DashboardType;
  isSystem?: boolean;
  isActive?: boolean;
  users?: User[];
  userCount?: number;
}

const RolesPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  
  // Check for success message from location state (after redirect)
  useEffect(() => {
    if (location.state?.success) {
      setSuccess(location.state.success);
      // Clear the location state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/roles?includeUsers=true`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      // Check if the response has a roles property (API might return { roles: [...] })
      const roles = response.data.roles || response.data;
      
      // Ensure we return an array
      return Array.isArray(roles) ? roles : [];
    } catch (err) {
      throw new Error("Failed to fetch roles");
    }
  };

  const {
    data: roles = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["roles"],
    queryFn: fetchRoles,
  });

  const handleDelete = async (id: string) => {
    // For super_admin, show a special warning if they're deleting a role
    if (user?.role === "super_admin") {
      if (window.confirm("Are you sure you want to delete this role? If users are assigned to this role, they will be reassigned to the default Employee role.")) {
        try {
          await axios.delete(`${config.apiUrl}/roles/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setSuccess("Role deleted successfully. Any assigned users have been reassigned.");
          refetch();
        } catch (err: any) {
          // Extract the error message from the response if available
          const errorMessage = err.response?.data?.message || "Failed to delete role";
          setError(errorMessage);
          console.error("Error deleting role:", err.response?.data || err);
        }
      }
    } else {
      // For non-super_admin users, show the regular confirmation
      if (window.confirm("Are you sure you want to delete this role?")) {
        try {
          await axios.delete(`${config.apiUrl}/roles/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setSuccess("Role deleted successfully");
          refetch();
        } catch (err: any) {
          // Extract the error message from the response if available
          const errorMessage = err.response?.data?.message || "Failed to delete role";
          
          // Check for specific error messages
          if (errorMessage.includes("assigned to users")) {
            setError("Cannot delete a role that is assigned to users. Please reassign users first.");
          } else if (errorMessage.includes("System roles can only be deleted by super administrators")) {
            setError("System roles can only be deleted by super administrators.");
          } else if (errorMessage.includes("System roles cannot be deleted")) {
            setError("System roles cannot be deleted.");
          } else {
            setError(errorMessage);
          }
          
          console.error("Error deleting role:", err.response?.data || err);
        }
      }
    }
  };
  
  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await axios.patch(
        `${config.apiUrl}/roles/${id}/toggle-status`,
        { isActive: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuccess(`Role ${!currentStatus ? "activated" : "deactivated"} successfully`);
      refetch();
    } catch (err: any) {
      // Extract the error message from the response if available
      const errorMessage = err.response?.data?.message || `Failed to ${currentStatus ? "deactivate" : "activate"} role`;
      
      // Check for specific error messages
      if (errorMessage.includes("System roles can only be modified by super administrators")) {
        setError("System roles can only be modified by super administrators.");
      } else {
        setError(errorMessage);
      }
      
      console.error("Error toggling role status:", err.response?.data || err);
    }
  };

  // Function to view users assigned to a role
  const viewRoleUsers = (role: Role) => {
    setSelectedRole(role);
    setShowUserModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Roles Management
        </h1>
        <div className="flex space-x-3">
          <Button
            variant="primary"
            onClick={() => navigate("/roles/create")}
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Role
          </Button>
        </div>
      </div>

      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}
      {success && (
        <Alert
          type="success"
          message={success}
          onClose={() => setSuccess(null)}
        />
      )}
      
      <Alert
        type="warning"
        message="Currently Roles cannot be created - still under development"
      />

      <Card>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
          </div>
        ) : roles.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No roles found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dashboard Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permissions
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {roles.map((role: Role) => (
                  <tr key={role.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 flex items-center">
                        {role.name}
                        {role.isSystem && (
                          <span 
                            className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800" 
                            title={user?.role === "super_admin" 
                              ? "System role - Super Admin can modify" 
                              : "System roles can only be modified by super administrators"}
                          >
                            System
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {role.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        {role.dashboardType ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {role.dashboardType.charAt(0).toUpperCase() + role.dashboardType.slice(1)} Dashboard
                          </span>
                        ) : (
                          <span className="text-sm text-gray-500">
                            Employee Dashboard
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        {role.isActive !== false ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Inactive
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {role.permissions ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Has Permissions
                          </span>
                        ) : (
                          <span className="text-sm text-gray-500">
                            No permissions
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewRoleUsers(role)}
                          title="View users assigned to this role"
                        >
                          <UserGroupIcon className="h-4 w-4" />
                          {role.userCount ? ` (${role.userCount})` : ""}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            (window.location.href = `/roles/edit/${role.id}`)
                          }
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={role.isActive ? "warning" : "success"}
                          size="sm"
                          onClick={() => handleToggleStatus(role.id, role.isActive || false)}
                          disabled={role.isSystem && user?.role !== "super_admin"}
                          title={
                            role.isSystem && user?.role !== "super_admin"
                              ? "Only super administrators can modify system roles"
                              : role.isActive
                              ? "Deactivate role"
                              : "Activate role"
                          }
                          className="mr-2"
                        >
                          {role.isActive ? "Deactivate" : "Activate"}
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(role.id)}
                          disabled={role.isSystem && user?.role !== "super_admin"}
                          title={
                            role.isSystem && user?.role !== "super_admin"
                              ? "Only super administrators can delete system roles"
                              : user?.role === "super_admin"
                              ? "Delete role (users will be reassigned)"
                              : "Delete role"
                          }
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Modal for displaying users assigned to a role */}
      <Modal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        title={`Users Assigned to ${selectedRole?.name || 'Role'}`}
      >
        <div className="p-4">
          {selectedRole?.users && selectedRole.users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedRole.users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <UserIcon className="h-4 w-4 text-gray-500" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {user.isActive ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Inactive
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No users assigned to this role
            </div>
          )}
          <div className="mt-6 flex justify-end">
            <Button variant="secondary" onClick={() => setShowUserModal(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RolesPage;
