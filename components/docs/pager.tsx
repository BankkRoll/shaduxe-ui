import { NavItem, NavItemWithChildren } from "@/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Doc } from "content-collections";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";

interface DocsPagerProps {
  doc: Doc;
}

export function DocPager({ doc }: DocsPagerProps) {
  const pager = getPagerForDoc(doc);

  if (!pager?.prev && !pager?.next) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-between my-6 pt-6 border-t">
      {pager?.prev?.href ? (
        <Link
          href={pager.prev.href}
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          <ChevronLeftIcon className="mr-2 size-4" />
          {pager.prev.title}
        </Link>
      ) : (
        <div />
      )}

      {pager?.next?.href && (
        <Link
          href={pager.next.href}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "ml-auto",
          )}
        >
          {pager.next.title}
          <ChevronRightIcon className="ml-2 size-4" />
        </Link>
      )}
    </div>
  );
}

export function getPagerForDoc(doc: Doc) {
  // Flatten the navigation items
  const flattenedLinks = flatten(docsConfig.sidebarNav);

  // Find the active link based on the slug pattern
  // This handles both exact matches and deeper routing
  let activeIndex = -1;

  flattenedLinks.forEach((link, index) => {
    if (!link?.href) return;

    // Check for exact match first
    if (doc.slug === link.href) {
      activeIndex = index;
      return;
    }

    // Check if the current doc is nested under this link (for deeper routing)
    if (doc.slug.startsWith(link.href + "/")) {
      activeIndex = index;
    }
  });

  if (activeIndex === -1) {
    return { prev: null, next: null };
  }

  const prev = activeIndex > 0 ? flattenedLinks[activeIndex - 1] : null;
  const next =
    activeIndex < flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null;

  return { prev, next };
}

export function flatten(links: NavItemWithChildren[]): NavItem[] {
  return links
    .reduce<NavItem[]>((flat, link) => {
      // If it's a section with items, add the items after flattening
      if (link.items?.length) {
        return flat.concat(flatten(link.items));
      }

      // If it's a regular link, add it to the flat array
      if (link.href) {
        flat.push(link);
      }

      return flat;
    }, [])
    .filter((link) => !link?.disabled);
}
