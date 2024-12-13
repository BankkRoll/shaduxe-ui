"use client";

import { ArrowRight, ChevronRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Variants, motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function Hero() {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  return (
    <div className="container mx-auto px-4 py-16 md:py-32 max-w-7xl">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            className="rounded-full cursor-default hover:bg-transparent"
            variant="outline"
            size="sm"
          >
            🎉 <Separator className="mx-2 h-4" orientation="vertical" />
            Introducing shaduxe/ui
            <ChevronRight className="ml-1 h-4 w-4 text-muted-foreground" />
          </Button>
          <h1 className="max-w-2xl text-4xl md:text-6xl font-bold mt-4 leading-tight tracking-tight">
            Elevate your design with powerful variations.
          </h1>
          <p className="mt-6 text-lg text-foreground/80 max-w-xl">
            Beautifully designed, expertly crafted component variants. The
            perfect extension for your shadcn/ui components.
          </p>
          <div className="flex items-center space-x-4 mt-8">
            {/* <Link href="/docs" passHref>
              <Button
                variant="ringHoverOutline"
              >
                View Docs
              </Button>
            </Link> */}
            <Link href="/docs/components/avatar" passHref>
              <Button
                variant="expandIcon"
                Icon={ArrowRight}
                iconPlacement="right"
              >
                Browse components
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={controls}
          className="flex-1 w-full max-w-md space-y-6"
        >
          <motion.div variants={item} className="space-y-6">
            <h3 className="text-lg font-semibold">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="linkHover1">LinkHover1</Button>
              <Button variant="linkHover2">LinkHover2</Button>
            </div>
          </motion.div>
          <motion.div variants={item} className="space-y-6">
            <h3 className="text-lg font-semibold">Tabs</h3>
            <div className="flex flex-col gap-8">
              <Tabs variant="rounded" defaultValue="teams" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="teams">For Teams</TabsTrigger>
                  <TabsTrigger value="individuals">For Individuals</TabsTrigger>
                </TabsList>
              </Tabs>

              <Tabs variant="pill" defaultValue="easy" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="easy">Easy</TabsTrigger>
                  <TabsTrigger value="medium">Medium</TabsTrigger>
                  <TabsTrigger value="hard">Hard</TabsTrigger>
                </TabsList>
              </Tabs>

              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
              </Tabs>

              <Tabs variant="folder" defaultValue="file1" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="file1">FILE 1</TabsTrigger>
                  <TabsTrigger value="file2">FILE 2</TabsTrigger>
                  <TabsTrigger value="file3">FILE 3</TabsTrigger>
                  <TabsTrigger value="file4">FILE 4</TabsTrigger>
                </TabsList>
              </Tabs>

              <Tabs variant="underline" defaultValue="docs" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="docs">Docs</TabsTrigger>
                  <TabsTrigger value="install">Install</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="cli">CLI</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
