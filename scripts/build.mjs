import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const dist = join(root, "dist");
const files = [
  "about.html",
  "assets",
  "check.html",
  "data",
  "img",
  "index.html",
  "robots.txt",
  "sitemap.xml"
];

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

for (const file of files) {
  cpSync(join(root, file), join(dist, file), { recursive: true });
}

// KaTeX 已隨 assets/vendor/katex 一併複製進 dist；若本機另有 node_modules 版本則以其覆蓋更新。
const katexSource = join(root, "node_modules", "katex", "dist");
if (existsSync(katexSource)) {
  const katexTarget = join(dist, "assets", "vendor", "katex");
  mkdirSync(join(katexTarget, "fonts"), { recursive: true });
  cpSync(join(katexSource, "katex.min.css"), join(katexTarget, "katex.min.css"));
  cpSync(join(katexSource, "katex.min.js"), join(katexTarget, "katex.min.js"));
  for (const font of readdirSync(join(katexSource, "fonts")).filter((file) => file.endsWith(".woff2"))) {
    cpSync(join(katexSource, "fonts", font), join(katexTarget, "fonts", font));
  }
}

console.log(`完成發布包：${files.length} 個網站項目`);
