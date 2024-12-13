"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-md text-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-input bg-background shadow-sm focus-visible:ring-1 focus-visible:ring-ring",
        underline:
          "border-b border-input bg-transparent px-0 focus-visible:border-primary rounded-none focus-visible:ring-0 focus-visible:outline-none transition-colors duration-200",
        pill: "rounded-full border border-input bg-background px-6 focus-visible:ring-1 focus-visible:ring-ring",
      },
      inputSize: {
        xs: "h-7 px-2 text-xs",
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 py-2",
        lg: "h-12 px-6 text-lg",
        xl: "h-14 px-8 text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
    },
  },
);

interface IconProps {
  Icon: React.ElementType;
  iconPlacement: "left" | "right";
}

interface IconlessProps {
  Icon?: never;
  iconPlacement?: undefined;
}

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  asChild?: boolean;
}

export type InputIconProps = IconProps | IconlessProps;

const Input = React.forwardRef<HTMLInputElement, InputProps & InputIconProps>(
  (
    {
      className,
      variant,
      inputSize,
      asChild = false,
      type,
      Icon,
      iconPlacement,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "input";

    const inputClassName = cn(
      inputVariants({ variant, inputSize, className }),
      Icon && (iconPlacement === "left" ? "pl-8" : "pr-8"),
    );

    return (
      <div className="relative">
        {Icon && (
          <div
            className={cn(
              "absolute top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none",
              iconPlacement === "left" ? "left-2" : "right-2",
            )}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
        <Comp type={type} className={inputClassName} ref={ref} {...props} />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input, inputVariants };