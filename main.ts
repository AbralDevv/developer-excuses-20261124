import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// One funny developer excuse line — single line, 1-200 chars (RULES.txt).
const EXCUSE =
  "It works on my machine — the bug only exists in production, staging, and every machine except mine.";

// Char-count gate per RULES.txt: entry must be a single line of 1-200 chars.
if (EXCUSE.length < 1 || EXCUSE.length > 200) {
  throw new Error(`excuse must be 1-200 chars, got ${EXCUSE.length}`);
}
if (EXCUSE.includes("\n") || EXCUSE.includes("\r")) {
  throw new Error("excuse must be a single line");
}
if (EXCUSE !== EXCUSE.trim()) {
  throw new Error("excuse must not have leading or trailing whitespace");
}

const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, EXCUSE + "\n", "utf8");
console.log(`wrote ${EXCUSE.length} chars to ${outPath}`);
