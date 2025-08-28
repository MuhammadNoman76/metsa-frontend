"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import Image from "next/image";
import {
  AlertCircle,
  Eye,
  EyeOff,
  User,
  Lock,
  ArrowRight,
  Sun,
  Moon,
  Info,
  XCircle,
  Clock,
  UserPlus,
  Mail,
  AtSign,
} from "lucide-react";
import LoadingButton from "@/components/LoadingButton";
import { useToast } from "@/contexts/ToastContext";
import { useTheme } from "@/contexts/ThemeContext";

export default function LoginPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState<"error" | "pending" | "rejected">(
    "error"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const toast = useToast();
  const { setTheme, resolvedTheme } = useTheme();

  // Check if input is email or username
  const isEmail = (input: string) => {
    return input.includes("@") && input.includes(".");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // The login function will accept either username or email
      await login(usernameOrEmail, password);
    } catch (err) {
      const axiosErr = err as {
        response?: { data?: { detail?: string }; status?: number };
      };
      const msg = axiosErr?.response?.data?.detail;
      const status = axiosErr?.response?.status;

      if (status === 403) {
        // Handle pending or rejected accounts
        if (msg?.includes("pending approval")) {
          setErrorType("pending");
          setError(
            "Your account is awaiting approval. You'll receive an email once approved."
          );
        } else if (msg?.includes("has been rejected")) {
          setErrorType("rejected");
          setError(msg);
        } else {
          setErrorType("error");
          setError(msg || "Access denied");
        }
      } else {
        setErrorType("error");
        const friendly =
          typeof msg === "string"
            ? msg
            : "Invalid credentials. Please check your username/email and password.";
        setError(friendly);
      }

      if (errorType === "error") {
        toast.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const getErrorIcon = () => {
    switch (errorType) {
      case "pending":
        return (
          <Clock className="w-5 h-5 text-amber-500 dark:text-amber-400 mt-0.5" />
        );
      case "rejected":
        return (
          <XCircle className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5" />
        );
      default:
        return (
          <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5" />
        );
    }
  };

  const getErrorStyles = () => {
    switch (errorType) {
      case "pending":
        return {
          container:
            "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50",
          title: "text-amber-900 dark:text-amber-200",
          text: "text-amber-700 dark:text-amber-300",
        };
      case "rejected":
        return {
          container:
            "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50",
          title: "text-red-900 dark:text-red-200",
          text: "text-red-700 dark:text-red-300",
        };
      default:
        return {
          container:
            "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50",
          title: "text-red-900 dark:text-red-200",
          text: "text-red-700 dark:text-red-300",
        };
    }
  };

  const getErrorTitle = () => {
    switch (errorType) {
      case "pending":
        return "Account Pending Approval";
      case "rejected":
        return "Account Rejected";
      default:
        return "Authentication Failed";
    }
  };

  // Dynamic icon based on input type
  const getInputIcon = () => {
    if (isEmail(usernameOrEmail)) {
      return (
        <Mail className="w-5 h-5 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors duration-200" />
      );
    }
    return (
      <User className="w-5 h-5 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors duration-200" />
    );
  };

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

      <div className="relative w-full max-w-md">
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
          <h1 className="mt-8 text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
            Welcome Back
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 transition-colors duration-300">
            Sign in to access your document portal
          </p>
        </div>

        {/* Login Card */}
        <div className="relative">
          <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl"></div>
          <div className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl border border-gray-200/20 dark:border-gray-700/30 rounded-3xl shadow-2xl p-8 transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div
                  className={`relative overflow-hidden border rounded-2xl p-4 transition-all duration-300 ${
                    getErrorStyles().container
                  }`}
                >
                  <div className="relative flex items-start gap-3">
                    {getErrorIcon()}
                    <div>
                      <h3
                        className={`text-sm font-semibold mb-1 ${
                          getErrorStyles().title
                        }`}
                      >
                        {getErrorTitle()}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed ${
                          getErrorStyles().text
                        }`}
                      >
                        {error}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Username/Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="usernameOrEmail"
                  className="block text-sm font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300"
                >
                  Username or Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    {getInputIcon()}
                  </div>
                  <input
                    id="usernameOrEmail"
                    type="text"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 transition-all duration-300 shadow-sm backdrop-blur-xl hover:bg-white/70 dark:hover:bg-gray-800/70"
                    placeholder="Username or email@example.com"
                    required
                    autoComplete="username email"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                  <AtSign className="w-3 h-3" />
                  You can sign in using either your username or email address
                </p>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300"
                >
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors duration-200" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 pl-12 pr-12 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 transition-all duration-300 shadow-sm backdrop-blur-xl hover:bg-white/70 dark:hover:bg-gray-800/70"
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 dark:text-blue-500 bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-2 transition-all duration-200"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300"
                  >
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Methods Info */}
              <div className="p-3 bg-blue-50/50 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-800/50 rounded-xl">
                <div className="flex items-center gap-2 text-xs text-blue-700 dark:text-blue-300">
                  <Info className="w-4 h-4 flex-shrink-0" />
                  <span>
                    You can sign in using your username or email address
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <LoadingButton
                type="submit"
                isLoading={isLoading}
                loadingText="Signing you in..."
                size="lg"
                className="group relative w-full bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-500 dark:disabled:from-gray-600 dark:disabled:to-gray-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl dark:shadow-blue-500/25 dark:hover:shadow-blue-500/40"
                icon={
                  !isLoading ? (
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  ) : undefined
                }
              >
                Sign In
              </LoadingButton>

              {/* Signup Link */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/70 dark:bg-gray-900/70 text-gray-600 dark:text-gray-400">
                    New to METSA?
                  </span>
                </div>
              </div>

              <Link
                href="/signup"
                className="group flex items-center justify-center gap-2 w-full px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200 shadow-sm"
              >
                <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                Create New Account
              </Link>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
            Need help?{" "}
            <a
              href="#"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium transition-colors duration-200"
            >
              Contact our support team
            </a>{" "}
            for assistance.
          </p>
        </div>
      </div>
    </div>
  );
}
