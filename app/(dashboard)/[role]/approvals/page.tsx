"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useToast } from "@/contexts/ToastContext";
import { User, UserRole, ApprovalStatus } from "@/types";
import { format } from "date-fns";
import SimpleLoading from "@/components/SimpleLoading";
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

  if (loading) return <SimpleLoading message="Loading..." fullScreen />;

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
