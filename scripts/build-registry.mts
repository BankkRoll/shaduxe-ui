// @sts-nocheck
import { promises as fs } from "fs";
import path from "path";

import { registry } from "../registry";
import { Registry, registrySchema } from "../registry/schema";

// Simple build script for the registry that just creates the necessary files
// without trying to parse code or extract variants

const cwd = process.cwd();
console.log(`Current working directory: ${cwd}`);

const PUBLIC_R_PATH = path.join(cwd, "public/r");
console.log(`Target path: ${PUBLIC_R_PATH}`);

// Check if a directory exists
async function checkDirExists(dirPath: string): Promise<boolean> {
  try {
    const stats = await fs.stat(dirPath);
    return stats.isDirectory();
  } catch (error) {
    return false;
  }
}

// Create directory if it doesn't exist
async function ensureDir(dirPath: string): Promise<void> {
  try {
    const exists = await checkDirExists(dirPath);
    if (!exists) {
      console.log(`Creating directory: ${dirPath}`);
      await fs.mkdir(dirPath, { recursive: true });
    }
  } catch (error) {
    console.error(`Error creating directory ${dirPath}:`, error);
    throw error;
  }
}

// Read file with error handling
async function readFileWithErrorHandling(filePath: string): Promise<string> {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    throw error;
  }
}

// Remove empty values (empty strings, arrays, objects) from an object
function removeEmptyValues(obj: any): any {
  if (obj === null || obj === undefined) return undefined;
  
  if (typeof obj !== 'object') return obj;
  
  if (Array.isArray(obj)) {
    const filtered = obj.filter(item => item !== null && item !== undefined)
      .map(removeEmptyValues)
      .filter(item => item !== undefined);
    return filtered.length > 0 ? filtered : undefined;
  }
  
  const result: Record<string, any> = {};
  let hasValues = false;
  
  for (const [key, value] of Object.entries(obj)) {
    const cleanValue = removeEmptyValues(value);
    
    // Skip empty strings, empty arrays, and empty objects
    if (cleanValue === undefined) continue;
    if (cleanValue === '') continue;
    if (Array.isArray(cleanValue) && cleanValue.length === 0) continue;
    if (typeof cleanValue === 'object' && Object.keys(cleanValue).length === 0) continue;
    
    result[key] = cleanValue;
    hasValues = true;
  }
  
  return hasValues ? result : undefined;
}

// Write JSON file
async function writeJsonFile(filePath: string, data: any): Promise<void> {
  try {
    await ensureDir(path.dirname(filePath));
    
    // Clean the data to remove empty values
    const cleanedData = removeEmptyValues(data);
    const content = JSON.stringify(cleanedData, null, 2);
    
    console.log(`Writing file: ${filePath}`);
    await fs.writeFile(filePath, content, "utf-8");
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error);
    throw error;
  }
}

// Convert file paths for public registry format (remove file extensions)
function getNormalizedPublicPath(filePath: string): string {
  // Remove .tsx and .ts extensions for public registry paths
  return filePath.replace(/\.(tsx|ts)$/, '');
}

// Extract variants from component file content
function extractVariants(content: string): Record<string, any> {
  const variants: Record<string, any> = {};
  
  // Look for exported variants object
  // Match patterns like: export const avatarVariants = { default: AvatarDemo, circle: AvatarCircle, ... }
  const variantsMatch = content.match(/export const ([a-zA-Z]+)Variants\s*=\s*{([^}]*)}/s);
  
  if (variantsMatch) {
    const variantName = variantsMatch[1].toLowerCase(); // e.g., "avatar" from "avatarVariants"
    const variantsContent = variantsMatch[2];
    
    // Extract all key-value pairs from the variants object
    const variantPairs = variantsContent.match(/([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_]+)/g);
    
    if (variantPairs) {
      for (const pair of variantPairs) {
        const [key, value] = pair.split(/\s*:\s*/);
        if (key && value) {
          variants[key.trim()] = {
            name: key.trim(),
            description: `${key.trim()} variant of ${variantName}`,
            component: value.trim(),
          };
        }
      }
    }
  }
  
  return variants;
}

// Build registry items based on type
async function buildRegistryItems(validatedRegistry: Registry) {
  // Group registry items by type
  const uiComponents = validatedRegistry.filter(item => item.type === "registry:ui");
  const blocks = validatedRegistry.filter(item => item.type === "registry:block");
  const examples = validatedRegistry.filter(item => item.type === "registry:ui" && item.name.includes("-demo"));
  const libs = validatedRegistry.filter(item => item.type === "registry:lib");
  
  // Create necessary directories
  await ensureDir(path.join(PUBLIC_R_PATH, "styles"));
  await ensureDir(path.join(PUBLIC_R_PATH, "lib"));
  
  // Track all extracted variants for reuse in internal registry
  const extractedVariants: Record<string, Record<string, any>> = {};
  
  // Use default style name
  const styleName = "default";
  console.log(`Processing style: ${styleName}`);
  const styleDir = path.join(PUBLIC_R_PATH, "styles", styleName);
  await ensureDir(styleDir);
  
  const styleRegistry: Record<string, any> = {};
  
  // Process UI components
  for (const item of [...uiComponents, ...examples, ...blocks]) {
    console.log(`Processing component: ${item.name}`);
    
    if (!item.files || item.files.length === 0) {
      console.log(`Skipping ${item.name} - no files`);
      continue;
    }
    
    // Get file path and read content
    const firstFile = item.files[0];
    const filePath = typeof firstFile === "string" ? firstFile : firstFile.path;
    const fullFilePath = path.join(cwd, "registry", filePath);
    
    let variants: Record<string, any> = {};
    let fileContent = "";
    
    try {
      // Read file content to extract variants
      fileContent = await readFileWithErrorHandling(fullFilePath);
      if (fileContent.trim().length === 0) {
        console.warn(`Empty file content for ${item.name}: ${fullFilePath}`);
      }
      variants = extractVariants(fileContent);
      // Store extracted variants for reuse in internal registry
      if (Object.keys(variants).length > 0) {
        extractedVariants[item.name] = variants;
      }
    } catch (error) {
      console.warn(`Couldn't extract variants from ${item.name}: ${error.message}`);
    }
    
    // Create component data for public registry with normalized paths
    const componentData = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: item.name,
      type: item.type,
      title: item.title || item.name,
      description: item.description || "",
      author: item.author || "shaduxe-ui (https://shaduxe.com)",
      dependencies: item.dependencies || [],
      registryDependencies: item.registryDependencies || [],
      // Use normalized path for public registry
      files: [{
        path: getNormalizedPublicPath(filePath),
        content: fileContent.trim() || undefined,
        type: item.type,
        target: ""
      }],
      variants: Object.keys(variants).length > 0 ? variants : undefined,
      meta: item.meta && Object.keys(item.meta).length > 0 ? item.meta : undefined,
    };
    
    // Add to style registry
    styleRegistry[item.name] = componentData;
    
    // Write component JSON file
    await writeJsonFile(path.join(styleDir, `${item.name}.json`), componentData);
  }
  
  // Process lib components separately for correct structure
  for (const item of libs) {
    console.log(`Processing lib component: ${item.name}`);
    
    if (!item.files || item.files.length === 0) {
      console.log(`Skipping ${item.name} - no files`);
      continue;
    }
    
    // Get file path and read content
    const firstFile = item.files[0];
    const filePath = typeof firstFile === "string" ? firstFile : firstFile.path;
    const fullFilePath = path.join(cwd, "registry", filePath);
    
    let fileContent = "";
    try {
      // Read file content
      fileContent = await readFileWithErrorHandling(fullFilePath);
      if (fileContent.trim().length === 0) {
        console.warn(`Empty file content for ${item.name}: ${fullFilePath}`);
      }
    } catch (error) {
      console.warn(`Couldn't read file content for ${item.name}: ${error.message}`);
    }
    
    // Create lib component data with normalized path
    const componentData = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: item.name,
      type: item.type,
      title: item.title || item.name,
      description: item.description || "",
      author: item.author || "shaduxe-ui (https://shaduxe.com)",
      dependencies: item.dependencies || [],
      registryDependencies: item.registryDependencies || [],
      files: [{
        path: getNormalizedPublicPath(filePath),
        content: fileContent.trim() || undefined,
        type: item.type,
        target: ""
      }],
      meta: item.meta && Object.keys(item.meta).length > 0 ? item.meta : undefined,
    };
    
    // Add to style registry
    styleRegistry[item.name] = componentData;
    
    // Write to lib directory according to docs
    await ensureDir(path.join(PUBLIC_R_PATH, "lib"));
    await writeJsonFile(path.join(PUBLIC_R_PATH, "lib", `${item.name}.json`), componentData);
    
    // Also write to style directory for completeness
    await writeJsonFile(path.join(styleDir, `${item.name}.json`), componentData);
  }
  
  // Write style registry index
  await writeJsonFile(path.join(styleDir, "index.json"), styleRegistry);
  
  return extractedVariants;
}

// Create __registry__/index.tsx for internal app use
async function buildInternalRegistry(validatedRegistry: Registry, extractedVariants: Record<string, Record<string, any>>) {
  console.log("Building __registry__/index.tsx for internal use");
  
  let indexTsx = `// @ts-nocheck
// This file is autogenerated by scripts/build-registry.ts
// Do not edit this file directly.
import * as React from "react"

// Helper function to safely import components
const safeLazy = (importFn) => {
  return React.lazy(() => importFn().catch(error => {
    console.error('Failed to load component:', error);
    return { default: () => React.createElement('div', {
      style: {
        padding: '1rem',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid rgba(239, 68, 68, 0.2)',
        borderRadius: '0.375rem',
        color: 'rgb(185, 28, 28)',
        fontSize: '0.875rem'
      }
    }, 'Failed to load component') }
  }))
}

export const Index: Record<string, any> = {
`;

  // Use default style name
  const styleName = "default";
  indexTsx += `  "${styleName}": {`;

  for (const item of validatedRegistry) {
    if (!item.files || item.files.length === 0) {
      continue;
    }

    const type = item.type.split(":")[1];
    
    // Get file path
    const firstFile = item.files[0];
    const filePath = typeof firstFile === "string" ? firstFile : firstFile.path;
    
    // Normalize the path to prevent "default" appearing twice
    // If filePath already has "default/" at the start, use it directly, otherwise add it
    let normalizedPath = filePath;
    if (!normalizedPath.startsWith("default/")) {
      normalizedPath = `default/${normalizedPath}`;
    }
    
    // Log the file paths for debugging
    console.log(`Processing ${item.name}:`);
    console.log(`  Original path: ${filePath}`);
    console.log(`  Normalized path: ${normalizedPath}`);
    
    // Create the import path without file extension
    const componentPath = `@/registry/${normalizedPath.replace(/\.[^.]+$/, '')}`;
    console.log(`  Import path: ${componentPath}`);
    
    // Get previously extracted variants for this component
    const variants = extractedVariants[item.name] || {};
    
    // Format variants for inclusion in the registry
    const variantsEntries = Object.entries(variants);
    let variantsCode = "{}";
    
    if (variantsEntries.length > 0) {
      variantsCode = "{\n      " + 
        variantsEntries.map(([key, value]) => {
          return `"${key}": {\n` +
            `        name: "${value.name}",\n` +
            `        description: "${value.description}",\n` +
            `        component: safeLazy(() => import("${componentPath}").then(mod => {\n` +
            `          if (mod.${value.component}) {\n` +
            `            return { default: mod.${value.component} };\n` +
            `          } else {\n` +
            `            console.error("Variant component ${value.component} not found in ${componentPath}");\n` +
            `            return { default: () => React.createElement("div", { className: "p-4 text-red-500 bg-red-50 border border-red-100 rounded" }, "Variant ${value.name} not found") };\n` +
            `          }\n` +
            `        }))\n` +
            `      }`;
        }).join(",\n      ") + 
        "\n    }";
    }
    
    // Different import strategy for different component types
    let componentImport;
    if (item.name.includes("-demo")) {
      // Demo components - try to use the default export or the first variant component
      const firstVariantKey = Object.keys(variants)[0];
      if (firstVariantKey && variants[firstVariantKey]) {
        componentImport = `safeLazy(() => import("${componentPath}").then(mod => {
        // For demo components, try to use default export first, then specific demo component
        if (mod.default) {
          return { default: mod.default };
        } else if (mod.${variants[firstVariantKey].component}) {
          return { default: mod.${variants[firstVariantKey].component} };
        } else {
          console.error("Could not find default export or ${firstVariantKey} export in ${componentPath}");
          return { default: () => React.createElement("div", { className: "p-4 text-red-500 bg-red-50 border border-red-100 rounded" }, "Component failed to load") };
        }
      }))`;
      } else {
        // No variants found, try to use default export or named export matching item name
        componentImport = `safeLazy(() => import("${componentPath}").then(mod => {
        if (mod.default) {
          return { default: mod.default };
        } else if (mod.${item.name}) {
          return { default: mod.${item.name} };
        } else {
          console.error("Could not find suitable export in ${componentPath}");
          return { default: () => React.createElement("div", { className: "p-4 text-red-500 bg-red-50 border border-red-100 rounded" }, "Component failed to load") };
        }
      }))`;
      }
    } else if (item.type === "registry:block") {
      // Block components - use default export
      componentImport = `safeLazy(() => import("${componentPath}"))`;
    } else if (item.type === "registry:lib") {
      // Lib components - handle both default and named exports
      componentImport = `safeLazy(() => import("${componentPath}").then(mod => {
        return { default: mod.default || mod };
      }))`;
    } else {
      // Regular UI components - use default export
      componentImport = `safeLazy(() => import("${componentPath}"))`;
    }
    
    // Map files to include default in the path correctly
    const resolveFiles = item.files.map(file => {
      const filePath = typeof file === "string" ? file : file.path;
      // Apply the same normalization logic
      if (!filePath.startsWith("default/")) {
        return `registry/default/${filePath}`;
      }
      return `registry/${filePath}`;
    });

    // Log the resolved files for debugging
    console.log(`  Resolved files: ${JSON.stringify(resolveFiles)}`);

    // Fix the source URL to use short form which will redirect properly
    indexTsx += `
    "${item.name}": {
      name: "${item.name}",
      type: "${item.type}",
      registryDependencies: ${JSON.stringify(item.registryDependencies || [])},
      files: ${JSON.stringify(resolveFiles)},
      component: ${componentImport},
      variants: ${variantsCode},
      source: "https://ui.shaduxe.com/r/styles/default/${item.name}.json",
      chunks: []
    },`;
  }

  indexTsx += `
  },`;

  indexTsx += `
}
`;

  // Write the index file
  const registryDir = path.join(cwd, "__registry__");
  await ensureDir(registryDir);
  await fs.writeFile(path.join(registryDir, "index.tsx"), indexTsx);
  console.log("Written __registry__/index.tsx");
}

// Build the main registry index
async function buildMainRegistry(validatedRegistry: Registry) {
  // Create the main registry index
  const mainRegistry = {
    name: "shaduxe-ui",
    homepage: "https://shaduxe.com",
    items: validatedRegistry.map(item => {
      const result: any = {
        name: item.name,
        type: item.type
      };
      
      if (item.description) result.description = item.description;
      if (item.title) result.title = item.title;
      
      if (item.registryDependencies && item.registryDependencies.length > 0) {
        result.registryDependencies = item.registryDependencies;
      }
      
      if (item.files && item.files.length > 0) {
        result.files = item.files.map(file => {
          const filePath = typeof file === "string" ? file : file.path;
          const result: any = {
            // Use normalized paths without extension for the public registry
            path: getNormalizedPublicPath(filePath)
          };
          
          if (typeof file !== "string" && file.type) {
            result.type = file.type;
          } else {
            result.type = "registry:component";
          }
          
          if (typeof file !== "string" && file.target) {
            result.target = file.target;
          }
          
          return result;
        });
      }
      
      return result;
    })
  };
  
  // Write main registry index
  await writeJsonFile(path.join(PUBLIC_R_PATH, "index.json"), mainRegistry);
  console.log("Written main registry index");
}

// Build the complete registry
async function buildRegistry() {
  try {
    // Validate registry
    const validationResult = registrySchema.safeParse(registry);
    if (!validationResult.success) {
      console.error("Registry validation failed:", validationResult.error);
      process.exit(1);
    }
    const validatedRegistry = validationResult.data;
    
    console.log(`Building registry with ${validatedRegistry.length} components...`);
    
    // Clean up existing registry files
    try {
      await ensureDir(PUBLIC_R_PATH);
      
      // Clean up and recreate the style directory
      const styleName = "default";
      const styleDir = path.join(PUBLIC_R_PATH, "styles", styleName);
      if (await checkDirExists(styleDir)) {
        const files = await fs.readdir(styleDir);
        for (const file of files) {
          await fs.unlink(path.join(styleDir, file));
        }
      }
    } catch (error) {
      console.error("Error cleaning up registry files:", error);
    }
    
    // STEP 1: Build main registry index
    console.log("STEP 1: Building main registry index");
    await buildMainRegistry(validatedRegistry);
    
    // STEP 2: Build registry items based on type and get extracted variants
    console.log("STEP 2: Building registry items and extracting variants");
    const extractedVariants = await buildRegistryItems(validatedRegistry);
    
    // STEP 3: Build internal registry with extracted variants
    console.log("STEP 3: Building internal registry");
    await buildInternalRegistry(validatedRegistry, extractedVariants);
    
    console.log("✅ Registry built successfully!");
    return true;
  } catch (error) {
    console.error("Error building registry:", error);
    return false;
  }
}

// Run the build
buildRegistry().catch(error => {
  console.error("Unhandled error:", error);
  process.exit(1);
});