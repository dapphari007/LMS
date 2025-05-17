import React from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import Card from "../../components/ui/Card";

const SuperAdminLoginInfo: React.FC = () => {
  return (
    <AuthLayout
      title="Super Admin Login Information"
      subtitle="Use these credentials to log in as a super admin"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Super Admin Credentials
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Use these credentials to log in to the super admin dashboard.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-4">
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
                  Admin@123
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
                  These are default credentials. For security reasons, please
                  change the password after logging in.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Link
              to="/login"
              className="text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              Regular Login
            </Link>
            <Link
              to="/create-super-admin"
              className="text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              Create Super Admin
            </Link>
            <Link
              to="/simple-login"
              className="text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              Simple Login Form
            </Link>
            <Link
              to="/super-admin"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Go to Super Admin Login
            </Link>
          </div>
        </div>
      </Card>
    </AuthLayout>
  );
};

export default SuperAdminLoginInfo;
