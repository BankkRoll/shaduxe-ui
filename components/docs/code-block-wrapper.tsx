"use client";

import * as React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { CopyButton } from "@/components/docs/copy-button";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Code, Maximize2Icon, Minimize2Icon } from "lucide-react";

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  expandButtonTitle?: string;
  showLineNumbers?: boolean;
  language?: string;
  fileName?: string;
  highlightLines?: number[];
}

export function CodeBlockWrapper({
  expandButtonTitle = "View Code",
  showLineNumbers = true,
  language = "tsx",
  fileName,
  highlightLines = [],
  className,
  children,
  ...props
}: CodeBlockProps) {
  const [isOpened, setIsOpened] = React.useState(false);
  const [rawCode, setRawCode] = React.useState<string | null>(null);
  const codeRef = React.useRef<HTMLPreElement>(null);

  // Extract raw text from the code block for copying
  React.useEffect(() => {
    if (codeRef.current) {
      const codeElement = codeRef.current.querySelector("code");
      if (codeElement) {
        setRawCode(codeElement.textContent);
      }
    }
  }, [children]);

  // Process code content to add line numbers and highlighting
  const processedChildren = React.useMemo(() => {
    // Function to recursively modify children
    const processChild = (child: React.ReactNode): React.ReactNode => {
      if (!React.isValidElement(child)) return child;

      // Handle pre tag
      if (child.type === "pre") {
        return React.cloneElement(child as React.ReactElement, {
          className: cn(
            child.props.className,
            showLineNumbers && "data-line-numbers",
          ),
          ref: codeRef,
          children: React.Children.map(child.props.children, processChild),
        });
      }

      // Handle code tag
      if (child.type === "code") {
        const codeEl = child as React.ReactElement;

        // Process lines for highlighting if needed
        if (highlightLines.length > 0 && codeEl.props.children) {
          const lines = React.Children.toArray(codeEl.props.children);
          const highlightedLines = lines.map((line, index) => {
            if (
              React.isValidElement(line) &&
              highlightLines.includes(index + 1)
            ) {
              return React.cloneElement(line as React.ReactElement, {
                className: cn(line.props.className, "line--highlighted"),
              });
            }
            return line;
          });

          return React.cloneElement(codeEl, {
            className: cn(
              codeEl.props.className,
              showLineNumbers && "data-line-numbers",
            ),
            children: highlightedLines,
          });
        }

        return React.cloneElement(codeEl, {
          className: cn(
            codeEl.props.className,
            showLineNumbers && "data-line-numbers",
          ),
          children: codeEl.props.children,
        });
      }

      // Recursively process other elements
      if (child.props && child.props.children) {
        return React.cloneElement(child as React.ReactElement, {
          ...child.props,
          children: React.Children.map(child.props.children, processChild),
        });
      }

      return child;
    };

    return React.Children.map(children, processChild);
  }, [children, showLineNumbers, highlightLines]);

  return (
    <Collapsible
      open={isOpened}
      onOpenChange={setIsOpened}
      className={cn(
        "group relative w-full overflow-hidden rounded-md border bg-card text-card-foreground shadow-md transition-all duration-300",
        "data-[state=open]:shadow-lg",
        className,
      )}
      {...props}
    >
      {/* Background pattern */}
      <div
        className={cn(
          "absolute inset-0 size-full opacity-30",
          "bg-[radial-gradient(#00000015_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff15_1px,transparent_1px)]",
          "code-bg [background-size:16px_16px]",
        )}
        aria-hidden="true"
      />

      {/* Header with filename or language indicator */}
      <div className="relative z-10 flex items-center justify-between border-b bg-card/80 backdrop-blur-sm px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          {fileName ? (
            <span className="text-sm font-medium text-muted-foreground">
              {fileName}
            </span>
          ) : (
            <div className="flex items-center gap-1.5">
              <Code className="size-3.5 text-muted-foreground" />
              <span className="text-xs uppercase tracking-wider text-muted-foreground/70">
                {language}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {rawCode && (
            <CopyButton
              value={rawCode}
              variant="ghost"
              className="opacity-70 hover:opacity-100 transition-opacity h-7 w-7"
            />
          )}
        </div>
      </div>

      {/* Code content */}
      <CollapsibleContent
        forceMount
        className="relative z-10 h-[500px] transition-all duration-300"
      >
        <div
          className={cn(
            "h-full",
            isOpened
              ? "overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/10 hover:scrollbar-thumb-muted-foreground/20"
              : "overflow-hidden",
            "[&_pre]:my-0 [&_pre]:py-4 [&_pre]:h-full",
            showLineNumbers && "[&_pre]:data-line-numbers",
            isOpened ? "[&_pre]:overflow-auto" : "[&_pre]:overflow-hidden",
          )}
        >
          {processedChildren}
        </div>
      </CollapsibleContent>

      {/* Always visible expand/collapse button */}
      <div className="relative z-20 flex justify-center border-t bg-card/80 backdrop-blur-sm py-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <CollapsibleTrigger asChild>
                <Button
                  variant="secondary"
                  size="sm"
                  className="text-xs h-7 px-3 gap-1.5 group-hover:shadow-sm transition-all"
                >
                  {isOpened ? (
                    <>
                      <Minimize2Icon className="size-3" />
                      Collapse Code
                    </>
                  ) : (
                    <>
                      <Maximize2Icon className="size-3" />
                      {expandButtonTitle}
                    </>
                  )}
                </Button>
              </CollapsibleTrigger>
            </TooltipTrigger>
            <TooltipContent>
              {isOpened ? "Collapse code" : expandButtonTitle}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </Collapsible>
  );
}
