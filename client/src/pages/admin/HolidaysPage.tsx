import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  getHolidays,
  activateHoliday,
  deactivateHoliday,
} from "../../services/holidayService";
import { Holiday, CreateHolidayData } from "../../types";
import { useForm } from "react-hook-form";
import { createHoliday } from "../../services/holidayService";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import Input from "../../components/ui/Input";
import DatePicker from "../../components/ui/DatePicker";
import Textarea from "../../components/ui/Textarea";
import { formatDate } from "../../utils/dateUtils";
import { getErrorMessage } from "../../utils/errorUtils";

const HolidaysPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateHolidayData>({
    defaultValues: {
      isActive: true,
    },
  });

  // Fetch holidays
  const { data, refetch } = useQuery({
    queryKey: ["holidays", selectedYear, selectedStatus],
    queryFn: () =>
      getHolidays({
        year: selectedYear,
        isActive:
          selectedStatus !== "all" ? selectedStatus === "active" : undefined,
      }),
  });

  // Handle activate/deactivate holiday
  const handleToggleStatus = async (id: string, isActive: boolean) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      if (isActive) {
        await deactivateHoliday(id);
        setSuccessMessage("Holiday deactivated successfully");
      } else {
        await activateHoliday(id);
        setSuccessMessage("Holiday activated successfully");
      }
      refetch();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle create holiday
  const onSubmit = async (data: CreateHolidayData) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await createHoliday(data);
      setSuccessMessage("Holiday created successfully");
      reset();
      setShowCreateForm(false);
      refetch();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  // Generate year options for filter
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 5 }, (_, i) => currentYear + i - 2);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Holidays</h1>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? "Cancel" : "Add Holiday"}
        </Button>
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

      {showCreateForm && (
        <Card className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Add New Holiday
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Input
                  id="name"
                  label="Holiday Name"
                  error={errors.name?.message}
                  {...register("name", { required: "Name is required" })}
                />
              </div>
              <div>
                <DatePicker
                  id="date"
                  label="Date"
                  error={errors.date?.message}
                  {...register("date", { required: "Date is required" })}
                />
              </div>
            </div>
            <div>
              <Textarea
                id="description"
                label="Description (optional)"
                rows={2}
                {...register("description")}
              />
            </div>
            <div className="flex items-center">
              <input
                id="isActive"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                {...register("isActive")}
              />
              <label
                htmlFor="isActive"
                className="ml-2 block text-sm text-gray-900"
              >
                Active
              </label>
            </div>
            <div className="flex justify-end">
              <Button type="submit" isLoading={isLoading}>
                Add Holiday
              </Button>
            </div>
          </form>
        </Card>
      )}

      <Card className="mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="w-full sm:w-auto">
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Year
            </label>
            <select
              id="year"
              className="form-input"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
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
        </div>
      </Card>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {data?.holidays && data.holidays.length > 0 ? (
            data.holidays.map((holiday: Holiday) => (
              <li key={holiday.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium text-gray-900 mr-2">
                          {holiday.name}
                        </h3>
                        <Badge
                          variant={holiday.isActive ? "success" : "danger"}
                        >
                          {holiday.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="font-medium">Date:</span>{" "}
                        {formatDate(holiday.date)}
                      </p>
                      {holiday.description && (
                        <p className="text-sm text-gray-500 mt-1">
                          {holiday.description}
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate(`/holidays/edit/${holiday.id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant={holiday.isActive ? "danger" : "success"}
                        size="sm"
                        onClick={() =>
                          handleToggleStatus(holiday.id, holiday.isActive)
                        }
                        disabled={isLoading}
                      >
                        {holiday.isActive ? "Deactivate" : "Activate"}
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-8 text-center text-gray-500">
              No holidays found for the selected year and status.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HolidaysPage;
