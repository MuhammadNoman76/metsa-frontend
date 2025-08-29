"use client";

import React from "react";
import { Loader2 } from "lucide-react";

type LoadingButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "outline";
type LoadingButtonSize = "sm" | "md" | "lg";

type LoadingButtonProps = {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  variant?: LoadingButtonVariant;
  size?: LoadingButtonSize;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: React.ReactNode;
  loadingIcon?: React.ReactNode;
};

export default function LoadingButton({
  children,
  isLoading = false,
  loadingText,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  type = "button",
  onClick,
  icon,
  loadingIcon,
}: LoadingButtonProps) {
  const isDisabled = disabled || isLoading;

  // Base classes
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed";

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-2 text-sm h-9",
    md: "px-6 py-3 text-base h-12",
    lg: "px-8 py-4 text-lg h-14",
  };

  // Variant classes
  const variantClasses = {
    primary:
      "bg-[#1A8B47] hover:bg-[#0F5D2A] disabled:bg-gray-400 text-white shadow-sm focus:ring-[#1A8B47]",
    secondary:
      "bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white shadow-sm focus:ring-gray-500",
    danger:
      "bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white shadow-sm focus:ring-red-500",
    success:
      "bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white shadow-sm focus:ring-emerald-500",
    outline:
      "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-[#1A8B47] dark:hover:border-[#1A8B47] disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-400 focus:ring-[#1A8B47]",
  };

  // Icon size based on button size
  const iconSize = {
    sm: "w-4 h-4",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const displayIcon = isLoading
    ? loadingIcon || <Loader2 className={`${iconSize[size]} animate-spin`} />
    : icon;

  const displayText = isLoading && loadingText ? loadingText : children;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={combinedClasses}
    >
      {displayIcon}
      <span>{displayText}</span>
    </button>
  );
}
