import { Registry } from "./schema";
import { blocks } from "./registry-blocks";
import { examples } from "./registry-examples";
import { lib } from "./registry-lib";
import { ui } from "./registry-ui";

export const registry: Registry = [...ui, ...examples, ...blocks, ...lib];
