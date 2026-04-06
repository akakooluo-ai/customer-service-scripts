import fs from "fs";
import path from "path";

const repoRoot = process.cwd();
const inputRoots = ["general", "platforms", "industries"];
const outputDir = path.join(repoRoot, "docs", "data");
const outputFile = path.join(outputDir, "templates.json");

function walkMarkdownFiles(dirPath) {
  const result = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      result.push(...walkMarkdownFiles(fullPath));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".md")) {
      result.push(fullPath);
    }
  }
  return result;
}

function normalizeSlashes(p) {
  return p.split(path.sep).join("/");
}

function parseTopMeta(relativePath) {
  const parts = relativePath.split("/");
  if (parts[0] === "general") {
    return { group: "general", platform: "general", industry: "general" };
  }
  if (parts[0] === "platforms") {
    return { group: "platform", platform: parts[1] || "unknown", industry: "all" };
  }
  if (parts[0] === "industries") {
    return { group: "industry", platform: "all", industry: parts[1]?.replace(".md", "") || "unknown" };
  }
  return { group: "other", platform: "unknown", industry: "unknown" };
}

function extractVariables(text) {
  const matches = [...text.matchAll(/\[([^\]\n]+)\]/g)];
  const unique = new Set();
  for (const m of matches) {
    unique.add(m[1].trim());
  }
  return [...unique];
}

function parseMarkdown(filePath, relativePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const lines = raw.split(/\r?\n/);
  const pageTitle = (lines.find((line) => line.startsWith("# ")) || "# Untitled").replace(/^# /, "").trim();
  const topMeta = parseTopMeta(relativePath);
  const blocks = [];
  const sectionHeadingPattern = /^#{2,3}\s+(?:(\d+)\.\s+)?(.+)$/;

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const sectionMatch = line.match(sectionHeadingPattern);
    if (!sectionMatch) {
      i += 1;
      continue;
    }

    const sectionTitle = sectionMatch[2].trim();
    let scene = "";
    let template = "";
    let j = i + 1;
    while (j < lines.length) {
      const cursor = lines[j];
      if (sectionHeadingPattern.test(cursor)) {
        break;
      }
      const sceneMatch = cursor.match(/\*\*适用场景：\*\*\s*(.+)$/);
      if (sceneMatch) {
        scene = sceneMatch[1].trim();
      }
      if (cursor.trim() === "```") {
        const codeLines = [];
        j += 1;
        while (j < lines.length && lines[j].trim() !== "```") {
          codeLines.push(lines[j]);
          j += 1;
        }
        if (!template) {
          template = codeLines.join("\n").trim();
        }
      }
      j += 1;
    }

    if (template) {
      const idSeed = `${relativePath}:${sectionTitle}`;
      const id = Buffer.from(idSeed).toString("base64").replace(/=+$/g, "");
      blocks.push({
        id,
        pageTitle,
        sectionTitle,
        scene,
        template,
        variables: extractVariables(template),
        sourcePath: relativePath,
        ...topMeta
      });
    }

    i = j;
  }

  return blocks;
}

function buildDataset() {
  const files = [];
  for (const root of inputRoots) {
    const full = path.join(repoRoot, root);
    if (fs.existsSync(full)) {
      files.push(...walkMarkdownFiles(full));
    }
  }

  const items = [];
  for (const file of files) {
    const relative = normalizeSlashes(path.relative(repoRoot, file));
    items.push(...parseMarkdown(file, relative));
  }

  const platforms = [...new Set(items.map((item) => item.platform))].sort();
  const industries = [...new Set(items.map((item) => item.industry))].sort();
  const groups = [...new Set(items.map((item) => item.group))].sort();

  return {
    generatedAt: new Date().toISOString(),
    count: items.length,
    groups,
    platforms,
    industries,
    items
  };
}

const data = buildDataset();
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputFile, JSON.stringify(data, null, 2), "utf8");
console.log(`Generated ${data.count} templates -> ${normalizeSlashes(path.relative(repoRoot, outputFile))}`);
