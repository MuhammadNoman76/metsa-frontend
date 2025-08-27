"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  Calendar,
  FolderOpen,
  Users,
  Lock,
  Globe,
  ChevronDown,
  X,
  Shield,
  EyeOff,
} from "lucide-react";
import { format } from "date-fns";
import api from "@/lib/api";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import {
  Document,
  DocumentCategory,
  DocumentVisibility,
  UserRole,
} from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import DocumentPreviewModal from "@/components/DocumentPreviewModal";
import { useToast } from "@/contexts/ToastContext";

// Utils
const bytesToMB = (bytes: number) => (bytes / 1024 / 1024).toFixed(1) + " MB";

// A11y: Visually-hidden label
const VisuallyHidden = ({ children }: { children: React.ReactNode }) => (
  <span className="sr-only">{children}</span>
);

// Theme-aware Select (light + dark)
const ThemedSelect = ({
  value,
  onChange,
  options,
  placeholder,
  label,
  ariaLabel,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  label?: string;
  ariaLabel?: string;
}) => {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={ariaLabel}
          className="w-full h-11 px-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl text-left flex items-center justify-between text-sm text-gray-900 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <span
            className={
              selected
                ? "text-gray-900 dark:text-gray-200"
                : "text-gray-500 dark:text-gray-400"
            }
          >
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""
              }`}
          />
        </button>

        {open && (
          <>
            <button
              className="fixed inset-0 z-20 cursor-default"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <div
              role="listbox"
              className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl z-30 max-h-64 overflow-auto"
            >
              {options.map((opt) => (
                <button
                  key={opt.value}
                  role="option"
                  aria-selected={opt.value === value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-900 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Confirm Modal (theme-aware)
const ConfirmModal = ({
  open,
  title,
  message,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <button
            onClick={onCancel}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:border-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default function DocumentsPage() {
  const router = useRouter();
  const params = useSearchParams();
  const queryClient = useQueryClient();
  const toast = useToast();
  const { user } = useAuth();

  // View mode
  const [view, setView] = useState<"grid" | "list">("grid");

  // Filters + debounced state
  const [filters, setFilters] = useState({
    search: params.get("search") ?? "",
    category: (params.get("category") as string) ?? "all",
    visibility: (params.get("visibility") as string) ?? "all",
    page: 1,
    pageSize: 20,
  });
  const [debounced, setDebounced] = useState(filters);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(filters), 300);
    return () => clearTimeout(t);
  }, [filters]);

  // Keep URL in sync (no scroll jump)
  useEffect(() => {
    const sp = new URLSearchParams();
    if (filters.search) sp.set("search", filters.search);
    if (filters.category !== "all") sp.set("category", filters.category);
    if (filters.visibility !== "all") sp.set("visibility", filters.visibility);
    const qs = sp.toString();
    router.replace(qs ? `?${qs}` : "?", { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.search, filters.category, filters.visibility]);

  // Build API url
  const buildUrl = (f: typeof debounced) => {
    const q: string[] = [];
    if (f.search) q.push(`search=${encodeURIComponent(f.search)}`);
    if (f.category !== "all")
      q.push(`category=${encodeURIComponent(f.category)}`);
    if (f.visibility !== "all")
      q.push(`visibility=${encodeURIComponent(f.visibility)}`);
    q.push(`skip=${(f.page - 1) * f.pageSize}`);
    q.push(`limit=${f.pageSize}`);
    return `/documents?${q.join("&")}`;
  };

  // Fetch
  const {
    data: documents,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["documents", debounced],
    queryFn: async () =>
      (await api.get(buildUrl(debounced))).data as Document[],
    placeholderData: keepPreviousData,
    staleTime: 15_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: true,
  });

  const canEdit =
    user?.role === UserRole.ADMIN || user?.role === UserRole.EDITOR;
  const canDelete = user?.role === UserRole.ADMIN;

  // Delete with optimistic update
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => api.delete(`/documents/${id}`),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["documents"] });
      const key = ["documents", debounced] as const;
      const previous = queryClient.getQueryData<Document[]>(key);
      if (previous) {
        queryClient.setQueryData<Document[]>(
          key,
          previous.filter((d) => d.id !== id)
        );
      }
      return { previous, key };
    },
    onError: (_e, _id, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(ctx.key, ctx.previous);
      toast.error("Failed to delete document. Please try again.");
    },
    onSuccess: () => toast.success("Document deleted"),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });

  // Delete modal
  const [confirm, setConfirm] = useState<{
    open: boolean;
    id: string;
    title: string;
  }>({
    open: false,
    id: "",
    title: "",
  });
  const askDelete = (id: string, title: string) =>
    setConfirm({ open: true, id, title });
  const confirmDelete = async () => {
    const id = confirm.id;
    setConfirm({ open: false, id: "", title: "" });
    await deleteMutation.mutateAsync(id);
  };

  // Preview modal
  const [preview, setPreview] = useState<{
    open: boolean;
    id: string;
    title: string;
    fileName: string;
    mime?: string;
    canDownload: boolean;
  }>({
    open: false,
    id: "",
    title: "",
    fileName: "",
    mime: "",
    canDownload: false,
  });

  const openPreview = (doc: Document) => {
    const canDownload =
      !doc.is_viewable_only && user?.role !== UserRole.CUSTOMER;
    setPreview({
      open: true,
      id: doc.id,
      title: doc.title,
      fileName: doc.file_name,
      mime: doc.mime_type,
      canDownload,
    });
  };

  const handleEdit = (id: string) =>
    router.push(`/${user?.role}/documents/${id}/edit`);

  const handleDownload = async (id: string, fileName: string) => {
    try {
      const res = await api.get(`/documents/${id}/download`, {
        responseType: "blob",
      });
      const blob = new Blob([res.data], {
        type: res.headers["content-type"] || "application/octet-stream",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e: unknown) {
      const status = (e as { response?: { status?: number } })?.response?.status;
      if (status === 403)
        toast.error("Download not allowed for this document.");
      else if (status === 404) toast.error("Document not found.");
      else toast.error("Unable to download. Please try again.");
    }
  };

  // Options
  const categoryOptions = useMemo(
    () => [
      { value: "all", label: "All Categories" },
      ...Object.values(DocumentCategory).map((c) => ({
        value: c,
        label: c.charAt(0).toUpperCase() + c.slice(1),
      })),
    ],
    []
  );

  const visibilityOptions = useMemo(
    () => [
      { value: "all", label: "All Visibility" },
      ...Object.values(DocumentVisibility).map((v) => ({
        value: v,
        label: v.charAt(0).toUpperCase() + v.slice(1),
      })),
    ],
    []
  );

  const getVisibilityIcon = (v: string) =>
    v === "public" ? (
      <Globe className="w-3 h-3" />
    ) : v === "private" ? (
      <Lock className="w-3 h-3" />
    ) : (
      <Users className="w-3 h-3" />
    );

  // theme-aware pill colors
  const getVisibilityColor = (v: string) =>
    v === "public"
      ? "bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800"
      : v === "private"
        ? "bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
        : "bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800";

  const getCategoryColor = (c: string) => {
    const map: Record<string, string> = {
      commercial:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      quality:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
      safety: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      compliance:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      contracts:
        "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      specifications:
        "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
      other: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    };
    return map[c] || map.other;
  };

  // Actions for card layout
  const CardActions = ({ doc }: { doc: Document }) => (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => openPreview(doc)}
        className="flex items-center gap-2 px-4 py-2.5 text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded-xl transition-colors font-medium min-w-[120px] justify-center"
        aria-label={`Preview ${doc.title}`}
      >
        <Eye className="w-4 h-4" />
        Preview
      </button>

      {!doc.is_viewable_only && user?.role !== UserRole.CUSTOMER ? (
        <button
          onClick={() => handleDownload(doc.id, doc.file_name)}
          className="flex items-center gap-2 px-4 py-2.5 text-sm bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:hover:bg-emerald-900/30 rounded-xl transition-colors font-medium min-w-[120px] justify-center"
          aria-label={`Download ${doc.title}`}
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      ) : (
        <div
          className="flex items-center gap-2 px-4 py-2.5 text-sm bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800 rounded-xl font-medium min-w-[120px] justify-center"
          aria-label="View only"
        >
          <EyeOff className="w-4 h-4" />
          View Only
        </div>
      )}

      {canEdit && (
        <button
          onClick={() => handleEdit(doc.id)}
          className="flex items-center gap-2 px-4 py-2.5 text-sm bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-800 dark:hover:bg-gray-800 rounded-xl transition-colors font-medium min-w-[120px] justify-center"
          aria-label={`Edit ${doc.title}`}
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>
      )}

      {canDelete && (
        <button
          onClick={() => askDelete(doc.id, doc.title)}
          className="flex items-center gap-2 px-4 py-2.5 text-sm bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 rounded-xl transition-colors font-medium min-w-[120px] justify-center"
          aria-label={`Delete ${doc.title}`}
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      )}
    </div>
  );

  const DocumentCard = ({ doc }: { doc: Document }) => (
    <div className="group bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-200 overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate text-lg">
                {doc.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
                {doc.file_name}
              </p>
            </div>
          </div>
        </div>

        {doc.description && (
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-sm leading-relaxed">
            {doc.description}
          </p>
        )}

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span
            className={`inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded-lg ${getCategoryColor(
              doc.category
            )}`}
          >
            <FolderOpen className="w-3 h-3 mr-1.5" />
            {doc.category}
          </span>
          <span
            className={`inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded-lg ${getVisibilityColor(
              doc.visibility
            )} gap-1.5`}
          >
            {getVisibilityIcon(doc.visibility)}
            {doc.visibility}
          </span>
          {doc.is_viewable_only && (
            <span className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded-lg bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800 gap-1.5">
              <Shield className="w-3 h-3" />
              View Only
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
          <span className="font-medium">{bytesToMB(doc.file_size)}</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            {format(new Date(doc.updated_at), "MMM dd, yyyy")}
          </span>
        </div>

        <CardActions doc={doc} />
      </div>
    </div>
  );

  const DocumentRow = ({ doc }: { doc: Document }) => (
    <div className="group bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all duration-150 p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
              {doc.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">
              {doc.description || doc.file_name}
            </p>
          </div>

          <div className="hidden md:flex items-center gap-3 ml-4">
            <span
              className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-lg ${getCategoryColor(
                doc.category
              )}`}
            >
              {doc.category}
            </span>
            <span
              className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-lg ${getVisibilityColor(
                doc.visibility
              )} gap-1`}
            >
              {getVisibilityIcon(doc.visibility)}
              {doc.visibility}
            </span>
            {doc.is_viewable_only && (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-lg bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800 gap-1">
                <Shield className="w-3 h-3" />
                View Only
              </span>
            )}
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {bytesToMB(doc.file_size)}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {format(new Date(doc.updated_at), "MMM dd, yyyy")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => openPreview(doc)}
            className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
            title="Preview"
            aria-label={`Preview ${doc.title}`}
          >
            <Eye className="w-4 h-4" />
          </button>

          {!doc.is_viewable_only && user?.role !== UserRole.CUSTOMER ? (
            <button
              onClick={() => handleDownload(doc.id, doc.file_name)}
              className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
              title="Download"
              aria-label={`Download ${doc.title}`}
            >
              <Download className="w-4 h-4" />
            </button>
          ) : (
            <div
              className="p-2 rounded-lg text-amber-600 dark:text-amber-400 cursor-not-allowed"
              title="View Only"
            >
              <EyeOff className="w-4 h-4" />
            </div>
          )}

          {canEdit && (
            <button
              onClick={() => handleEdit(doc.id)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              title="Edit"
              aria-label={`Edit ${doc.title}`}
            >
              <Edit className="w-4 h-4" />
            </button>
          )}

          {canDelete && (
            <button
              onClick={() => askDelete(doc.id, doc.title)}
              className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
              title="Delete"
              aria-label={`Delete ${doc.title}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Small-screen meta */}
      <div className="md:hidden mt-3 flex items-center flex-wrap gap-2">
        <span
          className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-lg ${getCategoryColor(
            doc.category
          )}`}
        >
          {doc.category}
        </span>
        <span
          className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-lg ${getVisibilityColor(
            doc.visibility
          )} gap-1`}
        >
          {getVisibilityIcon(doc.visibility)}
          {doc.visibility}
        </span>
        {doc.is_viewable_only && (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-lg bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800 gap-1">
            <Shield className="w-3 h-3" />
            View Only
          </span>
        )}
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          {bytesToMB(doc.file_size)}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {format(new Date(doc.updated_at), "MMM dd, yyyy")}
        </span>
      </div>
    </div>
  );

  // Header toolbar
  const Toolbar = () => (
    <div className="flex items-center gap-3">
      <div className="flex bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-1">
        <button
          onClick={() => setView("grid")}
          aria-pressed={view === "grid"}
          aria-label="Grid view"
          className={`h-10 w-10 rounded-lg flex items-center justify-center transition-colors ${view === "grid"
            ? "bg-blue-600 text-white"
            : "text-gray-600 hover:text-gray-900 hover:bg-white dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800"
            }`}
        >
          <Grid className="w-4 h-4" />
          <VisuallyHidden>Grid</VisuallyHidden>
        </button>
        <button
          onClick={() => setView("list")}
          aria-pressed={view === "list"}
          aria-label="List view"
          className={`h-10 w-10 rounded-lg flex items-center justify-center transition-colors ${view === "list"
            ? "bg-blue-600 text-white"
            : "text-gray-600 hover:text-gray-900 hover:bg-white dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800"
            }`}
        >
          <List className="w-4 h-4" />
          <VisuallyHidden>List</VisuallyHidden>
        </button>
      </div>

      {canEdit && (
        <button
          onClick={() => router.push(`/${user?.role}/documents/upload`)}
          className="inline-flex items-center gap-2 h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Document
        </button>
      )}
    </div>
  );

  const LoadingCard = () => (
    <div className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-xl" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
        </div>
      </div>
      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full mb-2" />
      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-2/3 mb-4" />
      <div className="flex gap-2">
        <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-xl w-28" />
        <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-xl w-28" />
      </div>
    </div>
  );

  const docs = documents ?? [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
                Document Library
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Organize, manage, and collaborate on all your important
                documents
              </p>
              <div className="flex items-center gap-6 mt-4 text-sm">
                <div className="text-gray-600 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {docs.length}
                  </span>
                  <span className="ml-1">documents found</span>
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {filters.search ||
                      filters.category !== "all" ||
                      filters.visibility !== "all"
                      ? "Filtered"
                      : "All"}
                  </span>
                  <span className="ml-1">results</span>
                </div>
                {isFetching && (
                  <span className="text-xs text-gray-500">Refreshing…</span>
                )}
              </div>
            </div>
            <Toolbar />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-6">
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                Search Documents
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="search"
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      search: e.target.value,
                      page: 1,
                    }))
                  }
                  placeholder="Search by title, description, filename..."
                  className="w-full h-11 pl-10 pr-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl text-sm text-gray-900 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  aria-label="Search documents"
                />
              </div>
            </div>

            <div className="lg:col-span-3">
              <ThemedSelect
                label="Category"
                value={filters.category}
                onChange={(v) =>
                  setFilters((f) => ({ ...f, category: v, page: 1 }))
                }
                options={categoryOptions}
                placeholder="All Categories"
                ariaLabel="Filter by category"
              />
            </div>

            <div className="lg:col-span-3">
              <ThemedSelect
                label="Visibility"
                value={filters.visibility}
                onChange={(v) =>
                  setFilters((f) => ({ ...f, visibility: v, page: 1 }))
                }
                options={visibilityOptions}
                placeholder="All Visibility"
                ariaLabel="Filter by visibility"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {isLoading ? (
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {Array.from({ length: view === "grid" ? 9 : 6 }).map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        ) : docs.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No documents found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              {filters.search ||
                filters.category !== "all" ||
                filters.visibility !== "all"
                ? "Try adjusting your search or filters."
                : "Get started by uploading your first document."}
            </p>
            {canEdit && (
              <button
                onClick={() => router.push(`/${user?.role}/documents/upload`)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
              >
                <Plus className="w-5 h-5" />
                Upload Document
              </button>
            )}
          </div>
        ) : (
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {docs.map((doc) =>
              view === "grid" ? (
                <DocumentCard key={doc.id} doc={doc} />
              ) : (
                <DocumentRow key={doc.id} doc={doc} />
              )
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <ConfirmModal
        open={confirm.open}
        title="Delete Document"
        message={`Are you sure you want to permanently delete "${confirm.title}"? This action cannot be undone.`}
        onCancel={() => setConfirm({ open: false, id: "", title: "" })}
        onConfirm={confirmDelete}
      />

      <DocumentPreviewModal
        isOpen={preview.open}
        onClose={() =>
          setPreview({
            open: false,
            id: "",
            title: "",
            fileName: "",
            mime: "",
            canDownload: false,
          })
        }
        documentId={preview.id}
        documentTitle={preview.title}
        fileName={preview.fileName}
        mimeType={preview.mime}
        canDownload={preview.canDownload}
      />
    </div>
  );
}
