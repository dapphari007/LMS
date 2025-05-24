  import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  getUsers,
  activateUser,
  deactivateUser,
  deleteUser,
  GetUsersParams,
} from "../../services/userService";
import { getAllDepartments, Department } from "../../services/departmentService";
import { getAllPositions, Position } from "../../services/positionService";
import { getActiveRoles, Role } from "../../services/roleService";
import { User } from "../../types";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { getErrorMessage } from "../../utils/errorUtils";
import { formatRoleName, getRoleDisplayName } from "../../utils/roleUtils";
import Modal from "../../components/ui/Modal";

const UsersPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  // Initialize state from localStorage or default to "all"
  const [selectedRole, setSelectedRole] = useState<string>(
    localStorage.getItem("usersPage_selectedRole") || "all"
  );
  const [selectedStatus, setSelectedStatus] = useState<string>(
    localStorage.getItem("usersPage_selectedStatus") || "all"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Fetch departments, positions, and roles
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data in separate try-catch blocks to prevent one failure from affecting others
        try {
          const departmentsData = await getAllDepartments();
          setDepartments(departmentsData);
        } catch (deptErr) {
          console.error("Error fetching departments:", deptErr);
        }
        
        try {
          const positionsData = await getAllPositions();
          setPositions(positionsData);
        } catch (posErr) {
          console.error("Error fetching positions:", posErr);
        }
        
        try {
          const rolesData = await getActiveRoles();
          if (rolesData && Array.isArray(rolesData) && rolesData.length > 0) {
            // Sort roles by name
            const sortedRoles = rolesData.sort((a, b) => 
              sortOrder === "asc" 
                ? a.name.localeCompare(b.name) 
                : b.name.localeCompare(a.name)
            );
            setRoles(sortedRoles);
          } else {
            console.warn("No roles data returned or empty array");
          }
        } catch (roleErr) {
          console.error("Error fetching roles:", roleErr);
          setError("Failed to load roles. Please try refreshing the page.");
        }
      } catch (err) {
        setError(getErrorMessage(err));
      }
    };
    
    fetchData();
  }, [sortOrder]);

  // Fetch users
  const { data, refetch, error: queryError } = useQuery({
    queryKey: ["users", selectedRole, selectedStatus],
    queryFn: () => {
      // Determine if we're using a legacy role name or a new role ID
      const params: GetUsersParams = {
        isActive: selectedStatus !== "all" ? selectedStatus === "active" : undefined,
      };
      
      if (selectedRole !== "all") {
        // Check if the selected role is one of the legacy roles
        const legacyRoles = ["super_admin", "admin", "manager", "team_lead", "employee", "hr"];
        if (legacyRoles.includes(selectedRole)) {
          params.role = selectedRole;
        } else {
          // It's a role ID from our new roles system
          params.roleId = selectedRole;
        }
      }
      
      return getUsers(params);
    }
  });
  
  // Handle query errors
  useEffect(() => {
    if (queryError) {
      setError(getErrorMessage(queryError));
    }
  }, [queryError]);

  // Handle activate/deactivate user
  const handleToggleUserStatus = async (id: string, isActive: boolean) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      if (isActive) {
        await deactivateUser(id);
        setSuccessMessage("User deactivated successfully");
      } else {
        await activateUser(id);
        setSuccessMessage("User activated successfully");
      }
      
      // If we're filtering by status, we might need to adjust the filter
      // to ensure the user remains visible after status change
      const newStatus = !isActive; // The new status will be the opposite of current
      
      // Only auto-adjust the filter if we're not already showing "all"
      if (selectedStatus !== "all") {
        const shouldShowActive = newStatus === true && selectedStatus === "inactive";
        const shouldShowInactive = newStatus === false && selectedStatus === "active";
        
        // If the user would disappear from the current filter, show a message
        if (shouldShowActive || shouldShowInactive) {
          setSuccessMessage(
            `User ${newStatus ? "activated" : "deactivated"} successfully. ` +
            `Note: This user will no longer appear in the current filter.`
          );
        }
      }
      
      // Always refetch to update the list
      refetch();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };
  
  // Open delete confirmation modal
  const confirmDelete = (user: User) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };
  
  // Handle delete user
  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      await deleteUser(userToDelete.id);
      setSuccessMessage("User deleted successfully");
      setShowDeleteModal(false);
      setUserToDelete(null);
      refetch();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get department name from ID
  const getDepartmentName = (departmentId: string | undefined) => {
    if (!departmentId) return "N/A";
    const department = departments.find(dept => dept.id === departmentId);
    return department ? department.name : "N/A";
  };

  // Helper function to get position name from ID
  const getPositionName = (positionId: string | undefined) => {
    if (!positionId) return "N/A";
    const position = positions.find(pos => pos.id === positionId);
    return position ? position.name : "N/A";
  };

  // Helper function to render role badge for a user
  const renderRoleBadge = (role: string, user?: any) => {
    // If user object is provided, check for roleId and roleObj first
    if (user) {
      // If user has a roleObj with name, use that (most accurate)
      if (user.roleObj && user.roleObj.name) {
        return <Badge variant="info">{getRoleDisplayName(user.roleObj)}</Badge>;
      }
      
      // If user has a roleId, try to find the role in our roles list
      if (user.roleId && roles && roles.length > 0) {
        const customRole = roles.find(r => r.id === user.roleId);
        if (customRole) {
          return <Badge variant="info">{getRoleDisplayName(customRole)}</Badge>;
        }
      }
    }
    
    // If no user object or no custom role found, check if the role parameter is a roleId
    if (roles && roles.length > 0) {
      const customRole = roles.find(r => r.id === role);
      if (customRole) {
        return <Badge variant="info">{getRoleDisplayName(customRole)}</Badge>;
      }
    }
    
    // Otherwise, handle legacy roles with consistent formatting
    if (typeof role === 'string') {
      // Use our utility function to format the role name
      return <Badge variant={getBadgeVariant(role)}>{formatRoleName(role)}</Badge>;
    }
    
    // Fallback for unknown roles
    return <Badge variant="default">Unknown Role</Badge>;
  };
  
  // Helper function to determine badge variant based on role
  const getBadgeVariant = (role: string): 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default' => {
    switch (role.toLowerCase()) {
      case "super_admin":
        return "primary";
      case "admin":
        return "primary";
      case "manager":
        return "info";
      case "team_lead":
        return "success";
      case "hr":
        return "warning";
      case "employee":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
        <Link to="/users/create">
          <Button>Create User</Button>
        </Link>
      </div>

      {error && (
        <Alert
          variant="error"
          message={error}
          onClose={() => setError(null)}
          className="mb-6"
        />
      )}

      {successMessage && (
        <Alert
          variant="success"
          message={successMessage}
          onClose={() => setSuccessMessage(null)}
          className="mb-6"
        />
      )}

      <Card className="mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="w-full sm:w-auto">
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  className={`text-xs px-2 py-1 rounded ${
                    sortOrder === "asc" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-600"
                  }`}
                  onClick={() => setSortOrder("asc")}
                >
                  A-Z
                </button>
                <button
                  type="button"
                  className={`text-xs px-2 py-1 rounded ml-1 ${
                    sortOrder === "desc" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-600"
                  }`}
                  onClick={() => setSortOrder("desc")}
                >
                  Z-A
                </button>
              </div>
            </div>
            <select
              id="role"
              className="form-input"
              value={selectedRole}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedRole(value);
                localStorage.setItem("usersPage_selectedRole", value);
              }}
            >
              <option value="all">All Roles</option>
              {/* Legacy roles for backward compatibility */}
              <optgroup label="System Roles">
                <option value="super_admin">{formatRoleName("super_admin")}</option>
                <option value="admin">{formatRoleName("admin")}</option>
                <option value="manager">{formatRoleName("manager")}</option>
                <option value="team_lead">{formatRoleName("team_lead")}</option>
                <option value="employee">{formatRoleName("employee")}</option>
                <option value="hr">{formatRoleName("hr")}</option>
              </optgroup>
              
              {/* Custom roles from API */}
              {roles && roles.length > 0 && (
                <optgroup label="Custom Roles">
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {getRoleDisplayName(role)}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
          </div>
          <div className="w-full sm:w-auto">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              className="form-input"
              value={selectedStatus}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedStatus(value);
                localStorage.setItem("usersPage_selectedStatus", value);
              }}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </Card>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {data?.users && data.users.length > 0 ? (
            data.users.map((user: User) => (
              <li key={user.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 font-medium">
                          {user.firstName.charAt(0)}
                          {user.lastName.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {renderRoleBadge(user.role, user)}
                      <Badge variant={user.isActive ? "success" : "danger"}>
                        {user.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex space-x-4">
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <span className="mr-1 font-medium">Phone:</span>
                        {user.phoneNumber || "N/A"}
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <span className="mr-1 font-medium">Department:</span>
                        {getDepartmentName(user.department)}
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <span className="mr-1 font-medium">Position:</span>
                        {getPositionName(user.position)}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm sm:mt-0 space-x-2">
                      <Link to={`/users/edit/${user.id}`}>
                        <Button variant="secondary" size="sm">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant={user.isActive ? "primary" : "success"}
                        size="sm"
                        onClick={() =>
                          handleToggleUserStatus(user.id, user.isActive)
                        }
                        disabled={isLoading}
                      >
                        {user.isActive ? "Deactivate" : "Activate"}
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => confirmDelete(user)}
                        disabled={isLoading}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-8 text-center text-gray-500">
              No users found matching the selected filters.
            </li>
          )}
        </ul>
      </div>
      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal && userToDelete !== null}
        title="Confirm Delete"
        onClose={() => setShowDeleteModal(false)}
      >
        {userToDelete && (
          <div className="p-6">
            <p className="mb-4">
              Are you sure you want to delete the user <strong>{userToDelete.firstName} {userToDelete.lastName}</strong>?
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteUser}
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete User"}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UsersPage;
