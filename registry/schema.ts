import { z } from "zod";

/**
 * Schema definitions for component registry
 * Based on the shadcn registry specification with custom extensions for Shaduxe-UI
 */

// File schema - Used to define files within registry items
export const fileSchema = z.object({
  path: z.string().describe("Relative path to the file in the registry"),
  type: z
    .string()
    .optional()
    .describe("Type of the file (e.g., registry:component, registry:hook)"),
  target: z
    .string()
    .optional()
    .describe("Where the file should be placed in a project"),
  content: z
    .string()
    .optional()
    .describe("Content of the file when generated directly"),
});

// CSS Variables schema - For defining CSS variables in light/dark mode and theme
export const cssVarsSchema = z.object({
  theme: z
    .record(z.string())
    .optional()
    .describe("Theme variables like font-heading, spacing, etc"),
  light: z
    .record(z.string())
    .optional()
    .describe("Light mode specific variables"),
  dark: z
    .record(z.string())
    .optional()
    .describe("Dark mode specific variables"),
});

// Tailwind configuration schema
export const tailwindSchema = z.object({
  config: z
    .record(z.any())
    .optional()
    .describe("Tailwind configuration like theme extensions"),
});

/**
 * Variant item schema - For component variants
 *
 * Used to define different variations of components like:
 * - Button variants: default, destructive, outline, secondary, ghost, link, etc.
 * - Input variants: default, pill, underline, etc.
 * - Avatar variants: default, circle, square, etc.
 * - Tab variants: default, underline, pill, etc.
 *
 * Each variant has a name, description, and component reference
 */
export const variantItemSchema = z.object({
  name: z.string().describe("Display name of the variant"),
  description: z.string().describe("Description of what this variant does"),
  component: z.any().describe("Component reference for the variant"),
});

/**
 * Registry item schema for individual components
 *
 * This is the main schema for defining components in the registry.
 * It supports both simple components and complex ones with variants.
 *
 * Example format for components with variants:
 * ```tsx
 * export const buttonVariants = {
 *   default: ButtonDemo,
 *   destructive: ButtonDestructive,
 *   outline: ButtonOutline,
 *   // etc...
 * };
 * ```
 */
export const registryItemSchema = z.object({
  name: z.string().describe("Unique identifier for the registry item"),
  type: z
    .union([
      z.literal("registry:ui"),
      z.literal("registry:block"),
      z.literal("registry:lib"),
      z.literal("registry:hook"),
      z.literal("registry:page"),
      z.literal("registry:file"),
      z.literal("registry:style"),
      z.literal("registry:theme"),
    ])
    .describe("Type of registry item"),
  description: z
    .string()
    .optional()
    .describe("Description of the registry item"),
  title: z
    .string()
    .optional()
    .describe("Human-readable title for the registry item"),
  author: z.string().optional().describe("Author of the registry item"),
  dependencies: z
    .array(z.string())
    .optional()
    .describe("NPM package dependencies"),
  registryDependencies: z
    .array(z.string())
    .optional()
    .describe("Other registry items this depends on"),
  files: z
    .array(z.union([z.string(), fileSchema]))
    .optional()
    .describe("Files included in this registry item"),
  cssVars: cssVarsSchema
    .optional()
    .describe("CSS variables for this registry item"),
  css: z
    .record(z.any())
    .optional()
    .describe("CSS rules to add (@layer, @keyframes, etc)"),
  tailwind: tailwindSchema.optional().describe("Tailwind configuration"),
  docs: z
    .string()
    .optional()
    .describe("Custom documentation or message shown when installing"),
  categories: z
    .array(z.string())
    .optional()
    .describe("Categories for organizing registry items"),
  meta: z.record(z.any()).optional().describe("Additional metadata"),
  // Custom extensions for variants support (Shaduxe-UI specific)
  variants: z
    .record(variantItemSchema)
    .optional()
    .describe(
      "Component variants map where keys are variant names and values are variant items",
    ),
  extends: z
    .string()
    .optional()
    .describe("Base style this extends, or 'none' to start fresh"),
});

/**
 * Registry schema - For defining the entire collection of components
 * Used for validating the registry definition during build
 */
export const registrySchema = z.array(registryItemSchema);

/**
 * Registry item content schema - For the built registry JSON files
 * Extends registryItemSchema with content for each file
 */
export const registryItemContentSchema = registryItemSchema.extend({
  $schema: z.string().optional(),
  files: z
    .array(
      fileSchema.extend({
        content: z.string().optional(),
      }),
    )
    .optional(),
});

/**
 * Registry index schema - For the main registry index file
 * This is the top-level schema that lists all registry items
 */
export const registryIndexSchema = z.object({
  name: z.string().describe("Name of the registry"),
  homepage: z.string().describe("Homepage URL for the registry"),
  items: z
    .array(
      z.object({
        name: z.string().describe("Name of the registry item"),
        type: z.string().describe("Type of the registry item"),
        description: z
          .string()
          .optional()
          .describe("Description of the registry item"),
        title: z
          .string()
          .optional()
          .describe("Human-readable title for the registry item"),
        registryDependencies: z
          .array(z.string())
          .optional()
          .describe("Other registry items this depends on"),
        files: z
          .array(
            z.object({
              path: z.string().describe("Path to the file"),
              type: z.string().optional().describe("Type of the file"),
              target: z
                .string()
                .optional()
                .describe("Target path for the file"),
            }),
          )
          .optional()
          .describe("Files included in this registry item"),
      }),
    )
    .describe("List of registry items"),
});

// Types derived from schemas
export type File = z.infer<typeof fileSchema>;
export type CssVars = z.infer<typeof cssVarsSchema>;
export type Tailwind = z.infer<typeof tailwindSchema>;
export type VariantItem = z.infer<typeof variantItemSchema>;
export type RegistryItem = z.infer<typeof registryItemSchema>;
export type RegistryItemContent = z.infer<typeof registryItemContentSchema>;
export type RegistryIndex = z.infer<typeof registryIndexSchema>;
export type Registry = z.infer<typeof registrySchema>;
