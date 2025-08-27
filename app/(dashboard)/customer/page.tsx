"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CustomerRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to documents page
    router.replace("/customer/documents");
  }, [router]);

  return null;
}