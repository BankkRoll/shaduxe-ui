import type React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <main className="container mx-auto flex-1 relative relative w-full overflow-x-hidden min-h-screen">
        <div className="container border-x border-dashed mx-auto relative min-h-screen">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.1] pointer-events-none overflow-hidden">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-foreground to-transparent absolute top-1/4"></div>
            <div className="w-full h-px bg-gradient-to-r from-foreground via-transparent to-foreground absolute top-2/4"></div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-foreground to-transparent absolute top-3/4"></div>
            <div className="h-full w-px bg-gradient-to-b from-transparent via-foreground to-transparent absolute left-1/4"></div>
            <div className="h-full w-px bg-gradient-to-b from-foreground via-transparent to-foreground absolute left-2/4"></div>
            <div className="h-full w-px bg-gradient-to-b from-transparent via-foreground to-transparent absolute left-3/4"></div>
          </div>

          {children}
        </div>
      </main>
    </>
  );
}
