"use client";

import React from "react";
import Spinner from "./Spinner";

type LoadingPageVariant = "root" | "auth" | "dashboard";

type LoadingPageProps = {
  variant?: LoadingPageVariant;
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  showProgressDots?: boolean;
  showProgressItems?: boolean;
  progressItems?: string[];
  className?: string;
};

export default function LoadingPage({
  variant = "root",
  title,
  subtitle,
  showLogo = true,
  showProgressDots = true,
  showProgressItems = false,
  progressItems = ["Data", "Charts", "Insights"],
  className = ""
}: LoadingPageProps) {
  // Default content based on variant
  const getDefaultContent = () => {
    switch (variant) {
      case "auth":
        return {
          title: "Loading...",
          subtitle: "Please wait while we set up your workspace",
          spinnerSize: 64
        };
      case "dashboard":
        return {
          title: "Loading Dashboard",
          subtitle: "Setting up your analytics workspace",
          spinnerSize: 96
        };
      default: // root
        return {
          title: "Loading METSA Portal",
          subtitle: "Please wait while we prepare your workspace",
          spinnerSize: 80
        };
    }
  };

  const defaultContent = getDefaultContent();
  const finalTitle = title || defaultContent.title;
  const finalSubtitle = subtitle || defaultContent.subtitle;

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4 ${className}`}>
      <div className={`text-center ${variant === "dashboard" ? "max-w-md w-full" : ""}`}>
        {/* Logo */}
        {showLogo && (
          <div className="mb-8">
            <div className={`inline-block bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-2xl font-bold shadow-xl ${
              variant === "auth" ? "px-6 py-2 text-xl" : "px-8 py-3 text-2xl"
            }`}>
              METSA
            </div>
          </div>
        )}

        {/* Spinner */}
        <div className="mb-6 flex justify-center">
          <Spinner 
            size={defaultContent.spinnerSize} 
            variant="brand" 
            color="primary" 
          />
        </div>

        {/* Loading Text */}
        <h2 className={`font-bold text-gray-900 dark:text-white mb-2 ${
          variant === "dashboard" ? "text-2xl" : "text-xl"
        }`}>
          {finalTitle}
        </h2>
        <p className={`text-gray-600 dark:text-gray-400 ${
          variant === "dashboard" ? "mb-6" : variant === "auth" ? "text-sm" : "mb-4"
        }`}>
          {finalSubtitle}
        </p>

        {/* Progress Items (Dashboard only) */}
        {showProgressItems && variant === "dashboard" && (
          <div className="flex items-center justify-center space-x-2 mb-4">
            {progressItems.map((item, index) => (
              <div key={item} className="flex items-center space-x-2">
                <div 
                  className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"
                  style={{ animationDelay: `${index * 0.2}s` }}
                ></div>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Progress Dots */}
        {showProgressDots && (
          <div className={`flex items-center justify-center space-x-2 ${
            variant === "auth" ? "mt-4" : ""
          }`}>
            {Array.from({ length: variant === "root" ? 4 : 3 }).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        )}

        {/* Mini Dashboard Preview (Dashboard only) */}
        {variant === "dashboard" && (
          <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto mt-4">
            {[0, 1, 2].map((i) => (
              <div 
                key={i}
                className="h-8 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse border border-gray-200 dark:border-gray-700"
                style={{ animationDelay: `${i * 0.3}s` }}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
