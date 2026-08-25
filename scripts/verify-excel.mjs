import { readFileSync } from "node:fs";
import * as XLSX from "xlsx";

const wb = XLSX.read(readFileSync("dist/customer-service-scripts.xlsx"));
console.log("sheet count", wb.SheetNames.length);
console.log("first 12", wb.SheetNames.slice(0, 12));
console.log("last 8", wb.SheetNames.slice(-8));

const index = XLSX.utils.sheet_to_json(wb.Sheets["目录"], { header: 1 });
console.log("index entries", index.length - 1);

const name = wb.SheetNames[1];
const rows = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1 });
console.log("sample sheet", name, "scripts", rows.length - 1);
console.log("headers", rows[0]);
console.log("first title/scene", rows[1]?.[1], "|", rows[1]?.[2]);
console.log("script preview:", String(rows[1]?.[3] || "").slice(0, 100).replace(/\n/g, " / "));
