import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  getAllApproverTypes,
  deleteApproverType,
  toggleApproverTypeStatus,
  ApproverType,
} from "../../services/approverTypeService";
import { useAuth } from "../../context/AuthContext";
import Alert from "../../components/ui/Alert";

interface ApproverTypesPageProps {
  isTabContent?: boolean;
}

export default function ApproverTypesPage({ isTabContent = false }: ApproverTypesPageProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [approverTypeToDelete, setApproverTypeToDelete] = useState<string | null>(null);
  const [approverTypeToToggle, setApproverTypeToToggle] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const { user } = useAuth();
  const isSuperAdmin = user?.role === 'super_admin';
  const queryClient = useQueryClient();

  const {
    data: approverTypes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["approverTypes"],
    queryFn: () => getAllApproverTypes(),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteApproverType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["approverTypes"] });
      setIsDeleteModalOpen(false);
      setApproverTypeToDelete(null);
      setSuccessMessage("Approver type deleted successfully");
    },
    onError: (error: any) => {
      setErrorMessage(error.response?.data?.message || "Failed to delete approver type");
    }
  });
  
  const toggleStatusMutation = useMutation({
    mutationFn: (id: string) => {
      setApproverTypeToToggle(id);
      return toggleApproverTypeStatus(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["approverTypes"] });
      setSuccessMessage("Approver type status updated successfully");
      setApproverTypeToToggle(null);
    },
    onError: (error: any) => {
      console.error("Error toggling approver type status:", error);
      setErrorMessage(error.response?.data?.message || "Failed to update approver type status");
      setApproverTypeToToggle(null);
    }
  });

  const handleDeleteClick = (id: string) => {
    setApproverTypeToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (approverTypeToDelete) {
      deleteMutation.mutate(approverTypeToDelete);
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
    return <div className="text-red-500">Error loading approver types</div>;

  return (
    <div className={isTabContent ? "" : "container mx-auto px-4 py-8"}>
      <div className="flex justify-between items-center mb-6">
        {!isTabContent && <h1 className="text-2xl font-bold">Approver Types</h1>}
        <div className={`flex space-x-2 ${isTabContent ? "ml-auto" : ""}`}>
          {/* Only super admins or admins can create new approver types */}
          {(isSuperAdmin || user?.role === 'admin') && (
            <Link
              to="/approver-types/create"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Create New Approver Type
            </Link>
          )}
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
        <h2 className="text-lg font-medium text-blue-800 mb-2">About Approver Types</h2>
        <p className="text-blue-700">
          Approver types define the different roles that can approve leave requests.
          These types are used in approval workflows to specify who should approve a request at each level.
        </p>
      </div>

      {approverTypes.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-gray-600">No approver types found.</p>
          <Link
            to="/approver-types/create"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Create your first approver type
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Code</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Created At</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {approverTypes.map((approverType: ApproverType) => (
                <tr
                  key={approverType.id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{approverType.name}</td>
                  <td className="py-3 px-4">{approverType.description || "-"}</td>
                  <td className="py-3 px-4">{approverType.code}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      approverType.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {approverType.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {new Date(approverType.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    {/* Only super admins or admins can edit approver types */}
                    {(isSuperAdmin || user?.role === 'admin') && (
                      <>
                        <Link
                          to={`/approver-types/edit/${approverType.id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleToggleStatus(approverType.id)}
                          className={`${
                            approverType.isActive 
                              ? 'text-orange-600 hover:text-orange-800' 
                              : 'text-green-600 hover:text-green-800'
                          }`}
                          disabled={toggleStatusMutation.isPending && approverTypeToToggle === approverType.id}
                        >
                          {(toggleStatusMutation.isPending && approverTypeToToggle === approverType.id)
                            ? 'Updating...' 
                            : (approverType.isActive ? 'Deactivate' : 'Activate')}
                        </button>
                        <button
                          onClick={() => handleDeleteClick(approverType.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </>
                    )}
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
              Are you sure you want to delete this approver type? This
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