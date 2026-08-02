import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const manifests = readdirSync(join(root, "sources"))
  .filter((file) => /^\d{3}\.json$/.test(file))
  .sort();

let verified = 0;
for (const manifestFile of manifests) {
  const manifest = JSON.parse(readFileSync(join(root, "sources", manifestFile), "utf8"));
  for (const source of manifest.files) {
    const file = join(root, ".sources", String(manifest.year), source.localFile || `${source.id}.pdf`);
    const actual = createHash("sha256").update(readFileSync(file)).digest("hex");
    if (actual !== source.sha256) {
      throw new Error(`${manifest.year} ${source.id} SHA-256 不符`);
    }
    verified += 1;
  }
}

console.log(`正式來源驗證通過：${manifests.length} 年、${verified} 份檔案`);
