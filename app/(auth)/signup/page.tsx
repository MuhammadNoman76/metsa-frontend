"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  AlertCircle,
  Eye,
  EyeOff,
  User,
  Lock,
  Mail,
  Building,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle,
  Shield,
  Sun,
  Moon,
  Info,
  UserPlus,
} from "lucide-react";
import api from "@/lib/api";
import LoadingButton from "@/components/LoadingButton";
import { useToast } from "@/contexts/ToastContext";
import { useTheme } from "@/contexts/ThemeContext";
import { UserRole } from "@/types";

export default function SignupPage() {
  const router = useRouter();
  const toast = useToast();
  const { setTheme, resolvedTheme } = useTheme();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: UserRole.CUSTOMER,
    company: "",
    phone: "",
    address: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Username validation
    if (formData.username.length < 3) {
      errors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username =
        "Username can only contain letters, numbers, and underscores";
    }

    // Password validation
    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password =
        "Password must contain uppercase, lowercase, and numbers";
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    // Company validation for customers
    if (formData.role === UserRole.CUSTOMER && !formData.company.trim()) {
      errors.company = "Company name is required for customer accounts";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the validation errors");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const signupData: any = {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        role: formData.role,
      };

      // Add customer info if role is customer
      if (formData.role === UserRole.CUSTOMER) {
        signupData.customer_info = {
          company: formData.company,
          phone: formData.phone,
          address: formData.address,
        };
      }

      await api.post("/auth/signup", signupData);

      setSuccess(true);
      toast.success("Account created successfully!");

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      const axiosErr = err as { response?: { data?: { detail?: string } } };
      const msg =
        axiosErr?.response?.data?.detail || "Failed to create account";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-500">
        <div className="max-w-md w-full">
          <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl border border-gray-200/20 dark:border-gray-700/30 rounded-3xl shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Account Created Successfully!
            </h2>

            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p className="leading-relaxed">
                Your account has been created and is pending approval from our
                administrators.
              </p>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  You will receive an email notification once your account has
                  been reviewed and approved.
                </p>
              </div>

              <p className="text-sm">Redirecting to login page...</p>

              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium transition-colors duration-200"
              >
                Go to Login
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-500">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-blue-600/10 dark:to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 dark:from-emerald-600/10 dark:to-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        aria-label="Toggle theme"
      >
        {resolvedTheme === "dark" ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-gray-700" />
        )}
      </button>

      <div className="relative w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Image
            src="/metsa_logo.png"
            alt="Metsa Logo"
            width={180}
            height={50}
            className="mx-auto"
            priority
          />
          <h1 className="mt-8 text-4xl font-bold text-gray-900 dark:text-white">
            Create Your Account
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
            Join the document portal to get started
          </p>
        </div>

        {/* Signup Card */}
        <div className="relative">
          <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl"></div>
          <div className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl border border-gray-200/20 dark:border-gray-700/30 rounded-3xl shadow-2xl p-8 transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="relative overflow-hidden bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-2xl p-4 transition-all duration-300">
                  <div className="relative flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-red-900 dark:text-red-200 mb-1">
                        Registration Failed
                      </h3>
                      <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed">
                        {error}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Role Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, role: UserRole.CUSTOMER })
                    }
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.role === UserRole.CUSTOMER
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                    }`}
                  >
                    <User className="w-6 h-6 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                    <div className="font-medium text-gray-900 dark:text-white">
                      Customer
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Access and view documents
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, role: UserRole.EDITOR })
                    }
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.role === UserRole.EDITOR
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                    }`}
                  >
                    <Shield className="w-6 h-6 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
                    <div className="font-medium text-gray-900 dark:text-white">
                      Editor
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Manage and edit documents
                    </div>
                  </button>
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-900 dark:text-gray-100"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={`w-full h-14 pl-12 pr-4 bg-white/50 dark:bg-gray-800/50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 transition-all duration-300 ${
                        validationErrors.email
                          ? "border-red-500 dark:border-red-400"
                          : "border-gray-300 dark:border-gray-700"
                      }`}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  {validationErrors.email && (
                    <p className="text-xs text-red-500 dark:text-red-400">
                      {validationErrors.email}
                    </p>
                  )}
                </div>

                {/* Username Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="block text-sm font-semibold text-gray-900 dark:text-gray-100"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      id="username"
                      type="text"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                      className={`w-full h-14 pl-12 pr-4 bg-white/50 dark:bg-gray-800/50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 transition-all duration-300 ${
                        validationErrors.username
                          ? "border-red-500 dark:border-red-400"
                          : "border-gray-300 dark:border-gray-700"
                      }`}
                      placeholder="johndoe"
                      required
                    />
                  </div>
                  {validationErrors.username && (
                    <p className="text-xs text-red-500 dark:text-red-400">
                      {validationErrors.username}
                    </p>
                  )}
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Password Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-900 dark:text-gray-100"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className={`w-full h-14 pl-12 pr-12 bg-white/50 dark:bg-gray-800/50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 transition-all duration-300 ${
                        validationErrors.password
                          ? "border-red-500 dark:border-red-400"
                          : "border-gray-300 dark:border-gray-700"
                      }`}
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {validationErrors.password && (
                    <p className="text-xs text-red-500 dark:text-red-400">
                      {validationErrors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold text-gray-900 dark:text-gray-100"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className={`w-full h-14 pl-12 pr-12 bg-white/50 dark:bg-gray-800/50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 transition-all duration-300 ${
                        validationErrors.confirmPassword
                          ? "border-red-500 dark:border-red-400"
                          : "border-gray-300 dark:border-gray-700"
                      }`}
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {validationErrors.confirmPassword && (
                    <p className="text-xs text-red-500 dark:text-red-400">
                      {validationErrors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Customer Information (shown only for customers) */}
              {formData.role === UserRole.CUSTOMER && (
                <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Company Information
                  </h3>

                  <div className="space-y-4">
                    {/* Company Field */}
                    <div className="space-y-2">
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Building className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                        </div>
                        <input
                          id="company"
                          type="text"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company: e.target.value,
                            })
                          }
                          className={`w-full h-12 pl-12 pr-4 bg-white dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 transition-all duration-300 ${
                            validationErrors.company
                              ? "border-red-500 dark:border-red-400"
                              : "border-gray-300 dark:border-gray-700"
                          }`}
                          placeholder="ABC Corporation"
                          required={formData.role === UserRole.CUSTOMER}
                        />
                      </div>
                      {validationErrors.company && (
                        <p className="text-xs text-red-500 dark:text-red-400">
                          {validationErrors.company}
                        </p>
                      )}
                    </div>

                    {/* Phone and Address Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Phone Number
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Phone className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                          </div>
                          <input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            className="w-full h-12 pl-12 pr-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 transition-all duration-300"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <MapPin className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                          </div>
                          <input
                            id="address"
                            type="text"
                            value={formData.address}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                address: e.target.value,
                              })
                            }
                            className="w-full h-12 pl-12 pr-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 transition-all duration-300"
                            placeholder="123 Main St, City"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Info Message */}
              <div className="p-4 bg-blue-50/50 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-800/50 rounded-xl">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    <p className="font-medium mb-1">
                      Account Approval Required
                    </p>
                    <p className="text-xs leading-relaxed">
                      After signup, your account will need to be approved by an
                      administrator before you can access the system. You'll
                      receive an email notification once approved.
                    </p>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 mt-1 text-blue-600 dark:text-blue-500 bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-2 transition-all duration-200"
                />
                <label
                  htmlFor="terms"
                  className="ml-3 text-sm text-gray-700 dark:text-gray-300"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium"
                  >
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <LoadingButton
                type="submit"
                isLoading={isLoading}
                loadingText="Creating account..."
                size="lg"
                className="group relative w-full bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-500 dark:disabled:from-gray-600 dark:disabled:to-gray-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl dark:shadow-blue-500/25 dark:hover:shadow-blue-500/40"
                icon={
                  !isLoading ? (
                    <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  ) : undefined
                }
              >
                Create Account
              </LoadingButton>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
