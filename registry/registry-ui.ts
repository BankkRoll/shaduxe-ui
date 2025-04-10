import { Registry } from "@/registry/schema";

export const ui: Registry = [
  {
    name: "avatar",
    type: "registry:ui",
    title: "Avatar",
    description: "An image element with a fallback for representing the user.",
    author: "shaduxe-ui",
    files: ["default/ui/avatar.tsx"],
  },
  {
    name: "button",
    type: "registry:ui",
    title: "Button",
    description: "Interactive button with multiple variants and animations.",
    author: "shaduxe-ui",
    files: ["default/ui/button.tsx"],
    tailwind: {
      config: {
        theme: {
          extend: {
            animation: {
              shine: "shine var(--duration) infinite linear",
            },
            keyframes: {
              shine: {
                "0%": {
                  "background-position": "0% 0%",
                },
                "50%": {
                  "background-position": "100% 100%",
                },
                to: {
                  "background-position": "0% 0%",
                },
              },
            },
          },
        },
      },
    },
  },
  {
    name: "input",
    type: "registry:ui",
    title: "Input",
    description: "Form input component with various styles and icon support.",
    author: "shaduxe-ui",
    files: ["default/ui/input.tsx"],
  },
  {
    name: "mode-toggle",
    type: "registry:ui",
    title: "Mode Toggle",
    description: "A toggle for switching between light and dark modes.",
    author: "shaduxe-ui",
    files: ["default/ui/mode-toggle.tsx"],
    dependencies: ["next-themes"],
    registryDependencies: ["button"],
  },
  {
    name: "switch",
    type: "registry:ui",
    title: "Switch",
    description:
      "A control that allows the user to toggle between checked and not checked.",
    author: "shaduxe-ui",
    files: ["default/ui/switch.tsx"],
  },
  {
    name: "tabs",
    type: "registry:ui",
    title: "Tabs",
    description:
      "A set of layered sections of content that display one panel at a time.",
    author: "shaduxe-ui",
    files: ["default/ui/tabs.tsx"],
  },
];
