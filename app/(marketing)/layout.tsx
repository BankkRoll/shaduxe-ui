import type React from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 container mx-auto relative">
        <div className="absolute top-0 -left-4 md:-left-16 h-full w-4 md:w-16 text-primary/10 dark:text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)]"></div>
        <div className="absolute top-0 -right-4 md:-right-16 h-full w-4 md:w-16 text-primary/10  dark:text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)]"></div>

        <div className="block w-px h-full border-l border-border border-dashed absolute top-0 -left-4 md:-left-16 z-10"></div>
        <div className="block w-px h-full border-r border-border border-dashed absolute top-0 -right-4 md:-right-16 z-10"></div>

        {children}
      </main>
      <SiteFooter />
    </>
  );
}
