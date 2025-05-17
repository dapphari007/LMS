import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getApproverTypeById,
  updateApproverType,
} from "../../services/approverTypeService";

type FormValues = {
  name: string;
  description: string;
  code: string;
  isActive: boolean;
};

export default function EditApproverTypePage() {
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
      code: "",
      isActive: true,
    },
  });

  const { data: approverType, isLoading } = useQuery({
    queryKey: ["approverType", id],
    queryFn: () => getApproverTypeById(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (approverType) {
      reset({
        name: approverType.name,
        description: approverType.description || "",
        code: approverType.code,
        isActive: approverType.isActive,
      });
    }
  }, [approverType, reset]);

  const updateMutation = useMutation({
    mutationFn: (data: FormValues) => updateApproverType(id!, data),
    onSuccess: () => {
      navigate("/approver-types");
    },
    onError: (err: any) => {
      setError(
        err.response?.data?.message || "Failed to update approver type"
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

  if (!approverType && !isLoading) {
    return (
      <div className="text-red-500">Approver type not found</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Approver Type</h1>

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
            Approver Type Name *
          </label>
          <input
            {...register("name", { required: "Approver type name is required" })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Code *
          </label>
          <input
            {...register("code", { required: "Code is required" })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
          />
          {errors.code && (
            <p className="text-red-500 text-xs italic">{errors.code.message}</p>
          )}
          <p className="text-gray-500 text-xs mt-1">
            Code should be lowercase with underscores (e.g., team_lead)
          </p>
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
        
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register("isActive")}
              className="mr-2 h-5 w-5"
            />
            <span className="text-gray-700">
              Active Approver Type
            </span>
          </label>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/approver-types")}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? "Updating..." : "Update Approver Type"}
          </button>
        </div>
      </form>
    </div>
  );
}