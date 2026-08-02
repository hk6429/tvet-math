# tvet-math 引擎移植報告（自 gsat-math）

日期：2026-08-02。來源：`~/projects/gsat-math`。目標：`~/projects/tvet-math`。`sources/` 與 `staging/` 全程未動。未部署、未 git init。

## 複製的檔案

- `index.html`、`check.html`、`about.html`、`robots.txt`、`sitemap.xml`、`vercel.json`、`netlify.toml`、`package.json`、`.gitignore`、`.vercelignore`
- `assets/`（app.js、math-renderer.js、report.js、styles.css、favicon.svg）＋ 新建 `assets/vendor/katex/`（katex.min.css/js ＋ woff2 字型，取自 gsat-math 的 node_modules/katex）
- `scripts/`（build-bank.mjs、build-content.mjs、build.mjs、crop-year.mjs、verify-sources.mjs）
- 未複製：.git、node_modules、.netlify、.wrangler、img/、data/years/、data/content/、data/bank.js、data/content.js、data/option-rates.js、api/、tests/、.sources/

## 新建的空資料層

- `data/years/`、`data/content/`、`img/`（各含 .gitkeep）
- `data/bank.js` = `window.MATH_BANK = window.MATH_BANK || [];`
- `data/content.js` = `window.MATH_CONTENT = {};`

## 主要修改

| 檔案 | 修改 |
|---|---|
| index.html | 全面改品牌「統測數學練功房」＋副標；canonical/og 改 tvet-math.vercel.app；「考科」→「卷別」；移除「官方 P、D 統計覆蓋」統計卡；filter-note 改統測說明；footer 改 TCTE 來源；移除 `data/option-rates.js` script 引用；theme-color 改琥珀棕 |
| check.html | 品牌、卷別用語、題號上限 20→50、移除 option-rates 引用、解析文案改 TCTE |
| about.html | 全文重寫統測版（收錄 90–115、卷別 A/B/C 依當年公告、明示無官方統計不提供答對率） |
| assets/app.js | 選項改 A–D：`answerControl` 用 `String.fromCharCode(65+i)` 產生 data-choice 字母、標籤顯示 (A)(B)(C)(D)；`check()` 多選改字母排序 `.sort()`；`correctKeys`/`normalize` 原本即以字串比對，字母直接通用。localStorage 鍵 `gsatMath*`→`tvetMath*`（14 處）。新增守門：題庫完全無官方 P 值時，隱藏難度／鑑別度／由易到難／出卷難度篩選與「難度排行榜」按鈕。文案「大考中心」→「技專校院入學測驗中心（TCTE）」、「考科」→「卷別」 |
| assets/math-renderer.js | optionRates 逐選項鍵改字母；最末退化分支改為「無官方統計且無逐選項解析時回傳空字串（整塊隱藏）」；解析文案改 TCTE |
| assets/styles.css | 配色整組換琥珀棕：--ink #2b1a0b／--paper #fbf3e6／--card #fdf9f0／--accent #b45309／--accent-2 #8f4207／--seal #8f4207／--ok #2f8f5b／--bad #c0432f／--line #e6d3bf／--muted #6f5d4a／--grad 135deg #3d2408→#b45309 55%→#d97706；body 背景光暈與硬編碼冷灰底（#f4f6fc 等）同步轉暖 |
| assets/favicon.svg | 底色 #17493c → #3d2408 |
| scripts/build-bank.mjs | bundle 表頭改 `window.MATH_BANK = window.MATH_BANK \|\| [];`（與空資料層一致） |
| scripts/build.mjs | KaTeX 複製段加 existsSync 守門：無 node_modules 時沿用 assets/vendor 內建版，build 不再報錯 |
| scripts/crop-year.mjs | `const layouts = {};` 清空＋註釋（統測版逐年填） |
| package.json | name=tvet-math、描述改統測、移除 crop:83–89 |
| robots.txt / sitemap.xml | 網址改 tvet-math.vercel.app |
| README.md | 新寫：品牌、bank schema（year/subject A\|B\|C/label/era 統測/duration 100/source/questions 維持 gsat 格式但 answer 為 A–D 字母）、指令、注意事項 |

備註：gsat-math 引擎本來就沒有學測／指考 era 切換與 sitting（第一次／第二次）邏輯（那是 gsat-guowen 的），主篩選原生即「學年度多選 × 卷別下拉」二維，無需拆除。

## 驗證結果

- `node scripts/build-bank.mjs`（空 years）→「完成題庫 bundle：0 個年份檔」，不報錯；build-content 同。`node scripts/build.mjs` 成功產出 dist（katex 走 vendor fallback），驗畢已刪 dist。
- `node --check`：assets/*.js、data/*.js、scripts/*.mjs 全數通過。
- 殘留字串 grep（排除 vendor/sources/staging）：`指考`、`大考中心`、`ceec` = 0；`學測` 僅剩「入學測驗」一詞的子字串誤中（如「統一入學測驗」「技專校院入學測驗中心」），無真殘留；`gsat` 僅剩 README 與 crop-year.mjs 註釋中對來源產線的說明文字（刻意保留）。
- 三頁所有 `src`/`href` 指到的 assets/、data/ 路徑逐一確認存在；option-rates.js 引用已全移除。

## 已知風險

1. **回報表單無後端**：`assets/report.js` POST `/api/report`，gsat-math 的 `api/` 依規格未複製；靜態部署後送出回報會失敗（表單會顯示錯誤狀態）。部署前需補 serverless function 或隱藏回報按鈕。
2. **content 檔選項鍵必須用 "A"–"D"**：`optionHtml(q, key)` 直接以字母查 `content.options`；若之後結構化子任務照 gsat 慣例用 "1"–"5" 當鍵，選項會顯示成佔位字「選項（A）」。
3. **多選／選填／非選題型勾選框仍在**：統測全為四選一單選，這些勾選框留著不影響運作（無資料時篩不到題），若確定永遠用不到可再拿掉。
4. **難度／鑑別度 UI 是動態隱藏**：以「題庫中任一題有 pass 值」判斷；只要未來資料檔誤塞 pass 欄位，整組統計 UI 會重新現身。
5. **年份檔命名須三位數**：build-bank 只認 `q\d{3}.js`（90 學年度要命名 `q090.js`）。
6. **瀏覽器層級驗證未做**：本輪僅 node --check ＋路徑 grep；上資料後建議實際開 index 與 check 兩頁各答一題（特別驗 (A)–(D) 渲染與答對判定）。
