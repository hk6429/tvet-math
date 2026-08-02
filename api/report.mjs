const TELEGRAM_API = "https://api.telegram.org";
const QUESTION_REASONS = new Set([
  "題目或選項有誤",
  "答案有誤",
  "解析不清",
  "圖片或公式顯示異常",
  "其他",
]);
const GENERAL_REASONS = new Set(["操作異常", "顯示問題", "功能建議", "其他"]);
const duplicateReports = new Map();
const rateReports = new Map();
const DUPLICATE_WINDOW_MS = 5 * 60 * 1_000;
const RATE_WINDOW_MS = 10 * 60 * 1_000;
const RATE_LIMIT = 6;

function text(value, limit = 800) {
  return String(value ?? "").trim().slice(0, limit);
}

function formatQuestionReport(payload) {
  const context = payload.context;
  const options = Object.entries(context.options || {})
    .map(([key, value]) => `${text(key, 4)}. ${text(value, 220)}`)
    .join("\n");
  return [
    "【統測數學題目回報】",
    `原因：${text(payload.reason, 40)}`,
    `題目：${text(context.id, 40)}｜${text(context.year, 4)} 學年度｜${text(context.subject, 20)}｜第 ${text(context.no, 4)} 題`,
    `類型：${text(context.kind, 20)}｜${text(context.category, 40)}｜${(context.tags || []).map((tag) => text(tag, 30)).join("、")}`,
    "",
    `題幹：\n${text(context.prompt, 600)}`,
    options ? `選項：\n${options}` : "",
    `官方答案：${text(context.answer, 100)}`,
    `解析：\n${text(context.explanation, 600)}`,
    payload.note ? `補充：\n${text(payload.note, 300)}` : "",
    context.image ? `題圖：${text(context.image, 200)}` : "",
    `頁面：${text(payload.page, 250)}`,
  ].filter(Boolean).join("\n").slice(0, 4_000);
}

function formatGeneralReport(payload) {
  return [
    "【統測數學一般問題回報】",
    `原因：${text(payload.reason, 40)}`,
    `說明：\n${text(payload.note, 1_000)}`,
    `頁面：${text(payload.page, 400)}`,
    payload.browser ? `瀏覽器：${text(payload.browser, 300)}` : "",
  ].filter(Boolean).join("\n").slice(0, 4_000);
}

function validQuestionPayload(payload) {
  if (!payload || payload.mode !== "question" || !QUESTION_REASONS.has(payload.reason)) return false;
  if (payload.website) return false;
  if (payload.reason === "其他" && text(payload.note).length < 5) return false;
  if (text(payload.note).length > 500 || text(payload.page).length > 400) return false;
  const context = payload.context;
  if (!context || typeof context !== "object") return false;
  if (!text(context.id, 41) || !Number.isInteger(context.year) || !Number.isInteger(context.no)) return false;
  if (!text(context.subject, 21) || !text(context.kind, 21) || !text(context.prompt, 1_201)) return false;
  if (!text(context.answer, 101) || !text(context.explanation, 1_201)) return false;
  if (context.options != null && (typeof context.options !== "object" || Array.isArray(context.options))) return false;
  return Object.keys(context.options || {}).length <= 5;
}

function validGeneralPayload(payload) {
  if (!payload || payload.mode !== "general" || !GENERAL_REASONS.has(payload.reason)) return false;
  if (payload.website) return false;
  return text(payload.note, 1_001).length >= 5 && text(payload.note, 1_001).length <= 1_000
    && text(payload.page).length <= 400 && text(payload.browser).length <= 300;
}

function validPayload(payload) {
  return validQuestionPayload(payload) || validGeneralPayload(payload);
}

function clientIp(request) {
  return text(request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown", 80);
}

function duplicateKey(request, payload) {
  const item = payload.mode === "question" ? payload.context.id : text(payload.note, 120);
  return `${clientIp(request)}|${payload.mode}|${item}|${payload.reason}`;
}

function recentReports(request, now = Date.now()) {
  const ip = clientIp(request);
  const recent = (rateReports.get(ip) || []).filter((at) => now - at < RATE_WINDOW_MS);
  rateReports.set(ip, recent);
  return { ip, recent };
}

async function handle(request) {
  if (request.method !== "POST") {
    return Response.json({ ok: false, error: "僅接受 POST。" }, { status: 405, headers: { Allow: "POST" } });
  }

  const rawBody = await request.text();
  if (rawBody.length > 30_000) {
    return Response.json({ ok: false, error: "回報內容過大。" }, { status: 413 });
  }
  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return Response.json({ ok: false, error: "回報資料格式不正確。" }, { status: 400 });
  }
  if (!validPayload(payload)) {
    return Response.json({ ok: false, error: "請確認回報內容後再送出。" }, { status: 400 });
  }
  const dedupeKey = duplicateKey(request, payload);
  const previousReport = duplicateReports.get(dedupeKey);
  if (previousReport && Date.now() - previousReport < DUPLICATE_WINDOW_MS) {
    return Response.json({ ok: false, error: "相同問題已收到，請勿重複送出。" }, { status: 429 });
  }
  const rate = recentReports(request);
  if (rate.recent.length >= RATE_LIMIT) {
    return Response.json({ ok: false, error: "回報次數過多，請稍後再試。" }, { status: 429 });
  }
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_REPORT_CHAT_ID;
  if (!token || !chatId) {
    return Response.json({ ok: false, error: "回報服務尚未完成設定。" }, { status: 503 });
  }
  let telegramResponse;
  try {
    telegramResponse = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: payload.mode === "question" ? formatQuestionReport(payload) : formatGeneralReport(payload),
      }),
    });
  } catch {
    return Response.json({ ok: false, error: "回報暫時無法送出，請稍後再試。" }, { status: 502 });
  }
  if (!telegramResponse.ok) {
    return Response.json({ ok: false, error: "回報暫時無法送出，請稍後再試。" }, { status: 502 });
  }
  duplicateReports.set(dedupeKey, Date.now());
  rateReports.set(rate.ip, [...rate.recent, Date.now()]);
  return Response.json({ ok: true });
}

export default { fetch: handle };
