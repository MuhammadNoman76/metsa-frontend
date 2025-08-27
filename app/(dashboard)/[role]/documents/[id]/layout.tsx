// Change this from 'false' to 'true' to allow dynamic rendering of document pages
export const dynamicParams = true;

export async function generateStaticParams() {
  // This function can now be removed or left as is, since dynamicParams = true
  // will handle any ID not generated here.
  return [];
}

export default function DocumentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
