import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import RoleForm, { DashboardType } from "../../components/forms/RoleForm";

const CreateRolePage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: {
    name: string;
    description: string;
    permissions: any;
    dashboardType: DashboardType;
  }) => {
    setLoading(true);
    setError(null);

    try {
      await axios.post(
        `${config.apiUrl}/roles`,
        {
          name: formData.name,
          description: formData.description,
          permissions: formData.permissions,
          dashboardType: formData.dashboardType,
          isActive: true,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Redirect to roles list page
      navigate("/roles", { state: { success: "Role created successfully" } });
    } catch (err: any) {
      console.error("Error creating role:", err);
      setError(
        err.response?.data?.message || "An error occurred while creating the role"
      );
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Create New Role</h1>
        <Button variant="outline" onClick={() => navigate("/roles")}>
          Back to Roles
        </Button>
      </div>

      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}

      <Card>
        <div className="p-6">
          <RoleForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </Card>
    </div>
  );
};

export default CreateRolePage;