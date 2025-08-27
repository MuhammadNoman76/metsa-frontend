# Frontend Project Documentation

## eslint.config.mjs

```javascript
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;

```

## next-env.d.ts

```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

## next.config.ts

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: "export"' to allow dynamic routing
  // The app needs server-side capabilities for dynamic document IDs
};

module.exports = nextConfig;

```

## package.json

```json
{
  "name": "metsa-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "cross-env NODE_ENV=production next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.1.1",
    "@radix-ui/react-accordion": "^1.2.12",
    "@radix-ui/react-alert-dialog": "^1.1.15",
    "@radix-ui/react-aspect-ratio": "^1.1.7",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-checkbox": "^1.3.2",
    "@radix-ui/react-context-menu": "^2.2.16",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-dropdown-menu": "^2.1.15",
    "@radix-ui/react-hover-card": "^1.1.15",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-menubar": "^1.1.16",
    "@radix-ui/react-navigation-menu": "^1.2.13",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-radio-group": "^1.3.8",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slider": "^1.3.6",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.2.5",
    "@radix-ui/react-tabs": "^1.1.12",
    "@radix-ui/react-toast": "^1.2.14",
    "@radix-ui/react-toggle": "^1.1.10",
    "@radix-ui/react-toggle-group": "^1.1.11",
    "@radix-ui/react-tooltip": "^1.2.8",
    "@tanstack/react-query": "^5.85.3",
    "axios": "^1.10.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^4.1.0",
    "embla-carousel-react": "^8.6.0",
    "input-otp": "^1.4.2",
    "js-cookie": "^3.0.5",
    "lucide-react": "^0.525.0",
    "mammoth": "^1.10.0",
    "next": "15.4.1",
    "next-themes": "^0.4.6",
    "react": "19.1.0",
    "react-day-picker": "^9.8.1",
    "react-dom": "19.1.0",
    "react-resizable-panels": "^3.0.4",
    "recharts": "^3.1.2",
    "tailwind-merge": "^3.3.1",
    "vaul": "^1.1.2",
    "xlsx": "^0.18.5",
    "zod": "^4.0.5"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/js-cookie": "^3.0.6",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.4.16",
    "cross-env": "^10.0.0",
    "eslint": "^9",
    "eslint-config-next": "15.4.1",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.4.0",
    "typescript": "^5"
  }
}

```

## postcss.config.mjs

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

```

## tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "metsa-green": "#16a34a",
      },
    },
  },
  plugins: [],
};

```

## tsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["app/*"]
    },
    "typeRoots": ["./node_modules/@types"]
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    "tailwind.config.js"
  ],
  "exclude": ["node_modules"]
}

```

## app\globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    color-scheme: light;
  }

  .dark {
    color-scheme: dark;
  }
}

/* Smooth transitions only after page loads */
html.mounted * {
  @apply transition-colors duration-300;
}

```

## app\layout.tsx

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { QueryClientProvider } from "@/contexts/QueryClientProvider";
import { ToastProvider } from "@/contexts/ToastContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Metsa Document Portal",
  description: "Your trusted partner for industrial solutions",
};

// Theme initialization script - default to dark
const themeInitScript = `
  (function() {
    try {
      const theme = localStorage.getItem('theme') || 'dark';
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      const resolved = theme === 'system' ? systemTheme : theme;
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(resolved);
      document.documentElement.setAttribute('data-theme', resolved);
      document.documentElement.style.colorScheme = resolved;
    } catch (e) {
      // Default to dark if anything fails
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.style.colorScheme = 'dark';
    }
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${inter.className} bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100`}
      >
        <ThemeProvider>
          <QueryClientProvider>
            <ToastProvider>
              <AuthProvider>{children}</AuthProvider>
            </ToastProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

```

## app\loading.tsx

```typescript
import LoadingPage from "@/components/LoadingPage";

export default function RootLoading() {
  return <LoadingPage variant="root" />;
}

```

## app\page.tsx

```typescript
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Spinner from '@/components/Spinner';

export default function RootPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        // If user is already logged in, redirect directly to their documents
        router.replace(`/${user.role}/documents`);
      } else {
        // If not logged in, redirect to login page
        router.replace('/login');
      }
    }
  }, [user, isLoading, router]);

  // Show loading spinner while checking authentication
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <Spinner size={64} variant="ring" color="primary" className="mx-auto mb-4" />
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  );
}

```

## app\(auth)\layout.tsx

```typescript
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      {children}
    </div>
  );
}

```

## app\(auth)\loading.tsx

```typescript
import LoadingPage from "@/components/LoadingPage";

export default function AuthLoading() {
  return <LoadingPage variant="auth" />;
}

```

## app\(auth)\login\page.tsx

```typescript
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
} from "lucide-react";
import LoadingButton from "@/components/LoadingButton";
import { useToast } from "@/contexts/ToastContext";
import { useTheme } from "@/contexts/ThemeContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(username, password);
      toast.success("Signed in successfully");
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
          typeof msg === "string" ? msg : "Invalid username or password";
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

              {/* Username Field */}
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300"
                >
                  Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors duration-200" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 transition-all duration-300 shadow-sm backdrop-blur-xl hover:bg-white/70 dark:hover:bg-gray-800/70"
                    placeholder="Enter your username"
                    required
                    autoComplete="username"
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

```

## app\(auth)\signup\page.tsx

```typescript
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

```

## app\(dashboard)\layout.tsx

```typescript
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from './components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-metsa-green"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

```

## app\(dashboard)\loading.tsx

```typescript
import LoadingPage from "@/components/LoadingPage";

export default function DashboardLoading() {
  return <LoadingPage variant="dashboard" showProgressItems={true} />;
}

```

## app\(dashboard)\admin\users\page.tsx

```typescript
"use client";

import { useEffect, useMemo, useState } from "react";
import type { ElementType, ReactNode } from "react";
import {
  UserPlus,
  Edit,
  Trash2,
  Shield,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  X,
  Save,
  AlertCircle,
  Users,
  Mail,
  Calendar,
  Eye,
  EyeOff,
  ChevronDown,
  Check,
  Loader2,
  Grid,
  List,
} from "lucide-react";
import api from "@/lib/api";
import { User, UserRole } from "@/types";
import { format } from "date-fns";

/* Hook: auto-hide on scroll (down hides, up shows) */
function useAutoHideHeader(offsetPx = 24, minDelta = 6) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let lastY = window.scrollY || 0;
    let ticking = false;

    const onScroll = () => {
      const y = window.scrollY || 0;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const delta = y - lastY;
          if (Math.abs(delta) > minDelta) {
            if (delta > 0 && y > offsetPx) {
              setHidden(true);
            } else {
              setHidden(false);
            }
          }
          lastY = y;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offsetPx, minDelta]);

  return hidden;
}

/* Mobile-friendly Select (with Escape to close) */
const ModernSelect = ({
  value,
  onChange,
  options,
  placeholder,
  icon: Icon,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  icon?: ElementType;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="w-full h-11 sm:h-12 px-3 sm:px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-left flex items-center justify-between hover:border-blue-400 dark:hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Open select"
      >
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {Icon && (
            <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          )}
          <span
            className={
              selectedOption
                ? "text-gray-900 dark:text-white font-medium truncate"
                : "text-gray-500 dark:text-gray-400 truncate"
            }
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          <button
            className="fixed inset-0 z-30 cursor-default"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
            tabIndex={-1}
          />
          <div
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-40 max-h-64 overflow-auto"
            role="listbox"
          >
            {options.map((option, index) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                role="option"
                aria-selected={value === option.value}
                className={`w-full px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between group transition-colors duration-150 ${
                  index === 0 ? "rounded-t-xl" : ""
                } ${index === options.length - 1 ? "rounded-b-xl" : ""}`}
              >
                <span className="text-gray-900 dark:text-white font-medium">
                  {option.label}
                </span>
                {value === option.value && (
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

/* Toggle Switch */
const ModernToggle = ({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}) => {
  return (
    <div className="flex items-start justify-between p-4 sm:p-5 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200">
      <div className="flex-1 min-w-0 mr-4">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
          {label}
        </h4>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
          checked
            ? "bg-blue-600 dark:bg-blue-500"
            : "bg-gray-300 dark:bg-gray-600"
        }`}
        aria-pressed={checked}
        aria-label="Toggle"
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-200 ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

/* Loading Overlay */
const LoadingOverlay = ({ message }: { message: string }) => (
  <div className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4">
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-200 dark:border-gray-800 max-w-sm w-full">
      <div className="text-center space-y-4">
        <div className="relative w-12 h-12 mx-auto">
          <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-700 rounded-full" />
          <div className="absolute inset-0 border-4 border-blue-600 dark:border-blue-400 rounded-full border-t-transparent animate-spin" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Processing
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{message}</p>
        </div>
      </div>
    </div>
  </div>
);

/* Modal (Escape to close) */
const ModernModal = ({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-6 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-800 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

/* Confirm Dialog */
const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}) => {
  return (
    <ModernModal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-5 sm:space-y-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 dark:text-red-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {message}
          </p>
        </div>
        <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
          >
            Delete User
          </button>
        </div>
      </div>
    </ModernModal>
  );
};

/* Helpers */
const getRoleColor = (role: UserRole) => {
  switch (role) {
    case UserRole.ADMIN:
      return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800";
    case UserRole.EDITOR:
      return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800";
    case UserRole.CUSTOMER:
      return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";
    default:
      return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-700";
  }
};

/* Main Page */
export default function UsersManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // View mode (persisted)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  useEffect(() => {
    const stored = localStorage.getItem("users:viewMode");
    if (stored === "list" || stored === "grid") setViewMode(stored);
  }, []);
  useEffect(() => {
    localStorage.setItem("users:viewMode", viewMode);
  }, [viewMode]);

  // Auto-hide header
  const headerHidden = useAutoHideHeader(24, 6);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery), 250);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const [roleFilter, setRoleFilter] = useState<string>("all");

  // Create/Edit modals
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Confirm delete
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    userId: string;
    username: string;
  }>({ isOpen: false, userId: "", username: "" });

  // Selection
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Forms
  const [showPassword, setShowPassword] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: UserRole.CUSTOMER,
  });
  const [editUser, setEditUser] = useState({
    username: "",
    email: "",
    role: UserRole.CUSTOMER,
    is_active: true,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/users", newUser);
      setIsCreateDialogOpen(false);
      setNewUser({
        username: "",
        email: "",
        password: "",
        role: UserRole.CUSTOMER,
      });
      await fetchUsers();
    } catch (err) {
      console.error("Error creating user:", err);
      setError("Error creating user. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setEditUser({
      username: user.username,
      email: user.email,
      role: user.role,
      is_active: user.is_active,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setSaving(true);
    try {
      await api.put(`/users/${selectedUser.id}`, editUser);
      setIsEditDialogOpen(false);
      setSelectedUser(null);
      await fetchUsers();
    } catch (err) {
      console.error("Error updating user:", err);
      setError("Error updating user. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (userId: string, currentStatus: boolean) => {
    try {
      await api.put(`/users/${userId}`, { is_active: !currentStatus });
      await fetchUsers();
    } catch (err) {
      console.error("Error updating user status:", err);
      setError("Failed to update user status.");
    }
  };

  const handleDeleteUser = async () => {
    try {
      await api.delete(`/users/${confirmDialog.userId}`);
      setConfirmDialog({ isOpen: false, userId: "", username: "" });
      await fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Error deleting user. Please try again.");
    }
  };

  const roleOptions = useMemo(
    () => [
      { value: "all", label: "All Roles" },
      ...Object.values(UserRole).map((role) => ({
        value: role,
        label: role.charAt(0).toUpperCase() + role.slice(1),
      })),
    ],
    []
  );

  const filteredUsers = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    return users.filter((u) => {
      const matchesSearch =
        !q ||
        u.username.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q);
      const matchesRole = roleFilter === "all" || u.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, debouncedSearch, roleFilter]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto">
            <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-800 rounded-full" />
            <div className="absolute inset-0 border-4 border-blue-600 dark:border-blue-400 rounded-full border-t-transparent animate-spin" />
          </div>
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              Loading Users
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
              Please wait while we retrieve user data...
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* User Card (Grid) */
  const UserCard = ({ user }: { user: User }) => (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-4 sm:p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xl">
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate">
              {user.username}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {user.email}
            </p>
          </div>
        </div>
        {user.is_verified ? (
          <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
        ) : (
          <XCircle className="w-5 h-5 text-gray-500 flex-shrink-0" />
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border ${getRoleColor(
            user.role
          )}`}
        >
          <Shield className="w-3 h-3" />
          {user.role}
        </span>
        <button
          onClick={() => handleToggleActive(user.id, user.is_active)}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border transition-colors ${
            user.is_active
              ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
              : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800"
          }`}
        >
          {user.is_active ? (
            <CheckCircle className="w-3 h-3" />
          ) : (
            <XCircle className="w-3 h-3" />
          )}
          {user.is_active ? "Active" : "Inactive"}
        </button>
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
        <p>
          Last Login:{" "}
          {user.last_login
            ? format(new Date(user.last_login), "MMM dd, yyyy")
            : "Never"}
        </p>
        <p>Created: {format(new Date(user.created_at), "MMM dd, yyyy")}</p>
      </div>

      <div className="flex items-stretch gap-2 pt-2">
        <button
          onClick={() => handleEditClick(user)}
          className="flex-1 inline-flex items-center justify-center gap-2 h-9 px-4 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>
        {user.username === "admin" ? (
          <div className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 px-3 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-medium rounded-lg border border-amber-200 dark:border-amber-800">
            <Shield className="w-4 h-4" />
            Protected
          </div>
        ) : (
          <button
            onClick={() =>
              setConfirmDialog({
                isOpen: true,
                userId: user.id,
                username: user.username,
              })
            }
            className="flex-1 inline-flex items-center justify-center gap-2 h-9 px-4 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        )}
      </div>
    </div>
  );

  /* User Row (List) - Corrected Layout */
  const UserRow = ({ user }: { user: User }) => (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
      {/* LEFT: User Info */}
      <div className="flex items-center gap-4 min-w-0 flex-grow">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg">
            {user.username.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
            {user.username}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
            {user.email}
          </p>
        </div>
      </div>

      {/* RIGHT: Status, Dates, Actions */}
      <div className="flex items-center flex-wrap justify-end gap-x-4 gap-y-2">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border ${getRoleColor(
            user.role
          )}`}
        >
          <Shield className="w-3 h-3" />
          {user.role}
        </span>
        <button
          onClick={() => handleToggleActive(user.id, user.is_active)}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border transition-colors ${
            user.is_active
              ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
              : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800"
          }`}
        >
          {user.is_active ? (
            <CheckCircle className="w-3 h-3" />
          ) : (
            <XCircle className="w-3 h-3" />
          )}
          {user.is_active ? "Active" : "Inactive"}
        </button>
        {user.is_verified ? (
          <CheckCircle className="w-5 h-5 text-emerald-500" />
        ) : (
          <XCircle className="w-5 h-5 text-gray-500" />
        )}

        <div className="text-xs text-gray-500 dark:text-gray-400 flex flex-col items-end">
          <span>
            Last:{" "}
            {user.last_login
              ? format(new Date(user.last_login), "MMM dd, yyyy")
              : "N/A"}
          </span>
          <span>
            Created: {format(new Date(user.created_at), "MMM dd, yyyy")}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEditClick(user)}
            className="inline-flex items-center justify-center gap-1.5 h-9 px-4 border border-gray-300 dark:border-gray-700 bg-transparent text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          {user.username === "admin" ? (
            <div className="inline-flex items-center justify-center gap-1.5 h-9 px-4 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-medium rounded-lg border border-amber-200 dark:border-amber-800">
              <Shield className="w-4 h-4" />
              Protected
            </div>
          ) : (
            <button
              onClick={() =>
                setConfirmDialog({
                  isOpen: true,
                  userId: user.id,
                  username: user.username,
                })
              }
              className="inline-flex items-center justify-center gap-1.5 h-9 px-4 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {saving && <LoadingOverlay message="Saving your changes..." />}

      {/* Header (auto-hide on scroll) */}
      <div
        className={`bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 transition-transform duration-300 ease-out ${
          headerHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                  User Management
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {filteredUsers.length} users found
                </p>
              </div>
            </div>

            <div className="w-full lg:w-auto grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 border border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`h-9 sm:h-10 flex-1 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                  aria-pressed={viewMode === "grid"}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`h-9 sm:h-10 flex-1 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    viewMode === "list"
                      ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                  aria-pressed={viewMode === "list"}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => setIsCreateDialogOpen(true)}
                className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-4 sm:px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 shadow-sm"
              >
                <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Add User</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Content */}
      <main className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 sm:p-5 mb-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-100">
                  Error Occurred
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm mb-6 sm:mb-8">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Search & Filter
              </h2>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Search Users
                </label>
                <div className="relative">
                  <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="search"
                    placeholder="Search by username or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-11 sm:h-12 pl-10 sm:pl-12 pr-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 shadow-sm"
                    aria-label="Search users"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Filter by Role
                </label>
                <ModernSelect
                  value={roleFilter}
                  onChange={setRoleFilter}
                  options={roleOptions}
                  placeholder="All Roles"
                  icon={Shield}
                />
              </div>
            </div>
          </div>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="text-center py-14 sm:py-16">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {debouncedSearch || roleFilter !== "all"
                ? "No Matching Users"
                : "No Users Yet"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 sm:text-base">
              {debouncedSearch || roleFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Get started by creating your first user account."}
            </p>
            {!debouncedSearch && roleFilter === "all" && (
              <button
                onClick={() => setIsCreateDialogOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <UserPlus className="w-5 h-5" />
                Create First User
              </button>
            )}
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredUsers.map((u) => (
              <UserCard key={u.id} user={u} />
            ))}
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {filteredUsers.map((u) => (
              <UserRow key={u.id} user={u} />
            ))}
          </div>
        )}
      </main>

      {/* Create User Modal */}
      <ModernModal
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        title="Create New User"
      >
        <form onSubmit={handleCreateUser} className="space-y-5 sm:space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-900 dark:text-white"
            >
              Username<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              id="username"
              type="text"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              placeholder="john_doe"
              required
              className="w-full h-11 sm:h-12 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-900 dark:text-white"
            >
              Email<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              placeholder="john@example.com"
              required
              className="w-full h-11 sm:h-12 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-900 dark:text-white"
            >
              Password<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                placeholder="••••••••"
                required
                className="w-full h-11 sm:h-12 px-4 pr-12 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white">
              Role<span className="text-red-500 ml-1">*</span>
            </label>
            <ModernSelect
              value={newUser.role}
              onChange={(value) =>
                setNewUser({ ...newUser, role: value as UserRole })
              }
              options={Object.values(UserRole).map((role) => ({
                value: role,
                label: role.charAt(0).toUpperCase() + role.slice(1),
              }))}
              placeholder="Select role"
              icon={Shield}
            />
          </div>

          <div className="flex flex-col sm:flex-row-reverse gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Create User
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsCreateDialogOpen(false)}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
          </div>
        </form>
      </ModernModal>

      {/* Edit User Modal */}
      <ModernModal
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        title="Edit User"
      >
        <form onSubmit={handleUpdateUser} className="space-y-5 sm:space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="edit-username"
              className="block text-sm font-semibold text-gray-900 dark:text-white"
            >
              Username<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              id="edit-username"
              type="text"
              value={editUser.username}
              onChange={(e) =>
                setEditUser({ ...editUser, username: e.target.value })
              }
              required
              className="w-full h-11 sm:h-12 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="edit-email"
              className="block text-sm font-semibold text-gray-900 dark:text-white"
            >
              Email<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              id="edit-email"
              type="email"
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
              required
              className="w-full h-11 sm:h-12 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white">
              Role<span className="text-red-500 ml-1">*</span>
            </label>
            <ModernSelect
              value={editUser.role}
              onChange={(value) =>
                setEditUser({ ...editUser, role: value as UserRole })
              }
              options={Object.values(UserRole).map((role) => ({
                value: role,
                label: role.charAt(0).toUpperCase() + role.slice(1),
              }))}
              placeholder="Select role"
              icon={Shield}
            />
          </div>

          <ModernToggle
            checked={editUser.is_active}
            onChange={(checked) =>
              setEditUser({ ...editUser, is_active: checked })
            }
            label="Account Status"
            description="Enable or disable user account access."
          />

          <div className="flex flex-col sm:flex-row-reverse gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Update User
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsEditDialogOpen(false)}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
          </div>
        </form>
      </ModernModal>

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() =>
          setConfirmDialog({ isOpen: false, userId: "", username: "" })
        }
        onConfirm={handleDeleteUser}
        title="Delete User Account"
        message={`Are you sure you want to permanently delete the user "${confirmDialog.username}"? This action cannot be undone.`}
      />
    </div>
  );
}

```

## app\(dashboard)\components\Sidebar.tsx

```typescript
"use client";

import Link from "next/link";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  FileText,
  Users,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  UserCheck,
} from "lucide-react";
import { UserRole } from "@/types";

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const queryClient = useQueryClient();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Load/persist collapsed state for desktop
  useEffect(() => {
    const stored = localStorage.getItem("sidebar:collapsed");
    if (stored === "1") setIsCollapsed(true);
  }, []);
  useEffect(() => {
    localStorage.setItem("sidebar:collapsed", isCollapsed ? "1" : "0");
  }, [isCollapsed]);

  // Close mobile menu on route change and on escape key
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Close mobile drawer on large screens
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (!user) return null;

  const role: UserRole = (user?.role as UserRole) ?? UserRole.CUSTOMER;

  const navigation = [
    {
      name: "Documents",
      href: `/${role}/documents`,
      icon: FileText,
      roles: [UserRole.ADMIN, UserRole.EDITOR, UserRole.CUSTOMER],
    },
    {
      name: "Users",
      href: `/${role}/users`,
      icon: Users,
      roles: [UserRole.ADMIN],
    },
    {
      name: "Approvals",
      href: `/${role}/approvals`,
      icon: UserCheck,
      roles: [UserRole.ADMIN, UserRole.EDITOR],
    },
    {
      name: "Notifications",
      href: `/${role}/notifications`,
      icon: Bell,
      roles: [UserRole.ADMIN, UserRole.EDITOR, UserRole.CUSTOMER],
    },
    {
      name: "Settings",
      href: `/${role}/settings`,
      icon: Settings,
      roles: [UserRole.ADMIN, UserRole.EDITOR, UserRole.CUSTOMER],
    },
  ];

  const filteredNavigation = navigation.filter((item) =>
    item.roles.includes(role)
  );

  const toggleCollapse = () => setIsCollapsed((c) => !c);
  const toggleMobile = () => setIsMobileOpen((o) => !o);
  const handleLinkClick = () => setIsMobileOpen(false);

  const isActivePath = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Mobile hamburger button (hidden while drawer is open) */}
      {!isMobileOpen && (
        <button
          type="button"
          onClick={toggleMobile}
          aria-label="Open menu"
          aria-expanded={false}
          className={cn(
            "lg:hidden fixed top-3 left-3 z-[60] inline-flex items-center justify-center rounded-lg",
            "bg-gray-900 text-white shadow-lg hover:bg-gray-800",
            "p-2 transition-colors duration-200"
          )}
        >
          <Menu size={22} />
        </button>
      )}

      {/* Mobile overlay */}
      {isMobileOpen && (
        <button
          aria-label="Close menu overlay"
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:relative inset-y-0 left-0 z-50 flex flex-col",
          "bg-gradient-to-b from-gray-950 to-gray-900",
          "text-white shadow-2xl transition-transform duration-300 ease-out",
          // Desktop widths
          isCollapsed ? "lg:w-16" : "lg:w-64",
          // Mobile drawer behavior
          isMobileOpen
            ? "translate-x-0 w-72"
            : "-translate-x-full lg:translate-x-0",
          // Prevent click-through issues on mobile when closed
          isMobileOpen
            ? "pointer-events-auto"
            : "pointer-events-none lg:pointer-events-auto"
        )}
        style={{ willChange: "transform" }}
      >
        {/* Header with logo and controls */}
        <div
          className={cn(
            "flex items-center justify-between",
            "px-3 sm:px-4 py-3 border-b border-white/10",
            "h-[60px]"
          )}
        >
          {/* Hide logo entirely when collapsed */}
          {!isCollapsed ? (
            <Link
              href={`/${role}/documents`}
              onClick={handleLinkClick}
              className={cn(
                "flex items-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
                "gap-2"
              )}
              aria-label="Go to Documents"
            >
              <div
                className={cn(
                  "flex items-center justify-center",
                  "rounded-md bg-white/5 p-1.5"
                )}
              >
                <Image
                  src="/metsa_logo.png"
                  alt="Metsä"
                  width={32}
                  height={32}
                  priority
                  className="h-7 w-auto object-contain"
                />
              </div>
              <span className="text-sm font-semibold tracking-wide">
                Dashboard
              </span>
            </Link>
          ) : (
            <div aria-hidden className="w-6 h-6" />
          )}

          {/* Mobile close (only visible when drawer is open on mobile) */}
          {isMobileOpen && (
            <button
              type="button"
              onClick={toggleMobile}
              aria-label="Close menu"
              className="lg:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>
          )}

          {/* Desktop collapse */}
          <button
            type="button"
            onClick={toggleCollapse}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-pressed={isCollapsed}
            className="hidden lg:inline-flex p-2 rounded-md hover:bg-white/10 transition-colors"
          >
            <Menu size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 sm:px-3 py-3 space-y-1 overflow-y-auto">
          {filteredNavigation.map((item) => {
            const Icon = item.icon;
            const active = isActivePath(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                onMouseEnter={() => {
                  if (item.name === "Documents") {
                    queryClient.prefetchQuery({
                      queryKey: [
                        "documents",
                        {
                          page: 1,
                          pageSize: 20,
                          search: "",
                          category: "all",
                          visibility: "all",
                        },
                      ],
                      queryFn: async () =>
                        (await import("@/lib/api")).default
                          .get("/documents?skip=0&limit=20")
                          .then((r) => r.data),
                      staleTime: 60_000,
                    });
                  }
                  if (item.name === "Approvals") {
                    queryClient.prefetchQuery({
                      queryKey: ["pendingUsers"],
                      queryFn: async () =>
                        (await import("@/lib/api")).default
                          .get("/users/pending")
                          .then((r) => r.data),
                      staleTime: 30_000,
                    });
                  }
                }}
                className={cn(
                  "group relative flex items-center rounded-lg",
                  "px-2.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md shadow-emerald-600/20"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                )}
                title={isCollapsed ? item.name : undefined}
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 shrink-0",
                    isCollapsed ? "mx-auto" : "mr-3",
                    active
                      ? "scale-110"
                      : "group-hover:scale-105 transition-transform"
                  )}
                />
                <span
                  className={cn("truncate", isCollapsed ? "sr-only" : "inline")}
                >
                  {item.name}
                </span>
                {active && !isCollapsed && (
                  <span className="absolute right-2 inline-block h-2 w-2 rounded-full bg-white/90" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer: user + logout */}
        <div className="border-t border-white/10 p-2 sm:p-3 space-y-2">
          {/* User info */}
          <div
            className={cn(
              "flex items-center rounded-lg bg-white/5",
              "px-2.5 py-2",
              isCollapsed ? "justify-center" : "justify-start"
            )}
            aria-label="Current user"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-sm font-bold">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            {!isCollapsed && (
              <div className="ml-3 min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  {user.email}
                </p>
                <p className="text-xs text-gray-400 capitalize">
                  {String(user.role)}
                </p>
              </div>
            )}
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={logout}
            className={cn(
              "group flex w-full items-center rounded-lg px-2.5 py-2 text-sm font-medium",
              "text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition-colors",
              isCollapsed ? "justify-center" : ""
            )}
            aria-label="Log out"
          >
            <LogOut className={cn("h-5 w-5", isCollapsed ? "" : "mr-3")} />
            <span className={cn(isCollapsed ? "sr-only" : "inline")}>
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}

```

## app\(dashboard)\customer\page.tsx

```typescript
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CustomerRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to documents page
    router.replace("/customer/documents");
  }, [router]);

  return null;
}
```

## app\(dashboard)\editor\page.tsx

```typescript
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditorRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to documents page
    router.replace("/editor/documents");
  }, [router]);

  return null;
}

```

## app\(dashboard)\[role]\layout.tsx

```typescript
export const dynamic = "force-dynamic";

export default function RoleSpecificLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // You can add role-specific layout components here if needed in the future
  return <>{children}</>;
}

```

## app\(dashboard)\[role]\approvals\page.tsx

```typescript
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useToast } from "@/contexts/ToastContext";
import { User, UserRole, ApprovalStatus } from "@/types";
import { format } from "date-fns";
import {
  UserCheck,
  UserX,
  Clock,
  Search,
  Filter,
  AlertCircle,
  CheckCircle,
  XCircle,
  Building,
  Mail,
  Phone,
  Calendar,
  Shield,
  Info,
  Loader2,
} from "lucide-react";

// Approval Modal Component
const ApprovalModal = ({
  user,
  isOpen,
  onClose,
  onApprove,
  onReject,
  isProcessing,
}: {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: (reason: string) => void;
  isProcessing: boolean;
}) => {
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Review Account Application
          </h3>
        </div>

        <div className="p-6 space-y-6">
          {/* User Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Username
              </label>
              <p className="font-medium text-gray-900 dark:text-white">
                {user.username}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Email
              </label>
              <p className="font-medium text-gray-900 dark:text-white">
                {user.email}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Role
              </label>
              <span
                className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-lg ${
                  user.role === UserRole.ADMIN
                    ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                    : user.role === UserRole.EDITOR
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                    : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                }`}
              >
                <Shield className="w-3 h-3 mr-1.5" />
                {user.role}
              </span>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Applied On
              </label>
              <p className="font-medium text-gray-900 dark:text-white">
                {format(new Date(user.created_at), "MMM dd, yyyy 'at' HH:mm")}
              </p>
            </div>
          </div>

          {/* Customer Information */}
          {user.role === UserRole.CUSTOMER && user.customer_info && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Company Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {user.customer_info.company && (
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {user.customer_info.company}
                    </span>
                  </div>
                )}
                {user.customer_info.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {user.customer_info.phone}
                    </span>
                  </div>
                )}
                {user.customer_info.address && (
                  <div className="flex items-center gap-2 col-span-full">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {user.customer_info.address}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Rejection Form */}
          {showRejectForm && (
            <div className="space-y-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
              <label className="block text-sm font-semibold text-red-900 dark:text-red-200">
                Rejection Reason (Required)
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Please provide a reason for rejecting this application..."
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-red-300 dark:border-red-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                rows={3}
                required
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            {!showRejectForm ? (
              <>
                <button
                  onClick={onClose}
                  disabled={isProcessing}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowRejectForm(true)}
                  disabled={isProcessing}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors flex items-center gap-2"
                >
                  <UserX className="w-4 h-4" />
                  Reject
                </button>
                <button
                  onClick={onApprove}
                  disabled={isProcessing}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors flex items-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" />
                      Approve
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setShowRejectForm(false);
                    setRejectionReason("");
                  }}
                  disabled={isProcessing}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    if (rejectionReason.trim()) {
                      onReject(rejectionReason);
                    }
                  }}
                  disabled={isProcessing || !rejectionReason.trim()}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium rounded-xl transition-colors flex items-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <UserX className="w-4 h-4" />
                      Confirm Rejection
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ApprovalsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const toast = useToast();

  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Check permissions
  useEffect(() => {
    if (user && user.role !== UserRole.ADMIN && user.role !== UserRole.EDITOR) {
      router.push(`/${user.role}/documents`);
    }
  }, [user, router]);

  // Fetch pending users
  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/users/pending");
      setPendingUsers(response.data);
    } catch (error) {
      console.error("Error fetching pending users:", error);
      toast.error("Failed to load pending users");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!selectedUser) return;

    setIsProcessing(true);
    try {
      await api.post(`/users/${selectedUser.id}/approve`, {
        approved: true,
      });

      toast.success(`User ${selectedUser.username} has been approved`);
      setIsModalOpen(false);
      setSelectedUser(null);
      fetchPendingUsers();
    } catch (error) {
      console.error("Error approving user:", error);
      toast.error("Failed to approve user");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async (reason: string) => {
    if (!selectedUser) return;

    setIsProcessing(true);
    try {
      await api.post(`/users/${selectedUser.id}/approve`, {
        approved: false,
        rejection_reason: reason,
      });

      toast.success(`User ${selectedUser.username} has been rejected`);
      setIsModalOpen(false);
      setSelectedUser(null);
      fetchPendingUsers();
    } catch (error) {
      console.error("Error rejecting user:", error);
      toast.error("Failed to reject user");
    } finally {
      setIsProcessing(false);
    }
  };

  // Filter users
  const filteredUsers = pendingUsers.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.customer_info?.company &&
        user.customer_info.company
          .toLowerCase()
          .includes(searchQuery.toLowerCase()));

    const matchesRole = filterRole === "all" || user.role === filterRole;

    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin mx-auto" />
          <p className="text-gray-600 dark:text-gray-400">
            Loading pending approvals...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                User Approvals
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Review and approve pending user registrations
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {filteredUsers.length} pending
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Search Users
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="search"
                  placeholder="Search by username, email, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-12 pr-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Filter by Role
              </label>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full h-11 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
              >
                <option value="all">All Roles</option>
                <option value={UserRole.CUSTOMER}>Customer</option>
                <option value={UserRole.EDITOR}>Editor</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pending Users List */}
        {filteredUsers.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <UserCheck className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Pending Approvals
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery
                ? "No users match your search criteria"
                : "All user registrations have been reviewed"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {user.username.charAt(0).toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {user.username}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg ${
                            user.role === UserRole.EDITOR
                              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                              : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                          }`}
                        >
                          <Shield className="w-3 h-3 mr-1.5" />
                          {user.role}
                        </span>

                        {user.customer_info?.company && (
                          <span className="inline-flex items-center px-3 py-1.5 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <Building className="w-3 h-3 mr-1.5" />
                            {user.customer_info.company}
                          </span>
                        )}

                        <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="w-3 h-3 mr-1.5" />
                          Applied{" "}
                          {format(new Date(user.created_at), "MMM dd, yyyy")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setIsModalOpen(true);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors flex items-center gap-2"
                  >
                    <UserCheck className="w-4 h-4" />
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approval Modal */}
      <ApprovalModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
        onApprove={handleApprove}
        onReject={handleReject}
        isProcessing={isProcessing}
      />
    </div>
  );
}

```

## app\(dashboard)\[role]\documents\layout.tsx

```typescript
export const dynamicParams = true;

export async function generateStaticParams() {
  return [{ role: "admin" }, { role: "editor" }, { role: "customer" }];
}

export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

```

## app\(dashboard)\[role]\documents\page.tsx

```typescript
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FileText,
  Download,
  Eye,
  Edit,
  Trash2,
  Search,
  Grid,
  List,
  Plus,
  Calendar,
  FolderOpen,
  Users,
  Lock,
  Globe,
  ChevronDown,
  X,
  Shield,
  EyeOff,
} from "lucide-react";
import { format } from "date-fns";
import api from "@/lib/api";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import {
  Document,
  DocumentCategory,
  DocumentVisibility,
  UserRole,
} from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import DocumentPreviewModal from "@/components/DocumentPreviewModal";
import { useToast } from "@/contexts/ToastContext";

// Utils
const bytesToMB = (bytes: number) => (bytes / 1024 / 1024).toFixed(1) + " MB";

// A11y: Visually-hidden label
const VisuallyHidden = ({ children }: { children: React.ReactNode }) => (
  <span className="sr-only">{children}</span>
);

// Theme-aware Select (light + dark)
const ThemedSelect = ({
  value,
  onChange,
  options,
  placeholder,
  label,
  ariaLabel,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  label?: string;
  ariaLabel?: string;
}) => {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={ariaLabel}
          className="w-full h-11 px-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl text-left flex items-center justify-between text-sm text-gray-900 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <span
            className={
              selected
                ? "text-gray-900 dark:text-gray-200"
                : "text-gray-500 dark:text-gray-400"
            }
          >
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <>
            <button
              className="fixed inset-0 z-20 cursor-default"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <div
              role="listbox"
              className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl z-30 max-h-64 overflow-auto"
            >
              {options.map((opt) => (
                <button
                  key={opt.value}
                  role="option"
                  aria-selected={opt.value === value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-900 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Confirm Modal (theme-aware)
const ConfirmModal = ({
  open,
  title,
  message,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <button
            onClick={onCancel}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:border-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default function DocumentsPage() {
  const router = useRouter();
  const params = useSearchParams();
  const queryClient = useQueryClient();
  const toast = useToast();
  const { user } = useAuth();

  // View mode
  const [view, setView] = useState<"grid" | "list">("grid");

  // Filters + debounced state
  const [filters, setFilters] = useState({
    search: params.get("search") ?? "",
    category: (params.get("category") as string) ?? "all",
    visibility: (params.get("visibility") as string) ?? "all",
    page: 1,
    pageSize: 20,
  });
  const [debounced, setDebounced] = useState(filters);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(filters), 300);
    return () => clearTimeout(t);
  }, [filters]);

  // Keep URL in sync (no scroll jump)
  useEffect(() => {
    const sp = new URLSearchParams();
    if (filters.search) sp.set("search", filters.search);
    if (filters.category !== "all") sp.set("category", filters.category);
    if (filters.visibility !== "all") sp.set("visibility", filters.visibility);
    const qs = sp.toString();
    router.replace(qs ? `?${qs}` : "?", { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.search, filters.category, filters.visibility]);

  // Build API url
  const buildUrl = (f: typeof debounced) => {
    const q: string[] = [];
    if (f.search) q.push(`search=${encodeURIComponent(f.search)}`);
    if (f.category !== "all")
      q.push(`category=${encodeURIComponent(f.category)}`);
    if (f.visibility !== "all")
      q.push(`visibility=${encodeURIComponent(f.visibility)}`);
    q.push(`skip=${(f.page - 1) * f.pageSize}`);
    q.push(`limit=${f.pageSize}`);
    return `/documents?${q.join("&")}`;
  };

  // Fetch
  const {
    data: documents,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["documents", debounced],
    queryFn: async () =>
      (await api.get(buildUrl(debounced))).data as Document[],
    placeholderData: keepPreviousData,
    staleTime: 15_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: true,
  });

  const canEdit =
    user?.role === UserRole.ADMIN || user?.role === UserRole.EDITOR;
  const canDelete = user?.role === UserRole.ADMIN;

  // Delete with optimistic update
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => api.delete(`/documents/${id}`),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["documents"] });
      const key = ["documents", debounced] as const;
      const previous = queryClient.getQueryData<Document[]>(key);
      if (previous) {
        queryClient.setQueryData<Document[]>(
          key,
          previous.filter((d) => d.id !== id)
        );
      }
      return { previous, key };
    },
    onError: (_e, _id, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(ctx.key, ctx.previous);
      toast.error("Failed to delete document. Please try again.");
    },
    onSuccess: () => toast.success("Document deleted"),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });

  // Delete modal
  const [confirm, setConfirm] = useState<{
    open: boolean;
    id: string;
    title: string;
  }>({
    open: false,
    id: "",
    title: "",
  });
  const askDelete = (id: string, title: string) =>
    setConfirm({ open: true, id, title });
  const confirmDelete = async () => {
    const id = confirm.id;
    setConfirm({ open: false, id: "", title: "" });
    await deleteMutation.mutateAsync(id);
  };

  // Preview modal
  const [preview, setPreview] = useState<{
    open: boolean;
    id: string;
    title: string;
    fileName: string;
    mime?: string;
    canDownload: boolean;
  }>({
    open: false,
    id: "",
    title: "",
    fileName: "",
    mime: "",
    canDownload: false,
  });

  const openPreview = (doc: Document) => {
    const canDownload =
      !doc.is_viewable_only && user?.role !== UserRole.CUSTOMER;
    setPreview({
      open: true,
      id: doc.id,
      title: doc.title,
      fileName: doc.file_name,
      mime: doc.mime_type,
      canDownload,
    });
  };

  const handleEdit = (id: string) =>
    router.push(`/${user?.role}/documents/${id}/edit`);

  const handleDownload = async (id: string, fileName: string) => {
    try {
      const res = await api.get(`/documents/${id}/download`, {
        responseType: "blob",
      });
      const blob = new Blob([res.data], {
        type: res.headers["content-type"] || "application/octet-stream",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e: any) {
      const status = e?.response?.status;
      if (status === 403)
        toast.error("Download not allowed for this document.");
      else if (status === 404) toast.error("Document not found.");
      else toast.error("Unable to download. Please try again.");
    }
  };

  // Options
  const categoryOptions = useMemo(
    () => [
      { value: "all", label: "All Categories" },
      ...Object.values(DocumentCategory).map((c) => ({
        value: c,
        label: c.charAt(0).toUpperCase() + c.slice(1),
      })),
    ],
    []
  );

  const visibilityOptions = useMemo(
    () => [
      { value: "all", label: "All Visibility" },
      ...Object.values(DocumentVisibility).map((v) => ({
        value: v,
        label: v.charAt(0).toUpperCase() + v.slice(1),
      })),
    ],
    []
  );

  const getVisibilityIcon = (v: string) =>
    v === "public" ? (
      <Globe className="w-3 h-3" />
    ) : v === "private" ? (
      <Lock className="w-3 h-3" />
    ) : (
      <Users className="w-3 h-3" />
    );

  // theme-aware pill colors
  const getVisibilityColor = (v: string) =>
    v === "public"
      ? "bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800"
      : v === "private"
      ? "bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
      : "bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800";

  const getCategoryColor = (c: string) => {
    const map: Record<string, string> = {
      commercial:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      quality:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
      safety: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      compliance:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      contracts:
        "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      specifications:
        "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
      other: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    };
    return map[c] || map.other;
  };

  // Actions for card layout
  const CardActions = ({ doc }: { doc: Document }) => (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => openPreview(doc)}
        className="flex items-center gap-2 px-4 py-2.5 text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded-xl transition-colors font-medium min-w-[120px] justify-center"
        aria-label={`Preview ${doc.title}`}
      >
        <Eye className="w-4 h-4" />
        Preview
      </button>

      {!doc.is_viewable_only && user?.role !== UserRole.CUSTOMER ? (
        <button
          onClick={() => handleDownload(doc.id, doc.file_name)}
          className="flex items-center gap-2 px-4 py-2.5 text-sm bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:hover:bg-emerald-900/30 rounded-xl transition-colors font-medium min-w-[120px] justify-center"
          aria-label={`Download ${doc.title}`}
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      ) : (
        <div
          className="flex items-center gap-2 px-4 py-2.5 text-sm bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800 rounded-xl font-medium min-w-[120px] justify-center"
          aria-label="View only"
        >
          <EyeOff className="w-4 h-4" />
          View Only
        </div>
      )}

      {canEdit && (
        <button
          onClick={() => handleEdit(doc.id)}
          className="flex items-center gap-2 px-4 py-2.5 text-sm bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-800 dark:hover:bg-gray-800 rounded-xl transition-colors font-medium min-w-[120px] justify-center"
          aria-label={`Edit ${doc.title}`}
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>
      )}

      {canDelete && (
        <button
          onClick={() => askDelete(doc.id, doc.title)}
          className="flex items-center gap-2 px-4 py-2.5 text-sm bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 rounded-xl transition-colors font-medium min-w-[120px] justify-center"
          aria-label={`Delete ${doc.title}`}
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      )}
    </div>
  );

  const DocumentCard = ({ doc }: { doc: Document }) => (
    <div className="group bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-200 overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate text-lg">
                {doc.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
                {doc.file_name}
              </p>
            </div>
          </div>
        </div>

        {doc.description && (
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-sm leading-relaxed">
            {doc.description}
          </p>
        )}

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span
            className={`inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded-lg ${getCategoryColor(
              doc.category
            )}`}
          >
            <FolderOpen className="w-3 h-3 mr-1.5" />
            {doc.category}
          </span>
          <span
            className={`inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded-lg ${getVisibilityColor(
              doc.visibility
            )} gap-1.5`}
          >
            {getVisibilityIcon(doc.visibility)}
            {doc.visibility}
          </span>
          {doc.is_viewable_only && (
            <span className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded-lg bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800 gap-1.5">
              <Shield className="w-3 h-3" />
              View Only
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
          <span className="font-medium">{bytesToMB(doc.file_size)}</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            {format(new Date(doc.updated_at), "MMM dd, yyyy")}
          </span>
        </div>

        <CardActions doc={doc} />
      </div>
    </div>
  );

  const DocumentRow = ({ doc }: { doc: Document }) => (
    <div className="group bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all duration-150 p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
              {doc.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">
              {doc.description || doc.file_name}
            </p>
          </div>

          <div className="hidden md:flex items-center gap-3 ml-4">
            <span
              className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-lg ${getCategoryColor(
                doc.category
              )}`}
            >
              {doc.category}
            </span>
            <span
              className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-lg ${getVisibilityColor(
                doc.visibility
              )} gap-1`}
            >
              {getVisibilityIcon(doc.visibility)}
              {doc.visibility}
            </span>
            {doc.is_viewable_only && (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-lg bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800 gap-1">
                <Shield className="w-3 h-3" />
                View Only
              </span>
            )}
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {bytesToMB(doc.file_size)}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {format(new Date(doc.updated_at), "MMM dd, yyyy")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => openPreview(doc)}
            className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
            title="Preview"
            aria-label={`Preview ${doc.title}`}
          >
            <Eye className="w-4 h-4" />
          </button>

          {!doc.is_viewable_only && user?.role !== UserRole.CUSTOMER ? (
            <button
              onClick={() => handleDownload(doc.id, doc.file_name)}
              className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
              title="Download"
              aria-label={`Download ${doc.title}`}
            >
              <Download className="w-4 h-4" />
            </button>
          ) : (
            <div
              className="p-2 rounded-lg text-amber-600 dark:text-amber-400 cursor-not-allowed"
              title="View Only"
            >
              <EyeOff className="w-4 h-4" />
            </div>
          )}

          {canEdit && (
            <button
              onClick={() => handleEdit(doc.id)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              title="Edit"
              aria-label={`Edit ${doc.title}`}
            >
              <Edit className="w-4 h-4" />
            </button>
          )}

          {canDelete && (
            <button
              onClick={() => askDelete(doc.id, doc.title)}
              className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
              title="Delete"
              aria-label={`Delete ${doc.title}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Small-screen meta */}
      <div className="md:hidden mt-3 flex items-center flex-wrap gap-2">
        <span
          className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-lg ${getCategoryColor(
            doc.category
          )}`}
        >
          {doc.category}
        </span>
        <span
          className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-lg ${getVisibilityColor(
            doc.visibility
          )} gap-1`}
        >
          {getVisibilityIcon(doc.visibility)}
          {doc.visibility}
        </span>
        {doc.is_viewable_only && (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-lg bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800 gap-1">
            <Shield className="w-3 h-3" />
            View Only
          </span>
        )}
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          {bytesToMB(doc.file_size)}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {format(new Date(doc.updated_at), "MMM dd, yyyy")}
        </span>
      </div>
    </div>
  );

  // Header toolbar
  const Toolbar = () => (
    <div className="flex items-center gap-3">
      <div className="flex bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-1">
        <button
          onClick={() => setView("grid")}
          aria-pressed={view === "grid"}
          aria-label="Grid view"
          className={`h-10 w-10 rounded-lg flex items-center justify-center transition-colors ${
            view === "grid"
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:text-gray-900 hover:bg-white dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800"
          }`}
        >
          <Grid className="w-4 h-4" />
          <VisuallyHidden>Grid</VisuallyHidden>
        </button>
        <button
          onClick={() => setView("list")}
          aria-pressed={view === "list"}
          aria-label="List view"
          className={`h-10 w-10 rounded-lg flex items-center justify-center transition-colors ${
            view === "list"
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:text-gray-900 hover:bg-white dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800"
          }`}
        >
          <List className="w-4 h-4" />
          <VisuallyHidden>List</VisuallyHidden>
        </button>
      </div>

      {canEdit && (
        <button
          onClick={() => router.push(`/${user?.role}/documents/upload`)}
          className="inline-flex items-center gap-2 h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Document
        </button>
      )}
    </div>
  );

  const LoadingCard = () => (
    <div className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-xl" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
        </div>
      </div>
      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full mb-2" />
      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-2/3 mb-4" />
      <div className="flex gap-2">
        <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-xl w-28" />
        <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-xl w-28" />
      </div>
    </div>
  );

  const docs = documents ?? [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
                Document Library
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Organize, manage, and collaborate on all your important
                documents
              </p>
              <div className="flex items-center gap-6 mt-4 text-sm">
                <div className="text-gray-600 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {docs.length}
                  </span>
                  <span className="ml-1">documents found</span>
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {filters.search ||
                    filters.category !== "all" ||
                    filters.visibility !== "all"
                      ? "Filtered"
                      : "All"}
                  </span>
                  <span className="ml-1">results</span>
                </div>
                {isFetching && (
                  <span className="text-xs text-gray-500">Refreshing…</span>
                )}
              </div>
            </div>
            <Toolbar />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-6">
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                Search Documents
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="search"
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      search: e.target.value,
                      page: 1,
                    }))
                  }
                  placeholder="Search by title, description, filename..."
                  className="w-full h-11 pl-10 pr-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl text-sm text-gray-900 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  aria-label="Search documents"
                />
              </div>
            </div>

            <div className="lg:col-span-3">
              <ThemedSelect
                label="Category"
                value={filters.category}
                onChange={(v) =>
                  setFilters((f) => ({ ...f, category: v, page: 1 }))
                }
                options={categoryOptions}
                placeholder="All Categories"
                ariaLabel="Filter by category"
              />
            </div>

            <div className="lg:col-span-3">
              <ThemedSelect
                label="Visibility"
                value={filters.visibility}
                onChange={(v) =>
                  setFilters((f) => ({ ...f, visibility: v, page: 1 }))
                }
                options={visibilityOptions}
                placeholder="All Visibility"
                ariaLabel="Filter by visibility"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {isLoading ? (
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {Array.from({ length: view === "grid" ? 9 : 6 }).map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        ) : docs.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No documents found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              {filters.search ||
              filters.category !== "all" ||
              filters.visibility !== "all"
                ? "Try adjusting your search or filters."
                : "Get started by uploading your first document."}
            </p>
            {canEdit && (
              <button
                onClick={() => router.push(`/${user?.role}/documents/upload`)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
              >
                <Plus className="w-5 h-5" />
                Upload Document
              </button>
            )}
          </div>
        ) : (
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {docs.map((doc) =>
              view === "grid" ? (
                <DocumentCard key={doc.id} doc={doc} />
              ) : (
                <DocumentRow key={doc.id} doc={doc} />
              )
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <ConfirmModal
        open={confirm.open}
        title="Delete Document"
        message={`Are you sure you want to permanently delete "${confirm.title}"? This action cannot be undone.`}
        onCancel={() => setConfirm({ open: false, id: "", title: "" })}
        onConfirm={confirmDelete}
      />

      <DocumentPreviewModal
        isOpen={preview.open}
        onClose={() =>
          setPreview({
            open: false,
            id: "",
            title: "",
            fileName: "",
            mime: "",
            canDownload: false,
          })
        }
        documentId={preview.id}
        documentTitle={preview.title}
        fileName={preview.fileName}
        mimeType={preview.mime}
        canDownload={preview.canDownload}
      />
    </div>
  );
}

```

## app\(dashboard)\[role]\documents\upload\layout.tsx

```typescript
export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ role: "admin" }, { role: "editor" }, { role: "customer" }];
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

```

## app\(dashboard)\[role]\documents\upload\page.tsx

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { DocumentCategory, DocumentVisibility, UserRole } from "@/types";
import LoadingOverlay from "@/components/LoadingOverlay";
import LoadingButton from "@/components/LoadingButton";
import { useToast } from "@/contexts/ToastContext";
import {
  Upload,
  FileText,
  X,
  Save,
  AlertCircle,
  Info,
  Settings,
  Globe,
  Lock,
  Building,
  Tag,
  ArrowLeft,
  Plus,
  Trash2,
  ChevronDown,
  Check
} from "lucide-react";

// Modern Select Component
const ModernSelect = ({ value, onChange, options, placeholder, icon: Icon }: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  icon?: React.ElementType;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-12 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-left flex items-center justify-between hover:border-blue-400 dark:hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />}
          <span className={selectedOption ? "text-gray-900 dark:text-white font-medium" : "text-gray-500 dark:text-gray-400"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-40 max-h-64 overflow-auto">
            {options.map((option, index) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between group transition-colors duration-150 ${
                  index === 0 ? 'rounded-t-xl' : ''
                } ${index === options.length - 1 ? 'rounded-b-xl' : ''}`}
              >
                <span className="text-gray-900 dark:text-white font-medium">{option.label}</span>
                {value === option.value && (
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Modern Toggle Switch
const ModernToggle = ({ checked, onChange, label, description }: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}) => {
  return (
    <div className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200">
      <div className="flex-1 min-w-0 mr-4">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{label}</h4>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
          checked ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-200 ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};



export default function UploadPage() {
  const { user } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const toast = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: DocumentCategory.OTHER,
    visibility: DocumentVisibility.PRIVATE,
    is_viewable_only: false,
    tags: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  // Check if user is authenticated
  if (!user) {
    router.push('/login');
    return null;
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    setIsUploading(true);
    setError("");

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("title", formData.title);
    uploadData.append("description", formData.description);
    uploadData.append("category", formData.category);
    uploadData.append("tags", formData.tags);

    // Only add these fields for staff uploads
    if (user?.role !== UserRole.CUSTOMER) {
      uploadData.append("visibility", formData.visibility);
      uploadData.append("is_viewable_only", formData.is_viewable_only.toString());
    }

    try {
      // Use different endpoints based on user role
      const endpoint = user?.role === UserRole.CUSTOMER
        ? "/documents/customer-upload"
        : "/documents/";

      await api.post(endpoint, uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success('Document uploaded successfully');
      // Prime the list view with fresh data and then navigate
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      router.push(`/${user?.role}/documents`);
    } catch (err) {
      const axiosErr = err as { response?: { data?: { detail?: unknown } } };
      const msg = axiosErr?.response?.data?.detail;
      const friendly = typeof msg === 'string' ? msg : 'Error uploading document';
      setError(friendly);
      toast.error(friendly);
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case 'public': return Globe;
      case 'private': return Lock;
      default: return Building;
    }
  };

  const categoryOptions = Object.values(DocumentCategory).map(category => ({
    value: category,
    label: category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' ')
  }));

  const visibilityOptions = Object.values(DocumentVisibility).map(visibility => ({
    value: visibility,
    label: visibility.charAt(0).toUpperCase() + visibility.slice(1)
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Loading Overlay */}
      <LoadingOverlay
        isVisible={isUploading}
        message="Uploading your document..."
        title="Processing"
      />

      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push(`/${user?.role}/documents`)}
              className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Upload Document</h1>
                <p className="text-gray-600 dark:text-gray-400">Add a new document to the system</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">Upload Error</h3>
                  <p className="text-red-700 dark:text-red-300 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Customer Notice */}
          {user?.role === UserRole.CUSTOMER && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Document Review Process</h3>
                  <p className="text-blue-700 dark:text-blue-300 mt-1">
                    Your uploaded documents will be reviewed by our staff before being made available. You&apos;ll receive a notification once the review is complete.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* File Upload */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                  <Upload className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">File Upload</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                  Document File
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div
                  className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
                    dragActive
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : file
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 bg-gray-50 dark:bg-gray-800'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {file ? (
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center">
                        <FileText className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg text-gray-900 dark:text-white">{file.name}</p>
                        <p className="text-gray-600 dark:text-gray-400">{formatFileSize(file.size)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors font-medium text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="file-upload" className="cursor-pointer block">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Plus className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {dragActive ? 'Drop your file here' : 'Click to upload or drag and drop'}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          PDF, DOC, DOCX, XLS, XLSX files up to 50MB
                        </p>
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                        onChange={handleFileChange}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Document Information */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Document Information</h2>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                  Document Title
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter a clear, descriptive title for your document"
                  required
                  className="w-full h-12 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 shadow-sm"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 resize-none shadow-sm"
                  placeholder="Provide a detailed description of the document content and purpose..."
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                  Tags
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="important, contract, legal, 2024"
                  className="w-full h-12 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 shadow-sm"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Separate multiple tags with commas to help organize and search for documents more effectively
                </p>
              </div>
            </div>
          </div>

          {/* Document Settings */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Settings className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Document Settings</h2>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                    Category
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <ModernSelect
                    value={formData.category}
                    onChange={(value) => setFormData({ ...formData, category: value as DocumentCategory })}
                    options={categoryOptions}
                    placeholder="Select document category"
                    icon={Tag}
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                    Visibility Level
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  {user?.role === UserRole.CUSTOMER ? (
                    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                      <Lock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Private (Staff Review Required)
                      </span>
                    </div>
                  ) : (
                    <ModernSelect
                      value={formData.visibility}
                      onChange={(value) => setFormData({ ...formData, visibility: value as DocumentVisibility })}
                      options={visibilityOptions}
                      placeholder="Select visibility level"
                      icon={getVisibilityIcon(formData.visibility)}
                    />
                  )}
                </div>
              </div>

              {user?.role !== UserRole.CUSTOMER && (
                <ModernToggle
                  checked={formData.is_viewable_only}
                  onChange={(checked) => setFormData({ ...formData, is_viewable_only: checked })}
                  label="View-Only Mode"
                  description="When enabled, users can only preview the document online and cannot download it to their device"
                />
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.push(`/${user?.role}/documents`)}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <LoadingButton
              type="submit"
              isLoading={isUploading}
              loadingText="Uploading Document..."
              variant="primary"
              size="md"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
              icon={<Save className="w-4 h-4" />}
            >
              Upload Document
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
}

```

## app\(dashboard)\[role]\documents\uploads\layout.tsx

```typescript
export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ role: "admin" }, { role: "editor" }, { role: "customer" }];
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

```

## app\(dashboard)\[role]\documents\uploads\page.tsx

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";
import { DocumentCategory, DocumentVisibility, UserRole } from "@/types";
import LoadingOverlay from "@/components/LoadingOverlay";
import LoadingButton from "@/components/LoadingButton";
import {
  Upload,
  FileText,
  X,
  Save,
  AlertCircle,
  Info,
  Settings,
  Globe,
  Lock,
  Building,
  Tag,
  ArrowLeft,
  Plus,
  Trash2,
  ChevronDown,
  Check
} from "lucide-react";

// Modern Select Component
const ModernSelect = ({ value, onChange, options, placeholder, icon: Icon }: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  icon?: React.ElementType;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-12 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-left flex items-center justify-between hover:border-blue-400 dark:hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />}
          <span className={selectedOption ? "text-gray-900 dark:text-white font-medium" : "text-gray-500 dark:text-gray-400"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-40 max-h-64 overflow-auto">
            {options.map((option, index) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between group transition-colors duration-150 ${
                  index === 0 ? 'rounded-t-xl' : ''
                } ${index === options.length - 1 ? 'rounded-b-xl' : ''}`}
              >
                <span className="text-gray-900 dark:text-white font-medium">{option.label}</span>
                {value === option.value && (
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Modern Toggle Switch
const ModernToggle = ({ checked, onChange, label, description }: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}) => {
  return (
    <div className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200">
      <div className="flex-1 min-w-0 mr-4">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{label}</h4>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
          checked ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-200 ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};



export default function UploadPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: DocumentCategory.OTHER,
    visibility: DocumentVisibility.PRIVATE,
    is_viewable_only: false,
    tags: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  // Check if user is authenticated
  if (!user) {
    router.push('/login');
    return null;
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    setIsUploading(true);
    setError("");

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("title", formData.title);
    uploadData.append("description", formData.description);
    uploadData.append("category", formData.category);
    uploadData.append("tags", formData.tags);

    // Only add these fields for staff uploads
    if (user?.role !== UserRole.CUSTOMER) {
      uploadData.append("visibility", formData.visibility);
      uploadData.append("is_viewable_only", formData.is_viewable_only.toString());
    }

    try {
      // Use different endpoints based on user role
      const endpoint = user?.role === UserRole.CUSTOMER
        ? "/documents/customer-upload"
        : "/documents/";

      await api.post(endpoint, uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      router.push(`/${user?.role}/documents`);
    } catch (err) {
      const axiosErr = err as { response?: { data?: { detail?: unknown } } };
      const msg = axiosErr?.response?.data?.detail;
      setError(typeof msg === 'string' ? msg : 'Error uploading document');
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case 'public': return Globe;
      case 'private': return Lock;
      default: return Building;
    }
  };

  const categoryOptions = Object.values(DocumentCategory).map(category => ({
    value: category,
    label: category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' ')
  }));

  const visibilityOptions = Object.values(DocumentVisibility).map(visibility => ({
    value: visibility,
    label: visibility.charAt(0).toUpperCase() + visibility.slice(1)
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Loading Overlay */}
      <LoadingOverlay
        isVisible={isUploading}
        message="Uploading your document..."
        title="Processing"
      />

      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push(`/${user?.role}/documents`)}
              className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Upload Document</h1>
                <p className="text-gray-600 dark:text-gray-400">Add a new document to the system</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">Upload Error</h3>
                  <p className="text-red-700 dark:text-red-300 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Customer Notice */}
          {user?.role === UserRole.CUSTOMER && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Document Review Process</h3>
                  <p className="text-blue-700 dark:text-blue-300 mt-1">
                    Your uploaded documents will be reviewed by our staff before being made available. You&apos;ll receive a notification once the review is complete.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* File Upload */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                  <Upload className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">File Upload</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                  Document File
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div
                  className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
                    dragActive 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : file 
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 bg-gray-50 dark:bg-gray-800'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {file ? (
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center">
                        <FileText className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg text-gray-900 dark:text-white">{file.name}</p>
                        <p className="text-gray-600 dark:text-gray-400">{formatFileSize(file.size)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors font-medium text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="file-upload" className="cursor-pointer block">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Plus className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {dragActive ? 'Drop your file here' : 'Click to upload or drag and drop'}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          PDF, DOC, DOCX, XLS, XLSX files up to 50MB
                        </p>
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                        onChange={handleFileChange}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Document Information */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Document Information</h2>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                  Document Title
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter a clear, descriptive title for your document"
                  required
                  className="w-full h-12 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 shadow-sm"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 resize-none shadow-sm"
                  placeholder="Provide a detailed description of the document content and purpose..."
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                  Tags
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="important, contract, legal, 2024"
                  className="w-full h-12 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 shadow-sm"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Separate multiple tags with commas to help organize and search for documents more effectively
                </p>
              </div>
            </div>
          </div>

          {/* Document Settings */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Settings className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Document Settings</h2>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                    Category
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <ModernSelect
                    value={formData.category}
                    onChange={(value) => setFormData({ ...formData, category: value as DocumentCategory })}
                    options={categoryOptions}
                    placeholder="Select document category"
                    icon={Tag}
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                    Visibility Level
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  {user?.role === UserRole.CUSTOMER ? (
                    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                      <Lock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Private (Staff Review Required)
                      </span>
                    </div>
                  ) : (
                    <ModernSelect
                      value={formData.visibility}
                      onChange={(value) => setFormData({ ...formData, visibility: value as DocumentVisibility })}
                      options={visibilityOptions}
                      placeholder="Select visibility level"
                      icon={getVisibilityIcon(formData.visibility)}
                    />
                  )}
                </div>
              </div>

              {user?.role !== UserRole.CUSTOMER && (
                <ModernToggle
                  checked={formData.is_viewable_only}
                  onChange={(checked) => setFormData({ ...formData, is_viewable_only: checked })}
                  label="View-Only Mode"
                  description="When enabled, users can only preview the document online and cannot download it to their device"
                />
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.push(`/${user?.role}/documents`)}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <LoadingButton
              type="submit"
              isLoading={isUploading}
              loadingText="Uploading Document..."
              variant="primary"
              size="md"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
              icon={<Save className="w-4 h-4" />}
            >
              Upload Document
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
}

```

## app\(dashboard)\[role]\documents\[id]\layout.tsx

```typescript
// Change this from 'false' to 'true' to allow dynamic rendering of document pages
export const dynamicParams = true;

export async function generateStaticParams() {
  // This function can now be removed or left as is, since dynamicParams = true
  // will handle any ID not generated here.
  return [];
}

export default function DocumentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

```

## app\(dashboard)\[role]\documents\[id]\edit\page.tsx

```typescript
"use client";

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  AlertCircle,
  ArrowLeft,
  Save,
  X,
  FileText,
  Eye,
  Users,
  Tag,
  Info,
  Loader2,
  ChevronDown,
  Check,
  Lock,
  Globe,
  Building,
  Sparkles,
} from "lucide-react";
import api from "@/lib/api";
import { Document, DocumentCategory, DocumentVisibility, User } from "@/types";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useToast } from "@/contexts/ToastContext";

// Modern Select Component
const ModernSelect = ({
  value,
  onChange,
  options,
  placeholder,
  icon: Icon,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  icon?: React.ElementType;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-12 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-left flex items-center justify-between hover:border-blue-400 dark:hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
      >
        <div className="flex items-center gap-3">
          {Icon && (
            <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          )}
          <span
            className={
              selectedOption
                ? "text-gray-900 dark:text-white font-medium"
                : "text-gray-500 dark:text-gray-400"
            }
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-40 max-h-64 overflow-auto">
            {options.map((option, index) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between group transition-colors duration-150 ${
                  index === 0 ? "rounded-t-xl" : ""
                } ${index === options.length - 1 ? "rounded-b-xl" : ""}`}
              >
                <span className="text-gray-900 dark:text-white font-medium">
                  {option.label}
                </span>
                {value === option.value && (
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Modern MultiSelect Component
const ModernMultiSelect = ({
  selected,
  onChange,
  options,
  placeholder,
}: {
  selected: string[];
  onChange: (selected: string[]) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const selectedLabels = options
    .filter((opt) => selected.includes(opt.value))
    .map((opt) => opt.label);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full min-h-12 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-left flex items-center justify-between hover:border-blue-400 dark:hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
      >
        <div className="flex-1">
          {selectedLabels.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedLabels.slice(0, 3).map((label, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-lg"
                >
                  {label}
                </span>
              ))}
              {selectedLabels.length > 3 && (
                <span className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm font-medium rounded-lg">
                  +{selectedLabels.length - 3} more
                </span>
              )}
            </div>
          ) : (
            <span className="text-gray-500 dark:text-gray-400">
              {placeholder}
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ml-2 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-40 max-h-64 overflow-auto">
            {options.map((option, index) => (
              <button
                key={option.value}
                type="button"
                onClick={() => toggleOption(option.value)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors duration-150 ${
                  index === 0 ? "rounded-t-xl" : ""
                } ${index === options.length - 1 ? "rounded-b-xl" : ""}`}
              >
                <div
                  className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-all duration-150 ${
                    selected.includes(option.value)
                      ? "bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  {selected.includes(option.value) && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className="text-gray-900 dark:text-white font-medium">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Modern Toggle Switch
const ModernToggle = ({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}) => {
  return (
    <div className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200">
      <div className="flex-1 min-w-0 mr-4">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
          {label}
        </h4>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
          checked
            ? "bg-blue-600 dark:bg-blue-500"
            : "bg-gray-300 dark:bg-gray-600"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-200 ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

export default function EditDocumentPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [document, setDocument] = useState<Document | null>(null);
  const [customers, setCustomers] = useState<User[]>([]);
  const toast = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: DocumentCategory.OTHER,
    visibility: DocumentVisibility.PRIVATE,
    is_viewable_only: false,
    assigned_customers: [] as string[],
    tags: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDocument();
    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const fetchDocument = async () => {
    try {
      const response = await api.get(`/documents/${params.id}`);
      const doc = response.data;
      setDocument(doc);
      setFormData({
        title: doc.title,
        description: doc.description || "",
        category: doc.category,
        visibility: doc.visibility,
        is_viewable_only: doc.is_viewable_only,
        assigned_customers: doc.assigned_customers,
        tags: doc.tags.join(", "),
      });
    } catch (error) {
      console.error("Error fetching document:", error);
      setError("Failed to load document");
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await api.get("/users?role=customer");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const updateMutation = useMutation({
    mutationFn: async (payload: typeof formData) => {
      const updateData = {
        ...payload,
        tags: payload.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };
      return api.put(`/documents/${params.id}`, updateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast.success("Document updated");
      router.push(`/${user?.role}/documents`);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await updateMutation.mutateAsync(formData);
    } catch (err) {
      const axiosErr = err as { response?: { data?: { detail?: unknown } } };
      const msg = axiosErr?.response?.data?.detail;
      setError(typeof msg === "string" ? msg : "Error updating document");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-800 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-600 dark:border-blue-400 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Loading Document
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Please wait while we retrieve your document details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-12 h-12 text-red-500 dark:text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Document Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            The document you&apos;re looking for doesn&apos;t exist or may have
            been removed from the system.
          </p>
          <button
            onClick={() => router.push(`/${user?.role}/documents`)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Return to Documents
          </button>
        </div>
      </div>
    );
  }

  const categoryOptions = Object.values(DocumentCategory).map((category) => ({
    value: category,
    label:
      category.charAt(0).toUpperCase() + category.slice(1).replace("_", " "),
  }));

  const visibilityOptions = Object.values(DocumentVisibility).map(
    (visibility) => ({
      value: visibility,
      label: visibility.charAt(0).toUpperCase() + visibility.slice(1),
    })
  );

  const customerOptions = customers.map((c) => ({
    value: c.id,
    label: c.username,
  }));

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case "public":
        return Globe;
      case "private":
        return Lock;
      default:
        return Building;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Loading Overlay */}
      <LoadingOverlay
        isVisible={saving || updateMutation.isPending}
        message="Saving your changes..."
        title="Processing"
      />

      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push(`/${user?.role}/documents`)}
              className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Edit Document
                </h1>
                <p className="text-gray-600 dark:text-gray-400 truncate">
                  {document.file_name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">
                    Error Occurred
                  </h3>
                  <p className="text-red-700 dark:text-red-300 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Basic Information */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Basic Information
                </h2>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-gray-900 dark:text-white"
                >
                  Document Title
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full h-12 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 shadow-sm"
                  placeholder="Enter a clear, descriptive title for your document"
                  required
                />
              </div>

              <div className="space-y-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 resize-none shadow-sm"
                  placeholder="Provide a detailed description of the document content and purpose..."
                />
              </div>
            </div>
          </div>

          {/* Document Settings */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Eye className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Document Settings
                </h2>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                    Category
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <ModernSelect
                    value={formData.category}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        category: value as DocumentCategory,
                      })
                    }
                    options={categoryOptions}
                    placeholder="Select document category"
                    icon={Tag}
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                    Visibility Level
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <ModernSelect
                    value={formData.visibility}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        visibility: value as DocumentVisibility,
                      })
                    }
                    options={visibilityOptions}
                    placeholder="Select visibility level"
                    icon={getVisibilityIcon(formData.visibility)}
                  />
                </div>
              </div>

              <ModernToggle
                checked={formData.is_viewable_only}
                onChange={(checked) =>
                  setFormData({ ...formData, is_viewable_only: checked })
                }
                label="View-Only Mode"
                description="When enabled, users can only preview the document online and cannot download it to their device"
              />
            </div>
          </div>

          {/* Access Control */}
          {formData.visibility === DocumentVisibility.PRIVATE && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Access Control
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                    Authorized Customers
                  </label>
                  <ModernMultiSelect
                    selected={formData.assigned_customers}
                    onChange={(selected) =>
                      setFormData({ ...formData, assigned_customers: selected })
                    }
                    options={customerOptions}
                    placeholder="Select customers who can access this document..."
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Only the selected customers will have permission to view and
                    access this private document
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tags & Labels */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Tags & Organization
                </h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <label
                  htmlFor="tags"
                  className="block text-sm font-semibold text-gray-900 dark:text-white"
                >
                  Document Tags
                </label>
                <input
                  id="tags"
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  className="w-full h-12 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 shadow-sm"
                  placeholder="important, contract, legal, 2024"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Separate multiple tags with commas to help organize and search
                  for documents more effectively
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.push(`/${user?.role}/documents`)}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
            >
              <X className="w-4 h-4" />
              Cancel Changes
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Document
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

```

## app\(dashboard)\[role]\notifications\layout.tsx

```typescript
export const dynamicParams = false;

export async function generateStaticParams() {
  return [
    { role: 'admin' },
    { role: 'editor' },
    { role: 'customer' },
  ];
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}


```

## app\(dashboard)\[role]\notifications\page.tsx

```typescript
"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Bell,
  FileText,
  AlertCircle,
  Clock,
  Check,
  Eye,
  Search,
} from "lucide-react";
import api from "@/lib/api";
import { Notification } from "@/types";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";

// Modern Select Component
const ModernTabs = ({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; count?: number }[];
}) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl inline-flex">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
            value === option.value
              ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          }`}
        >
          {option.label}
          {option.count !== undefined && option.count > 0 && (
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                value === option.value
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}
            >
              {option.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

// Modern Button Component
const ModernButton = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white shadow-sm hover:shadow-md",
    secondary:
      "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600",
    ghost:
      "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200",
    danger:
      "bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white shadow-sm hover:shadow-md",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

// Modern Tooltip Component
const ModernTooltip = ({
  children,
  content,
}: {
  children: React.ReactNode;
  content: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 dark:bg-gray-700 rounded-lg shadow-lg -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full whitespace-nowrap">
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
        </div>
      )}
    </div>
  );
};

// Loading Skeleton Component
const NotificationSkeleton = () => (
  <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 animate-pulse">
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
      <div className="flex-1 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2"></div>
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-24"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-20"></div>
        </div>
      </div>
      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
    </div>
  </div>
);

export default function NotificationsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isFetching } = useQuery({
    queryKey: ["notifications", { filter }],
    queryFn: async () => {
      const res = await api.get("/notifications", {
        params: { unread_only: filter === "unread" },
      });
      return res.data as Notification[];
    },
    staleTime: 30_000,
    placeholderData: (prev) => prev,
  });

  const notifications = data ?? [];
  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const markOne = useMutation({
    mutationFn: async (id: string) => api.put(`/notifications/${id}/read`),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const markAll = useMutation({
    mutationFn: async () => api.put("/notifications/read-all"),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const getNotificationIcon = (type: string) => {
    const iconProps = "w-5 h-5";
    switch (type) {
      case "new_document":
        return (
          <FileText
            className={`${iconProps} text-blue-500 dark:text-blue-400`}
          />
        );
      case "document_updated":
        return (
          <AlertCircle
            className={`${iconProps} text-amber-500 dark:text-amber-400`}
          />
        );
      case "system":
        return (
          <Bell
            className={`${iconProps} text-purple-500 dark:text-purple-400`}
          />
        );
      default:
        return (
          <Bell className={`${iconProps} text-gray-500 dark:text-gray-400`} />
        );
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case "new_document":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      case "document_updated":
        return "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      case "system":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700";
    }
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;
  const totalCount = notifications.length;

  const tabOptions = [
    { value: "all", label: "All", count: totalCount },
    { value: "unread", label: "Unread", count: unreadCount },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Modern Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Notifications
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Stay updated with your latest activities and updates
              </p>
              {unreadCount > 0 && (
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-red-600 dark:text-red-400">
                    {unreadCount} unread notification
                    {unreadCount !== 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <ModernButton
                  onClick={() => markAll.mutate()}
                  variant="secondary"
                  disabled={markAll.isPending}
                >
                  <Check className="w-4 h-4" />
                  {markAll.isPending ? "Marking..." : "Mark All Read"}
                </ModernButton>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <ModernTabs
              value={filter}
              onChange={(value) => setFilter(value as "all" | "unread")}
              options={tabOptions}
            />

            <div className="relative max-w-md lg:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="search"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {isFetching ? (
            <>
              {Array.from({ length: 6 }).map((_, i) => (
                <NotificationSkeleton key={i} />
              ))}
            </>
          ) : filteredNotifications.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Bell className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {searchTerm
                  ? "No matching notifications"
                  : "No notifications yet"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                {searchTerm
                  ? "Try adjusting your search terms to find what you're looking for."
                  : "When you have new activities, they'll appear here to keep you informed."}
              </p>
              {searchTerm && (
                <ModernButton
                  onClick={() => setSearchTerm("")}
                  variant="secondary"
                  className="mt-4"
                >
                  Clear Search
                </ModernButton>
              )}
            </div>
          ) : (
            <>
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`group bg-white dark:bg-gray-900 rounded-2xl border transition-all duration-200 hover:shadow-lg ${
                    notification.is_read
                      ? "border-gray-200 dark:border-gray-800"
                      : "border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-900/10"
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`p-3 rounded-xl flex-shrink-0 ${
                          notification.is_read
                            ? "bg-gray-100 dark:bg-gray-800"
                            : "bg-white dark:bg-gray-800 shadow-sm"
                        }`}
                      >
                        {getNotificationIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <h3
                            className={`font-semibold text-lg leading-tight ${
                              notification.is_read
                                ? "text-gray-700 dark:text-gray-300"
                                : "text-gray-900 dark:text-white"
                            }`}
                          >
                            {notification.title}
                          </h3>
                          {!notification.is_read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 flex-shrink-0 mt-2"></div>
                          )}
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                          {notification.message}
                        </p>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <span
                            className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg border ${getNotificationBadge(
                              notification.type
                            )}`}
                          >
                            {notification.type.replace("_", " ").toUpperCase()}
                          </span>

                          <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="w-4 h-4 mr-2" />
                            {format(
                              new Date(notification.created_at),
                              "MMM dd, yyyy 'at' HH:mm"
                            )}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {notification.document_id && (
                              <a
                                href={`/${user?.role}/documents/${notification.document_id}`}
                                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                              >
                                <Eye className="w-4 h-4" />
                                View Document
                              </a>
                            )}
                          </div>

                          {!notification.is_read && (
                            <ModernTooltip content="Mark as read">
                              <ModernButton
                                onClick={() => markOne.mutate(notification.id)}
                                variant="ghost"
                                size="sm"
                                disabled={markOne.isPending}
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                              >
                                <Check className="w-4 h-4" />
                              </ModernButton>
                            </ModernTooltip>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Load More or Pagination could go here */}
        {filteredNotifications.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-500 dark:text-gray-400">
              Showing {filteredNotifications.length} of {totalCount}{" "}
              notifications
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

```

## app\(dashboard)\[role]\settings\layout.tsx

```typescript
export const dynamicParams = false;

export async function generateStaticParams() {
  return [
    { role: 'admin' },
    { role: 'editor' },
    { role: 'customer' },
  ];
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}


```

## app\(dashboard)\[role]\settings\page.tsx

```typescript
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
} from "lucide-react";
import api from "@/lib/api";
import { UserRole } from "@/types";

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

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "appearance", label: "Appearance", icon: Sun },
    { id: "notifications", label: "Notifications", icon: Bell },
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

```

## app\components\DocumentPreviewModal.tsx

```typescript
"use client";

import { useState, useEffect } from "react";
import {
  X,
  Download,
  Maximize2,
  Minimize2,
  FileText,
  AlertCircle,
  Loader2,
} from "lucide-react";
import api from "@/lib/api";
import mammoth from "mammoth";
import * as XLSX from "xlsx";
import { useToast } from "@/contexts/ToastContext";

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentId: string;
  documentTitle: string;
  fileName: string;
  mimeType?: string;
  canDownload?: boolean;
}

export default function DocumentPreviewModal({
  isOpen,
  onClose,
  documentId,
  documentTitle,
  fileName,
  mimeType,
  canDownload = false,
}: DocumentPreviewModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const toast = useToast();
  const [convertedContent, setConvertedContent] = useState<string | null>(null);
  const [excelData, setExcelData] = useState<{
    html: string;
    sheetNames: string[];
    currentSheet: string;
  } | null>(null);
  const [officeViewerUrl, setOfficeViewerUrl] = useState<string | null>(null);
  // Default to false in development unless explicitly enabled by env var
  const [useOfficeViewer, setUseOfficeViewer] = useState(
    process.env.NEXT_PUBLIC_ENABLE_OFFICE_VIEWER === "true"
  );
  const [officeViewerLoaded, setOfficeViewerLoaded] = useState(false);

  // Get file extension and type
  const fileExtension = fileName.split(".").pop()?.toLowerCase() || "";
  const isPDF = fileExtension === "pdf" || mimeType?.includes("pdf");
  const isWord = ["doc", "docx"].includes(fileExtension);
  const isExcel = ["xls", "xlsx"].includes(fileExtension);
  const isPowerPoint = ["ppt", "pptx"].includes(fileExtension);

  useEffect(() => {
    if (isOpen && documentId) {
      loadPreview();
    }
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, documentId]); // loadPreview and previewUrl are intentionally excluded to avoid infinite loops

  const loadPreview = async () => {
    setLoading(true);
    setError(null);
    setConvertedContent(null);
    setExcelData(null);
    setOfficeViewerUrl(null);
    setOfficeViewerLoaded(false);

    try {
      let blob: Blob;
      let publicUrl: string | null = null;

      // Handle demo documents differently
      if (documentId.startsWith("demo-")) {
        blob = await createDemoDocument(documentId);
      } else {
        // Try to get a public URL for Office Online Viewer
        try {
          const publicUrlResponse = await api.get(
            `/documents/${documentId}/public-url`
          );
          publicUrl = publicUrlResponse.data.url;
          console.log("Got public URL for Office Online Viewer:", publicUrl);
        } catch (err) {
          console.log("Public URL not available, falling back to blob:", err);
        }

        const response = await api.get(`/documents/${documentId}/preview`, {
          responseType: "blob",
        });

        // Prefer server-provided content-type; if not provided and file is PDF, force application/pdf
        const serverType =
          response.headers["content-type"] ||
          mimeType ||
          "application/octet-stream";
        const effectiveType =
          serverType === "application/octet-stream" && isPDF
            ? "application/pdf"
            : serverType;
        blob = new Blob([response.data], {
          type: effectiveType,
        });
      }

      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);

      // Try Microsoft Office Online Viewer for Office documents (only when a valid public https URL exists)
      if ((isWord || isExcel || isPowerPoint) && useOfficeViewer) {
        let urlToUse = publicUrl;

        // Filter out localhost/private URLs not reachable by Office Viewer
        const isPublicHttps = (url?: string | null) =>
          !!url &&
          /^https:\/\//i.test(url) &&
          !/localhost|127\.0\.0\.1|0\.0\.0\.0/i.test(url);

        // For demo documents, use a test URL
        if (documentId.startsWith("demo-") && !isPublicHttps(publicUrl)) {
          // Use a publicly available sample document for testing
          if (isWord) {
            urlToUse =
              "https://file-examples.com/storage/fe68c8c7c66c4d5b2b5c9e4/2017/10/file_example_DOC_100kB.doc";
          } else if (isExcel) {
            urlToUse =
              "https://file-examples.com/storage/fe68c8c7c66c4d5b2b5c9e4/2017/10/file_example_XLS_10.xls";
          } else if (isPowerPoint) {
            urlToUse =
              "https://file-examples.com/storage/fe68c8c7c66c4d5b2b5c9e4/2017/10/file_example_PPT_250kB.ppt";
          }
        }

        if (isPublicHttps(urlToUse)) {
          const officeUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
            urlToUse!
          )}`;
          console.log("Setting Office Online Viewer URL:", officeUrl);
          setOfficeViewerUrl(officeUrl);
        }
      }

      // Fallback to client-side conversion for Word and Excel when Office Viewer isn't used
      if ((isWord || isExcel) && !officeViewerUrl) {
        // Fallback to client-side conversion for Word and Excel
        if (isWord) {
          await convertWordDocument(blob);
        } else if (isExcel) {
          await convertExcelDocument(blob);
        }
      }
    } catch (err) {
      console.error("Error loading preview:", err);
      setError("Unable to load document preview. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const createDemoDocument = async (demoId: string): Promise<Blob> => {
    if (demoId === "demo-word") {
      return createDemoWordDocument();
    } else if (demoId === "demo-excel") {
      return createDemoExcelDocument();
    } else if (demoId === "demo-pdf") {
      return createDemoPDFDocument();
    } else if (demoId === "demo-powerpoint") {
      return createDemoPowerPointDocument();
    }
    throw new Error("Unknown demo document");
  };

  const createDemoWordDocument = (): Blob => {
    // Create a simple DOCX document using a minimal structure
    const content = `
      <html>
        <body>
          <h1>Demo Word Document</h1>
          <p>This is a demonstration of the Word document preview functionality.</p>
          <h2>Features</h2>
          <ul>
            <li>Real-time document conversion</li>
            <li>HTML rendering of Word content</li>
            <li>Preserves basic formatting</li>
          </ul>
          <p><strong>Note:</strong> This is a demo document created for testing purposes.</p>
        </body>
      </html>
    `;

    // For demo purposes, we'll simulate a converted document
    setConvertedContent(content);
    return new Blob([content], { type: "text/html" });
  };

  const createDemoExcelDocument = (): Blob => {
    // Create demo Excel data
    const demoData = {
      html: `
        <table border="1" style="border-collapse: collapse; width: 100%;">
          <tr style="background-color: #f0f0f0;">
            <th style="padding: 8px;">Product</th>
            <th style="padding: 8px;">Quantity</th>
            <th style="padding: 8px;">Price</th>
            <th style="padding: 8px;">Total</th>
          </tr>
          <tr>
            <td style="padding: 8px;">Widget A</td>
            <td style="padding: 8px; text-align: right;">10</td>
            <td style="padding: 8px; text-align: right;">$25.00</td>
            <td style="padding: 8px; text-align: right;">$250.00</td>
          </tr>
          <tr>
            <td style="padding: 8px;">Widget B</td>
            <td style="padding: 8px; text-align: right;">5</td>
            <td style="padding: 8px; text-align: right;">$45.00</td>
            <td style="padding: 8px; text-align: right;">$225.00</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 8px;"><strong>Total</strong></td>
            <td style="padding: 8px; text-align: right;"><strong>15</strong></td>
            <td style="padding: 8px;"></td>
            <td style="padding: 8px; text-align: right;"><strong>$475.00</strong></td>
          </tr>
        </table>
      `,
      sheetNames: ["Sheet1", "Summary"],
      currentSheet: "Sheet1",
    };

    setExcelData(demoData);
    return new Blob([demoData.html], { type: "text/html" });
  };

  const createDemoPDFDocument = (): Blob => {
    // Create a simple PDF-like content (in reality, this would be a real PDF)
    const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(Demo PDF Document) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000206 00000 n
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
300
%%EOF`;

    return new Blob([pdfContent], { type: "application/pdf" });
  };

  const createDemoPowerPointDocument = (): Blob => {
    // For PowerPoint, we just return a placeholder
    return new Blob(["Demo PowerPoint Content"], {
      type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    });
  };

  const convertWordDocument = async (blob: Blob) => {
    try {
      const arrayBuffer = await blob.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      setConvertedContent(result.value);

      if (result.messages.length > 0) {
        console.warn("Word conversion warnings:", result.messages);
      }
    } catch (err) {
      console.error("Error converting Word document:", err);
      setError("Unable to convert Word document for preview.");
    }
  };

  const convertExcelDocument = async (blob: Blob) => {
    try {
      const arrayBuffer = await blob.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      // Convert first sheet to HTML
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const htmlString = XLSX.utils.sheet_to_html(worksheet);

      setExcelData({
        html: htmlString,
        sheetNames: workbook.SheetNames,
        currentSheet: firstSheetName,
      });
    } catch (err) {
      console.error("Error converting Excel document:", err);
      setError("Unable to convert Excel document for preview.");
    }
  };

  const handleDownload = async () => {
    if (!canDownload) return;

    try {
      const response = await api.get(`/documents/${documentId}/download`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "application/octet-stream",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading document:", err);
      toast.error("Unable to download document. Please try again.");
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const renderPreviewContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center space-y-4">
            <Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin mx-auto" />
            <p className="text-gray-600 dark:text-gray-400">
              Loading preview...
            </p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center space-y-4 max-w-md">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Preview Error
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
            <button
              onClick={loadPreview}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    if (!previewUrl) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center space-y-4">
            <FileText className="w-12 h-12 text-gray-400 mx-auto" />
            <p className="text-gray-600 dark:text-gray-400">
              No preview available
            </p>
          </div>
        </div>
      );
    }

    // For PDFs, use iframe
    if (isPDF) {
      return (
        <iframe
          src={previewUrl}
          className="w-full h-full border-0"
          title={`Preview of ${documentTitle}`}
        />
      );
    }

    // For Office documents, try Microsoft Office Online Viewer first
    if ((isWord || isExcel || isPowerPoint) && officeViewerUrl) {
      return (
        <div className="w-full h-full flex flex-col">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Microsoft Office Online Viewer - 100% Accurate Preview
                </span>
              </div>
              {process.env.NEXT_PUBLIC_ENABLE_OFFICE_VIEWER === "true" && (
                <button
                  onClick={() => {
                    setUseOfficeViewer(false);
                    setOfficeViewerUrl(null);
                    loadPreview();
                  }}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Use Basic Viewer
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 relative">
            {!officeViewerLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 z-10">
                <div className="text-center space-y-4">
                  <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin mx-auto" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Loading Microsoft Office Viewer...
                  </p>
                </div>
              </div>
            )}
            <iframe
              src={officeViewerUrl}
              className="w-full h-full border-0"
              title={`Microsoft Office Preview of ${documentTitle}`}
              onLoad={() => {
                console.log("Office Online Viewer loaded successfully");
                setOfficeViewerLoaded(true);
              }}
              onError={(e) => {
                console.error(
                  "Office Online Viewer failed, falling back to basic viewer",
                  e
                );
                setUseOfficeViewer(false);
                setOfficeViewerUrl(null);
                setOfficeViewerLoaded(false);
                loadPreview();
              }}
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          </div>

          {canDownload && (
            <div className="mt-3 flex justify-center">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Download Original
              </button>
            </div>
          )}
        </div>
      );
    }

    // For Word documents, show converted HTML content (fallback)
    if (isWord) {
      return (
        <div className="w-full h-full flex flex-col">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Word Document Preview (Basic)
                </span>
              </div>
              <span className="text-xs text-blue-600 dark:text-blue-400">
                Limited formatting
              </span>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-lg overflow-auto border border-gray-200 dark:border-gray-700">
            {convertedContent ? (
              <div
                className="p-6 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: convertedContent }}
                style={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  lineHeight: "1.6",
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                  <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin mx-auto" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Converting document...
                  </p>
                </div>
              </div>
            )}
          </div>

          {canDownload && (
            <div className="mt-3 flex justify-center">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Download Original
              </button>
            </div>
          )}
        </div>
      );
    }

    // For Excel documents, show converted spreadsheet (fallback)
    if (isExcel) {
      return (
        <div className="w-full h-full flex flex-col">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-800 dark:text-green-200">
                  Excel Spreadsheet Preview (Basic)
                </span>
                {excelData?.sheetNames && excelData.sheetNames.length > 1 && (
                  <span className="text-xs text-green-600 dark:text-green-400 ml-2">
                    ({excelData.sheetNames.length} sheets)
                  </span>
                )}
              </div>
              <span className="text-xs text-green-600 dark:text-green-400">
                Limited formatting
              </span>
            </div>
          </div>

          <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg overflow-auto border border-gray-200 dark:border-gray-700">
            {excelData?.html ? (
              <div
                className="p-4"
                dangerouslySetInnerHTML={{ __html: excelData.html }}
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: "14px",
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                  <Loader2 className="w-8 h-8 text-green-600 dark:text-green-400 animate-spin mx-auto" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Converting spreadsheet...
                  </p>
                </div>
              </div>
            )}
          </div>

          {canDownload && (
            <div className="mt-3 flex justify-center">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Download Original
              </button>
            </div>
          )}
        </div>
      );
    }

    // For PowerPoint documents, show a message (fallback when Office Online Viewer not available)
    if (isPowerPoint) {
      return (
        <div className="w-full h-full flex flex-col">
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-orange-800 dark:text-orange-200">
                  PowerPoint Preview Not Available
                </h4>
                <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                  PowerPoint preview requires a public URL. Please download to
                  view or contact your administrator to enable public document
                  URLs.
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-800 dark:to-gray-900 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-6 p-8 max-w-md">
              <div className="w-20 h-20 bg-orange-600 dark:bg-orange-500 rounded-2xl flex items-center justify-center mx-auto">
                <FileText className="w-10 h-10 text-white" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {documentTitle}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-1">
                  PowerPoint Presentation
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
                  {fileName}
                </p>
              </div>

              {canDownload && (
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition-colors font-medium"
                >
                  <Download className="w-5 h-5" />
                  Download & Open
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Fallback for other file types
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <FileText className="w-12 h-12 text-gray-400 mx-auto" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Preview Not Available
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            This file type cannot be previewed in the browser.
          </p>
          {canDownload && (
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Download File
            </button>
          )}
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300 ${
          isFullscreen
            ? "w-full h-full max-w-none max-h-none"
            : "w-full max-w-6xl h-[90vh] max-h-[800px]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {documentTitle}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {fileName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {canDownload && (
              <button
                onClick={handleDownload}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Download Document"
              >
                <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            )}

            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Maximize2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title="Close Preview"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">{renderPreviewContent()}</div>
      </div>
    </div>
  );
}

```

## app\components\LoadingButton.tsx

```typescript
"use client";

import React from "react";
import { Loader2 } from "lucide-react";

type LoadingButtonVariant = "primary" | "secondary" | "danger" | "success" | "outline";
type LoadingButtonSize = "sm" | "md" | "lg";

type LoadingButtonProps = {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  variant?: LoadingButtonVariant;
  size?: LoadingButtonSize;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: React.ReactNode;
  loadingIcon?: React.ReactNode;
};

export default function LoadingButton({
  children,
  isLoading = false,
  loadingText,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  type = "button",
  onClick,
  icon,
  loadingIcon
}: LoadingButtonProps) {
  const isDisabled = disabled || isLoading;

  // Base classes
  const baseClasses = "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed";

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-2 text-sm h-9",
    md: "px-6 py-3 text-base h-12",
    lg: "px-8 py-4 text-lg h-14"
  };

  // Variant classes
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white shadow-sm focus:ring-blue-500",
    secondary: "bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white shadow-sm focus:ring-gray-500",
    danger: "bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white shadow-sm focus:ring-red-500",
    success: "bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white shadow-sm focus:ring-emerald-500",
    outline: "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-400 focus:ring-gray-500"
  };

  // Icon size based on button size
  const iconSize = {
    sm: "w-4 h-4",
    md: "w-4 h-4", 
    lg: "w-5 h-5"
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const displayIcon = isLoading 
    ? (loadingIcon || <Loader2 className={`${iconSize[size]} animate-spin`} />)
    : icon;

  const displayText = isLoading && loadingText ? loadingText : children;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={combinedClasses}
    >
      {displayIcon}
      <span>{displayText}</span>
    </button>
  );
}

```

## app\components\LoadingOverlay.tsx

```typescript
"use client";

import React from "react";
import Spinner from "./Spinner";

type LoadingOverlayProps = {
  message?: string;
  title?: string;
  isVisible?: boolean;
  variant?: "default" | "compact";
  className?: string;
};

export default function LoadingOverlay({ 
  message = "Processing...", 
  title = "Processing",
  isVisible = true,
  variant = "default",
  className = ""
}: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-800 max-w-sm w-full ${className}`}>
        <div className="text-center space-y-4">
          {/* Spinner */}
          <div className="flex justify-center">
            <Spinner 
              size={variant === "compact" ? 32 : 48} 
              variant="default" 
              color="primary" 
            />
          </div>
          
          {/* Content */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

```

## app\components\LoadingPage.tsx

```typescript
"use client";

import React from "react";
import Spinner from "./Spinner";

type LoadingPageVariant = "root" | "auth" | "dashboard";

type LoadingPageProps = {
  variant?: LoadingPageVariant;
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  showProgressDots?: boolean;
  showProgressItems?: boolean;
  progressItems?: string[];
  className?: string;
};

export default function LoadingPage({
  variant = "root",
  title,
  subtitle,
  showLogo = true,
  showProgressDots = true,
  showProgressItems = false,
  progressItems = ["Data", "Charts", "Insights"],
  className = ""
}: LoadingPageProps) {
  // Default content based on variant
  const getDefaultContent = () => {
    switch (variant) {
      case "auth":
        return {
          title: "Loading...",
          subtitle: "Please wait while we set up your workspace",
          spinnerSize: 64
        };
      case "dashboard":
        return {
          title: "Loading Dashboard",
          subtitle: "Setting up your analytics workspace",
          spinnerSize: 96
        };
      default: // root
        return {
          title: "Loading METSA Portal",
          subtitle: "Please wait while we prepare your workspace",
          spinnerSize: 80
        };
    }
  };

  const defaultContent = getDefaultContent();
  const finalTitle = title || defaultContent.title;
  const finalSubtitle = subtitle || defaultContent.subtitle;

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4 ${className}`}>
      <div className={`text-center ${variant === "dashboard" ? "max-w-md w-full" : ""}`}>
        {/* Logo */}
        {showLogo && (
          <div className="mb-8">
            <div className={`inline-block bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-2xl font-bold shadow-xl ${
              variant === "auth" ? "px-6 py-2 text-xl" : "px-8 py-3 text-2xl"
            }`}>
              METSA
            </div>
          </div>
        )}

        {/* Spinner */}
        <div className="mb-6 flex justify-center">
          <Spinner 
            size={defaultContent.spinnerSize} 
            variant="brand" 
            color="primary" 
          />
        </div>

        {/* Loading Text */}
        <h2 className={`font-bold text-gray-900 dark:text-white mb-2 ${
          variant === "dashboard" ? "text-2xl" : "text-xl"
        }`}>
          {finalTitle}
        </h2>
        <p className={`text-gray-600 dark:text-gray-400 ${
          variant === "dashboard" ? "mb-6" : variant === "auth" ? "text-sm" : "mb-4"
        }`}>
          {finalSubtitle}
        </p>

        {/* Progress Items (Dashboard only) */}
        {showProgressItems && variant === "dashboard" && (
          <div className="flex items-center justify-center space-x-2 mb-4">
            {progressItems.map((item, index) => (
              <div key={item} className="flex items-center space-x-2">
                <div 
                  className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"
                  style={{ animationDelay: `${index * 0.2}s` }}
                ></div>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Progress Dots */}
        {showProgressDots && (
          <div className={`flex items-center justify-center space-x-2 ${
            variant === "auth" ? "mt-4" : ""
          }`}>
            {Array.from({ length: variant === "root" ? 4 : 3 }).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        )}

        {/* Mini Dashboard Preview (Dashboard only) */}
        {variant === "dashboard" && (
          <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto mt-4">
            {[0, 1, 2].map((i) => (
              <div 
                key={i}
                className="h-8 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse border border-gray-200 dark:border-gray-700"
                style={{ animationDelay: `${i * 0.3}s` }}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

```

## app\components\Spinner.tsx

```typescript
"use client";

import React from "react";

type SpinnerVariant = "default" | "dots" | "pulse" | "ring" | "gradient" | "minimal" | "brand";

type SpinnerProps = {
  size?: number;
  className?: string;
  variant?: SpinnerVariant;
  color?: "primary" | "secondary" | "success" | "warning" | "error" | "white";
};

export default function Spinner({ 
  size = 20, 
  className = "", 
  variant = "default",
  color = "primary" 
}: SpinnerProps) {
  const style: React.CSSProperties = { width: size, height: size };

  const colorClasses = {
    primary: "border-blue-600 dark:border-blue-400",
    secondary: "border-gray-600 dark:border-gray-400", 
    success: "border-emerald-600 dark:border-emerald-400",
    warning: "border-amber-600 dark:border-amber-400",
    error: "border-red-600 dark:border-red-400",
    white: "border-white"
  };

  const gradientColors = {
    primary: "from-blue-600 to-purple-600",
    secondary: "from-gray-600 to-gray-800",
    success: "from-emerald-600 to-green-600", 
    warning: "from-amber-600 to-orange-600",
    error: "from-red-600 to-pink-600",
    white: "from-white to-gray-100"
  };

  if (variant === "dots") {
    return (
      <div 
        className={`flex items-center justify-center space-x-1 ${className}`}
        style={{ width: size * 2, height: size }}
        role="status"
        aria-label="Loading"
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`rounded-full bg-current animate-bounce ${colorClasses[color].split(' ')[0].replace('border-', 'text-')}`}
            style={{ 
              width: size / 4, 
              height: size / 4,
              animationDelay: `${i * 0.15}s`,
              animationDuration: '0.6s'
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div
        className={`rounded-full animate-pulse ${colorClasses[color].split(' ')[0].replace('border-', 'bg-')} opacity-75 ${className}`}
        style={style}
        role="status"
        aria-label="Loading"
      />
    );
  }

  if (variant === "ring") {
    return (
      <div className={`relative ${className}`} style={style} role="status" aria-label="Loading">
        <div className="absolute inset-0 rounded-full border-2 border-gray-200 dark:border-gray-700"></div>
        <div className={`absolute inset-0 rounded-full border-2 border-transparent ${colorClasses[color].split(' ')[0]} border-t-current animate-spin`}></div>
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <div className={`relative ${className}`} style={style} role="status" aria-label="Loading">
        <div className="absolute inset-0 rounded-full border-2 border-gray-200 dark:border-gray-800"></div>
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${gradientColors[color]} animate-spin`} style={{
          maskImage: `conic-gradient(from 0deg, transparent 270deg, black 360deg)`,
          WebkitMaskImage: `conic-gradient(from 0deg, transparent 270deg, black 360deg)`
        }}></div>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div
        className={`animate-spin rounded-full border border-current opacity-25 border-r-transparent ${colorClasses[color].split(' ')[0].replace('border-', 'text-')} ${className}`}
        style={style}
        role="status"
        aria-label="Loading"
      />
    );
  }

  if (variant === "brand") {
    return (
      <div className={`relative ${className}`} style={style} role="status" aria-label="Loading">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-800"></div>

        {/* Main spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-600 border-r-blue-600 animate-spin"></div>

        {/* Inner ring */}
        <div className="absolute inset-3 rounded-full border-2 border-gray-100 dark:border-gray-700"></div>

        {/* Counter-rotating inner ring */}
        <div
          className="absolute inset-3 rounded-full border-2 border-transparent border-b-blue-500 border-l-emerald-500 animate-spin"
          style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
        ></div>
      </div>
    );
  }

  // Default variant - modern ring spinner
  return (
    <div className={`relative ${className}`} style={style} role="status" aria-label="Loading">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border-2 border-gray-200 dark:border-gray-700"></div>
      
      {/* Spinning ring */}
      <div className={`absolute inset-0 rounded-full border-2 border-transparent ${colorClasses[color]} border-t-current border-r-current animate-spin`}></div>
      
      {/* Inner dot */}
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full ${colorClasses[color].split(' ')[0].replace('border-', 'bg-')} animate-pulse`} 
           style={{ width: size / 8, height: size / 8 }}></div>
    </div>
  );
}

```

## app\components\index.ts

```typescript
// Loading Components
export { default as Spinner } from './Spinner';
export { default as LoadingOverlay } from './LoadingOverlay';
export { default as LoadingButton } from './LoadingButton';
export { default as LoadingPage } from './LoadingPage';

```

## app\contexts\AuthContext.tsx

```typescript
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import api from '@/lib/api';
import { User, UserRole } from '@/types';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = Cookies.get('access_token');
    if (token) {
      try {
        const response = await api.get('/users/me');
        setUser(response.data);
      } catch {
        Cookies.remove('access_token');
      }
    }
    setIsLoading(false);
  };

  const login = async (username: string, password: string) => {
    // OAuth2PasswordRequestForm expects application/x-www-form-urlencoded
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    const response = await api.post('/auth/login', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    Cookies.set('access_token', response.data.access_token, { expires: 1 });

    const userResponse = await api.get('/users/me');
    setUser(userResponse.data);

    // Redirect directly to documents page based on role
    toast.success('Logged in successfully');
    switch (userResponse.data.role) {
      case UserRole.ADMIN:
        router.push('/admin/documents');
        break;
      case UserRole.EDITOR:
        router.push('/editor/documents');
        break;
      case UserRole.CUSTOMER:
        router.push('/customer/documents');
        break;
    }
  };

  const logout = () => {
    Cookies.remove('access_token');
    setUser(null);
    toast.info('Logged out');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

```

## app\contexts\QueryClientProvider.tsx

```typescript
"use client";

import { QueryClient, QueryClientProvider as Provider } from "@tanstack/react-query";
import React from "react";

let client: QueryClient | null = null;

function getClient() {
  if (!client) {
    client = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60_000,
          refetchOnWindowFocus: false,
          retry: 1,
        },
      },
    });
  }
  return client;
}

export function QueryClientProvider({ children }: { children: React.ReactNode }) {
  return <Provider client={getClient()}>{children}</Provider>;
}


```

## app\contexts\ThemeContext.tsx

```typescript
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark"); // Default to dark
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  // Get system theme
  const getSystemTheme = (): "light" | "dark" => {
    if (typeof window === "undefined") return "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  // Set theme and save to localStorage
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);

      // Apply theme logic moved here
      const root = document.documentElement;
      const resolved = newTheme === "system" ? getSystemTheme() : newTheme;

      // Remove both classes first
      root.classList.remove("light", "dark");
      // Add the resolved theme class
      root.classList.add(resolved);
      root.setAttribute("data-theme", resolved);
      // Update resolved theme state
      setResolvedTheme(resolved);
    }
  };

  // Initialize theme on mount
  useEffect(() => {
    // Apply theme to document (moved inside useEffect)
    const applyTheme = (themeToApply: Theme) => {
      const root = document.documentElement;
      const resolved =
        themeToApply === "system" ? getSystemTheme() : themeToApply;

      // Remove both classes first
      root.classList.remove("light", "dark");
      // Add the resolved theme class
      root.classList.add(resolved);
      root.setAttribute("data-theme", resolved);
      // Update resolved theme state
      setResolvedTheme(resolved);
    };

    // Get saved theme or default to dark
    const savedTheme = (localStorage.getItem("theme") as Theme) || "dark";
    setThemeState(savedTheme);
    applyTheme(savedTheme);
    setMounted(true);

    // Add mounted class for transitions
    document.documentElement.classList.add("mounted");

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const currentTheme = localStorage.getItem("theme") as Theme;
      if (currentTheme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (!mounted) {
    // Return null during SSR to avoid hydration mismatch
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

```

## app\contexts\ToastContext.tsx

```typescript
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";

export type ToastVariant = "success" | "error" | "info" | "warning";

export type ToastOptions = {
  id?: string;
  title?: string;
  message: string;
  variant?: ToastVariant;
  duration?: number; // ms
};

type ToastInternal = Required<Omit<ToastOptions, "id">> & { id: string };

type ToastContextType = {
  show: (opts: ToastOptions) => void;
  success: (
    message: string,
    opts?: Omit<ToastOptions, "message" | "variant">
  ) => void;
  error: (
    message: string,
    opts?: Omit<ToastOptions, "message" | "variant">
  ) => void;
  info: (
    message: string,
    opts?: Omit<ToastOptions, "message" | "variant">
  ) => void;
  warning: (
    message: string,
    opts?: Omit<ToastOptions, "message" | "variant">
  ) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastInternal[]>([]);
  const timers = useRef<Record<string, NodeJS.Timeout>>({});

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current[id];
    if (timer) {
      clearTimeout(timer);
      delete timers.current[id];
    }
  }, []);

  const show = useCallback(
    (opts: ToastOptions) => {
      const id = opts.id || Math.random().toString(36).slice(2);
      const toast: ToastInternal = {
        id,
        title: opts.title ?? "",
        message: opts.message,
        variant: opts.variant ?? "info",
        duration: opts.duration ?? 3000,
      };
      setToasts((prev) => [...prev, toast]);
      timers.current[id] = setTimeout(() => remove(id), toast.duration);
    },
    [remove]
  );

  const api = useMemo<ToastContextType>(
    () => ({
      show,
      success: (message, opts) =>
        show({ message, variant: "success", ...opts }),
      error: (message, opts) => show({ message, variant: "error", ...opts }),
      info: (message, opts) => show({ message, variant: "info", ...opts }),
      warning: (message, opts) =>
        show({ message, variant: "warning", ...opts }),
    }),
    [show]
  );

  useEffect(
    () => () => {
      // cleanup timers on unmount
      Object.values(timers.current).forEach(clearTimeout);
    },
    []
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[1000] space-y-3 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={
              "pointer-events-auto min-w-[260px] max-w-[360px] rounded-xl border p-4 shadow-lg text-sm " +
              (t.variant === "success"
                ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200"
                : t.variant === "error"
                ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200"
                : t.variant === "warning"
                ? "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200"
                : "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200")
            }
            role="status"
          >
            {t.title && <div className="font-semibold mb-0.5">{t.title}</div>}
            <div>{t.message}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

```

## app\hooks\useDebouncedValue.ts

```typescript
"use client";

import { useEffect, useState } from "react";

export function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}


```

## app\hooks\useNotifications.tsx

```typescript
"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export function useNotifications() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const response = await api.get("/notifications?unread_only=true");
      setUnreadCount(response.data.length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  return { unreadCount, refresh: fetchUnreadCount };
}

```

## app\lib\api.ts

```typescript
import axios from 'axios';
import Cookies from 'js-cookie';

// In development, use the full URL. In production (static export), use relative paths
const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1')
  : '/api/v1';  // Use relative path in production when served by FastAPI

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add withCredentials for CORS
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('access_token');
      // Use relative path for redirect
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

```

## app\lib\utils.ts

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

## app\types\index.ts

```typescript
export enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor",
  CUSTOMER = "customer",
}

export enum DocumentCategory {
  COMMERCIAL = "commercial",
  QUALITY = "quality",
  SAFETY = "safety",
  COMPLIANCE = "compliance",
  CONTRACTS = "contracts",
  SPECIFICATIONS = "specifications",
  OTHER = "other",
}

export enum DocumentVisibility {
  PUBLIC = "public",
  PRIVATE = "private",
  INTERNAL = "internal",
}

export enum ApprovalStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export interface CustomerInfo {
  company?: string;
  phone?: string;
  address?: string;
  [key: string]: any;
}

export interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  permissions: string[];
  customer_info?: CustomerInfo;
  is_active: boolean;
  is_verified: boolean;
  approval_status?: ApprovalStatus;
  approved_by?: string | null;
  approved_at?: string | null;
  rejection_reason?: string | null;
  created_at: string;
  updated_at: string;
  last_login?: string;
}

export interface Document {
  id: string;
  title: string;
  description?: string;
  category: DocumentCategory;
  visibility: DocumentVisibility;
  is_viewable_only: boolean;
  assigned_customers: string[];
  tags: string[];
  file_name: string;
  file_size: number;
  mime_type: string;
  uploaded_by: string;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  document_id?: string;
  user_id: string;
  is_read: boolean;
  created_at: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface SignupRequest {
  email: string;
  username: string;
  password: string;
  role: UserRole.CUSTOMER | UserRole.EDITOR;
  customer_info?: CustomerInfo;
}

```


---

*Documentation generated automatically*
