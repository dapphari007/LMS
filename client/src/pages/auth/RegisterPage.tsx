import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RegisterData } from "../../types";
import { register as registerUser } from "../../services/authService";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { getErrorMessage } from "../../utils/errorUtils";

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterData>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const password = watch("password");

  const onSubmit = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);

    try {
      await registerUser(data);
      navigate("/login", {
        state: { message: "Registration successful. Please login." },
      });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create a new account"
      subtitle="Or sign in if you already have an account"
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <Input
              id="firstName"
              label="First name"
              autoComplete="given-name"
              error={errors.firstName?.message}
              {...register("firstName", {
                required: "First name is required",
              })}
            />
          </div>

          <div>
            <Input
              id="lastName"
              label="Last name"
              autoComplete="family-name"
              error={errors.lastName?.message}
              {...register("lastName", {
                required: "Last name is required",
              })}
            />
          </div>
        </div>

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
            autoComplete="new-password"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, and one number",
              },
            })}
          />
        </div>

        <div>
          <Input
            id="phoneNumber"
            label="Phone number (optional)"
            autoComplete="tel"
            error={errors.phoneNumber?.message}
            {...register("phoneNumber", {
              pattern: {
                value: /^\+?[0-9]{10,15}$/,
                message: "Invalid phone number",
              },
            })}
          />
        </div>

        <div>
          <Input
            id="address"
            label="Address (optional)"
            autoComplete="street-address"
            error={errors.address?.message}
            {...register("address")}
          />
        </div>

        <div>
          <Select
            id="gender"
            label="Gender (optional)"
            error={errors.gender?.message}
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
            {...register("gender")}
          />
        </div>

        <div>
          <Button type="submit" fullWidth isLoading={isLoading}>
            Sign up
          </Button>
        </div>
      </form>

      <div className="mt-6">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
