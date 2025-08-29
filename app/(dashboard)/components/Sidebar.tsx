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
