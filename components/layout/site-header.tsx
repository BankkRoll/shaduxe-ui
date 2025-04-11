"use client";

import { CommandMenu } from "@/components/command-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VersionSelect } from "@/components/version-selector";
import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/events";
import { cn } from "@/lib/utils";
import { GitHubLogoIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { ChevronDown, ChevronRight, Menu, StarIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

export function SiteHeader() {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [stars, setStars] = React.useState(1);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();

  // Store open state for accordions
  const [openAccordions, setOpenAccordions] = React.useState<
    Record<string, boolean>
  >({});

  // Toggle accordion state
  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Initialize default open accordions
  React.useEffect(() => {
    const defaultOpenItems: Record<string, boolean> = {};

    docsConfig.sidebarNav.forEach((section, sectionIndex) => {
      if (section.items) {
        section.items.forEach((item, itemIndex) => {
          if (item.isAccordion && item.defaultOpen) {
            const id = `${sectionIndex}-${itemIndex}`;
            defaultOpenItems[id] = true;
          }
        });
      }
    });

    setOpenAccordions(defaultOpenItems);
  }, []);

  // Fetch GitHub stars
  React.useEffect(() => {
    async function fetchStars() {
      try {
        const response = await fetch(
          siteConfig.links.github.replace(
            "https://github.com/",
            "https://api.github.com/repos/",
          ),
          {
            headers: process.env.GITHUB_OAUTH_TOKEN
              ? {
                  Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
                  "Content-Type": "application/json",
                }
              : {},
            next: { revalidate: 3600 },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setStars(data.stargazers_count);
        }
      } catch (error) {
        console.error("Error fetching GitHub stars:", error);
      }
    }
    fetchStars();
  }, []);

  // Handle scroll effects
  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Render badge component with appropriate variant
  const renderBadge = (badge: { text: string; variant?: string }) => {
    return (
      <Badge
        variant={(badge.variant as any) || "default"}
        className="ml-2 text-xs font-medium"
      >
        {badge.text}
      </Badge>
    );
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-100 w-full border-dashed border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        isScrolled ? "shadow-sm" : "shadow-none",
        "transition-all duration-200",
      )}
    >
      <div className="container w-full justify-center mx-auto flex h-14 items-center justify-between gap-2 px-2 sm:gap-4 sm:px-4">
        {/* Left Section - Logo + Nav */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/">
            <div className="flex items-center gap-1 sm:gap-2">
              <img
                src="/logo.png"
                alt={siteConfig.name}
                className="size-5 sm:size-6 dark:invert"
              />
              <span className="hidden font-bold sm:inline-block">
                {siteConfig.name}
              </span>
            </div>
          </Link>

          <VersionSelect />
          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex items-center gap-1">
              {docsConfig.mainNav.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link
                    href={item.href!}
                    className={cn(
                      "group inline-flex h-8 w-max items-center justify-center rounded-md px-3 py-1 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                      pathname?.startsWith(item.href!)
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground",
                      "relative overflow-hidden",
                    )}
                    onClick={() => trackEvent({ name: "copy_usage_code" })}
                  >
                    <span className="relative z-10">{item.title}</span>
                    {item.label && (
                      <span className="ml-1 rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
                        {item.label}
                      </span>
                    )}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Center - Command Menu */}
        <div className="flex flex-1 items-center justify-center px-1 sm:px-4">
          <div className="w-full max-w-[min(calc(100vw-8rem),32rem)]">
            <CommandMenu>
              <Button
                variant="outline"
                className={cn(
                  "relative h-8 w-full justify-start rounded-md border-muted-foreground/20 bg-background text-sm font-normal text-muted-foreground shadow-none sm:h-9",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus-visible:ring-1 focus-visible:ring-ring",
                  "transition-all duration-200",
                )}
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <MagnifyingGlassIcon className="size-3.5 shrink-0 opacity-50 sm:size-4" />
                    <span className="hidden sm:inline-flex">
                      Search documentation...
                    </span>
                    <span className="inline-flex sm:hidden">Search...</span>
                  </div>
                  <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">
                      {navigator.platform.includes("Mac") ? "⌘" : "Ctrl"}
                    </span>
                    K
                  </kbd>
                </div>
              </Button>
            </CommandMenu>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href={siteConfig.links.github}
            target="_blank"
            className={cn(
              "group hidden items-center gap-2 md:flex",
              "relative h-8 rounded-md bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 border border-input sm:h-9 sm:px-4",
            )}
            onClick={() => trackEvent({ name: "copy_usage_code" })}
          >
            <GitHubLogoIcon className="size-4" />
            <span className="hidden sm:inline-flex">Star</span>
            <div className="flex items-center gap-1">
              <StarIcon className="size-4 text-muted-foreground transition-colors group-hover:text-yellow-400" />
              <span className="text-xs font-medium tabular-nums transition-opacity">
                {stars}
              </span>
            </div>
          </Link>

          <ModeToggle />

          {/* Mobile Menu */}
          <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="max-sm:w-8 max-sm:h-8 md:hidden"
                onClick={() => trackEvent({ name: "copy_usage_code" })}
              >
                <Menu className="size-4 sm:size-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-[400px] sm:w-[380px]"
            >
              <SheetHeader className="space-y-4 pb-3">
                <SheetTitle className="flex items-center gap-2">
                  <img
                    src="/logo.png"
                    alt={siteConfig.name}
                    className="size-6 dark:invert"
                  />
                  <span>{siteConfig.name}</span>
                </SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-6rem)] pr-4">
                <div className="space-y-5 pb-6">
                  {docsConfig.sidebarNav.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="space-y-3">
                      <h4 className="font-medium text-sm text-foreground/80 tracking-tight">
                        {section.title}
                      </h4>
                      <div className="grid grid-flow-row auto-rows-max gap-1.5 text-sm">
                        {section.items?.map((item, itemIndex) => {
                          const accordionId = `${sectionIndex}-${itemIndex}`;
                          const isOpen = openAccordions[accordionId] || false;

                          // Handle accordion item with subItems
                          if (item.isAccordion && item.subItems) {
                            return (
                              <Collapsible
                                key={itemIndex}
                                open={isOpen}
                                onOpenChange={() =>
                                  toggleAccordion(accordionId)
                                }
                                className="w-full"
                              >
                                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-2 py-2 hover:bg-accent hover:text-accent-foreground text-muted-foreground data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground transition-colors">
                                  <div className="flex items-center">
                                    {item.title}
                                    {item.badge && Array.isArray(item.badge)
                                      ? item.badge.map((b, i) => renderBadge(b))
                                      : item.badge && renderBadge(item.badge)}
                                    {item.label && (
                                      <span className="ml-2 rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
                                        {item.label}
                                      </span>
                                    )}
                                  </div>
                                  <ChevronDown
                                    className={cn(
                                      "h-4 w-4 transition-transform duration-200",
                                      isOpen ? "transform rotate-180" : "",
                                    )}
                                  />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="px-2 pb-1 pt-1">
                                  <div className="grid grid-flow-row auto-rows-max gap-1.5 text-sm">
                                    {item.subItems.map((subItem, subIndex) => (
                                      <Link
                                        key={subIndex}
                                        href={subItem.href ?? "#"}
                                        className={cn(
                                          "flex w-full items-center rounded-md px-2 py-1.5 pl-6 hover:underline",
                                          subItem.disabled &&
                                            "cursor-not-allowed opacity-60",
                                          pathname === subItem.href
                                            ? "bg-accent text-accent-foreground"
                                            : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
                                          "transition-colors",
                                        )}
                                        onClick={() => {
                                          setShowMobileMenu(false);
                                        }}
                                      >
                                        <div className="flex items-center">
                                          {subItem.title}
                                          {subItem.badge &&
                                          Array.isArray(subItem.badge)
                                            ? subItem.badge.map((b, i) =>
                                                renderBadge(b),
                                              )
                                            : subItem.badge &&
                                              renderBadge(subItem.badge)}
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                </CollapsibleContent>
                              </Collapsible>
                            );
                          }

                          // Regular item with potential items array
                          return (
                            <div key={itemIndex} className="space-y-1">
                              <Link
                                href={item.href ?? "#"}
                                className={cn(
                                  "flex w-full items-center rounded-md px-2 py-2 hover:underline",
                                  item.disabled &&
                                    "cursor-not-allowed opacity-60",
                                  pathname === item.href
                                    ? "bg-accent text-accent-foreground"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                                  "transition-colors",
                                )}
                                onClick={() => {
                                  setShowMobileMenu(false);
                                }}
                              >
                                <div className="flex-1 flex items-center">
                                  {item.title}
                                  {item.badge && Array.isArray(item.badge)
                                    ? item.badge.map((b, i) => renderBadge(b))
                                    : item.badge && renderBadge(item.badge)}
                                </div>
                                {item.items && item.items.length > 0 && (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </Link>
                              {/* Handle traditional nested items */}
                              {item.items && item.items.length > 0 && (
                                <div key={itemIndex} className="pl-4 space-y-1">
                                  {item.items.map((subItem, subIndex) => (
                                    <Link
                                      key={subIndex}
                                      href={subItem.href ?? "#"}
                                      className={cn(
                                        "flex w-full items-center rounded-md px-2 py-1.5 hover:underline",
                                        subItem.disabled &&
                                          "cursor-not-allowed opacity-60",
                                        pathname === subItem.href
                                          ? "bg-accent text-accent-foreground"
                                          : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
                                        "transition-colors",
                                      )}
                                      onClick={() => {
                                        setShowMobileMenu(false);
                                      }}
                                    >
                                      {subItem.title}
                                      {subItem.badge &&
                                      Array.isArray(subItem.badge)
                                        ? subItem.badge.map((b, i) =>
                                            renderBadge(b),
                                          )
                                        : subItem.badge &&
                                          renderBadge(subItem.badge)}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
