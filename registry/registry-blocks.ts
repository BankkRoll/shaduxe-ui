import { Registry } from "@/registry/schema";

export const blocks: Registry = [
  {
    name: "pricing-one",
    type: "registry:block",
    files: ["blocks/pricing-one.tsx"],
    dependencies: ["framer-motion", "lucide-react"],
  },
  {
    name: "pricing-two",
    type: "registry:block",
    files: ["blocks/pricing-two.tsx"],
    dependencies: ["framer-motion", "lucide-react"],
  },
  {
    name: "pricing-three",
    type: "registry:block",
    files: ["blocks/pricing-three.tsx"],
    dependencies: ["framer-motion", "lucide-react"],
  },
];
