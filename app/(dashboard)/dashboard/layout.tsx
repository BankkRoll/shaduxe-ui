import type React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <>
      <main className="container mx-auto flex-1 relative overflow-x-hidden min-h-screen">
        {children}
      </main>
    </>
  );
}
