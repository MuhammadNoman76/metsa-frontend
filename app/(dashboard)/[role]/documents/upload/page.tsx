"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import {
  Upload,
  FileText,
  X,
  ChevronDown,
  Eye,
  EyeOff,
  Tag,
  Info,
  Loader2,
  CheckCircle,
  AlertCircle,
  FolderOpen,
} from "lucide-react";
import api from "@/lib/api";
import { UserRole, DocumentVisibility } from "@/types";
import { useCategories } from "@/hooks/useCategories";

interface UploadProgress {
  fileName: string;
  progress: number;
  status: "pending" | "uploading" | "success" | "error";
  message?: string;
}

export default function DocumentUploadPage() {
  const router = useRouter();
  const { user } = useAuth();
  const toast = useToast();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    visibility: DocumentVisibility.PRIVATE,
    is_viewable_only: false,
    tags: "",
  });
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Set default category when categories load
  useEffect(() => {
    if (categories && categories.length > 0 && !formData.category) {
      const defaultCategory =
        categories.find((cat) => cat.is_default) || categories[0];
      setFormData((prev) => ({ ...prev, category: defaultCategory.name }));
    }
  }, [categories, formData.category]);

  const categoryOptions = useMemo(() => {
    if (!categories) return [];
    return categories
      .filter((cat) => cat.is_active)
      .map((cat) => ({
        value: cat.name,
        label: cat.label,
      }));
  }, [categories]);

  const visibilityOptions = [
    {
      value: DocumentVisibility.PUBLIC,
      label: "Public",
      description: "All users can view",
      icon: Eye,
    },
    {
      value: DocumentVisibility.PRIVATE,
      label: "Private",
      description: "Only assigned users",
      icon: EyeOff,
    },
    {
      value: DocumentVisibility.INTERNAL,
      label: "Internal",
      description: "Employees only",
      icon: FileText,
    },
  ];

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFile = async (file: File, index: number) => {
    const formDataToSend = new FormData();
    formDataToSend.append("file", file);
    formDataToSend.append("title", formData.title || file.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("visibility", formData.visibility);
    formDataToSend.append(
      "is_viewable_only",
      String(formData.is_viewable_only)
    );

    if (formData.tags) {
      formDataToSend.append("tags", formData.tags);
    }

    try {
      const endpoint =
        user?.role === UserRole.CUSTOMER
          ? "/documents/customer-upload"
          : "/documents/";

      const response = await api.post(endpoint, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setUploadProgress((prev) =>
            prev.map((p, i) =>
              i === index ? { ...p, progress: percentCompleted } : p
            )
          );
        },
      });

      setUploadProgress((prev) =>
        prev.map((p, i) =>
          i === index
            ? {
                ...p,
                status: "success",
                progress: 100,
                message: "Uploaded successfully",
              }
            : p
        )
      );

      return response.data;
    } catch (error: any) {
      setUploadProgress((prev) =>
        prev.map((p, i) =>
          i === index
            ? {
                ...p,
                status: "error",
                message: error.response?.data?.detail || "Upload failed",
              }
            : p
        )
      );
      throw error;
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select at least one file");
      return;
    }

    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }

    setIsUploading(true);
    setUploadProgress(
      files.map((file) => ({
        fileName: file.name,
        progress: 0,
        status: "pending",
      }))
    );

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < files.length; i++) {
      setUploadProgress((prev) =>
        prev.map((p, idx) => (idx === i ? { ...p, status: "uploading" } : p))
      );

      try {
        await uploadFile(files[i], i);
        successCount++;
      } catch (error) {
        errorCount++;
        console.error(`Failed to upload ${files[i].name}:`, error);
      }
    }

    setIsUploading(false);

    if (successCount > 0) {
      toast.success(`Successfully uploaded ${successCount} file(s)`);
      if (errorCount === 0) {
        setTimeout(() => {
          router.push(`/${user?.role}/documents`);
        }, 1500);
      }
    }

    if (errorCount > 0) {
      toast.error(`Failed to upload ${errorCount} file(s)`);
    }
  };

  const getCategoryColor = (categoryName: string) => {
    const category = categories?.find((cat) => cat.name === categoryName);
    if (!category) return "bg-gray-100 text-gray-700";

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

  if (categoriesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Upload Documents
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Upload and organize your documents securely
          </p>
        </div>

        {/* Upload Form */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
          {/* Form Fields */}
          <div className="p-6 space-y-6 border-b border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Document Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter document title"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <div className="relative">
                  <FolderOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full pl-10 pr-10 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                  >
                    {categoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  {formData.category && (
                    <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                      <span
                        className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${getCategoryColor(
                          formData.category
                        )}`}
                      >
                        {
                          categoryOptions.find(
                            (opt) => opt.value === formData.category
                          )?.label
                        }
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Add a description..."
                rows={3}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Visibility
                </label>
                <div className="space-y-2">
                  {visibilityOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <label
                        key={option.value}
                        className="flex items-center p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                      >
                        <input
                          type="radio"
                          name="visibility"
                          value={option.value}
                          checked={formData.visibility === option.value}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              visibility: e.target.value as DocumentVisibility,
                            })
                          }
                          className="mr-3"
                        />
                        <Icon className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {option.label}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {option.description}
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tags
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value })
                      }
                      placeholder="tag1, tag2, tag3"
                      className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Separate tags with commas
                  </p>
                </div>

                <label className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_viewable_only}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        is_viewable_only: e.target.checked,
                      })
                    }
                    className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      View Only
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Prevent downloads, users can only view
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* File Upload Area */}
          <div className="p-6">
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                dragActive
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
              }`}
            >
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.png,.jpg,.jpeg"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer inline-flex flex-col items-center"
              >
                <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
                <span className="text-gray-900 dark:text-white font-medium">
                  Drop files here or click to browse
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  PDF, DOC, DOCX, XLS, XLSX, TXT, PNG, JPG up to 10MB
                </span>
              </label>
            </div>

            {/* Selected Files */}
            {files.length > 0 && (
              <div className="mt-6 space-y-3">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Selected Files ({files.length})
                </h3>
                <div className="space-y-2">
                  {files.map((file, index) => {
                    const progress = uploadProgress[index];
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                            {progress && (
                              <div className="mt-2">
                                {progress.status === "uploading" && (
                                  <div className="flex items-center space-x-2">
                                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                      <div
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{
                                          width: `${progress.progress}%`,
                                        }}
                                      />
                                    </div>
                                    <span className="text-xs text-gray-600 dark:text-gray-400">
                                      {progress.progress}%
                                    </span>
                                  </div>
                                )}
                                {progress.status === "success" && (
                                  <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                                    <CheckCircle className="w-4 h-4" />
                                    <span className="text-xs">
                                      {progress.message}
                                    </span>
                                  </div>
                                )}
                                {progress.status === "error" && (
                                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                                    <AlertCircle className="w-4 h-4" />
                                    <span className="text-xs">
                                      {progress.message}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        {!isUploading && (
                          <button
                            onClick={() => removeFile(index)}
                            className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={() => router.back()}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={files.length === 0 || isUploading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-200 flex items-center space-x-2"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    <span>Upload Documents</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
