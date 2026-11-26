import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const label =
  "WARNING: Do not meet yourself. He already dislikes you and has had years to prepare.";

// Mirror the gate: UTF-8 text, 1-120 characters, single line, not only white space.
function assertValidLabel(text) {
  const chars = [...text].length;
  if (chars < 1 || chars > 120 || /[\r\n]/.test(text) || text.trim() === "") {
    throw new Error(`entry fails the gate: ${chars} chars`);
  }
}

assertValidLabel(label);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });
const tmp = join(outputDir, ".entry.txt.tmp");
writeFileSync(tmp, label, "utf8");
renameSync(tmp, join(outputDir, "entry.txt"));
