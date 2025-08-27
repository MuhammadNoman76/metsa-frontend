export const dynamic = "force-dynamic";

export default function RoleSpecificLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // You can add role-specific layout components here if needed in the future
  return <>{children}</>;
}
