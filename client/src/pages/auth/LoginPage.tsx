import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginCredentials } from "../../types";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { getErrorMessage } from "../../utils/errorUtils";
import { FaGoogle, FaGithub } from "react-icons/fa";

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended destination from location state, or default to home
  const from = location.state?.from?.pathname || "/";

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
        // Navigate to the page the user was trying to access, or home
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // Implement social login logic here
    console.log(`Logging in with ${provider}`);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to continue"
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

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              {...register("rememberMe")}
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link
              to="/forgot-password"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500"
          >
            Sign in
          </Button>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin("google")}
              className="flex items-center justify-center gap-2"
            >
              <FaGoogle className="h-5 w-5" />
              <span>Google</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin("github")}
              className="flex items-center justify-center gap-2"
            >
              <FaGithub className="h-5 w-5" />
              <span>GitHub</span>
            </Button>
          </div>
        </div>
      </form>

      <div className="mt-6">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
            >
              Sign up
            </Link>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Super Administrator?{" "}
            <Link
              to="/super-admin"
              className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
            >
              Login here
            </Link>
            {" | "}
            <Link
              to="/super-admin-info"
              className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
            >
              Get credentials
            </Link>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Having trouble?{" "}
            <Link
              to="/login-debug"
              className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
            >
              Debug login
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
