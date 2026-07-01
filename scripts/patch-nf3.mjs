// Workaround for a nitro (beta) bug: nf3 bundles a CJS-only @vercel/nft
// whose named exports use Object.defineProperty(...) getters. Neither
// Node's nor rolldown's CJS->ESM interop detects getter-defined exports as
// named exports, so `import { nodeFileTrace } from "@vercel/nft"` fails
// during `vite build` (nitro vercel preset). This rewrites the getter to a
// plain assignment, which both interop layers detect correctly.
// Runs on postinstall since node_modules/nf3 is reinstalled/overwritten on
// every `npm install`.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));
const target = join(root, "node_modules/nf3/dist/node_modules/@vercel/nft/out/index.js");

if (!existsSync(target)) {
  // nf3/vercel preset not installed in this environment — nothing to patch.
  process.exit(0);
}

const original = readFileSync(target, "utf-8");
const pattern = /Object\.defineProperty\(exports,\s*"nodeFileTrace",\s*\{\s*enumerable:\s*!0,\s*get:\s*function\s*\(\)\s*\{\s*return\s*(\w+)\.nodeFileTrace\s*\}\s*\}\)/;
const match = original.match(pattern);

if (!match) {
  console.log("[patch-nf3] pattern not found (already patched, or nf3 internals changed) — skipping.");
  process.exit(0);
}

const patched = original.replace(pattern, `exports.nodeFileTrace = ${match[1]}.nodeFileTrace`);
writeFileSync(target, patched);
console.log("[patch-nf3] patched @vercel/nft named export for rolldown/Node CJS interop.");
