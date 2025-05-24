import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import config from "../../config";
import { useNavigate } from "react-router-dom";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";

interface Department {
  id: string;
  name: string;
  description: string;
  managerId?: string;
  isActive: boolean;
  manager?: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

const DepartmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    data: departments = [],
    isLoading,
    refetch,
    error: queryError
  } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const response = await axios.get(`${config.apiUrl}/departments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      // Check if the response has the expected structure
      if (response.data && response.data.departments) {
        return response.data.departments;
      }
      
      // Fallback if the structure is different
      return Array.isArray(response.data) ? response.data : [];
    }
  });
  
  // Handle query error separately
  React.useEffect(() => {
    if (queryError) {
      console.error("Error fetching departments:", queryError);
      setError("Failed to load departments. Please try again later.");
    }
  }, [queryError]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await axios.delete(`${config.apiUrl}/departments/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSuccess("Department deleted successfully");
        refetch();
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Failed to delete department"
        );
      }
    }
  };

  const getManagerName = (department: Department) => {
    if (department.manager) {
      return `${department.manager.firstName} ${department.manager.lastName}`;
    }
    return "Not assigned";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Departments Management
        </h1>
        <Button
          variant="primary"
          onClick={() => navigate("/departments/create")}
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create Department
        </Button>
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

      <Card>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
          </div>
        ) : departments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No departments found. Click the "Create Department" button to add one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Manager
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {departments.map((department: Department) => (
                  <tr key={department.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {department.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {department.description || "No description"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {getManagerName(department)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${department.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {department.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/departments/edit/${department.id}`)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(department.id)}
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

export default DepartmentsPage;
