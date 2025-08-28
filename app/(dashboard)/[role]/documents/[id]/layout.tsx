// app/[role]/documents/[id]/edit/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Document",
  description: "Edit document details and settings",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

export default function DocumentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full max-w-full overflow-x-hidden">{children}</div>;
}
