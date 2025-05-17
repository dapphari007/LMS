import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  createHoliday,
  bulkCreateHolidays,
} from "../../services/holidayService";

type FormValues = {
  name: string;
  date: string;
  description: string;
  isActive: boolean;
};

type BulkUploadFormValues = {
  file: FileList;
};

export default function CreateHolidayPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isBulkUpload, setIsBulkUpload] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
      isActive: true,
    },
  });

  const { register: registerBulk, handleSubmit: handleSubmitBulk } =
    useForm<BulkUploadFormValues>();

  const createMutation = useMutation({
    mutationFn: createHoliday,
    onSuccess: () => {
      navigate("/holidays");
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || "Failed to create holiday");
    },
  });

  const bulkCreateMutation = useMutation({
    mutationFn: bulkCreateHolidays,
    onSuccess: () => {
      navigate("/holidays");
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || "Failed to bulk create holidays");
    },
  });

  const onSubmit = (data: FormValues) => {
    createMutation.mutate({
      name: data.name,
      date: data.date,
      description: data.description,
      isActive: data.isActive,
    });
  };

  const onBulkSubmit = async (data: BulkUploadFormValues) => {
    if (!data.file || data.file.length === 0) {
      setError("Please select a CSV file");
      return;
    }

    const file = data.file[0];
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      setError("Please upload a CSV file");
      return;
    }

    try {
      const text = await file.text();
      const rows = text.split("\\n").filter((row) => row.trim());

      // Skip header row if it exists
      const startIndex =
        rows[0].toLowerCase().includes("name") ||
        rows[0].toLowerCase().includes("date")
          ? 1
          : 0;

      const holidays = [];

      for (let i = startIndex; i < rows.length; i++) {
        const columns = rows[i].split(",").map((col) => col.trim());

        if (columns.length < 2) continue;

        const [name, dateStr, description = ""] = columns;

        // Validate date format (YYYY-MM-DD)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(dateStr)) {
          setError(
            `Invalid date format in row ${i + 1}. Please use YYYY-MM-DD format.`
          );
          return;
        }

        holidays.push({
          name,
          date: dateStr,
          description,
          isActive: true,
        });
      }

      if (holidays.length === 0) {
        setError("No valid holiday entries found in the CSV file");
        return;
      }

      bulkCreateMutation.mutate({ holidays });
    } catch (err: any) {
      setError(
        "Error processing CSV file: " + (err.message || "Unknown error")
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create Holiday</h1>

      <div className="mb-6">
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setIsBulkUpload(false)}
            className={`px-4 py-2 rounded ${
              !isBulkUpload
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Single Holiday
          </button>
          <button
            type="button"
            onClick={() => setIsBulkUpload(true)}
            className={`px-4 py-2 rounded ${
              isBulkUpload
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Bulk Upload
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {!isBulkUpload ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Holiday Name *
              </label>
              <input
                {...register("name", { required: "Holiday name is required" })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
              />
              {errors.name && (
                <p className="text-red-500 text-xs italic">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Date *
              </label>
              <input
                {...register("date", { required: "Date is required" })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="date"
              />
              {errors.date && (
                <p className="text-red-500 text-xs italic">
                  {errors.date.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                {...register("description")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows={3}
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register("isActive")}
                  className="mr-2"
                />
                <span className="text-gray-700 text-sm">Active Holiday</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/holidays")}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? "Creating..." : "Create Holiday"}
            </button>
          </div>
        </form>
      ) : (
        <form
          onSubmit={handleSubmitBulk(onBulkSubmit)}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Bulk Upload Holidays</h2>
            <p className="text-gray-600 mb-4">
              Upload a CSV file with holiday data. The file should have columns
              for name, date (YYYY-MM-DD format), and description (optional).
            </p>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                CSV File *
              </label>
              <input
                type="file"
                accept=".csv"
                {...registerBulk("file", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-medium mb-2">Example CSV Format:</h3>
              <pre className="text-sm text-gray-700">
                Name,Date,Description
                <br />
                New Year's Day,2023-01-01,First day of the year
                <br />
                Independence Day,2023-07-04,National holiday
              </pre>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/holidays")}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              disabled={bulkCreateMutation.isPending}
            >
              {bulkCreateMutation.isPending
                ? "Uploading..."
                : "Upload Holidays"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
