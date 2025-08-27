"use client";

import React from "react";
import Spinner from "./Spinner";

type LoadingOverlayProps = {
  message?: string;
  title?: string;
  isVisible?: boolean;
  variant?: "default" | "compact";
  className?: string;
};

export default function LoadingOverlay({ 
  message = "Processing...", 
  title = "Processing",
  isVisible = true,
  variant = "default",
  className = ""
}: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-800 max-w-sm w-full ${className}`}>
        <div className="text-center space-y-4">
          {/* Spinner */}
          <div className="flex justify-center">
            <Spinner 
              size={variant === "compact" ? 32 : 48} 
              variant="default" 
              color="primary" 
            />
          </div>
          
          {/* Content */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
