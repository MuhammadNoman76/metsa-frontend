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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      {/* Main content wrapper */}
      <div className="flex">
        {/* Spacer div that matches sidebar width */}
        <div className="hidden lg:block w-16 transition-all duration-300 sidebar-spacer" />

        {/* Main content */}
        <main className="flex-1 pt-[60px] lg:pt-0 transition-all duration-300">
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
