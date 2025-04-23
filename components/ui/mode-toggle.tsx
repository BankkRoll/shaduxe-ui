"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import React from "react";

export function ModeToggle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button> & { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      data-slot="mode-toggle"
      variant="outline"
      type="button"
      size="icon"
      className={cn("cursor-pointer px-2", className)}
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      {...props}
    >
      <SunIcon className="size-[1.2rem] text-neutral-800 dark:hidden dark:text-neutral-200" />
      <MoonIcon className="hidden size-[1.2rem] text-neutral-800 dark:block dark:text-neutral-200" />
    </Button>
  );
}

export default ModeToggle;
