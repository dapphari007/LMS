import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getAllApproverTypes, 
  ApproverType 
} from "../../services/approverTypeService";
import {
  getAllWorkflowLevels,
  createWorkflowLevel,
  updateWorkflowLevel,
  deleteWorkflowLevel,
  resetWorkflowLevelsToDefault,
  WorkflowLevel
} from "../../services/workflowLevelService";
import { UserRole } from "../../types/index";
import Alert from "../ui/Alert";

interface WorkflowLevelsConfigProps {
  isTabContent?: boolean;
}

export default function WorkflowLevelsConfig({ isTabContent = false }: WorkflowLevelsConfigProps) {
  const [editingLevel, setEditingLevel] = useState<WorkflowLevel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [levelToDelete, setLevelToDelete] = useState<string | null>(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const queryClient = useQueryClient();

  // Fetch workflow levels
  const { 
    data: levels = [], 
    isLoading,
    error 
  } = useQuery({
    queryKey: ["workflowLevels"],
    queryFn: () => getAllWorkflowLevels(),
  });

  // Fetch approver types
  const { data: approverTypes = [] } = useQuery({
    queryKey: ["approverTypes"],
    queryFn: () => getAllApproverTypes({ isActive: true }),
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: createWorkflowLevel,
    onSuccess: () => {
      setSuccessMessage("Workflow level created successfully");
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["workflowLevels"] });
    },
    onError: (error: any) => {
      setErrorMessage(error.response?.data?.message || "Failed to create workflow level");
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, level }: { id: string; level: Partial<WorkflowLevel> }) => 
      updateWorkflowLevel(id, level),
    onSuccess: () => {
      setSuccessMessage("Workflow level updated successfully");
      setIsModalOpen(false);
      setEditingLevel(null);
      queryClient.invalidateQueries({ queryKey: ["workflowLevels"] });
    },
    onError: (error: any) => {
      setErrorMessage(error.response?.data?.message || "Failed to update workflow level");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteWorkflowLevel,
    onSuccess: () => {
      setSuccessMessage("Workflow level deleted successfully");
      setIsDeleteModalOpen(false);
      setLevelToDelete(null);
      queryClient.invalidateQueries({ queryKey: ["workflowLevels"] });
    },
    onError: (error: any) => {
      setErrorMessage(error.response?.data?.message || "Failed to delete workflow level");
    }
  });
  
  const resetMutation = useMutation({
    mutationFn: resetWorkflowLevelsToDefault,
    onSuccess: () => {
      setSuccessMessage("Workflow levels have been reset to default successfully");
      setIsResetModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["workflowLevels"] });
    },
    onError: (error: any) => {
      setErrorMessage(error.response?.data?.message || "Failed to reset workflow levels");
    }
  });

  const handleCreateLevel = () => {
    setEditingLevel(null);
    setIsModalOpen(true);
  };

  const handleEditLevel = (level: WorkflowLevel) => {
    setEditingLevel(level);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setLevelToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (levelToDelete) {
      deleteMutation.mutate(levelToDelete);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const level = Number(formData.get("level"));
    const approverType = formData.get("approverType") as string;
    const fallbackRoles = Array.from(
      formData.getAll("fallbackRoles")
    ) as UserRole[];
    const isActive = formData.get("isActive") === "on";

    if (editingLevel) {
      updateMutation.mutate({
        id: editingLevel.id,
        level: { level, approverType, fallbackRoles, isActive }
      });
    } else {
      createMutation.mutate({ level, approverType, fallbackRoles, isActive } as WorkflowLevel);
    }
  };

  // Sort levels by level number
  const sortedLevels = [...levels].sort((a, b) => a.level - b.level);

  const handleResetLevels = () => {
    setIsResetModalOpen(true);
  };

  const confirmReset = () => {
    resetMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error loading workflow levels</div>;
  }

  return (
    <div className={isTabContent ? "" : "container mx-auto px-4 py-8"}>
      <div className="flex justify-between items-center mb-6">
        {!isTabContent && <h1 className="text-2xl font-bold">Workflow Approval Levels</h1>}
        <div className={`flex space-x-2 ${isTabContent ? "ml-auto" : ""}`}>
          <button
            onClick={handleResetLevels}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
            disabled={resetMutation.isPending}
          >
            {resetMutation.isPending ? "Resetting..." : "Reset to Default"}
          </button>
          <button
            onClick={handleCreateLevel}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Add New Level
          </button>
        </div>
      </div>

      {successMessage && (
        <Alert
          variant="success"
          message={successMessage}
          onClose={() => setSuccessMessage(null)}
          className="mb-6"
        />
      )}

      {errorMessage && (
        <Alert
          variant="error"
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
          className="mb-6"
        />
      )}

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-md mb-6">
        <h2 className="text-lg font-medium text-blue-800 mb-2">About Workflow Approval Levels</h2>
        <p className="text-blue-700">
          Workflow approval levels define the hierarchy of approvers in the system. Each level corresponds to a specific
          approver type (e.g., Team Lead, Manager, HR) and has fallback roles that can approve if the primary approver is not available.
        </p>
        <p className="text-blue-700 mt-2">
          The level number (1, 2, 3, 4) determines the order of approvals in workflows. Team Leads are automatically assigned to level 1 by default.
        </p>
      </div>

      {sortedLevels.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-gray-600">No workflow levels configured.</p>
          <button
            onClick={handleCreateLevel}
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Create your first workflow level
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left">Level</th>
                <th className="py-3 px-4 text-left">Approver Type</th>
                <th className="py-3 px-4 text-left">Fallback Roles</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedLevels.map((level) => (
                <tr
                  key={level.id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{level.level}</td>
                  <td className="py-3 px-4">
                    {level.approverType === "teamLead" && "Team Lead"}
                    {level.approverType === "manager" && "Manager"}
                    {level.approverType === "hr" && "HR"}
                    {level.approverType === "superAdmin" && "Super Admin"}
                    {level.approverType === "departmentHead" && "Department Head"}
                  </td>
                  <td className="py-3 px-4">
                    {level.fallbackRoles.map((role, index) => (
                      <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        {role === UserRole.TEAM_LEAD && "Team Lead"}
                        {role === UserRole.MANAGER && "Manager"}
                        {role === UserRole.HR && "HR"}
                        {role === UserRole.SUPER_ADMIN && "Super Admin"}
                        {role === UserRole.EMPLOYEE && "Employee"}
                      </span>
                    ))}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        level.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {level.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      onClick={() => handleEditLevel(level)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(level.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">
              {editingLevel ? "Edit Workflow Level" : "Create Workflow Level"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Level Number *
                </label>
                <input
                  name="level"
                  type="number"
                  min="1"
                  max="10"
                  required
                  defaultValue={editingLevel?.level || ""}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Approver Type *
                </label>
                <select
                  name="approverType"
                  required
                  defaultValue={editingLevel?.approverType || ""}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Approver Type</option>
                  <option value="teamLead">Team Lead</option>
                  <option value="manager">Manager</option>
                  <option value="hr">HR</option>
                  <option value="superAdmin">Super Admin</option>
                  <option value="departmentHead">Department Head</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Fallback Roles *
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="fallbackRoles"
                      value={UserRole.TEAM_LEAD}
                      defaultChecked={editingLevel?.fallbackRoles.includes(UserRole.TEAM_LEAD)}
                      className="mr-2"
                    />
                    Team Lead
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="fallbackRoles"
                      value={UserRole.MANAGER}
                      defaultChecked={editingLevel?.fallbackRoles.includes(UserRole.MANAGER)}
                      className="mr-2"
                    />
                    Manager
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="fallbackRoles"
                      value={UserRole.HR}
                      defaultChecked={editingLevel?.fallbackRoles.includes(UserRole.HR)}
                      className="mr-2"
                    />
                    HR
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="fallbackRoles"
                      value={UserRole.SUPER_ADMIN}
                      defaultChecked={editingLevel?.fallbackRoles.includes(UserRole.SUPER_ADMIN)}
                      className="mr-2"
                    />
                    Super Admin
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    defaultChecked={editingLevel?.isActive !== false}
                    className="mr-2"
                  />
                  Active
                </label>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingLevel(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {createMutation.isPending || updateMutation.isPending
                    ? "Saving..."
                    : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete this workflow level? This action
              cannot be undone and may affect existing workflows.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {isResetModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Reset to Default</h3>
            <p className="mb-6">
              Are you sure you want to reset all workflow levels to default? This will delete any custom levels
              and may affect existing workflows. This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsResetModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmReset}
                className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                disabled={resetMutation.isPending}
              >
                {resetMutation.isPending ? "Resetting..." : "Reset"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}