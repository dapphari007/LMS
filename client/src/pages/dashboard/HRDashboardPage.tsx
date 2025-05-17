import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getManagerDashboard, getEmployeeDashboard } from "../../services/dashboardService";
import { getAllLeaveRequests } from "../../services/leaveRequestService";
import { getMyLeaveBalances } from "../../services/leaveBalanceService";
import { useAuth } from "../../context/AuthContext";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Alert from "../../components/ui/Alert";
import { formatDate } from "../../utils/dateUtils";
import { Link } from "react-router-dom";

const HRDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);

  // Fetch HR dashboard data (similar to manager dashboard)
  const { data: hrDashboard, isLoading: isHRLoading } = useQuery({
    queryKey: ["hrDashboard"],
    queryFn: getManagerDashboard,
    onError: (err: any) =>
      setError(err.message || "Failed to load dashboard data"),
  });

  // Fetch employee dashboard data for personal leave balances
  const { data: employeeDashboard, isLoading: isEmployeeLoading } = useQuery({
    queryKey: ["employeeDashboard"],
    queryFn: getEmployeeDashboard,
    onError: (err: any) =>
      setError(err.message || "Failed to load employee dashboard data"),
  });

  // Fetch all pending leave requests for HR review
  const { data: allPendingRequests, isLoading: isPendingLoading } = useQuery({
    queryKey: ["allPendingRequests"],
    queryFn: () => getAllLeaveRequests({ status: "pending" }),
    onError: (err: any) =>
      setError(err.message || "Failed to load pending requests"),
  });

  const isLoading = isHRLoading || isPendingLoading || isEmployeeLoading;
  
  // Debug log to see what data is being received
  console.log("HR Dashboard Data:", hrDashboard);
  console.log("Employee Dashboard Data:", employeeDashboard);
  console.log("Leave Balance:", employeeDashboard?.leaveBalance);

  // Helper function to render leave status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="warning">Pending</Badge>;
      case "approved":
        return <Badge variant="success">Approved</Badge>;
      case "rejected":
        return <Badge variant="danger">Rejected</Badge>;
      case "cancelled":
        return <Badge variant="default">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        HR Dashboard
      </h1>

      {error && (
        <Alert
          variant="error"
          message={error}
          onClose={() => setError(null)}
          className="mb-6"
        />
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* HR Dashboard */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card title="My Leave Balance">
              {employeeDashboard?.leaveBalance &&
              employeeDashboard.leaveBalance.length > 0 ? (
                <div className="space-y-4">
                  {employeeDashboard.leaveBalance.map((balance) => (
                    <div
                      key={balance.id}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{balance.leaveType?.name}</p>
                        <p className="text-sm text-gray-500">
                          Used: {balance.usedDays} | Pending:{" "}
                          {balance.pendingDays}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary-600">
                          {balance.remainingDays} / {balance.totalDays}
                        </p>
                        <p className="text-xs text-gray-500">Remaining</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 py-2">
                  No leave balances have been set by the administrator yet.
                </p>
              )}
              <div className="mt-4 text-right">
                <Link
                  to="/leave-balances"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  Manage all balances →
                </Link>
              </div>
            </Card>

            <Card title="All Pending Leave Requests">
              {allPendingRequests?.leaveRequests &&
              allPendingRequests.leaveRequests.length > 0 ? (
                <div className="space-y-4">
                  {allPendingRequests.leaveRequests
                    .slice(0, 5)
                    .map((request) => (
                      <div
                        key={request.id}
                        className="border-b border-gray-200 pb-3 last:border-0 last:pb-0"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">
                              {request.user?.firstName} {request.user?.lastName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {request.leaveType?.name}:{" "}
                              {formatDate(request.startDate)} -{" "}
                              {formatDate(request.endDate)}
                            </p>
                          </div>
                          {renderStatusBadge(request.status)}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-gray-500 py-2">No pending leave requests.</p>
              )}
              <div className="mt-4 text-right">
                <Link
                  to="/team-leaves"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  View all requests →
                </Link>
              </div>
            </Card>

            <Card title="Upcoming Holidays">
              {hrDashboard?.upcomingHolidays &&
              hrDashboard.upcomingHolidays.length > 0 ? (
                <div className="space-y-4">
                  {hrDashboard.upcomingHolidays.map((holiday) => (
                    <div
                      key={holiday.id}
                      className="border-b border-gray-200 pb-3 last:border-0 last:pb-0"
                    >
                      <p className="font-medium">{holiday.name}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(holiday.date)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 py-2">No upcoming holidays.</p>
              )}
              <div className="mt-4 text-right">
                <Link
                  to="/holidays"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  Manage holidays →
                </Link>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
            <Card title="Team Availability">
              {hrDashboard?.teamAvailability &&
              hrDashboard.teamAvailability.length > 0 ? (
                <div className="space-y-4">
                  {hrDashboard.teamAvailability.map((day, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 pb-3 last:border-0 last:pb-0"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{formatDate(day.date)}</p>
                          <p className="text-sm text-gray-500">
                            {day.isWeekend
                              ? "Weekend"
                              : day.isHoliday
                              ? "Holiday"
                              : "Working Day"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {day.availableCount} / {day.totalUsers} available
                          </p>
                          {day.onLeaveCount > 0 && (
                            <p className="text-xs text-red-600">
                              {day.onLeaveCount} on leave
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 py-2">
                  No team availability information.
                </p>
              )}
              <div className="mt-4 text-right">
                <Link
                  to="/leave-calendar"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  View leave calendar →
                </Link>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card title="Quick Actions">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/leave-calendar"
                className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex flex-col items-center justify-center text-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-500 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-medium">Leave Calendar</span>
                <span className="text-sm text-gray-500">
                  View team availability
                </span>
              </Link>

              <Link
                to="/team-leaves"
                className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors flex flex-col items-center justify-center text-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-500 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium">Approve Leaves</span>
                <span className="text-sm text-gray-500">
                  Review pending requests
                </span>
              </Link>

              <Link
                to="/leave-balances"
                className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors flex flex-col items-center justify-center text-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-purple-500 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span className="font-medium">Leave Balances</span>
                <span className="text-sm text-gray-500">
                  Manage employee balances
                </span>
              </Link>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default HRDashboardPage;
