import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginCredentials } from "../../types";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { getErrorMessage } from "../../utils/errorUtils";

const SuperAdminLoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await login(data);
      
      // Check if the user is a super admin
      if (response.user && response.user.role === "super_admin") {
        // Redirect super admin to their special dashboard
        navigate("/super-admin-dashboard", { replace: true });
      } else {
        // If not a super admin, show error
        setError("Access denied. Only super administrators can log in here.");
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Super Admin Login"
      subtitle="Sign in to access the super administrator dashboard"
    >
      {error && (
        <Alert
          variant="error"
          message={error}
          onClose={() => setError(null)}
          className="mb-4"
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Input
            id="email"
            type="email"
            label="Email address"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
          />
        </div>

        <div>
          <Input
            id="password"
            type="password"
            label="Password"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
        </div>

        <div>
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500"
          >
            Sign in as Super Admin
          </Button>
        </div>
      </form>

      <div className="mt-6">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            This login page is restricted to super administrators only.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <Link
              to="/super-admin-info"
              className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
            >
              Need super admin credentials?
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SuperAdminLoginPage;