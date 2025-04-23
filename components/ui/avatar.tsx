"use client";

import { cn } from "@/lib/utils";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const avatarVariants = cva("relative flex shrink-0 overflow-hidden", {
  variants: {
    variant: {
      circle: "rounded-full",
      square: "rounded-none",
      rounded: "rounded-md",
    },
    size: {
      icon: "size-4",
      xs: "size-6",
      sm: "size-8",
      default: "size-9",
      md: "size-10",
      lg: "size-12",
      xl: "size-16",
      "2xl": "size-20",
    },
  },
  defaultVariants: {
    variant: "circle",
    size: "default",
  },
});

const avatarImageVariants = cva("aspect-square size-full", {
  variants: {
    variant: {
      circle: "rounded-full",
      square: "rounded-none",
      rounded: "rounded-md",
    },
  },
  defaultVariants: {
    variant: "circle",
  },
});

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {}

function Avatar({ className, variant, size, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ variant, size }), className)}
      {...props}
    >
      {React.Children.map(props.children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, {
              variant,
              className: cn(
                (child as React.ReactElement<any>).props.className,
                avatarImageVariants({ variant }),
              ),
            })
          : child,
      )}
    </AvatarPrimitive.Root>
  );
}

export interface AvatarImageProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {
  variant?: VariantProps<typeof avatarVariants>["variant"];
}

function AvatarImage({ className, variant, ...props }: AvatarImageProps) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(avatarImageVariants({ variant }), className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center bg-muted",
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarFallback, AvatarImage };
