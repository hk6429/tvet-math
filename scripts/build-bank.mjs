import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const yearsDir = join(root, "data", "years");
const files = readdirSync(yearsDir)
  .filter((file) => /^q\d{3}\.js$/.test(file))
  .sort((a, b) => Number(b.slice(1, 4)) - Number(a.slice(1, 4)));

const content = [
  "window.MATH_BANK = window.MATH_BANK || [];",
  ...files.map((file) => readFileSync(join(yearsDir, file), "utf8").trim()),
  ""
].join("\n\n");

writeFileSync(join(root, "data", "bank.js"), content);
console.log(`完成題庫 bundle：${files.length} 個年份檔`);
