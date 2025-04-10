"use client";

import * as React from "react";

import { CodeBlockWrapper } from "@/components/docs/code-block-wrapper";
import { useConfig } from "@/hooks/use-config";
import { cn } from "@/lib/utils";
import { Index } from "__registry__";
import { Loader } from "lucide-react";

interface VariantItem {
  name: string;
  description: string;
  component: React.ComponentType<any>;
}

interface ComponentSourceProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  name?: string;
  component?: string;
  variant?: string;
}

export function ComponentSource({
  children,
  className,
  component,
  name,
  variant,
  ...props
}: ComponentSourceProps) {
  // Prioritize name over component for consistency with component-preview
  const componentName = name || component;

  const [config] = useConfig();
  const [sourceCode, setSourceCode] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Fetch source code when component is mounted
  React.useEffect(() => {
    if (!componentName) {
      setLoading(false);
      return;
    }

    const fetchSourceCode = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get the component from the registry
        const componentEntry = Index.default[componentName];

        if (!componentEntry) {
          setError(`Component "${componentName}" not found in registry`);
          setLoading(false);
          return;
        }

        // Get source URL directly - this matches component-preview.tsx behavior
        const sourceUrl = `/r/styles/default/${componentName}.json`;

        // Fetch the source code
        const response = await fetch(sourceUrl);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch source code: ${response.statusText}`,
          );
        }

        const data = await response.json();

        // Extract content from the response - exactly like component-preview.tsx
        if (data.files && data.files.length > 0 && data.files[0].content) {
          setSourceCode(data.files[0].content);
        } else {
          setError("No source code content found in response");
        }
      } catch (error) {
        console.error("Error fetching component source:", error);
        setError(
          `Error loading source code: ${error instanceof Error ? error.message : String(error)}`,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSourceCode();
  }, [componentName]);

  // Display variant-specific information if component and variant are specified
  let variantInfo = null;
  if (componentName && variant && Index.default[componentName]?.variants) {
    try {
      const componentEntry = Index.default[componentName];
      const variantData = componentEntry?.variants?.[variant] as
        | VariantItem
        | undefined;

      if (variantData?.description) {
        variantInfo = (
          <div className="mb-4">
            <div className="text-sm font-medium">{variantData.description}</div>
          </div>
        );
      }
    } catch (error) {
      console.error(
        `Error retrieving variant info for ${componentName}/${variant}:`,
        error,
      );
      // Fail silently for variant info
    }
  }

  return (
    <CodeBlockWrapper
      expandButtonTitle="View Full Code"
      className={cn("my-6 overflow-hidden rounded-md", className)}
      language="tsx"
      {...props}
    >
      <div className="relative w-full">
        {loading ? (
          <div className="flex items-center justify-center p-8 text-sm text-muted-foreground">
            <Loader className="mr-2 size-4 animate-spin" />
            <span>Loading source code...</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center p-8 text-sm text-red-500">
            <span>{error}</span>
          </div>
        ) : sourceCode ? (
          <pre className="language-tsx rounded-t-none">
            <code className="language-tsx">{sourceCode}</code>
          </pre>
        ) : (
          children
        )}
      </div>
    </CodeBlockWrapper>
  );
}
