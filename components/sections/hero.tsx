"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Variants, motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Label } from "../ui/label";
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
          className="flex-1 md:-mt-24 lg:-mt-36"
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
          <Link href="/docs/components/button" passHref>
            <Button className="mt-8" size="lg">
              Browse components
            </Button>
          </Link>
        </motion.div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={controls}
          className="flex-1 w-full max-w-md space-y-8"
        >
          <motion.div variants={item} className="space-y-6">
            <h3 className="text-lg font-semibold">Switch</h3>
            <div className="flex items-center space-x-12">
              <Switch id="airplane-mode" size="sm" />
              <Switch
                id="airplane-mode"
                size="sm"
                variant="box"
                defaultChecked
              />
              <Switch id="airplane-mode" size="sm" variant="retro" />
              <Switch
                id="airplane-mode"
                size="sm"
                variant="square"
                defaultChecked
              />
            </div>
            <div className="flex items-center space-x-10">
              <Switch id="airplane-mode" defaultChecked />
              <Switch id="airplane-mode" variant="box" />
              <Switch id="airplane-mode" variant="retro" defaultChecked />
              <Switch id="airplane-mode" variant="square" />
            </div>
            <div className="flex items-center space-x-6">
              <Switch id="airplane-mode" size="lg" />
              <Switch
                id="airplane-mode"
                size="lg"
                variant="box"
                defaultChecked
              />
              <Switch id="airplane-mode" size="lg" variant="retro" />
              <Switch
                id="airplane-mode"
                size="lg"
                variant="square"
                defaultChecked
              />
            </div>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
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

          <motion.div variants={item} className="space-y-4">
            <h3 className="text-lg font-semibold">Tabs</h3>
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>
          <motion.div variants={item} className="space-y-4">
            <Tabs variant="rounded" defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>
          <motion.div variants={item} className="space-y-4">
            <Tabs variant="folder" defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>
          <motion.div variants={item} className="space-y-4">
            <Tabs variant="underline" defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
