"use client";

import { cn } from "@/lib/utils";
import { SidebarNavItem } from "@/types";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
} from "@radix-ui/react-icons";
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
    <div className="w-full">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.2 }}
          className="pb-6"
        >
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
        </motion.div>
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
        "grid grid-flow-row auto-rows-max gap-0.5 text-sm",
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

        return (
          <div key={index} className="w-full">
            {isAccordion ? (
              <div className="flex flex-col w-full">
                <button
                  onClick={() => toggleAccordion(item.title)}
                  className={cn(
                    "group flex w-full items-center justify-between rounded-md border border-transparent px-2 py-1.5 transition-colors",
                    item.disabled && "cursor-not-allowed opacity-60",
                    isExpanded
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
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
                  "group relative flex w-full items-center justify-between rounded-md border border-transparent px-2 py-1.5",
                  item.disabled && "cursor-not-allowed opacity-60",
                  pathname === item.href
                    ? "bg-accent font-medium text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
                )}
                target={item.external ? "_blank" : ""}
                rel={item.external ? "noreferrer" : ""}
              >
                {pathname === item.href && (
                  <motion.div
                    layoutId={`${groupId}-${level}-${index}`}
                    className="absolute inset-0 rounded-md bg-accent/50"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10 flex items-center">
                  <span className="truncate">{item.title}</span>
                  {renderBadges(item)}
                </span>

                <div className="flex items-center">
                  {hasNestedItems && (
                    <ChevronRightIcon
                      className={cn(
                        "relative z-10 ml-1 h-4 w-4 transition-transform",
                        expanded[item.title] && "rotate-90",
                      )}
                    />
                  )}
                  {item.external && (
                    <ExternalLinkIcon className="relative z-10 ml-1 size-3" />
                  )}
                </div>
              </Link>
            ) : (
              <span
                className={cn(
                  "flex w-full cursor-not-allowed items-center justify-between rounded-md p-2 text-muted-foreground opacity-60",
                )}
              >
                <span className="flex items-center">
                  <span>{item.title}</span>
                  {renderBadges(item)}
                </span>

                {hasNestedItems && <ChevronRightIcon className="h-4 w-4" />}
              </span>
            )}
            {/* Handle nested items for non-accordion link items that have child items */}
            {item.href && hasNestedItems && (
              <AnimatePresence initial={false}>
                {expanded[item.title] && (
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
              "relative z-10 ml-2 rounded-md px-1.5 py-0.5 text-xs font-medium leading-none text-[#000000] no-underline group-hover:no-underline",
              badge.variant === "premium"
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
      <>
        {Array.isArray(item.label) ? (
          item.label.map((label, i) => (
            <span
              key={i}
              className={cn(
                "relative z-10 ml-2 rounded-md px-1.5 py-0.5 text-xs font-medium leading-none text-[#000000] no-underline group-hover:no-underline",
                label === "PAID" ? "bg-green-500" : "bg-[#adfa1d]",
              )}
            >
              {label}
            </span>
          ))
        ) : (
          <span
            className={cn(
              "relative z-10 ml-2 rounded-md px-1.5 py-0.5 text-xs font-medium leading-none text-[#000000] no-underline group-hover:no-underline",
              item.label === "PAID" ? "bg-[#4ade80]" : "bg-[#adfa1d]",
            )}
          >
            {item.label}
          </span>
        )}
      </>
    );
  }

  return null;
}
