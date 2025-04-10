"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import * as React from "react";

const DOMAINS = {
  v3: "https://v3.shaduxe.com",
  v4: "https://ui.shaduxe.com",
} as const;

export function VersionSelect() {
  const [version, setVersion] = React.useState<keyof typeof DOMAINS>("v4");

  const handleVersionChange = (value: keyof typeof DOMAINS) => {
    setVersion(value);
    window.location.href = DOMAINS[value];
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-8 w-14 cursor-pointer items-center justify-between rounded-md border border-muted-foreground/20 py-1 pl-2 pr-0.5 text-sm font-medium text-muted-foreground">
        {version}
        <div className="flex size-6 items-center justify-center rounded-md border border-muted-foreground/20">
          <ChevronDownIcon className="size-5 opacity-50" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="bg-background min-w-[120px]"
      >
        <DropdownMenuItem
          onClick={() => handleVersionChange("v3")}
          className={cn(
            "flex justify-between",
            version === "v3" && "bg-muted text-primary",
          )}
        >
          Tailwind v3
          {version === "v3" && <CheckIcon className="ml-2 size-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleVersionChange("v4")}
          className={cn(
            "flex justify-between",
            version === "v4" && "bg-muted text-primary",
          )}
        >
          Tailwind v4
          {version === "v4" && <CheckIcon className="ml-2 size-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

