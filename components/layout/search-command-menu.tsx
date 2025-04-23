"use client";

import { type DialogProps } from "@radix-ui/react-dialog";
import {
  ArrowRightIcon,
  ChevronRightIcon,
  CircleIcon,
  CodeIcon,
  Component1Icon,
  CubeIcon,
  DrawingPinIcon,
  ExclamationTriangleIcon,
  FileIcon,
  GearIcon,
  GridIcon,
  HomeIcon,
  MagicWandIcon,
  ReaderIcon,
  RocketIcon,
  StackIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DialogTitle } from "@/components/ui/dialog";
import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";

interface CommandItemType {
  id: string;
  icon: React.ReactNode;
  title: string;
  keywords?: string[];
  shortcut?: string;
  section: string;
  onSelect: () => void;
  variant?: "default" | "destructive" | "ghost" | "outline";
  badge?: {
    text: string;
    variant: string;
  }[];
  subItems?: CommandItemType[];
}

export function CommandMenu({ ...props }: DialogProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null,
  );
  const [selectedItem, setSelectedItem] =
    React.useState<CommandItemType | null>(null);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  // Reset selected category when dialog closes
  React.useEffect(() => {
    if (!open) {
      setSelectedCategory(null);
      setSelectedItem(null);
      setInputValue("");
    }
  }, [open]);

  // OS detection for keyboard shortcut display
  const isMac = React.useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.navigator.userAgent.includes("Mac");
  }, []);

  // Maps category titles to icons for visual distinction
  const getCategoryIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case "getting started":
        return <RocketIcon className="size-5" />;
      case "components":
        return <Component1Icon className="size-5" />;
      case "documentation":
        return <ReaderIcon className="size-5" />;
      case "settings":
        return <GearIcon className="size-5" />;
      case "templates":
        return <GridIcon className="size-5" />;
      case "hooks":
        return <CodeIcon className="size-5" />;
      case "blocks":
        return <StackIcon className="size-5" />;
      case "navigation":
        return <ArrowRightIcon className="size-5" />;
      default:
        return <FileIcon className="size-5" />;
    }
  };

  // Get icon for specific item
  const getItemIcon = (title: string, section: string) => {
    // Default icons based on type
    switch (section.toLowerCase()) {
      case "blocks":
        if (title.toLowerCase().includes("pricing")) {
          return <CubeIcon className="size-4" />;
        } else if (title.toLowerCase().includes("testimonial")) {
          return <StarIcon className="size-4" />;
        }
        return <StackIcon className="size-4" />;
      case "components":
        return <Component1Icon className="size-4" />;
      case "navigation":
        return <ArrowRightIcon className="size-4" />;
      case "getting started":
        return <RocketIcon className="size-4" />;
      case "templates":
        return <GridIcon className="size-4" />;
      default:
        return <CircleIcon className="size-4" />;
    }
  };

  const allCommands = React.useMemo(() => {
    // Navigation commands from main nav
    const navCommands: CommandItemType[] = docsConfig.mainNav
      .filter((navitem) => !navitem.external)
      .map((navItem) => ({
        id: navItem.href || navItem.title,
        icon: <HomeIcon className="size-4" />,
        title: navItem.title,
        section: "Navigation",
        keywords: ["nav", "main", "menu"],
        onSelect: () => runCommand(() => router.push(navItem.href as string)),
      }));

    // Commands for sidebar items, properly handling nested blocks
    const sidebarCommands: CommandItemType[] = docsConfig.sidebarNav.flatMap(
      (group) => {
        const groupIcon = getCategoryIcon(group.title);

        return (group.items || []).map((item) => {
          // Base item data
          const commandItem: CommandItemType = {
            id: item.href || item.title,
            icon: getItemIcon(item.title, group.title),
            title: item.title,
            section: group.title,
            keywords: [group.title.toLowerCase(), item.title.toLowerCase()],
            badge: item.badge,
            onSelect: item.href
              ? () => runCommand(() => router.push(item.href as string))
              : () => {},
          };

          // Handle accordion items with subitems (like in blocks)
          if (item.isAccordion && item.subItems && item.subItems.length > 0) {
            commandItem.subItems = item.subItems.map((subItem) => ({
              id: subItem.href || subItem.title,
              icon: getItemIcon(subItem.title, group.title),
              title: subItem.title,
              section: `${group.title} / ${item.title}`,
              keywords: [
                group.title.toLowerCase(),
                item.title.toLowerCase(),
                subItem.title.toLowerCase(),
              ],
              onSelect: () =>
                runCommand(() => router.push(subItem.href as string)),
            }));
          }

          return commandItem;
        });
      },
    );

    return [...navCommands, ...sidebarCommands];
  }, [runCommand, router]);

  // Extract all categories from commands
  const categories = React.useMemo(() => {
    const uniqueCategories = new Set<string>();
    allCommands.forEach((cmd) =>
      uniqueCategories.add(cmd.section.split(" / ")[0]),
    );
    return Array.from(uniqueCategories);
  }, [allCommands]);

  // Filter commands by input value
  const filteredCommands = React.useMemo(() => {
    // When a category is selected and no search input, only show that category
    if (selectedCategory && !inputValue) {
      return allCommands.filter((cmd) =>
        cmd.section.startsWith(selectedCategory),
      );
    }

    if (!inputValue) return allCommands;

    const lowerCaseInput = inputValue.toLowerCase();

    // Search in main commands
    const filteredMainCommands = allCommands.filter(
      (command) =>
        command.title.toLowerCase().includes(lowerCaseInput) ||
        command.section.toLowerCase().includes(lowerCaseInput) ||
        (command.keywords &&
          command.keywords.some((keyword: string) =>
            keyword.toLowerCase().includes(lowerCaseInput),
          )),
    );

    // Search in sub-items
    const commandsWithMatchingSubitems = allCommands
      .filter((command) => command.subItems)
      .map((command) => {
        const matchingSubItems = command.subItems?.filter(
          (subItem) =>
            subItem.title.toLowerCase().includes(lowerCaseInput) ||
            subItem.section.toLowerCase().includes(lowerCaseInput) ||
            (subItem.keywords &&
              subItem.keywords.some((keyword: string) =>
                keyword.toLowerCase().includes(lowerCaseInput),
              )),
        );

        if (matchingSubItems && matchingSubItems.length > 0) {
          return {
            ...command,
            subItems: matchingSubItems,
          };
        }
        return null;
      })
      .filter(Boolean) as CommandItemType[];

    return [...filteredMainCommands, ...commandsWithMatchingSubitems];
  }, [allCommands, inputValue, selectedCategory]);

  // Group commands by section
  const groupedCommands = React.useMemo(() => {
    return filteredCommands.reduce<Record<string, CommandItemType[]>>(
      (acc, command) => {
        const mainSection = command.section.split(" / ")[0];
        if (!acc[mainSection]) {
          acc[mainSection] = [];
        }
        acc[mainSection].push(command);
        return acc;
      },
      {},
    );
  }, [filteredCommands]);

  // When a category is selected, filter to show just those items
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedItem(null);
  };

  // When an item is selected, show it in the right panel
  const handleItemSelect = (item: CommandItemType) => {
    setSelectedItem(item);

    // If it has a direct href and no subitems, navigate immediately
    if (item.onSelect && (!item.subItems || item.subItems.length === 0)) {
      item.onSelect();
    }
  };

  // Handle selection from the right panel
  const handleSubItemSelect = (item: CommandItemType) => {
    if (item.onSelect) {
      item.onSelect();
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-9 w-full justify-start rounded-lg bg-background/80 text-sm font-normal text-muted-foreground shadow-none border border-border/50 hover:border-border hover:bg-accent/10 transition-all sm:pr-12 md:w-40 lg:w-64",
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search documentation...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">{isMac ? "⌘" : "Ctrl"}</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">Search documentation</DialogTitle>
        <div className="flex flex-col h-full sm:h-[60vh] sm:max-h-[60vh] bg-background/95 backdrop-blur-sm overflow-hidden">
          <div className="flex flex-col md:flex-row h-full">
            {/* Left panel */}
            <div className="w-full md:w-1/2 lg:w-2/5 border-r border-border/10">
              <CommandInput
                placeholder="Type to search..."
                value={inputValue}
                onValueChange={setInputValue}
                className="border-none focus-visible:ring-0 font-medium"
              />
              <CommandList className="min-h-[50vh] overflow-y-auto py-2">
                <CommandEmpty>
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <ExclamationTriangleIcon className="size-12 text-muted-foreground/30 mb-4" />
                    <p className="text-sm font-medium text-muted-foreground">
                      No results found
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      Try searching for components, pages, or blocks
                    </p>
                  </div>
                </CommandEmpty>

                {/* Command groups */}
                {Object.entries(groupedCommands).map(([section, commands]) => (
                  <CommandGroup
                    key={section}
                    heading={section}
                    className="px-2"
                  >
                    {commands.map((command) => (
                      <CommandItem
                        key={command.id}
                        value={command.title}
                        onSelect={() => handleItemSelect(command)}
                        className={cn(
                          "flex items-center py-3 px-2 rounded-lg cursor-pointer",
                          selectedItem?.id === command.id &&
                            "bg-accent text-accent-foreground",
                          command.subItems &&
                            command.subItems.length > 0 &&
                            "font-medium",
                        )}
                      >
                        <div className="mr-2 flex size-7 items-center justify-center rounded-md border border-border/20 bg-card/50">
                          {command.icon}
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex items-center">
                            <span className="flex-1 truncate">
                              {command.title}
                            </span>
                            {command.badge &&
                              command.badge.map((badge, i) => (
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
                                            : badge.variant === "coming-soon",
                                  )}
                                >
                                  {badge.text}
                                </span>
                              ))}
                          </div>
                          {command.subItems && command.subItems.length > 0 && (
                            <span className="text-xs text-muted-foreground mt-0.5">
                              {command.subItems.length} items
                            </span>
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </div>

            {/* Right panel */}
            <div className="w-full bg-muted/50 md:w-1/2 lg:w-3/5 hidden md:block">
              {selectedItem ? (
                <div className="p-6 h-full overflow-y-auto max-h-[85vh]">
                  <div className="flex items-center mb-6">
                    <div className="size-10 flex items-center justify-center rounded-lg border border-border/20 bg-card/50 mr-3">
                      {selectedItem.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium">
                          {selectedItem.title}
                        </h3>
                        {selectedItem.badge &&
                          selectedItem.badge.map((badge, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              size="sm"
                              className="ml-2"
                            >
                              {badge.text}
                            </Badge>
                          ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {selectedItem.section}
                      </p>
                    </div>
                  </div>

                  {selectedItem.subItems && selectedItem.subItems.length > 0 ? (
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium mb-2 text-foreground/80">
                        Available Options
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedItem.subItems.map((subItem) => (
                          <Button
                            key={subItem.id}
                            variant="outline"
                            className="justify-start h-auto py-3 px-3 border-border/30 hover:border-border hover:bg-accent/5"
                            onClick={() => handleSubItemSelect(subItem)}
                          >
                            <div className="flex items-center">
                              <div className="size-8 rounded-md flex items-center justify-center border border-border/20 mr-3 bg-card/50">
                                {subItem.icon}
                              </div>
                              <span>{subItem.title}</span>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                      <DrawingPinIcon className="size-10 text-muted-foreground/30 mb-4" />
                      <p className="text-sm text-muted-foreground mb-6">
                        Ready to navigate to this page
                      </p>
                      <Button
                        onClick={() => selectedItem.onSelect()}
                        className="mt-2"
                      >
                        <ArrowRightIcon className="mr-2 size-4" />
                        Go to {selectedItem.title}
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <div className="size-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                    <FileIcon className="size-7 text-muted-foreground/40" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Command Menu</h3>
                  <p className="text-sm text-muted-foreground max-w-md mb-8">
                    Select an item from the left panel to see details or search
                    for specific components, sections, and pages.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer with branding */}
          <div className="h-8 border-t border-border/10 flex items-center justify-between px-4 text-xs text-muted-foreground/70 bg-muted/20 backdrop-blur-sm">
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="Shaduxe UI"
                className="size-3.5 mr-1 dark:invert"
              />
              <span className="font-medium">shaduxe/ui</span>
            </div>
            <div className="flex items-center">
              <MagicWandIcon className="size-3 mr-1" />
              <span>Type to search...</span>
            </div>
          </div>
        </div>
      </CommandDialog>
    </>
  );
}
