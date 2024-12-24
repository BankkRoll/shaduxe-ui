"use client";

import {
  ArrowRight,
  ChevronRight,
  Eye,
  EyeOff,
  LockIcon,
  Mail,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Variants, motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default function Hero() {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  return (
    <div className="overflow-hidden container mx-auto px-4 py-16 md:py-32 max-w-7xl">
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
            <Link href="/docs/blocks/pricing-one" passHref>
              <Button
                variant="expandIcon"
                Icon={ArrowRight}
                iconPlacement="right"
              >
                Browse blocks
              </Button>
            </Link>
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
          <div className="mt-12 space-y-8">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <Input inputSize="xs" placeholder="XS input" />
                <Input variant="underline" placeholder="Underline input" />
                <Input variant="pill" placeholder="Pill input" />
                <Input
                  inputSize="lg"
                  placeholder="Large input"
                  Icon={Mail}
                  iconPlacement="right"
                />
                <div className="relative">
                  <Input
                    variant="underline"
                    inputSize="lg"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password input"
                    Icon={LockIcon}
                    iconPlacement="left"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Eye className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
                <div className="relative">
                  <Input
                    variant="pill"
                    inputSize="lg"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password input"
                    Icon={LockIcon}
                    iconPlacement="left"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Eye className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Content - Interactive UI */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <div className="relative  grid gap-6 transform rotate-6">
            {/* Switch Variants */}
            <div className="flex flex-wrap gap-4">
              <Switch variant="default" />
              <Switch variant="ios" />
              <Switch variant="rounded" />
              <Switch variant="square" />
              <Switch showIcons />
              <Switch showLabels />
            </div>

            {/* Tabs Variants */}
            <div className="space-y-8">
              <Tabs defaultValue="tab1">
                <TabsList>
                  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                </TabsList>
              </Tabs>
              <Tabs variant="pill" defaultValue="tab1">
                <TabsList>
                  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                  <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                </TabsList>
              </Tabs>
              <Tabs variant="folder" defaultValue="folder1">
                <TabsList>
                  <TabsTrigger value="folder1">Folder 1</TabsTrigger>
                  <TabsTrigger value="folder2">Folder 2</TabsTrigger>
                  <TabsTrigger value="folder3">Folder 3</TabsTrigger>
                  <TabsTrigger value="folder4">Folder 4</TabsTrigger>
                </TabsList>
              </Tabs>
              <Tabs variant="underline" defaultValue="tab1">
                <TabsList>
                  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                  <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                  <TabsTrigger value="tab4">Tab 4</TabsTrigger>
                  <TabsTrigger value="tab5">Tab 5</TabsTrigger>
                  <TabsTrigger className="hidden md:flex" value="tab6">
                    Tab 6
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Button Variants */}
            <div className="flex flex-wrap max-w-md gap-4">
              <Button size="icon">Icon</Button>
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="ringHover">Ring Hover</Button>
              <Button variant="shine">Shine</Button>
              <Button variant="ringHoverOutline">Ring Hover Outline</Button>
              <Button variant="linkHover1">Link Hover 1</Button>
              <Button variant="linkHover2">Link Hover 2</Button>
              <Button variant="gooeyLeft">Gooey Left</Button>
              <Button variant="gooeyRight">Gooey Right</Button>
            </div>

            {/* Avatar Variants */}
            <div className="flex flex-wrap gap-6">
              <Avatar size="xs">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar size="sm">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar size="md" variant="rounded">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar size="lg" variant="rounded">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar size="xl" variant="square">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className="hidden md:flex" size="2xl" variant="square">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
