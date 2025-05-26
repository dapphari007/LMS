import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getHRDashboard, getEmployeeDashboard, getManagerDashboard } from "../../services/dashboardService";
import { getAllLeaveRequests } from "../../services/leaveRequestService";
import { useAuth } from "../../context/AuthContext";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Alert from "../../components/ui/Alert";
import { formatDate } from "../../utils/dateUtils";
import { Link } from "react-router-dom";

const HRDashboardPage: React.FC = () => {
  const { user } = useAuth(); // Get user object to check role
  const [error, setError] = useState<string | null>(null);
  
  // Debug log to check user role
  console.log("Current user:", user);

  // Mock data for fallback
  const getMockHRDashboardData = () => {
    console.log("Using mock HR dashboard data as fallback");
    return {
      pendingRequests: [],
      pendingCount: 0,
      approvedRequests: [],
      approvedCount: 0,
      teamAvailability: Array(7).fill(0).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return {
          date: formatDate(date),
          isWeekend: date.getDay() === 0 || date.getDay() === 6,
          isHoliday: false,
          totalUsers: 0,
          availableUsers: [],
          availableCount: 0,
          usersOnLeave: [],
          onLeaveCount: 0
        };
      }),
      upcomingHolidays: []
    };
  };
  
  // Mock data for employee dashboard fallback
  const getMockEmployeeDashboardData = () => {
    console.log("Using mock employee dashboard data as fallback");
    return {
      pendingRequests: [],
      pendingCount: 0,
      approvedRequests: [],
      approvedCount: 0,
      recentHistory: [],
      upcomingHolidays: [],
      leaveBalance: []
    };
  };

  // Fetch employee dashboard data first as it's most likely to succeed
  const { data: employeeDashboard, isLoading: isEmployeeLoading, error: employeeError } = useQuery({
    queryKey: ["employeeDashboard"],
    queryFn: async () => {
      try {
        console.log("Attempting to fetch employee dashboard data...");
        return await getEmployeeDashboard();
      } catch (error) {
        console.error("Error fetching employee dashboard data:", error);
        // Return mock data structure to prevent UI errors
        return getMockEmployeeDashboardData();
      }
    },
    retry: 2,
    retryDelay: 1000
  });

  // Determine which role-specific endpoints to try based on user permissions
  const hasHRRole = user?.role === "hr" || user?.role === "super_admin";
  const hasManagerRole = user?.role === "manager" || user?.role === "team_lead" || user?.role === "super_admin";
  const hasCustomPermission = user?.roleObj?.permissions?.includes('view_team_leaves') || 
                             user?.roleObj?.permissions?.includes('hr') ||
                             user?.roleObj?.permissions?.includes('manager');

  // Create a combined dashboard from available data sources
  const { data: hrDashboard, isLoading: isHRLoading, error: hrError } = useQuery({
    queryKey: ["hrDashboard"],
    queryFn: async () => {
      try {
        // Start with a base dashboard (either from employee data or mock)
        let baseDashboard = employeeDashboard || getMockEmployeeDashboardData();
        
        // Try to enhance with HR-specific data if user has HR role
        if (hasHRRole) {
          try {
            console.log("User has HR role, attempting to fetch HR dashboard data...");
            const hrData = await getHRDashboard();
            console.log("HR dashboard data fetched successfully");
            return hrData; // If HR data succeeds, use it directly
          } catch (hrError) {
            console.error("Error fetching HR dashboard data:", hrError);
            // Continue with fallbacks
          }
        }
        
        // Try to enhance with manager data if user has appropriate permissions
        if (hasManagerRole || hasCustomPermission) {
          try {
            console.log("Attempting to fetch manager dashboard data...");
            const managerData = await getManagerDashboard();
            
            // Combine with base dashboard
            return {
              ...baseDashboard,
              pendingRequests: managerData.pendingRequests || [],
              teamAvailability: managerData.teamAvailability || [],
              // Add other manager-specific fields as needed
            };
          } catch (managerError) {
            console.error("Error fetching manager dashboard data:", managerError);
            // Continue with base dashboard
          }
        }
        
        // If we get here, return the base dashboard with mock team data
        return {
          ...baseDashboard,
          pendingRequests: [],
          teamAvailability: Array(7).fill(0).map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i);
            return {
              date: formatDate(date),
              isWeekend: date.getDay() === 0 || date.getDay() === 6,
              isHoliday: false,
              totalUsers: 0,
              availableUsers: [],
              availableCount: 0,
              usersOnLeave: [],
              onLeaveCount: 0
            };
          })
        };
      } catch (error) {
        console.error("Error in HR dashboard query:", error);
        // Return a minimal dashboard to prevent UI errors
        return getMockHRDashboardData();
      }
    },
    // Always run this query, even if employee dashboard fails
    retry: 2,
    retryDelay: 1000
  });

  // Note: Employee dashboard data is already fetched above

  // Mock data for pending requests fallback
  const getMockPendingRequestsData = () => {
    console.log("Using mock pending requests data as fallback");
    return {
      leaveRequests: [],
      count: 0
    };
  };

  // Fetch all pending leave requests for HR review
  const { data: allPendingRequests, isLoading: isPendingLoading, error: pendingError } = useQuery({
    queryKey: ["allPendingRequests"],
    queryFn: async () => {
      try {
        console.log("Attempting to fetch pending leave requests...");
        return await getAllLeaveRequests({ status: "pending" });
      } catch (error) {
        console.error("Error fetching pending leave requests:", error);
        // Return mock data structure to prevent UI errors
        return getMockPendingRequestsData();
      }
    },
    retry: 2,
    retryDelay: 1000
  });

  const isLoading = isHRLoading || isPendingLoading || isEmployeeLoading;
  
  // Handle errors from queries
  React.useEffect(() => {
    // Clear any previous errors if all data is loaded successfully
    if (hrDashboard && employeeDashboard && allPendingRequests) {
      setError(null);
      return;
    }
    
    // Only show one error at a time, prioritizing the most important one
    if (hrError) {
      const errorMessage = (hrError as any).response?.data?.message || 
                          (hrError as Error).message || 
                          "Failed to load dashboard data";
      console.error("HR Dashboard Error Details:", hrError);
      setError(`HR Dashboard Error: ${errorMessage}. Using offline mode.`);
    } else if (employeeError) {
      const errorMessage = (employeeError as any).response?.data?.message || 
                          (employeeError as Error).message || 
                          "Failed to load employee dashboard data";
      console.error("Employee Dashboard Error Details:", employeeError);
      setError(`Employee Dashboard Error: ${errorMessage}. Using offline mode.`);
    } else if (pendingError) {
      const errorMessage = (pendingError as any).response?.data?.message || 
                          (pendingError as Error).message || 
                          "Failed to load pending requests";
      console.error("Pending Requests Error Details:", pendingError);
      setError(`Pending Requests Error: ${errorMessage}. Using offline mode.`);
    }
  }, [hrError, employeeError, pendingError, hrDashboard, employeeDashboard, allPendingRequests]);
  
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
      
      {/* Show offline mode notice if there are errors but we're still showing data */}
      {(hrError || employeeError || pendingError) && !isLoading && !error && (
        <Alert
          variant="warning"
          message="Some data couldn't be loaded. Showing limited information in offline mode."
          onClose={() => {}}
          className="mb-6"
        />
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        // Show data even if there are errors - we'll use fallback data
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
                          {balance.usedDays} / {balance.totalDays}
                        </p>
                        <p className="text-xs text-gray-500">Used</p>
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
