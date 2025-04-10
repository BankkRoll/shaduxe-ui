import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default async function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 container mx-auto">{children}</main>
      <SiteFooter />
    </>
  );
}
