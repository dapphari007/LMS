import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { getHoliday, updateHoliday } from "../../services/holidayService";

type FormValues = {
  name: string;
  date: string;
  description: string;
  isActive: boolean;
};

export default function EditHolidayPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
      isActive: true,
    },
  });

  useEffect(() => {
    const fetchHoliday = async () => {
      try {
        setIsLoading(true);
        const response = await getHoliday(id as string);
        const holiday = response.data;

        if (holiday) {
          reset({
            name: holiday.name,
            date: new Date(holiday.date).toISOString().split("T")[0],
            description: holiday.description || "",
            isActive: holiday.isActive,
          });
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load holiday data");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchHoliday();
    }
  }, [id, reset]);

  const updateMutation = useMutation({
    mutationFn: (data: Partial<FormValues>) =>
      updateHoliday(id as string, data),
    onSuccess: () => {
      navigate("/holidays");
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || "Failed to update holiday");
    },
  });

  const onSubmit = (data: FormValues) => {
    updateMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading holiday data...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Holiday</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

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
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
