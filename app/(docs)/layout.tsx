import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default async function DocsLayout({
  children,
}: DocsLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
