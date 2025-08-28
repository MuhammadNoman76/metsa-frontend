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
