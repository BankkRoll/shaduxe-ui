"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center border-2 border-transparent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
  {
    variants: {
      variant: {
        default: "rounded-full shadow-sm",
        box: "rounded-md shadow-sm",
        square: "rounded-none shadow-sm",
        retro: "rounded border-2 border-border bg-background shadow-inner",
      },
      size: {
        sm: "h-4 w-7",
        default: "h-5 w-9",
        lg: "h-6 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const switchThumbVariants = cva(
  "pointer-events-none block bg-background transition-all",
  {
    variants: {
      variant: {
        default: "rounded-full shadow",
        box: "rounded-sm shadow",
        square: "rounded-none shadow",
        retro: "rounded shadow-sm border border-border",
      },
      size: {
        sm: "h-3 w-3 data-[state=checked]:translate-x-3",
        default: "h-4 w-4 data-[state=checked]:translate-x-4",
        lg: "h-5 w-5 data-[state=checked]:translate-x-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {
  thumbVariant?: VariantProps<typeof switchThumbVariants>["variant"];
  showLabels?: boolean;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, variant, size, thumbVariant, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(switchVariants({ variant, size, className }))}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        switchThumbVariants({
          variant: thumbVariant || variant,
          size,
        }),
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
