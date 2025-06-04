import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createApprovalWorkflow } from "../../services/approvalWorkflowService";

import { getAllWorkflowCategories, WorkflowCategory } from "../../services/workflowCategoryService";
import { getAllDepartments, Department } from "../../services/departmentService";
import { getActiveRoles, Role } from "../../services/roleService";

type FormValues = {
  name: string;
  description: string;
  categoryId: string;
  departmentId: string;
  roleId: string;
  minDays: number;
  maxDays: number;
  isActive: boolean;
  steps: {
    order: number;
    roleIds: string[];         // Role IDs for this approval step
    departmentSpecific: boolean; // Whether approval is department-specific
    required: boolean;         // Whether this step is required
  }[];
};

export default function CreateApprovalWorkflowPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<React.ReactNode | null>(null);
  const [useCustomDays, setUseCustomDays] = useState(false);



  const { data: categories = [] } = useQuery({
    queryKey: ["workflowCategories"],
    queryFn: () => getAllWorkflowCategories({ isActive: true }),
  });



  const { data: roles = [] } = useQuery({
    queryKey: ["roles"],
    queryFn: () => getActiveRoles(),
  });
  
  const { data: departments = [] } = useQuery({
    queryKey: ["departments"],
    queryFn: () => getAllDepartments({ isActive: true }),
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      departmentId: "",
      roleId: "",
      minDays: 0.5,
      maxDays: 2,
      isActive: true,
      steps: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps",
  });

  const watchCategoryId = watch("categoryId");

  // Update min/max days when category changes
  // Add a default step when the component mounts
  useEffect(() => {
    if (fields.length === 0) {
      addStep();
    }
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (watchCategoryId) {
      const selectedCategory = categories.find((cat: WorkflowCategory) => cat.id === watchCategoryId);
      if (selectedCategory) {
        // Update min/max days if not using custom days
        if (!useCustomDays) {
          setValue("minDays", selectedCategory.minDays);
          setValue("maxDays", selectedCategory.maxDays);
        }
        
        // Check if current steps exceed the maximum allowed
        if (selectedCategory.maxSteps === 0) {
          setError(`This category does not allow any approval steps. Please select a different category.`);
          // Remove all steps if the category doesn't allow any
          while (fields.length > 0) {
            remove(fields.length - 1);
          }
        } else if (fields.length > selectedCategory.maxSteps) {
          setError(
            <div>
              <p>This category allows a maximum of {selectedCategory.maxSteps} approval steps. You currently have {fields.length} steps.</p>
              <button 
                type="button"
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                onClick={() => {
                  // Remove excess steps from the end
                  while (fields.length > selectedCategory.maxSteps) {
                    remove(fields.length - 1);
                  }
                  setError(null);
                }}
              >
                Remove Excess Steps
              </button>
            </div>
          );
        } else {
          setError(null);
        }
      }
    }
  }, [watchCategoryId, categories, setValue, useCustomDays, fields.length, remove]);

  const createMutation = useMutation({
    mutationFn: createApprovalWorkflow,
    onSuccess: () => {
      navigate("/approval-management");
    },
    onError: (err: any) => {
      setError(
        err.response?.data?.message || "Failed to create approval workflow"
      );
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form data submitted:", data);
    
    // Check if we've exceeded the maximum steps for the selected category
    if (data.categoryId) {
      const selectedCategory = categories.find((cat: WorkflowCategory) => cat.id === data.categoryId);
      if (selectedCategory) {
        if (selectedCategory.maxSteps === 0) {
          setError(`This category does not allow any approval steps. Please select a different category.`);
          return;
        } else if (data.steps.length > selectedCategory.maxSteps) {
          setError(
            <div>
              <p>This category allows a maximum of {selectedCategory.maxSteps} approval steps. You currently have {data.steps.length} steps.</p>
              <button 
                type="button"
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                onClick={() => {
                  // Remove excess steps from the end
                  while (fields.length > selectedCategory.maxSteps) {
                    remove(fields.length - 1);
                  }
                  setError(null);
                }}
              >
                Remove Excess Steps
              </button>
            </div>
          );
          return;
        }
      }
    }
    
    // Ensure steps are properly ordered
    const formattedSteps = data.steps.map((step, index) => ({
      ...step,
      order: index + 1,
    }));

    console.log("Formatted steps:", formattedSteps);

    // Convert steps to approvalLevels format expected by the server
    const approvalLevels = formattedSteps.map((step, index) => ({
      level: index + 1,
      roles: step.roleIds.filter(id => id), // Remove empty role IDs
      departmentSpecific: step.departmentSpecific || false,
      required: step.required || false,
    }));

    console.log("Final approval levels:", approvalLevels);

    createMutation.mutate({
      name: data.name,
      description: data.description,
      categoryId: data.categoryId || undefined,
      minDays: data.minDays,
      maxDays: data.maxDays,
      approvalLevels: approvalLevels,
      isActive: data.isActive
    });
  };

  const addStep = () => {
    // Check if we've reached the maximum number of steps for the selected category
    const selectedCategory = watchCategoryId ? categories.find((cat: WorkflowCategory) => cat.id === watchCategoryId) : null;
    const maxSteps = selectedCategory?.maxSteps ?? 10; // Default to 10 if no category selected
    
    // If maxSteps is 0, don't allow adding any steps
    if (maxSteps === 0) {
      setError(`This category does not allow any approval steps. Please select a different category.`);
      return;
    }
    
    if (fields.length >= maxSteps) {
      setError(`Maximum of ${maxSteps} steps allowed for this workflow category`);
      return;
    }
    
    // Get the next step order based on current steps
    const nextLevel = fields.length + 1;
    
    // Use default role if available
    const defaultRoleId = roles.length > 0 ? roles[0].id : "";
    
    append({
      order: nextLevel,
      roleIds: defaultRoleId ? [defaultRoleId] : [],
      departmentSpecific: false,
      required: true,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create Approval Workflow</h1>

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
              Workflow Category
            </label>
            <select
              {...register("categoryId")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a category (optional)</option>
              {categories.map((category: WorkflowCategory) => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.minDays} - {category.maxDays} days, max {category.maxSteps} steps)
                </option>
              ))}
            </select>
            <div className="mt-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={useCustomDays}
                  onChange={(e) => setUseCustomDays(e.target.checked)}
                  className="mr-2 h-5 w-5"
                />
                <span className="text-gray-700 text-sm">
                  Use custom day range (override category)
                </span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Department
            </label>
            <select
              {...register("departmentId")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a department (optional)</option>
              {departments.map((department: Department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Role
          </label>
          <select
            {...register("roleId")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a role (optional)</option>
            {roles.map((role: Role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-600 mt-1">
            Selecting a role will create a role-specific tab in the Approval Management page.
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 ${!useCustomDays && watchCategoryId ? 'opacity-50' : ''}`}>
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
              disabled={!useCustomDays && !!watchCategoryId}
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
              disabled={!useCustomDays && !!watchCategoryId}
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
            <div>
              <h3 className="text-lg font-semibold">Approval Steps</h3>
              {watchCategoryId && (
                <div className="mt-1">
                  {(() => {
                    const selectedCategory = categories.find((cat: WorkflowCategory) => cat.id === watchCategoryId);
                    if (selectedCategory) {
                      // Determine status color based on current vs max steps
                      const isOverLimit = fields.length > selectedCategory.maxSteps;
                      const isAtLimit = fields.length === selectedCategory.maxSteps;
                      const statusColor = 
                        selectedCategory.maxSteps === 0 ? 'bg-red-100 text-red-800' :
                        isOverLimit ? 'bg-red-100 text-red-800' :
                        isAtLimit ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800';
                      
                      return (
                        <div className={`text-sm px-2 py-1 rounded inline-block ${statusColor}`}>
                          {selectedCategory.maxSteps === 0 
                            ? `No approval steps allowed for ${selectedCategory.name}` 
                            : `${fields.length}/${selectedCategory.maxSteps} steps used for ${selectedCategory.name}`}
                          
                          {isOverLimit && (
                            <button 
                              type="button"
                              className="ml-2 bg-white text-red-800 px-2 py-0.5 rounded text-xs border border-red-300"
                              onClick={() => {
                                // Remove excess steps from the end
                                while (fields.length > selectedCategory.maxSteps) {
                                  remove(fields.length - 1);
                                }
                                setError(null);
                              }}
                            >
                              Auto-trim
                            </button>
                          )}
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={addStep}
              disabled={(() => {
                if (!watchCategoryId) return false;
                const selectedCategory = categories.find((cat: WorkflowCategory) => cat.id === watchCategoryId);
                return selectedCategory ? fields.length >= selectedCategory.maxSteps : false;
              })()}
              className={`px-3 py-1 rounded text-sm ${
                (() => {
                  if (!watchCategoryId) return "bg-green-600 hover:bg-green-700 text-white";
                  const selectedCategory = categories.find((cat: WorkflowCategory) => cat.id === watchCategoryId);
                  return (selectedCategory && fields.length >= selectedCategory.maxSteps) 
                    ? "bg-gray-400 text-white cursor-not-allowed" 
                    : "bg-green-600 hover:bg-green-700 text-white";
                })()
              }`}
            >
              {(() => {
                if (!watchCategoryId) return "Add Step";
                const selectedCategory = categories.find((cat: WorkflowCategory) => cat.id === watchCategoryId);
                return (selectedCategory && fields.length >= selectedCategory.maxSteps) 
                  ? "Max Steps Reached" 
                  : "Add Step";
              })()}
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
                    Approver Roles *
                  </label>
                  <select
                    {...register(`steps.${index}.roleIds.0`, {
                      required: true,
                    })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select a role</option>
                    {roles.map((role: Role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register(`steps.${index}.departmentSpecific`)}
                      className="mr-2 h-5 w-5"
                    />
                    <span className="text-gray-700 text-sm">
                      Department Specific (only approvers from the same department)
                    </span>
                  </label>
                </div>

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
            onClick={() => navigate("/approval-management")}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? "Creating..." : "Create Workflow"}
          </button>
        </div>
      </form>
    </div>
  );
}
