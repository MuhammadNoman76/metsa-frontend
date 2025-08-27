export const dynamicParams = true;

export async function generateStaticParams() {
  return [{ role: "admin" }, { role: "editor" }, { role: "customer" }];
}

export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
