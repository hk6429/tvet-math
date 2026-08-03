import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("練習頁提供一般與單題回報，並保存完整題目上下文", async () => {
  const [index, app, client, styles] = await Promise.all([
    read("index.html"),
    read("assets/app.js"),
    read("assets/report.js"),
    read("assets/styles.css"),
  ]);

  assert.match(index, /id="generalReportBtn"/);
  assert.match(index, /id="reportDialog"[^>]+aria-labelledby="reportTitle"/);
  assert.match(index, /assets\/report\.js/);
  assert.match(app, /id="questionReportBtn"/);
  assert.match(app, /MathReport\.openQuestion/);
  for (const field of ["prompt", "options", "answer", "selected", "explanation", "source", "image"]) {
    assert.match(client, new RegExp(`${field}[,:]`));
  }
  assert.match(client, /https:\/\/tvet-math\.vercel\.app\/api\/report/);
  assert.match(styles, /\.report-dialog/);
  assert.match(styles, /\.report-question-btn/);
});
