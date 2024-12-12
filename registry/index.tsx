import { Registry } from "./schema";
import { examples } from "./registry-examples";
import { lib } from "./registry-lib";
import { ui } from "./registry-ui";

export const registry: Registry = [...ui, ...examples, ...lib];
