"use client";

import { useState } from "react";
import {
  FolderPlus,
  Edit2,
  Trash2,
  Check,
  AlertCircle,
  Loader2,
  Shield,
  FileText,
  Package,
  Settings,
} from "lucide-react";
import { Category } from "@/types";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "@/hooks/useCategories";

// Icon options for categories
const ICON_OPTIONS = [
  { value: "FileText", label: "File", icon: FileText },
  { value: "Package", label: "Package", icon: Package },
  { value: "Shield", label: "Shield", icon: Shield },
  { value: "Settings", label: "Settings", icon: Settings },
];

// Color options
const COLOR_OPTIONS = [
  { value: "blue", label: "Blue", class: "bg-blue-500" },
  { value: "emerald", label: "Green", class: "bg-emerald-500" },
  { value: "red", label: "Red", class: "bg-red-500" },
  { value: "purple", label: "Purple", class: "bg-purple-500" },
  { value: "amber", label: "Amber", class: "bg-amber-500" },
  { value: "indigo", label: "Indigo", class: "bg-indigo-500" },
  { value: "gray", label: "Gray", class: "bg-gray-500" },
];

export default function CategoryManagement() {
  const { data: categories, isLoading } = useCategories(true);
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Category | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    label: "",
    description: "",
    color: "blue",
    icon: "FileText",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      label: "",
      description: "",
      color: "blue",
      icon: "FileText",
    });
    setEditingCategory(null);
    setShowCreateModal(false);
  };

  const handleCreate = async () => {
    if (!formData.name || !formData.label) return;

    try {
      await createMutation.mutateAsync({
        name: formData.name.toLowerCase().replace(/\s+/g, "_"),
        label: formData.label,
        description: formData.description,
        color: formData.color,
        icon: formData.icon,
      });
      resetForm();
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleUpdate = async () => {
    if (!editingCategory) return;

    try {
      await updateMutation.mutateAsync({
        id: editingCategory.id,
        data: {
          label: formData.label,
          description: formData.description,
          color: formData.color,
          icon: formData.icon,
        },
      });
      resetForm();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;

    try {
      await deleteMutation.mutateAsync(deleteConfirm.id);
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const startEdit = (category: Category) => {
    setFormData({
      name: category.name,
      label: category.label,
      description: category.description || "",
      color: category.color || "blue",
      icon: category.icon || "FileText",
    });
    setEditingCategory(category);
  };

  const toggleActive = async (category: Category) => {
    try {
      await updateMutation.mutateAsync({
        id: category.id,
        data: { is_active: !category.is_active },
      });
    } catch (error) {
      console.error("Error toggling category:", error);
    }
  };

  const getCategoryColor = (color: string) => {
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
    return colorMap[color] || colorMap.gray;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Document Categories
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage categories for organizing documents
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200"
        >
          <FolderPlus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Categories List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories?.map((category) => (
          <div
            key={category.id}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryColor(
                    category.color || "gray"
                  )}`}
                >
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {category.label}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {category.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {category.is_default && (
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium rounded-full">
                    Default
                  </span>
                )}
                {!category.is_active && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
                    Inactive
                  </span>
                )}
              </div>
            </div>

            {category.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {category.description}
              </p>
            )}

            <div className="flex items-center justify-between">
              <button
                onClick={() => toggleActive(category)}
                disabled={category.is_default}
                className={`text-sm font-medium ${
                  category.is_active
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-gray-600 dark:text-gray-400"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {category.is_active ? "Active" : "Inactive"}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => startEdit(category)}
                  className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                {!category.is_default && (
                  <button
                    onClick={() => setDeleteConfirm(category)}
                    className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || editingCategory) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={resetForm}
          />
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {editingCategory ? "Edit Category" : "Create Category"}
            </h3>

            <div className="space-y-4">
              {!editingCategory && (
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Category ID
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., legal_documents"
                    className="w-full h-11 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Unique identifier (lowercase, use underscores)
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={formData.label}
                  onChange={(e) =>
                    setFormData({ ...formData, label: e.target.value })
                  }
                  placeholder="e.g., Legal Documents"
                  className="w-full h-11 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Brief description of this category..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Color
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {COLOR_OPTIONS.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, color: color.value })
                        }
                        className={`w-full h-8 rounded-lg ${
                          color.class
                        } flex items-center justify-center transition-all ${
                          formData.color === color.value
                            ? "ring-2 ring-offset-2 ring-blue-500"
                            : ""
                        }`}
                        title={color.label}
                      >
                        {formData.color === color.value && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Icon
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {ICON_OPTIONS.map((icon) => {
                      const IconComponent = icon.icon;
                      return (
                        <button
                          key={icon.value}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, icon: icon.value })
                          }
                          className={`h-8 rounded-lg border ${
                            formData.icon === icon.value
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                              : "border-gray-300 dark:border-gray-600"
                          } flex items-center justify-center transition-all`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 justify-end">
              <button
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editingCategory ? handleUpdate : handleCreate}
                disabled={
                  !formData.label ||
                  (!editingCategory && !formData.name) ||
                  createMutation.isPending ||
                  updateMutation.isPending
                }
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-xl transition-colors disabled:cursor-not-allowed"
              >
                {createMutation.isPending || updateMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : editingCategory ? (
                  "Update"
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setDeleteConfirm(null)}
          />
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-800">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Delete Category
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Are you sure you want to delete &quot;{deleteConfirm.label}
                  &quot;? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium rounded-xl transition-colors disabled:cursor-not-allowed"
              >
                {deleteMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
