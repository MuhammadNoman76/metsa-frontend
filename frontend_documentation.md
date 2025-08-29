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
  webpack: (config: any) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
      encoding: false,
    };
    return config;
  },
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
    "@tanstack/react-query": "^5.85.5",
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
    "pdfjs-dist": "^3.11.174",
    "react": "19.1.0",
    "react-day-picker": "^9.8.1",
    "react-dom": "19.1.0",
    "react-pdf": "^7.7.1",
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
    "@types/react": "^18.3.24",
    "@types/react-dom": "^18.3.0",
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

## .vscode\settings.json

```json
{
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

  /* Prevent horizontal scrolling on mobile */
  html,
  body {
    overflow-x: hidden;
    width: 100%;
  }
}

/* Smooth transitions only after page loads */
html.mounted * {
  @apply transition-colors duration-300;
}

/* PDF viewer styles for mobile optimization */
.react-pdf__Document {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.react-pdf__Page {
  max-width: 100%;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.react-pdf__Page canvas {
  max-width: 100% !important;
  height: auto !important;
}

/* Mobile specific optimizations */
@media (max-width: 768px) {
  .react-pdf__Page {
    width: 100% !important;
  }

  .react-pdf__Page__textContent {
    width: 100% !important;
  }

  .react-pdf__Page__annotations {
    width: 100% !important;
  }
}

/* Ensure Word/Excel previews are responsive and do not overflow */
.word-preview,
.excel-preview {
  max-width: 100%;
  overflow-x: auto;
}

.word-preview img,
.excel-preview img {
  max-width: 100%;
  height: auto;
}

.excel-preview table {
  width: 100% !important;
  max-width: 100% !important;
  border-collapse: collapse;
}

.excel-preview table td,
.excel-preview table th {
  word-break: break-word;
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
  title: "Metsa Portal",
  description: "Your trusted partner for industrial solutions",
  icons: {
    icon: [{ url: "/metsa_logo.png", type: "image/png" }],
    shortcut: [{ url: "/metsa_logo.png" }],
    apple: [{ url: "/metsa_logo.png" }],
  },
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
        <link rel="icon" type="image/png" href="/metsa_logo.png" />
        <link rel="apple-touch-icon" href="/metsa_logo.png" />
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
import SimpleLoading from "@/components/SimpleLoading";

export default function RootLoading() {
  return <SimpleLoading message="Loading..." />;
}

```

## app\page.tsx

```typescript
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Spinner from "@/components/Spinner";

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
        router.replace("/login");
      }
    }
  }, [user, isLoading, router]);

  // Show loading spinner while checking authentication
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <Spinner
          size={64}
          variant="ring"
          color="primary"
          className="mx-auto mb-4"
        />
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
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
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="absolute left-0 right-0 -top-2 h-1 bg-gradient-to-r from-gray-200 via-[#1A8B47] to-gray-200 dark:from-gray-800 dark:via-[#1A8B47] dark:to-gray-800" />
        {children}
      </div>
    </div>
  );
}

//

```

## app\(auth)\loading.tsx

```typescript
import SimpleLoading from "@/components/SimpleLoading";

export default function AuthLoading() {
  return <SimpleLoading message="Loading..." />;
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

      // Show a toast using the computed message immediately
      const toastMsg =
        typeof axiosErr?.response?.data?.detail === "string"
          ? axiosErr.response?.data?.detail
          : "Invalid credentials. Please check your username/email and password.";
      toast.error(toastMsg);
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
            Sign in to MyMetsa
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

              {/* Security note */}
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl">
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Shield className="w-4 h-4" />
                  <span>Secure access to your MyMetsa portal</span>
                </div>
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

// Define proper type for signup data
interface SignupData {
  email: string;
  username: string;
  password: string;
  role: UserRole;
  customer_info?: {
    company: string;
    phone: string;
    address: string;
  };
}

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
      const signupData: SignupData = {
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
      <div className="min-h-[70vh] flex items-center justify-center p-4 bg-white dark:bg-gray-950">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-[#1A8B47] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Account Created Successfully!
            </h2>

            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p className="leading-relaxed">
                Your account has been created and is pending approval from our
                administrators.
              </p>

              <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <Info className="w-5 h-5 text-gray-700 dark:text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  You will receive an email notification once your account has
                  been reviewed and approved.
                </p>
              </div>

              <p className="text-sm">Redirecting to login page...</p>

              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-[#1A8B47] hover:underline"
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
          <h1 className="mt-6 text-3xl font-semibold text-gray-900 dark:text-white">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Join the MyMetsa portal to get started
          </p>
        </div>

        {/* Signup Card */}
        <div className="relative">
          <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="relative overflow-hidden bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl p-4">
                  <div className="relative flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-red-900 dark:text-red-200 mb-1">
                        Registration Failed
                      </h3>
                      <p className="text-sm text-red-700 dark:text-red-300">
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
                    className={`p-4 rounded-xl border transition-colors ${
                      formData.role === UserRole.CUSTOMER
                        ? "border-[#1A8B47] bg-[#1A8B47]/5"
                        : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                    }`}
                  >
                    <User className="w-6 h-6 mx-auto mb-2 text-[#1A8B47]" />
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
                    className={`p-4 rounded-xl border transition-colors ${
                      formData.role === UserRole.EDITOR
                        ? "border-[#1A8B47] bg-[#1A8B47]/5"
                        : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                    }`}
                  >
                    <Shield className="w-6 h-6 mx-auto mb-2 text-[#1A8B47]" />
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
                      className={`w-full h-12 pl-12 pr-4 bg-white dark:bg-gray-900 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A8B47] focus:border-[#1A8B47] text-gray-900 dark:text-gray-100 placeholder-gray-500 ${
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
                      className={`w-full h-12 pl-12 pr-4 bg-white dark:bg-gray-900 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A8B47] focus:border-[#1A8B47] text-gray-900 dark:text-gray-100 placeholder-gray-500 ${
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
                      className={`w-full h-12 pl-12 pr-12 bg-white dark:bg-gray-900 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A8B47] focus:border-[#1A8B47] text-gray-900 dark:text-gray-100 placeholder-gray-500 ${
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
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
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
                      className={`w-full h-12 pl-12 pr-12 bg-white dark:bg-gray-900 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A8B47] focus:border-[#1A8B47] text-gray-900 dark:text-gray-100 placeholder-gray-500 ${
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
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
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
                          className={`w-full h-12 pl-12 pr-4 bg-white dark:bg-gray-900 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A8B47] focus:border-[#1A8B47] text-gray-900 dark:text-gray-100 placeholder-gray-500 ${
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
                            className="w-full h-12 pl-12 pr-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A8B47] focus:border-[#1A8B47] text-gray-900 dark:text-gray-100 placeholder-gray-500"
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
                            className="w-full h-12 pl-12 pr-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A8B47] focus:border-[#1A8B47] text-gray-900 dark:text-gray-100 placeholder-gray-500"
                            placeholder="123 Main St, City"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Info Message */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-gray-700 dark:text-gray-300 mt-0.5" />
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    <p className="font-medium mb-1">
                      Account Approval Required
                    </p>
                    <p className="text-xs leading-relaxed">
                      After signup, your account will need to be approved by an
                      administrator before you can access the system. You{"'"}ll
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
                variant="primary"
                className="group relative w-full h-12 rounded-xl"
                icon={!isLoading ? <UserPlus className="w-5 h-5" /> : undefined}
              >
                Create Account
              </LoadingButton>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-[#1A8B47] hover:underline"
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
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "./components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 overflow-x-hidden">
      <Sidebar />
      {/* Main content wrapper */}
      <div className="flex overflow-x-hidden">
        {/* Spacer div that matches sidebar width */}
        <div className="hidden lg:block w-16 transition-all duration-300 sidebar-spacer" />

        {/* Main content */}
        <main className="flex-1 pt-[60px] lg:pt-0 transition-all duration-300 overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Add this style tag */}
      <style jsx>{`
        :global(aside:not(.w-16)) ~ div .sidebar-spacer {
          width: 16rem; /* 256px = w-64 */
        }
      `}</style>
    </div>
  );
}

```

## app\(dashboard)\loading.tsx

```typescript
import SimpleLoading from "@/components/SimpleLoading";

export default function DashboardLoading() {
  return <SimpleLoading message="Loading..." />;
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
import LoadingOverlay from "@/components/LoadingOverlay";
import SimpleLoading from "@/components/SimpleLoading";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";

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
  disabled = false,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  icon?: ElementType;
  disabled?: boolean;
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
        onClick={() => !disabled && setIsOpen((o) => !o)}
        disabled={disabled}
        className={`w-full h-11 sm:h-12 px-3 sm:px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-left flex items-center justify-between hover:border-blue-400 dark:hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
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

      {isOpen && !disabled && (
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
  disabled = false,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
}) => {
  return (
    <div
      className={`flex items-start justify-between p-4 sm:p-5 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 ${
        disabled ? "opacity-50" : ""
      }`}
    >
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
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
          checked
            ? "bg-blue-600 dark:bg-blue-500"
            : "bg-gray-300 dark:bg-gray-600"
        } ${disabled ? "cursor-not-allowed" : ""}`}
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
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
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
        <div className="flex flex-col-reverse sm:flex-row-reverse gap-3 justify-end">
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

export default function UsersManagementPage() {
  const { user: currentUser } = useAuth();
  const toast = useToast();
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
  const [showEditPassword, setShowEditPassword] = useState(false);
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
    password: "", // Added password field
    changePassword: false, // Track if password should be changed
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
    } catch (err: unknown) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if trying to create admin without being super admin
    if (newUser.role === UserRole.ADMIN && !currentUser?.is_super_admin) {
      toast.error("Only super admin can create admin users");
      return;
    }

    setSaving(true);
    try {
      await api.post("/users", newUser);
      toast.success("User created successfully");
      setIsCreateDialogOpen(false);
      setNewUser({
        username: "",
        email: "",
        password: "",
        role: UserRole.CUSTOMER,
      });
      await fetchUsers();
    } catch (err: unknown) {
      console.error("Error creating user:", err);
      const error = err as { response?: { data?: { detail?: string } } };
      toast.error(error.response?.data?.detail || "Error creating user");
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
      password: "",
      changePassword: false,
    });
    setShowEditPassword(false);
    setIsEditDialogOpen(true);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    // Check role change permissions
    if (
      editUser.role === UserRole.ADMIN &&
      selectedUser.role !== UserRole.ADMIN &&
      !currentUser?.is_super_admin
    ) {
      toast.error("Only super admin can assign admin role");
      return;
    }

    setSaving(true);
    try {
      // Prepare update data
      const updateData: {
        username: string;
        email: string;
        role: UserRole;
        is_active: boolean;
        password?: string;
      } = {
        username: editUser.username,
        email: editUser.email,
        role: editUser.role,
        is_active: editUser.is_active,
      };

      // Only include password if it's being changed
      if (editUser.changePassword && editUser.password) {
        updateData.password = editUser.password;
      }

      await api.put(`/users/${selectedUser.id}`, updateData);
      toast.success("User updated successfully");
      setIsEditDialogOpen(false);
      setSelectedUser(null);
      await fetchUsers();
    } catch (err: unknown) {
      console.error("Error updating user:", err);
      const error = err as { response?: { data?: { detail?: string } } };
      toast.error(error.response?.data?.detail || "Error updating user");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (userId: string, currentStatus: boolean) => {
    try {
      await api.put(`/users/${userId}`, { is_active: !currentStatus });
      toast.success(
        `User ${!currentStatus ? "activated" : "deactivated"} successfully`
      );
      await fetchUsers();
    } catch (err: unknown) {
      console.error("Error updating user status:", err);
      const error = err as { response?: { data?: { detail?: string } } };
      toast.error(
        error.response?.data?.detail || "Failed to update user status"
      );
    }
  };

  const handleDeleteUser = async () => {
    try {
      await api.delete(`/users/${confirmDialog.userId}`);
      toast.success("User deleted successfully");
      setConfirmDialog({ isOpen: false, userId: "", username: "" });
      await fetchUsers();
    } catch (err: unknown) {
      console.error("Error deleting user:", err);
      const error = err as { response?: { data?: { detail?: string } } };
      toast.error(error.response?.data?.detail || "Error deleting user");
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

  const createRoleOptions = useMemo(() => {
    // Only super admin can create admin users
    if (currentUser?.is_super_admin) {
      return Object.values(UserRole).map((role) => ({
        value: role,
        label: role.charAt(0).toUpperCase() + role.slice(1),
      }));
    } else {
      return Object.values(UserRole)
        .filter((role) => role !== UserRole.ADMIN)
        .map((role) => ({
          value: role,
          label: role.charAt(0).toUpperCase() + role.slice(1),
        }));
    }
  }, [currentUser]);

  const editRoleOptions = useMemo(() => {
    // Only super admin can assign admin role
    if (currentUser?.is_super_admin) {
      return Object.values(UserRole).map((role) => ({
        value: role,
        label: role.charAt(0).toUpperCase() + role.slice(1),
      }));
    } else {
      return Object.values(UserRole)
        .filter((role) => role !== UserRole.ADMIN)
        .map((role) => ({
          value: role,
          label: role.charAt(0).toUpperCase() + role.slice(1),
        }));
    }
  }, [currentUser]);

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

  if (loading) return <SimpleLoading message="Loading..." fullScreen />;

  /* User Card (Grid) - Updated with password change button */
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
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate">
                {user.username}
              </h3>
              {user.is_super_admin && (
                <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs font-bold rounded-full">
                  <Shield className="w-3 h-3" />
                  SUPER
                </div>
              )}
            </div>
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
        {!user.is_super_admin && (
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
        )}
        {user.is_super_admin && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800">
            <CheckCircle className="w-3 h-3" />
            Always Active
          </span>
        )}
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
        {!user.is_super_admin ? (
          <>
            <button
              onClick={() => handleEditClick(user)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 px-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
            >
              <Edit className="w-3.5 h-3.5" />
              Edit
            </button>
            <button
              onClick={() =>
                setConfirmDialog({
                  isOpen: true,
                  userId: user.id,
                  username: user.username,
                })
              }
              className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 px-3 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          </>
        ) : currentUser?.is_super_admin ? (
          <>
            <button
              onClick={() => handleEditClick(user)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 px-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
            >
              <Edit className="w-3.5 h-3.5" />
              Edit
            </button>
            <div className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 px-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-400 text-sm font-medium rounded-lg border border-purple-200 dark:border-purple-800">
              <Shield className="w-3.5 h-3.5" />
              Protected
            </div>
          </>
        ) : (
          <div className="w-full inline-flex items-center justify-center gap-1.5 h-9 px-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-400 text-sm font-medium rounded-lg border border-purple-200 dark:border-purple-800">
            <Shield className="w-4 h-4" />
            Super Admin Protected
          </div>
        )}
      </div>
    </div>
  );

  /* User Row (List) - Updated with password change button */
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
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
              {user.username}
            </h3>
            {user.is_super_admin && (
              <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs font-bold rounded-full">
                <Shield className="w-3 h-3" />
                SUPER
              </div>
            )}
          </div>
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
        {!user.is_super_admin ? (
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
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800">
            <CheckCircle className="w-3 h-3" />
            Always Active
          </span>
        )}
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
          {!user.is_super_admin ? (
            <>
              <button
                onClick={() => handleEditClick(user)}
                className="inline-flex items-center justify-center gap-1.5 h-9 px-3 border border-gray-300 dark:border-gray-700 bg-transparent text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>

              <button
                onClick={() =>
                  setConfirmDialog({
                    isOpen: true,
                    userId: user.id,
                    username: user.username,
                  })
                }
                className="inline-flex items-center justify-center gap-1.5 h-9 px-3 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </>
          ) : currentUser?.is_super_admin ? (
            <>
              <button
                onClick={() => handleEditClick(user)}
                className="inline-flex items-center justify-center gap-1.5 h-9 px-3 border border-gray-300 dark:border-gray-700 bg-transparent text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>

              <div className="inline-flex items-center justify-center gap-1.5 h-9 px-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-400 text-sm font-medium rounded-lg border border-purple-200 dark:border-purple-800">
                <Shield className="w-4 h-4" />
                Protected
              </div>
            </>
          ) : (
            <div className="inline-flex items-center justify-center gap-1.5 h-9 px-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-400 text-sm font-medium rounded-lg border border-purple-200 dark:border-purple-800">
              <Shield className="w-4 h-4" />
              Super Admin
            </div>
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

      {/* Create User Modal - No changes needed */}
      <ModernModal
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        title="Create New User"
      >
        <form onSubmit={handleCreateUser} className="space-y-5 sm:space-y-6">
          {currentUser?.is_super_admin && newUser.role === UserRole.ADMIN && (
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5" />
                <div className="text-xs">
                  <p className="font-medium text-purple-800 dark:text-purple-200">
                    Creating Admin User
                  </p>
                </div>
              </div>
            </div>
          )}

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
              options={createRoleOptions}
              placeholder="Select role"
              icon={Shield}
            />
            {!currentUser?.is_super_admin && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Only super admin can create admin users
              </p>
            )}
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

      {/* Edit User Modal - Updated with optional password change */}
      <ModernModal
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        title="Edit User"
      >
        <form onSubmit={handleUpdateUser} className="space-y-5 sm:space-y-6">
          {selectedUser?.is_super_admin && (
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5" />
                <div className="text-xs">
                  <p className="font-medium text-purple-800 dark:text-purple-200 mb-1">
                    Super Admin Account
                  </p>
                  <p className="text-purple-700 dark:text-purple-300">
                    Limited editing capabilities for security.
                  </p>
                </div>
              </div>
            </div>
          )}

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
              options={editRoleOptions}
              placeholder="Select role"
              icon={Shield}
              disabled={selectedUser?.is_super_admin}
            />
            {selectedUser?.is_super_admin && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Super admin role cannot be changed
              </p>
            )}
            {!currentUser?.is_super_admin &&
              editUser.role !== selectedUser?.role && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Only super admin can assign admin role
                </p>
              )}
          </div>

          {!selectedUser?.is_super_admin ? (
            <ModernToggle
              checked={editUser.is_active}
              onChange={(checked) =>
                setEditUser({ ...editUser, is_active: checked })
              }
              label="Account Status"
              description="Enable or disable user account access."
            />
          ) : (
            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Super admin account is always active
              </p>
            </div>
          )}

          {/* Password Change Toggle Section */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <ModernToggle
              checked={editUser.changePassword}
              onChange={(checked) => {
                setEditUser({
                  ...editUser,
                  changePassword: checked,
                  password: "",
                });
                if (!checked) setShowEditPassword(false);
              }}
              label="Change Password"
              description="Set a new password for this user."
            />

            {editUser.changePassword && (
              <div className="mt-4 space-y-2">
                <label
                  htmlFor="edit-password"
                  className="block text-sm font-semibold text-gray-900 dark:text-white"
                >
                  New Password<span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    id="edit-password"
                    type={showEditPassword ? "text" : "password"}
                    value={editUser.password}
                    onChange={(e) =>
                      setEditUser({ ...editUser, password: e.target.value })
                    }
                    placeholder="Enter new password"
                    required={editUser.changePassword}
                    minLength={editUser.changePassword ? 6 : undefined}
                    className="w-full h-11 sm:h-12 px-4 pr-12 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowEditPassword((s) => !s)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    aria-label={
                      showEditPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showEditPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Minimum 6 characters required
                </p>
              </div>
            )}
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
import { useNotifications } from "@/hooks/useNotifications";
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
  const { unreadCount } = useNotifications();

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

  // Close mobile dropdown on large screens
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

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
      {/* Mobile Header Bar - Always visible on mobile */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-gray-950 to-gray-900 shadow-lg">
        <div className="flex items-center justify-between px-4 py-3 h-[60px]">
          {/* Logo and Brand */}
          <Link
            href={`/${role}/documents`}
            className="flex items-center gap-2"
            aria-label="Go to Documents"
          >
            <div className="flex items-center justify-center rounded-md bg-white/5 p-1.5">
              <Image
                src="/metsa_logo.png"
                alt="Metsä"
                width={32}
                height={32}
                priority
                className="h-7 w-auto object-contain"
              />
            </div>
            <span className="text-white text-sm font-semibold tracking-wide">
              Dashboard
            </span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={toggleMobile}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
            className="inline-flex items-center justify-center rounded-lg bg-white/10 text-white p-2 hover:bg-white/20 transition-colors"
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Overlay and Menu */}
      {isMobileOpen && (
        <>
          {/* Overlay */}
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-[90]"
            onClick={() => setIsMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Dropdown Menu */}
          <nav className="lg:hidden fixed top-[60px] left-0 right-0 bottom-0 z-[95] bg-gray-900 overflow-y-auto">
            <div className="px-4 py-4 space-y-1">
              {filteredNavigation.map((item) => {
                const Icon = item.icon;
                const active = isActivePath(item.href);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                      active
                        ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.name === "Notifications" ? (
                      <span className="relative inline-flex mr-3">
                        <Icon className="h-5 w-5 shrink-0" />
                        {unreadCount > 0 && (
                          <span
                            className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full h-4 min-w-[16px] px-0.5 text-[9px] font-semibold bg-red-500 text-white shadow"
                            aria-label={`${unreadCount} unread notifications`}
                          >
                            {unreadCount > 99 ? "99+" : unreadCount}
                          </span>
                        )}
                      </span>
                    ) : (
                      <Icon className="h-5 w-5 mr-3 shrink-0" />
                    )}
                    <span>{item.name}</span>
                    {active && (
                      <span className="ml-auto inline-block h-2 w-2 rounded-full bg-white/90" />
                    )}
                  </Link>
                );
              })}

              {/* User Info Section */}
              <div className="border-t border-white/10 mt-4 pt-4">
                <div className="flex items-center rounded-lg bg-white/5 px-3 py-3 mb-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-sm font-bold shrink-0">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {user.email}
                    </p>
                    <p className="text-xs text-gray-400 capitalize">
                      {String(user.role)}
                    </p>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setIsMobileOpen(false);
                  }}
                  className="flex w-full items-center rounded-lg px-3 py-3 text-sm font-medium text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-3 shrink-0" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </nav>
        </>
      )}

      {/* Desktop Sidebar - Hidden on mobile, visible on lg+ */}
      <aside
        className={cn(
          "hidden lg:flex fixed inset-y-0 left-0 z-40 flex-col",
          "bg-gradient-to-b from-gray-950 to-gray-900",
          "text-white shadow-2xl transition-all duration-300",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        {/* Desktop Header */}
        <div
          className={cn(
            "flex items-center border-b border-white/10 h-[60px]",
            isCollapsed ? "justify-center px-0" : "justify-between px-4"
          )}
        >
          {!isCollapsed ? (
            <>
              <Link
                href={`/${role}/documents`}
                className="flex items-center gap-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                aria-label="Go to Documents"
              >
                <div className="flex items-center justify-center rounded-md bg-white/5 p-1.5">
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
              {/* Desktop Collapse Button - When expanded */}
              <button
                type="button"
                onClick={toggleCollapse}
                aria-label="Collapse sidebar"
                aria-pressed={false}
                className="p-2 rounded-md hover:bg-white/10 transition-colors"
              >
                <Menu size={18} />
              </button>
            </>
          ) : (
            /* When collapsed - centered button */
            <button
              type="button"
              onClick={toggleCollapse}
              aria-label="Expand sidebar"
              aria-pressed={true}
              className="p-3 rounded-md hover:bg-white/10 transition-colors"
            >
              <Menu size={18} />
            </button>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          {filteredNavigation.map((item) => {
            const Icon = item.icon;
            const active = isActivePath(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
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
                  "px-2.5 py-2 text-sm font-medium transition-all",
                  active
                    ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md shadow-emerald-600/20"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                )}
                title={isCollapsed ? item.name : undefined}
                aria-current={active ? "page" : undefined}
              >
                {item.name === "Notifications" ? (
                  <span
                    className={cn(
                      "relative inline-flex",
                      isCollapsed ? "mx-auto" : "mr-3"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5 shrink-0",
                        active
                          ? "scale-110"
                          : "group-hover:scale-105 transition-transform"
                      )}
                    />
                    {unreadCount > 0 && (
                      <span
                        className={cn(
                          "absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full text-[9px] font-semibold",
                          isCollapsed
                            ? "h-3.5 w-3.5"
                            : "h-4 min-w-[16px] px-0.5",
                          "bg-red-500 text-white shadow"
                        )}
                        aria-label={`${unreadCount} unread notifications`}
                      >
                        {unreadCount > 99 ? "99+" : unreadCount}
                      </span>
                    )}
                  </span>
                ) : (
                  <Icon
                    className={cn(
                      "h-5 w-5 shrink-0",
                      isCollapsed ? "mx-auto" : "mr-3",
                      active
                        ? "scale-110"
                        : "group-hover:scale-105 transition-transform"
                    )}
                  />
                )}
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

        {/* Desktop Footer */}
        <div className="border-t border-white/10 p-3 space-y-2">
          <div
            className={cn(
              "flex items-center rounded-lg bg-white/5 px-2.5 py-2",
              isCollapsed ? "justify-center" : "justify-start"
            )}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-sm font-bold shrink-0">
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

          <button
            type="button"
            onClick={logout}
            className={cn(
              "group flex w-full items-center rounded-lg px-2.5 py-2 text-sm font-medium",
              "text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition-colors",
              isCollapsed ? "justify-center" : ""
            )}
          >
            <LogOut
              className={cn("h-5 w-5 shrink-0", isCollapsed ? "" : "mr-3")}
            />
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

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ElementType, ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useToast } from "@/contexts/ToastContext";
import { User, UserRole } from "@/types";
import { format } from "date-fns";
import SimpleLoading from "@/components/SimpleLoading";
import LoadingOverlay from "@/components/LoadingOverlay";
import {
  UserCheck,
  UserX,
  Clock,
  Search,
  Building,
  Mail,
  Phone,
  Calendar,
  Shield,
  Loader2,
  Filter,
  X,
  ChevronDown,
  Check,
  Grid,
  List,
  AlertCircle,
  Users,
  MapPin,
  CheckCircle,
  XCircle,
} from "lucide-react";

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
  disabled = false,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  icon?: ElementType;
  disabled?: boolean;
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
        onClick={() => !disabled && setIsOpen((o) => !o)}
        disabled={disabled}
        className={`w-full h-11 sm:h-12 px-3 sm:px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-left flex items-center justify-between hover:border-blue-400 dark:hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
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

      {isOpen && !disabled && (
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

/* Modal (Escape to close) */
const ModernModal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-2xl",
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: string;
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
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <button
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`relative bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-6 ${maxWidth} w-full shadow-2xl border border-gray-200 dark:border-gray-800 max-h-[90vh] overflow-y-auto`}
      >
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

const formatRoleLabel = (role: string) =>
  role ? role.charAt(0).toUpperCase() + role.slice(1).toLowerCase() : "";

export default function ApprovalsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const toast = useToast();

  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // View mode (persisted)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  useEffect(() => {
    const stored = localStorage.getItem("approvals:viewMode");
    if (stored === "list" || stored === "grid") setViewMode(stored);
  }, []);
  useEffect(() => {
    localStorage.setItem("approvals:viewMode", viewMode);
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

  // Modal state
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  // Check permissions
  useEffect(() => {
    if (user && user.role !== UserRole.ADMIN && user.role !== UserRole.EDITOR) {
      router.push(`/${user.role}/documents`);
    }
  }, [user, router]);

  const fetchPendingUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/users/pending");
      setPendingUsers(response.data);
    } catch (err: unknown) {
      console.error("Error fetching pending users:", err);
      setError("Failed to load pending approvals. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPendingUsers();
  }, [fetchPendingUsers]);

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
      setShowRejectForm(false);
      setRejectionReason("");
      fetchPendingUsers();
    } catch (err: unknown) {
      console.error("Error approving user:", err);
      const error = err as { response?: { data?: { detail?: string } } };
      toast.error(error.response?.data?.detail || "Failed to approve user");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!selectedUser || !rejectionReason.trim()) return;

    setIsProcessing(true);
    try {
      await api.post(`/users/${selectedUser.id}/approve`, {
        approved: false,
        rejection_reason: rejectionReason,
      });

      toast.success(`User ${selectedUser.username} has been rejected`);
      setIsModalOpen(false);
      setSelectedUser(null);
      setShowRejectForm(false);
      setRejectionReason("");
      fetchPendingUsers();
    } catch (err: unknown) {
      console.error("Error rejecting user:", err);
      const error = err as { response?: { data?: { detail?: string } } };
      toast.error(error.response?.data?.detail || "Failed to reject user");
    } finally {
      setIsProcessing(false);
    }
  };

  const roleOptions = useMemo(
    () => [
      { value: "all", label: "All Roles" },
      { value: UserRole.CUSTOMER, label: "Customer" },
      { value: UserRole.EDITOR, label: "Editor" },
    ],
    []
  );

  const filteredUsers = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    return pendingUsers.filter((u) => {
      const matchesSearch =
        !q ||
        u.username.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.customer_info?.company &&
          u.customer_info.company.toLowerCase().includes(q));
      const matchesRole = roleFilter === "all" || u.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [pendingUsers, debouncedSearch, roleFilter]);

  if (loading) return <SimpleLoading message="Loading..." fullScreen />;

  /* User Card (Grid) */
  const UserCard = ({ user }: { user: User }) => (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-4 sm:p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
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
        <Clock className="w-5 h-5 text-amber-500 flex-shrink-0" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border ${getRoleColor(
            user.role
          )}`}
        >
          <Shield className="w-3 h-3" />
          {formatRoleLabel(user.role)}
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800">
          <Clock className="w-3 h-3" />
          Pending
        </span>
      </div>

      {user.customer_info && (
        <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1 pt-2 border-t border-gray-200 dark:border-gray-800">
          {user.customer_info.company && (
            <div className="flex items-center gap-1.5">
              <Building className="w-3 h-3" />
              <span className="truncate">{user.customer_info.company}</span>
            </div>
          )}
          {user.customer_info.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-3 h-3" />
              <span>{user.customer_info.phone}</span>
            </div>
          )}
          {user.customer_info.address && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{user.customer_info.address}</span>
            </div>
          )}
        </div>
      )}

      <div className="text-xs text-gray-500 dark:text-gray-400">
        <p>Applied: {format(new Date(user.created_at), "MMM dd, yyyy")}</p>
      </div>

      <button
        onClick={() => {
          setSelectedUser(user);
          setIsModalOpen(true);
        }}
        className="w-full inline-flex items-center justify-center gap-1.5 h-9 px-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all"
      >
        <UserCheck className="w-3.5 h-3.5" />
        Review Application
      </button>
    </div>
  );

  /* User Row (List) */
  const UserRow = ({ user }: { user: User }) => (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
      {/* LEFT: User Info */}
      <div className="flex items-center gap-4 min-w-0 flex-grow">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
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

      {/* RIGHT: Status, Info, Actions */}
      <div className="flex items-center flex-wrap justify-end gap-x-4 gap-y-2">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border ${getRoleColor(
            user.role
          )}`}
        >
          <Shield className="w-3 h-3" />
          {formatRoleLabel(user.role)}
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800">
          <Clock className="w-3 h-3" />
          Pending
        </span>

        {user.customer_info?.company && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <Building className="w-3 h-3" />
            {user.customer_info.company}
          </span>
        )}

        <div className="text-xs text-gray-500 dark:text-gray-400 flex flex-col items-end">
          <span>
            Applied: {format(new Date(user.created_at), "MMM dd, yyyy")}
          </span>
        </div>

        <button
          onClick={() => {
            setSelectedUser(user);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center justify-center gap-1.5 h-9 px-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <UserCheck className="w-4 h-4" />
          Review
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {isProcessing && <LoadingOverlay message="Processing request..." />}

      {/* Header (auto-hide on scroll) */}
      <div
        className={`bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 transition-transform duration-300 ease-out ${
          headerHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                  User Approvals
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {filteredUsers.length} pending{" "}
                  {filteredUsers.length === 1 ? "request" : "requests"}
                </p>
              </div>
            </div>

            <div className="w-full lg:w-auto flex justify-end">
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 border border-gray-200 dark:border-gray-700 min-w-[112px]">
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
                    placeholder="Search by username, email, or company..."
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
              <UserCheck className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {debouncedSearch || roleFilter !== "all"
                ? "No Matching Approvals"
                : "No Pending Approvals"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 sm:text-base">
              {debouncedSearch || roleFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "All user registrations have been reviewed."}
            </p>
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

      {/* Review Modal */}
      <ModernModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
          setShowRejectForm(false);
          setRejectionReason("");
        }}
        title="Review Account Application"
        maxWidth="max-w-2xl"
      >
        {selectedUser && (
          <div className="space-y-5 sm:space-y-6">
            {/* User Avatar and Basic Info */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {selectedUser.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {selectedUser.username}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedUser.email}
                </p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  Role Requested
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg border ${getRoleColor(
                    selectedUser.role
                  )}`}
                >
                  <Shield className="w-4 h-4" />
                  {formatRoleLabel(selectedUser.role)}
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Applied On
                </label>
                <p className="font-medium text-gray-900 dark:text-white">
                  {format(
                    new Date(selectedUser.created_at),
                    "MMM dd, yyyy 'at' HH:mm"
                  )}
                </p>
              </div>
            </div>

            {/* Customer Information */}
            {selectedUser.role === UserRole.CUSTOMER &&
              selectedUser.customer_info && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Company Information
                  </h4>
                  <div className="space-y-2">
                    {selectedUser.customer_info.company && (
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {selectedUser.customer_info.company}
                        </span>
                      </div>
                    )}
                    {selectedUser.customer_info.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {selectedUser.customer_info.phone}
                        </span>
                      </div>
                    )}
                    {selectedUser.customer_info.address && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {selectedUser.customer_info.address}
                        </span>
                      </div>
                    )}
                    {selectedUser.customer_info.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {selectedUser.customer_info.email}
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
                  Rejection Reason<span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Please provide a reason for rejecting this application..."
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-red-300 dark:border-red-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 shadow-sm"
                  rows={3}
                  required
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row-reverse gap-3 pt-2">
              {!showRejectForm ? (
                <>
                  <button
                    onClick={handleApprove}
                    disabled={isProcessing}
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 shadow-sm disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <UserCheck className="w-5 h-5" />
                        Approve User
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setShowRejectForm(true)}
                    disabled={isProcessing}
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-sm disabled:cursor-not-allowed"
                  >
                    <UserX className="w-5 h-5" />
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setSelectedUser(null);
                    }}
                    disabled={isProcessing}
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
                  >
                    <X className="w-5 h-5" />
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleReject}
                    disabled={isProcessing || !rejectionReason.trim()}
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-sm disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <UserX className="w-5 h-5" />
                        Confirm Rejection
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setShowRejectForm(false);
                      setRejectionReason("");
                    }}
                    disabled={isProcessing}
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
                  >
                    Back to Review
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </ModernModal>
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

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ElementType, ReactNode } from "react";
import { useRouter } from "next/navigation";
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
  FolderOpen,
  Users,
  Lock,
  Globe,
  ChevronDown,
  X,
  Shield,
  EyeOff,
  Check,
  AlertCircle,
  Filter,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import api from "@/lib/api";
import { Document, DocumentVisibility, UserRole } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import DocumentPreviewModal from "@/components/DocumentPreviewModal";
import { useToast } from "@/contexts/ToastContext";
import LoadingOverlay from "@/components/LoadingOverlay";
import SimpleLoading from "@/components/SimpleLoading";
import { useCategories } from "@/hooks/useCategories";

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
            Delete Document
          </button>
        </div>
      </div>
    </ModernModal>
  );
};

/* Helpers */
const getVisibilityColor = (visibility: string) => {
  switch (visibility) {
    case "public":
      return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";
    case "private":
      return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800";
    case "internal":
      return "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800";
    default:
      return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-700";
  }
};

const getVisibilityIcon = (visibility: string) => {
  switch (visibility) {
    case "public":
      return <Globe className="w-3 h-3" />;
    case "private":
      return <Lock className="w-3 h-3" />;
    case "internal":
      return <Users className="w-3 h-3" />;
    default:
      return null;
  }
};

const formatFileSize = (bytes: number) => {
  const kb = bytes / 1024;
  const mb = kb / 1024;
  if (mb >= 1) {
    return `${mb.toFixed(1)} MB`;
  } else if (kb >= 1) {
    return `${kb.toFixed(0)} KB`;
  } else {
    return `${bytes} B`;
  }
};

/* Main Page */
export default function DocumentsPage() {
  const router = useRouter();
  const toast = useToast();
  const { user } = useAuth();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  // State
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadingIds, setDownloadingIds] = useState<Set<string>>(new Set());

  // View mode (persisted)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  useEffect(() => {
    const stored = localStorage.getItem("documents:viewMode");
    if (stored === "list" || stored === "grid") setViewMode(stored);
  }, []);
  useEffect(() => {
    localStorage.setItem("documents:viewMode", viewMode);
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

  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [visibilityFilter, setVisibilityFilter] = useState<string>("all");

  // Confirm delete
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    documentId: string;
    documentTitle: string;
  }>({ isOpen: false, documentId: "", documentTitle: "" });

  // Preview modal
  const [previewModal, setPreviewModal] = useState<{
    isOpen: boolean;
    documentId: string;
    documentTitle: string;
    fileName: string;
    mimeType?: string;
    canDownload: boolean;
  }>({
    isOpen: false,
    documentId: "",
    documentTitle: "",
    fileName: "",
    mimeType: "",
    canDownload: false,
  });

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params: string[] = [];
      if (debouncedSearch)
        params.push(`search=${encodeURIComponent(debouncedSearch)}`);
      if (categoryFilter !== "all")
        params.push(`category=${encodeURIComponent(categoryFilter)}`);
      if (visibilityFilter !== "all")
        params.push(`visibility=${encodeURIComponent(visibilityFilter)}`);
      const queryString = params.length > 0 ? `?${params.join("&")}` : "";

      const response = await api.get(`/documents${queryString}`);
      setDocuments(response.data);
    } catch (err) {
      console.error("Error fetching documents:", err);
      setError("Failed to load documents. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, categoryFilter, visibilityFilter]);

  // Fetch on mount and whenever filters/search change
  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleDeleteDocument = async () => {
    try {
      setSaving(true);
      await api.delete(`/documents/${confirmDialog.documentId}`);
      setConfirmDialog({ isOpen: false, documentId: "", documentTitle: "" });
      toast.success("Document deleted successfully");
      await fetchDocuments();
    } catch (err) {
      console.error("Error deleting document:", err);
      toast.error("Failed to delete document. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = async (doc: Document) => {
    try {
      setDownloadingIds((prev) => new Set(prev).add(doc.id));
      const response = await api.get(`/documents/${doc.id}/download`, {
        responseType: "blob",
      });
      const blob = new Blob([response.data]);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = doc.file_name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Document downloaded successfully");
    } catch (err) {
      console.error("Error downloading document:", err);
      toast.error("Failed to download document. Please try again.");
    } finally {
      setDownloadingIds((prev) => {
        const next = new Set(prev);
        next.delete(doc.id);
        return next;
      });
    }
  };

  const handlePreview = (doc: Document) => {
    setPreviewModal({
      isOpen: true,
      documentId: doc.id,
      documentTitle: doc.title,
      fileName: doc.file_name,
      mimeType: doc.mime_type,
      canDownload: false, // Always false to disable download
    });
  };

  const handleEdit = (doc: Document) => {
    router.push(`/${user?.role}/documents/${doc.id}/edit`);
  };

  const canEdit =
    user?.role === UserRole.ADMIN || user?.role === UserRole.EDITOR;
  const canDelete = user?.role === UserRole.ADMIN;

  // Get category color based on dynamic categories
  const getCategoryColor = (categoryName: string) => {
    const category = categories?.find((cat) => cat.name === categoryName);
    if (!category)
      return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700";

    const colorMap: Record<string, string> = {
      blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800",
      emerald:
        "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
      red: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800",
      purple:
        "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800",
      amber:
        "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800",
      indigo:
        "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
      gray: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700",
    };

    return colorMap[category.color || "gray"] || colorMap.gray;
  };

  const categoryOptions = useMemo(
    () => [
      { value: "all", label: "All Categories" },
      ...(categories
        ?.filter((cat) => cat.is_active)
        .map((cat) => ({
          value: cat.name,
          label: cat.label,
        })) || []),
    ],
    [categories]
  );

  const visibilityOptions = useMemo(
    () => [
      { value: "all", label: "All Visibility" },
      ...Object.values(DocumentVisibility).map((vis) => ({
        value: vis,
        label: vis.charAt(0).toUpperCase() + vis.slice(1),
      })),
    ],
    []
  );

  const filteredDocuments = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    return documents.filter((doc) => {
      const matchesSearch =
        !q ||
        doc.title.toLowerCase().includes(q) ||
        doc.file_name.toLowerCase().includes(q) ||
        (doc.description && doc.description.toLowerCase().includes(q));
      const matchesCategory =
        categoryFilter === "all" || doc.category === categoryFilter;
      const matchesVisibility =
        visibilityFilter === "all" || doc.visibility === visibilityFilter;
      return matchesSearch && matchesCategory && matchesVisibility;
    });
  }, [documents, debouncedSearch, categoryFilter, visibilityFilter]);

  if (loading || categoriesLoading)
    return <SimpleLoading message="Loading..." fullScreen />;

  const getCategoryLabel = (categoryName: string) => {
    const category = categories?.find((cat) => cat.name === categoryName);
    return category?.label || categoryName;
  };

  /* Document Card (Grid) */
  const DocumentCard = ({ doc }: { doc: Document }) => (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-4 sm:p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate">
              {doc.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {doc.file_name}
            </p>
          </div>
        </div>
        {doc.is_viewable_only ? (
          <EyeOff className="w-5 h-5 text-amber-500 flex-shrink-0" />
        ) : (
          <Eye className="w-5 h-5 text-emerald-500 flex-shrink-0" />
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border ${getCategoryColor(
            doc.category
          )}`}
        >
          <FolderOpen className="w-3 h-3" />
          {getCategoryLabel(doc.category)}
        </span>
        <button
          onClick={() => toast.info(`Document visibility: ${doc.visibility}`)}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border transition-colors ${getVisibilityColor(
            doc.visibility
          )}`}
        >
          {getVisibilityIcon(doc.visibility)}
          {doc.visibility}
        </button>
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
        <p>Size: {formatFileSize(doc.file_size)}</p>
        <p>Updated: {format(new Date(doc.updated_at), "MMM dd, yyyy")}</p>
      </div>

      <div className="flex items-stretch gap-2 pt-2">
        <button
          onClick={() => handlePreview(doc)}
          className="flex-1 inline-flex items-center justify-center gap-2 h-9 px-4 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
        >
          <Eye className="w-4 h-4" />
          View
        </button>
        {doc.is_viewable_only || user?.role === UserRole.CUSTOMER ? (
          <div className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 px-3 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-medium rounded-lg border border-amber-200 dark:border-amber-800">
            <Shield className="w-4 h-4" />
            Protected
          </div>
        ) : (
          <button
            onClick={() => handleDownload(doc)}
            disabled={downloadingIds.has(doc.id)}
            aria-busy={downloadingIds.has(doc.id)}
            className="flex-1 inline-flex items-center justify-center gap-2 h-9 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white text-sm font-medium rounded-lg transition-all disabled:cursor-not-allowed"
          >
            {downloadingIds.has(doc.id) ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>Download</span>
          </button>
        )}
      </div>

      {canEdit && (
        <div className="flex items-stretch gap-2">
          <button
            onClick={() => handleEdit(doc)}
            className="flex-1 inline-flex items-center justify-center gap-2 h-9 px-4 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          {canDelete && (
            <button
              onClick={() =>
                setConfirmDialog({
                  isOpen: true,
                  documentId: doc.id,
                  documentTitle: doc.title,
                })
              }
              className="flex-1 inline-flex items-center justify-center gap-2 h-9 px-4 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );

  /* Document Row (List) */
  const DocumentRow = ({ doc }: { doc: Document }) => (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* LEFT: Document Info */}
        <div className="flex items-center gap-4 min-w-0 flex-grow">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
              {doc.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {doc.file_name}
            </p>
          </div>
        </div>

        {/* RIGHT: Status, Meta, Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-4 md:gap-6 w-full md:w-auto">
          <div className="flex flex-wrap items-center gap-2 md:flex-1">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border ${getCategoryColor(
                doc.category
              )}`}
            >
              <FolderOpen className="w-3 h-3" />
              {getCategoryLabel(doc.category)}
            </span>
            <button
              onClick={() =>
                toast.info(`Document visibility: ${doc.visibility}`)
              }
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border transition-colors ${getVisibilityColor(
                doc.visibility
              )}`}
            >
              {getVisibilityIcon(doc.visibility)}
              {doc.visibility}
            </button>
            {doc.is_viewable_only ? (
              <EyeOff className="w-5 h-5 text-amber-500" />
            ) : (
              <Eye className="w-5 h-5 text-emerald-500" />
            )}
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400 flex flex-col items-start md:items-end md:text-right whitespace-nowrap flex-shrink-0 md:min-w-[180px]">
            <span className="whitespace-nowrap">
              Size: {formatFileSize(doc.file_size)}
            </span>
            <span className="whitespace-nowrap">
              Updated: {format(new Date(doc.updated_at), "MMM dd, yyyy")}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
            <button
              onClick={() => handlePreview(doc)}
              className="inline-flex items-center justify-center gap-1.5 h-9 px-4 border border-gray-300 dark:border-gray-700 bg-transparent text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Eye className="w-4 h-4" />
              View
            </button>
            {doc.is_viewable_only || user?.role === UserRole.CUSTOMER ? (
              <div className="inline-flex items-center justify-center gap-1.5 h-9 px-4 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-medium rounded-lg border border-amber-200 dark:border-amber-800">
                <Shield className="w-4 h-4" />
                Protected
              </div>
            ) : (
              <button
                onClick={() => handleDownload(doc)}
                disabled={downloadingIds.has(doc.id)}
                aria-busy={downloadingIds.has(doc.id)}
                className="inline-flex items-center justify-center gap-1.5 h-9 px-4 min-w-[116px] bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white text-sm font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                {downloadingIds.has(doc.id) ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span>Download</span>
              </button>
            )}
            {canEdit && (
              <>
                <button
                  onClick={() => handleEdit(doc)}
                  className="inline-flex items-center justify-center gap-1.5 h-9 px-4 border border-gray-300 dark:border-gray-700 bg-transparent text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                {canDelete && (
                  <button
                    onClick={() =>
                      setConfirmDialog({
                        isOpen: true,
                        documentId: doc.id,
                        documentTitle: doc.title,
                      })
                    }
                    className="inline-flex items-center justify-center gap-1.5 h-9 px-4 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                )}
              </>
            )}
          </div>
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
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                  Document Library
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {filteredDocuments.length} documents found
                </p>
              </div>
            </div>

            <div
              className={`${
                canEdit
                  ? "w-full lg:w-auto grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3"
                  : "w-full lg:w-auto flex justify-end"
              }`}
            >
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 border border-gray-200 dark:border-gray-700 min-w-[112px]">
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

              {canEdit && (
                <button
                  onClick={() => router.push(`/${user?.role}/documents/upload`)}
                  className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-4 sm:px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 shadow-sm"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Add Upload</span>
                </button>
              )}
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
              <div className="lg:col-span-1">
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Search Documents
                </label>
                <div className="relative">
                  <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="search"
                    placeholder="Search by title or filename..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-11 sm:h-12 pl-10 sm:pl-12 pr-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 shadow-sm"
                    aria-label="Search documents"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Filter by Category
                </label>
                <ModernSelect
                  value={categoryFilter}
                  onChange={setCategoryFilter}
                  options={categoryOptions}
                  placeholder="All Categories"
                  icon={FolderOpen}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Filter by Visibility
                </label>
                <ModernSelect
                  value={visibilityFilter}
                  onChange={setVisibilityFilter}
                  options={visibilityOptions}
                  placeholder="All Visibility"
                  icon={Shield}
                />
              </div>
            </div>
          </div>
        </div>

        {filteredDocuments.length === 0 ? (
          <div className="text-center py-14 sm:py-16">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {debouncedSearch ||
              categoryFilter !== "all" ||
              visibilityFilter !== "all"
                ? "No Matching Documents"
                : "No Documents Yet"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 sm:text-base">
              {debouncedSearch ||
              categoryFilter !== "all" ||
              visibilityFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Get started by uploading your first document."}
            </p>
            {!debouncedSearch &&
              categoryFilter === "all" &&
              visibilityFilter === "all" &&
              canEdit && (
                <button
                  onClick={() => router.push(`/${user?.role}/documents/upload`)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Plus className="w-5 h-5" />
                  Upload First Document
                </button>
              )}
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredDocuments.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {filteredDocuments.map((doc) => (
              <DocumentRow key={doc.id} doc={doc} />
            ))}
          </div>
        )}
      </main>

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() =>
          setConfirmDialog({ isOpen: false, documentId: "", documentTitle: "" })
        }
        onConfirm={handleDeleteDocument}
        title="Delete Document"
        message={`Are you sure you want to permanently delete the document "${confirmDialog.documentTitle}"? This action cannot be undone.`}
      />

      {/* Document Preview Modal */}
      <DocumentPreviewModal
        isOpen={previewModal.isOpen}
        onClose={() =>
          setPreviewModal({
            isOpen: false,
            documentId: "",
            documentTitle: "",
            fileName: "",
            mimeType: "",
            canDownload: false,
          })
        }
        documentId={previewModal.documentId}
        documentTitle={previewModal.documentTitle}
        fileName={previewModal.fileName}
        mimeType={previewModal.mimeType}
        canDownload={previewModal.canDownload}
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

import { useState, useCallback, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import {
  Upload,
  FileText,
  X,
  ChevronDown,
  Eye,
  Tag,
  Info,
  Loader2,
  CheckCircle,
  AlertCircle,
  FolderOpen,
  Search,
  UserPlus,
  Check,
  Lock,
  Globe,
  Building,
  Users,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import api from "@/lib/api";
import { UserRole, DocumentVisibility, User } from "@/types";
import { useCategories } from "@/hooks/useCategories";

interface UploadProgress {
  fileName: string;
  progress: number;
  status: "pending" | "uploading" | "success" | "error";
  message?: string;
}

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
        <div className="flex items-center gap-3 min-w-0">
          {Icon && (
            <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
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
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
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

// Enhanced Searchable MultiSelect Component
const SearchableMultiSelect = ({
  selected,
  onChange,
  options,
  placeholder,
  searchPlaceholder = "Search users...",
}: {
  selected: string[];
  onChange: (selected: string[]) => void;
  options: { value: string; label: string; email?: string }[];
  placeholder?: string;
  searchPlaceholder?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayLimit, setDisplayLimit] = useState(50);

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options.slice(0, displayLimit);

    const query = searchQuery.toLowerCase();
    return options
      .filter(
        (opt) =>
          opt.label.toLowerCase().includes(query) ||
          (opt.email && opt.email.toLowerCase().includes(query))
      )
      .slice(0, displayLimit);
  }, [options, searchQuery, displayLimit]);

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const toggleAll = () => {
    if (filteredOptions.every((opt) => selected.includes(opt.value))) {
      // Deselect all visible
      const visibleValues = filteredOptions.map((opt) => opt.value);
      onChange(selected.filter((item) => !visibleValues.includes(item)));
    } else {
      // Select all visible
      const newSelected = [...selected];
      filteredOptions.forEach((opt) => {
        if (!newSelected.includes(opt.value)) {
          newSelected.push(opt.value);
        }
      });
      onChange(newSelected);
    }
  };

  const selectedLabels = options
    .filter((opt) => selected.includes(opt.value))
    .map((opt) => opt.label);

  const handleLoadMore = () => {
    setDisplayLimit((prev) => prev + 50);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setSearchQuery("");
            setDisplayLimit(50);
          }
        }}
        className="w-full min-h-12 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-left flex items-center justify-between hover:border-blue-400 dark:hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
      >
        <div className="flex-1 min-w-0">
          {selectedLabels.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedLabels.slice(0, 3).map((label, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-lg break-words"
                >
                  <UserPlus className="w-3 h-3" />
                  <span className="truncate">{label}</span>
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
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-40 w-full max-h-96 overflow-hidden flex flex-col">
            {/* Search Header */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setDisplayLimit(50);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  placeholder={searchPlaceholder}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>

              {/* Quick Actions */}
              <div className="flex items-center justify-between mt-3">
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {selected.length} selected
                  {searchQuery && ` • ${filteredOptions.length} results`}
                </div>
                <button
                  type="button"
                  onClick={toggleAll}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  {filteredOptions.every((opt) => selected.includes(opt.value))
                    ? "Deselect all"
                    : "Select all visible"}
                </button>
              </div>
            </div>

            {/* Options List */}
            <div className="flex-1 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="p-8 text-center">
                  <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    No users found matching &quot;{searchQuery}&quot;
                  </p>
                </div>
              ) : (
                <>
                  {filteredOptions.map((option, index) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => toggleOption(option.value)}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors duration-150 ${
                        index === 0 ? "rounded-t-lg" : ""
                      }`}
                    >
                      <div
                        className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-all duration-150 flex-shrink-0 ${
                          selected.includes(option.value)
                            ? "bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        {selected.includes(option.value) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-900 dark:text-white font-medium truncate">
                            {option.label}
                          </span>
                          {option.email && (
                            <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {option.email}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}

                  {/* Load More Button */}
                  {options.length > displayLimit && !searchQuery && (
                    <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                      <button
                        type="button"
                        onClick={handleLoadMore}
                        className="w-full py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                      >
                        Load more users ({options.length - displayLimit}{" "}
                        remaining)
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
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

export default function DocumentUploadPage() {
  const router = useRouter();
  const { user } = useAuth();
  const toast = useToast();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const [files, setFiles] = useState<File[]>([]);
  const [customers, setCustomers] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    visibility: DocumentVisibility.PRIVATE,
    is_viewable_only: false,
    assigned_customers: [] as string[],
    tags: "",
  });
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const fetchCustomers = useCallback(async () => {
    try {
      const response = await api.get("/users?role=customer&status=approved");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      toast.error("Failed to load customer list");
    }
  }, [toast]);

  // Fetch customers on mount
  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  // Set default category when categories load
  useEffect(() => {
    if (categories && categories.length > 0 && !formData.category) {
      const defaultCategory =
        categories.find((cat) => cat.is_default) || categories[0];
      setFormData((prev) => ({ ...prev, category: defaultCategory.name }));
    }
  }, [categories, formData.category]);

  const categoryOptions = useMemo(() => {
    if (!categories) return [];
    return categories
      .filter((cat) => cat.is_active)
      .map((cat) => ({
        value: cat.name,
        label: cat.label,
      }));
  }, [categories]);

  const visibilityOptions = Object.values(DocumentVisibility).map(
    (visibility) => ({
      value: visibility,
      label: visibility.charAt(0).toUpperCase() + visibility.slice(1),
    })
  );

  // Enhanced customer options with email for better search
  const customerOptions = customers.map((c) => ({
    value: c.id,
    label: c.username,
    email: c.email,
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

  const getCategoryColor = (categoryName: string) => {
    const category = categories?.find((cat) => cat.name === categoryName);
    if (!category)
      return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";

    const colorMap: Record<string, string> = {
      blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      emerald:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
      red: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      purple:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      amber:
        "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      indigo:
        "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
      gray: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    };

    return colorMap[category.color || "gray"] || colorMap.gray;
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFile = async (file: File, index: number) => {
    const formDataToSend = new FormData();
    formDataToSend.append("file", file);
    formDataToSend.append("title", formData.title || file.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("visibility", formData.visibility);
    formDataToSend.append(
      "is_viewable_only",
      String(formData.is_viewable_only)
    );

    // Send assigned_customers as comma-separated string if any selected
    if (
      formData.visibility === DocumentVisibility.PRIVATE &&
      formData.assigned_customers.length > 0
    ) {
      formDataToSend.append(
        "assigned_customers",
        formData.assigned_customers.join(",")
      );
    }

    if (formData.tags) {
      formDataToSend.append("tags", formData.tags);
    }

    try {
      const endpoint =
        user?.role === UserRole.CUSTOMER
          ? "/documents/customer-upload"
          : "/documents/";

      const response = await api.post(endpoint, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setUploadProgress((prev) =>
            prev.map((p, i) =>
              i === index ? { ...p, progress: percentCompleted } : p
            )
          );
        },
      });

      setUploadProgress((prev) =>
        prev.map((p, i) =>
          i === index
            ? {
                ...p,
                status: "success",
                progress: 100,
                message: "Uploaded successfully",
              }
            : p
        )
      );

      return response.data;
    } catch (error: unknown) {
      console.error("Upload error:", error);
      setUploadProgress((prev) =>
        prev.map((p, i) =>
          i === index
            ? {
                ...p,
                status: "error",
                message:
                  (error as { response?: { data?: { detail?: string } } })
                    .response?.data?.detail || "Upload failed",
              }
            : p
        )
      );
      throw error;
    }
  };

  const handleUpload = async () => {
    // Validation
    if (files.length === 0) {
      toast.error("Please select at least one file");
      return;
    }

    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }

    // Removed restriction: allow private documents without assigned users

    setIsUploading(true);
    setUploadProgress(
      files.map((file) => ({
        fileName: file.name,
        progress: 0,
        status: "pending",
      }))
    );

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < files.length; i++) {
      setUploadProgress((prev) =>
        prev.map((p, idx) => (idx === i ? { ...p, status: "uploading" } : p))
      );

      try {
        await uploadFile(files[i], i);
        successCount++;
      } catch (error) {
        errorCount++;
        console.error(`Failed to upload ${files[i].name}:`, error);
      }
    }

    setIsUploading(false);

    if (successCount > 0) {
      toast.success(`Successfully uploaded ${successCount} file(s)`);
      if (errorCount === 0) {
        setTimeout(() => {
          router.push(`/${user?.role}/documents`);
        }, 1500);
      }
    }

    if (errorCount > 0) {
      toast.error(`Failed to upload ${errorCount} file(s)`);
    }
  };

  if (categoriesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 overflow-x-hidden">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 overflow-x-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => router.push(`/${user?.role}/documents`)}
              className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                  Upload Documents
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  Upload and organize your documents securely
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-x-hidden">
        <div className="space-y-8">
          {/* File Upload Area */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="px-4 sm:px-6 py-5 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Upload className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  Select Files
                </h2>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                  dragActive
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              >
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.png,.jpg,.jpeg"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-flex flex-col items-center"
                >
                  <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
                  <span className="text-gray-900 dark:text-white font-medium">
                    Drop files here or click to browse
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    PDF, DOC, DOCX, XLS, XLSX, TXT, PNG, JPG up to 10MB
                  </span>
                </label>
              </div>

              {/* Selected Files */}
              {files.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Selected Files ({files.length})
                  </h3>
                  <div className="space-y-2">
                    {files.map((file, index) => {
                      const progress = uploadProgress[index];
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                        >
                          <div className="flex items-center space-x-3 flex-1 min-w-0">
                            <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                              {progress && (
                                <div className="mt-2">
                                  {progress.status === "uploading" && (
                                    <div className="flex items-center space-x-2">
                                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                                        <div
                                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                          style={{
                                            width: `${progress.progress}%`,
                                          }}
                                        />
                                      </div>
                                      <span className="text-xs text-gray-600 dark:text-gray-400">
                                        {progress.progress}%
                                      </span>
                                    </div>
                                  )}
                                  {progress.status === "success" && (
                                    <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                                      <CheckCircle className="w-4 h-4" />
                                      <span className="text-xs">
                                        {progress.message}
                                      </span>
                                    </div>
                                  )}
                                  {progress.status === "error" && (
                                    <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                                      <AlertCircle className="w-4 h-4" />
                                      <span className="text-xs">
                                        {progress.message}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          {!isUploading && (
                            <button
                              onClick={() => removeFile(index)}
                              className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="px-4 sm:px-6 py-5 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  Basic Information
                </h2>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-6">
              <div className="space-y-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-gray-900 dark:text-white"
                >
                  Document Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full h-12 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 shadow-sm"
                  placeholder="Enter a clear, descriptive title (optional - will use filename if empty)"
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
                  placeholder="Provide a detailed description..."
                />
              </div>
            </div>
          </div>

          {/* Document Settings */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="px-4 sm:px-6 py-5 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  Document Settings
                </h2>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                    Category
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <ModernSelect
                      value={formData.category}
                      onChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                      options={categoryOptions}
                      placeholder="Select document category"
                      icon={FolderOpen}
                    />
                    {formData.category && (
                      <div className="mt-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg ${getCategoryColor(
                            formData.category
                          )}`}
                        >
                          <FolderOpen className="w-3 h-3" />
                          {categoryOptions.find(
                            (opt) => opt.value === formData.category
                          )?.label || formData.category}
                        </span>
                      </div>
                    )}
                  </div>
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
                        // Clear assigned customers if not private
                        assigned_customers:
                          value === DocumentVisibility.PRIVATE
                            ? formData.assigned_customers
                            : [],
                      })
                    }
                    options={visibilityOptions}
                    placeholder="Select visibility level"
                    icon={getVisibilityIcon(formData.visibility)}
                  />
                  <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0 mt-0.5" />
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {formData.visibility === DocumentVisibility.PUBLIC && (
                          <span>
                            <strong>Public:</strong> All users can view this
                            document
                          </span>
                        )}
                        {formData.visibility === DocumentVisibility.PRIVATE && (
                          <span>
                            <strong>Private:</strong> Only assigned users can
                            access (you can leave empty and assign later)
                          </span>
                        )}
                        {formData.visibility ===
                          DocumentVisibility.INTERNAL && (
                          <span>
                            <strong>Internal:</strong> Only employees can view
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <ModernToggle
                checked={formData.is_viewable_only}
                onChange={(checked) =>
                  setFormData({ ...formData, is_viewable_only: checked })
                }
                label="View-Only Mode"
                description="When enabled, users can only preview the document online and cannot download it."
              />
            </div>
          </div>

          {/* Access Control - Only show for private documents */}
          {formData.visibility === DocumentVisibility.PRIVATE && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="px-4 sm:px-6 py-5 border-b border-gray-200 dark:border-gray-800">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                      Access Control
                      <span className="text-gray-500 ml-2 text-sm font-normal">
                        (Optional)
                      </span>
                    </h2>
                  </div>
                  {customers.length > 0 && (
                    <span className="text-sm text-gray-500 dark:text-gray-400 pl-11 sm:pl-0">
                      {customers.length} total users available
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                    Authorized Customers
                  </label>
                  <SearchableMultiSelect
                    selected={formData.assigned_customers}
                    onChange={(selected) =>
                      setFormData({
                        ...formData,
                        assigned_customers: selected,
                      })
                    }
                    options={customerOptions}
                    placeholder="Click to search and select customers..."
                    searchPlaceholder="Search by username or email..."
                  />
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                        {formData.assigned_customers.length === 0 ? (
                          <span>
                            You can optionally select customers who can access
                            this private document. If none are selected, no
                            customers will have access until you assign them.
                          </span>
                        ) : (
                          <span>
                            {formData.assigned_customers.length} customer(s)
                            will have access to this document. Use search to
                            find users by username or email.
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tags & Labels */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="px-4 sm:px-6 py-5 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  Tags & Organization
                </h2>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-3">
                <label
                  htmlFor="tags"
                  className="block text-sm font-semibold text-gray-900 dark:text-white"
                >
                  Document Tags
                </label>
                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <input
                    id="tags"
                    type="text"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    className="w-full h-12 pl-12 pr-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 shadow-sm"
                    placeholder="important, contract, 2024"
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Separate tags with commas to help organize and find documents.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-start gap-3 pt-4">
            <button
              onClick={handleUpload}
              disabled={files.length === 0 || isUploading || !formData.category}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Upload Documents
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => router.push(`/${user?.role}/documents`)}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## app\(dashboard)\[role]\documents\[id]\layout.tsx

```typescript
// app/[role]/documents/[id]/edit/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Document",
  description: "Edit document details and settings",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

export default function DocumentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full max-w-full overflow-x-hidden">{children}</div>;
}

```

## app\(dashboard)\[role]\documents\[id]\edit\page.tsx

```typescript
"use client";

import { useEffect, useState, useMemo } from "react";
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
  FolderOpen,
  Search,
  UserPlus,
} from "lucide-react";
import api from "@/lib/api";
import { Document, DocumentVisibility, User, UserRole } from "@/types";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useToast } from "@/contexts/ToastContext";
import SimpleLoading from "@/components/SimpleLoading";
import { useCategories } from "@/hooks/useCategories";

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

// Enhanced Searchable MultiSelect Component
const SearchableMultiSelect = ({
  selected,
  onChange,
  options,
  placeholder,
  searchPlaceholder = "Search users...",
}: {
  selected: string[];
  onChange: (selected: string[]) => void;
  options: { value: string; label: string; email?: string }[];
  placeholder?: string;
  searchPlaceholder?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayLimit, setDisplayLimit] = useState(50);

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options.slice(0, displayLimit);

    const query = searchQuery.toLowerCase();
    return options
      .filter(
        (opt) =>
          opt.label.toLowerCase().includes(query) ||
          (opt.email && opt.email.toLowerCase().includes(query))
      )
      .slice(0, displayLimit);
  }, [options, searchQuery, displayLimit]);

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const toggleAll = () => {
    if (filteredOptions.every((opt) => selected.includes(opt.value))) {
      // Deselect all visible
      const visibleValues = filteredOptions.map((opt) => opt.value);
      onChange(selected.filter((item) => !visibleValues.includes(item)));
    } else {
      // Select all visible
      const newSelected = [...selected];
      filteredOptions.forEach((opt) => {
        if (!newSelected.includes(opt.value)) {
          newSelected.push(opt.value);
        }
      });
      onChange(newSelected);
    }
  };

  const selectedLabels = options
    .filter((opt) => selected.includes(opt.value))
    .map((opt) => opt.label);

  const handleLoadMore = () => {
    setDisplayLimit((prev) => prev + 50);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setSearchQuery("");
            setDisplayLimit(50);
          }
        }}
        className="w-full min-h-12 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-left flex items-center justify-between hover:border-blue-400 dark:hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
      >
        <div className="flex-1">
          {selectedLabels.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedLabels.slice(0, 3).map((label, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-lg"
                >
                  <UserPlus className="w-3 h-3" />
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
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-40 w-full max-h-96 overflow-hidden flex flex-col">
            {/* Search Header */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setDisplayLimit(50);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  placeholder={searchPlaceholder}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>

              {/* Quick Actions */}
              <div className="flex items-center justify-between mt-3">
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {selected.length} selected
                  {searchQuery && ` â€¢ ${filteredOptions.length} results`}
                </div>
                <button
                  type="button"
                  onClick={toggleAll}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  {filteredOptions.every((opt) => selected.includes(opt.value))
                    ? "Deselect all"
                    : "Select all visible"}
                </button>
              </div>
            </div>

            {/* Options List */}
            <div className="flex-1 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="p-8 text-center">
                  <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    No users found matching &quot;{searchQuery}&quot;
                  </p>
                </div>
              ) : (
                <>
                  {filteredOptions.map((option, index) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => toggleOption(option.value)}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors duration-150 ${
                        index === 0 ? "rounded-t-lg" : ""
                      }`}
                    >
                      <div
                        className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-all duration-150 flex-shrink-0 ${
                          selected.includes(option.value)
                            ? "bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        {selected.includes(option.value) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-900 dark:text-white font-medium">
                            {option.label}
                          </span>
                          {option.email && (
                            <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {option.email}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}

                  {/* Load More Button */}
                  {options.length > displayLimit && !searchQuery && (
                    <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                      <button
                        type="button"
                        onClick={handleLoadMore}
                        className="w-full py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                      >
                        Load more users ({options.length - displayLimit}{" "}
                        remaining)
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
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
  const toast = useToast();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [document, setDocument] = useState<Document | null>(null);
  const [customers, setCustomers] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
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
      const response = await api.get<User[]>("/users", {
        params: { role: UserRole.CUSTOMER, status: "approved" },
      });
      setCustomers(response.data);
    } catch (error: unknown) {
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
      toast.success("Document updated successfully");
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
      toast.error("Failed to update document");
    } finally {
      setSaving(false);
    }
  };

  // Category options from dynamic categories
  const categoryOptions = useMemo(() => {
    if (!categories) return [];
    return categories
      .filter((cat) => cat.is_active)
      .map((cat) => ({
        value: cat.name,
        label: cat.label,
      }));
  }, [categories]);

  const visibilityOptions = Object.values(DocumentVisibility).map(
    (visibility) => ({
      value: visibility,
      label: visibility.charAt(0).toUpperCase() + visibility.slice(1),
    })
  );

  // Enhanced customer options with email for better search
  const customerOptions = customers.map((c) => ({
    value: c.id,
    label: c.username,
    email: c.email, // Add email for better search capability
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

  // Get category color from dynamic categories
  const getCategoryColor = (categoryName: string) => {
    const category = categories?.find((cat) => cat.name === categoryName);
    if (!category)
      return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";

    const colorMap: Record<string, string> = {
      blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      emerald:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
      red: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      purple:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      amber:
        "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      indigo:
        "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
      gray: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    };

    return colorMap[category.color || "gray"] || colorMap.gray;
  };

  // Set default category if not set
  useEffect(() => {
    if (
      categories &&
      categories.length > 0 &&
      formData.category &&
      !categories.find((cat) => cat.name === formData.category)
    ) {
      // If the current category doesn't exist, set to default
      const defaultCategory =
        categories.find((cat) => cat.is_default) || categories[0];
      setFormData((prev) => ({ ...prev, category: defaultCategory.name }));
    }
  }, [categories, formData.category]);

  if (loading || categoriesLoading)
    return <SimpleLoading message="Loading document..." fullScreen />;

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
        {/* Changed max-w-6xl to max-w-4xl for consistency */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Adjusted gap for better responsiveness */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => router.push(`/${user?.role}/documents`)}
              className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                  Edit Document
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
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
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 sm:p-6">
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
            <div className="px-4 sm:px-6 py-5 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  Basic Information
                </h2>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-6">
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
                  placeholder="Enter a clear, descriptive title"
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
                  placeholder="Provide a detailed description..."
                />
              </div>
            </div>
          </div>

          {/* Document Settings */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="px-4 sm:px-6 py-5 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  Document Settings
                </h2>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                    Category
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <ModernSelect
                      value={formData.category}
                      onChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                      options={categoryOptions}
                      placeholder="Select document category"
                      icon={FolderOpen}
                    />
                    {formData.category && (
                      <div className="mt-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg ${getCategoryColor(
                            formData.category
                          )}`}
                        >
                          <FolderOpen className="w-3 h-3" />
                          {categoryOptions.find(
                            (opt) => opt.value === formData.category
                          )?.label || formData.category}
                        </span>
                      </div>
                    )}
                  </div>
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
                  <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0 mt-0.5" />
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {formData.visibility === DocumentVisibility.PUBLIC && (
                          <span>
                            <strong>Public:</strong> All users can view this
                            document
                          </span>
                        )}
                        {formData.visibility === DocumentVisibility.PRIVATE && (
                          <span>
                            <strong>Private:</strong> Only assigned users can
                            access
                          </span>
                        )}
                        {formData.visibility ===
                          DocumentVisibility.INTERNAL && (
                          <span>
                            <strong>Internal:</strong> Only employees can view
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <ModernToggle
                checked={formData.is_viewable_only}
                onChange={(checked) =>
                  setFormData({ ...formData, is_viewable_only: checked })
                }
                label="View-Only Mode"
                description="When enabled, users can only preview the document online and cannot download it."
              />
            </div>
          </div>

          {/* Access Control with Enhanced Search */}
          {formData.visibility === DocumentVisibility.PRIVATE && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="px-4 sm:px-6 py-5 border-b border-gray-200 dark:border-gray-800">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                      Access Control
                    </h2>
                  </div>
                  {customers.length > 0 && (
                    <span className="text-sm text-gray-500 dark:text-gray-400 pl-11 sm:pl-0">
                      {customers.length} total users available
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                    Authorized Customers
                  </label>
                  <SearchableMultiSelect
                    selected={formData.assigned_customers}
                    onChange={(selected) =>
                      setFormData({
                        ...formData,
                        assigned_customers: selected,
                      })
                    }
                    options={customerOptions}
                    placeholder="Click to search and select customers..."
                    searchPlaceholder="Search by username or email..."
                  />
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                        Only selected customers can view this document. Use
                        search to find users by username or email.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tags & Labels */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="px-4 sm:px-6 py-5 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  Tags & Organization
                </h2>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-3">
                <label
                  htmlFor="tags"
                  className="block text-sm font-semibold text-gray-900 dark:text-white"
                >
                  Document Tags
                </label>
                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <input
                    id="tags"
                    type="text"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    className="w-full h-12 pl-12 pr-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 shadow-sm"
                    placeholder="important, contract, 2024"
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Separate tags with commas to help organize and find documents.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {/* Adjusted gap and flex direction for responsiveness */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-start gap-3 pt-4">
            <button
              type="submit"
              disabled={saving || !formData.category}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Document
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => router.push(`/${user?.role}/documents`)}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
            >
              <X className="w-4 h-4" />
              Cancel
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
import Link from "next/link";
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      // notify listeners (e.g., sidebar badge) to refresh immediately
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("notifications:updated"));
      }
    },
  });

  const markAll = useMutation({
    mutationFn: async () => api.put("/notifications/read-all"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("notifications:updated"));
      }
    },
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

  const getPrimaryAction = (n: Notification) => {
    const isDocumentRelated =
      n.type === "new_document" ||
      n.type === "document_updated" ||
      !!n.document_id;

    if (isDocumentRelated) {
      return {
        href: `/${user?.role}/documents`,
        label: "View Document",
      } as const;
    }

    const text = `${n.title} ${n.message}`.toLowerCase();
    const looksLikeUserSignup =
      n.type === "user_signup" ||
      text.includes("signed up") ||
      text.includes("sign up") ||
      text.includes("signup") ||
      text.includes("pending approval");

    if (looksLikeUserSignup) {
      return {
        href: `/${user?.role}/approvals`,
        label: "Open Approvals",
      } as const;
    }

    return null;
  };

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
                            {(() => {
                              const primary = getPrimaryAction(notification);
                              if (!primary) return null;
                              return (
                                <Link
                                  href={primary.href}
                                  className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                                >
                                  <Eye className="w-4 h-4" />
                                  {primary.label}
                                </Link>
                              );
                            })()}
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

```

## app\components\CategoryManagement.tsx

```typescript
"use client";

import { useState } from "react";
import {
  FolderPlus,
  Edit2,
  Trash2,
  Check,
  AlertCircle,
  Loader2,
  Shield,
  FileText,
  Package,
  Settings,
} from "lucide-react";
import { Category } from "@/types";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "@/hooks/useCategories";

// Icon options for categories
const ICON_OPTIONS = [
  { value: "FileText", label: "File", icon: FileText },
  { value: "Package", label: "Package", icon: Package },
  { value: "Shield", label: "Shield", icon: Shield },
  { value: "Settings", label: "Settings", icon: Settings },
];

// Color options
const COLOR_OPTIONS = [
  { value: "blue", label: "Blue", class: "bg-blue-500" },
  { value: "emerald", label: "Green", class: "bg-emerald-500" },
  { value: "red", label: "Red", class: "bg-red-500" },
  { value: "purple", label: "Purple", class: "bg-purple-500" },
  { value: "amber", label: "Amber", class: "bg-amber-500" },
  { value: "indigo", label: "Indigo", class: "bg-indigo-500" },
  { value: "gray", label: "Gray", class: "bg-gray-500" },
];

export default function CategoryManagement() {
  const { data: categories, isLoading } = useCategories(true);
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Category | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    label: "",
    description: "",
    color: "blue",
    icon: "FileText",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      label: "",
      description: "",
      color: "blue",
      icon: "FileText",
    });
    setEditingCategory(null);
    setShowCreateModal(false);
  };

  const handleCreate = async () => {
    if (!formData.name || !formData.label) return;

    try {
      await createMutation.mutateAsync({
        name: formData.name.toLowerCase().replace(/\s+/g, "_"),
        label: formData.label,
        description: formData.description,
        color: formData.color,
        icon: formData.icon,
      });
      resetForm();
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleUpdate = async () => {
    if (!editingCategory) return;

    try {
      await updateMutation.mutateAsync({
        id: editingCategory.id,
        data: {
          label: formData.label,
          description: formData.description,
          color: formData.color,
          icon: formData.icon,
        },
      });
      resetForm();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;

    try {
      await deleteMutation.mutateAsync(deleteConfirm.id);
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const startEdit = (category: Category) => {
    setFormData({
      name: category.name,
      label: category.label,
      description: category.description || "",
      color: category.color || "blue",
      icon: category.icon || "FileText",
    });
    setEditingCategory(category);
  };

  const toggleActive = async (category: Category) => {
    try {
      await updateMutation.mutateAsync({
        id: category.id,
        data: { is_active: !category.is_active },
      });
    } catch (error) {
      console.error("Error toggling category:", error);
    }
  };

  const getCategoryColor = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800",
      emerald:
        "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
      red: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800",
      purple:
        "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800",
      amber:
        "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800",
      indigo:
        "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
      gray: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700",
    };
    return colorMap[color] || colorMap.gray;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Document Categories
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage categories for organizing documents
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200"
        >
          <FolderPlus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Categories List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories?.map((category) => (
          <div
            key={category.id}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryColor(
                    category.color || "gray"
                  )}`}
                >
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {category.label}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {category.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {category.is_default && (
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium rounded-full">
                    Default
                  </span>
                )}
                {!category.is_active && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
                    Inactive
                  </span>
                )}
              </div>
            </div>

            {category.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {category.description}
              </p>
            )}

            <div className="flex items-center justify-between">
              <button
                onClick={() => toggleActive(category)}
                disabled={category.is_default}
                className={`text-sm font-medium ${
                  category.is_active
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-gray-600 dark:text-gray-400"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {category.is_active ? "Active" : "Inactive"}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => startEdit(category)}
                  className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                {!category.is_default && (
                  <button
                    onClick={() => setDeleteConfirm(category)}
                    className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || editingCategory) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={resetForm}
          />
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {editingCategory ? "Edit Category" : "Create Category"}
            </h3>

            <div className="space-y-4">
              {!editingCategory && (
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Category ID
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., legal_documents"
                    className="w-full h-11 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Unique identifier (lowercase, use underscores)
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={formData.label}
                  onChange={(e) =>
                    setFormData({ ...formData, label: e.target.value })
                  }
                  placeholder="e.g., Legal Documents"
                  className="w-full h-11 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Brief description of this category..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Color
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {COLOR_OPTIONS.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, color: color.value })
                        }
                        className={`w-full h-8 rounded-lg ${
                          color.class
                        } flex items-center justify-center transition-all ${
                          formData.color === color.value
                            ? "ring-2 ring-offset-2 ring-blue-500"
                            : ""
                        }`}
                        title={color.label}
                      >
                        {formData.color === color.value && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Icon
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {ICON_OPTIONS.map((icon) => {
                      const IconComponent = icon.icon;
                      return (
                        <button
                          key={icon.value}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, icon: icon.value })
                          }
                          className={`h-8 rounded-lg border ${
                            formData.icon === icon.value
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                              : "border-gray-300 dark:border-gray-600"
                          } flex items-center justify-center transition-all`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 justify-end">
              <button
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editingCategory ? handleUpdate : handleCreate}
                disabled={
                  !formData.label ||
                  (!editingCategory && !formData.name) ||
                  createMutation.isPending ||
                  updateMutation.isPending
                }
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-xl transition-colors disabled:cursor-not-allowed"
              >
                {createMutation.isPending || updateMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : editingCategory ? (
                  "Update"
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setDeleteConfirm(null)}
          />
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-800">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Delete Category
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Are you sure you want to delete &quot;{deleteConfirm.label}
                  &quot;? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium rounded-xl transition-colors disabled:cursor-not-allowed"
              >
                {deleteMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

```

## app\components\DocumentPreviewModal.tsx

```typescript
"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  X,
  Maximize2,
  Minimize2,
  FileText,
  AlertCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
} from "lucide-react";
import api from "@/lib/api";
import mammoth from "mammoth";
import * as XLSX from "xlsx";
// import { useToast } from "@/contexts/ToastContext";

// Dynamic import of react-pdf components with no SSR
const Document = dynamic(
  () => import("react-pdf").then((mod) => mod.Document),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
      </div>
    ),
  }
);

const Page = dynamic(() => import("react-pdf").then((mod) => mod.Page), {
  ssr: false,
});

// Import pdfjs and configure worker
import("react-pdf").then((pdf) => {
  const { pdfjs } = pdf;
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
});

// Import styles
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

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
}: DocumentPreviewModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  // const toast = useToast();
  const [convertedContent, setConvertedContent] = useState<string | null>(null);
  const [excelData, setExcelData] = useState<{
    html: string;
    sheetNames: string[];
    currentSheet: string;
  } | null>(null);

  // PDF specific states
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const pdfContainerRef = useRef<HTMLDivElement | null>(null);

  // Get file extension and type
  const fileExtension = fileName.split(".").pop()?.toLowerCase() || "";
  const isPDF = fileExtension === "pdf" || mimeType?.includes("pdf");
  const isWord = ["doc", "docx"].includes(fileExtension);
  const isExcel = ["xls", "xlsx"].includes(fileExtension);

  useEffect(() => {
    if (isOpen && documentId) {
      loadPreview();
    }
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, documentId]);

  // Calculate optimal scale responsive to container width
  useEffect(() => {
    const calculateScale = () => {
      if (typeof window !== "undefined") {
        const isMobile = window.innerWidth <= 768;
        const measuredWidth = pdfContainerRef.current?.clientWidth;
        const fallbackWidth = isMobile
          ? window.innerWidth - 16
          : Math.min(window.innerWidth * 0.8, 1200);
        const containerWidth = Math.max(0, measuredWidth ?? fallbackWidth);

        // Standard PDF width is 612 points
        const optimalScale = containerWidth / 612;

        setScale(
          isMobile ? Math.min(optimalScale, 1.0) : Math.min(optimalScale, 1.5)
        );
      }
    };

    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, [isOpen, isFullscreen]);

  const loadPreview = async () => {
    setLoading(true);
    setError(null);
    setPdfError(null);
    setConvertedContent(null);
    setExcelData(null);
    setPdfBlob(null);
    setCurrentPage(1);
    setRotation(0);

    try {
      const response = await api.get(`/documents/${documentId}/preview`, {
        responseType: "blob",
      });

      const serverType =
        (response.headers && (response.headers["content-type"] as string)) ||
        mimeType ||
        "application/octet-stream";

      const effectiveType =
        serverType === "application/octet-stream" && isPDF
          ? "application/pdf"
          : serverType;

      const blob = new Blob([response.data], { type: effectiveType });

      if (isPDF) {
        setPdfBlob(blob);
      } else {
        const url = URL.createObjectURL(blob);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(url);

        if (isWord) {
          await convertWordDocument(blob);
        } else if (isExcel) {
          await convertExcelDocument(blob);
        }
      }
    } catch (err: unknown) {
      console.error("Error loading preview:", err);
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Unable to load document preview. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const convertWordDocument = async (blob: Blob) => {
    try {
      const arrayBuffer = await blob.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      setConvertedContent(result.value);
    } catch (err) {
      console.error("Error converting Word document:", err);
      setError("Unable to convert Word document for preview.");
    }
  };

  const convertExcelDocument = async (blob: Blob) => {
    try {
      const arrayBuffer = await blob.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
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

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setCurrentPage(1);
    setPdfError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("PDF load error:", error);
    setPdfError(
      "Failed to load PDF. The file may be corrupted or unsupported."
    );
  };

  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(1, prev - 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(numPages, prev + 1));
  const zoomIn = () => setScale((prev) => Math.min(2.5, prev + 0.25));
  const zoomOut = () => setScale((prev) => Math.max(0.5, prev - 0.25));
  const rotate = () => setRotation((prev) => (prev + 90) % 360);

  const renderPDFPreview = () => {
    if (!pdfBlob) return null;

    if (pdfError) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center space-y-4 max-w-md">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              PDF Preview Error
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{pdfError}</p>
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

    return (
      <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
        {/* PDF Controls - sticky, with mobile Close */}
        <div
          className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20"
          style={{ paddingTop: "env(safe-area-inset-top)" }}
        >
          <div className="flex items-center gap-2">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage <= 1}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[80px] text-center">
              {currentPage} / {numPages || "?"}
            </span>

            <button
              onClick={goToNextPage}
              disabled={currentPage >= numPages}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop tools */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={zoomOut}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>

            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[60px] text-center">
              {Math.round(scale * 100)}%
            </span>

            <button
              onClick={zoomIn}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-5 h-5" />
            </button>

            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

            <button
              onClick={rotate}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Rotate"
            >
              <RotateCw className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Close button inside controls */}
          <button
            onClick={onClose}
            className="sm:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close preview"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PDF Document */}
        <div className="flex-1 overflow-auto p-2 sm:p-4">
          <div
            ref={pdfContainerRef}
            className="flex justify-center w-full overflow-x-hidden"
          >
            <Document
              file={pdfBlob}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
                </div>
              }
              error={
                <div className="flex flex-col items-center justify-center p-8">
                  <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Failed to load PDF
                  </p>
                  <button
                    onClick={loadPreview}
                    className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Retry
                  </button>
                </div>
              }
              className="flex justify-center"
            >
              <Page
                pageNumber={currentPage}
                scale={scale}
                rotate={rotation}
                className="shadow-lg max-w-full"
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
            </Document>
          </div>
        </div>

        {/* Mobile-friendly page navigation (bottom) */}
        {numPages > 1 && (
          <div
            className="sm:hidden p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <div className="flex items-center justify-between">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage <= 1}
                className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
              >
                Previous
              </button>

              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Page {currentPage} of {numPages}
              </span>

              <button
                onClick={goToNextPage}
                disabled={currentPage >= numPages}
                className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    );
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
          <div className="text-center space-y-4 max-w-md px-4">
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

    if (isPDF) return renderPDFPreview();

    // Word documents
    if (isWord && convertedContent) {
      return (
        <div className="w-full h-full flex flex-col p-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Word Document Preview
              </span>
            </div>
          </div>
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg overflow-auto border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <div
              className="prose prose-sm max-w-none dark:prose-invert word-preview"
              dangerouslySetInnerHTML={{ __html: convertedContent }}
            />
          </div>
        </div>
      );
    }

    // Excel documents
    if (isExcel && excelData) {
      return (
        <div className="w-full h-full flex flex-col p-4">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-800 dark:text-green-200">
                Excel Spreadsheet Preview
              </span>
            </div>
          </div>
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg overflow-auto border border-gray-200 dark:border-gray-700 p-4">
            <div
              className="excel-preview"
              dangerouslySetInnerHTML={{ __html: excelData.html }}
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: "14px",
              }}
            />
          </div>
        </div>
      );
    }

    // Fallback
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <FileText className="w-12 h-12 text-gray-400 mx-auto" />
          <p className="text-gray-600 dark:text-gray-400">
            Preview not available for this file type
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            File: {fileName}
          </p>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300 overflow-hidden ${
          isFullscreen
            ? "w-full h-full max-w-none max-h-none rounded-none"
            : "w-full h-full sm:h-[90vh] sm:max-w-6xl sm:max-h-[800px] sm:rounded-2xl"
        }`}
        style={{
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {/* Header (kept for all sizes; visible on mobile too) */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
                {documentTitle}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                {fileName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="hidden sm:block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
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

        {/* Floating Close for small screens (always visible) */}
        <button
          onClick={onClose}
          className="sm:hidden fixed top-3 right-3 z-[60] rounded-full p-2 bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 shadow-md"
          aria-label="Close"
          title="Close"
        >
          <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
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

type LoadingButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "outline";
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
  loadingIcon,
}: LoadingButtonProps) {
  const isDisabled = disabled || isLoading;

  // Base classes
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed";

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-2 text-sm h-9",
    md: "px-6 py-3 text-base h-12",
    lg: "px-8 py-4 text-lg h-14",
  };

  // Variant classes
  const variantClasses = {
    primary:
      "bg-[#1A8B47] hover:bg-[#0F5D2A] disabled:bg-gray-400 text-white shadow-sm focus:ring-[#1A8B47]",
    secondary:
      "bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white shadow-sm focus:ring-gray-500",
    danger:
      "bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white shadow-sm focus:ring-red-500",
    success:
      "bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white shadow-sm focus:ring-emerald-500",
    outline:
      "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-[#1A8B47] dark:hover:border-[#1A8B47] disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-400 focus:ring-[#1A8B47]",
  };

  // Icon size based on button size
  const iconSize = {
    sm: "w-4 h-4",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const displayIcon = isLoading
    ? loadingIcon || <Loader2 className={`${iconSize[size]} animate-spin`} />
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
import SimpleLoading from "./SimpleLoading";

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
  className = "",
}: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className={`bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-800 max-w-sm w-full ${className}`}
      >
        <div className="text-center space-y-3">
          <SimpleLoading
            message={message}
            fullScreen={false}
            size={variant === "compact" ? "sm" : "md"}
          />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
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
import SimpleLoading from "./SimpleLoading";

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
  title,
  subtitle,
  className = "",
}: LoadingPageProps) {
  const message = subtitle || title || "Loading...";
  return <SimpleLoading message={message} fullScreen className={className} />;
}

```

## app\components\SimpleLoading.tsx

```typescript
"use client";

import React from "react";

type SimpleLoadingProps = {
  message?: string;
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export default function SimpleLoading({
  message = "Loading...",
  fullScreen = true,
  size = "md",
  className = "",
}: SimpleLoadingProps) {
  const sizePx = size === "sm" ? 28 : size === "lg" ? 56 : 40;

  const Spinner = (
    <div
      className="relative"
      style={{ width: sizePx, height: sizePx }}
      role="status"
      aria-label="Loading"
    >
      <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-800" />
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 dark:border-t-blue-400 animate-spin" />
    </div>
  );

  const Content = (
    <div
      className={`flex flex-col items-center text-center gap-3 ${className}`}
    >
      {Spinner}
      {message && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>
      )}
    </div>
  );

  if (!fullScreen) return Content;

  return (
    <div
      className={`min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4 ${className}`}
    >
      {Content}
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
export { default as Spinner } from "./Spinner";
export { default as LoadingOverlay } from "./LoadingOverlay";
export { default as LoadingButton } from "./LoadingButton";
export { default as LoadingPage } from "./LoadingPage";
export { default as SimpleLoading } from "./SimpleLoading";

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
  const [theme, setThemeState] = useState<Theme>("light"); // Changed to light
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light"); // Changed to light
  const [mounted, setMounted] = useState(false);

  // Get system theme
  const getSystemTheme = (): "light" | "dark" => {
    if (typeof window === "undefined") return "light"; // Changed fallback to light
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

    // Get saved theme or default to light
    const savedTheme = (localStorage.getItem("theme") as Theme) || "light"; // Changed default to light
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
  showToast: (message: string, type: "success" | "error") => void;
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
      showToast: (message, type) => show({ message, variant: type }),
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
      {/* Toast Container: bottom-right, mobile-friendly */}
      <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-[1000] flex flex-col-reverse gap-3 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={
              "pointer-events-auto max-w-[90vw] sm:max-w-[360px] rounded-xl border p-4 shadow-lg text-sm text-white " +
              (t.variant === "success"
                ? "bg-[#1A8B47] border-transparent"
                : t.variant === "error"
                ? "bg-red-600 dark:bg-red-500 border-transparent"
                : t.variant === "warning"
                ? "bg-amber-600 dark:bg-amber-500 border-transparent"
                : "bg-[#1A8B47] border-transparent")
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

## app\hooks\useCategories.tsx

```typescript
// ./app/hooks/useCategories.tsx
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Category } from "@/types";
import { useToast } from "@/contexts/ToastContext";
import { AxiosError } from "axios";

// Define error response type
interface ErrorResponse {
  detail?: string;
}

export function useCategories(includeInactive = false) {
  return useQuery<Category[]>({
    queryKey: ["categories", includeInactive],
    queryFn: async () => {
      const params = includeInactive ? "?include_inactive=true" : "";
      const response = await api.get(`/categories${params}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      label: string;
      description?: string;
      color?: string;
      icon?: string;
    }) => {
      const response = await api.post("/categories", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category created successfully");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error.response?.data?.detail || "Failed to create category";
      toast.error(errorMessage);
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: {
        label?: string;
        description?: string;
        color?: string;
        icon?: string;
        is_active?: boolean;
      };
    }) => {
      const response = await api.put(`/categories/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category updated successfully");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error.response?.data?.detail || "Failed to update category";
      toast.error(errorMessage);
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category deleted successfully");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error.response?.data?.detail || "Failed to delete category";
      toast.error(errorMessage);
    },
  });
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

  // Refresh immediately when other parts of the app update notifications
  useEffect(() => {
    const handler = () => fetchUnreadCount();
    window.addEventListener("notifications:updated", handler);
    return () => window.removeEventListener("notifications:updated", handler);
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
import axios from "axios";
import Cookies from "js-cookie";

// In development, use the full URL. In production (static export), use relative paths
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://backend.portal.metsa.com/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // Add withCredentials for CORS
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
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
      const url: string | undefined = error.config?.url;
      const isAuthRoute =
        url?.includes("/auth/login") || url?.includes("/auth/signup");
      const isOnAuthPage =
        typeof window !== "undefined" &&
        (window.location.pathname === "/login" ||
          window.location.pathname === "/signup");

      if (!isAuthRoute) {
        Cookies.remove("access_token");
      }

      // Avoid hard redirect when already on auth pages or when the request was the auth call itself
      if (!isAuthRoute && !isOnAuthPage) {
        window.location.href = "/login";
      }
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

// Remove the enum and use string type instead
export type DocumentCategory = string;

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
  [key: string]: string | undefined;
}

export interface Category {
  id: string;
  name: string;
  label: string;
  description?: string;
  color?: string;
  icon?: string;
  is_active: boolean;
  is_default: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
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
  is_super_admin?: boolean;
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
  category: string; // Changed from DocumentCategory enum to string
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
