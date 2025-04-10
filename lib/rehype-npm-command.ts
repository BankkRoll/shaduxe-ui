import { UnistNode, UnistTree } from "@/types/unist";
import { visit } from "unist-util-visit";

export function rehypeNpmCommand() {
  return (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      if (
        node.type !== "element" ||
        node?.tagName !== "pre" ||
        !node.properties
      ) {
        return;
      }

      const rawString = (node.properties["__rawString__"] as string) || "";

      // Check for explicit package manager commands in meta
      if (node.properties["__meta__"]) {
        const meta = node.properties["__meta__"] as string;

        // Pattern like: npm:npx command yarn:yarn command pnpm:pnpm command bun:bun command
        const npmMatch = meta.match(/npm:([^\s]+(?:\s+[^\s]+)*)/);
        const yarnMatch = meta.match(/yarn:([^\s]+(?:\s+[^\s]+)*)/);
        const pnpmMatch = meta.match(/pnpm:([^\s]+(?:\s+[^\s]+)*)/);
        const bunMatch = meta.match(/bun:([^\s]+(?:\s+[^\s]+)*)/);

        if (npmMatch || yarnMatch || pnpmMatch || bunMatch) {
          node.properties["__npmCommand__"] = npmMatch
            ? npmMatch[1]
            : rawString;
          node.properties["__yarnCommand__"] = yarnMatch
            ? yarnMatch[1]
            : rawString;
          node.properties["__pnpmCommand__"] = pnpmMatch
            ? pnpmMatch[1]
            : rawString;
          node.properties["__bunCommand__"] = bunMatch
            ? bunMatch[1]
            : rawString;
          return;
        }
      }

      // npm install.
      if (rawString.startsWith("npm install")) {
        node.properties["__npmCommand__"] = rawString;
        node.properties["__yarnCommand__"] = rawString.replace(
          "npm install",
          "yarn add",
        );
        node.properties["__pnpmCommand__"] = rawString.replace(
          "npm install",
          "pnpm add",
        );
        node.properties["__bunCommand__"] = rawString.replace(
          "npm install",
          "bun add",
        );
      }

      // npx create-.
      else if (rawString.startsWith("npx create-")) {
        node.properties["__npmCommand__"] = rawString;
        node.properties["__yarnCommand__"] = rawString.replace(
          "npx create-",
          "yarn create ",
        );
        node.properties["__pnpmCommand__"] = rawString.replace(
          "npx create-",
          "pnpm create ",
        );
        node.properties["__bunCommand__"] = rawString.replace(
          "npx",
          "bun x --bun",
        );
      }

      // npm create.
      else if (rawString.startsWith("npm create")) {
        node.properties["__npmCommand__"] = rawString;
        node.properties["__yarnCommand__"] = rawString.replace(
          "npm create",
          "yarn create",
        );
        node.properties["__pnpmCommand__"] = rawString.replace(
          "npm create",
          "pnpm create",
        );
        node.properties["__bunCommand__"] = rawString.replace(
          "npm create",
          "bun create",
        );
      }

      // npx.
      else if (
        rawString.startsWith("npx") &&
        !rawString.startsWith("npx create-")
      ) {
        node.properties["__npmCommand__"] = rawString;
        node.properties["__yarnCommand__"] = rawString.replace(
          "npx",
          "yarn dlx",
        );
        node.properties["__pnpmCommand__"] = rawString.replace(
          "npx",
          "pnpm dlx",
        );
        node.properties["__bunCommand__"] = rawString.replace("npx", "bunx");
      }

      // npm run.
      else if (rawString.startsWith("npm run")) {
        node.properties["__npmCommand__"] = rawString;
        node.properties["__yarnCommand__"] = rawString.replace(
          "npm run",
          "yarn",
        );
        node.properties["__pnpmCommand__"] = rawString.replace(
          "npm run",
          "pnpm",
        );
        node.properties["__bunCommand__"] = rawString.replace("npm run", "bun");
      }
    });
  };
}
