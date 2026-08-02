import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const year = Number(process.argv[2]);
// 統測版：各學年度原卷版面參數之後逐年填入（結構參考 gsat-math 的 crop-year.mjs）。
const layouts = {};

if (!layouts[year]) {
  throw new Error(`尚未設定 ${year} 學年度裁圖版面`);
}

const sourceDir = join(root, ".sources", String(year));
const pageWidth = 595.275;
const renderedWidth = 1191;
const scale = renderedWidth / pageWidth;

function startsForPage(
  pdf,
  page,
  fillStartNo,
  questionXMin = 58,
  questionXMax = 78,
  numericOffset = 0,
  numericOffsetYMin = 0
) {
  const html = execFileSync("pdftotext", [
    "-f", String(page),
    "-l", String(page),
    "-bbox",
    pdf,
    "-"
  ], { encoding: "utf8" });
  const rows = new Map();
  const word = /<word xMin="([\d.]+)" yMin="([\d.]+)"[^>]*>([^<]+)<\/word>/g;
  for (const match of html.matchAll(word)) {
    const x = Number(match[1]);
    const y = Number(match[2]);
    if (x < questionXMin || x > questionXMax) continue;
    const key = [...rows.keys()].find((value) => Math.abs(value - y) < 0.6) ?? y;
    rows.set(key, `${rows.get(key) || ""}${match[3]}`);
  }
  const starts = [];
  for (const [y, text] of rows) {
    const numeric = text.match(/^(\d{1,2})\.$/);
    const letter = fillStartNo ? text.match(/^([A-Z])\.$/) : null;
    const no = numeric
      ? Number(numeric[1]) + (y >= numericOffsetYMin ? numericOffset : 0)
      : letter
        ? fillStartNo + letter[1].charCodeAt(0) - "A".charCodeAt(0)
        : 0;
    if (no >= 1 && no <= 20) starts.push({ no, page, y });
  }
  return starts;
}

for (const subject of Object.keys(layouts[year])) {
  const config = layouts[year][subject];
  const pdf = join(sourceDir, config.sourceFile || `math-${subject.toLowerCase()}-questions.pdf`);
  const pages = join(sourceDir, "rendered", subject.toLowerCase());
  const out = join(root, "img", `${year}${subject}`);
  const firstPage = config.firstPage || 2;
  const lastPage = config.lastPage || 7;
  const cropX = config.cropX || 108;
  const cropWidth = config.cropWidth || 972;
  rmSync(pages, { recursive: true, force: true });
  mkdirSync(pages, { recursive: true });
  mkdirSync(out, { recursive: true });
  execFileSync("pdftoppm", [
    "-png", "-r", "144", "-f", String(firstPage), "-l", String(lastPage), pdf, join(pages, "page")
  ]);

  const starts = [];
  for (let page = firstPage; page <= lastPage; page += 1) {
    starts.push(...startsForPage(
      pdf,
      page,
      config.fillStartNo,
      config.questionXMin,
      config.questionXMax,
      config.numericOffsetFromPage && page >= config.numericOffsetFromPage.page
        ? config.numericOffsetFromPage.offset
        : 0,
      config.numericOffsetFromPage && page === config.numericOffsetFromPage.page
        ? config.numericOffsetFromPage.firstPageYMin || 0
        : 0
    ));
  }
  starts.sort((a, b) => a.no - b.no);
  if (starts.length !== 20 || new Set(starts.map((item) => item.no)).size !== 20) {
    throw new Error(`${year}${subject} 偵測到 ${starts.length} 個題號起點，預期為 20 題`);
  }

  for (let i = 0; i < starts.length; i += 1) {
    const current = starts[i];
    const next = starts[i + 1];
    const top = Math.max(115, Math.round(current.y * scale) - 18);
    let bottom = config.pageBottom || 1570;
    if (next && next.page === current.page) {
      bottom = Math.round(next.y * scale) - 16 - (config.gapBeforeNext[current.no] || 0);
    }
    const height = Math.max(100, bottom - top);
    const pageImage = join(pages, `page-${current.page}.png`);
    const output = join(out, `q${String(current.no).padStart(2, "0")}.webp`);
    execFileSync("magick", [
      pageImage,
      "-crop", `${cropWidth}x${height}+${cropX}+${top}`,
      "+repage", "-trim", "+repage", "-quality", "88", output
    ]);
    if (config.overlapMasks?.[current.no]) {
      execFileSync("magick", [
        output,
        "-fill", "white",
        "-draw", config.overlapMasks[current.no],
        "-trim", "+repage", "-quality", "88", output
      ]);
    }
  }

  if (config.hasGroupImage !== false) {
    const q18 = starts.find((item) => item.no === 18);
    const groupBottom = Math.round(q18.y * scale) - 24;
    const groupTop = groupBottom - 430;
    execFileSync("magick", [
      join(pages, `page-${q18.page}.png`),
      "-crop", `${cropWidth}x${groupBottom - groupTop}+${cropX}+${groupTop}`,
      "+repage", "-trim", "+repage", "-quality", "88",
      join(out, "g18.webp")
    ]);
  }
  const groupSummary = config.hasGroupImage === false ? "" : "與 1 張題組材料";
  console.log(`${year} 數學 ${subject}：完成 20 題裁圖${groupSummary}`);
}
