# 統測數學練功房（tvet-math）

四技二專統一入學測驗（統測）數學科歷屆試題（90–115 學年度）互動練習網站。引擎移植自 gsat-math 題庫站產線，靜態站、免帳號、作答紀錄只存在使用者瀏覽器。

## 資料來源

技專校院入學測驗中心（TCTE）公告試題與答案。統測官方不公布逐題答對率、鑑別度與選項畫記率，本站不自行推算，相關 UI 在無資料時完全隱藏。

## 資料層格式

`data/years/qNNN.js`（NNN = 三位數學年度，如 `q090.js`、`q115.js`），每檔一或多份考卷：

```js
window.MATH_BANK.push({
  year: 115,
  subject: "A",            // "A" | "B" | "C"
  label: "數學(A)",
  era: "統測",
  duration: 100,           // 分鐘
  source: "技專校院入學測驗中心（TCTE）公告試題與答案",
  questions: [
    {
      no: 1,
      cat: "數與式",
      tags: ["指數與對數"],
      summary: "…",
      kind: "single",
      answer: "A",          // 字母 A–D（多選以逗號串接）
      optionCount: 4,
      image: "img/115A/q01.png",
      sourcePage: 1
    }
  ]
});
```

`data/content/NNN.js` 放逐字 LaTeX 版（`window.MATH_CONTENT["115A-1"] = {...}`），選項鍵使用 `"A"`～`"D"`。

## 指令

```bash
npm run build:bank      # data/years/*.js → data/bank.js（空目錄也能跑，產出空 bank）
npm run build:content   # data/content/*.js → data/content.js
npm run build           # 打包 dist/（KaTeX 已內建於 assets/vendor/katex）
npm run crop:115        # 原卷裁圖（layouts 目前為空，逐年補版面參數）
```

## 頁面

- `index.html`：練習主站（篩選：學年度 × 卷別 A/B/C、單元、題型）
- `check.html`：查題校對（noindex）
- `about.html`：資料來源與說明

## 注意

- `sources/`、`staging/` 由題庫結構化產線維護，前端引擎不要動。
- 站上有兩套獨立渲染（index 與 check），改品牌或改選項邏輯時兩邊都要檢查。
- `assets/report.js` 在 Cloudflare Pages 會 POST `/api/report`，Vercel 與 Netlify 則跨站送往 Cloudflare Pages API。
- Cloudflare Pages Function 需要設定 `TELEGRAM_BOT_TOKEN` 與 `TELEGRAM_CHAT_ID`；機密資料不得寫入版控。
