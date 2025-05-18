import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import config from "../../config";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import RoleForm, { DashboardType } from "../../components/forms/RoleForm";

const EditRolePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch role data
  const { data: role, isLoading: isLoadingRole } = useQuery({
    queryKey: ["role", id],
    queryFn: async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/roles/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        return response.data.role;
      } catch (err) {
        throw new Error("Failed to fetch role");
      }
    },
  });

  const handleSubmit = async (formData: {
    name: string;
    description: string;
    permissions: any;
    dashboardType: DashboardType;
  }) => {
    setLoading(true);
    setError(null);

    try {
      await axios.put(
        `${config.apiUrl}/roles/${id}`,
        {
          name: formData.name,
          description: formData.description,
          permissions: formData.permissions,
          dashboardType: formData.dashboardType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Redirect to roles list page
      navigate("/roles", { state: { success: "Role updated successfully" } });
    } catch (err: any) {
      console.error("Error updating role:", err);
      setError(
        err.response?.data?.message || "An error occurred while updating the role"
      );
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Edit Role</h1>
        <Button variant="outline" onClick={() => navigate("/roles")}>
          Back to Roles
        </Button>
      </div>

      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}

      <Card>
        {isLoadingRole ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
          </div>
        ) : (
          <div className="p-6">
            {role ? (
              <RoleForm
                initialData={{
                  name: role.name,
                  description: role.description || "",
                  permissions: role.permissions ? JSON.parse(role.permissions) : {},
                  dashboardType: role.dashboardType || DashboardType.EMPLOYEE,
                }}
                onSubmit={handleSubmit}
                loading={loading}
                isEditing={true}
              />
            ) : (
              <div className="text-center py-8 text-gray-500">Role not found</div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default EditRolePage;