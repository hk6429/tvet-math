import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const contentDir = join(root, "data", "content");
const files = readdirSync(contentDir)
  .filter((file) => /^\d{3}\.js$/.test(file))
  .sort((a, b) => Number(b.slice(0, 3)) - Number(a.slice(0, 3)));

const content = [
  "window.MATH_CONTENT = {};",
  ...files.map((file) => readFileSync(join(contentDir, file), "utf8").trim()),
  ""
].join("\n\n");

writeFileSync(join(root, "data", "content.js"), content);
console.log(`完成 LaTeX 題目 bundle：${files.length} 個年份檔`);
