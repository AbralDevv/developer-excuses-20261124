import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line = "Technically prod isn't down—I shipped a cost-saving patch that cut our AWS bill to $0, our revenue to $0, and my salary to $0, judging by the prepaid FedEx label HR just sent for my laptop.";

const candidates = [
  process.env.MAKEFUN_OUTPUT_DIR,
  "/output",
  join(process.cwd(), "output"),
].filter((d): d is string => Boolean(d));

let written = false;
let lastError: unknown = null;
for (const dir of candidates) {
  try {
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "entry.txt"), line, "utf8");
    written = true;
    break;
  } catch (err) {
    lastError = err;
  }
}
if (!written) {
  throw lastError ?? new Error("could not write entry.txt");
}
