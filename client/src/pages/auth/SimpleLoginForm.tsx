import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthLayout from "../../components/layout/AuthLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";

const SimpleLoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("Admin@123456");

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setResult({
        status: response.status,
        data: response.data,
        message: "Login successful!",
      });

      // Store token and user in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
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
    <AuthLayout
      title="Simple Login Form"
      subtitle="A basic form to test login functionality"
    >
      <Card className="mb-6">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>

          <Button
            onClick={handleLogin}
            isLoading={isLoading}
            fullWidth
            className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500"
          >
            Log In
          </Button>
        </div>
      </Card>

      {error && (
        <Alert
          variant="error"
          message={error}
          onClose={() => setError(null)}
          className="mb-4"
        />
      )}

      {result && (
        <Card className="mb-6 bg-green-50 border-green-200">
          <h3 className="text-lg font-medium text-green-800 mb-2">
            {result.message || "Success"}
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
          to="/create-super-admin"
          className="text-sm font-medium text-primary-600 hover:text-primary-500"
        >
          Register New User
        </Link>
      </div>
    </AuthLayout>
  );
};

export default SimpleLoginForm;
