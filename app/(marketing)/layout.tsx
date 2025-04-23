import type React from "react";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <>
      <main className="mx-auto max-w-7xl flex-1 relative overflow-x-hidden min-h-screen">
        {children}
      </main>
    </>
  );
}
