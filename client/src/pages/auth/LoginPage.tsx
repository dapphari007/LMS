import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginCredentials } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { LoginResponse } from "../../services/authService";
import AuthLayout from "../../components/layout/AuthLayout";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { getErrorMessage } from "../../utils/errorUtils";
import { FaGoogle, FaGithub, FaEnvelope, FaLock } from "react-icons/fa";

// Extend LoginCredentials to include rememberMe
interface ExtendedLoginCredentials extends LoginCredentials {
  rememberMe?: boolean;
}

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ExtendedLoginCredentials>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended destination from location state, or default to home
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data: ExtendedLoginCredentials): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Extract only the fields needed for login
      const loginData: LoginCredentials = {
        email: data.email,
        password: data.password
      };
      
      const response: LoginResponse = await login(loginData);

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

  const handleSocialLogin = (provider: "google" | "github"): void => {
    // Implement social login logic here
    console.log(`Logging in with ${provider}`);
    // This would typically call an API endpoint or use a library like Firebase Auth
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to continue"
    >
      {error && (
        <div className="animate-fadeIn">
          <Alert
            variant="error"
            message={error}
            onClose={() => setError(null)}
            className="mb-6"
          />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-slideUp">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className={`pl-10 block w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} 
                px-3 py-2 text-gray-900 placeholder-gray-400
                focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500`}
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className={`pl-10 block w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'} 
                px-3 py-2 text-gray-900 placeholder-gray-400
                focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500`}
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-colors"
              {...register("rememberMe")}
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700 hover:text-gray-900 transition-colors"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link
              to="/forgot-password"
              className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading || isSubmitting}
            className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 py-2.5 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
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
              className="flex items-center justify-center gap-2 transition-all duration-200 hover:bg-red-50 hover:border-red-300 shadow-sm"
            >
              <FaGoogle className="h-5 w-5 text-red-500" />
              <span>Google</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin("github")}
              className="flex items-center justify-center gap-2 transition-all duration-200 hover:bg-gray-800 hover:text-white hover:border-gray-800 shadow-sm"
            >
              <FaGithub className="h-5 w-5" />
              <span>GitHub</span>
            </Button>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
