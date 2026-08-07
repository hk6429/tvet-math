import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));

test("KaTeX 發布資產附帶完整 MIT 授權", () => {
  const license = readFileSync(join(root, "assets", "vendor", "katex", "LICENSE"), "utf8");
  assert.match(license, /Copyright \(c\) 2013-2020 Khan Academy and other contributors/);
  assert.match(license, /Permission is hereby granted, free of charge/);
  assert.match(license, /THE SOFTWARE IS PROVIDED "AS IS"/);
});

test("GoatCounter count.js 發布資產附帶完整 ISC 授權", () => {
  const count = readFileSync(join(root, "assets", "vendor", "count.js"), "utf8");
  const license = readFileSync(join(root, "assets", "vendor", "LICENSE-GoatCounter-ISC.txt"), "utf8");
  assert.match(count, /GoatCounter/);
  assert.match(license, /Copyright © Martin Tournoij/);
  assert.match(license, /Permission to use, copy, modify/);
  assert.match(license, /THE SOFTWARE IS PROVIDED "AS IS"/);
});

test("建置流程會把含授權檔的 assets 完整複製至 dist", () => {
  const build = readFileSync(join(root, "scripts", "build.mjs"), "utf8");
  assert.match(build, /["']assets["']/);
  assert.match(build, /cpSync\(join\(root, file\), join\(dist, file\), \{ recursive: true \}\)/);
});
