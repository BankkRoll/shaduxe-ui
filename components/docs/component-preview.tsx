"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader, RotateCcw } from "lucide-react";

import { CodeBlockWrapper } from "@/components/docs/code-block-wrapper";
import ComponentWrapper from "@/components/docs/component-wrapper";
import { Button } from "@/components/ui/button";
import { useConfig } from "@/hooks/use-config";
import { cn } from "@/lib/utils";
import { Index } from "__registry__";
import { OpenInV0Button } from "./open-in-v0-button";

interface VariantItem {
  name: string;
  description: string;
  component: React.ComponentType<any>;
}

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  align?: "center" | "start" | "end";
  preview?: boolean;
  variant?: string;
}

// Safe component renderer
const SafeComponentRenderer = ({ component }: { component: any }) => {
  // If component doesn't exist, show error
  if (!component) {
    return (
      <div className="text-sm text-rose-500 p-4">Component failed to load</div>
    );
  }

  try {
    // Create element with proper error handling
    return React.createElement(component);
  } catch (error) {
    console.error("Error rendering component:", error);
    return (
      <div className="text-sm text-rose-500 p-4">Error rendering component</div>
    );
  }
};

export function ComponentPreview({
  name,
  children,
  className,
  align = "center",
  preview = false,
  variant,
  ...props
}: ComponentPreviewProps) {
  const [key, setKey] = React.useState(0);
  const [config] = useConfig();
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">(
    "preview",
  );
  const [selectedVariant, setSelectedVariant] = React.useState<
    string | undefined
  >(variant);
  const [isLoading, setIsLoading] = React.useState(true);
  const [sourceCode, setSourceCode] = React.useState<string | null>(null);

  const Codes = React.Children.toArray(children) as React.ReactElement[];
  const Code = Codes[0];

  // Get component from registry with safety check
  const componentEntry = React.useMemo(() => {
    try {
      // Always use 'default' style rather than reading from config
      if (name && Index?.default?.[name]) {
        return Index.default[name];
      }
      return null;
    } catch (error) {
      console.error(`Error accessing component ${name} from registry:`, error);
      return null;
    }
  }, [name]);

  // Get available variants safely with better error handling
  const availableVariants = React.useMemo(() => {
    if (!componentEntry?.variants) return {};

    try {
      return typeof componentEntry.variants === "object"
        ? (componentEntry.variants as Record<string, VariantItem>)
        : {};
    } catch (error) {
      console.error("Error processing variants:", error);
      return {};
    }
  }, [componentEntry]);

  const hasVariants = React.useMemo(() => {
    return Object.keys(availableVariants).length > 0;
  }, [availableVariants]);

  // Initialize selected variant if not set and variants exist
  React.useEffect(() => {
    if (!selectedVariant && hasVariants) {
      const defaultVariant = Object.keys(availableVariants)[0];
      setSelectedVariant(defaultVariant);
    }
  }, [hasVariants, availableVariants, selectedVariant]);

  // Signal that loading is complete when component is rendered
  React.useEffect(() => {
    setIsLoading(false);
  }, [componentEntry, selectedVariant]);

  // Fetch source code when activeTab changes to "code"
  React.useEffect(() => {
    const fetchSourceCode = async () => {
      if (activeTab !== "code" || !componentEntry || !!sourceCode) {
        return;
      }

      try {
        setIsLoading(true);

        // Get the component from registry instead of fetching from URL
        if (!componentEntry) {
          throw new Error(`Component ${name} not found in registry`);
        }

        // Get source directly from the registry files
        if (componentEntry.files && componentEntry.files.length > 0) {
          const filePath = componentEntry.files[0];
          // Extract registry path, remove "registry/" prefix if exists
          const registryPath =
            typeof filePath === "string"
              ? filePath.replace(/^registry\//, "")
              : filePath.path.replace(/^registry\//, "");

          // For security, only allow reading registry files
          if (!registryPath.startsWith("default/")) {
            throw new Error("Invalid file path");
          }

          try {
            // Access the component source code directly from the registry
            const response = await fetch(
              `/r/styles/default/${componentEntry.name}.json`,
            );
            if (!response.ok) {
              throw new Error(
                `Failed to fetch component: ${response.statusText}`,
              );
            }

            const data = await response.json();

            // Extract content from the first file
            if (data.files && data.files.length > 0 && data.files[0].content) {
              setSourceCode(data.files[0].content);
            } else {
              throw new Error("No source code content found");
            }
          } catch (error) {
            console.error("Error fetching component source:", error);
            setSourceCode(
              `// Error loading source code for ${componentEntry.name}`,
            );
          }
        } else {
          throw new Error("No files defined for component");
        }
      } catch (error) {
        console.error("Error fetching component source:", error);
        setSourceCode(
          `// Error loading source code: ${error instanceof Error ? error.message : String(error)}`,
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchSourceCode();
  }, [activeTab, componentEntry, sourceCode, name]);

  // Component rendering logic
  const ComponentToRender = React.useMemo(() => {
    return () => {
      // Component not found
      if (!componentEntry) {
        return (
          <div className="border border-red-200 bg-red-50 text-red-800 rounded-md p-4 text-sm">
            Component{" "}
            <code className="bg-red-100 px-1 py-0.5 rounded">{name}</code> not
            found in registry
          </div>
        );
      }

      // Variant requested but variants empty
      if (selectedVariant && !hasVariants) {
        return (
          <div className="border border-amber-200 bg-amber-50 text-amber-800 rounded-md p-4 text-sm">
            No variants available for this component
          </div>
        );
      }

      // Render variant component if exists
      if (
        selectedVariant &&
        hasVariants &&
        availableVariants[selectedVariant]
      ) {
        const VariantComponent = availableVariants[selectedVariant].component;
        if (!VariantComponent) {
          return (
            <div className="border border-amber-200 bg-amber-50 text-amber-800 rounded-md p-4 text-sm">
              Variant{" "}
              <code className="bg-amber-100 px-1 py-0.5 rounded">
                {selectedVariant}
              </code>{" "}
              failed to load
            </div>
          );
        }

        return (
          <React.Suspense
            fallback={
              <div className="flex items-center justify-center p-8 text-sm text-muted-foreground">
                <Loader className="mr-2 size-4 animate-spin" />
                <span>Loading variant...</span>
              </div>
            }
          >
            <SafeComponentRenderer component={VariantComponent} />
          </React.Suspense>
        );
      }

      // Default component rendering
      if (!componentEntry.component) {
        return (
          <div className="border border-amber-200 bg-amber-50 text-amber-800 rounded-md p-4 text-sm">
            Component definition is missing or invalid
          </div>
        );
      }

      return (
        <React.Suspense
          fallback={
            <div className="flex items-center justify-center p-8 text-sm text-muted-foreground">
              <Loader className="mr-2 size-4 animate-spin" />
              <span>Loading component...</span>
            </div>
          }
        >
          <SafeComponentRenderer component={componentEntry.component} />
        </React.Suspense>
      );
    };
  }, [componentEntry, name, selectedVariant, hasVariants, availableVariants]);

  // Get source file path from registry for the current component/variant
  const sourceFilePath = React.useMemo(() => {
    if (!componentEntry) return null;

    // Return the first file path from the component entry
    return componentEntry.files && componentEntry.files.length > 0
      ? componentEntry.files[0]
      : null;
  }, [componentEntry]);

  return (
    <div
      className={cn(
        "relative my-4 flex flex-col space-y-2 lg:max-w-[120ch]",
        className,
      )}
      {...props}
    >
      <Tabs
        defaultValue="preview"
        className="relative mr-auto w-full"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "preview" | "code")}
      >
        {!preview && (
          <div className="flex items-center justify-between pb-3">
            <TabsList className="w-full justify-start rounded-none border-b-2 bg-transparent p-0">
              <TabsTrigger
                value="preview"
                className="cursor-pointer relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="cursor-pointer relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Code
              </TabsTrigger>
            </TabsList>
          </div>
        )}
        <TabsContent value="preview" className="relative rounded-md" key={key}>
          <ComponentWrapper>
            <div className="absolute left-1.5 top-1.5 z-50 flex items-center gap-2">
              <OpenInV0Button name={name} className="cursor-pointer h-8" />
            </div>

            <div className="absolute right-1.5 top-1.5 z-50 flex items-center gap-2">
              {hasVariants && (
                <Select
                  value={selectedVariant}
                  onValueChange={setSelectedVariant}
                >
                  <SelectTrigger className="cursor-pointer h-8 w-[150px]">
                    <SelectValue placeholder="Select variant" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(availableVariants).map(([key, value]) => (
                      <SelectItem
                        className="cursor-pointer"
                        key={key}
                        value={key}
                      >
                        {value.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              <Button
                size="icon"
                onClick={() => setKey((prev) => prev + 1)}
                className="size-8 cursor-pointer flex items-center rounded-lg"
                variant="outline"
              >
                <RotateCcw aria-label="restart-btn" size={16} />
              </Button>
            </div>

            <div className="preview-container flex justify-center pt-12">
              <div className="w-full overflow-auto hide-scrollbar p-4">
                <ComponentToRender />
              </div>
            </div>
          </ComponentWrapper>
        </TabsContent>
        <TabsContent value="code">
          <CodeBlockWrapper expandButtonTitle="View Full Code">
            <div className="relative w-full">
              {sourceCode ? (
                <pre className="language-tsx rounded-t-none">
                  <code className="language-tsx">{sourceCode}</code>
                </pre>
              ) : (
                <div className="flex items-center justify-center p-8 text-sm text-muted-foreground">
                  <Loader className="mr-2 size-4 animate-spin" />
                  <span>Loading source code...</span>
                </div>
              )}
            </div>
          </CodeBlockWrapper>
        </TabsContent>
      </Tabs>

      {/* Add CSS for hiding scrollbars while maintaining scroll functionality */}
      <style jsx global>{`
        .hide-scrollbar {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer and Edge */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }

        /* Preview container */
        .preview-container {
          position: relative;
          max-width: 100%;
          overflow-x: auto;
          overflow-y: visible;
        }
      `}</style>
    </div>
  );
}
