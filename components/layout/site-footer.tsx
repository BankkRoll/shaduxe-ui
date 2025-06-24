"use client";

import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export function SiteFooter() {
  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={footerVariants}
      className="w-full border-dashed border-t"
    >
      <div className="container mx-auto p-4">
        <div className="grid w-full grid-cols-2 gap-4">
          <motion.div
            variants={childVariants}
            className="flex flex-col items-start justify-center space-y-2"
          >
            <Link href="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="Logo" className="h-4 w-4 dark:invert" />
              <span className="text-sm font-bold">{siteConfig.name}</span>
            </Link>
            <p className="text-xs leading-normal text-muted-foreground">
              Crafted by{" "}
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                bankk
              </a>
              .
            </p>
          </motion.div>

          <motion.div
            variants={childVariants}
            className="flex flex-col items-end justify-center space-y-2"
          >
            <nav className="flex items-center space-x-1">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                    }),
                    "h-8 w-8 p-0",
                  )}
                >
                  <GitHubLogoIcon className="size-4" />
                  <span className="sr-only">GitHub</span>
                </div>
              </Link>
              <Link
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                    }),
                    "h-8 w-8 p-0",
                  )}
                >
                  <TwitterLogoIcon className="size-4 fill-current" />
                  <span className="sr-only">Twitter</span>
                </div>
              </Link>
            </nav>
            <div className="flex flex-row items-center gap-1">
              <p className="text-xs text-muted-foreground">
                © 2024-2025 shaduxe/ui
              </p>
              <p className="hidden text-xs text-muted-foreground md:flex">
                - All rights reserved.
              </p>
            </div>
          </motion.div>
        </div>
        <div className=" w-full flex mt-4 items-center justify-center   ">
          <h1 className="text-center text-3xl md:text-5xl lg:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-700 to-neutral-900 select-none">
            shaduxe/ui
          </h1>
        </div>
      </div>
    </motion.footer>
  );
}
