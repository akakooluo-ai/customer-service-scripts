import fs from "fs";
import path from "path";

const repoRoot = process.cwd();
const dataFile = path.join(repoRoot, "docs", "data", "templates.json");

if (!fs.existsSync(dataFile)) {
  console.error("templates.json not found. Run `npm run build:site` first.");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(dataFile, "utf8"));

const variableUsage = new Map();
for (const item of data.items) {
  for (const v of item.variables) {
    if (!variableUsage.has(v)) variableUsage.set(v, []);
    variableUsage.get(v).push(item.sourcePath);
  }
}

const issues = {
  lowercaseOnly: [],
  tooLong: [],
  punctuationNoise: [],
  whitespaceProblem: [],
  numericOnly: []
};

for (const [variable, sources] of variableUsage) {
  const count = sources.length;
  if (variable.length > 40) {
    issues.tooLong.push({ variable, count });
  }
  if (/^[a-z][a-z0-9 ]*$/.test(variable) && !/[A-Z]/.test(variable)) {
    issues.lowercaseOnly.push({ variable, count });
  }
  if (variable.trim() !== variable || /\s{2,}/.test(variable)) {
    issues.whitespaceProblem.push({ variable, count });
  }
  if (/^\d+$/.test(variable)) {
    issues.numericOnly.push({ variable, count });
  }
  if (/[,.;!?]/.test(variable)) {
    issues.punctuationNoise.push({ variable, count });
  }
}

function normalizeForAliasKey(v) {
  return v
    .toLowerCase()
    .replace(/[\s_\-/]+/g, "")
    .replace(/number|no\.|num/g, "num")
    .replace(/id$/, "num");
}

const aliasGroups = new Map();
for (const v of variableUsage.keys()) {
  const key = normalizeForAliasKey(v);
  if (!aliasGroups.has(key)) aliasGroups.set(key, new Set());
  aliasGroups.get(key).add(v);
}
const aliases = [...aliasGroups.values()].filter((s) => s.size > 1).map((s) => [...s]);

function section(title, rows) {
  console.log(`\n## ${title} (${rows.length})`);
  if (rows.length === 0) {
    console.log("  (none)");
    return;
  }
  for (const r of rows.slice(0, 30)) {
    if (typeof r === "string") console.log("  -", r);
    else if (Array.isArray(r)) console.log("  -", r.join("  |  "));
    else console.log(`  - [${r.variable}]  x${r.count}`);
  }
  if (rows.length > 30) console.log(`  ...and ${rows.length - 30} more`);
}

console.log(`# Template Lint Report`);
console.log(`Generated at: ${new Date().toISOString()}`);
console.log(`Total templates: ${data.items.length}`);
console.log(`Unique variables: ${variableUsage.size}`);

section("Lowercase-only variables (CONTRIBUTING.md prefers Title Case)", issues.lowercaseOnly);
section("Variables longer than 40 chars (likely not a variable)", issues.tooLong);
section("Variables with leading/trailing/duplicate whitespace", issues.whitespaceProblem);
section("Numeric-only placeholders (likely false positives like footnotes)", issues.numericOnly);
section("Variables containing sentence punctuation", issues.punctuationNoise);
section("Potential alias groups (consider unifying)", aliases);

const exitCode =
  issues.lowercaseOnly.length +
    issues.tooLong.length +
    issues.whitespaceProblem.length +
    issues.punctuationNoise.length >
  0
    ? 1
    : 0;
process.exit(exitCode);
