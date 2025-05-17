import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getWorkflowCategoryById,
  updateWorkflowCategory,
} from "../../services/workflowCategoryService";

type FormValues = {
  name: string;
  description: string;
  minDays: number;
  maxDays: number;
  maxSteps: number;
  isActive: boolean;
};

export default function EditWorkflowCategoryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      minDays: 0.5,
      maxDays: 2,
      maxSteps: 2,
      isActive: true,
    },
  });

  const { data: category, isLoading } = useQuery({
    queryKey: ["workflowCategory", id],
    queryFn: () => getWorkflowCategoryById(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        description: category.description || "",
        minDays: category.minDays,
        maxDays: category.maxDays,
        maxSteps: category.maxSteps || 3,
        isActive: category.isActive,
      });
    }
  }, [category, reset]);

  const updateMutation = useMutation({
    mutationFn: (data: FormValues) => updateWorkflowCategory(id!, data),
    onSuccess: () => {
      navigate("/workflow-categories");
    },
    onError: (err: any) => {
      setError(
        err.response?.data?.message || "Failed to update workflow category"
      );
    },
  });

  const onSubmit = (data: FormValues) => {
    updateMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  if (!category && !isLoading) {
    return (
      <div className="text-red-500">Workflow category not found</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Workflow Category</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-6"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category Name *
          </label>
          <input
            {...register("name", { required: "Category name is required" })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            {...register("description")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Minimum Days *
            </label>
            <input
              {...register("minDays", { 
                required: "Minimum days is required",
                valueAsNumber: true
              })}
              type="number"
              step="0.5"
              min="0.5"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.minDays && (
              <p className="text-red-500 text-xs italic">{errors.minDays.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Maximum Days *
            </label>
            <input
              {...register("maxDays", { 
                required: "Maximum days is required",
                valueAsNumber: true,
                min: 0.5
              })}
              type="number"
              step="0.5"
              min="0.5"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.maxDays && (
              <p className="text-red-500 text-xs italic">{errors.maxDays.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Maximum Approval Steps *
            </label>
            <input
              {...register("maxSteps", { 
                required: "Maximum steps is required",
                valueAsNumber: true,
                min: 0,
                max: 10
              })}
              type="number"
              min="0"
              max="10"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.maxSteps && (
              <p className="text-red-500 text-xs italic">{errors.maxSteps.message}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              Set the maximum number of approval steps allowed for workflows in this category. 
              Use 0 for no approvals, 1 for single-step approval, or 2+ for multi-step approval processes.
            </p>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register("isActive")}
              className="mr-2 h-5 w-5"
            />
            <span className="text-gray-700">
              Active Category
            </span>
          </label>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/workflow-categories")}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? "Updating..." : "Update Category"}
          </button>
        </div>
      </form>
    </div>
  );
}