"use client";

import AuthButton from "@/components/auth/auth-button";
import { CommandMenu } from "@/components/layout/search-command-menu";
import { VersionSelect } from "@/components/layout/version-selector";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/events";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { GitHubLogoIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { User } from "@supabase/supabase-js";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  ShieldCheck,
  StarIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

export function SiteHeader() {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [stars, setStars] = React.useState(1);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [userProfile, setUserProfile] = React.useState<any>(null);
  const [commandKey, setCommandKey] = React.useState("Ctrl");
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

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

  // Add an effect to get the current user and profile
  React.useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profile } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("user_id", user.id)
          .single();
        setUserProfile(profile);
      }
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          const { data: profile } = await supabase
            .from("user_profiles")
            .select("*")
            .eq("user_id", session.user.id)
            .single();
          setUserProfile(profile);
        } else {
          setUserProfile(null);
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Handle scroll effects
  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  React.useEffect(() => {
    setCommandKey(navigator.platform.includes("Mac") ? "⌘" : "Ctrl");
  }, []);

  // Render badge component with appropriate variant
  const renderBadge = (badge: { text: string; variant?: string }) => {
    return (
      <Badge
        key={badge.text}
        variant={(badge.variant as any) || "default"}
        className="ml-2 text-xs font-medium"
      >
        {badge.text}
      </Badge>
    );
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setShowMobileMenu(false);
    router.push("/");
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-100 w-full border-dashed border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        isScrolled ? "shadow-sm" : "shadow-none",
        "transition-all duration-200",
      )}
    >
      <div className="w-full justify-center container mx-auto flex h-14 items-center justify-between gap-2 px-2">
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
          <NavigationMenu className="hidden lg:flex">
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
                    <span className="text-xs">{commandKey}</span>K
                  </kbd>
                </div>
              </Button>
            </CommandMenu>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href={siteConfig.links.github}
            target="_blank"
            onClick={() => trackEvent({ name: "copy_usage_code" })}
            className="group hidden md:flex"
          >
            <Button variant="outline" className="cursor-pointer gap-2">
              <GitHubLogoIcon className="size-4" />
              <span className="hidden sm:inline-flex">Star</span>
              <div className="flex items-center gap-1">
                <StarIcon className="size-4 text-muted-foreground transition-colors group-hover:text-yellow-400" />
                <span className="text-xs font-medium tabular-nums transition-opacity">
                  {stars}
                </span>
              </div>
            </Button>
          </Link>

          <ModeToggle />

          <div className="hidden lg:flex">
            <AuthButton user={user} />
          </div>

          <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="max-sm:w-8 max-sm:h-8 lg:hidden"
              >
                {user ? (
                  <Avatar className="size-5">
                    <AvatarImage
                      src={user.user_metadata?.avatar_url}
                      alt={user.email || ""}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {user.email?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <Menu className="size-4 sm:size-5" />
                )}
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="p-2 w-full max-w-lg h-full z-100"
            >
              <SheetHeader>
                <SheetTitle hidden></SheetTitle>
                {user ? (
                  <div className="mb-6 space-y-4 border-b pb-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="size-12">
                        <AvatarImage
                          src={user.user_metadata?.avatar_url}
                          alt={user.email || ""}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary text-lg">
                          {user.email?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h2 className="text-lg font-semibold">
                          {user.user_metadata?.full_name || user.email}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {userProfile?.has_lifetime_access && (
                      <div className="flex items-center gap-2 rounded-md bg-accent/50 px-3 py-2">
                        <ShieldCheck className="size-4 text-primary" />
                        <span className="text-sm font-medium">
                          Lifetime Access
                        </span>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setShowMobileMenu(false);
                          router.push("/dashboard");
                        }}
                      >
                        Dashboard
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={handleSignOut}
                      >
                        Sign Out
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6 space-y-4 border-b pb-6">
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <StarIcon className="size-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-lg font-semibold">
                          Welcome to {siteConfig.name}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Sign in to access your templates
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="default"
                        className="flex-1"
                        onClick={() => {
                          setShowMobileMenu(false);
                          router.push("/auth/sign-in");
                        }}
                      >
                        Sign In
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setShowMobileMenu(false);
                          router.push("/auth/sign-up");
                        }}
                      >
                        Get Started
                      </Button>
                    </div>
                  </div>
                )}
              </SheetHeader>

              <ScrollArea className="p-2 h-[calc(100vh-15rem)]">
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
