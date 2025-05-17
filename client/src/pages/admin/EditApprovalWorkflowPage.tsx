import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getApprovalWorkflowById,
  updateApprovalWorkflow,
  ApprovalWorkflow,
} from "../../services/approvalWorkflowService";
import { getAllUsers } from "../../services/userService";

type FormValues = {
  name: string;
  description: string;
  minDays: number;
  maxDays: number;
  isActive: boolean;
  steps: {
    id?: string;
    order: number;
    approverType: "team_lead" | "manager" | "hr" | "department_head" | "specific_user";
    approverId?: string;
    required: boolean;
  }[];
};

export default function EditApprovalWorkflowPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const { data: workflow, isLoading: isLoadingWorkflow } = useQuery({
    queryKey: ["approvalWorkflow", id],
    queryFn: () => getApprovalWorkflowById(id as string),
    enabled: !!id,
  });

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      minDays: 0.5,
      maxDays: 2,
      isActive: true,
      steps: [],
    },
  });

  useEffect(() => {
    if (workflow) {
      console.log("Original workflow data:", workflow);
      
      // Convert approvalLevels from backend to steps format for the form
      const steps = workflow.approvalLevels?.map((level) => {
        console.log("Processing approval level:", level);
        
        // Determine approver type and approverId based on roles
        let approverType: "team_lead" | "manager" | "hr" | "department_head" | "specific_user" = "team_lead";
        let approverId: string | undefined = undefined;
        
        // First check if there's an approverType field directly in the level
        if (level.approverType) {
          console.log("Found approverType in level:", level.approverType);
          
          // Map backend approverType to frontend approverType
          if (level.approverType === "teamLead") {
            approverType = "team_lead";
          } else if (level.approverType === "manager") {
            approverType = "manager";
          } else if (level.approverType === "hr") {
            approverType = "hr";
          } else if (level.approverType === "departmentHead") {
            approverType = "department_head";
          } else if (level.approverType === "specificUser") {
            approverType = "specific_user";
            // In this case, the first role should be the user ID
            if (Array.isArray(level.roles) && level.roles.length > 0) {
              approverId = level.roles[0];
            }
          }
        } else {
          // Fallback to checking roles if no approverType is specified
          const role = Array.isArray(level.roles) && level.roles.length > 0 ? level.roles[0] : "";
          console.log("Role value:", role);
          
          if (role === "TEAM_LEAD" || role === "team_lead") {
            approverType = "team_lead";
          } else if (role === "MANAGER" || role === "manager") {
            approverType = "manager";
          } else if (role === "HR" || role === "hr") {
            approverType = "hr";
          } else if (role === "DEPARTMENT_HEAD" || role === "department_head") {
            approverType = "department_head";
          } else if (role && role !== "SUPER_ADMIN" && role !== "EMPLOYEE") {
            // If it's not a standard role, assume it's a user ID
            approverType = "specific_user";
            approverId = role;
          }
        }
        
        const step = {
          id: `step-${level.level}`,
          order: level.level,
          approverType,
          approverId,
          required: level.required !== undefined ? level.required : true, // Use level.required if available, otherwise default to true
        };
        
        console.log("Created step:", step);
        return step;
      }) || [];
      
      console.log("Converted steps:", steps);
      
      reset({
        name: workflow.name,
        description: workflow.description || "",
        minDays: workflow.minDays,
        maxDays: workflow.maxDays,
        isActive: workflow.isActive,
        steps: steps,
      });
    }
  }, [workflow, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps",
  });

  const watchSteps = watch("steps");

  const updateMutation = useMutation({
    mutationFn: (data: Partial<ApprovalWorkflow>) =>
      updateApprovalWorkflow(id as string, data),
    onSuccess: () => {
      navigate("/approval-workflows");
    },
    onError: (err: any) => {
      setError(
        err.response?.data?.message || "Failed to update approval workflow"
      );
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form data submitted:", data);
    
    // Ensure steps are properly ordered
    const formattedSteps = data.steps.map((step, index) => ({
      ...step,
      order: index + 1,
    }));

    console.log("Formatted steps:", formattedSteps);

    // Convert steps to approvalLevels format expected by the server
    const approvalLevels = formattedSteps.map((step, index) => {
      // Determine the role value based on approverType
      let roleValue: string;
      let backendApproverType: string;
      
      if (step.approverType === "specific_user" && step.approverId) {
        roleValue = step.approverId;
        backendApproverType = "specificUser";
      } else if (step.approverType === "team_lead") {
        roleValue = "TEAM_LEAD";
        backendApproverType = "teamLead";
      } else if (step.approverType === "manager") {
        roleValue = "MANAGER";
        backendApproverType = "manager";
      } else if (step.approverType === "hr") {
        roleValue = "HR";
        backendApproverType = "hr";
      } else if (step.approverType === "department_head") {
        roleValue = "MANAGER"; // Department head is typically a manager role
        backendApproverType = "departmentHead";
      } else {
        roleValue = step.approverType.toUpperCase();
        backendApproverType = step.approverType;
      }
      
      const approvalLevel = {
        level: index + 1,
        roles: [roleValue],
        departmentSpecific: step.approverType !== "specific_user", // Set department-specific for role-based approvers
        approverType: backendApproverType,
        fallbackRoles: [roleValue], // Add fallback roles matching the primary role
        required: step.required
      };
      
      console.log("Created approval level:", approvalLevel);
      return approvalLevel;
    });

    console.log("Final approval levels:", approvalLevels);

    updateMutation.mutate({
      name: data.name,
      description: data.description,
      minDays: data.minDays,
      maxDays: data.maxDays,
      approvalLevels: approvalLevels,
      isActive: data.isActive
    });
  };

  const addStep = () => {
    append({
      order: fields.length + 1,
      approverType: "team_lead",
      required: true,
    });
  };

  if (isLoadingWorkflow) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading workflow data...
      </div>
    );
  }

  if (!workflow && !isLoadingWorkflow) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Workflow not found or you don't have permission to view it.
        </div>
        <button
          onClick={() => navigate("/approval-workflows")}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Back to Workflows
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Approval Workflow</h1>

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
            Workflow Name *
          </label>
          <input
            {...register("name", { required: "Workflow name is required" })}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
        </div>
        
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register("isActive")}
              className="mr-2 h-5 w-5"
            />
            <span className="text-gray-700">
              Active Workflow (when inactive, this workflow won't be used for leave approvals)
            </span>
          </label>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Approval Steps</h3>
            <button
              type="button"
              onClick={addStep}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
            >
              Add Step
            </button>
          </div>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border rounded-lg p-4 mb-4 bg-gray-50"
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">Step {index + 1}</h4>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Approver Type *
                  </label>
                  <select
                    {...register(`steps.${index}.approverType`, {
                      required: true,
                    })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="team_lead">Team Lead (L-1)</option>
                    <option value="manager">Direct Manager</option>
                    <option value="hr">HR Department</option>
                    <option value="department_head">Department Head</option>
                    <option value="specific_user">Specific User</option>
                  </select>
                </div>

                {watchSteps[index]?.approverType === "specific_user" && (
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Select User *
                    </label>
                    <select
                      {...register(`steps.${index}.approverId`, {
                        required:
                          watchSteps[index]?.approverType === "specific_user",
                      })}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Select a user</option>
                      {users.map((user: any) => (
                        <option key={user.id} value={user.id}>
                          {user.firstName} {user.lastName} ({user.email})
                        </option>
                      ))}
                    </select>
                    {errors.steps?.[index]?.approverId && (
                      <p className="text-red-500 text-xs italic">
                        User is required
                      </p>
                    )}
                  </div>
                )}

                <div className="md:col-span-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register(`steps.${index}.required`)}
                      className="mr-2"
                    />
                    <span className="text-gray-700 text-sm">
                      Required Approval (cannot be skipped)
                    </span>
                  </label>
                </div>
              </div>
            </div>
          ))}

          {fields.length === 0 && (
            <div className="text-center py-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No approval steps added yet.</p>
              <button
                type="button"
                onClick={addStep}
                className="mt-2 text-blue-600 hover:underline"
              >
                Add your first step
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/approval-workflows")}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
