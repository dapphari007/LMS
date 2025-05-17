import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import SuperAdminLoginPage from "./pages/auth/SuperAdminLoginPage";
import SuperAdminLoginInfo from "./pages/auth/SuperAdminLoginInfo";
import LoginDebugger from "./pages/auth/LoginDebugger";
import CreateSuperAdmin from "./pages/auth/CreateSuperAdmin";
import SimpleLoginForm from "./pages/auth/SimpleLoginForm";

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
import ApprovalWorkflowsPage from "./pages/admin/ApprovalWorkflowsPage";
import CreateApprovalWorkflowPage from "./pages/admin/CreateApprovalWorkflowPage";
import EditApprovalWorkflowPage from "./pages/admin/EditApprovalWorkflowPage";
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
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/super-admin",
    element: <SuperAdminLoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/super-admin-info",
    element: <SuperAdminLoginInfo />,
  },
  {
    path: "/login-debug",
    element: <LoginDebugger />,
  },
  {
    path: "/create-super-admin",
    element: <CreateSuperAdmin />,
  },
  {
    path: "/simple-login",
    element: <SimpleLoginForm />,
  },

  // Protected Routes - All Users
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
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
      <ProtectedRoute allowedRoles={["manager", "admin", "team_lead", "hr", "super_admin"]} />
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

  // Super Admin Routes
  {
    path: "/super-admin-dashboard",
    element: (
      <ProtectedRoute allowedRoles={["super_admin"]}>
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
  {
    path: "/",
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
        key: "edit-leave-type",
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
        path: "/approval-workflows",
        element: <ApprovalWorkflowsPage />,
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
