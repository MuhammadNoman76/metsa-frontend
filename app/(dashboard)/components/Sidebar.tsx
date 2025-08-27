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
