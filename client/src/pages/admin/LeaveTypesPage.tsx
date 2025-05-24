import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  getLeaveTypes,
  activateLeaveType,
  deactivateLeaveType,
  createLeaveType,
  GetLeaveTypesResponse,
} from "../../services/leaveTypeService";
import {
  bulkCreateLeaveBalances,
  checkLeaveTypeBalances,
  createAllLeaveBalancesForAllUsers,
} from "../../services/leaveBalanceService";
import { LeaveType } from "../../types";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { getErrorMessage } from "../../utils/errorUtils";
import config from "../../config";

// Default leave types data
const defaultLeaveTypes = [
  {
    name: "Annual Leave",
    description: "Regular paid time off for vacation or personal matters",
    defaultDays: 20,
    isCarryForward: true,
    maxCarryForwardDays: 5,
    isActive: true,
    applicableGender: null,
    isHalfDayAllowed: true,
    isPaidLeave: true,
  },
  {
    name: "Sick Leave",
    description: "Leave for medical reasons or illness",
    defaultDays: 10,
    isCarryForward: false,
    maxCarryForwardDays: 0,
    isActive: true,
    applicableGender: null,
    isHalfDayAllowed: true,
    isPaidLeave: true,
  },
  {
    name: "Maternity Leave",
    description: "Leave for female employees before and after childbirth",
    defaultDays: 90,
    isCarryForward: false,
    maxCarryForwardDays: 0,
    isActive: true,
    applicableGender: "female",
    isHalfDayAllowed: false,
    isPaidLeave: true,
  },
  {
    name: "Paternity Leave",
    description: "Leave for male employees after the birth of their child",
    defaultDays: 10,
    isCarryForward: false,
    maxCarryForwardDays: 0,
    isActive: true,
    applicableGender: "male",
    isHalfDayAllowed: false,
    isPaidLeave: true,
  },
  {
    name: "Bereavement Leave",
    description: "Leave due to the death of a family member",
    defaultDays: 5,
    isCarryForward: false,
    maxCarryForwardDays: 0,
    isActive: true,
    applicableGender: null,
    isHalfDayAllowed: false,
    isPaidLeave: true,
  },
  {
    name: "Unpaid Leave",
    description: "Leave without pay for personal reasons",
    defaultDays: 30,
    isCarryForward: false,
    maxCarryForwardDays: 0,
    isActive: true,
    applicableGender: null,
    isHalfDayAllowed: true,
    isPaidLeave: false,
  },
  {
    name: "Work From Home",
    description: "Working remotely from home",
    defaultDays: 15,
    isCarryForward: false,
    maxCarryForwardDays: 0,
    isActive: true,
    applicableGender: null,
    isHalfDayAllowed: true,
    isPaidLeave: true,
  },
  {
    name: "Compensatory Off",
    description: "Leave granted for working on holidays or weekends",
    defaultDays: 0,
    isCarryForward: true,
    maxCarryForwardDays: 5,
    isActive: true,
    applicableGender: null,
    isHalfDayAllowed: true,
    isPaidLeave: true,
  },
];

const LeaveTypesPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [showDefaultTypes, setShowDefaultTypes] = useState(false);
  // Set the year to 2025 specifically as requested
  const [currentYear] = useState(2025);
  const [processingBalanceForType, setProcessingBalanceForType] = useState<
    string | null
  >(null);
  const [isProcessingBulkCreate, setIsProcessingBulkCreate] = useState(false);
  const [leaveTypesWithBalances, setLeaveTypesWithBalances] = useState<
    Record<string, boolean>
  >({});
  const [isDatabaseFlushed, setIsDatabaseFlushed] = useState(false);
  const queryClient = useQueryClient();

  // Check if database is flushed
  useEffect(() => {
    const checkDatabaseFlushed = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/api/leave-balances/check-flushed`
        );
        setIsDatabaseFlushed(response.data.isFlushed);
      } catch (err) {
        console.error("Error checking database flush status:", err);
        setIsDatabaseFlushed(false);
      }
    };
    checkDatabaseFlushed();
  }, []);

  // Fetch leave types
  const { data, refetch, error: queryError } = useQuery<GetLeaveTypesResponse, Error>({
    queryKey: ["leaveTypes", selectedStatus],
    queryFn: () =>
      getLeaveTypes({
        isActive:
          selectedStatus !== "all" ? selectedStatus === "active" : undefined,
      }),
  });
  
  // Handle query error
  useEffect(() => {
    if (queryError) {
      setError(getErrorMessage(queryError));
    }
  }, [queryError]);

  // Check which leave types already have balances for the current year
  useEffect(() => {
    const checkBalances = async () => {
      if (data?.leaveTypes && data.leaveTypes.length > 0) {
        const balanceStatus: Record<string, boolean> = {};

        for (const leaveType of data.leaveTypes) {
          try {
            const result = await checkLeaveTypeBalances(
              leaveType.id,
              currentYear
            );
            balanceStatus[leaveType.id] = result.exists && result.count > 0;
          } catch (err) {
            console.error(
              `Error checking balances for ${leaveType.name}:`,
              err
            );
            balanceStatus[leaveType.id] = false;
          }
        }

        setLeaveTypesWithBalances(balanceStatus);
      }
    };

    checkBalances();
  }, [data?.leaveTypes, currentYear]);

  // Check if we should show default leave types - only when there are no leave types at all
  useEffect(() => {
    if (data?.leaveTypes && data.leaveTypes.length === 0) {
      setShowDefaultTypes(true);
    } else {
      setShowDefaultTypes(false);
    }
  }, [data]);

  // Track which default types have been created
  const [createdTypes, setCreatedTypes] = useState<Record<string, boolean>>({});

  // Check if any leave types match the default types
  useEffect(() => {
    if (data?.leaveTypes && data.leaveTypes.length > 0) {
      const newCreatedTypes: Record<string, boolean> = {};

      // Check each default leave type against existing leave types
      defaultLeaveTypes.forEach((defaultType) => {
        const exists = data.leaveTypes.some(
          (existingType: LeaveType) => existingType.name === defaultType.name
        );
        if (exists) {
          newCreatedTypes[defaultType.name] = true;
        }
      });

      setCreatedTypes((prev) => ({ ...prev, ...newCreatedTypes }));
    }
  }, [data]);

  // Create leave type mutation
  const createLeaveTypeMutation = useMutation({
    mutationFn: createLeaveType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaveTypes"] });
      refetch();
    },
    onError: (err: any) => {
      setError(getErrorMessage(err));
    },
  });

  // Create leave balances mutation
  const createLeaveBalancesMutation = useMutation({
    mutationFn: bulkCreateLeaveBalances,
    onSuccess: (result, variables) => {
      // Update the state to show this leave type now has balances
      setLeaveTypesWithBalances((prev) => ({
        ...prev,
        [variables.leaveTypeId]: true,
      }));

      const message =
        result.created > 0
          ? `Leave balances created successfully for ${result.created} users for year ${currentYear}`
          : `No new balances needed to be created (${result.skipped} already existed)`;

      setSuccessMessage(message);
      setTimeout(() => setSuccessMessage(null), 3000);
      setProcessingBalanceForType(null);
    },
    onError: (err: any) => {
      setError(getErrorMessage(err));
      setProcessingBalanceForType(null);
    },
  });

  // Bulk create all leave balances for all leave types
  const bulkCreateAllBalancesMutation = useMutation({
    mutationFn: createAllLeaveBalancesForAllUsers,
    onSuccess: (result) => {
      // Update all leave types to show they have balances
      if (data?.leaveTypes) {
        const allBalances: Record<string, boolean> = {};
        data.leaveTypes.forEach((leaveType: LeaveType) => {
          allBalances[leaveType.id] = true;
        });
        setLeaveTypesWithBalances((prev) => ({ ...prev, ...allBalances }));
      }

      const message = `Successfully created ${result.created} leave balances for ${result.users} users across ${result.leaveTypes} leave types for year ${currentYear}`;
      setSuccessMessage(message);
      setTimeout(() => setSuccessMessage(null), 3000);
      setIsProcessingBulkCreate(false);
    },
    onError: (err: any) => {
      setError(getErrorMessage(err));
      setIsProcessingBulkCreate(false);
    },
  });

  // Handle creating leave balances for a leave type
  const handleCreateLeaveBalances = (leaveType: LeaveType) => {
    setProcessingBalanceForType(leaveType.id);
    createLeaveBalancesMutation.mutate({
      leaveTypeId: leaveType.id,
      totalDays: leaveType.defaultDays,
      year: currentYear,
    });
  };

  // Handle bulk creating leave balances for all leave types
  const handleBulkCreateAllBalances = () => {
    setIsProcessingBulkCreate(true);
    bulkCreateAllBalancesMutation.mutate();
  };

  // Handle creating a default leave type
  const handleCreateDefaultLeaveType = async (leaveTypeData: any) => {
    try {
      setIsLoading(true);
      await createLeaveTypeMutation.mutateAsync(leaveTypeData);

      // Mark this type as created
      setCreatedTypes((prev) => ({
        ...prev,
        [leaveTypeData.name]: true,
      }));

      setSuccessMessage(`${leaveTypeData.name} created successfully`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      // Error is handled by the mutation
    } finally {
      setIsLoading(false);
    }
  };

  // Handle activate/deactivate leave type
  const handleToggleStatus = async (id: string, isActive: boolean) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      if (isActive) {
        await deactivateLeaveType(id);
        setSuccessMessage("Leave type deactivated successfully");
      } else {
        await activateLeaveType(id);
        setSuccessMessage("Leave type activated successfully");
      }
      refetch();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Leave Types</h1>
        <div className="flex space-x-2">
          <Link to="/leave-types/config">
            <Button variant="secondary">Configure Leave Types</Button>
          </Link>
          <Link to="/leave-types/create">
            <Button>Create Leave Type</Button>
          </Link>
        </div>
      </div>

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
        <div className="flex flex-wrap justify-between gap-4">
          <div className="w-full sm:w-auto">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              className="form-input"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          {data?.leaveTypes && data.leaveTypes.length > 0 && isDatabaseFlushed && (
            <div className="flex items-end">
              <Button
                variant="primary"
                onClick={handleBulkCreateAllBalances}
                disabled={isProcessingBulkCreate}
              >
                {isProcessingBulkCreate ? "Processing..." : "Bulk Create All Balances"}
              </Button>
            </div>
          )}
        </div>
      </Card>

      <div className="space-y-6">
        {data?.leaveTypes && data.leaveTypes.length > 0 ? (
          data.leaveTypes.map((leaveType: LeaveType) => (
            <Card key={leaveType.id}>
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <div className="flex items-center">
                    <h3 className="text-lg font-medium text-gray-900 mr-2">
                      {leaveType.name}
                    </h3>
                    <Badge variant={leaveType.isActive ? "success" : "danger"}>
                      {leaveType.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {leaveType.description}
                  </p>
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Default Days:</span>{" "}
                      {leaveType.defaultDays}
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Carry Forward:</span>{" "}
                      {leaveType.isCarryForward ? "Yes" : "No"}
                    </div>
                    {leaveType.isCarryForward && (
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">Max Carry Forward:</span>{" "}
                        {leaveType.maxCarryForwardDays || "N/A"}
                      </div>
                    )}
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Half Day Allowed:</span>{" "}
                      {leaveType.isHalfDayAllowed ? "Yes" : "No"}
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Paid Leave:</span>{" "}
                      {leaveType.isPaidLeave ? "Yes" : "No"}
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Gender Specific:</span>{" "}
                      {leaveType.applicableGender || "All"}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      console.log(
                        "Edit button clicked for leave type:",
                        leaveType.id
                      );
                      window.location.href = `/leave-types/edit/${leaveType.id}`;
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant={leaveType.isActive ? "danger" : "success"}
                    size="sm"
                    onClick={() =>
                      handleToggleStatus(leaveType.id, leaveType.isActive)
                    }
                    disabled={
                      isLoading || processingBalanceForType === leaveType.id
                    }
                  >
                    {leaveType.isActive ? "Deactivate" : "Activate"}
                  </Button>
                  {!leaveTypesWithBalances[leaveType.id] &&
                    isDatabaseFlushed && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleCreateLeaveBalances(leaveType)}
                        disabled={
                          isLoading || processingBalanceForType === leaveType.id
                        }
                      >
                        {processingBalanceForType === leaveType.id
                          ? "Creating..."
                          : "Create Balances"}
                      </Button>
                    )}
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div>
            {showDefaultTypes ? (
              <div className="space-y-6">
                <Card>
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700">
                    <h3 className="text-lg font-medium mb-2">
                      First Time Setup
                    </h3>
                    <p className="mb-4">
                      It looks like you don't have any leave types set up yet.
                      You can create the default leave types below or create
                      your own custom leave types.
                    </p>
                  </div>
                </Card>

                {defaultLeaveTypes.map((leaveType, index) => (
                  <Card key={index}>
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div>
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium text-gray-900 mr-2">
                            {leaveType.name}
                          </h3>
                          <Badge variant="success">Default</Badge>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {leaveType.description}
                        </p>
                        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">Default Days:</span>{" "}
                            {leaveType.defaultDays}
                          </div>
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">Carry Forward:</span>{" "}
                            {leaveType.isCarryForward ? "Yes" : "No"}
                          </div>
                          {leaveType.isCarryForward && (
                            <div className="text-sm text-gray-500">
                              <span className="font-medium">
                                Max Carry Forward:
                              </span>{" "}
                              {leaveType.maxCarryForwardDays || "N/A"}
                            </div>
                          )}
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">
                              Half Day Allowed:
                            </span>{" "}
                            {leaveType.isHalfDayAllowed ? "Yes" : "No"}
                          </div>
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">Paid Leave:</span>{" "}
                            {leaveType.isPaidLeave ? "Yes" : "No"}
                          </div>
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">
                              Gender Specific:
                            </span>{" "}
                            {leaveType.applicableGender || "All"}
                          </div>
                        </div>
                      </div>
                      <div>
                        {!createdTypes[leaveType.name] ? (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() =>
                              handleCreateDefaultLeaveType(leaveType)
                            }
                            disabled={
                              isLoading || createLeaveTypeMutation.isPending
                            }
                          >
                            Create
                          </Button>
                        ) : (
                          <Badge
                            variant="success"
                            className="px-3 py-1 text-sm"
                          >
                            Created
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <p className="text-center text-gray-500 py-8">
                  No leave types found matching the selected filters.
                </p>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveTypesPage;
