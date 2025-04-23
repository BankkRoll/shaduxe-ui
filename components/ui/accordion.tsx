"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cva, VariantProps } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const accordionVariants = cva(
  "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
  {
    variants: {
      variant: {
        default: "hover:underline",
        outline: "border border-input p-3 hover:bg-accent",
        ghost: "hover:bg-accent p-3",
        underline: "border-b border-input pb-3 hover:border-primary",
        card: "bg-card p-3 shadow-sm hover:shadow",
      },
      iconPosition: {
        right: "flex-row",
        left: "flex-row-reverse",
      },
    },
    defaultVariants: {
      variant: "default",
      iconPosition: "right",
    },
  },
);

type AccordionTriggerProps = React.ComponentProps<
  typeof AccordionPrimitive.Trigger
> &
  React.PropsWithChildren<{
    icon?: React.ReactNode;
  }> &
  VariantProps<typeof accordionVariants>;

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  variant,
  iconPosition,
  icon,
  ...props
}: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          accordionVariants({ variant, iconPosition }),
          className,
        )}
        {...props}
      >
        {children}
        {icon || (
          <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

const accordionContentVariants = cva("overflow-hidden text-sm", {
  variants: {
    variant: {
      default: "",
      outline: "px-3",
      ghost: "px-3",
      underline: "",
      card: "px-3",
    },
    animation: {
      default:
        "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      fade: "data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in",
      none: "",
    },
  },
  defaultVariants: {
    variant: "default",
    animation: "default",
  },
});

type AccordionContentProps = React.ComponentProps<
  typeof AccordionPrimitive.Content
> &
  VariantProps<typeof accordionContentVariants>;

function AccordionContent({
  className,
  children,
  variant,
  animation,
  ...props
}: AccordionContentProps) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        accordionContentVariants({ variant, animation }),
        className,
      )}
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export {
  Accordion,
  AccordionContent,
  accordionContentVariants,
  AccordionItem,
  AccordionTrigger,
  accordionVariants,
};
