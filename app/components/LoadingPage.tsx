"use client";

import React from "react";
import SimpleLoading from "./SimpleLoading";

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
  title,
  subtitle,
  className = "",
}: LoadingPageProps) {
  const message = subtitle || title || "Loading...";
  return <SimpleLoading message={message} fullScreen className={className} />;
}
