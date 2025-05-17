import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { Link } from "react-router-dom";

interface LoginForm {
  email: string;
  password: string;
}

const LoginDebugger: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Make a direct API call to test the login endpoint
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setResult({
        status: response.status,
        data: response.data,
      });
    } catch (err: any) {
      setError(
        err.response
          ? `Error ${err.response.status}: ${JSON.stringify(err.response.data)}`
          : err.message || "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Login Debugger" subtitle="Test the login functionality">
      <Card className="mb-6">
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
              Test Login
            </Button>
          </div>
        </form>
      </Card>

      {error && (
        <Card className="mb-6 bg-red-50 border-red-200">
          <h3 className="text-lg font-medium text-red-800 mb-2">Error</h3>
          <pre className="text-sm text-red-700 whitespace-pre-wrap overflow-auto max-h-60">
            {error}
          </pre>
        </Card>
      )}

      {result && (
        <Card className="mb-6 bg-green-50 border-green-200">
          <h3 className="text-lg font-medium text-green-800 mb-2">
            Success (Status: {result.status})
          </h3>
          <pre className="text-sm text-green-700 whitespace-pre-wrap overflow-auto max-h-60">
            {JSON.stringify(result.data, null, 2)}
          </pre>
        </Card>
      )}

      <div className="flex justify-between">
        <Link
          to="/login"
          className="text-sm font-medium text-primary-600 hover:text-primary-500"
        >
          Back to Login
        </Link>
        <Link
          to="/super-admin-info"
          className="text-sm font-medium text-primary-600 hover:text-primary-500"
        >
          Get Super Admin Credentials
        </Link>
      </div>
    </AuthLayout>
  );
};

export default LoginDebugger;
