"use client";

import * as React from "react";

import { Button, ButtonProps } from "@/components/ui/button";
import { CheckIcon, ClipboardIcon } from "lucide-react";
import { Event, trackEvent } from "@/lib/events";
import { cn } from "@/lib/utils";

/**
 * Helper function to copy text to clipboard with optional event tracking
 */
export async function copyToClipboardWithMeta(value: string, event?: Event) {
  navigator.clipboard.writeText(value);
  if (event) {
    trackEvent(event);
  }
}

interface CopyButtonProps extends ButtonProps {
  value: string;
  src?: string;
  event?: Event["name"];
  classNames?: string; // Optional class names to copy instead of value
}

/**
 * Simple copy button component that handles copying text to clipboard
 */
export function CopyButton({
  value,
  className,
  src = "",
  classNames,
  variant = "ghost",
  event,
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  const handleCopy = React.useCallback(() => {
    const textToCopy = classNames || value;

    copyToClipboardWithMeta(
      textToCopy,
      event
        ? {
            name: event,
            properties: {
              name: src,
              code: textToCopy,
            },
          }
        : undefined,
    );
    setHasCopied(true);
  }, [value, classNames, event, src]);

  return (
    <Button
      size="icon"
      variant={variant}
      className={cn(
        "relative z-10 size-7 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground [&_svg]:size-3.5",
        className,
      )}
      onClick={handleCopy}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
    </Button>
  );
}
