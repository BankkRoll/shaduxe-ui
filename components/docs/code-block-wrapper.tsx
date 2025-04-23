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
  const [codeContent, setCodeContent] = React.useState<string>("");
  const codeRef = React.useRef<HTMLDivElement>(null);

  // Extract code content from children or DOM for the copy button
  React.useEffect(() => {
    // More robust code extraction
    const extractCode = () => {
      if (!codeRef.current) return;

      try {
        // First try: get code from <code> element (most common)
        const codeElement = codeRef.current.querySelector("code");
        if (codeElement?.textContent) {
          setCodeContent(codeElement.textContent);
          return;
        }

        // Second try: get code from <pre> element
        const preElement = codeRef.current.querySelector("pre");
        if (preElement?.textContent) {
          setCodeContent(preElement.textContent);
          return;
        }

        // Last resort: get all text content
        setCodeContent(codeRef.current.textContent || "");
      } catch (err) {
        console.error("Failed to extract code for copy:", err);
      }
    };

    // Initial extraction
    extractCode();

    // Use a more efficient approach with delayed observer
    const timer = setTimeout(() => {
      extractCode();

      // Only set up observer if content wasn't found initially
      if (!codeContent) {
        const observer = new MutationObserver(() => {
          extractCode();
        });

        if (codeRef.current) {
          observer.observe(codeRef.current, {
            childList: true,
            subtree: true,
            characterData: true,
          });
        }

        return () => observer.disconnect();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [children, codeContent]);

  // Process and add line numbers when the component mounts or when code content changes
  React.useEffect(() => {
    if (!codeRef.current || !showLineNumbers) return;

    const preElement = codeRef.current.querySelector("pre");
    const codeElement = preElement?.querySelector("code");

    if (preElement && codeElement) {
      // Add line-numbers class for styling
      preElement.classList.add("line-numbers");

      // Only process if we don't already have line numbers
      if (!preElement.querySelector(".line-numbers-rows")) {
        const linesCount = (codeContent.match(/\n/g) || []).length + 1;

        // Create the line numbers container
        const lineNumbersContainer = document.createElement("span");
        lineNumbersContainer.className = "line-numbers-rows";

        // Add line number spans
        for (let i = 0; i < linesCount; i++) {
          const lineSpan = document.createElement("span");
          lineNumbersContainer.appendChild(lineSpan);
        }

        // Append to the pre element
        preElement.appendChild(lineNumbersContainer);
      }

      // Add data attribute for styling
      preElement.setAttribute("data-line-numbers", "true");
    }
  }, [codeContent, showLineNumbers]);

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
          <CopyButton
            value={codeContent}
            variant="ghost"
            className="opacity-100 h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
          />
        </div>
      </div>

      {/* Code content */}
      <CollapsibleContent
        forceMount
        className={cn(
          "relative z-10 transition-all duration-300",
          isOpened ? "max-h-[900px]" : "max-h-[500px]",
        )}
      >
        <div
          ref={codeRef}
          className={cn(
            "h-full w-full",
            isOpened
              ? "overflow-y-auto  h-[500px] scrollbar scrollbar-track-transparent scrollbar-thumb-muted-foreground/10 hover:scrollbar-thumb-muted-foreground/20"
              : "overflow-y-hidden h-[500px]",
            "overflow-x-auto",
            "[&_pre]:my-0 [&_pre]:px-4 [&_pre]:py-4 [&_pre]:min-h-[500px]",
            "[&_pre]:bg-transparent [&_code]:whitespace-pre",
            `language-${language}`,
          )}
          data-rehype-pretty-code-fragment=""
        >
          {children}
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
