import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { useQuery } from "@tanstack/react-query";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Department {
  id: string;
  name: string;
  description: string | null;
  managerId: string | null;
  isActive: boolean;
}

const EditDepartmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [managerId, setManagerId] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch department data
  const { data: department, isLoading: isLoadingDepartment, error: queryError } = useQuery({
    queryKey: ["department", id],
    queryFn: async () => {
      const response = await axios.get(`${config.apiUrl}/departments/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    },
    enabled: !!id,
    onError: (error) => {
      console.error("Error fetching department:", error);
      setError("Failed to load department data");
    }
  });

  // Fetch users to select as managers
  const { data: users = [], isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get(`${config.apiUrl}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data.users || [];
    },
    onError: (error) => {
      console.error("Error fetching users:", error);
      setError("Failed to load users data");
    }
  });

  // Set form values when department data is loaded
  useEffect(() => {
    if (department) {
      setName(department.name || "");
      setDescription(department.description || "");
      setManagerId(department.managerId || "");
      setIsActive(department.isActive);
    }
  }, [department]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError("Department name is required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      await axios.put(
        `${config.apiUrl}/departments/${id}`,
        {
          name,
          description: description || null,
          managerId: managerId || null,
          isActive,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSuccess("Department updated successfully");
      
      // Redirect after a short delay to show success message
      setTimeout(() => {
        navigate("/departments");
      }, 1500);
    } catch (err: any) {
      console.error("Error updating department:", err);
      setError(
        err.response?.data?.message || 
        "Failed to update department. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingDepartment) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (queryError || (!department && !isLoadingDepartment)) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <h2 className="text-lg font-medium text-red-800">Department not found</h2>
        <p className="mt-2 text-red-700">
          {queryError 
            ? "An error occurred while fetching the department. Please try again later." 
            : "The department you are trying to edit does not exist or you don't have permission to access it."}
        </p>
        <Button 
          variant="primary" 
          className="mt-4"
          onClick={() => navigate("/departments")}
        >
          Back to Departments
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Edit Department</h1>
        <Button variant="secondary" onClick={() => navigate("/departments")}>
          Back to Departments
        </Button>
      </div>

      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}
      
      {success && (
        <Alert type="success" message={success} onClose={() => setSuccess(null)} />
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
              value={managerId || ""}
              onChange={(e) => setManagerId(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a manager (optional)</option>
              {users.map((user: User) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName} ({user.email})
                </option>
              ))}
            </select>
            {isLoadingUsers && (
              <p className="mt-1 text-sm text-gray-500">Loading users...</p>
            )}
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
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditDepartmentPage;