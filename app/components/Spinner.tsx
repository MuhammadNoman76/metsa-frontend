"use client";

import React from "react";

type SpinnerVariant = "default" | "dots" | "pulse" | "ring" | "gradient" | "minimal" | "brand";

type SpinnerProps = {
  size?: number;
  className?: string;
  variant?: SpinnerVariant;
  color?: "primary" | "secondary" | "success" | "warning" | "error" | "white";
};

export default function Spinner({ 
  size = 20, 
  className = "", 
  variant = "default",
  color = "primary" 
}: SpinnerProps) {
  const style: React.CSSProperties = { width: size, height: size };

  const colorClasses = {
    primary: "border-blue-600 dark:border-blue-400",
    secondary: "border-gray-600 dark:border-gray-400", 
    success: "border-emerald-600 dark:border-emerald-400",
    warning: "border-amber-600 dark:border-amber-400",
    error: "border-red-600 dark:border-red-400",
    white: "border-white"
  };

  const gradientColors = {
    primary: "from-blue-600 to-purple-600",
    secondary: "from-gray-600 to-gray-800",
    success: "from-emerald-600 to-green-600", 
    warning: "from-amber-600 to-orange-600",
    error: "from-red-600 to-pink-600",
    white: "from-white to-gray-100"
  };

  if (variant === "dots") {
    return (
      <div 
        className={`flex items-center justify-center space-x-1 ${className}`}
        style={{ width: size * 2, height: size }}
        role="status"
        aria-label="Loading"
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`rounded-full bg-current animate-bounce ${colorClasses[color].split(' ')[0].replace('border-', 'text-')}`}
            style={{ 
              width: size / 4, 
              height: size / 4,
              animationDelay: `${i * 0.15}s`,
              animationDuration: '0.6s'
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div
        className={`rounded-full animate-pulse ${colorClasses[color].split(' ')[0].replace('border-', 'bg-')} opacity-75 ${className}`}
        style={style}
        role="status"
        aria-label="Loading"
      />
    );
  }

  if (variant === "ring") {
    return (
      <div className={`relative ${className}`} style={style} role="status" aria-label="Loading">
        <div className="absolute inset-0 rounded-full border-2 border-gray-200 dark:border-gray-700"></div>
        <div className={`absolute inset-0 rounded-full border-2 border-transparent ${colorClasses[color].split(' ')[0]} border-t-current animate-spin`}></div>
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <div className={`relative ${className}`} style={style} role="status" aria-label="Loading">
        <div className="absolute inset-0 rounded-full border-2 border-gray-200 dark:border-gray-800"></div>
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${gradientColors[color]} animate-spin`} style={{
          maskImage: `conic-gradient(from 0deg, transparent 270deg, black 360deg)`,
          WebkitMaskImage: `conic-gradient(from 0deg, transparent 270deg, black 360deg)`
        }}></div>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div
        className={`animate-spin rounded-full border border-current opacity-25 border-r-transparent ${colorClasses[color].split(' ')[0].replace('border-', 'text-')} ${className}`}
        style={style}
        role="status"
        aria-label="Loading"
      />
    );
  }

  if (variant === "brand") {
    return (
      <div className={`relative ${className}`} style={style} role="status" aria-label="Loading">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-800"></div>

        {/* Main spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-600 border-r-blue-600 animate-spin"></div>

        {/* Inner ring */}
        <div className="absolute inset-3 rounded-full border-2 border-gray-100 dark:border-gray-700"></div>

        {/* Counter-rotating inner ring */}
        <div
          className="absolute inset-3 rounded-full border-2 border-transparent border-b-blue-500 border-l-emerald-500 animate-spin"
          style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
        ></div>
      </div>
    );
  }

  // Default variant - modern ring spinner
  return (
    <div className={`relative ${className}`} style={style} role="status" aria-label="Loading">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border-2 border-gray-200 dark:border-gray-700"></div>
      
      {/* Spinning ring */}
      <div className={`absolute inset-0 rounded-full border-2 border-transparent ${colorClasses[color]} border-t-current border-r-current animate-spin`}></div>
      
      {/* Inner dot */}
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full ${colorClasses[color].split(' ')[0].replace('border-', 'bg-')} animate-pulse`} 
           style={{ width: size / 8, height: size / 8 }}></div>
    </div>
  );
}
