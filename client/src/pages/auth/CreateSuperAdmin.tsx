import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthLayout from "../../components/layout/AuthLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";

const CreateSuperAdmin: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const createSuperAdmin = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const superAdminData = {
      firstName: "Super",
      lastName: "Admin",
      email: "admin@example.com",
      password: "Admin@123456",
      phoneNumber: "+1234567890",
      address: "123 Admin St, City, Country",
      role: "super_admin",
      level: 4,
      gender: "male",
      isActive: true,
    };

    try {
      // Try to register a new user first
      const registrationData = {
        firstName: superAdminData.firstName,
        lastName: superAdminData.lastName,
        email: superAdminData.email,
        password: superAdminData.password,
        phoneNumber: superAdminData.phoneNumber,
        address: superAdminData.address,
        gender: superAdminData.gender,
      };

      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        registrationData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setResult({
        status: response.status,
        data: response.data,
        message:
          "User registered successfully! Note: You'll need database access to make this user a super admin.",
      });
    } catch (err: any) {
      // If we get a 409 (Conflict) error, the user already exists
      if (err.response && err.response.status === 409) {
        setResult({
          status: 200,
          message:
            "User already exists. You can try to log in with the credentials below.",
        });
      } else {
        setError(
          err.response
            ? `Error ${err.response.status}: ${JSON.stringify(
                err.response.data
              )}`
            : err.message || "An unknown error occurred"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Super Admin"
      subtitle="Create a default super admin account"
    >
      <Card className="mb-6">
        <div className="space-y-4">
          <p className="text-gray-700">
            Click the button below to register a user with the following
            credentials. Note: This will create a regular user. To make it a
            super admin, you'll need to update the database directly.
          </p>

          <div className="bg-gray-50 p-4 rounded-md">
            <dl className="divide-y divide-gray-200">
              <div className="py-3 grid grid-cols-3 gap-4">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="text-sm font-bold text-gray-900 col-span-2">
                  admin@example.com
                </dd>
              </div>
              <div className="py-3 grid grid-cols-3 gap-4">
                <dt className="text-sm font-medium text-gray-500">Password</dt>
                <dd className="text-sm font-bold text-gray-900 col-span-2">
                  Admin@123456
                </dd>
              </div>
            </dl>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Note: This will only work if the server is running and the API
                  is accessible.
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={createSuperAdmin}
            isLoading={isLoading}
            fullWidth
            className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500"
          >
            Register User
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
          {result.data && (
            <pre className="text-sm text-green-700 whitespace-pre-wrap overflow-auto max-h-60">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          )}
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
          to="/super-admin"
          className="text-sm font-medium text-primary-600 hover:text-primary-500"
        >
          Super Admin Login
        </Link>
      </div>
    </AuthLayout>
  );
};

export default CreateSuperAdmin;
