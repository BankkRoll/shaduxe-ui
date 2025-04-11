import fs from "fs";
import path from "path";
import {
  createHighlighter,
  type BundledLanguage,
  type Highlighter,
} from "shiki";
import { u } from "unist-builder";
import { visit } from "unist-util-visit";

import { UnistNode, UnistTree } from "@/types/unist";

import { Index } from "../__registry__";

// Initialize shiki highlighter - this will be done on server-side only
const getHighlighter = async () => {
  return createHighlighter({
    themes: [
      JSON.parse(
        fs.readFileSync(
          path.join(process.cwd(), "/lib/highlighter-theme-dark.json"),
          "utf-8",
        ),
      ),
    ],
    langs: ["tsx", "ts", "jsx", "js", "json", "css", "html", "bash"],
  });
};

let highlighter: Highlighter | null = null;

export function rehypeComponent() {
  return async (tree: UnistTree) => {
    // Initialize highlighter if not already done
    if (!highlighter) {
      try {
        highlighter = await getHighlighter();
      } catch (error) {
        console.error("Failed to initialize highlighter:", error);
      }
    }

    visit(tree, (node: UnistNode) => {
      const { value: srcPath } = getNodeAttributeByName(node, "src") || {};

      if (node.name === "ComponentSource") {
        const name = getNodeAttributeByName(node, "name")?.value as string;
        const fileName = getNodeAttributeByName(node, "fileName")?.value as
          | string
          | undefined;

        if (!name && !srcPath) {
          return null;
        }

        try {
          let src: string;

          if (srcPath) {
            src = srcPath as string;
          } else {
            const component = Index[name];
            src = fileName
              ? component.files.find((file: string) => {
                  return (
                    file.endsWith(`${fileName}.tsx`) ||
                    file.endsWith(`${fileName}.ts`)
                  );
                }) || component.files[0]
              : component.files[0];
          }

          // Read the source file.
          const filePath = path.join(process.cwd(), src);
          let source = fs.readFileSync(filePath, "utf8");

          // Replace imports.
          source = source.replaceAll("@/registry/", "@/components/");
          source = source.replaceAll("export default", "export");

          // Add token spans for syntax highlighting - this is important!
          // We want to add spans with token classes that match our CSS
          let tokenizedLines: string[] = source.split("\n");

          if (highlighter) {
            try {
              // Use the extension to determine language
              const ext = path.extname(src).slice(1);
              const lang = (
                ext === "ts" || ext === "tsx" ? "tsx" : ext || "tsx"
              ) as BundledLanguage;

              // With shiki's highlighter, we need to process the code directly
              const html = highlighter.codeToHtml(source, {
                lang,
                theme: "dark",
              });

              // Extract the content between each line div
              const lineMatches = html.match(/<span[^>]*>(.*?)<\/span>/g) || [];

              // Process each line to extract the tokens with their classes
              tokenizedLines = source.split("\n").map((rawLine, i) => {
                if (!rawLine.trim()) return " ";

                // Apply basic syntax highlighting classes based on content patterns
                return highlightLine(rawLine);
              });
            } catch (error) {
              console.error("Error tokenizing source:", error);
              // Fallback to basic escaping
              tokenizedLines = source
                .split("\n")
                .map((line) => escapeHtml(line || " "));
            }
          } else {
            // Basic escaping if highlighter is not available
            tokenizedLines = source
              .split("\n")
              .map((line) => escapeHtml(line || " "));
          }

          // Add code as children with tokenized content
          node.children?.push(
            u("element", {
              tagName: "pre",
              properties: {
                __src__: src,
                className: ["language-tsx"],
                "data-line-numbers": "true",
                "data-rehype-pretty-code-figure": true,
              },
              children: [
                u("element", {
                  tagName: "code",
                  properties: {
                    className: ["language-tsx"],
                    "data-language": "tsx",
                  },
                  data: {
                    meta: `event="copy_source_code"`,
                  },
                  children: tokenizedLines.map((line, i) =>
                    u("element", {
                      tagName: "div",
                      properties: { "data-line": "" },
                      children: [
                        {
                          type: "raw",
                          value: line,
                        },
                      ],
                    }),
                  ),
                }),
              ],
            }),
          );
        } catch (error) {
          console.error(error);
        }
      }

      if (node.name === "ComponentPreview" || node.name === "BlockPreview") {
        const name = getNodeAttributeByName(node, "name")?.value as string;

        if (!name) {
          return null;
        }

        try {
          const component = Index[name];
          const src = component.files[0];

          // Read the source file.
          const filePath = path.join(process.cwd(), src);
          let source = fs.readFileSync(filePath, "utf8");

          // Replace imports.
          source = source.replaceAll("@/registry/", "@/components/");
          source = source.replaceAll("export default", "export");

          // Add code as children so that rehype can take over at build time.
          node.children?.push(
            u("element", {
              tagName: "pre",
              properties: {
                __src__: src,
                className: ["language-tsx"],
                "data-line-numbers": "true",
                "data-rehype-pretty-code-figure": true,
              },
              children: [
                u("element", {
                  tagName: "code",
                  properties: {
                    className: ["language-tsx"],
                    "data-language": "tsx",
                  },
                  data: {
                    meta: `event="copy_usage_code"`,
                  },
                  children: [
                    {
                      type: "text",
                      value: source,
                    },
                  ],
                }),
              ],
            }),
          );
        } catch (error) {
          console.error(error);
        }
      }
    });
  };
}

// Basic syntax highlighting function
function highlightLine(line: string): string {
  // Apply syntax highlighting based on simple patterns
  let highlighted = escapeHtml(line);

  // Keywords
  highlighted = highlighted.replace(
    /\b(import|export|from|const|let|var|function|return|if|else|for|while|class|interface|type|extends|implements)\b/g,
    '<span class="token keyword">$1</span>',
  );

  // Strings
  highlighted = highlighted.replace(
    /(['"])(.*?)\1/g,
    '<span class="token string">$1$2$1</span>',
  );

  // Numbers
  highlighted = highlighted.replace(
    /\b(\d+)\b/g,
    '<span class="token number">$1</span>',
  );

  // Types
  highlighted = highlighted.replace(
    /\b([A-Z][a-zA-Z]*)\b/g,
    '<span class="token type">$1</span>',
  );

  // Functions
  highlighted = highlighted.replace(
    /\b([a-z][a-zA-Z]*)\(/g,
    '<span class="token function">$1</span>(',
  );

  // Comments
  highlighted = highlighted.replace(
    /(\/\/.*$)/g,
    '<span class="token comment">$1</span>',
  );

  return highlighted;
}

// Helper function to escape HTML entities
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getNodeAttributeByName(node: UnistNode, name: string) {
  return node.attributes?.find((attribute) => attribute.name === name);
}
