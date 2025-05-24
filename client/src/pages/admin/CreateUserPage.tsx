import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { createUser, getUsers } from "../../services/userService";
import { CreateUserData } from "../../services/userService";
import { getAllDepartments } from "../../services/departmentService";
import { getAllPositions } from "../../services/positionService";
import { useActiveRoles } from "../../hooks/useRoles";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { getErrorMessage } from "../../utils/errorUtils";
import { getRoleDisplayName } from "../../utils/roleUtils";

const CreateUserPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreateUserData>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch active roles
  const { data: roles, isLoading: isLoadingRoles } = useActiveRoles();
  
  const selectedRoleId = watch("roleId");
  // Find the selected role object
  const selectedRole = roles?.find(role => role.id === selectedRoleId);
  // Get the role name from the selected role
  const roleName = selectedRole?.name || "";

  // Fetch managers for the manager selection dropdown
  const { data: managersData, isLoading: isLoadingManagers } = useQuery({
    queryKey: ["managers"],
    queryFn: () => getUsers({ role: "manager" }),
    enabled: roleName === "employee" || roleName === "team_lead",
  });

  // Fetch HR representatives for the HR selection dropdown
  const { data: hrData, isLoading: isLoadingHR } = useQuery({
    queryKey: ["hr"],
    queryFn: () => getUsers({ role: "hr" }),
    enabled: roleName === "employee" || roleName === "team_lead",
  });

  // Fetch team leads for the team lead selection dropdown
  const { data: teamLeadData, isLoading: isLoadingTeamLeads } = useQuery({
    queryKey: ["teamLeads"],
    queryFn: () => getUsers({ role: "team_lead" }),
    enabled: roleName === "employee",
  });
  
  // Fetch departments for the department selection dropdown
  const { 
    data: departmentsData, 
    isLoading: isLoadingDepartments,
    error: departmentsError,
    refetch: refetchDepartments
  } = useQuery({
    queryKey: ["departments"],
    queryFn: () => getAllDepartments({ isActive: true }),
    enabled: true, // Explicitly enable this query to run on component mount
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 3, // Retry failed requests three times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000), // Exponential backoff
  });
  
  // Fetch positions for the position selection dropdown
  const { 
    data: positionsData, 
    isLoading: isLoadingPositions,
    error: positionsError,
    refetch: refetchPositions
  } = useQuery({
    queryKey: ["positions"],
    queryFn: () => getAllPositions({ isActive: true }),
    enabled: true, // Explicitly enable this query to run on component mount
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 3, // Retry failed requests three times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000), // Exponential backoff
  });

  // Effect to ensure data is loaded and handle errors
  useEffect(() => {
    // This effect will run once when the component mounts
    // Immediately trigger data fetching if not already loading
    if (!isLoadingDepartments && !departmentsData) {
      refetchDepartments();
    }
    
    if (!isLoadingPositions && !positionsData) {
      refetchPositions();
    }
    
    // Handle specific errors with detailed messages
    if (departmentsError) {
      console.error("Failed to load departments:", departmentsError);
      setError("Failed to load departments. Please try refreshing the page.");
    } else if (positionsError) {
      console.error("Failed to load positions:", positionsError);
      setError("Failed to load positions. Please try refreshing the page.");
    } else if (departmentsError && positionsError) {
      setError("Failed to load required data. Please refresh the page and try again.");
    }
  }, [
    departmentsError, positionsError, 
    departmentsData, positionsData,
    isLoadingDepartments, isLoadingPositions,
    refetchDepartments, refetchPositions
  ]);

  // Check if critical data is still loading
  const isDataLoading = isLoadingDepartments || isLoadingPositions;

  // Handle form submission
  const onSubmit = async (data: CreateUserData) => {
    // Prevent submission if departments or positions are still loading
    if (isDataLoading) {
      setError("Please wait for all data to load before submitting");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Convert empty strings to null for UUID fields
      const formattedData = { ...data };
      
      // Handle UUID fields that should be null instead of empty strings
      if (formattedData.managerId === "") formattedData.managerId = undefined;
      if (formattedData.hrId === "") formattedData.hrId = undefined;
      if (formattedData.teamLeadId === "") formattedData.teamLeadId = undefined;
      if (formattedData.department === "") formattedData.department = undefined;
      if (formattedData.position === "") formattedData.position = undefined;
      
      // Ensure roleId is properly set
      if (formattedData.roleId) {
        // If it's a custom role from the roles list, use the roleId
        const customRole = roles?.find(r => r.id === formattedData.roleId);
        if (customRole) {
          console.log("Found custom role:", customRole);
          // For custom roles, set the roleId
          formattedData.roleId = customRole.id;
          
          // For custom roles, we need to determine the appropriate legacy role value
          // based on the role name, or use a default if no match
          const roleName = customRole.name.toLowerCase();
          // Direct mapping to UserRole enum values
          if (roleName === "super_admin") {
            formattedData.role = "super_admin";
          } else if (roleName === "manager") {
            formattedData.role = "manager";
          } else if (roleName === "hr") {
            formattedData.role = "hr";
          } else if (roleName === "team_lead") {
            formattedData.role = "team_lead";
          } else if (roleName === "employee") {
            formattedData.role = "employee";
          } else {
            // Fallback for custom roles
            if (roleName.includes("admin") && roleName.includes("super")) {
              formattedData.role = "super_admin";
            } else if (roleName.includes("manager")) {
              formattedData.role = "manager";
            } else if (roleName.includes("team") && roleName.includes("lead")) {
              formattedData.role = "team_lead";
            } else if (roleName.includes("hr")) {
              formattedData.role = "hr";
            } else {
              formattedData.role = "employee"; // Default fallback
            }
          }
        } else {
          // If it's not a custom role, it might be a legacy role
          // In this case, we should clear the roleId
          formattedData.roleId = undefined;
        }
      }
      
      console.log("Role assignment:", { 
        selectedRoleId: formattedData.roleId,
        assignedRole: formattedData.role
      });
      
      // Only include managerId if role is employee or team_lead
      if (roleName !== "employee" && roleName !== "team_lead") {
        formattedData.managerId = undefined;
      }
      
      // Only include hrId and teamLeadId if role is employee
      if (roleName !== "employee") {
        formattedData.hrId = undefined;
        formattedData.teamLeadId = undefined;
      }
      
      console.log("Submitting user data:", formattedData);
      await createUser(formattedData);
      navigate("/users", { state: { message: "User created successfully" } });
    } catch (err) {
      console.error("Error creating user:", err);
      setError(getErrorMessage(err));
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Create User</h1>

      {error && (
        <Alert
          variant="error"
          message={error}
          onClose={() => setError(null)}
          className="mb-6"
        />
      )}
      
      {isDataLoading && (
        <Alert
          variant="info"
          message="Loading departments and positions data..."
          className="mb-6"
        />
      )}
      
      {(departmentsError || positionsError) && (
        <Alert
          variant="error"
          message="Failed to load departments or positions. Please try again."
          className="mb-6"
          action={
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={() => {
                refetchDepartments();
                refetchPositions();
              }}
            >
              Retry
            </Button>
          }
        />
      )}

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Input
                id="firstName"
                label="First Name"
                error={errors.firstName?.message}
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
            </div>
            <div>
              <Input
                id="lastName"
                label="Last Name"
                error={errors.lastName?.message}
                {...register("lastName", { required: "Last name is required" })}
              />
            </div>
          </div>

          <div>
            <Input
              id="email"
              type="email"
              label="Email Address"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
            />
          </div>

          <div>
            <Input
              id="password"
              type="password"
              label="Password"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                },
              })}
            />
          </div>

          <div>
            <Input
              id="phoneNumber"
              label="Phone Number (optional)"
              error={errors.phoneNumber?.message}
              {...register("phoneNumber", {
                pattern: {
                  value: /^\+?[0-9]{10,15}$/,
                  message: "Invalid phone number",
                },
              })}
            />
          </div>

          <div>
            <Input
              id="address"
              label="Address (optional)"
              error={errors.address?.message}
              {...register("address")}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Select
                id="roleId"
                label="Role"
                error={errors.roleId?.message}
                isLoading={isLoadingRoles}
                options={
                  roles
                    ? roles.map(role => ({
                        value: role.id,
                        label: getRoleDisplayName(role),
                      }))
                    : []
                }
                {...register("roleId", { required: "Role is required" })}
              />
            </div>
            <div>
              <Select
                id="gender"
                label="Gender (optional)"
                error={errors.gender?.message}
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" },
                ]}
                {...register("gender")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Select
                id="department"
                label="Department"
                error={errors.department?.message}
                options={
                  departmentsData
                    ? departmentsData.map((dept) => ({
                        value: dept.id,
                        label: dept.name,
                      }))
                    : []
                }
                placeholder={isLoadingDepartments ? "Loading departments..." : "Select Department"}
                isLoading={isLoadingDepartments}
                disabled={isLoadingDepartments || !!departmentsError}
                {...register("department", { required: "Department is required" })}
              />
            </div>
            <div>
              <Select
                id="position"
                label="Position"
                error={errors.position?.message}
                options={
                  positionsData
                    ? positionsData.map((pos) => ({
                        value: pos.id,
                        label: pos.name,
                      }))
                    : []
                }
                placeholder={isLoadingPositions ? "Loading positions..." : "Select Position"}
                isLoading={isLoadingPositions}
                disabled={isLoadingPositions || !!positionsError}
                {...register("position", { required: "Position is required" })}
              />
            </div>
          </div>

          {(roleName === "employee" || roleName === "team_lead") && (
            <div>
              <Select
                id="managerId"
                label="Manager"
                error={errors.managerId?.message}
                options={
                  managersData && managersData.users
                    ? managersData.users.map((manager: any) => ({
                        value: manager.id,
                        label: `${manager.firstName} ${manager.lastName}`,
                      }))
                    : []
                }
                placeholder={isLoadingManagers ? "Loading managers..." : "No Manager"}
                {...register("managerId", {
                  required: "Manager is required for employees and team leads",
                })}
              />
            </div>
          )}

          {(roleName === "employee" || roleName === "team_lead") && (
            <div>
              <Select
                id="hrId"
                label="HR Representative"
                error={errors.hrId?.message}
                options={
                  hrData && hrData.users
                    ? hrData.users.map((hr: any) => ({
                        value: hr.id,
                        label: `${hr.firstName} ${hr.lastName}`,
                      }))
                    : []
                }
                placeholder={isLoadingHR ? "Loading HR representatives..." : "No HR Representative"}
                {...register("hrId")}
              />
            </div>
          )}

          {roleName === "employee" && (
            <div>
              <Select
                id="teamLeadId"
                label="Team Lead"
                error={errors.teamLeadId?.message}
                options={
                  teamLeadData && teamLeadData.users
                    ? teamLeadData.users.map((teamLead: any) => ({
                        value: teamLead.id,
                        label: `${teamLead.firstName} ${teamLead.lastName}`,
                      }))
                    : []
                }
                placeholder={isLoadingTeamLeads ? "Loading team leads..." : "No Team Lead"}
                {...register("teamLeadId")}
              />
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/users")}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              isLoading={isLoading || isDataLoading}
              disabled={isDataLoading}
              title={isDataLoading ? "Please wait for data to load" : "Create user"}
            >
              {isDataLoading ? "Loading Data..." : "Create User"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateUserPage;
