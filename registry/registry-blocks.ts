import { Registry } from "@/registry/schema";

export const blocks: Registry = [
  {
    name: "pricing-one",
    type: "registry:block",
    title: "Pricing Table",
    description:
      "A pricing component with feature comparison table and responsive layout.",
    author: "shaduxe-ui",
    files: ["default/blocks/pricing-one.tsx"],
    dependencies: ["motion", "lucide-react"],
    registryDependencies: ["badge", "button"],
    categories: ["marketing", "pricing"],
  },
  {
    name: "pricing-two",
    type: "registry:block",
    title: "Featured Pricing Card",
    description:
      "An animated single card pricing component with feature lists and call-to-action.",
    author: "shaduxe-ui",
    files: ["default/blocks/pricing-two.tsx"],
    dependencies: ["motion", "lucide-react"],
    registryDependencies: ["card", "button", "separator"],
    categories: ["marketing", "pricing"],
  },
  {
    name: "pricing-three",
    type: "registry:block",
    title: "Pricing Cards",
    description:
      "A three-column pricing card layout with feature lists and highlight for primary plan.",
    author: "shaduxe-ui",
    files: ["default/blocks/pricing-three.tsx"],
    dependencies: ["motion", "lucide-react"],
    registryDependencies: ["card", "badge", "button"],
    categories: ["marketing", "pricing"],
  },
];
