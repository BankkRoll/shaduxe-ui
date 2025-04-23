"use client";

import { Button, ButtonProps } from "@/components/ui/button";

// Client component wrapper for Button that can be safely used in MDX
export default function ClientButton(props: ButtonProps) {
  return <Button {...props} />;
}
