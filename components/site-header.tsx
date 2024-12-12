"use client";

import { CommandMenu } from "@/components/command-menu";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { User } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function SiteHeader() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <header
      className={cn(
        "supports-backdrop-blur:bg-background/90 sticky top-0 z-[100] w-full border-b bg-background/40 backdrop-blur-lg",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Left side pc and mobile */}
        <div className="flex items-center justify-end gap-4 md:gap-2">
          <MainNav />
          <MobileNav />
        </div>

        {/* Center / hidden on mobile */}
        <div className="hidden flex-1 items-center justify-center gap-4 md:flex md:justify-center">
          <CommandMenu />
        </div>

        {/* Right side pc and mobile */}
        <div className="flex items-center justify-end gap-4 md:gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
