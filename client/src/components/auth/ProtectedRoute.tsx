import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import MainLayout from "../layout/MainLayout";

interface ProtectedRouteProps {
  allowedRoles?: ("employee" | "manager" | "admin" | "hr" | "super_admin")[];
  excludeRoles?: ("employee" | "manager" | "admin" | "hr" | "super_admin")[];
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  excludeRoles,
  children,
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

  // Check role permissions if allowedRoles is provided
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    console.log("ProtectedRoute - User role not allowed:", user.role, "Allowed roles:", allowedRoles);
    return <Navigate to="/" replace />;
  }

  // Check excluded roles
  if (excludeRoles && user && excludeRoles.includes(user.role)) {
    console.log("ProtectedRoute - User role excluded:", user.role, "Excluded roles:", excludeRoles);
    // For super_admin, redirect to super admin dashboard
    if (user.role === "super_admin") {
      return <Navigate to="/super-admin-dashboard" replace />;
    }
    // For other excluded roles, redirect to home
    return <Navigate to="/" replace />;
  }
  
  console.log("ProtectedRoute - Rendering protected content for path:", location.pathname);

  // Render the protected content
  return <MainLayout>{children || <Outlet />}</MainLayout>;
};

export default ProtectedRoute;
