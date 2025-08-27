export const dynamicParams = false;

export async function generateStaticParams() {
  return [
    { role: 'admin' },
    { role: 'editor' },
    { role: 'customer' },
  ];
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

