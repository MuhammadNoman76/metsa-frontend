"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
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

export default function SettingsPage() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    email: user?.email || "",
    username: user?.username || "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    documentUpdates: true,
    systemAlerts: true,
  });

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/users/${user?.id}`, {
        email: profileData.email,
        username: profileData.username,
      });
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/change-password", {
        current_password: passwordData.currentPassword,
        new_password: passwordData.newPassword,
      });
      alert("Password changed successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to change password");
    } finally {
      setLoading(false);
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
                          disabled={user?.role !== UserRole.ADMIN}
                          className="w-full h-12 px-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        />
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

                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-xl transition-all duration-200 disabled:cursor-not-allowed"
                      >
                        {loading ? "Updating..." : "Save Changes"}
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
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            currentPassword: e.target.value,
                          })
                        }
                        required
                        className="w-full h-12 px-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              newPassword: e.target.value,
                            })
                          }
                          required
                          className="w-full h-12 px-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              confirmPassword: e.target.value,
                            })
                          }
                          required
                          className="w-full h-12 px-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-medium rounded-xl transition-all duration-200 disabled:cursor-not-allowed"
                      >
                        {loading ? "Updating..." : "Update Password"}
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
                                onClick={() => setTheme(option.value)}
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

                      {/* Theme Preview */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                          Preview
                        </h3>
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-900 dark:text-white font-medium">
                                Sample Text
                              </span>
                              <span className="text-gray-600 dark:text-gray-400">
                                Secondary Text
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <div className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm">
                                Primary Button
                              </div>
                              <div className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg text-sm">
                                Secondary Button
                              </div>
                            </div>
                            <div className="p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                              <p className="text-gray-900 dark:text-white text-sm">
                                This is how content cards will appear with the
                                selected theme.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Theme preference is automatically saved
                        </p>
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

                    <div className="flex justify-end pt-4">
                      <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-all duration-200">
                        Save Preferences
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
                      <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-all duration-200">
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
    </div>
  );
}
