import { Registry } from "@/registry/schema";

export const ui: Registry = [
  {
    name: "accordion",
    type: "registry:ui",
    title: "Accordion",
    description:
      "A vertically stacked set of headers that each contain a title, content, and controls.",
    author: "shaduxe-ui",
    dependencies: [
      "@radix-ui/react-accordion",
      "class-variance-authority",
      "lucide-react",
    ],
    files: ["default/ui/accordion.tsx"],
    cssVars: {
      theme: {
        "--animate-accordion-down": "accordion-down 0.2s ease-out",
        "--animate-accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    css: {
      "@keyframes accordion-down": {
        from: { height: 0 },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "@keyframes accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: 0 },
      },
    },
  },
  {
    name: "alert",
    type: "registry:ui",
    title: "Alert",
    description: "A component that displays a message to the user.",
    author: "shaduxe-ui",
    dependencies: ["class-variance-authority"],
    files: ["default/ui/alert.tsx"],
  },
  {
    name: "avatar",
    type: "registry:ui",
    title: "Avatar",
    description: "An image element with a fallback for representing the user.",
    author: "shaduxe-ui",
    dependencies: ["@radix-ui/react-avatar", "class-variance-authority"],
    files: ["default/ui/avatar.tsx"],
  },
  {
    name: "badge",
    type: "registry:ui",
    title: "Badge",
    description: "A label that can be used to indicate a status or category.",
    author: "shaduxe-ui",
    dependencies: ["class-variance-authority"],
    files: ["default/ui/badge.tsx"],
  },
  {
    name: "button",
    type: "registry:ui",
    title: "Button",
    description: "Interactive button with multiple variants and animations.",
    author: "shaduxe-ui",
    dependencies: ["@radix-ui/react-slot", "class-variance-authority"],
    files: ["default/ui/button.tsx"],
  },
  {
    name: "card",
    type: "registry:ui",
    title: "Card",
    description: "Card component with various styles.",
    author: "shaduxe-ui",
    dependencies: ["class-variance-authority"],
    files: ["default/ui/card.tsx"],
  },
  {
    name: "input",
    type: "registry:ui",
    title: "Input",
    description: "Form input component with various styles and icon support.",
    author: "shaduxe-ui",
    dependencies: ["@radix-ui/react-slot", "class-variance-authority"],
    files: ["default/ui/input.tsx"],
  },
  {
    name: "mode-toggle",
    type: "registry:ui",
    title: "Mode Toggle",
    description: "A toggle for switching between light and dark modes.",
    author: "shaduxe-ui",
    dependencies: ["next-themes", "@radix-ui/react-icons"],
    registryDependencies: ["button"],
    files: ["default/ui/mode-toggle.tsx"],
  },
  {
    name: "switch",
    type: "registry:ui",
    title: "Switch",
    description:
      "A control that allows the user to toggle between checked and not checked.",
    author: "shaduxe-ui",
    dependencies: [
      "@radix-ui/react-switch",
      "class-variance-authority",
      "lucide-react",
    ],
    files: ["default/ui/switch.tsx"],
  },
  {
    name: "tabs",
    type: "registry:ui",
    title: "Tabs",
    description:
      "A set of layered sections of content that display one panel at a time.",
    author: "shaduxe-ui",
    dependencies: ["@radix-ui/react-tabs", "class-variance-authority"],
    files: ["default/ui/tabs.tsx"],
  },
];
