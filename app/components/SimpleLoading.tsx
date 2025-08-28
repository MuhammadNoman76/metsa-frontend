"use client";

import React from "react";

type SimpleLoadingProps = {
  message?: string;
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export default function SimpleLoading({
  message = "Loading...",
  fullScreen = true,
  size = "md",
  className = "",
}: SimpleLoadingProps) {
  const sizePx = size === "sm" ? 28 : size === "lg" ? 56 : 40;

  const Spinner = (
    <div
      className="relative"
      style={{ width: sizePx, height: sizePx }}
      role="status"
      aria-label="Loading"
    >
      <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-800" />
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 dark:border-t-blue-400 animate-spin" />
    </div>
  );

  const Content = (
    <div
      className={`flex flex-col items-center text-center gap-3 ${className}`}
    >
      {Spinner}
      {message && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>
      )}
    </div>
  );

  if (!fullScreen) return Content;

  return (
    <div
      className={`min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4 ${className}`}
    >
      {Content}
    </div>
  );
}
