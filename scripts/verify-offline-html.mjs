import { readFileSync } from "node:fs";

const html = readFileSync("dist/customer-service-scripts-offline.html", "utf8");
const start = html.indexOf('<script type="application/json" id="pages-data">');
if (start < 0) {
  console.error("VERIFY FAILED: pages-data missing");
  process.exit(1);
}
const openEnd = html.indexOf(">", start) + 1;
const close = html.indexOf("</script>", openEnd);
const pages = JSON.parse(html.slice(openEnd, close));

const checks = {
  pages: pages.length,
  hasNav: html.includes("平台话术") && html.includes("行业话术"),
  hasPager: html.includes("上一页") && html.includes("下一页"),
  hasCopy: html.includes("复制话术"),
  sampleTitle: pages[0]?.title,
  sizeMB: (Buffer.byteLength(html, "utf8") / (1024 * 1024)).toFixed(2)
};

if (checks.pages < 50 || !checks.hasNav || !checks.hasPager) {
  console.error("VERIFY FAILED", checks);
  process.exit(1);
}

console.log("VERIFY OK", checks);
