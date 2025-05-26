import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import LeaveBalanceDebug from "../../components/LeaveBalanceDebug";
import { getLeaveTypes } from "../../services/leaveTypeService";
import { createLeaveRequest } from "../../services/leaveRequestService";
import { getHolidays } from "../../services/holidayService";
import { CreateLeaveRequestData, LeaveBalance } from "../../types";
import Card from "../../components/ui/Card";
import Select from "../../components/ui/Select";
import DatePicker from "../../components/ui/DatePicker";
import Textarea from "../../components/ui/Textarea";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { getErrorMessage } from "../../utils/errorUtils";
import { calculateBusinessDays } from "../../utils/dateUtils";
import { useMyLeaveBalances } from "../../hooks/useLeaveBalances";
import ApprovalWorkflowPreview from "../../components/leaves/ApprovalWorkflowPreview";

// Helper function to calculate remaining days consistently
const calculateRemainingDays = (leaveBalance: LeaveBalance) => {
  const totalDays = Number(leaveBalance.totalDays) || 0;
  const usedDays = Number(leaveBalance.usedDays) || 0;
  const pendingDays = Number(leaveBalance.pendingDays) || 0;
  const carryForwardDays = Number(leaveBalance.carryForwardDays) || 0;
  
  // Use the server-provided remainingDays if available, otherwise calculate it
  if (leaveBalance.remainingDays !== undefined && 
      leaveBalance.remainingDays !== null && 
      !isNaN(Number(leaveBalance.remainingDays))) {
    return Number(leaveBalance.remainingDays);
  } else {
    // Include carry forward days in the calculation
    return totalDays + carryForwardDays - usedDays - pendingDays;
  }
};

const ApplyLeavePage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateLeaveRequestData>();
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Watch form values for calculations
  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const leaveTypeId = watch("leaveTypeId");
  const requestType = watch("requestType");
  
  // Fetch user's leave balances
  const { data: leaveBalancesData } = useMyLeaveBalances({
    year: new Date().getFullYear(),
  });
  
  // Debug leave balances data
  useEffect(() => {
    if (leaveBalancesData) {
      console.log('Leave balances data:', leaveBalancesData);
    }
  }, [leaveBalancesData]);

  // Fetch leave types - these are seeded from seed.ts and configurable by super admins
  const { 
    data: leaveTypesData, 
    isLoading: isLoadingLeaveTypes,
    error: leaveTypesError 
  } = useQuery({
    queryKey: ["leaveTypes"],
    queryFn: () => getLeaveTypes({ isActive: true }),
  });

  // Handle leave types error
  React.useEffect(() => {
    if (leaveTypesError) {
      setError(getErrorMessage(leaveTypesError));
    }
  }, [leaveTypesError]);

  // Fetch holidays for business days calculation
  const { 
    data: holidaysData, 
    isLoading: isLoadingHolidays,
    error: holidaysError 
  } = useQuery({
    queryKey: ["holidays", new Date().getFullYear()],
    queryFn: () =>
      getHolidays({ year: new Date().getFullYear(), isActive: true }),
  });
  
  // Handle holidays error
  React.useEffect(() => {
    if (holidaysError) {
      setError(getErrorMessage(holidaysError));
    }
  }, [holidaysError]);

  // Calculate business days between start and end date
  const calculateDuration = () => {
    if (startDate && endDate) {
      const holidayDates =
        holidaysData && holidaysData.holidays
          ? holidaysData.holidays.map((h) => h.date)
          : [];

      let days = calculateBusinessDays(startDate, endDate, holidayDates);

      // Adjust for half days
      if (requestType && requestType !== "full_day") {
        days = days > 0 ? days - 0.5 : 0;
      }

      return days;
    }
    return 0;
  };

  const duration = calculateDuration();

  // Check if requested leave exceeds available balance
  useEffect(() => {
    // Reset warning when inputs change
    setWarning(null);
    
    // Only check if we have all the required data
    if (leaveTypeId && startDate && endDate && leaveBalancesData?.leaveBalances) {
      const selectedLeaveBalance = leaveBalancesData.leaveBalances.find(
        balance => balance.leaveTypeId === leaveTypeId
      );
      
      if (selectedLeaveBalance) {
        // Use our helper function to calculate remaining days
        const remainingDays = calculateRemainingDays(selectedLeaveBalance);
        console.log('Calculated remainingDays for leave type:', selectedLeaveBalance.leaveType?.name, remainingDays);
        
        const availableBalance = isNaN(remainingDays) ? 0 : remainingDays;
        
        if (duration > availableBalance) {
          setWarning(
            `You cannot submit this leave request as it exceeds your available balance. Available: ${availableBalance.toFixed(1)} days, Requested: ${duration} days. Please adjust your dates or select a different leave type.`
          );
        }
      }
    }
  }, [leaveTypeId, startDate, endDate, duration, leaveBalancesData]);

  // Handle form submission
  const onSubmit = async (data: CreateLeaveRequestData) => {
    // Check if leave request exceeds balance
    if (warning) {
      // Prevent submission when out of balance
      setError("Cannot submit leave request: Insufficient leave balance. Please adjust your dates or leave type.");
      return; // Stop the submission process
    }
    
    // Double-check balance before submission
    if (leaveTypeId && leaveBalancesData?.leaveBalances) {
      const selectedLeaveBalance = leaveBalancesData.leaveBalances.find(
        balance => balance.leaveTypeId === leaveTypeId
      );
      
      if (selectedLeaveBalance) {
        // Use our helper function to calculate remaining days
        const remainingDays = calculateRemainingDays(selectedLeaveBalance);
        console.log('Calculated remainingDays for submission check:', remainingDays);
        
        const availableBalance = isNaN(remainingDays) ? 0 : remainingDays;
        
        if (duration > availableBalance) {
          setError("Cannot submit leave request: Insufficient leave balance. Please adjust your dates or leave type.");
          return; // Stop the submission process
        }
      }
    }
    
    setIsLoading(true);
    setError(null);

    try {
      await createLeaveRequest(data);
      navigate("/my-leaves", {
        state: { message: "Leave request submitted successfully" },
      });
    } catch (err: any) {
      // Check if this is a balance-related error from the server
      if (err.response && err.response.status === 400 && err.response.data && err.response.data.availableBalance !== undefined) {
        const { availableBalance, requestedDays, pendingDays } = err.response.data;
        setError(`Cannot submit leave request: Insufficient leave balance. Available: ${availableBalance.toFixed(1)} days, Requested: ${requestedDays} days, Pending: ${pendingDays} days. Please adjust your dates or leave type.`);
      } else {
        setError(getErrorMessage(err));
      }
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Apply for Leave
      </h1>
      
      {/* Debug component - remove in production */}
      <LeaveBalanceDebug />

      {error && (
        <Alert
          variant="error"
          message={error}
          onClose={() => setError(null)}
          className="mb-6"
        />
      )}
      
      {warning && (
        <Alert
          variant="warning"
          message={warning}
          onClose={() => setWarning(null)}
          className="mb-6"
        />
      )}

      <Card>
        {isLoadingLeaveTypes || isLoadingHolidays ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700"></div>
            <span className="ml-3 text-gray-600">Loading form data...</span>
          </div>
        ) : (
          <form onSubmit={(e) => {
                    // Additional check before form submission
                    if (leaveTypeId && leaveBalancesData?.leaveBalances) {
                      const selectedBalance = leaveBalancesData.leaveBalances.find(
                        balance => balance.leaveTypeId === leaveTypeId
                      );
                      if (selectedBalance) {
                        // Use our helper function to calculate remaining days
                        const remainingDays = calculateRemainingDays(selectedBalance);
                        console.log('Calculated remainingDays for form submission:', remainingDays);
                        
                        const availableBalance = isNaN(remainingDays) ? 0 : remainingDays;
                        if (duration > availableBalance) {
                          e.preventDefault();
                          setError("Cannot submit leave request: Insufficient leave balance. Please adjust your dates or leave type.");
                          return false;
                        }
                      }
                    }
                    return handleSubmit(onSubmit)(e);
                  }} className="space-y-6">
            <div>
              <Select
                id="leaveTypeId"
                label="Leave Type"
                error={errors.leaveTypeId?.message}
                options={
                  leaveTypesData && leaveTypesData.leaveTypes
                    ? leaveTypesData.leaveTypes.map((type) => ({
                        value: type.id,
                        label: type.name,
                      }))
                    : []
                }
                placeholder={
                  isLoadingLeaveTypes
                    ? "Loading leave types..."
                    : "Select leave type"
                }
                disabled={isLoadingLeaveTypes}
                {...register("leaveTypeId", {
                  required: "Leave type is required",
                })}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <DatePicker
                  id="startDate"
                  label="Start Date"
                  error={errors.startDate?.message}
                  min={new Date().toISOString().split("T")[0]}
                  {...register("startDate", {
                    required: "Start date is required",
                  })}
                />
              </div>
              <div>
                <DatePicker
                  id="endDate"
                  label="End Date"
                  error={errors.endDate?.message}
                  min={startDate || new Date().toISOString().split("T")[0]}
                  {...register("endDate", { required: "End date is required" })}
                />
              </div>
            </div>

            <div>
              <Select
                id="requestType"
                label="Request Type"
                error={errors.requestType?.message}
                options={[
                  { value: "full_day", label: "Full Day" },
                  { value: "half_day_morning", label: "Half Day (Morning)" },
                  {
                    value: "half_day_afternoon",
                    label: "Half Day (Afternoon)",
                  },
                ]}
                {...register("requestType", {
                  required: "Request type is required",
                })}
              />
            </div>

            <div>
              <Textarea
                id="reason"
                label="Reason for Leave"
                rows={4}
                error={errors.reason?.message}
                placeholder="Please provide a reason for your leave request"
                {...register("reason", { required: "Reason is required" })}
              />
            </div>

            {startDate && endDate && (
              <div className={`p-4 rounded-md ${warning ? 'bg-red-50' : 'bg-gray-50'}`}>
                <p className={`text-sm ${warning ? 'text-red-700' : 'text-gray-700'}`}>
                  <span className="font-medium">Duration:</span> {duration}{" "}
                  working day(s)
                  {warning && (
                    <span className="ml-2 text-red-600 font-medium">
                      (Exceeds available balance - Cannot submit)
                    </span>
                  )}
                </p>
                {leaveTypeId && leaveBalancesData?.leaveBalances && (
                  <p className="text-sm mt-1 text-gray-600">
                    <span className="font-medium">Available Balance:</span>{" "}
                    {(() => {
                      const selectedBalance = leaveBalancesData.leaveBalances.find(
                        balance => balance.leaveTypeId === leaveTypeId
                      );
                      if (selectedBalance) {
                        // Use our helper function to calculate remaining days
                        const remainingDays = calculateRemainingDays(selectedBalance);
                        const availableBalance = isNaN(remainingDays) ? 0 : remainingDays;
                        
                        return `${availableBalance.toFixed(1)} days`;
                      }
                      return "Loading...";
                    })()}
                  </p>
                )}
              </div>
            )}
            
            {/* Display approval workflow preview */}
            {startDate && endDate && duration > 0 && !warning && (
              <ApprovalWorkflowPreview 
                duration={duration} 
                isLoading={isLoading || isLoadingLeaveTypes || isLoadingHolidays}
              />
            )}

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/my-leaves")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={
                  isLoading || isLoadingLeaveTypes || isLoadingHolidays
                }
                disabled={
                  isLoading || 
                  isLoadingLeaveTypes || 
                  isLoadingHolidays || 
                  !!warning || // Disable button when out of balance
                  !!(duration > 0 && leaveTypeId && leaveBalancesData?.leaveBalances && (() => {
                    const selectedBalance = leaveBalancesData.leaveBalances.find(
                      balance => balance.leaveTypeId === leaveTypeId
                    );
                    if (selectedBalance) {
                      // Use our helper function to calculate remaining days
                      const remainingDays = calculateRemainingDays(selectedBalance);
                      const availableBalance = isNaN(remainingDays) ? 0 : remainingDays;
                      return duration > availableBalance;
                    }
                    return false;
                  })())
                }
              >
                {warning ? "Insufficient Balance" : "Submit Request"}
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};

export default ApplyLeavePage;
