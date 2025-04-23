"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { Download, ExternalLink, Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface TemplateDownloadButtonProps {
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
  previewUrl?: string;
}

export default function TemplateDownloadButton({
  templateId,
  variant = "default",
  size = "md",
  className = "",
  previewUrl,
}: TemplateDownloadButtonProps) {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [templatePrice, setTemplatePrice] = useState<number | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function checkAccess() {
      setIsLoading(true);

      // Get current user
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      setUser(currentUser);

      // Get template price
      const { data: template } = await supabase
        .from("templates")
        .select("price")
        .eq("id", templateId)
        .single();

      setTemplatePrice(template?.price || null);

      if (!currentUser) {
        setHasAccess(false);
        setIsLoading(false);
        return;
      }

      // Check for lifetime access
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("has_lifetime_access")
        .eq("user_id", currentUser.id)
        .single();

      if (profile?.has_lifetime_access) {
        setHasAccess(true);
        setIsLoading(false);
        return;
      }

      // Check for specific template access
      const { data: templateAccess } = await supabase
        .from("user_templates")
        .select("*")
        .eq("user_id", currentUser.id)
        .eq("template_id", templateId)
        .single();

      setHasAccess(!!templateAccess);
      setIsLoading(false);
    }

    checkAccess();
  }, [templateId, supabase]);

  const handlePurchase = async () => {
    if (!user) {
      router.push("/auth/sign-in");
      return;
    }

    try {
      setIsPurchasing(true);
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user,
          productType: "template",
          productId: templateId,
        }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("Failed to initiate purchase. Please try again.");
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleDownload = async () => {
    if (!user) {
      router.push("/auth/sign-in");
      return;
    }

    if (!hasAccess) {
      handlePurchase();
      return;
    }

    try {
      setIsDownloading(true);

      const response = await fetch("/api/template-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to download template");
      }

      const { archive, fileName } = await response.json();

      // Convert base64 to blob
      const binaryStr = window.atob(archive);
      const len = binaryStr.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: "application/zip" });

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("Download started successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download template. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <Button variant={variant} size={size} className={className} disabled>
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        Loading...
      </Button>
    );
  }

  // If we have a preview URL, show the preview button
  if (previewUrl) {
    return (
      <Button
        variant="secondary"
        size={size}
        className={className}
        onClick={() => window.open(previewUrl, "_blank")}
      >
        <ExternalLink className="h-4 w-4 mr-2" />
        Live Preview
      </Button>
    );
  }

  // If user has access (either lifetime or individual), show download button
  if (hasAccess) {
    return (
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={handleDownload}
        disabled={isDownloading}
      >
        {isDownloading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Downloading...
          </>
        ) : (
          <>
            <Download className="h-4 w-4 mr-2" />
            Download Template
          </>
        )}
      </Button>
    );
  }

  // If no access, show purchase button with price
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handlePurchase}
      disabled={isPurchasing}
    >
      {isPurchasing ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <Lock className="h-4 w-4 mr-2" />
          {templatePrice
            ? `Purchase Template $${(templatePrice / 100).toFixed(2)}`
            : "Purchase Template"}
        </>
      )}
    </Button>
  );
}
