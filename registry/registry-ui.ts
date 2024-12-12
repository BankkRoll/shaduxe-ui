import { Registry } from "@/registry/schema";

export const ui: Registry = [
  {
    name: "button",
    type: "registry:ui",
    files: ["ui/button.tsx"],
  },
  {
    name: "tabs",
    type: "registry:ui",
    files: ["ui/tabs.tsx"],
  },
  {
    name: "switch",
    type: "registry:ui",
    files: ["ui/switch.tsx"],
  },
];
