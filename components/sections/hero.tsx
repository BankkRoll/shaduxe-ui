"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, ChevronRight, Plus } from "lucide-react";
import { motion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { Separator } from "../ui/separator";

export default function Hero() {
  return (
    <div className="relative min-h-[100vh] w-full overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none overflow-hidden">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-foreground to-transparent absolute top-1/4"></div>
        <div className="w-full h-px bg-gradient-to-r from-foreground via-transparent to-foreground absolute top-2/4"></div>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-foreground to-transparent absolute top-3/4"></div>
        <div className="h-full w-px bg-gradient-to-b from-transparent via-foreground to-transparent absolute left-1/4"></div>
        <div className="h-full w-px bg-gradient-to-b from-foreground via-transparent to-foreground absolute left-2/4"></div>
        <div className="h-full w-px bg-gradient-to-b from-transparent via-foreground to-transparent absolute left-3/4"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left content */}
          <div className="lg:col-span-5 z-10 pt-4 lg:pt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <Button
                className="rounded-full cursor-default hover:bg-transparent"
                variant="outline"
                size="sm"
              >
                💠 <Separator className="mx-2 h-4" orientation="vertical" />
                Supports Tailwind V4
                <ChevronRight className="ml-1 h-4 w-4 text-muted-foreground" />
              </Button>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-foreground">
                Beautiful UI components with endless variations
              </h1>
              <p className="text-muted-foreground max-w-xl text-lg">
                A comprehensive collection of advanced components, pre-built
                blocks, and stunning templates with rich variants and
                customization options.
              </p>
              <div className="flex items-center space-x-4 mt-8">
                <Link href="/docs/blocks/pricing-one" passHref>
                  <Button
                    effect="expandIcon"
                    Icon={ArrowRight}
                    iconPlacement="right"
                  >
                    Browse blocks
                  </Button>
                </Link>
                <Link href="/docs/components/avatar" passHref>
                  <Button
                    effect="expandIcon"
                    Icon={ArrowRight}
                    iconPlacement="right"
                  >
                    Browse components
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right content - Component showcase */}
          <div className="lg:col-span-7 relative z-0">
            <div className="relative grid grid-cols-12 gap-4 h-[750px]">
              {/* Avatar Showcase */}
              <motion.div
                className="col-span-6 bg-card/80 backdrop-blur-sm border rounded-lg p-4 shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-sm font-medium mb-3">Avatar Variants</h3>
                <div className="flex gap-4 mb-4">
                  <div className="flex flex-col items-center gap-1">
                    <Avatar variant="circle" size="md">
                      <AvatarImage src="https://github.com/BankkRoll.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">
                      Circle
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Avatar variant="square" size="md">
                      <AvatarImage src="https://github.com/BankkRoll.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">
                      Square
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Avatar variant="rounded" size="md">
                      <AvatarImage src="https://github.com/BankkRoll.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">
                      Rounded
                    </span>
                  </div>
                </div>
                <h3 className="text-sm font-medium mb-3">Avatar Sizes</h3>
                <div className="flex items-end gap-2">
                  <Avatar size="xs">
                    <AvatarImage src="https://github.com/BankkRoll.png" />
                    <AvatarFallback>XS</AvatarFallback>
                  </Avatar>
                  <Avatar size="sm">
                    <AvatarImage src="https://github.com/BankkRoll.png" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <Avatar size="md">
                    <AvatarImage src="https://github.com/BankkRoll.png" />
                    <AvatarFallback>MD</AvatarFallback>
                  </Avatar>
                  <Avatar size="lg">
                    <AvatarImage src="https://github.com/BankkRoll.png" />
                    <AvatarFallback>LG</AvatarFallback>
                  </Avatar>
                  <Avatar size="xl">
                    <AvatarImage src="https://github.com/BankkRoll.png" />
                    <AvatarFallback>XL</AvatarFallback>
                  </Avatar>
                  <Avatar size="2xl">
                    <AvatarImage src="https://github.com/BankkRoll.png" />
                    <AvatarFallback>2X</AvatarFallback>
                  </Avatar>
                </div>
              </motion.div>

              {/* Button Showcase */}
              <motion.div
                className="col-span-6 bg-card/80 backdrop-blur-sm border rounded-lg p-4 shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-sm font-medium mb-3">Button Variants</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <Button variant="default" size="sm">
                    Default
                  </Button>
                  <Button variant="destructive" size="sm">
                    Destructive
                  </Button>
                  <Button variant="outline" size="sm">
                    Outline
                  </Button>
                  <Button variant="secondary" size="sm">
                    Secondary
                  </Button>
                  <Button variant="ghost" size="sm">
                    Ghost
                  </Button>
                  <Button variant="link" size="sm">
                    Link
                  </Button>
                </div>
                <h3 className="text-sm font-medium mb-3">Button Sizes</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button variant="default" size="xs">
                    XS
                  </Button>
                  <Button variant="default" size="sm">
                    SM
                  </Button>
                  <Button variant="default" size="md">
                    MD
                  </Button>
                  <Button variant="default" size="lg">
                    LG
                  </Button>
                </div>
              </motion.div>

              {/* Badge Showcase */}
              <motion.div
                className="col-span-6 bg-card/80 backdrop-blur-sm border rounded-lg p-4 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-sm font-medium mb-3">Badge Variants</h3>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="ghost">Ghost</Badge>
                  <Badge variant="link">Link</Badge>
                </div>
                <div className="mb-4">
                  <Badge variant="success" className="mr-2">
                    Success
                  </Badge>
                  <Badge variant="warning" className="mr-2">
                    Warning
                  </Badge>
                  <Badge variant="info">Info</Badge>
                </div>
                <h3 className="text-sm font-medium mb-3">Badge Sizes</h3>
                <div className="flex items-center gap-2">
                  <Badge size="xs">XS</Badge>
                  <Badge size="sm">SM</Badge>
                  <Badge size="md">MD</Badge>
                  <Badge size="lg">LG</Badge>
                </div>
              </motion.div>

              {/* Tabs Showcase */}
              <motion.div
                className="col-span-6 bg-card/80 backdrop-blur-sm border rounded-lg p-4 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="text-sm font-medium mb-3">Tabs Variants</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-muted-foreground mb-1 block">
                      Default
                    </span>
                    <Tabs variant="folder" defaultValue="tab1">
                      <TabsList>
                        <TabsTrigger value="tab1">Account</TabsTrigger>
                        <TabsTrigger value="tab2">Settings</TabsTrigger>
                        <TabsTrigger value="tab3">Notifications</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <div>
                    <span className="text-xs text-muted-foreground mb-1 block">
                      Underline
                    </span>
                    <Tabs variant="underline" defaultValue="tab1">
                      <TabsList>
                        <TabsTrigger value="tab1">Account</TabsTrigger>
                        <TabsTrigger value="tab2">Settings</TabsTrigger>
                        <TabsTrigger value="tab3">Notifications</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <div>
                    <span className="text-xs text-muted-foreground mb-1 block">
                      Pill
                    </span>
                    <Tabs variant="pill" defaultValue="tab1">
                      <TabsList>
                        <TabsTrigger value="tab1">Account</TabsTrigger>
                        <TabsTrigger value="tab2">Settings</TabsTrigger>
                        <TabsTrigger value="tab3">Notifications</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>
              </motion.div>

              {/* Switch Showcase */}
              <motion.div
                className="col-span-6 bg-card/80 backdrop-blur-sm border rounded-lg p-4 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-sm font-medium mb-3">Switch Variants</h3>
                <div className="grid grid-cols-2 gap-y-4 mb-4">
                  <div className="flex flex-col items-center gap-1">
                    <Switch variant="default" />
                    <span className="text-xs text-muted-foreground">
                      Default
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Switch variant="rounded" />
                    <span className="text-xs text-muted-foreground">
                      Rounded
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Switch variant="square" />
                    <span className="text-xs text-muted-foreground">
                      Square
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Switch variant="ios" />
                    <span className="text-xs text-muted-foreground">iOS</span>
                  </div>
                </div>
                <h3 className="text-sm font-medium mb-3">Switch Sizes</h3>
                <div className="flex justify-between items-center">
                  <Switch size="xs" />
                  <Switch size="sm" defaultChecked />
                  <Switch size="md" />
                  <Switch size="lg" defaultChecked />
                </div>
              </motion.div>

              {/* Card Showcase */}
              <motion.div
                className="col-span-6 bg-card/80 backdrop-blur-sm border rounded-lg p-4 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className="text-sm font-medium mb-3">Card Component</h3>
                <Card className="w-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Card Title</CardTitle>
                    <CardDescription className="text-xs">
                      Card Description
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-2">
                    <p className="text-xs">Content goes here</p>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button size="sm" variant="default">
                      Action
                    </Button>
                  </CardFooter>
                </Card>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <Card variant="outline" className="p-3">
                    <p className="text-xs font-medium">Outline</p>
                  </Card>
                  <Card variant="ghost" className="p-3">
                    <p className="text-xs font-medium">Ghost</p>
                  </Card>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
