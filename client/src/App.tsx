import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";

// Landing Page
import LandingPage from "./pages/LandingPage";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";

// Dashboard Pages
import DashboardPage from "./pages/dashboard/DashboardPage";

// Leave Pages
import MyLeavesPage from "./pages/leaves/MyLeavesPage";
import ApplyLeavePage from "./pages/leaves/ApplyLeavePage";
import TeamLeavesPage from "./pages/leaves/TeamLeavesPage";
import ViewLeaveRequestPage from "./pages/leaves/ViewLeaveRequestPage";
import LeaveCalendarPage from "./pages/leaves/LeaveCalendarPage";

// Profile Pages
import ProfilePage from "./pages/profile/ProfilePage";

// Admin Pages
import UsersPage from "./pages/admin/UsersPage";
import CreateUserPage from "./pages/admin/CreateUserPage";
import EditUserPage from "./pages/admin/EditUserPage";
import LeaveTypesPage from "./pages/admin/LeaveTypesPage";
import CreateLeaveTypePage from "./pages/admin/CreateLeaveTypePage";
import EditLeaveTypePage from "./pages/admin/EditLeaveTypePage";
import LeaveTypeConfigPage from "./pages/admin/LeaveTypeConfigPage";
import HolidaysPage from "./pages/admin/HolidaysPage";
import CreateHolidayPage from "./pages/admin/CreateHolidayPage";
import EditHolidayPage from "./pages/admin/EditHolidayPage";
import LeaveBalancesPage from "./pages/admin/LeaveBalancesPage";
import CreateApprovalWorkflowPage from "./pages/admin/CreateApprovalWorkflowPage";
import EditApprovalWorkflowPage from "./pages/admin/EditApprovalWorkflowPage";
import CreateWorkflowCategoryPage from "./pages/admin/CreateWorkflowCategoryPage";
import EditWorkflowCategoryPage from "./pages/admin/EditWorkflowCategoryPage";
import CreateApproverTypePage from "./pages/admin/CreateApproverTypePage";
import EditApproverTypePage from "./pages/admin/EditApproverTypePage";
import ApprovalManagementPage from "./pages/admin/ApprovalManagementPage";
import WorkflowLevelsPage from "./pages/admin/WorkflowLevelsPage";
import SuperAdminDashboardPage from "./pages/admin/SuperAdminDashboardPage";
import RolesPage from "./pages/admin/RolesPage";
import CreateRolePage from "./pages/admin/CreateRolePage";
import EditRolePage from "./pages/admin/EditRolePage";
import DepartmentsPage from "./pages/admin/DepartmentsPage";
import CreateDepartmentPage from "./pages/admin/CreateDepartmentPage";
import EditDepartmentPage from "./pages/admin/EditDepartmentPage";
import PositionsPage from "./pages/admin/PositionsPage";
import CreatePositionPage from "./pages/admin/CreatePositionPage";
import EditPositionPage from "./pages/admin/EditPositionPage";

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Define route structure for React Router v7
const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },

  // Protected Routes - All Users except super_admin
  {
    element: <ProtectedRoute allowedRoles={["employee", "manager", "admin", "team_lead", "hr"]} />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },

      {
        path: "/my-leaves",
        element: <MyLeavesPage />,
      },
      {
        path: "/apply-leave",
        element: <ApplyLeavePage />,
      },
      {
        path: "/leave-requests/:id",
        element: <ViewLeaveRequestPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },

  // Manager and Team Lead Routes
  {
    element: (
      <ProtectedRoute allowedRoles={["manager", "admin", "team_lead", "hr", "super_admin"]} checkCustomRoles={true} />
    ),
    children: [
      {
        path: "/team-leaves",
        element: <TeamLeavesPage />,
      },
    ],
  },

  // Leave Calendar Route (accessible to all roles)
  {
    element: (
      <ProtectedRoute
        allowedRoles={[
          "manager",
          "admin",
          "team_lead",
          "hr",
          "employee",
          "super_admin",
        ]}
      />
    ),
    children: [
      {
        path: "/leave-calendar",
        element: <LeaveCalendarPage />,
      },
    ],
  },

  // Super Admin Routes - Also accessible to users with dashboardType "admin"
  {
    path: "/super-admin-dashboard",
    element: (
      <ProtectedRoute allowedRoles={["super_admin", "employee", "manager", "admin", "team_lead", "hr"]}>
        <SuperAdminDashboardPage />
      </ProtectedRoute>
    ),
  },
  // Redirects for super admin dashboard
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["super_admin"]}>
        <Navigate to="/super-admin-dashboard" replace />
      </ProtectedRoute>
    ),
  },

  // Admin Routes
  {
    element: <ProtectedRoute allowedRoles={["super_admin", "admin"]} />,
    children: [
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/users/create",
        element: <CreateUserPage />,
      },
      {
        path: "/users/edit/:id",
        element: <EditUserPage />,
      },
      {
        path: "/leave-types",
        element: <LeaveTypesPage />,
      },
      {
        path: "/leave-types/create",
        element: <CreateLeaveTypePage />,
      },
      {
        path: "/leave-types/edit/:id",
        element: <EditLeaveTypePage />,
      },
      {
        path: "/leave-types/config",
        element: <LeaveTypeConfigPage />,
      },
      {
        path: "/holidays",
        element: <HolidaysPage />,
      },
      {
        path: "/holidays/create",
        element: <CreateHolidayPage />,
      },
      {
        path: "/holidays/edit/:id",
        element: <EditHolidayPage />,
      },
      {
        path: "/leave-balances",
        element: <LeaveBalancesPage />,
      },
      {
        path: "/approval-management",
        element: <ApprovalManagementPage />,
      },
      {
        path: "/approval-workflows",
        element: <Navigate to="/approval-management" replace />,
      },
      {
        path: "/approval-workflows/create",
        element: <CreateApprovalWorkflowPage />,
      },
      {
        path: "/approval-workflows/edit/:id",
        element: <EditApprovalWorkflowPage />,
      },
      {
        path: "/roles",
        element: <RolesPage />,
      },
      {
        path: "/roles/create",
        element: <CreateRolePage />,
      },
      {
        path: "/roles/edit/:id",
        element: <EditRolePage />,
      },
      {
        path: "/departments",
        element: <DepartmentsPage />,
      },
      {
        path: "/departments/create",
        element: <CreateDepartmentPage />,
      },
      {
        path: "/departments/edit/:id",
        element: <EditDepartmentPage />,
      },
      {
        path: "/positions",
        element: <PositionsPage />,
      },
      {
        path: "/positions/create",
        element: <CreatePositionPage />,
      },
      {
        path: "/positions/edit/:id",
        element: <EditPositionPage />,
      },
      {
        path: "/workflow-categories",
        element: <Navigate to="/approval-management?tab=categories" replace />,
      },
      {
        path: "/workflow-categories/create",
        element: <CreateWorkflowCategoryPage />,
      },
      {
        path: "/workflow-categories/edit/:id",
        element: <EditWorkflowCategoryPage />,
      },
      {
        path: "/approver-types",
        element: <Navigate to="/approval-management?tab=approverTypes" replace />,
      },
      {
        path: "/approver-types/create",
        element: <CreateApproverTypePage />,
      },
      {
        path: "/approver-types/edit/:id",
        element: <EditApproverTypePage />,
      },
      {
        path: "/workflow-levels",
        element: <Navigate to="/approval-management?tab=levels" replace />,
      },
    ],
  },

  // Fallback Route
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
