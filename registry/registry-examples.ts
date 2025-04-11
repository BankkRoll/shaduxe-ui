import { Registry } from "@/registry/schema";

export const examples: Registry = [
  {
    name: "avatar-demo",
    type: "registry:ui",
    title: "Avatar Demo",
    description: "Examples showcasing avatar component variants and sizes.",
    author: "shaduxe-ui",
    files: ["default/example/avatar-demo.tsx"],
    registryDependencies: ["avatar"],
  },
  {
    name: "badge-demo",
    type: "registry:ui",
    title: "Badge Demo",
    description: "Examples showcasing badge component variants and sizes.",
    author: "shaduxe-ui",
    files: ["default/example/badge-demo.tsx"],
    registryDependencies: ["badge"],
  },
  {
    name: "button-demo",
    type: "registry:ui",
    title: "Button Demo",
    description:
      "Examples showcasing button component variants, sizes, and icon placements.",
    author: "shaduxe-ui",
    files: ["default/example/button-demo.tsx"],
    registryDependencies: ["button"],
    dependencies: ["lucide-react"],
  },
  {
    name: "card-demo",
    type: "registry:ui",
    title: "Card Demo",
    description: "Examples showcasing card component variants and sizes.",
    author: "shaduxe-ui",
    files: ["default/example/card-demo.tsx"],
    registryDependencies: ["card"],
  },
  {
    name: "input-demo",
    type: "registry:ui",
    title: "Input Demo",
    description:
      "Examples showcasing input component variants, sizes, and icon integrations.",
    author: "shaduxe-ui",
    files: ["default/example/input-demo.tsx"],
    registryDependencies: ["input"],
    dependencies: ["lucide-react"],
  },
  {
    name: "switch-demo",
    type: "registry:ui",
    title: "Switch Demo",
    description:
      "Examples showcasing switch component variants, sizes, and thumb variations.",
    author: "shaduxe-ui",
    files: ["default/example/switch-demo.tsx"],
    registryDependencies: ["switch"],
  },
  {
    name: "tabs-demo",
    type: "registry:ui",
    title: "Tabs Demo",
    description:
      "Examples showcasing tabs component with different visual styles and layouts.",
    author: "shaduxe-ui",
    files: ["default/example/tabs-demo.tsx"],
    registryDependencies: ["tabs"],
  },
  {
    name: "button-installation-example",
    type: "registry:ui",
    title: "Button Installation Example",
    description: "Example showing how to install and use the button component.",
    author: "shaduxe-ui",
    files: ["default/example/button-installation-example.tsx"],
    dependencies: ["motion"],
    registryDependencies: ["button"],
  },
];
