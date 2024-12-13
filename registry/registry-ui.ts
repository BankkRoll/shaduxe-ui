import { Registry } from "@/registry/schema";

export const ui: Registry = [
  {
    name: "button",
    type: "registry:ui",
    files: ["ui/button.tsx"],
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
    name: "tabs",
    type: "registry:ui",
    files: ["ui/tabs.tsx"],
  },
  {
    name: "switch",
    type: "registry:ui",
    files: ["ui/switch.tsx"],
  },
  {
    name: "avatar",
    type: "registry:ui",
    files: ["ui/avatar.tsx"],
  },
];
