import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getLeaveTypes,
  updateLeaveType,
} from "../../services/leaveTypeService";
import { LeaveType } from "../../types";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Checkbox from "../../components/ui/Checkbox";
import { getErrorMessage } from "../../utils/errorUtils";
import { useAuth } from "../../context/AuthContext";

const LeaveTypeConfigPage: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedLeaveType, setSelectedLeaveType] = useState<string | null>(
    null
  );
  const [formData, setFormData] = useState<Partial<LeaveType>>({});

  // Check if user is super admin
  const isSuperAdmin = user?.role === "super_admin";

  // Fetch leave types
  const { data, isLoading, error: queryError } = useQuery({
    queryKey: ["leaveTypes"],
    queryFn: () => getLeaveTypes({}),
  });
  
  // Handle query error
  useEffect(() => {
    if (queryError) {
      setError(getErrorMessage(queryError));
    }
  }, [queryError]);

  // Update leave type mutation
  const updateMutation = useMutation({
    mutationFn: (data: { id: string; leaveTypeData: Partial<LeaveType> }) =>
      updateLeaveType(data.id, data.leaveTypeData),
  });

  // Handle mutation success and error
  useEffect(() => {
    if (updateMutation.isSuccess) {
      setSuccessMessage("Leave type configuration updated successfully");
      queryClient.invalidateQueries({ queryKey: ["leaveTypes"] });
    }
    if (updateMutation.error) {
      setError(getErrorMessage(updateMutation.error));
    }
  }, [updateMutation.isSuccess, updateMutation.error, queryClient]);

  // Handle leave type selection
  useEffect(() => {
    if (selectedLeaveType && data?.leaveTypes) {
      const leaveType = data.leaveTypes.find(
        (lt: LeaveType) => lt.id === selectedLeaveType
      );
      if (leaveType) {
        setFormData({
          name: leaveType.name,
          description: leaveType.description,
          defaultDays: leaveType.defaultDays,
          isCarryForward: leaveType.isCarryForward,
          maxCarryForwardDays: leaveType.maxCarryForwardDays,
          isHalfDayAllowed: leaveType.isHalfDayAllowed,
          isPaidLeave: leaveType.isPaidLeave,
          applicableGender: leaveType.applicableGender,
          isActive: leaveType.isActive,
        });
      }
    } else {
      setFormData({});
    }
  }, [selectedLeaveType, data]);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedLeaveType) {
      setError("Please select a leave type to configure");
      return;
    }

    updateMutation.mutate({
      id: selectedLeaveType,
      leaveTypeData: formData,
    });
  };

  if (!isSuperAdmin) {
    return (
      <div className="p-6">
        <Alert
          variant="error"
          message="You do not have permission to access this page. Only Super Admins can configure leave types."
          className="mb-6"
        />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Leave Type Configuration
      </h1>

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
        <div className="mb-6">
          <Select
            id="leaveTypeSelect"
            label="Select Leave Type to Configure"
            placeholder={
              isLoading ? "Loading leave types..." : "Select a leave type"
            }
            options={
              data?.leaveTypes?.map((lt: LeaveType) => ({
                value: lt.id,
                label: lt.name,
              })) || []
            }
            value={selectedLeaveType || ""}
            onChange={(e) => setSelectedLeaveType(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {selectedLeaveType && (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                id="name"
                name="name"
                label="Leave Type Name"
                value={formData.name || ""}
                onChange={handleInputChange}
                required
              />

              <Input
                id="defaultDays"
                name="defaultDays"
                label="Default Days"
                type="number"
                min="0"
                value={formData.defaultDays?.toString() || "0"}
                onChange={handleInputChange}
                required
              />

              <div className="flex items-center space-x-4">
                <Checkbox
                  id="isCarryForward"
                  name="isCarryForward"
                  label="Allow Carry Forward"
                  checked={formData.isCarryForward || false}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isCarryForward: e.target.checked,
                    }))
                  }
                />
              </div>

              {formData.isCarryForward && (
                <Input
                  id="maxCarryForwardDays"
                  name="maxCarryForwardDays"
                  label="Max Carry Forward Days"
                  type="number"
                  min="0"
                  value={formData.maxCarryForwardDays?.toString() || "0"}
                  onChange={handleInputChange}
                />
              )}

              <div className="flex items-center space-x-4">
                <Checkbox
                  id="isHalfDayAllowed"
                  name="isHalfDayAllowed"
                  label="Allow Half Day"
                  checked={formData.isHalfDayAllowed || false}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isHalfDayAllowed: e.target.checked,
                    }))
                  }
                />
              </div>

              <div className="flex items-center space-x-4">
                <Checkbox
                  id="isPaidLeave"
                  name="isPaidLeave"
                  label="Paid Leave"
                  checked={formData.isPaidLeave || false}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isPaidLeave: e.target.checked,
                    }))
                  }
                />
              </div>

              <Select
                id="applicableGender"
                name="applicableGender"
                label="Applicable Gender"
                value={formData.applicableGender || ""}
                options={[
                  { value: "", label: "All Genders" },
                  { value: "male", label: "Male Only" },
                  { value: "female", label: "Female Only" },
                ]}
                onChange={handleInputChange}
              />

              <div className="flex items-center space-x-4">
                <Checkbox
                  id="isActive"
                  name="isActive"
                  label="Active"
                  checked={formData.isActive || false}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isActive: e.target.checked,
                    }))
                  }
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="form-input w-full"
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                type="submit"
                isLoading={updateMutation.isPending}
                disabled={updateMutation.isPending}
              >
                Save Configuration
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};

export default LeaveTypeConfigPage;
