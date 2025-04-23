import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
        success:
          "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950/50 dark:text-green-300 [&>svg]:text-green-500 dark:[&>svg]:text-green-400",
        warning:
          "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950/50 dark:text-yellow-300 [&>svg]:text-yellow-500 dark:[&>svg]:text-yellow-400",
        info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300 [&>svg]:text-blue-500 dark:[&>svg]:text-blue-400",
        outline: "border-border bg-transparent",
      },
      size: {
        sm: "px-3 py-2 text-xs",
        default: "px-4 py-3 text-sm",
        lg: "px-6 py-4 text-base",
      },
      withIcon: {
        true: "has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3",
        false: "grid-cols-[0_1fr]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      withIcon: true,
    },
  },
);

interface AlertProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode;
}

function Alert({
  className,
  variant,
  size,
  withIcon,
  icon,
  ...props
}: AlertProps) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant, size, withIcon }), className)}
      {...props}
    >
      {icon}
      {props.children}
    </div>
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertDescription, AlertTitle };
