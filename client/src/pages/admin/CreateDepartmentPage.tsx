import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { useQuery } from "@tanstack/react-query";
import { GetUsersResponse } from "../../services/userService";
import { getUsers } from "../../services/userService";
import { createDepartment } from "../../services/departmentService";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const CreateDepartmentPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [managerId, setManagerId] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch users to select as managers
  const { data: usersData, isLoading: isLoadingUsers, error: queryError } = useQuery<GetUsersResponse>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await getUsers();
      console.log("Users API response:", response);
      return response;
    }
  });
  
  // Ensure users is always an array
  const users = usersData?.users || [];
  
  // Handle query error
  useEffect(() => {
    if (queryError) {
      console.error("Error fetching users:", queryError);
      setError("Failed to load users data");
    }
  }, [queryError]);
  
  // Log successful data loading
  useEffect(() => {
    if (usersData) {
      console.log("Users loaded successfully:", usersData);
    }
  }, [usersData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError("Department name is required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const departmentData = {
        name,
        ...(description ? { description } : {}),
        ...(managerId ? { managerId } : {}),
        isActive,
      };

      console.log("Creating department with data:", departmentData);

      const newDepartment = await createDepartment(departmentData);
      console.log("Department created successfully:", newDepartment);

      // Redirect to departments page after successful creation
      navigate("/departments");
    } catch (err: any) {
      console.error("Error creating department:", err);
      
      // Log detailed error information
      if (err.response) {
        console.error("Error response:", {
          status: err.response.status,
          data: err.response.data,
          headers: err.response.headers
        });
      } else if (err.request) {
        console.error("No response received:", err.request);
      } else {
        console.error("Error setting up request:", err.message);
      }
      
      setError(
        err.response?.data?.message || 
        err.response?.data?.error ||
        err.message ||
        "Failed to create department. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Create Department</h1>
        <Button variant="secondary" onClick={() => navigate("/departments")}>
          Back to Departments
        </Button>
      </div>

      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Department Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="manager"
              className="block text-sm font-medium text-gray-700"
            >
              Department Manager
            </label>
            <select
              id="manager"
              value={managerId}
              onChange={(e) => setManagerId(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a manager (optional)</option>
              {Array.isArray(users) && users.length > 0 ? (
                users.map((user: User) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName} ({user.email})
                  </option>
                ))
              ) : (
                <option value="" disabled>No users available</option>
              )}
            </select>
            {isLoadingUsers ? (
              <p className="mt-1 text-sm text-gray-500">Loading users...</p>
            ) : users.length === 0 && !isLoadingUsers ? (
              <p className="mt-1 text-sm text-red-500">No users found. Please add users first.</p>
            ) : null}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="isActive"
              className="ml-2 block text-sm text-gray-700"
            >
              Active Department
            </label>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/departments")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Department"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateDepartmentPage;