import { Registry } from "@/registry/schema";

export const lib: Registry = [
  {
    name: "utils",
    type: "registry:lib",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "default/lib/utils.ts",
        type: "registry:lib",
      },
    ],
  },
];
