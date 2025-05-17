import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import config from "../../config";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { createPosition } from "../../services/positionService";

interface Department {
  id: string;
  name: string;
}

interface FormData {
  name: string;
  description: string;
  departmentId: string;
  level: number;
  isActive: boolean;
}

const CreatePositionPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
      departmentId: "",
      level: 1,
      isActive: true,
    },
  });

  // Fetch departments for dropdown
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/departments`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        
        if (response.data && Array.isArray(response.data.departments)) {
          setDepartments(response.data.departments);
        } else {
          console.error("Unexpected departments response format:", response.data);
          setDepartments([]);
        }
      } catch (err) {
        console.error("Error fetching departments:", err);
        setError("Failed to load departments");
      }
    };

    fetchDepartments();
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await createPosition({
        name: data.name,
        description: data.description,
        departmentId: data.departmentId === "" ? undefined : data.departmentId,
        level: data.level,
        isActive: data.isActive,
      });
      
      navigate("/positions");
    } catch (err) {
      console.error("Error creating position:", err);
      setError("Failed to create position. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Create Position</h1>
        <Button variant="outline" onClick={() => navigate("/positions")}>
          Back to Positions
        </Button>
      </div>

      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Position Name *
              </label>
              <input
                id="name"
                type="text"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                  errors.name ? "border-red-500" : ""
                }`}
                {...register("name", { required: "Position name is required" })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="departmentId" className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <select
                id="departmentId"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                {...register("departmentId")}
              >
                <option value="">-- Select Department --</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                Position Level
              </label>
              <select
                id="level"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                {...register("level", { valueAsNumber: true })}
              >
                <option value={1}>Entry Level</option>
                <option value={2}>Senior/Specialist</option>
                <option value={3}>Manager</option>
                <option value={4}>Director</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="isActive" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="isActive"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                {...register("isActive")}
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                {...register("description")}
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/positions")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⟳</span>
                  Creating...
                </>
              ) : (
                "Create Position"
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreatePositionPage;