import { readFileSync, readdirSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import * as XLSX from "xlsx";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "dist");
const outFile = join(outDir, "customer-service-scripts.xlsx");

const STAGE_LABELS = {
  presales: "售前",
  sales: "售中",
  aftersales: "售后"
};

const PLATFORM_LABELS = {
  amazon: "Amazon",
  shopee: "Shopee",
  ebay: "eBay",
  shopify: "Shopify",
  aliexpress: "AliExpress",
  lazada: "Lazada",
  wish: "Wish",
  temu: "Temu",
  taobao: "淘宝天猫",
  jd: "京东",
  "tiktok-shop": "TikTok Shop"
};

const stageOrder = { presales: 1, sales: 2, aftersales: 3 };

function walkMarkdown(dirPath) {
  const result = [];
  for (const entry of readdirSync(dirPath, { withFileTypes: true })) {
    const full = join(dirPath, entry.name);
    if (entry.isDirectory()) result.push(...walkMarkdown(full));
    else if (entry.isFile() && entry.name.endsWith(".md")) result.push(full);
  }
  return result;
}

function toPosix(p) {
  return p.split(sep).join("/");
}

function extractVariables(text) {
  const matches = [...text.matchAll(/\[([^\]\n]+)\]/g)];
  return [...new Set(matches.map((m) => m[1].trim()))];
}

function parseScripts(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const sectionHeadingPattern = /^#{2,3}\s+(?:(\d+)\.\s+)?(.+)$/;
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const sectionMatch = lines[i].match(sectionHeadingPattern);
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
      if (sectionHeadingPattern.test(cursor)) break;
      const sceneMatch = cursor.match(/\*\*适用场景：\*\*\s*(.+)$/);
      if (sceneMatch) scene = sceneMatch[1].trim();
      if (cursor.trim() === "```") {
        const codeLines = [];
        j += 1;
        while (j < lines.length && lines[j].trim() !== "```") {
          codeLines.push(lines[j]);
          j += 1;
        }
        if (!template) template = codeLines.join("\n").trim();
      }
      j += 1;
    }

    if (template) {
      blocks.push({
        sectionTitle,
        scene,
        template,
        variables: extractVariables(template)
      });
    }
    i = j;
  }

  return blocks;
}

function metaFromPath(rel, title) {
  const parts = rel.split("/");
  if (parts[0] === "general") {
    const stage = parts[1].replace(/\.md$/, "");
    return {
      group: "general",
      groupLabel: "通用话术",
      sheetLabel: `通用-${STAGE_LABELS[stage] || stage}`,
      categoryLabel: `通用 · ${STAGE_LABELS[stage] || stage}`,
      stage,
      sortKey: `1-general-${stageOrder[stage] || 9}`
    };
  }
  if (parts[0] === "platforms") {
    const platform = parts[1];
    const stage = parts[2].replace(/\.md$/, "");
    const platformLabel = PLATFORM_LABELS[platform] || platform;
    return {
      group: "platforms",
      groupLabel: "平台话术",
      sheetLabel: `${platformLabel}-${STAGE_LABELS[stage] || stage}`,
      categoryLabel: `${platformLabel} · ${STAGE_LABELS[stage] || stage}`,
      stage,
      sortKey: `2-${platformLabel}-${stageOrder[stage] || 9}`
    };
  }
  if (parts[0] === "industries") {
    const short = title.replace(/客服话术$/, "").trim() || parts[1].replace(/\.md$/, "");
    return {
      group: "industries",
      groupLabel: "行业话术",
      sheetLabel: short,
      categoryLabel: short,
      stage: "",
      sortKey: `3-${short}`
    };
  }
  return {
    group: "other",
    groupLabel: "其他",
    sheetLabel: title.slice(0, 31),
    categoryLabel: title,
    stage: "",
    sortKey: `9-${title}`
  };
}

function uniqueSheetName(desired, used) {
  let base = desired.replace(/[\\/?*[\]:]/g, "-").replace(/'/g, "").trim() || "Sheet";
  if (base.length > 31) base = base.slice(0, 31);
  let name = base;
  let n = 2;
  while (used.has(name)) {
    const suffix = `-${n}`;
    name = `${base.slice(0, Math.max(1, 31 - suffix.length))}${suffix}`;
    n += 1;
  }
  used.add(name);
  return name;
}

const files = ["general", "platforms", "industries"]
  .flatMap((dir) => walkMarkdown(join(root, dir)))
  .sort((a, b) => toPosix(relative(root, a)).localeCompare(toPosix(relative(root, b))));

const categories = [];
for (const filePath of files) {
  const rel = toPosix(relative(root, filePath));
  const md = readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  const titleMatch = md.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : rel;
  const meta = metaFromPath(rel, title);
  const scripts = parseScripts(md);
  categories.push({
    path: rel,
    title,
    ...meta,
    scripts
  });
}

categories.sort((a, b) => a.sortKey.localeCompare(b.sortKey, "zh"));

const workbook = XLSX.utils.book_new();
const usedNames = new Set();

// Index sheet
const indexRows = [
  ["序号", "分类大类", "分类名称", "Sheet名", "话术条数", "来源文件", "页面标题"]
];
categories.forEach((cat, idx) => {
  const sheetName = uniqueSheetName(cat.sheetLabel, usedNames);
  cat._sheetName = sheetName;
  indexRows.push([
    idx + 1,
    cat.groupLabel,
    cat.categoryLabel,
    sheetName,
    cat.scripts.length,
    cat.path,
    cat.title
  ]);
});
const indexSheet = XLSX.utils.aoa_to_sheet(indexRows);
indexSheet["!cols"] = [
  { wch: 6 },
  { wch: 12 },
  { wch: 22 },
  { wch: 22 },
  { wch: 10 },
  { wch: 36 },
  { wch: 28 }
];
XLSX.utils.book_append_sheet(workbook, indexSheet, "目录");

for (const cat of categories) {
  const rows = [["序号", "标题", "适用场景", "话术内容", "变量", "来源文件", "分类"]];
  cat.scripts.forEach((script, idx) => {
    rows.push([
      idx + 1,
      script.sectionTitle,
      script.scene,
      script.template,
      script.variables.join("、"),
      cat.path,
      cat.categoryLabel
    ]);
  });
  const sheet = XLSX.utils.aoa_to_sheet(rows);
  sheet["!cols"] = [
    { wch: 6 },
    { wch: 22 },
    { wch: 28 },
    { wch: 80 },
    { wch: 30 },
    { wch: 32 },
    { wch: 18 }
  ];
  XLSX.utils.book_append_sheet(workbook, sheet, cat._sheetName);
}

mkdirSync(outDir, { recursive: true });
XLSX.writeFile(workbook, outFile);

const totalScripts = categories.reduce((sum, c) => sum + c.scripts.length, 0);
console.log(`Wrote ${outFile}`);
console.log(`Sheets: ${categories.length + 1} (含目录)`);
console.log(`Scripts: ${totalScripts}`);
console.log(`Size: ${(readFileSync(outFile).byteLength / (1024 * 1024)).toFixed(2)} MB`);
