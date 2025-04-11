import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const badgeVariants = cva(
  "inline-flex items-center border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        ghost: "border-transparent hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline border-transparent",
        success:
          "border-transparent bg-green-500 text-white shadow hover:bg-green-500/80",
        warning:
          "border-transparent bg-yellow-500 text-white shadow hover:bg-yellow-500/80",
        info: "border-transparent bg-blue-500 text-white shadow hover:bg-blue-500/80",
      },
      size: {
        xs: "h-5 text-[10px] px-1.5 py-0",
        sm: "h-6 text-xs px-2 py-0.5",
        md: "h-7 text-xs px-2.5 py-0.5",
        lg: "h-8 text-sm px-3 py-1",
      },
      shape: {
        default: "rounded-md",
        rounded: "rounded-full",
        square: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, shape, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant, size, shape }), className)}
      {...props}
    />
  ),
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
