import React, { useState } from "react";
import { useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import {
  getEmployeeDashboard,
  getManagerDashboard,
} from "../../services/dashboardService";
import { useAuth } from "../../context/AuthContext";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Alert from "../../components/ui/Alert";
import { formatDate } from "../../utils/dateUtils";
import { Link } from "react-router-dom";
import HRDashboardPage from "./HRDashboardPage";

// Import types from the types file
import type { 
  EmployeeDashboard as ApiEmployeeDashboard,
  ManagerDashboard as ApiManagerDashboard
} from '../../types';

// Type definitions for dashboard data
interface LeaveType {
  id: string;
  name: string;
}

interface LeaveBalance {
  id: string;
  leaveType?: LeaveType;
  usedDays: number;
  pendingDays: number;
  totalDays: number;
  remainingDays?: number;
}

interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email?: string;
  department?: string;
  position?: string;
}

interface LeaveRequest {
  id: string;
  leaveType?: LeaveType;
  startDate: string;
  endDate: string;
  status: string;
  user?: User;
  numberOfDays?: number;
  reason?: string;
}

interface Holiday {
  id: string;
  name: string;
  date: string;
  description?: string;
}

interface TeamAvailability {
  date: string;
  isWeekend: boolean;
  isHoliday: boolean;
  availableCount: number;
  totalUsers: number;
  onLeaveCount: number;
  availableUsers?: { id: string; name: string }[];
  usersOnLeave?: { id: string; name: string }[];
}

// Map our simplified interfaces to the API interfaces
interface EmployeeDashboard {
  leaveBalance?: LeaveBalance[];
  pendingRequests?: LeaveRequest[];
  upcomingHolidays?: Holiday[];
  pendingCount?: number;
  approvedRequests?: LeaveRequest[];
  approvedCount?: number;
}

interface ManagerDashboard {
  pendingRequests?: LeaveRequest[];
  teamAvailability?: TeamAvailability[];
  pendingCount?: number;
  approvedRequests?: LeaveRequest[];
  approvedCount?: number;
  upcomingHolidays?: Holiday[];
}

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  
  // If user doesn't exist, show loading
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  
  // Determine dashboard type without state
  const dashboardType = user.dashboardType || user.role || 'employee';
  
  // Check if user has manager dashboard type but doesn't have appropriate role
  // If so, treat them as an employee to prevent API permission errors
  const hasManagerPermissions = ["manager", "team_lead", "super_admin", "hr"].includes(user.role);
  const isManager = dashboardType === "manager" && hasManagerPermissions;
  
  // Render HR dashboard if needed
  if (dashboardType === "hr") {
    return <HRDashboardPage />;
  }
  
  // Log dashboard access for debugging
  console.log("Dashboard access - Type:", dashboardType, "Role:", user.role, "Is Manager:", isManager);

  // Function to refresh dashboard data
  const refreshDashboard = () => {
    queryClient.invalidateQueries({ queryKey: ["employeeDashboard"] });
    if (isManager) {
      queryClient.invalidateQueries({ queryKey: ["managerDashboard"] });
    }
  };

  // Fetch dashboard data based on user role
  const { data: employeeDashboard, isLoading: isEmployeeLoading } = useQuery<ApiEmployeeDashboard, Error, EmployeeDashboard>({
    queryKey: ["employeeDashboard"],
    queryFn: getEmployeeDashboard,
    onError: (err: Error) => {
      setError(err.message || "Failed to load dashboard data");
    },
  } as UseQueryOptions<ApiEmployeeDashboard, Error, EmployeeDashboard>);

  const { data: managerDashboard, isLoading: isManagerLoading } = useQuery<ApiManagerDashboard, Error, ManagerDashboard>({
    queryKey: ["managerDashboard"],
    queryFn: getManagerDashboard,
    // Only enable this query if the user has manager permissions
    enabled: isManager,
    onError: (err: Error) => {
      console.error("Manager dashboard error:", err);
      // Don't show error to user, just silently fail and show employee dashboard
      // This prevents confusion when a user has manager dashboard type but not the role
      if (hasManagerPermissions) {
        setError(err.message || "Failed to load manager dashboard data");
      }
    },
  } as UseQueryOptions<ApiManagerDashboard, Error, ManagerDashboard>);

  const isLoading = isEmployeeLoading || (isManager && isManagerLoading);

  // Helper function to render leave status badge
  const renderStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
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
  
  // Helper function to render progress bar
  const renderProgressBar = (used: number, total: number) => {
    const percentage = Math.min(Math.round((used / total) * 100), 100);
    const bgColor = percentage > 75 ? 'bg-red-500' : percentage > 50 ? 'bg-yellow-500' : 'bg-green-500';
    
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 mb-1">
        <div 
          className={`h-2.5 rounded-full ${bgColor}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <button 
          onClick={refreshDashboard}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

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
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mb-4"></div>
            <p className="text-gray-600">Loading dashboard data...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Employee Dashboard */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card 
              title="Leave Balance" 
              className="hover:shadow-lg transition-shadow duration-300"
            >
              {employeeDashboard?.leaveBalance &&
              employeeDashboard.leaveBalance.length > 0 ? (
                <div className="space-y-6">
                  {employeeDashboard.leaveBalance.map((balance) => (
                    <div
                      key={balance.id}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-gray-800">{balance.leaveType?.name}</p>
                        <p className="text-sm font-bold text-primary-600">
                          {balance.usedDays} / {balance.totalDays}
                        </p>
                      </div>
                      
                      {renderProgressBar(balance.usedDays, balance.totalDays)}
                      
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Used: {balance.usedDays}</span>
                        <span>Pending: {balance.pendingDays}</span>
                        <span>Remaining: {balance.totalDays - balance.usedDays}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="text-gray-500">
                    No leave balances have been set by the administrator yet.
                  </p>
                </div>
              )}
            </Card>

            <Card 
              title="Pending Requests"
              className="hover:shadow-lg transition-shadow duration-300"
            >
              {employeeDashboard?.pendingRequests &&
              employeeDashboard.pendingRequests.length > 0 ? (
                <div className="space-y-4">
                  {employeeDashboard.pendingRequests.map((request) => (
                    <div
                      key={request.id}
                      className="border-b border-gray-200 pb-3 last:border-0 last:pb-0 hover:bg-gray-50 p-2 rounded transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-800">
                            {request.leaveType?.name}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
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
                <div className="py-6 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-500">No pending leave requests.</p>
                </div>
              )}
              <div className="mt-4 text-right">
                <Link
                  to="/my-leaves"
                  className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  View all requests
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </Card>

            <Card 
              title="Upcoming Holidays"
              className="hover:shadow-lg transition-shadow duration-300"
            >
              {employeeDashboard?.upcomingHolidays &&
              employeeDashboard.upcomingHolidays.length > 0 ? (
                <div className="space-y-4">
                  {employeeDashboard.upcomingHolidays.map((holiday) => (
                    <div
                      key={holiday.id}
                      className="border-b border-gray-200 pb-3 last:border-0 last:pb-0 hover:bg-gray-50 p-2 rounded transition-colors"
                    >
                      <p className="font-medium text-gray-800">{holiday.name}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(holiday.date)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-500">No upcoming holidays.</p>
                </div>
              )}
            </Card>
          </div>

          {/* Manager Dashboard - Only show if user has manager permissions and data loaded successfully */}
          {isManager && hasManagerPermissions && managerDashboard && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Team Management
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                <Card 
                  title="Team Leave Requests"
                  className="hover:shadow-lg transition-shadow duration-300"
                >
                  {managerDashboard?.pendingRequests &&
                  managerDashboard.pendingRequests.length > 0 ? (
                    <div className="space-y-4">
                      {managerDashboard.pendingRequests.map((request) => (
                        <div
                          key={request.id}
                          className="border-b border-gray-200 pb-3 last:border-0 last:pb-0 hover:bg-gray-50 p-2 rounded transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-800">
                                {request.user?.firstName}{" "}
                                {request.user?.lastName}
                              </p>
                              <p className="text-sm text-gray-500 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
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
                    <div className="py-6 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-500">
                        No pending team leave requests.
                      </p>
                    </div>
                  )}
                  <div className="mt-4 text-right">
                    <Link
                      to="/team-leaves"
                      className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
                    >
                      View all team requests
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </Card>

                <Card 
                  title="Team Availability"
                  className="hover:shadow-lg transition-shadow duration-300 md:col-span-2 xl:col-span-1"
                >
                  {managerDashboard?.teamAvailability &&
                  managerDashboard.teamAvailability.length > 0 ? (
                    <div className="space-y-4">
                      {managerDashboard.teamAvailability.map((day, index) => (
                        <div
                          key={index}
                          className="border-b border-gray-200 pb-3 last:border-0 last:pb-0 hover:bg-gray-50 p-2 rounded transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-800 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {formatDate(day.date)}
                              </p>
                              <p className="text-sm text-gray-500 ml-5">
                                {day.isWeekend
                                  ? "Weekend"
                                  : day.isHoliday
                                  ? "Holiday"
                                  : "Working Day"}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  {day.availableCount} / {day.totalUsers} available
                                </span>
                              </p>
                              {day.onLeaveCount > 0 && (
                                <p className="text-xs text-red-600 mt-1">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    {day.onLeaveCount} on leave
                                  </span>
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-6 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-500">
                        No team availability information.
                      </p>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
