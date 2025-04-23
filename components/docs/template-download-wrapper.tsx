"use client";

import TemplateDownloadButton from "@/components/docs/template-download-button";

// This is a client component wrapper for the TemplateDownloadButton
// that can be safely used in MDX (server component context)
export default function TemplateDownloadWrapper({
  templateId,
  variant,
  size,
  className,
}: {
  templateId: string;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "destructive"
    | "ghost"
    | "link";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "icon";
  className?: string;
}) {
  return (
    <TemplateDownloadButton
      templateId={templateId}
      variant={variant}
      size={size}
      className={className}
    />
  );
}
