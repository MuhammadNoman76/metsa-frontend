// ./app/hooks/useCategories.tsx
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Category } from "@/types";
import { useToast } from "@/contexts/ToastContext";
import { AxiosError } from "axios";

// Define error response type
interface ErrorResponse {
  detail?: string;
}

export function useCategories(includeInactive = false) {
  return useQuery<Category[]>({
    queryKey: ["categories", includeInactive],
    queryFn: async () => {
      const params = includeInactive ? "?include_inactive=true" : "";
      const response = await api.get(`/categories${params}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      label: string;
      description?: string;
      color?: string;
      icon?: string;
    }) => {
      const response = await api.post("/categories", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category created successfully");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error.response?.data?.detail || "Failed to create category";
      toast.error(errorMessage);
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: {
        label?: string;
        description?: string;
        color?: string;
        icon?: string;
        is_active?: boolean;
      };
    }) => {
      const response = await api.put(`/categories/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category updated successfully");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error.response?.data?.detail || "Failed to update category";
      toast.error(errorMessage);
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category deleted successfully");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error.response?.data?.detail || "Failed to delete category";
      toast.error(errorMessage);
    },
  });
}
