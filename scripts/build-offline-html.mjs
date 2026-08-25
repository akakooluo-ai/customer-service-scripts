import { readFileSync, readdirSync, mkdirSync, writeFileSync, statSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "dist");
const outFile = join(outDir, "customer-service-scripts-offline.html");

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
  taobao: "淘宝/天猫",
  jd: "京东",
  "tiktok-shop": "TikTok Shop"
};

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

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineFormat(text) {
  let out = escapeHtml(text);
  out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  return out;
}

/** Convert project markdown into readable HTML with copyable script blocks. */
function markdownToHtml(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let i = 0;
  let inList = false;

  const closeList = () => {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  };

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim().startsWith("```")) {
      closeList();
      i += 1;
      const body = [];
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        body.push(lines[i]);
        i += 1;
      }
      i += 1; // closing ```
      const script = body.join("\n").replace(/\n+$/, "");
      html.push(
        `<div class="script-block"><button type="button" class="copy-btn" data-copy>复制话术</button><pre>${escapeHtml(script)}</pre></div>`
      );
      continue;
    }

    if (/^#{1,3}\s+/.test(line)) {
      closeList();
      const level = line.match(/^#+/)[0].length;
      const text = line.replace(/^#{1,3}\s+/, "").trim();
      html.push(`<h${level}>${inlineFormat(text)}</h${level}>`);
      i += 1;
      continue;
    }

    if (/^>\s?/.test(line)) {
      closeList();
      const quote = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quote.push(lines[i].replace(/^>\s?/, ""));
        i += 1;
      }
      html.push(`<blockquote>${inlineFormat(quote.join(" "))}</blockquote>`);
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      closeList();
      html.push("<hr />");
      i += 1;
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${inlineFormat(line.replace(/^[-*]\s+/, ""))}</li>`);
      i += 1;
      continue;
    }

    if (line.trim() === "") {
      closeList();
      i += 1;
      continue;
    }

    closeList();
    html.push(`<p>${inlineFormat(line)}</p>`);
    i += 1;
  }

  closeList();
  return html.join("\n");
}

function parsePage(filePath) {
  const rel = toPosix(relative(root, filePath));
  const md = readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  const titleMatch = md.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : rel;
  const parts = rel.split("/");

  let group = "other";
  let groupLabel = "其他";
  let categoryKey = rel;
  let categoryLabel = title;
  let stage = "";
  let stageLabel = "";
  let navParent = "";

  if (parts[0] === "general") {
    group = "general";
    groupLabel = "通用话术";
    stage = parts[1].replace(/\.md$/, "");
    stageLabel = STAGE_LABELS[stage] || stage;
    categoryKey = `general/${stage}`;
    categoryLabel = `通用 · ${stageLabel}`;
    navParent = "general";
  } else if (parts[0] === "platforms") {
    group = "platforms";
    groupLabel = "平台话术";
    const platform = parts[1];
    stage = parts[2].replace(/\.md$/, "");
    stageLabel = STAGE_LABELS[stage] || stage;
    const platformLabel = PLATFORM_LABELS[platform] || platform;
    categoryKey = `platforms/${platform}/${stage}`;
    categoryLabel = `${platformLabel} · ${stageLabel}`;
    navParent = platform;
  } else if (parts[0] === "industries") {
    group = "industries";
    groupLabel = "行业话术";
    const industry = parts[1].replace(/\.md$/, "");
    categoryKey = `industries/${industry}`;
    categoryLabel = title.replace(/客服话术$/, "").trim() || industry;
    navParent = "industries";
  }

  return {
    id: categoryKey,
    path: rel,
    title,
    group,
    groupLabel,
    categoryLabel,
    stage,
    stageLabel,
    navParent,
    html: markdownToHtml(md)
  };
}

const files = ["general", "platforms", "industries"]
  .flatMap((dir) => walkMarkdown(join(root, dir)))
  .sort((a, b) => toPosix(relative(root, a)).localeCompare(toPosix(relative(root, b))));

const pages = files.map(parsePage);

// Stable reading order: general stages → platforms (by label) → industries (by label)
const stageOrder = { presales: 1, sales: 2, aftersales: 3 };
pages.sort((a, b) => {
  const gOrder = { general: 1, platforms: 2, industries: 3 };
  if (gOrder[a.group] !== gOrder[b.group]) return gOrder[a.group] - gOrder[b.group];
  if (a.group === "platforms") {
    const pa = PLATFORM_LABELS[a.navParent] || a.navParent;
    const pb = PLATFORM_LABELS[b.navParent] || b.navParent;
    if (pa !== pb) return pa.localeCompare(pb, "zh");
    return (stageOrder[a.stage] || 9) - (stageOrder[b.stage] || 9);
  }
  if (a.group === "general") {
    return (stageOrder[a.stage] || 9) - (stageOrder[b.stage] || 9);
  }
  return a.categoryLabel.localeCompare(b.categoryLabel, "zh");
});

const nav = {
  general: pages.filter((p) => p.group === "general"),
  platforms: {},
  industries: pages.filter((p) => p.group === "industries")
};

for (const page of pages.filter((p) => p.group === "platforms")) {
  if (!nav.platforms[page.navParent]) nav.platforms[page.navParent] = [];
  nav.platforms[page.navParent].push(page);
}

function navItem(page, idx) {
  return `<button type="button" class="nav-link" data-page="${idx}">${escapeHtml(page.stageLabel || page.categoryLabel)}</button>`;
}

let navHtml = "";
navHtml += `<details open class="nav-group"><summary>通用话术</summary><div class="nav-links">`;
nav.general.forEach((p) => {
  navHtml += navItem(p, pages.indexOf(p));
});
navHtml += `</div></details>`;

navHtml += `<details open class="nav-group"><summary>平台话术</summary>`;
for (const [platform, list] of Object.entries(nav.platforms)) {
  const label = PLATFORM_LABELS[platform] || platform;
  navHtml += `<details class="nav-sub"><summary>${escapeHtml(label)}</summary><div class="nav-links">`;
  for (const p of list) navHtml += navItem(p, pages.indexOf(p));
  navHtml += `</div></details>`;
}
navHtml += `</details>`;

navHtml += `<details class="nav-group"><summary>行业话术（${nav.industries.length}）</summary><div class="nav-links">`;
for (const p of nav.industries) {
  navHtml += `<button type="button" class="nav-link" data-page="${pages.indexOf(p)}">${escapeHtml(p.categoryLabel)}</button>`;
}
navHtml += `</div></details>`;

const pagesPayload = pages.map(({ id, path, title, group, groupLabel, categoryLabel, html }) => ({
  id,
  path,
  title,
  group,
  groupLabel,
  categoryLabel,
  html
}));

const safeJson = JSON.stringify(pagesPayload).replace(/</g, "\\u003c");
const builtAt = new Date().toISOString().slice(0, 10);

const htmlDoc = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>电商客服话术大全（离线分类浏览）</title>
  <meta name="description" content="按通用 / 平台 / 行业分类，一页一页浏览全部客服话术。可双击离线打开。" />
  <style>
    :root {
      --bg: #f6f1ea;
      --paper: #fffdf9;
      --ink: #1c1917;
      --muted: #6b625a;
      --line: #e5d8c8;
      --brand: #b45309;
      --brand-soft: #fff7ed;
      --sidebar: #fffaf3;
      --shadow: 0 8px 24px rgba(28, 25, 23, 0.06);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      color: var(--ink);
      font-family: "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
      background:
        radial-gradient(circle at 100% 0%, #fde68a55, transparent 40%),
        radial-gradient(circle at 0% 20%, #fed7aa44, transparent 35%),
        var(--bg);
    }
    .app {
      display: grid;
      grid-template-columns: 280px 1fr;
      min-height: 100vh;
    }
    .sidebar {
      position: sticky;
      top: 0;
      height: 100vh;
      overflow: auto;
      background: var(--sidebar);
      border-right: 1px solid var(--line);
      padding: 18px 14px 28px;
    }
    .brand {
      margin: 0 0 6px;
      font-size: 18px;
      font-weight: 700;
    }
    .brand-sub {
      margin: 0 0 16px;
      color: var(--muted);
      font-size: 12px;
      line-height: 1.5;
    }
    .nav-group, .nav-sub {
      border: 1px solid var(--line);
      border-radius: 10px;
      background: #fff;
      margin-bottom: 8px;
      padding: 4px 8px;
    }
    .nav-sub {
      margin: 6px 0;
      background: var(--brand-soft);
    }
    summary {
      cursor: pointer;
      font-weight: 600;
      padding: 8px 4px;
      list-style: none;
    }
    summary::-webkit-details-marker { display: none; }
    summary::before {
      content: "▸";
      display: inline-block;
      width: 1em;
      color: var(--brand);
      transition: transform .15s;
    }
    details[open] > summary::before { transform: rotate(90deg); }
    .nav-links {
      display: grid;
      gap: 4px;
      padding: 0 0 8px;
    }
    .nav-link {
      text-align: left;
      border: none;
      background: transparent;
      padding: 8px 10px;
      border-radius: 8px;
      cursor: pointer;
      font: inherit;
      color: var(--ink);
    }
    .nav-link:hover { background: #fff; }
    .nav-link.active {
      background: var(--brand);
      color: #fff;
      font-weight: 600;
    }
    .main {
      padding: 20px 28px 48px;
      max-width: 920px;
    }
    .toolbar {
      position: sticky;
      top: 0;
      z-index: 5;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: center;
      justify-content: space-between;
      margin: -20px -28px 18px;
      padding: 14px 28px;
      background: rgba(246, 241, 234, 0.92);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--line);
    }
    .crumb {
      color: var(--muted);
      font-size: 13px;
    }
    .crumb strong { color: var(--ink); }
    .pager { display: flex; gap: 8px; }
    .pager button, .top-actions button {
      font: inherit;
      border: 1px solid var(--line);
      background: #fff;
      border-radius: 999px;
      padding: 8px 14px;
      cursor: pointer;
    }
    .pager button:hover:not(:disabled),
    .top-actions button:hover { border-color: var(--brand); color: var(--brand); }
    .pager button:disabled { opacity: .4; cursor: not-allowed; }
    .article {
      background: var(--paper);
      border: 1px solid var(--line);
      border-radius: 16px;
      box-shadow: var(--shadow);
      padding: 28px 28px 40px;
    }
    .article h1 { margin-top: 0; font-size: 28px; line-height: 1.25; }
    .article h2 { margin-top: 1.6em; font-size: 20px; border-bottom: 1px solid var(--line); padding-bottom: 6px; }
    .article h3 { margin-top: 1.4em; font-size: 17px; }
    .article blockquote {
      margin: 12px 0;
      padding: 10px 14px;
      border-left: 3px solid var(--brand);
      background: var(--brand-soft);
      color: var(--muted);
    }
    .article p, .article li { line-height: 1.7; }
    .article hr { border: none; border-top: 1px dashed var(--line); margin: 22px 0; }
    .script-block {
      position: relative;
      margin: 12px 0 18px;
    }
    .script-block pre {
      margin: 0;
      white-space: pre-wrap;
      word-break: break-word;
      background: #1c1917;
      color: #f5f5f4;
      border-radius: 12px;
      padding: 16px 16px 18px;
      line-height: 1.65;
      font-family: Consolas, "Courier New", monospace;
      font-size: 14px;
    }
    .copy-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      border: none;
      border-radius: 8px;
      padding: 6px 10px;
      background: rgba(255,255,255,.92);
      color: var(--ink);
      cursor: pointer;
      font: inherit;
      font-size: 12px;
    }
    .copy-btn:hover { background: #fff; }
    .copy-btn.copied { background: #bbf7d0; }
    .path-tag {
      display: inline-block;
      margin-bottom: 12px;
      padding: 4px 10px;
      border-radius: 999px;
      background: var(--brand-soft);
      color: var(--muted);
      font-size: 12px;
    }
    @media (max-width: 900px) {
      .app { grid-template-columns: 1fr; }
      .sidebar {
        position: relative;
        height: auto;
        max-height: 42vh;
        border-right: none;
        border-bottom: 1px solid var(--line);
      }
      .main { padding: 16px; }
      .toolbar { margin: -16px -16px 14px; padding: 12px 16px; }
      .article { padding: 18px; }
    }
  </style>
</head>
<body>
  <div class="app">
    <aside class="sidebar">
      <p class="brand">电商客服话术大全</p>
      <p class="brand-sub">离线分类浏览 · ${pages.length} 页 · built ${builtAt}<br/>点左侧分类，右侧整页阅读、复制话术</p>
      <nav id="nav">${navHtml}</nav>
    </aside>
    <main class="main">
      <div class="toolbar">
        <div class="crumb" id="crumb">加载中…</div>
        <div class="pager">
          <button type="button" id="prevBtn">← 上一页</button>
          <button type="button" id="nextBtn">下一页 →</button>
        </div>
      </div>
      <article class="article" id="article"></article>
    </main>
  </div>

  <script type="application/json" id="pages-data">${safeJson}</script>
  <script>
    const pages = JSON.parse(document.getElementById("pages-data").textContent);
    let index = 0;

    const article = document.getElementById("article");
    const crumb = document.getElementById("crumb");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    async function copyText(text, btn) {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.setAttribute("readonly", "");
          ta.style.position = "fixed";
          ta.style.left = "-9999px";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
        }
        const old = btn.textContent;
        btn.textContent = "已复制";
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = old;
          btn.classList.remove("copied");
        }, 1200);
      } catch (err) {
        console.error(err);
        btn.textContent = "复制失败";
      }
    }

    function render(i) {
      index = Math.max(0, Math.min(pages.length - 1, i));
      const page = pages[index];
      crumb.innerHTML = '<strong>' + page.groupLabel + '</strong> / ' + page.categoryLabel +
        ' <span style="opacity:.7">（' + (index + 1) + ' / ' + pages.length + '）</span>';
      article.innerHTML = '<div class="path-tag">' + page.path + '</div>' + page.html;
      prevBtn.disabled = index <= 0;
      nextBtn.disabled = index >= pages.length - 1;
      document.querySelectorAll(".nav-link").forEach((el) => {
        el.classList.toggle("active", Number(el.dataset.page) === index);
      });
      const active = document.querySelector(".nav-link.active");
      if (active && active.scrollIntoView) {
        active.scrollIntoView({ block: "nearest" });
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      history.replaceState(null, "", "#p=" + encodeURIComponent(page.id));
    }

    document.getElementById("nav").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-page]");
      if (!btn) return;
      render(Number(btn.dataset.page));
    });

    article.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-copy]");
      if (!btn) return;
      const pre = btn.parentElement.querySelector("pre");
      if (pre) copyText(pre.textContent, btn);
    });

    prevBtn.addEventListener("click", () => render(index - 1));
    nextBtn.addEventListener("click", () => render(index + 1));

    document.addEventListener("keydown", (e) => {
      if (e.target.matches("input, textarea")) return;
      if (e.key === "ArrowLeft") render(index - 1);
      if (e.key === "ArrowRight") render(index + 1);
    });

    const hash = location.hash.replace(/^#/, "");
    const params = new URLSearchParams(hash);
    const wanted = params.get("p");
    const start = wanted ? pages.findIndex((p) => p.id === wanted) : 0;
    render(start >= 0 ? start : 0);
  </script>
</body>
</html>
`;

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, htmlDoc, "utf8");

console.log(`Wrote ${outFile}`);
console.log(`Pages: ${pages.length}`);
console.log(`Size: ${(Buffer.byteLength(htmlDoc, "utf8") / (1024 * 1024)).toFixed(2)} MB`);
