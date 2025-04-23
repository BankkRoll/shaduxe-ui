import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
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
        icon: "h-4 w-4 text-[8px] p-0.5",
        xs: "h-5 text-[10px] px-1.5 py-0.5",
        sm: "h-6 text-xs px-1.5 py-0.5",
        md: "h-7 text-xs px-2 py-0.5",
        default: "h-8 text-sm px-2.5 py-0.5",
        lg: "h-8 text-sm px-3 py-0.75",
        xl: "h-9 text-base px-3.5 py-1",
        "2xl": "h-10 text-lg px-4 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
