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
    });
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
      await api.put(`/users/${selectedUser.id}`, editUser);
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

  /* User Card (Grid) - Updated with super admin protection */
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
              className="flex-1 inline-flex items-center justify-center gap-2 h-9 px-4 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
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
              className="flex-1 inline-flex items-center justify-center gap-2 h-9 px-4 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </>
        ) : currentUser?.is_super_admin ? (
          <>
            <button
              onClick={() => handleEditClick(user)}
              className="flex-1 inline-flex items-center justify-center gap-2 h-9 px-4 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
            <div className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 px-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-400 text-sm font-medium rounded-lg border border-purple-200 dark:border-purple-800">
              <Shield className="w-4 h-4" />
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

  /* User Row (List) - Updated with super admin protection */
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
                className="inline-flex items-center justify-center gap-1.5 h-9 px-4 border border-gray-300 dark:border-gray-700 bg-transparent text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
                className="inline-flex items-center justify-center gap-1.5 h-9 px-4 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </>
          ) : currentUser?.is_super_admin ? (
            <>
              <button
                onClick={() => handleEditClick(user)}
                className="inline-flex items-center justify-center gap-1.5 h-9 px-4 border border-gray-300 dark:border-gray-700 bg-transparent text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
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

      {/* Create User Modal - Updated with role restrictions */}
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

      {/* Edit User Modal - Updated with restrictions for super admin */}
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
