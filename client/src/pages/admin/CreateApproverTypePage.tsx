import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createApproverType } from "../../services/approverTypeService";

type FormValues = {
  name: string;
  description: string;
  code: string;
  isActive: boolean;
};

export default function CreateApproverTypePage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      code: "",
      isActive: true,
    },
  });

  const createMutation = useMutation({
    mutationFn: createApproverType,
    onSuccess: () => {
      navigate("/approver-types");
    },
    onError: (err: any) => {
      setError(
        err.response?.data?.message || "Failed to create approver type"
      );
    },
  });

  const onSubmit = (data: FormValues) => {
    createMutation.mutate({
      name: data.name,
      description: data.description,
      code: data.code,
      isActive: data.isActive,
    });
  };

  // Auto-generate code from name
  const watchName = watch("name");
  const generateCode = () => {
    if (!watchName) return "";
    return watchName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "_");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create Approver Type</h1>

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
          <div className="flex">
            <input
              {...register("code", { required: "Code is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="e.g., team_lead"
            />
            <button
              type="button"
              onClick={() => {
                const codeField = document.querySelector('input[name="code"]') as HTMLInputElement;
                if (codeField) {
                  codeField.value = generateCode();
                  // Trigger the onChange event
                  const event = new Event('input', { bubbles: true });
                  codeField.dispatchEvent(event);
                }
              }}
              className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Generate
            </button>
          </div>
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
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? "Creating..." : "Create Approver Type"}
          </button>
        </div>
      </form>
    </div>
  );
}