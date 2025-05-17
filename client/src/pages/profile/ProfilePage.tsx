import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { UpdateProfileData, ChangePasswordData } from "../../types";
import { changePassword } from "../../services/authService";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { getErrorMessage } from "../../utils/errorUtils";

const ProfilePage: React.FC = () => {
  const { userProfile, updateUserProfile, refreshProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  // Profile form
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm<UpdateProfileData>({
    defaultValues: {
      firstName: userProfile?.firstName || "",
      lastName: userProfile?.lastName || "",
      phoneNumber: userProfile?.phoneNumber || "",
      address: userProfile?.address || "",
    },
  });

  // Password form
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
    watch,
  } = useForm<ChangePasswordData & { confirmPassword: string }>();

  const newPassword = watch("newPassword");

  // Handle profile update
  const onProfileSubmit = async (data: UpdateProfileData) => {
    setIsProfileLoading(true);
    setProfileError(null);
    setProfileSuccess(null);

    try {
      await updateUserProfile(data);
      setProfileSuccess("Profile updated successfully");
      await refreshProfile();
    } catch (err) {
      setProfileError(getErrorMessage(err));
    } finally {
      setIsProfileLoading(false);
    }
  };

  // Handle password change
  const onPasswordSubmit = async (
    data: ChangePasswordData & { confirmPassword: string }
  ) => {
    setIsPasswordLoading(true);
    setPasswordError(null);
    setPasswordSuccess(null);

    try {
      const { confirmPassword, ...passwordData } = data;
      await changePassword(passwordData);
      setPasswordSuccess("Password changed successfully");
      resetPassword();
    } catch (err) {
      setPasswordError(getErrorMessage(err));
    } finally {
      setIsPasswordLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">My Profile</h1>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === "profile"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
              onClick={() => setActiveTab("profile")}
            >
              Profile Information
            </button>
            <button
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === "password"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
              onClick={() => setActiveTab("password")}
            >
              Change Password
            </button>
          </nav>
        </div>
      </div>

      {activeTab === "profile" && (
        <Card>
          {profileError && (
            <Alert
              variant="error"
              message={profileError}
              onClose={() => setProfileError(null)}
              className="mb-6"
            />
          )}

          {profileSuccess && (
            <Alert
              variant="success"
              message={profileSuccess}
              onClose={() => setProfileSuccess(null)}
              className="mb-6"
            />
          )}

          <form
            onSubmit={handleProfileSubmit(onProfileSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Input
                  id="firstName"
                  label="First Name"
                  error={profileErrors.firstName?.message}
                  {...registerProfile("firstName", {
                    required: "First name is required",
                  })}
                />
              </div>
              <div>
                <Input
                  id="lastName"
                  label="Last Name"
                  error={profileErrors.lastName?.message}
                  {...registerProfile("lastName", {
                    required: "Last name is required",
                  })}
                />
              </div>
            </div>

            <div>
              <Input
                id="email"
                label="Email Address"
                value={userProfile?.email || ""}
                disabled
                readOnly
              />
              <p className="mt-1 text-sm text-gray-500">
                Email address cannot be changed
              </p>
            </div>

            <div>
              <Input
                id="phoneNumber"
                label="Phone Number"
                error={profileErrors.phoneNumber?.message}
                {...registerProfile("phoneNumber", {
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
                label="Address"
                error={profileErrors.address?.message}
                {...registerProfile("address")}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" isLoading={isProfileLoading}>
                Update Profile
              </Button>
            </div>
          </form>
        </Card>
      )}

      {activeTab === "password" && (
        <Card>
          {passwordError && (
            <Alert
              variant="error"
              message={passwordError}
              onClose={() => setPasswordError(null)}
              className="mb-6"
            />
          )}

          {passwordSuccess && (
            <Alert
              variant="success"
              message={passwordSuccess}
              onClose={() => setPasswordSuccess(null)}
              className="mb-6"
            />
          )}

          <form
            onSubmit={handlePasswordSubmit(onPasswordSubmit)}
            className="space-y-6"
          >
            <div>
              <Input
                id="currentPassword"
                type="password"
                label="Current Password"
                error={passwordErrors.currentPassword?.message}
                {...registerPassword("currentPassword", {
                  required: "Current password is required",
                })}
              />
            </div>

            <div>
              <Input
                id="newPassword"
                type="password"
                label="New Password"
                error={passwordErrors.newPassword?.message}
                {...registerPassword("newPassword", {
                  required: "New password is required",
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
                id="confirmPassword"
                type="password"
                label="Confirm New Password"
                error={passwordErrors.confirmPassword?.message}
                {...registerPassword("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" isLoading={isPasswordLoading}>
                Change Password
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};

export default ProfilePage;
