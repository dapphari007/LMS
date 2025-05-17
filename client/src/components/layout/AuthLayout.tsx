import React from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">LMS</span>
              </div>
            </div>
          </Link>
          <h1 className="mt-6 text-3xl font-extrabold text-primary-600 tracking-tight">
            Leave Management System
          </h1>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">{title}</h2>
          {subtitle && (
            <p className="mt-2 text-sm text-gray-600 max-w-sm mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        <div className="mt-8 bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10 transform transition-all duration-300 hover:shadow-2xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
