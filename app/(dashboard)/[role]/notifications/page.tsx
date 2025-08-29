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
