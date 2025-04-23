import { DocsSidebarNav } from "@/components/layout/sidebar-nav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { docsConfig } from "@/config/docs";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="container mx-auto flex-1 items-start lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-4">
      <aside className="fixed border-r border-dashed top-16 z-30 -ml-2 hidden h-[100vh] w-full shrink-0 lg:sticky lg:block">
        <ScrollArea className="h-[calc(100vh-1rem)] pr-2">
          <DocsSidebarNav items={docsConfig.sidebarNav} />
        </ScrollArea>
      </aside>
      {children}
    </div>
  );
}
