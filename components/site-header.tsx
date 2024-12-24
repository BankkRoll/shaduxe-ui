import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

import { CommandMenu } from "@/components/command-menu";
import Link from "next/link";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { StarIcon } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export async function SiteHeader() {
  let stars = 1; // Default value

  try {
    const response = await fetch(
      "https://api.github.com/repos/BankkRoll/shaduxe-ui",
      {
        headers: process.env.GITHUB_OAUTH_TOKEN
          ? {
              Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
              "Content-Type": "application/json",
            }
          : {},
        next: {
          revalidate: 3600,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      stars = data.stargazers_count || stars;
    }
  } catch (error) {
    console.error("Error fetching GitHub stars:", error);
  }

  return (
    <header
      className={cn(
        "supports-backdrop-blur:bg-background/90 sticky top-0 z-[9999999999] w-full bg-background/40 backdrop-blur-lg"
      )}
    >
      <div className="container flex h-16 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <Link
            className={cn(
              buttonVariants({
                variant: "outline",
              }),
              "hidden md:inline-flex group"
            )}
            target="_blank"
            href={siteConfig.links.github}
          >
            <div className="group flex items-center">
              <GitHubLogoIcon className="size-4" />
              <span className="ml-1 lg:hidden">Star</span>
              <span className="ml-1 hidden lg:inline">Star on GitHub</span>{" "}
            </div>
            <div className="ml-2 flex items-center gap-1 text-sm md:flex">
              <StarIcon className="size-4 text-gray-500 transition-all duration-300 group-hover:text-yellow-300" />
              {stars}
            </div>
          </Link>

          <nav className="flex items-center gap-1">
            
            <ModeToggle />
          </nav>
        </div>
      </div>
      <hr className="m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-200/30 to-neutral-200/0" />
    </header>
  );
}
