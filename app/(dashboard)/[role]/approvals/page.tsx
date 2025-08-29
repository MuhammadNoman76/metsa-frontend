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
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 border border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`h-9 sm:h-10 flex-1 rounded-lg flex items-center justify-center transition-all duration-200 px-3 ${
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
                  className={`h-9 sm:h-10 flex-1 rounded-lg flex items-center justify-center transition-all duration-200 px-3 ${
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
