import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import config from "../../config";
import { PlusIcon, PencilIcon, TrashIcon, CommandLineIcon } from "@heroicons/react/24/outline";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

const RolesPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showCliInfo, setShowCliInfo] = useState<boolean>(false);
  const [scriptOutput, setScriptOutput] = useState<string | null>(null);
  const [isRunningScript, setIsRunningScript] = useState<boolean>(false);
  const [quickRoleName, setQuickRoleName] = useState<string>("");
  const [quickRoleDesc, setQuickRoleDesc] = useState<string>("");
  
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
      const response = await axios.get(`${config.apiUrl}/roles`, {
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
    if (window.confirm("Are you sure you want to delete this role?")) {
      try {
        await axios.delete(`${config.apiUrl}/roles/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSuccess("Role deleted successfully");
        refetch();
      } catch (err) {
        setError("Failed to delete role");
      }
    }
  };

  // Function to toggle CLI info panel
  const toggleCliInfo = () => {
    setShowCliInfo(!showCliInfo);
    // Clear script output when toggling panel
    setScriptOutput(null);
  };
  
  // Function to run the script directly from the UI
  const runScript = async (command: string) => {
    try {
      setIsRunningScript(true);
      setError(null);
      setScriptOutput(null);
      
      const response = await axios.post(
        `${config.apiUrl}/scripts/run-role-script`,
        { command },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      setScriptOutput(response.data.output);
      // Refresh the roles list
      refetch();
    } catch (err: any) {
      console.error("Error running script:", err);
      setError(
        err.response?.data?.message || "An error occurred while running the script"
      );
    } finally {
      setIsRunningScript(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Roles Management
        </h1>
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            onClick={toggleCliInfo}
          >
            <CommandLineIcon className="h-5 w-5 mr-2" />
            CLI Tools
          </Button>
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
      
      {showCliInfo && (
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Command Line Role Management</h2>
            <p className="mb-4 text-gray-600">
              You can also manage roles directly from the command line using our CLI tool.
            </p>
            
            <div className="bg-gray-100 p-4 rounded-md mb-4">
              <h3 className="text-md font-medium text-gray-800 mb-2">Show all roles</h3>
              <div className="flex items-center mb-2">
                <pre className="bg-gray-800 text-white p-3 rounded overflow-x-auto flex-grow">
                  {`node direct-manage-roles.js show`}
                </pre>
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="ml-3"
                  onClick={() => runScript('show')}
                  loading={isRunningScript}
                >
                  Run
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-md mb-4">
              <h3 className="text-md font-medium text-gray-800 mb-2">Create a new role</h3>
              <pre className="bg-gray-800 text-white p-3 rounded overflow-x-auto mb-4">
                {`node direct-manage-roles.js create "Role Name" "Role Description" '{"resource":{"create":true,"read":true,"update":true,"delete":false}}'`}
              </pre>
              
              <div className="mt-4 border-t pt-4">
                <h4 className="text-sm font-medium text-gray-800 mb-2">Quick Create Role</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role Name
                    </label>
                    <input
                      type="text"
                      value={quickRoleName}
                      onChange={(e) => setQuickRoleName(e.target.value)}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="Enter role name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={quickRoleDesc}
                      onChange={(e) => setQuickRoleDesc(e.target.value)}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="Enter description"
                    />
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    if (quickRoleName.trim()) {
                      runScript(`create "${quickRoleName}" "${quickRoleDesc}" '{"users":{"read":true}}'`);
                      // Clear the form after submission
                      setQuickRoleName("");
                      setQuickRoleDesc("");
                    } else {
                      setError("Role name is required");
                    }
                  }}
                  loading={isRunningScript}
                  disabled={!quickRoleName.trim()}
                >
                  Create Role
                </Button>
              </div>
            </div>
            
            {scriptOutput && (
              <div className="bg-gray-100 p-4 rounded-md mt-4">
                <h3 className="text-md font-medium text-gray-800 mb-2">Script Output</h3>
                <pre className="bg-gray-800 text-white p-3 rounded overflow-x-auto max-h-96 overflow-y-auto">
                  {scriptOutput}
                </pre>
              </div>
            )}
          </div>
        </Card>
      )}

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
                      <div className="text-sm font-medium text-gray-900">
                        {role.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {role.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {role.permissions ? (
                          (() => {
                            try {
                              // Try to parse permissions if it's a string
                              const permissionsObj = typeof role.permissions === 'string' 
                                ? JSON.parse(role.permissions) 
                                : role.permissions;
                              
                              // If it's an object, display the keys
                              if (typeof permissionsObj === 'object' && permissionsObj !== null) {
                                return Object.keys(permissionsObj).map((key) => (
                                  <span
                                    key={key}
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                  >
                                    {key}
                                  </span>
                                ));
                              }
                              
                              // If it's an array, display each item
                              if (Array.isArray(permissionsObj)) {
                                return permissionsObj.map((permission) => (
                                  <span
                                    key={permission}
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                  >
                                    {permission}
                                  </span>
                                ));
                              }
                              
                              // Fallback
                              return (
                                <span className="text-sm text-gray-500">
                                  Has permissions
                                </span>
                              );
                            } catch (e) {
                              // If parsing fails, show the raw string
                              return (
                                <span className="text-sm text-gray-500">
                                  Has permissions
                                </span>
                              );
                            }
                          })()
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
                          onClick={() =>
                            (window.location.href = `/roles/edit/${role.id}`)
                          }
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(role.id)}
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
    </div>
  );
};

export default RolesPage;
