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
