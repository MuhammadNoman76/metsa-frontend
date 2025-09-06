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
  XCircle,
  Clock,
  UserPlus,
  Mail,
  AtSign,
  Droplets,
  Shield,
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
      await login(usernameOrEmail, password);
    } catch (err) {
      const axiosErr = err as {
        response?: { data?: { detail?: string }; status?: number };
      };
      const msg = axiosErr?.response?.data?.detail;
      const status = axiosErr?.response?.status;
  
      console.error("Login error:", { status, msg, err }); // Debug log
  
      if (status === 403) {
        // Handle pending, rejected, or deactivated accounts
        if (msg?.includes("pending approval")) {
          setErrorType("pending");
          setError("Your account is awaiting approval. You'll receive an email once approved.");
        } else if (msg?.includes("has been rejected")) {
          setErrorType("rejected");
          setError(msg);
        } else if (msg?.includes("deactivated")) {
          setErrorType("error");
          setError("Your account has been deactivated. Please contact support.");
        } else {
          setErrorType("error");
          setError(msg || "Access denied");
        }
      } else if (status === 401) {
        setErrorType("error");
        setError("Invalid username/email or password. Please check your credentials.");
      } else {
        setErrorType("error");
        const friendly = typeof msg === "string" ? msg : "Login failed. Please try again.";
        setError(friendly);
      }
  
      toast.error(error || "Login failed");
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
        <Mail className="w-5 h-5 text-gray-400 dark:text-gray-500 group-focus-within:text-[#1A8B47] dark:group-focus-within:text-[#4FBF7C] transition-colors duration-200" />
      );
    }
    return (
      <User className="w-5 h-5 text-gray-400 dark:text-gray-500 group-focus-within:text-[#1A8B47] dark:group-focus-within:text-[#4FBF7C] transition-colors duration-200" />
    );
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 bg-white dark:bg-gray-950">
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
        aria-label="Toggle theme"
      >
        {resolvedTheme === "dark" ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>

      <div className="relative w-full max-w-md z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative mx-auto w-[180px] h-[64px] mb-6">
            <Image
              src="/metsa_logo.png"
              alt="METSA Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Sign in to Metsa Portal
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Secure access to your Metsa portal
          </p>
        </div>

        {/* Login Card */}
        <div className="relative">
          <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div
                  className={`relative overflow-hidden border rounded-xl p-4 ${
                    getErrorStyles().container
                  }`}
                >
                  <div className="relative flex items-start gap-3">
                    {getErrorIcon()}
                    <div>
                      <h3
                        className={`text-sm font-medium mb-1 ${
                          getErrorStyles().title
                        }`}
                      >
                        {getErrorTitle()}
                      </h3>
                      <p className={`text-sm ${getErrorStyles().text}`}>
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
                    className="w-full h-12 pl-12 pr-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A8B47] focus:border-[#1A8B47] dark:focus:ring-[#1A8B47] dark:focus:border-[#1A8B47] text-gray-900 dark:text-gray-100 placeholder-gray-500"
                    placeholder="Username or email@example.com"
                    required
                    autoComplete="username email"
                  />
                </div>
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
                    <Lock className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 pl-12 pr-12 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A8B47] focus:border-[#1A8B47] dark:focus:ring-[#1A8B47] dark:focus:border-[#1A8B47] text-gray-900 dark:text-gray-100 placeholder-gray-500"
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
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
                    className="h-4 w-4 text-[#1A8B47] bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 rounded focus:ring-[#1A8B47] focus:ring-2"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 text-sm text-gray-700 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm font-medium text-[#1A8B47] hover:underline underline-offset-4"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <LoadingButton
                type="submit"
                isLoading={isLoading}
                loadingText="Signing you in..."
                size="lg"
                variant="primary"
                className="group relative w-full h-12 rounded-xl"
                icon={
                  !isLoading ? <ArrowRight className="w-5 h-5" /> : undefined
                }
              >
                Sign In
              </LoadingButton>

              {/* Divider */}
              <div className="my-4 h-px bg-gray-200 dark:bg-gray-800" />

              {/* Signup Link */}
              <Link
                href="/signup"
                className="group flex items-center justify-center gap-2 w-full h-12 px-4 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-800 dark:text-gray-200 hover:border-[#1A8B47]"
              >
                <UserPlus className="w-5 h-5 text-[#1A8B47]" />
                Create new account
              </Link>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
          Need help?{" "}
          <a href="#" className="text-[#1A8B47] hover:underline">
            Contact support
          </a>
        </div>
      </div>
    </div>
  );
}
