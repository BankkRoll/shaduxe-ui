"use client";

import { cn } from "@/lib/utils";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { Moon, Sun } from "lucide-react";
import * as React from "react";

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
  {
    variants: {
      variant: {
        default: "rounded",
        rounded: "rounded-full",
        square: "rounded-none",
        ios: "rounded-full data-[state=checked]:bg-green-400",
      },
      size: {
        icon: "h-4 w-4",
        xs: "h-3 w-5",
        sm: "h-4 w-7",
        md: "h-5 w-9",
        lg: "h-6 w-11",
        xl: "h-7 w-13",
        "2xl": "h-8 w-15",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

const switchThumbVariants = cva(
  "pointer-events-none block bg-background shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0",
  {
    variants: {
      variant: {
        default: "rounded",
        rounded: "rounded-full",
        square: "rounded-none",
        ios: "rounded-full shadow-md",
      },
      size: {
        icon: "h-3 w-3 data-[state=checked]:translate-x-0",
        xs: "h-2 w-2 data-[state=checked]:translate-x-2",
        sm: "h-3 w-3 data-[state=checked]:translate-x-3",
        md: "h-4 w-4 data-[state=checked]:translate-x-4",
        lg: "h-5 w-5 data-[state=checked]:translate-x-5",
        xl: "h-6 w-6 data-[state=checked]:translate-x-6",
        "2xl": "h-7 w-7 data-[state=checked]:translate-x-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {
  thumbVariant?: VariantProps<typeof switchThumbVariants>["variant"];
  showLabels?: boolean;
  labelOn?: string;
  labelOff?: string;
  showIcons?: boolean;
}

function Switch({
  className,
  variant,
  size,
  thumbVariant,
  showLabels,
  labelOn = "On",
  labelOff = "Off",
  showIcons,
  checked,
  defaultChecked,
  onCheckedChange,
  ...props
}: SwitchProps) {
  const iconSize = React.useMemo(() => {
    switch (size) {
      case "icon":
        return 12;
      case "xs":
        return 8;
      case "sm":
        return 10;
      case "md":
        return 12;
      case "lg":
        return 14;
      default:
        return 12;
    }
  }, [size]);

  const [internalChecked, setInternalChecked] = React.useState(
    defaultChecked || false,
  );

  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const handleCheckedChange = (newChecked: boolean) => {
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    onCheckedChange?.(newChecked);
  };

  return (
    <div className="inline-flex items-center">
      {showLabels && (
        <span
          className={cn(
            "mr-2 text-sm",
            isChecked ? "text-primary/80" : "text-primary",
          )}
        >
          {labelOff}
        </span>
      )}
      <SwitchPrimitives.Root
        data-slot="switch"
        className={cn(switchVariants({ variant, size, className }))}
        checked={isChecked}
        onCheckedChange={handleCheckedChange}
        {...props}
      >
        <SwitchPrimitives.Thumb
          className={cn(
            switchThumbVariants({
              variant: thumbVariant || variant,
              size,
            }),
            "flex items-center justify-center",
          )}
        >
          {showIcons &&
            (isChecked ? <Sun size={iconSize} /> : <Moon size={iconSize} />)}
        </SwitchPrimitives.Thumb>
      </SwitchPrimitives.Root>
      {showLabels && (
        <span
          className={cn(
            "ml-2 text-sm",
            isChecked ? "text-primary" : "text-primary/80",
          )}
        >
          {labelOn}
        </span>
      )}
    </div>
  );
}

export { Switch };
