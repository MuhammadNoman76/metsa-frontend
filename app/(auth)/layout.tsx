export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="absolute left-0 right-0 -top-2 h-1 bg-gradient-to-r from-gray-200 via-[#1A8B47] to-gray-200 dark:from-gray-800 dark:via-[#1A8B47] dark:to-gray-800" />
        {children}
      </div>
    </div>
  );
}

//
