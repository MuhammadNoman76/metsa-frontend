"use client";

import { useEffect, useMemo, useState } from "react";
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

  useEffect(
    () => {
      fetchDocuments();
    },
    [
      /* mount */
    ]
  );

  const fetchDocuments = async () => {
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
  };

  // Refetch when filters change
  useEffect(() => {
    if (!loading) {
      fetchDocuments();
    }
  }, [debouncedSearch, categoryFilter, visibilityFilter, loading]);

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
    }
  };

  const handlePreview = (doc: Document) => {
    const canDownload =
      !doc.is_viewable_only && user?.role !== UserRole.CUSTOMER;
    setPreviewModal({
      isOpen: true,
      documentId: doc.id,
      documentTitle: doc.title,
      fileName: doc.file_name,
      mimeType: doc.mime_type,
      canDownload,
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
            className="flex-1 inline-flex items-center justify-center gap-2 h-9 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-all"
          >
            <Download className="w-4 h-4" />
            Download
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

          <div className="text-xs text-gray-500 dark:text-gray-400 flex flex-col items-start md:items-end">
            <span>Size: {formatFileSize(doc.file_size)}</span>
            <span>
              Updated: {format(new Date(doc.updated_at), "MMM dd, yyyy")}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
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
                className="inline-flex items-center justify-center gap-1.5 h-9 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
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

              {canEdit && (
                <button
                  onClick={() => router.push(`/${user?.role}/documents/upload`)}
                  className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-4 sm:px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 shadow-sm"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Upload</span>
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
