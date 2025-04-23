"use client";

import { ArrowUpIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";
import type { TableOfContents } from "@/lib/toc";
import { cn } from "@/lib/utils";

interface TocProps {
  toc: TableOfContents;
}

export function TableOfContents({ toc }: TocProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const mounted = useMounted();

  // Clean up TOC structure
  const refinedToc = useMemo(() => {
    if (!toc.items || toc.items.length === 0) {
      return toc;
    }

    // Handle special case for Steps component
    const [linksInSteps, ...rest] = toc.items;
    if (linksInSteps.items && linksInSteps.items.length > 0) {
      return {
        items: [...linksInSteps.items, ...rest],
      };
    }

    return toc;
  }, [toc]);

  // Extract all heading IDs for intersection observing
  const itemIds = useMemo(
    () =>
      refinedToc.items
        ? refinedToc.items
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split("#")[1])
        : [],
    [refinedToc],
  ) as string[];

  // Track active heading
  const activeHeading = useActiveItem(itemIds);

  // Scroll to top button logic
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!toc?.items || !mounted) {
    return null;
  }

  return (
    <div className="space-y-4 relative">
      <div className="sticky top-16">
        <p className="text-sm font-medium mb-4 text-muted-foreground uppercase tracking-wider">
          On This Page
        </p>

        <nav className="space-y-1">
          <Tree tree={refinedToc} activeItem={activeHeading} />
        </nav>

        {showScrollTop && (
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 absolute right-0 bottom-0 rounded-full"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <ArrowUpIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

function useActiveItem(itemIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `0% 0% -80% 0%` },
    );

    itemIds?.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      itemIds?.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [itemIds]);

  return activeId;
}

interface TreeProps {
  tree: TableOfContents;
  level?: number;
  activeItem?: string | null;
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  return tree?.items?.length && level < 3 ? (
    <ul className="m-0 list-none space-y-2">
      {tree.items.map((item, index) => {
        const isActive = item.url === `#${activeItem}`;

        return (
          <li key={index} className="mt-0">
            <a
              href={item.url}
              className={cn(
                "text-sm flex items-center border-l-2 pl-3 py-1 hover:border-primary transition-colors",
                isActive
                  ? "border-primary text-primary font-medium"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {item.title}
            </a>

            {item.items?.length ? (
              <ul className="mt-2 ml-4 space-y-2 list-none">
                {item.items.map((subItem, subIndex) => {
                  const isSubActive = subItem.url === `#${activeItem}`;

                  return (
                    <li key={subIndex} className="mt-0">
                      <a
                        href={subItem.url}
                        className={cn(
                          "text-xs flex items-center border-l-2 pl-3 py-1 hover:border-primary/70 transition-colors",
                          isSubActive
                            ? "border-primary/70 text-primary/90 font-medium"
                            : "border-border text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {subItem.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </li>
        );
      })}
    </ul>
  ) : null;
}
