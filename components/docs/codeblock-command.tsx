"use client";

import { CopyButton } from "@/components/docs/copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useConfig } from "@/hooks/use-config";
import { useMounted } from "@/hooks/use-mounted";

import { cn } from "@/lib/utils";
import { NpmCommands } from "@/types/unist";
import * as React from "react";

export function CodeBlockCommand({
  __npmCommand__,
  __yarnCommand__,
  __pnpmCommand__,
  __bunCommand__,
}: React.ComponentProps<"pre"> & NpmCommands) {
  const [config, setConfig] = useConfig();
  const mounted = useMounted();

  const packageManager = config.packageManager || "pnpm";
  const tabs = React.useMemo(() => {
    return {
      pnpm: __pnpmCommand__,
      npm: __npmCommand__,
      yarn: __yarnCommand__,
      bun: __bunCommand__,
    };
  }, [__npmCommand__, __pnpmCommand__, __yarnCommand__, __bunCommand__]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative w-full mt-6 max-h-[650px] overflow-hidden rounded-md border bg-card text-card-foreground shadow-sm">
      <Tabs
        className="w-full"
        defaultValue={packageManager}
        onValueChange={(value) => {
          setConfig({
            ...config,
            packageManager: value as "pnpm" | "npm" | "yarn" | "bun",
          });
        }}
      >
        <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2 w-full rounded-t-md">
          <TabsList className="h-8 translate-y-[1px] gap-2 bg-transparent p-0 w-fit">
            {Object.entries(tabs).map(([key, value]) => {
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className={cn(
                    "cursor-pointer rounded-md border border-transparent bg-transparent px-3 py-1 font-mono text-sm",
                    "text-muted-foreground transition-colors hover:text-foreground",
                    "data-[state=active]:border-border/40 data-[state=active]:bg-accent data-[state=active]:text-foreground",
                  )}
                >
                  {key}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
        {Object.entries(tabs).map(([key, value]) => {
          return (
            <TabsContent key={key} value={key} className="mt-0">
              <pre className="px-5 py-4 overflow-x-auto bg-muted/20">
                <code
                  className="relative font-mono text-sm leading-relaxed"
                  data-language="bash"
                >
                  {value}
                </code>
              </pre>
            </TabsContent>
          );
        })}
      </Tabs>
      <CopyButton
        value={tabs[packageManager] || ""}
        className="absolute right-3 top-2.5 z-10"
        event="copy_npm_command"
        src={`npm_command_${packageManager}`}
      />
    </div>
  );
}
