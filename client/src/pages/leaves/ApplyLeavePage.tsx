import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getLeaveTypes } from "../../services/leaveTypeService";
import { createLeaveRequest } from "../../services/leaveRequestService";
import { getHolidays } from "../../services/holidayService";
import { CreateLeaveRequestData } from "../../types";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import DatePicker from "../../components/ui/DatePicker";
import Textarea from "../../components/ui/Textarea";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { getErrorMessage } from "../../utils/errorUtils";
import { calculateBusinessDays } from "../../utils/dateUtils";

const ApplyLeavePage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateLeaveRequestData>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Watch form values for calculations
  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const leaveTypeId = watch("leaveTypeId");
  const requestType = watch("requestType");

  // Fetch leave types - these are seeded from seed.ts and configurable by super admins
  const { data: leaveTypesData, isLoading: isLoadingLeaveTypes } = useQuery({
    queryKey: ["leaveTypes"],
    queryFn: () => getLeaveTypes({ isActive: true }),
    onError: (err: any) => setError(getErrorMessage(err)),
  });

  // Fetch holidays for business days calculation
  const { data: holidaysData, isLoading: isLoadingHolidays } = useQuery({
    queryKey: ["holidays", new Date().getFullYear()],
    queryFn: () =>
      getHolidays({ year: new Date().getFullYear(), isActive: true }),
    onError: (err: any) => setError(getErrorMessage(err)),
  });

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

  // Handle form submission
  const onSubmit = async (data: CreateLeaveRequestData) => {
    setIsLoading(true);
    setError(null);

    try {
      await createLeaveRequest(data);
      navigate("/my-leaves", {
        state: { message: "Leave request submitted successfully" },
      });
    } catch (err) {
      setError(getErrorMessage(err));
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Apply for Leave
      </h1>

      {error && (
        <Alert
          variant="error"
          message={error}
          onClose={() => setError(null)}
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Duration:</span> {duration}{" "}
                  working day(s)
                </p>
              </div>
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
                disabled={isLoading || isLoadingLeaveTypes || isLoadingHolidays}
              >
                Submit Request
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};

export default ApplyLeavePage;
