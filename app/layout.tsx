import "@/styles/globals.css";

import { cn, constructMetadata } from "@/lib/utils";

import { PHProvider } from "@/components/layout/posthog-provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Viewport } from "next";
import { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

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
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
        />
      </head>
      <body
        className={cn(
          "relative flex min-h-screen w-full flex-col justify-center overflow-x-hidden scroll-smooth bg-background font-sans antialiased",
          GeistSans.className,
        )}
      >
        <PHProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
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
