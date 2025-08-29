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
        <Mail className="w-5 h-5 text-gray-400 dark:text-gray-500 group-focus-within:text-[#1A8B47] dark:group-focus-within:text-[#4FBF7C] transition-colors duration-200" />
      );
    }
    return (
      <User className="w-5 h-5 text-gray-400 dark:text-gray-500 group-focus-within:text-[#1A8B47] dark:group-focus-within:text-[#4FBF7C] transition-colors duration-200" />
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-500">
      {/* Enhanced METSA Background Pattern with geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary green gradient orbs */}
        <div className="absolute top-10 right-20 w-96 h-96 bg-gradient-radial from-[#1A8B47]/30 via-[#1A8B47]/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-radial from-[#4FBF7C]/25 via-[#4FBF7C]/10 to-transparent rounded-full blur-3xl"></div>
        
        {/* Secondary accent orbs */}
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-radial from-[#90C695]/20 via-[#90C695]/8 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-radial from-[#1A8B47]/15 via-transparent to-transparent rounded-full blur-2xl"></div>
        
        {/* Geometric accent shapes */}
        <div className="absolute top-20 left-1/3 w-32 h-32 bg-gradient-to-br from-[#1A8B47]/20 to-transparent transform rotate-45 blur-xl"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-gradient-to-br from-[#4FBF7C]/25 to-transparent transform rotate-12 blur-lg"></div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(26,139,71,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(26,139,71,0.03)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(rgba(79,191,124,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(79,191,124,0.02)_1px,transparent_1px)]"></div>
      </div>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
        aria-label="Toggle theme"
      >
        {resolvedTheme === "dark" ? (
          <Sun className="w-5 h-5 text-yellow-500 group-hover:rotate-180 transition-transform duration-300" />
        ) : (
          <Moon className="w-5 h-5 text-gray-700 group-hover:-rotate-12 transition-transform duration-300" />
        )}
      </button>

      <div className="relative w-full max-w-md z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="relative mx-auto w-[200px] h-[80px] mb-8 drop-shadow-lg">
            <Image
              src="/metsa_logo.png"
              alt="METSA Logo"
              fill
              className="object-contain filter drop-shadow-md"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-[#1A8B47] to-gray-900 dark:from-white dark:via-[#4FBF7C] dark:to-white bg-clip-text text-transparent transition-colors duration-300 mb-2">
            Welcome Back
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 transition-colors duration-300 font-medium">
            Access your underground tank solutions portal
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[#1A8B47] dark:text-[#4FBF7C] font-semibold">
            <Droplets className="w-4 h-4" />
            <span>Pioneering Excellence in Underground Tank Solutions</span>
          </div>
        </div>

        {/* Login Card */}
        <div className="relative group">
          {/* Card glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#1A8B47]/20 via-[#4FBF7C]/20 to-[#90C695]/20 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl border border-gray-200/40 dark:border-gray-700/40 rounded-3xl shadow-2xl p-8 transition-all duration-300">
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
                    className="w-full h-14 pl-12 pr-4 bg-white/60 dark:bg-gray-800/60 border-2 border-gray-300/50 dark:border-gray-700/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1A8B47] dark:focus:ring-[#4FBF7C] focus:border-[#1A8B47] dark:focus:border-[#4FBF7C] text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 transition-all duration-300 shadow-sm backdrop-blur-xl hover:bg-white/80 dark:hover:bg-gray-800/80 hover:border-[#1A8B47]/50 dark:hover:border-[#4FBF7C]/50"
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
                    <Lock className="w-5 h-5 text-gray-400 dark:text-gray-500 group-focus-within:text-[#1A8B47] dark:group-focus-within:text-[#4FBF7C] transition-colors duration-200" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 pl-12 pr-12 bg-white/60 dark:bg-gray-800/60 border-2 border-gray-300/50 dark:border-gray-700/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1A8B47] dark:focus:ring-[#4FBF7C] focus:border-[#1A8B47] dark:focus:border-[#4FBF7C] text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 transition-all duration-300 shadow-sm backdrop-blur-xl hover:bg-white/80 dark:hover:bg-gray-800/80 hover:border-[#1A8B47]/50 dark:hover:border-[#4FBF7C]/50"
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 dark:text-gray-500 hover:text-[#1A8B47] dark:hover:text-[#4FBF7C] transition-colors duration-200"
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
                    className="h-4 w-4 text-[#1A8B47] dark:text-[#4FBF7C] bg-white/60 dark:bg-gray-800/60 border-gray-300 dark:border-gray-600 rounded focus:ring-[#1A8B47] dark:focus:ring-[#4FBF7C] focus:ring-2 transition-all duration-200"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300"
                  >
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm font-semibold text-[#1A8B47] dark:text-[#4FBF7C] hover:text-[#0F5D2A] dark:hover:text-[#6FD293] transition-colors duration-200 underline-offset-4 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Security Info - METSA themed */}
              <div className="p-4 bg-gradient-to-r from-[#1A8B47]/10 via-[#4FBF7C]/10 to-[#90C695]/10 dark:from-[#1A8B47]/20 dark:via-[#4FBF7C]/20 dark:to-[#90C695]/20 border-2 border-[#1A8B47]/20 dark:border-[#4FBF7C]/30 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center gap-3 text-sm text-[#0F5D2A] dark:text-[#4FBF7C]">
                  <Shield className="w-5 h-5 flex-shrink-0" />
                  <span className="font-semibold">
                    Secure access to your tank management portal
                  </span>
                </div>
              </div>

              {/* Submit Button - Enhanced METSA Green */}
              <LoadingButton
                type="submit"
                isLoading={isLoading}
                loadingText="Signing you in..."
                size="lg"
                className="group relative w-full h-14 bg-gradient-to-r from-[#1A8B47] to-[#0F5D2A] hover:from-[#0F5D2A] hover:to-[#1A8B47] dark:from-[#1A8B47] dark:to-[#4FBF7C] dark:hover:from-[#4FBF7C] dark:hover:to-[#1A8B47] disabled:from-gray-400 disabled:to-gray-500 dark:disabled:from-gray-600 dark:disabled:to-gray-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] transform"
                icon={
                  !isLoading ? (
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
                  ) : undefined
                }
              >
                Sign In
              </LoadingButton>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-6 py-2 bg-white/80 dark:bg-gray-900/80 text-gray-600 dark:text-gray-400 font-semibold rounded-full backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                    New to METSA?
                  </span>
                </div>
              </div>

              {/* Signup Link - Enhanced METSA themed */}
              <Link
                href="/signup"
                className="group flex items-center justify-center gap-3 w-full h-14 px-6 py-3 bg-white dark:bg-gray-800 border-2 border-[#1A8B47]/40 dark:border-[#4FBF7C]/40 text-gray-700 dark:text-gray-300 font-bold text-lg rounded-2xl hover:bg-gradient-to-r hover:from-[#1A8B47]/10 hover:to-[#4FBF7C]/10 dark:hover:from-[#1A8B47]/20 dark:hover:to-[#4FBF7C]/20 hover:border-[#1A8B47] dark:hover:border-[#4FBF7C] transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm hover:scale-[1.02] transform"
              >
                <UserPlus className="w-6 h-6 text-[#1A8B47] dark:text-[#4FBF7C] group-hover:scale-110 transition-transform duration-200" />
                Create New Account
              </Link>
            </form>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="text-center mt-10 space-y-4">
          <div className="flex items-center justify-center gap-2 text-base font-semibold text-[#1A8B47] dark:text-[#4FBF7C]">
            <Droplets className="w-5 h-5" />
            <span>Innovating New Industry Standards</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300 font-medium">
            Need help?{" "}
            <a
              href="#"
              className="text-[#1A8B47] dark:text-[#4FBF7C] hover:text-[#0F5D2A] dark:hover:text-[#6FD293] font-bold transition-colors duration-200 underline-offset-4 hover:underline"
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