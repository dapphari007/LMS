import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getTeamLeaveRequests,
  getMyLeaveRequests,
} from "../../services/leaveRequestService";
import { getAllUsers } from "../../services/userService";
import { getHolidays } from "../../services/holidayService";
import Card from "../../components/ui/Card";
import Alert from "../../components/ui/Alert";
import { formatDate } from "../../utils/dateUtils";
import { useAuth } from "../../context/AuthContext";

// Calendar view types
type CalendarViewType = "month" | "week";

// Calendar data view types
type CalendarDataViewType = "team" | "individual";

// Leave type colors for the calendar
const leaveTypeColors: Record<string, string> = {
  "Annual Leave": "bg-blue-100 border-blue-300 text-blue-800",
  "Sick Leave": "bg-red-100 border-red-300 text-red-800",
  "Work From Home": "bg-purple-100 border-purple-300 text-purple-800",
  Training: "bg-yellow-100 border-yellow-300 text-yellow-800",
  "Maternity Leave": "bg-pink-100 border-pink-300 text-pink-800",
  "Paternity Leave": "bg-indigo-100 border-indigo-300 text-indigo-800",
  "Bereavement Leave": "bg-gray-100 border-gray-300 text-gray-800",
  "Unpaid Leave": "bg-orange-100 border-orange-300 text-orange-800",
  Holiday: "bg-teal-100 border-teal-300 text-teal-800",
  default: "bg-green-100 border-green-300 text-green-800",
};

const LeaveCalendarPage: React.FC = () => {
  const { user } = useAuth();
  const [viewType, setViewType] = useState<CalendarViewType>("month");
  const [dataViewType, setDataViewType] =
    useState<CalendarDataViewType>("team");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [lastRefreshTime, setLastRefreshTime] = useState<Date>(new Date());

  // Fetch leave requests based on data view type and user role
  const { 
    data: leaveRequestsData, 
    isLoading: isLeaveRequestsLoading, 
    refetch: refetchLeaveRequests,
    error: leaveRequestsError
  } = useQuery({
      queryKey: ["leaveRequests", user?.role, dataViewType],
      queryFn: () => {
        // For individual view, only show user's own leave requests
        if (dataViewType === "individual") {
          return getMyLeaveRequests({ status: "approved" });
        }
        // For team view, show team leave requests (if user has permission)
        else {
          // Regular employees can't see team data, so show individual data instead
          if (user?.role === "employee") {
            return getMyLeaveRequests({ status: "approved" });
          } else {
            return getTeamLeaveRequests({ status: "approved" });
          }
        }
      },
      // Add refetch interval to periodically check for updates (every 30 seconds)
      refetchInterval: 30000,
      // Also refetch when the window regains focus
      refetchOnWindowFocus: true,
    });
    
  // Handle leave requests error
  useEffect(() => {
    if (leaveRequestsError) {
      setError((leaveRequestsError as Error).message || "Failed to load leave requests");
    }
  }, [leaveRequestsError]);

  // Fetch holidays for 2025
  const { 
    data: holidaysData, 
    isLoading: isHolidaysLoading,
    error: holidaysError
  } = useQuery({
    queryKey: ["holidays", 2025],
    queryFn: () => getHolidays({ year: 2025 }),
  });
  
  // Handle holidays error
  useEffect(() => {
    if (holidaysError) {
      setError((holidaysError as Error).message || "Failed to load holidays");
    }
  }, [holidaysError]);

  // Fetch all users for filtering
  const { 
    data: users, 
    isLoading: isUsersLoading,
    error: usersError
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });
  
  // Handle users error
  useEffect(() => {
    if (usersError) {
      setError((usersError as Error).message || "Failed to load users");
    }
  }, [usersError]);

  const isLoading =
    isLeaveRequestsLoading || isUsersLoading || isHolidaysLoading;

  // Get all departments from users data for filtering
  const departments = users
    ? [...new Set(users.filter((u) => u.department).map((u) => u.department))]
    : [];

  // Get all roles from users data for filtering
  const roles = users
    ? [...new Set(users.filter((u) => u.role).map((u) => u.role))]
    : [];

  // Filter users based on search term and filters
  const filteredUsers = users
    ? users.filter((u) => {
        const matchesSearch =
          searchTerm === "" ||
          `${u.firstName} ${u.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesDepartment =
          selectedDepartment === "" || u.department === selectedDepartment;
        const matchesRole = selectedRole === "" || u.role === selectedRole;
        return matchesSearch && matchesDepartment && matchesRole;
      })
    : [];

  // Get user IDs for filtered users
  const filteredUserIds = filteredUsers.map((u) => u.id);

  // Filter leave requests for the filtered users
  const filteredLeaveRequests = leaveRequestsData?.leaveRequests
    ? leaveRequestsData.leaveRequests.filter(
        (lr) => filteredUserIds.includes(lr.userId) && lr.status === "approved"
      )
    : [];

  // Generate calendar days based on current month/week
  const generateCalendarDays = () => {
    const days = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    if (viewType === "month") {
      // Get first day of month and last day of month
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);

      // Get the day of week for the first day (0 = Sunday, 6 = Saturday)
      const firstDayOfWeek = firstDay.getDay();

      // Add days from previous month to fill the first week
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const day = new Date(year, month - 1, prevMonthLastDay - i);
        days.push({ date: day, isCurrentMonth: false });
      }

      // Add all days of current month
      for (let i = 1; i <= lastDay.getDate(); i++) {
        const day = new Date(year, month, i);
        days.push({ date: day, isCurrentMonth: true });
      }

      // Add days from next month to complete the last week
      const lastDayOfWeek = lastDay.getDay();
      for (let i = 1; i < 7 - lastDayOfWeek; i++) {
        const day = new Date(year, month + 1, i);
        days.push({ date: day, isCurrentMonth: false });
      }
    } else if (viewType === "week") {
      // Get the first day of the week (Sunday)
      const firstDayOfWeek = new Date(currentDate);
      const day = currentDate.getDay();
      firstDayOfWeek.setDate(currentDate.getDate() - day);

      // Add all 7 days of the week
      for (let i = 0; i < 7; i++) {
        const day = new Date(firstDayOfWeek);
        day.setDate(firstDayOfWeek.getDate() + i);
        days.push({ date: day, isCurrentMonth: day.getMonth() === month });
      }
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  // Get leave requests for a specific day
  const getLeavesForDay = (date: Date) => {
    const dateStr = formatDate(date);

    // Get leave requests for this day
    const leaveRequests = filteredLeaveRequests.filter((leave) => {
      const startDate = formatDate(new Date(leave.startDate));
      const endDate = formatDate(new Date(leave.endDate));
      return dateStr >= startDate && dateStr <= endDate;
    });

    // Check if there's a holiday on this day
    const holidays = holidaysData?.holidays || [];
    const holidaysOnThisDay = holidays.filter((holiday: any) => {
      const holidayDate = formatDate(new Date(holiday.date));
      return dateStr === holidayDate;
    });

    // Add holidays as special "leave requests"
    const holidayLeaves = holidaysOnThisDay.map((holiday: any) => ({
      id: `holiday-${holiday.id}`,
      userId: "holiday",
      startDate: holiday.date,
      endDate: holiday.date,
      status: "approved",
      leaveType: {
        name: `Holiday: ${holiday.name}`,
        id: "holiday",
      },
      user: {
        firstName: "Company",
        lastName: "Holiday",
      },
      isHoliday: true,
      numberOfDays: 1, // Add numberOfDays property for holidays
    }));

    return [...leaveRequests, ...holidayLeaves];
  };

  // Handle case where no leave requests are found
  useEffect(() => {
    if (
      !isLoading &&
      (!leaveRequestsData || leaveRequestsData.leaveRequests.length === 0)
    ) {
      setError(
        "No leave requests found for the selected criteria. If you're an employee, you'll only see your own approved leave requests."
      );
    }
  }, [isLoading, leaveRequestsData]);
  
  // Auto-refresh when component mounts or when user navigates back to the page
  useEffect(() => {
    // Refresh data when component mounts
    handleRefresh();
    
    // Set up event listener for when user navigates back to the page
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        handleRefresh();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Clean up event listener
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Navigate to previous/next month or week
  const navigatePrevious = () => {
    const newDate = new Date(currentDate);
    if (viewType === "month") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setDate(newDate.getDate() - 7);
    }
    setCurrentDate(newDate);
  };

  const navigateNext = () => {
    const newDate = new Date(currentDate);
    if (viewType === "month") {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const navigateToday = () => {
    setCurrentDate(new Date());
  };
  
  // Handle manual refresh of leave data
  const handleRefresh = async () => {
    try {
      await refetchLeaveRequests();
      setLastRefreshTime(new Date());
      setSuccess("Leave calendar data refreshed successfully");
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError("Failed to refresh leave data: " + (err.message || "Unknown error"));
    }
  };

  // Format month name
  const getMonthName = () => {
    return currentDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  };

  // Format week range
  const getWeekRange = () => {
    const firstDayOfWeek = new Date(currentDate);
    const day = currentDate.getDay();
    firstDayOfWeek.setDate(currentDate.getDate() - day);

    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

    return `${formatDate(firstDayOfWeek)} - ${formatDate(lastDayOfWeek)}`;
  };

  // Get color for leave type
  const getLeaveTypeColor = (leaveTypeName: string) => {
    // Check if it's a holiday
    if (leaveTypeName.startsWith("Holiday:")) {
      return leaveTypeColors["Holiday"];
    }
    return leaveTypeColors[leaveTypeName] || leaveTypeColors.default;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Leave Calendar</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex space-x-2">
            <button
              onClick={() => setViewType("month")}
              className={`px-3 py-1 rounded ${
                viewType === "month"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewType("week")}
              className={`px-3 py-1 rounded ${
                viewType === "week"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Week
            </button>
          </div>

          {/* Data view type toggle */}
          <div className="flex space-x-2 ml-0 sm:ml-4">
            <button
              onClick={() => setDataViewType("team")}
              className={`px-3 py-1 rounded ${
                dataViewType === "team"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              disabled={user?.role === "employee"}
              title={
                user?.role === "employee"
                  ? "You don't have permission to view team data"
                  : ""
              }
            >
              Team
            </button>
            <button
              onClick={() => setDataViewType("individual")}
              className={`px-3 py-1 rounded ${
                dataViewType === "individual"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Individual
            </button>
          </div>
        </div>
      </div>

      {error && (
        <Alert variant="error" message={error} onClose={() => setError(null)} />
      )}
      
      {success && (
        <Alert variant="success" message={success} onClose={() => setSuccess(null)} />
      )}

      <Card>
        {!isLoading && (
          <div className="mb-4 p-2 bg-gray-50 rounded-md">
            <h3 className="font-medium text-gray-700">
              {dataViewType === "team"
                ? "Team Leave Summary"
                : "Individual Leave Summary"}
            </h3>
            <div className="flex flex-wrap gap-4 mt-2">
              <div className="flex items-center">
                <span className="text-sm font-medium">
                  {dataViewType === "team"
                    ? "Total Leave Requests:"
                    : "Your Leave Requests:"}
                </span>
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  {filteredLeaveRequests.length}
                </span>
              </div>

              {dataViewType === "team" && (
                <div className="flex items-center">
                  <span className="text-sm font-medium">Unique Employees:</span>
                  <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                    {new Set(filteredLeaveRequests.map((lr) => lr.userId)).size}
                  </span>
                </div>
              )}

              <div className="flex items-center">
                <span className="text-sm font-medium">Most Common Type:</span>
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  {filteredLeaveRequests.length > 0
                    ? Object.entries(
                        filteredLeaveRequests.reduce((acc, lr) => {
                          const type = lr.leaveType?.name || "Unknown";
                          acc[type] = (acc[type] || 0) + 1;
                          return acc;
                        }, {} as Record<string, number>)
                      ).sort((a, b) => b[1] - a[1])[0][0]
                    : "None"}
                </span>
              </div>

              {dataViewType === "individual" && (
                <div className="flex items-center">
                  <span className="text-sm font-medium">Days on Leave:</span>
                  <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                    {filteredLeaveRequests.reduce(
                      (total, lr) => total + lr.numberOfDays,
                      0
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="mb-6">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={navigatePrevious}
                  className="p-2 rounded hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={navigateToday}
                  className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
                >
                  Today
                </button>
                <button
                  onClick={handleRefresh}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 flex items-center"
                  title="Refresh leave data"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </button>
                <button
                  onClick={navigateNext}
                  className="p-2 rounded hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div>
                  <h2 className="text-xl font-medium">
                    {viewType === "month" ? getMonthName() : getWeekRange()}
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Last refreshed: {lastRefreshTime.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {dataViewType === "team" && (
                <>
                  <input
                    type="text"
                    placeholder="Search employee..."
                    className="px-3 py-1 border rounded w-full sm:w-auto"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <select
                    className="px-3 py-1 border rounded w-full sm:w-auto"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    <option value="">All Departments</option>
                    {departments.map((dept, index) => (
                      <option key={index} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>

                  <select
                    className="px-3 py-1 border rounded"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    <option value="">All Roles</option>
                    {roles.map((role, index) => (
                      <option key={index} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </>
              )}

              {dataViewType === "individual" && (
                <div className="px-3 py-1 bg-gray-100 rounded text-sm">
                  Showing your approved leave requests
                </div>
              )}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div>
            {/* Calendar Header - Days of Week */}
            <div className="grid grid-cols-7 gap-px bg-gray-200">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (day, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-2 text-center font-medium"
                  >
                    {day}
                  </div>
                )
              )}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-px bg-gray-200">
              {calendarDays.map((day, index) => {
                const dayLeaves = getLeavesForDay(day.date);
                const isToday = formatDate(day.date) === formatDate(new Date());

                return (
                  <div
                    key={index}
                    className={`bg-white min-h-[100px] ${
                      day.isCurrentMonth ? "text-gray-900" : "text-gray-400"
                    } ${isToday ? "ring-2 ring-primary-500 ring-inset" : ""} 
                    ${dayLeaves.length > 0 ? "relative" : ""}`}
                  >
                    <div className="p-1 flex flex-col h-full">
                      <div className="text-right p-1 font-semibold">
                        {day.date.getDate()}
                      </div>

                      {/* Availability indicator */}
                      {dayLeaves.length > 0 && (
                        <div className="absolute top-0 right-0 mt-1 mr-1">
                          <span
                            className={`inline-flex h-3 w-3 rounded-full ${
                              dayLeaves.length > 3
                                ? "bg-red-500"
                                : dayLeaves.length > 1
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                          ></span>
                        </div>
                      )}

                      <div className="flex-grow overflow-y-auto space-y-1 p-1">
                        {dayLeaves.map((leave) => {
                          const user = users?.find(
                            (u) => u.id === leave.userId
                          );
                          const leaveTypeName =
                            leave.leaveType?.name || "Leave";

                          // Different display for team vs individual view
                          if (dataViewType === "team") {
                            return (
                              <div
                                key={leave.id}
                                className={`text-xs p-1 rounded border ${getLeaveTypeColor(
                                  leaveTypeName
                                )}`}
                                title={`${user?.firstName} ${user?.lastName} - ${leaveTypeName}`}
                              >
                                <div className="truncate">
                                  {user?.firstName} {user?.lastName}
                                </div>
                                <div className="truncate">{leaveTypeName}</div>
                              </div>
                            );
                          } else {
                            // For individual view, focus on leave details
                            return (
                              <div
                                key={leave.id}
                                className={`text-xs p-1 rounded border ${getLeaveTypeColor(
                                  leaveTypeName
                                )}`}
                                title={`${leaveTypeName} - ${formatDate(
                                  new Date(leave.startDate)
                                )} to ${formatDate(new Date(leave.endDate))}`}
                              >
                                <div className="truncate font-medium">
                                  {leaveTypeName}
                                </div>
                                <div className="truncate text-xs opacity-75">
                                  {leave.numberOfDays}{" "}
                                  {leave.numberOfDays === 1 ? "day" : "days"}
                                </div>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Card>

      {/* Legend */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Leave Types">
          <div className="flex flex-wrap gap-2">
            {Object.entries(leaveTypeColors)
              .filter(([key]) => key !== "default")
              .map(([type, color]) => (
                <div key={type} className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded mr-1 ${color.split(" ")[0]}`}
                  ></div>
                  <span className="text-sm">{type}</span>
                </div>
              ))}
          </div>
        </Card>

        <Card
          title={
            dataViewType === "team"
              ? "Team Availability Indicators"
              : "Calendar Information"
          }
        >
          {dataViewType === "team" ? (
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <span className="inline-flex h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                <span className="text-sm">Low (1 person on leave)</span>
              </div>
              <div className="flex items-center">
                <span className="inline-flex h-3 w-3 rounded-full bg-yellow-500 mr-2"></span>
                <span className="text-sm">Medium (2-3 people on leave)</span>
              </div>
              <div className="flex items-center">
                <span className="inline-flex h-3 w-3 rounded-full bg-red-500 mr-2"></span>
                <span className="text-sm">
                  High (More than 3 people on leave)
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <div className="text-sm">
                <p className="mb-2">
                  This calendar shows your approved leave requests.
                </p>
                <p className="mb-2">
                  You can toggle between month and week views using the buttons
                  above.
                </p>
                {user?.role !== "employee" && (
                  <p>
                    Switch to Team view to see leave requests for your entire
                    team.
                  </p>
                )}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default LeaveCalendarPage;
