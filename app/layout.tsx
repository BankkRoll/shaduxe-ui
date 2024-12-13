import "@/styles/globals.css";
import "@/styles/mdx.css";

import { cn, constructMetadata } from "@/lib/utils";

import { Metadata } from "next";
import { PHProvider } from "@/components/posthog-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Viewport } from "next";
import { fontSans } from "@/lib/fonts";

export const metadata: Metadata = constructMetadata({
  title: "shaduxe/ui",
  description:
    "Beautifully designed, expertly crafted component variants. The perfect extension for your shadcn/ui components.",
  image: "https://ui.shaduxe.com/og-meta.png",
});

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "relative flex min-h-screen w-full flex-col justify-center overflow-x-hidden scroll-smooth bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <PHProvider>
          <ThemeProvider attribute="class" defaultTheme="system">
            <TooltipProvider>
              {children}
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </PHProvider>
      </body>
    </html>
  );
}
