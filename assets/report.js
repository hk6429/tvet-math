(() => {
  const dialog = document.getElementById("reportDialog");
  const form = document.getElementById("reportForm");
  const reasonSelect = document.getElementById("reportReason");
  const noteInput = document.getElementById("reportNote");
  const noteHint = document.getElementById("reportNoteHint");
  const contextLabel = document.getElementById("reportContextLabel");
  const status = document.getElementById("reportStatus");
  const submitButton = document.getElementById("reportSubmitBtn");
  const questionReasons = ["題目或選項有誤", "答案有誤", "解析不清", "圖片或公式顯示異常", "其他"];
  const generalReasons = ["操作異常", "顯示問題", "功能建議", "其他"];
  let mode = "general";
  let currentQuestion = null;

  const kindLabel = (kind) => ({ single: "單選題", multi: "多選題", fill: "選填題", written: "非選擇題" }[kind] || kind);

  function setReasons(reasons) {
    reasonSelect.replaceChildren(...reasons.map((reason) => new Option(reason, reason)));
    updateNoteRequirement();
  }

  function updateNoteRequirement() {
    const required = mode === "general" || reasonSelect.value === "其他";
    noteInput.required = required;
    noteInput.minLength = required ? 5 : 0;
    noteHint.textContent = required ? "（至少 5 個字）" : "（選填）";
  }

  function openQuestion(question) {
    mode = "question";
    currentQuestion = question;
    form.reset();
    setReasons(questionReasons);
    contextLabel.textContent = `${question.exam.year} 學年度・${question.exam.label}・第 ${question.no} 題`;
    status.textContent = "";
    dialog.showModal();
    reasonSelect.focus();
  }

  function openGeneral() {
    mode = "general";
    currentQuestion = null;
    form.reset();
    setReasons(generalReasons);
    contextLabel.textContent = "無法定位到單一題目時，可在這裡回報網站操作或顯示問題。";
    status.textContent = "";
    dialog.showModal();
    reasonSelect.focus();
  }

  function questionContext(question) {
    const content = window.MathQuestionUI.contentFor(question) || {};
    return {
      id: `${question.exam.year}${question.exam.subject}-${question.no}`,
      year: question.exam.year,
      subject: question.exam.label,
      no: question.no,
      kind: kindLabel(question.kind),
      category: question.cat,
      tags: question.tags || [],
      prompt: content.stem || question.summary,
      options: content.options || {},
      answer: question.answer,
      explanation: Array.isArray(content.solution) ? content.solution.join("\n") : String(content.solution || "尚無文字解析"),
      image: question.image || "",
    };
  }

  async function submit(event) {
    event.preventDefault();
    if (!form.reportValidity()) return;
    submitButton.disabled = true;
    status.className = "report-status";
    status.textContent = "正在送出……";
    const payload = {
      mode,
      reason: reasonSelect.value,
      note: noteInput.value.trim(),
      website: document.getElementById("reportWebsite").value,
      page: location.href,
      browser: navigator.userAgent,
      ...(mode === "question" ? { context: questionContext(currentQuestion) } : {}),
    };

    try {
      const response = await fetch("/api/report", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "回報暫時無法送出，請稍後再試。");
      status.className = "report-status ok";
      status.textContent = "已收到，謝謝你協助改善題庫。";
      form.reset();
      setTimeout(() => dialog.close(), 1_200);
    } catch (error) {
      status.className = "report-status bad";
      status.textContent = error.message || "回報暫時無法送出，請稍後再試。";
    } finally {
      submitButton.disabled = false;
    }
  }

  reasonSelect.addEventListener("change", updateNoteRequirement);
  form.addEventListener("submit", submit);
  document.getElementById("generalReportBtn").addEventListener("click", openGeneral);
  document.getElementById("reportCloseBtn").addEventListener("click", () => dialog.close());
  document.getElementById("reportCancelBtn").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  window.MathReport = { openQuestion, openGeneral };
})();
