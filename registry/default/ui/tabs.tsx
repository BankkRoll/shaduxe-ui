"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tabsVariants = cva("", {
  variants: {
    variant: {
      default: "",
      underline: "",
      pill: "",
      rounded: "",
      folder: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const tabsListVariants = cva(
  "inline-flex items-center justify-center text-muted-foreground",
  {
    variants: {
      variant: {
        default: "bg-muted p-1 rounded-md",
        underline:
          "space-x-6 bg-transparent space-x-4 p-0 border-b rounded-none",
        pill: "bg-transparent p-0 gap-0.5",
        rounded: "bg-muted p-2 rounded-full",
        folder: "space-x-1 border-b",
      },
    },
  },
);

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "rounded-sm data-[state=active]:bg-background data-[state=inactive]:hover:bg-primary/5 data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        underline:
          "rounded-none data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=inactive]:hover:text-foreground",
        pill: "data-[state=active]:bg-primary data-[state=inactive]:bg-muted data-[state=inactive]:hover:bg-primary/20 data-[state=active]:text-primary-foreground  first:rounded-l-full last:rounded-r-full data-[state=active]:shadow-sm",
        rounded:
          "rounded-full data-[state=active]:bg-primary data-[state=inactive]:hover:bg-primary/5 data-[state=active]:text-primary-foreground",
        folder:
          "h-9 px-3 rounded-t-lg -mb-[2px] transition-all duration-200 ease-in-out border border-transparent data-[state=inactive]:hover:bg-muted data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:border-border data-[state=active]:border-b-transparent hover:data-[state=active]:border-b-transparent",
      },
    },
  },
);

export interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>,
    VariantProps<typeof tabsVariants> {}

const TabsContext = React.createContext<VariantProps<typeof tabsVariants>>({
  variant: "default",
});

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ className, variant = "default", ...props }, ref) => (
  <TabsContext.Provider value={{ variant }}>
    <TabsPrimitive.Root
      ref={ref}
      className={cn(tabsVariants({ variant, className }))}
      {...props}
    />
  </TabsContext.Provider>
));
Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(TabsContext);
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(TabsContext);
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(tabsTriggerVariants({ variant }), className)}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
