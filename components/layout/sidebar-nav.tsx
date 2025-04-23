"use client";

import { cn } from "@/lib/utils";
import { SidebarNavItem } from "@/types";
import { ChevronDownIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { useEffect, useState } from "react";

export interface DocsSidebarNavProps {
  items: SidebarNavItem[];
}

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const pathname = usePathname();

  return items.length ? (
    <div className="w-full pb-20">
      {items.map((item, index) => (
        <div key={index} className="pb-4">
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
            {item.title}
          </h4>
          {item?.items && (
            <DocsSidebarNavItems
              items={item.items}
              pathname={pathname}
              groupId={`group-${index}`}
            />
          )}
        </div>
      ))}
    </div>
  ) : null;
}

interface DocsSidebarNavItemsProps {
  items: SidebarNavItem[];
  pathname: string | null;
  groupId: string;
  level?: number;
}

export function DocsSidebarNavItems({
  items,
  pathname,
  groupId,
  level = 0,
}: DocsSidebarNavItemsProps) {
  // Track expanded accordion items
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Set initial expanded state based on active path
  useEffect(() => {
    const initialExpanded: Record<string, boolean> = {};

    const checkItems = (
      itemsToCheck: SidebarNavItem[],
      path: string | null,
    ) => {
      for (const item of itemsToCheck) {
        // Auto-expand if an item is active or has defaultOpen set
        if (
          (path &&
            (item.href === path ||
              item.items?.some((i) => i.href === path) ||
              item.subItems?.some((i) => i.href === path))) ||
          item.defaultOpen
        ) {
          initialExpanded[item.title] = true;
        }

        // Check nested items
        if (item.items) checkItems(item.items, path);
        if (item.subItems) checkItems(item.subItems, path);
      }
    };

    checkItems(items, pathname);
    setExpanded(initialExpanded);
  }, [items, pathname]);

  const toggleAccordion = (title: string) => {
    setExpanded((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return items?.length ? (
    <div
      className={cn(
        "relative grid grid-flow-row auto-rows-max gap-0.5 text-sm",
        level > 0 && "ml-4 mt-1",
      )}
    >
      {items.map((item, index) => {
        const isExpanded = expanded[item.title] || false;
        const hasNestedItems = !!(
          (item.items && item.items.length > 0) ||
          (item.subItems && item.subItems.length > 0)
        );
        const isAccordion = item.isAccordion || (hasNestedItems && !item.href);
        const isActive = pathname === item.href;

        return (
          <div key={index} className="w-full">
            {isAccordion ? (
              <div className="flex flex-col w-full">
                <button
                  onClick={() => toggleAccordion(item.title)}
                  className={cn(
                    "group flex w-full items-center justify-between rounded-md border border-transparent px-2 py-1",
                    item.disabled && "cursor-not-allowed opacity-60",
                    isExpanded
                      ? "font-medium text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  <span className="flex w-full justify-between items-center">
                    <span className="truncate">{item.title}</span>
                    {renderBadges(item)}
                  </span>
                  <ChevronDownIcon
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      isExpanded ? "rotate-180" : "",
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isExpanded && hasNestedItems && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-1.5">
                        {item.items && item.items.length > 0 && (
                          <DocsSidebarNavItems
                            items={item.items}
                            pathname={pathname}
                            groupId={`${groupId}-${index}`}
                            level={level + 1}
                          />
                        )}
                        {item.subItems && item.subItems.length > 0 && (
                          <DocsSidebarNavItems
                            items={item.subItems}
                            pathname={pathname}
                            groupId={`${groupId}-sub-${index}`}
                            level={level + 1}
                          />
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : item.href && !item.disabled ? (
              <Link
                href={item.href}
                onClick={() => item.event && posthog.capture(item.event)}
                className={cn(
                  "group relative flex w-full items-center rounded-md border border-transparent px-2 py-1",
                  item.disabled && "cursor-not-allowed opacity-60",
                  isActive
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:border-l-2 hover:border-l-accent hover:bg-primary/5 ",
                )}
                target={item.external ? "_blank" : ""}
                rel={item.external ? "noreferrer" : ""}
              >
                {isActive && (
                  <motion.div
                    layoutId={groupId}
                    className="absolute inset-0 rounded-md border-l-2 border-accent bg-primary/10 px-2 py-2"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                      mass: 1,
                      velocity: 200,
                    }}
                  />
                )}
                <span className="relative z-10 shrink-0">{item.title}</span>
                {renderBadges(item)}
                {item.external && (
                  <ExternalLinkIcon className="relative z-10 ml-2 size-4" />
                )}
                {hasNestedItems && (
                  <ChevronDownIcon
                    className={cn(
                      "relative z-10 ml-auto h-4 w-4 transition-transform",
                      isExpanded ? "rotate-180" : "",
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleAccordion(item.title);
                    }}
                  />
                )}
              </Link>
            ) : (
              <span
                className={cn(
                  "flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground",
                  item.disabled && "cursor-not-allowed opacity-60",
                )}
              >
                {item.title}
                {renderBadges(item)}
              </span>
            )}
            {/* Handle nested items for non-accordion link items that have child items */}
            {item.href && hasNestedItems && (
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-1.5">
                      {item.items && item.items.length > 0 && (
                        <DocsSidebarNavItems
                          items={item.items}
                          pathname={pathname}
                          groupId={`${groupId}-${index}`}
                          level={level + 1}
                        />
                      )}
                      {item.subItems && item.subItems.length > 0 && (
                        <DocsSidebarNavItems
                          items={item.subItems}
                          pathname={pathname}
                          groupId={`${groupId}-sub-${index}`}
                          level={level + 1}
                        />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        );
      })}
    </div>
  ) : null;
}

// Helper function to render badges/labels
function renderBadges(item: SidebarNavItem) {
  if (item.badge) {
    return (
      <>
        {item.badge.map((badge, i) => (
          <span
            key={i}
            className={cn(
              "relative z-10 ml-2 rounded-md px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline",
              badge.variant === "pro"
                ? "bg-green-500"
                : badge.variant === "new"
                  ? "bg-[#adfa1d]"
                  : badge.variant === "beta"
                    ? "bg-blue-400"
                    : badge.variant === "popular"
                      ? "bg-amber-400"
                      : badge.variant === "coming-soon"
                        ? "bg-[#adfa1d]"
                        : badge.color || "bg-muted",
            )}
          >
            {badge.text}
          </span>
        ))}
      </>
    );
  }

  if (item.label) {
    return (
      <span className="relative z-10 ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
        {item.label}
      </span>
    );
  }

  return null;
}
