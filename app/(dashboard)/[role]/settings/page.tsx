"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/contexts/ToastContext";
import {
  Shield,
  User,
  Lock,
  Bell,
  Settings,
  Sun,
  Moon,
  Monitor,
  Check,
  FolderCog,
  Save,
  Loader2,
  AlertCircle,
  X,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Info,
} from "lucide-react";
import api from "@/lib/api";
import { UserRole } from "@/types";
import CategoryManagement from "@/components/CategoryManagement";

// Define notification settings type
type NotificationKey =
  | "emailNotifications"
  | "documentUpdates"
  | "systemAlerts";
type NotificationSettings = Record<NotificationKey, boolean>;

interface NotificationSetting {
  key: NotificationKey;
  label: string;
  description: string;
}

// Confirmation Dialog Component
const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  confirmButtonClass = "bg-blue-600 hover:bg-blue-700",
  icon: Icon = AlertCircle,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  confirmButtonClass?: string;
  icon?: any;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <button
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-800">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {message}
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-6 py-2.5 text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 shadow-sm ${confirmButtonClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

// Password strength validator
const validatePasswordStrength = (password: string) => {
  if (password.length < 8)
    return { valid: false, message: "Password must be at least 8 characters" };
  if (!/[A-Z]/.test(password))
    return { valid: false, message: "Password must contain uppercase letters" };
  if (!/[a-z]/.test(password))
    return { valid: false, message: "Password must contain lowercase letters" };
  if (!/[0-9]/.test(password))
    return { valid: false, message: "Password must contain numbers" };
  if (!/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password))
    return {
      valid: false,
      message: "Password must contain special characters",
    };
  return { valid: true, message: "Strong password" };
};

export default function SettingsPage() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [savingNotifications, setSavingNotifications] = useState(false);
  
  // Profile state
  const [profileData, setProfileData] = useState({
    email: user?.email || "",
    username: user?.username || "",
  });
  const [originalProfileData] = useState({
    email: user?.email || "",
    username: user?.username || "",
  });
  
  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Notifications state
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    documentUpdates: true,
    systemAlerts: true,
  });
  const [originalNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    documentUpdates: true,
    systemAlerts: true,
  });
  
  // Confirmation dialogs
  const [passwordConfirmDialog, setPasswordConfirmDialog] = useState(false);
  const [profileConfirmDialog, setProfileConfirmDialog] = useState(false);

  // Check if profile has changes
  const hasProfileChanges = 
    profileData.email !== originalProfileData.email ||
    profileData.username !== originalProfileData.username;

  // Check if notifications have changes
  const hasNotificationChanges = 
    JSON.stringify(notifications) !== JSON.stringify(originalNotifications);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hasProfileChanges) {
      toast.info("No changes to save");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Validate username
    if (profileData.username.length < 3) {
      toast.error("Username must be at least 3 characters long");
      return;
    }

    setProfileConfirmDialog(true);
  };

  const confirmProfileUpdate = async () => {
    setProfileConfirmDialog(false);
    setLoading(true);
    
    try {
      const response = await api.put(`/users/${user?.id}`, {
        email: profileData.email,
        username: profileData.username,
      });
      
      toast.success("Profile updated successfully!");
      
      // Update the original data to reflect saved state
      Object.assign(originalProfileData, profileData);
      
      // You might want to update the auth context here if needed
      // await refreshUserData();
      
    } catch (error: any) {
      console.error("Error updating profile:", error);
      const errorMessage = error.response?.data?.detail || "Failed to update profile";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate new password strength
    const passwordValidation = validatePasswordStrength(passwordData.newPassword);
    if (!passwordValidation.valid) {
      toast.error(passwordValidation.message);
      return;
    }
    
    // Check if passwords match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    
    // Check if new password is same as current
    if (passwordData.currentPassword === passwordData.newPassword) {
      toast.error("New password must be different from current password");
      return;
    }
    
    setPasswordConfirmDialog(true);
  };

  const confirmPasswordChange = async () => {
    setPasswordConfirmDialog(false);
    setLoading(true);
    
    try {
      await api.post("/auth/change-password", {
        current_password: passwordData.currentPassword,
        new_password: passwordData.newPassword,
      });
      
      toast.success("Password changed successfully! Please login with your new password.");
      
      // Clear the form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      
      // Reset visibility states
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
      
    } catch (error: any) {
      console.error("Error changing password:", error);
      
      const status = error.response?.status;
      const errorMessage = error.response?.data?.detail;
      
      if (status === 400) {
        if (errorMessage?.includes("current password")) {
          toast.error("Current password is incorrect");
        } else if (errorMessage?.includes("weak")) {
          toast.error("New password does not meet security requirements");
        } else {
          toast.error(errorMessage || "Invalid password data");
        }
      } else if (status === 401) {
        toast.error("Authentication failed. Please login again.");
      } else {
        toast.error(errorMessage || "Failed to change password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationsSave = async () => {
    if (!hasNotificationChanges) {
      toast.info("No changes to save");
      return;
    }

    setSavingNotifications(true);
    
    try {
      // Simulate API call - replace with your actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Notification preferences saved successfully!");
      
      // Update original state to reflect saved state
      Object.assign(originalNotifications, notifications);
      
    } catch (error: any) {
      console.error("Error saving notifications:", error);
      toast.error("Failed to save notification preferences");
    } finally {
      setSavingNotifications(false);
    }
  };

  // Add Categories tab only for super admin
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "appearance", label: "Appearance", icon: Sun },
    { id: "notifications", label: "Notifications", icon: Bell },
    ...(user?.is_super_admin
      ? [{ id: "categories", label: "Categories", icon: FolderCog }]
      : []),
    ...(user?.role === UserRole.ADMIN
      ? [{ id: "system", label: "System", icon: Settings }]
      : []),
  ];

  const themeOptions = [
    {
      value: "light" as const,
      label: "Light",
      icon: Sun,
      description: "Light theme with bright colors",
    },
    {
      value: "dark" as const,
      label: "Dark",
      icon: Moon,
      description: "Dark theme for reduced eye strain",
    },
    {
      value: "system" as const,
      label: "System",
      icon: Monitor,
      description: "Follow system preferences",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Modern Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Settings
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Manage your account and application preferences
                </p>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-full">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user?.username}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 text-left rounded-xl transition-all duration-200
                      ${
                        isActive
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 shadow-sm"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Profile Information
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Update your personal information and account details
                    </p>
                  </div>
                  <form
                    onSubmit={handleProfileUpdate}
                    className="p-6 space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                          Username
                        </label>
                        <input
                          type="text"
                          value={profileData.username}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              username: e.target.value,
                            })
                          }
                          disabled={user?.role !== UserRole.ADMIN && !user?.is_super_admin}
                          className="w-full h-12 px-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        />
                        {user?.role !== UserRole.ADMIN && !user?.is_super_admin && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            Only administrators can change usernames
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              email: e.target.value,
                            })
                          }
                          className="w-full h-12 px-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                        Account Role
                      </label>
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          <span className="font-medium text-gray-900 dark:text-white">
                            {user?.role}
                            {user?.is_super_admin && " (Super Admin)"}
                          </span>
                        </div>
                        <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                          Active
                        </div>
                      </div>
                    </div>

                    {hasProfileChanges && (
                      <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
                        <div className="flex items-center gap-2">
                          <Info className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                          <p className="text-sm text-yellow-700 dark:text-yellow-300">
                            You have unsaved changes
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        disabled={loading || !hasProfileChanges}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-200"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Security Settings
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Keep your account secure by updating your password
                    </p>
                  </div>
                  <form
                    onSubmit={handlePasswordChange}
                    className="p-6 space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              currentPassword: e.target.value,
                            })
                          }
                          required
                          placeholder="Enter your current password"
                          className="w-full h-12 px-4 pr-12 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            value={passwordData.newPassword}
                            onChange={(e) =>
                              setPasswordData({
                                ...passwordData,
                                newPassword: e.target.value,
                              })
                            }
                            required
                            placeholder="Enter new password"
                            className={`w-full h-12 px-4 pr-12 bg-gray-50 dark:bg-gray-800 border rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                              passwordData.newPassword &&
                              !validatePasswordStrength(passwordData.newPassword).valid
                                ? "border-red-500 dark:border-red-500"
                                : passwordData.newPassword &&
                                  validatePasswordStrength(passwordData.newPassword).valid
                                ? "border-green-500 dark:border-green-500"
                                : "border-gray-300 dark:border-gray-700"
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                          >
                            {showNewPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        {passwordData.newPassword && (
                          <div
                            className={`flex items-center gap-2 mt-2 text-xs ${
                              validatePasswordStrength(passwordData.newPassword).valid
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {validatePasswordStrength(passwordData.newPassword).valid ? (
                              <CheckCircle className="w-3.5 h-3.5" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5" />
                            )}
                            {validatePasswordStrength(passwordData.newPassword).message}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={passwordData.confirmPassword}
                            onChange={(e) =>
                              setPasswordData({
                                ...passwordData,
                                confirmPassword: e.target.value,
                              })
                            }
                            required
                            placeholder="Confirm new password"
                            className={`w-full h-12 px-4 pr-12 bg-gray-50 dark:bg-gray-800 border rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                              passwordData.confirmPassword &&
                              passwordData.newPassword !== passwordData.confirmPassword
                                ? "border-red-500 dark:border-red-500"
                                : passwordData.confirmPassword &&
                                  passwordData.newPassword === passwordData.confirmPassword
                                ? "border-green-500 dark:border-green-500"
                                : "border-gray-300 dark:border-gray-700"
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        {passwordData.confirmPassword && (
                          <div
                            className={`flex items-center gap-2 mt-2 text-xs ${
                              passwordData.newPassword === passwordData.confirmPassword
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {passwordData.newPassword === passwordData.confirmPassword ? (
                              <>
                                <CheckCircle className="w-3.5 h-3.5" />
                                Passwords match
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3.5 h-3.5" />
                                Passwords do not match
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                            Password Requirements:
                          </p>
                          <ul className="text-blue-700 dark:text-blue-300 space-y-1">
                            <li>• At least 8 characters long</li>
                            <li>• Contains uppercase and lowercase letters</li>
                            <li>• Contains numbers and special characters</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-200"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          <>
                            <Lock className="w-5 h-5" />
                            Update Password
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === "appearance" && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Appearance Settings
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Customize how the application looks and feels
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      {/* Theme Selection */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                          Theme
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {themeOptions.map((option) => {
                            const Icon = option.icon;
                            const isSelected = theme === option.value;
                            return (
                              <button
                                key={option.value}
                                onClick={() => {
                                  setTheme(option.value);
                                  toast.success(`Theme changed to ${option.label}`);
                                }}
                                className={`
                                  relative flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200
                                  ${
                                    isSelected
                                      ? "border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800"
                                  }
                                `}
                              >
                                {isSelected && (
                                  <div className="absolute top-3 right-3 w-6 h-6 bg-blue-600 dark:bg-blue-400 rounded-full flex items-center justify-center">
                                    <Check className="w-4 h-4 text-white" />
                                  </div>
                                )}
                                <Icon
                                  className={`w-8 h-8 mb-3 ${
                                    isSelected
                                      ? "text-blue-600 dark:text-blue-400"
                                      : "text-gray-600 dark:text-gray-400"
                                  }`}
                                />
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                                  {option.label}
                                </h4>
                                <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                                  {option.description}
                                </p>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="pt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Theme preference is automatically saved
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Notifications
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Manage how you receive notifications and updates
                    </p>
                  </div>
                  <div className="p-6 space-y-6">
                    {(
                      [
                        {
                          key: "emailNotifications" as const,
                          label: "Email Notifications",
                          description:
                            "Get notified about important updates via email",
                        },
                        {
                          key: "documentUpdates" as const,
                          label: "Document Updates",
                          description:
                            "Receive alerts when documents are modified",
                        },
                        {
                          key: "systemAlerts" as const,
                          label: "System Alerts",
                          description:
                            "Important system maintenance and security updates",
                        },
                      ] as const satisfies readonly NotificationSetting[]
                    ).map((setting) => (
                      <div
                        key={setting.key}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                      >
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                            {setting.label}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {setting.description}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            setNotifications({
                              ...notifications,
                              [setting.key]: !notifications[setting.key],
                            })
                          }
                          className={`
                            relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                            ${
                              notifications[setting.key]
                                ? "bg-blue-600"
                                : "bg-gray-300 dark:bg-gray-600"
                            }
                          `}
                        >
                          <span
                            className={`
                              inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow-sm
                              ${
                                notifications[setting.key]
                                  ? "translate-x-6"
                                  : "translate-x-1"
                              }
                            `}
                          />
                        </button>
                      </div>
                    ))}

                    {hasNotificationChanges && (
                      <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
                        <div className="flex items-center gap-2">
                          <Info className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                          <p className="text-sm text-yellow-700 dark:text-yellow-300">
                            You have unsaved notification preferences
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end pt-4">
                      <button
                        onClick={handleNotificationsSave}
                        disabled={savingNotifications || !hasNotificationChanges}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-200"
                      >
                        {savingNotifications ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5" />
                            Save Preferences
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Categories Tab - Only for Super Admin */}
            {activeTab === "categories" && user?.is_super_admin && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Category Management
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Configure document categories and organization
                    </p>
                  </div>
                  <div className="p-6">
                    <CategoryManagement />
                  </div>
                </div>
              </div>
            )}

            {/* System Tab */}
            {activeTab === "system" && user?.role === UserRole.ADMIN && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      System Configuration
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Configure system-wide settings and limitations
                    </p>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                          Max File Size (MB)
                        </label>
                        <input
                          type="number"
                          defaultValue="10"
                          className="w-full h-12 px-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                          Session Timeout (min)
                        </label>
                        <input
                          type="number"
                          defaultValue="1440"
                          className="w-full h-12 px-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        onClick={() => toast.info("System settings feature coming soon!")}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-all duration-200"
                      >
                        <Settings className="w-5 h-5" />
                        Apply Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Dialogs */}
      <ConfirmDialog
        isOpen={passwordConfirmDialog}
        onClose={() => setPasswordConfirmDialog(false)}
        onConfirm={confirmPasswordChange}
        title="Change Password"
        message="Are you sure you want to change your password? You will need to use the new password for your next login."
        confirmText="Change Password"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        icon={Lock}
      />

      <ConfirmDialog
        isOpen={profileConfirmDialog}
        onClose={() => setProfileConfirmDialog(false)}
        onConfirm={confirmProfileUpdate}
        title="Update Profile"
        message="Are you sure you want to update your profile information?"
        confirmText="Update Profile"
        confirmButtonClass="bg-blue-600 hover:bg-blue-700"
        icon={User}
      />
    </div>
  );
}
