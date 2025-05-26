import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import MainLayout from "../layout/MainLayout";

interface ProtectedRouteProps {
  allowedRoles?: ("employee" | "manager" | "admin" | "hr" | "super_admin" | string)[];
  excludeRoles?: ("employee" | "manager" | "admin" | "hr" | "super_admin" | string)[];
  children?: React.ReactNode;
  checkCustomRoles?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  excludeRoles,
  children,
  checkCustomRoles = false,
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user exists
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user role is allowed
  if (allowedRoles) {
    console.log("ProtectedRoute - Checking access for path:", location.pathname);
    console.log("ProtectedRoute - User details:", {
      role: user.role,
      dashboardType: user.dashboardType,
      roleObj: user.roleObj
    });
    console.log("ProtectedRoute - Allowed roles:", allowedRoles);
    
    // Special case for super-admin-dashboard
    if (location.pathname === "/super-admin-dashboard" && user.dashboardType === "admin") {
      // Allow users with dashboardType "admin" to access super-admin-dashboard
      console.log("ProtectedRoute - Allowing access to super-admin-dashboard for dashboardType admin");
      // Continue to render the content
    } else {
      const isDirectlyAllowed = allowedRoles.includes(user.role);
      const hasCustomAdminRole = checkCustomRoles && 
        user.roleObj?.permissions?.includes('admin');
      
      if (!isDirectlyAllowed && !hasCustomAdminRole) {
        console.log("ProtectedRoute - User role not allowed:", user.role, "Allowed roles:", allowedRoles);
        return <Navigate to="/dashboard" replace />;
      }
    }
  }

  // Check if user role is excluded
  if (excludeRoles && excludeRoles.includes(user.role)) {
    console.log("ProtectedRoute - User role excluded:", user.role, "Excluded roles:", excludeRoles);
    
    if (user.role === "super_admin" || user.dashboardType === "super_admin") {
      return <Navigate to="/super-admin-dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }
  
  // Handle dashboard type redirects for dashboard path
  if (location.pathname === "/dashboard" && user) {
    const dashboardType = user.dashboardType || user.role;
    
    // For users with dashboardType "admin" or role "super_admin", redirect to super-admin-dashboard
    if (dashboardType === "super_admin" || dashboardType === "admin") {
      console.log("ProtectedRoute - Redirecting to super-admin-dashboard based on dashboardType:", dashboardType);
      return <Navigate to="/super-admin-dashboard" replace />;
    }
    
    // We don't need to redirect users with manager dashboard type but insufficient role permissions
    // They will be handled by the DashboardPage component which checks permissions
    // This prevents infinite redirect loops
  }
  
  console.log("ProtectedRoute - Rendering protected content for path:", location.pathname);

  // Render the protected content
  return <MainLayout>{children || <Outlet />}</MainLayout>;
};

export default ProtectedRoute;
