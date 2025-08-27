"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditorRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to documents page
    router.replace("/editor/documents");
  }, [router]);

  return null;
}
