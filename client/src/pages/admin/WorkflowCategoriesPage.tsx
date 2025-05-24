import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  getAllWorkflowCategories,
  deleteWorkflowCategory,
  toggleWorkflowCategoryStatus,
  WorkflowCategory,
} from "../../services/workflowCategoryService";

import Alert from "../../components/ui/Alert";

interface WorkflowCategoriesPageProps {
  isTabContent?: boolean;
}

export default function WorkflowCategoriesPage({ isTabContent = false }: WorkflowCategoriesPageProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [categoryToToggle, setCategoryToToggle] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const queryClient = useQueryClient();

  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["workflowCategories"],
    queryFn: () => getAllWorkflowCategories(),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteWorkflowCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflowCategories"] });
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
      setSuccessMessage("Category deleted successfully");
    },
    onError: (error: any) => {
      setErrorMessage(error.response?.data?.message || "Failed to delete category");
    }
  });
  
  const toggleStatusMutation = useMutation({
    mutationFn: (id: string) => {
      setCategoryToToggle(id);
      return toggleWorkflowCategoryStatus(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflowCategories"] });
      setSuccessMessage("Category status updated successfully");
      setCategoryToToggle(null);
    },
    onError: (error: any) => {
      console.error("Error toggling category status:", error);
      setErrorMessage(error.response?.data?.message || "Failed to update category status");
      setCategoryToToggle(null);
    }
  });

  const handleDeleteClick = (id: string) => {
    setCategoryToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      deleteMutation.mutate(categoryToDelete);
    }
  };
  
  const handleToggleStatus = (id: string) => {
    toggleStatusMutation.mutate(id);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );

  if (error)
    return <div className="text-red-500">Error loading workflow categories</div>;

  return (
    <div className={isTabContent ? "" : "container mx-auto px-4 py-8"}>
      <div className="flex justify-between items-center mb-6">
        {!isTabContent && <h1 className="text-2xl font-bold">Workflow Categories</h1>}
        <div className={`flex space-x-2 ${isTabContent ? "ml-auto" : ""}`}>
          {!isTabContent && (
            <Link
              to="/approver-types"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Manage Approver Types
            </Link>
          )}
          <Link
            to="/workflow-categories/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Create New Category
          </Link>
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
        <h2 className="text-lg font-medium text-blue-800 mb-2">About Workflow Categories</h2>
        <p className="text-blue-700 mb-2">
          Workflow categories define the minimum and maximum days for leave requests.
          These categories can be assigned to approval workflows to automatically set the day range.
        </p>
        <p className="text-blue-700">
          <strong>Max Steps:</strong> This setting limits the number of approval steps that can be created for workflows in this category. 
          This helps maintain consistent approval processes across similar types of leave requests.
        </p>
      </div>

      {categories.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-gray-600">No workflow categories found.</p>
          <Link
            to="/workflow-categories/create"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Create your first category
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Min Days</th>
                <th className="py-3 px-4 text-left">Max Days</th>
                <th className="py-3 px-4 text-left">Max Approval Steps</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Created At</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category: WorkflowCategory) => (
                <tr
                  key={category.id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{category.name}</td>
                  <td className="py-3 px-4">{category.description || "-"}</td>
                  <td className="py-3 px-4">
                    {category.minDays === 0.5 ? '½' : category.minDays}
                  </td>
                  <td className="py-3 px-4">
                    {category.maxDays === 365 ? '∞' : category.maxDays}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium">{category.maxSteps || 3}</span>
                    {category.maxSteps === 0 && <span className="ml-1 text-xs text-red-600">(No steps allowed)</span>}
                    {category.maxSteps === 1 && <span className="ml-1 text-xs text-gray-600">(Single step)</span>}
                    {category.maxSteps > 1 && <span className="ml-1 text-xs text-gray-600">(Multi-step)</span>}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      category.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {category.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {new Date(category.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    <Link
                      to={`/workflow-categories/edit/${category.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleToggleStatus(category.id)}
                      className={`${
                        category.isActive 
                          ? 'text-orange-600 hover:text-orange-800' 
                          : 'text-green-600 hover:text-green-800'
                      }`}
                      disabled={toggleStatusMutation.isPending && categoryToToggle === category.id}
                    >
                      {(toggleStatusMutation.isPending && categoryToToggle === category.id)
                        ? 'Updating...' 
                        : (category.isActive ? 'Deactivate' : 'Activate')}
                    </button>
                    <button
                      onClick={() => handleDeleteClick(category.id)}
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

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete this workflow category? This
              action cannot be undone.
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
    </div>
  );
}