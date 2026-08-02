(() => {
  const exams = window.MATH_BANK || [];
  const allQuestions = exams.flatMap((exam) => exam.questions.map((q) => ({ ...q, exam })));
  const $ = (id) => document.getElementById(id);
  const state = {
    pool: [], index: 0, selected: new Set(), answered: new Set(), correct: 0,
    activeTags: new Set(), paperIds: new Set(), timerId: null, secondsLeft: 0, timed: false, startedAt: null
  };

  const safeStorage = {
    get(key, fallback = null) {
      try {
        const value = localStorage.getItem(key);
        return value == null ? fallback : JSON.parse(value);
      } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* 不讓儲存失敗中斷作答 */ }
    }
  };

  const questionKey = (q) => `${q.exam.year}${q.exam.subject}-${q.no}`;
  const kindLabel = (kind) => ({ single: "單選題", multi: "多選題", fill: "選填題", written: "非選擇題" }[kind] || kind);
  const difficulty = (q) => q.pass == null ? "未提供" : q.pass >= .7 ? "較易" : q.pass >= .4 ? "中等" : "較難";
  const correctKeys = (q) => String(q.answer).split(/[,，、]/).map((value) => value.trim()).filter(Boolean);
  const normalize = (value) => String(value).trim().replaceAll("，", ",").replaceAll("、", ",").replace(/\s+/g, "").toLowerCase();
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

  function populateFilters() {
    const years = [...new Set(exams.map((exam) => exam.year))].sort((a, b) => b - a);
    const subjects = [...new Map(exams.map((exam) => [exam.subject, exam.label])).entries()];
    $("mainYearOptions").innerHTML = `
      <label class="paper-year-all"><input id="mainYearAll" type="checkbox" value="all" checked> 全部年度</label>
      ${years.map((year) => `<label><input class="main-year-checkbox" type="checkbox" value="${year}"> ${year} 學年度</label>`).join("")}`;
    updateMainYearSummary();
    $("subjectSel").innerHTML = '<option value="all">全部卷別</option>' + subjects.map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
    $("paperYearQuickOptions").innerHTML = `
      <label class="paper-year-all"><input id="paperYearAll" type="checkbox" value="all" checked> 全部年度</label>
      ${years.map((year) => `<label><input class="paper-year-checkbox" type="checkbox" value="${year}"> ${year} 學年度</label>`).join("")}`;
    updatePaperYearQuickSummary();
    $("paperSubjectQuick").innerHTML = '<option value="all">全部卷別</option>' + subjects.map(([value, label]) => `<option value="${value}">${label}</option>`).join("");

    const categoryMap = new Map();
    for (const q of allQuestions) {
      if (!categoryMap.has(q.cat)) categoryMap.set(q.cat, new Set());
      q.tags.forEach((tag) => {
        categoryMap.get(q.cat).add(tag);
        state.activeTags.add(`${q.cat}::${tag}`);
      });
    }
    $("categoryGroups").innerHTML = [...categoryMap.entries()].map(([cat, tags], index) => `
      <div class="catgroup">
        <div class="gtitle">
          <span class="catdot catdot-${index % 8}"></span>
          <b>${escapeHtml(cat)}</b>
          <button class="text-toggle" type="button" data-cat-all="${escapeHtml(cat)}">全選</button>
          <button class="text-toggle" type="button" data-cat-clear="${escapeHtml(cat)}">清除</button>
          <button class="text-toggle expand-toggle" type="button" data-cat-expand="${escapeHtml(cat)}" aria-expanded="false">展開細項 ▾</button>
        </div>
        <div class="tag-checks" data-cat-tags="${escapeHtml(cat)}" hidden>${[...tags].sort().map((tag) => `<label><input class="tagCheck" type="checkbox" data-cat="${escapeHtml(cat)}" value="${escapeHtml(tag)}" checked> ${escapeHtml(tag)}</label>`).join("")}</div>
      </div>`).join("");
  }

  function selectedMainYears() {
    if ($("mainYearAll").checked) return null;
    return new Set(
      [...document.querySelectorAll(".main-year-checkbox:checked")].map((checkbox) =>
        Number(checkbox.value),
      ),
    );
  }

  function updateMainYearSummary() {
    const years = [...document.querySelectorAll(".main-year-checkbox:checked")]
      .map((checkbox) => Number(checkbox.value))
      .sort((a, b) => b - a);
    $("mainYearSummary").textContent =
      $("mainYearAll").checked || !years.length
        ? "全部年度"
        : years.length <= 4
          ? `${years.join("、")} 學年度`
          : `${years.slice(0, 3).join("、")} 等 ${years.length} 個年度`;
  }

  function handleMainYearChange(event) {
    const all = $("mainYearAll");
    const years = [...document.querySelectorAll(".main-year-checkbox")];
    if (event.target === all && all.checked) {
      years.forEach((checkbox) => { checkbox.checked = false; });
    } else if (
      event.target.classList.contains("main-year-checkbox") &&
      event.target.checked
    ) {
      all.checked = false;
    }
    if (!all.checked && !years.some((checkbox) => checkbox.checked)) all.checked = true;
    updateMainYearSummary();
    updateFilterSummary();
  }

  function selectedPaperYears() {
    if ($("paperYearAll").checked) return null;
    return new Set(
      [...document.querySelectorAll(".paper-year-checkbox:checked")].map((checkbox) =>
        Number(checkbox.value),
      ),
    );
  }

  function updatePaperYearQuickSummary() {
    const years = [...document.querySelectorAll(".paper-year-checkbox:checked")]
      .map((checkbox) => Number(checkbox.value))
      .sort((a, b) => b - a);
    $("paperYearQuickSummary").textContent =
      $("paperYearAll").checked || !years.length
        ? "全部年度"
        : years.length <= 4
          ? `${years.join("、")} 學年度`
          : `${years.slice(0, 3).join("、")} 等 ${years.length} 個年度`;
  }

  function handlePaperYearChange(event) {
    const all = $("paperYearAll");
    const years = [...document.querySelectorAll(".paper-year-checkbox")];
    if (event.target === all && all.checked) {
      years.forEach((checkbox) => { checkbox.checked = false; });
    } else if (
      event.target.classList.contains("paper-year-checkbox") &&
      event.target.checked
    ) {
      all.checked = false;
    }
    if (!all.checked && !years.some((checkbox) => checkbox.checked)) all.checked = true;
    updatePaperYearQuickSummary();
  }

  function updateStats() {
    const objective = allQuestions.filter((q) => q.kind !== "written").length;
    $("questionCount").textContent = allQuestions.length;
    $("answerCount").textContent = `${objective} / ${objective}`;
    $("formCount").textContent = `${new Set(exams.map((exam) => exam.year)).size} 年／${exams.length} 份`;
  }

  function selectedKinds() {
    return new Set([...document.querySelectorAll(".kindCheck:checked")].map((box) => box.value));
  }

  function filtered() {
    const years = selectedMainYears();
    const subject = $("subjectSel").value;
    const diff = $("diffSel").value;
    const disc = $("discSel").value;
    const kinds = selectedKinds();
    const done = new Set((safeStorage.get("tvetMathProgress", []) || []).map((row) => `${row.year}${row.subject}-${row.no}`));
    return allQuestions.filter((q) => {
      if (years && !years.has(q.exam.year)) return false;
      if (subject !== "all" && q.exam.subject !== subject) return false;
      if (!kinds.has(q.kind)) return false;
      if (!q.tags.some((tag) => state.activeTags.has(`${q.cat}::${tag}`))) return false;
      if (diff !== "all" && difficulty(q) !== diff) return false;
      if (disc !== "all") {
        if (q.disc == null) return false;
        if (disc === "high" && q.disc < .4) return false;
        if (disc === "mid" && (q.disc < .2 || q.disc >= .4)) return false;
        if (disc === "low" && q.disc >= .2) return false;
      }
      if ($("excludeDone").checked && done.has(questionKey(q))) return false;
      return true;
    });
  }

  function selectedText(id) {
    const select = $(id);
    return select?.options[select.selectedIndex]?.text || "全部";
  }

  function updateFilterSummary() {
    const pool = filtered();
    const allCategories = new Set(allQuestions.map((q) => q.cat));
    const activeCategories = new Set([...state.activeTags].map((key) => key.split("::")[0]));
    const bodyExpanded = !$("filterBody").hidden;
    $("filterSummary").hidden = bodyExpanded;
    const parts = [
      `年份 ${$("mainYearSummary").textContent}`,
      `卷別 ${selectedText("subjectSel")}`,
      `分類 ${activeCategories.size}/${allCategories.size} 類`,
      `每次 ${$("questionLimit").value || 10} 題`,
      $("shuffleCheck").checked ? "隨機" : "依題號",
      `難度 ${selectedText("diffSel")}`,
      `鑑別度 ${selectedText("discSel")}`
    ];
    $("filterSummary").textContent = parts.join(" ・ ");
    $("countInfo").textContent = `符合條件共 ${pool.length} 題（題庫總計 ${allQuestions.length} 題）`;
    if (!$("paperPanel").hidden) renderPaperQuestionList();
  }

  function strategyFor(q) {
    const strategies = {
      "機率與統計": "先確認樣本空間、事件或統計量的定義，再依題目條件列式，避免把互斥、獨立與條件機率混用。",
      "數列與級數": "先辨認等差、等比或遞迴關係，寫出首項、公差／公比與所求項數，再套用對應公式。",
      "函數與圖形": "把題目條件轉成函數式、零點、單調性或圖形位置關係，再逐項檢查。",
      "平面幾何": "先在圖上標記已知長度與角度，再選用相似、向量、三角函數或圓的性質建立關係式。",
      "空間幾何": "先建立方向向量、法向量或空間坐標，再用內積、距離與平行垂直條件判斷。",
      "向量與矩陣": "把幾何或線性關係改寫成向量、矩陣與行列式運算，並檢查方向與符號。",
      "數與式": "先整理代數式的定義域與符號，再用因式分解、指對數或不等式性質化簡。",
      "排列組合": "先釐清是否計順序、能否重複及限制條件，再以加法或乘法原理分情況計數。"
    };
    return strategies[q.cat] || "先把題目條件逐一轉成數學關係，再用定義、公式或圖形性質驗證答案。";
  }

  function explanationHtml(q) {
    const fallback = `<div class="explainBox"><b>解析</b><p>本題考查「${escapeHtml(q.tags.join("、"))}」：${escapeHtml(q.summary)}。${strategyFor(q)}</p><p>依技專校院入學測驗中心（TCTE）官方參考答案，本題答案為 <b>${escapeHtml(q.answer)}</b>。題面中的式子、圖形與數值請以官方原卷裁圖為準。</p></div>`;
    return window.MathQuestionUI.solutionHtml(q, fallback);
  }

  function optionAnalysisHtml(q) {
    return window.MathQuestionUI.optionAnalysisHtml(q);
  }

  function updateScorebar() {
    $("answeredNow").textContent = state.answered.size;
    $("totalNow").textContent = state.pool.length;
    $("correctNow").textContent = state.correct;
    $("scoreProgress").style.width = `${state.pool.length ? state.answered.size / state.pool.length * 100 : 0}%`;
    $("timerText").textContent = state.timed ? `剩餘時間 ${formatTime(state.secondsLeft)}` : "";
  }

  function formatTime(seconds) {
    const safe = Math.max(0, seconds);
    return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
  }

  function startTimer(minutes) {
    clearInterval(state.timerId);
    state.timed = Boolean(minutes);
    state.secondsLeft = Math.round(minutes * 60);
    updateScorebar();
    if (!state.timed) return;
    state.timerId = setInterval(() => {
      state.secondsLeft -= 1;
      updateScorebar();
      if (state.secondsLeft <= 0) {
        clearInterval(state.timerId);
        alert("作答時間到，系統已停止計時。");
        recordSession();
      }
    }, 1000);
  }

  function render() {
    const q = state.pool[state.index];
    if (!q) {
      $("questionArea").innerHTML = '<div class="panel empty">目前條件沒有符合的題目，請調整篩選。</div>';
      return;
    }
    state.selected.clear();
    const stats = q.pass == null ? "" : `<div class="meta-grid"><div class="meta-box"><b>${Math.round(q.pass * 100)}%</b><span>${q.kind === "multi" ? "官方得分率 P" : "官方答對率 P"}</span></div><div class="meta-box"><b>${Math.round(q.disc * 100)}</b><span>官方鑑別度 D</span></div><div class="meta-box"><b>${difficulty(q)}</b><span>依 P 值分級</span></div></div>`;
    const structured = window.MathQuestionUI.contentFor(q)?.verified;
    const group = q.groupImage && !structured ? `<img class="group-image" src="${q.groupImage}" alt="共用題組材料">` : "";
    $("questionArea").innerHTML = `<article class="panel question-card">
      <div class="question-head"><div><p class="eyebrow">${q.exam.year} 學年度・${q.exam.label}</p><h2 class="question-title">第 ${q.no} 題｜${escapeHtml(q.summary)}</h2><div class="chips"><span class="chip">${escapeHtml(q.cat)}</span><span class="chip">${escapeHtml(q.tags[0])}</span><span class="chip accent">${kindLabel(q.kind)}</span></div></div><div class="counter">${state.index + 1} / ${state.pool.length}</div></div>
      ${group}${window.MathQuestionUI.questionBodyHtml(q)}
      <div class="answer-zone">${answerControl(q)}</div><div id="feedback" class="feedback" role="status" aria-live="polite"></div><div id="postAnswer"></div>${stats}
      <div class="btn-row"><button class="btn ghost" id="prevBtn" type="button">上一題</button><button class="btn secondary" id="nextBtn" type="button">下一題</button><a class="btn ghost" href="check?year=${q.exam.year}&subject=${q.exam.subject}&no=${q.no}">查題校對</a><button class="btn ghost report-question-btn" id="questionReportBtn" type="button">回報本題問題</button></div>
    </article>`;
    bindQuestion(q);
    $("questionArea").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function answerControl(q) {
    if (q.kind === "single" || q.kind === "multi") {
      return `<p>${q.kind === "multi" ? "可複選，選好後送出。" : "請選一個答案。"}</p><div class="choice-list">${Array.from({ length: q.optionCount }, (_, i) => {
        const key = String.fromCharCode(65 + i);
        return `<button class="choice" type="button" data-choice="${key}" aria-pressed="false"><span>(${key})</span><span class="choice-content">${window.MathQuestionUI.optionHtml(q, key)}</span></button>`;
      }).join("")}</div><div class="btn-row"><button class="btn" id="submitBtn" type="button">送出答案</button></div>`;
    }
    if (q.kind === "fill") return `<label for="fillAnswer"><b>輸入答案</b>（分數可用 /，根號可用 √）</label><input id="fillAnswer" type="text" autocomplete="off"><div class="btn-row"><button class="btn" id="submitBtn" type="button">送出答案</button></div>`;
    return `<p>非選擇題依推理過程評分，請完成後對照官方評分原則。</p><a class="btn" href="${q.rubricUrl}" target="_blank" rel="noopener">查看官方評分原則</a><div class="btn-row"><button class="btn" id="selfCheckBtn" type="button">已自行核對</button></div>`;
  }

  function bindQuestion(q) {
    document.querySelectorAll(".choice").forEach((button) => button.addEventListener("click", () => {
      const value = button.dataset.choice;
      if (q.kind === "single") {
        state.selected.clear();
        document.querySelectorAll(".choice").forEach((item) => { item.classList.remove("selected"); item.setAttribute("aria-pressed", "false"); });
      }
      if (state.selected.has(value)) {
        state.selected.delete(value); button.classList.remove("selected"); button.setAttribute("aria-pressed", "false");
      } else {
        state.selected.add(value); button.classList.add("selected"); button.setAttribute("aria-pressed", "true");
      }
    }));
    $("submitBtn")?.addEventListener("click", () => check(q));
    $("selfCheckBtn")?.addEventListener("click", () => markWritten(q));
    $("prevBtn").addEventListener("click", () => { state.index = Math.max(0, state.index - 1); render(); });
    $("nextBtn").addEventListener("click", () => { state.index = Math.min(state.pool.length - 1, state.index + 1); render(); });
    $("questionReportBtn").addEventListener("click", () => window.MathReport.openQuestion(q));
  }

  function markWritten(q) {
    const key = questionKey(q);
    if (!state.answered.has(key)) {
      state.answered.add(key);
      const history = safeStorage.get("tvetMathProgress", []) || [];
      history.push({ year: q.exam.year, subject: q.exam.subject, no: q.no, ok: null, at: new Date().toISOString() });
      safeStorage.set("tvetMathProgress", history.slice(-1000));
    }
    $("postAnswer").innerHTML = explanationHtml(q) + optionAnalysisHtml(q);
    updateScorebar();
    if (state.answered.size === state.pool.length) recordSession();
  }

  function check(q) {
    const response = q.kind === "fill" ? $("fillAnswer").value : [...state.selected].sort().join(",");
    if (!response) return alert("請先作答再送出。");
    // 官方公告送分／一題兩解的題目 answer 會寫成「A、B、C、D」，單選題任選其一皆算對
    const ok = q.kind === "single"
      ? correctKeys(q).some((key) => normalize(key) === normalize(response))
      : normalize(response) === normalize(q.answer);
    const key = questionKey(q);
    const firstAttempt = !state.answered.has(key);
    if (firstAttempt) {
      state.answered.add(key);
      if (ok) state.correct += 1;
      const history = safeStorage.get("tvetMathProgress", []) || [];
      history.push({ year: q.exam.year, subject: q.exam.subject, no: q.no, ok, at: new Date().toISOString() });
      safeStorage.set("tvetMathProgress", history.slice(-1000));
      const wrong = new Set(safeStorage.get("tvetMathWrong", []) || []);
      if (ok) wrong.delete(key); else wrong.add(key);
      safeStorage.set("tvetMathWrong", [...wrong]);
      updateWrongCount();
    }
    const feedback = $("feedback");
    feedback.className = `feedback show ${ok ? "ok" : "bad"}`;
    const noteSuffix = q.note ? `（${q.note}）` : "";
    feedback.textContent = ok ? `✓ 答對了！${noteSuffix}` : `✗ 答錯了。官方答案：${q.answer}${noteSuffix}`;
    $("postAnswer").innerHTML = explanationHtml(q) + optionAnalysisHtml(q);
    $("submitBtn").disabled = true;
    document.querySelectorAll(".choice").forEach((button) => {
      button.disabled = true;
      if (correctKeys(q).includes(button.dataset.choice)) button.classList.add("correct");
    });
    updateScorebar();
    if (state.answered.size === state.pool.length) {
      clearInterval(state.timerId);
      state.timed = false;
      $("timerText").textContent = "作答完成";
      recordSession();
    }
  }

  function recordSession() {
    if (!state.startedAt || state.sessionRecorded) return;
    state.sessionRecorded = true;
    const sessions = safeStorage.get("tvetMathSessions", []) || [];
    sessions.push({ at: new Date().toISOString(), total: state.pool.length, answered: state.answered.size, correct: state.correct, seconds: Math.round((Date.now() - state.startedAt) / 1000) });
    safeStorage.set("tvetMathSessions", sessions.slice(-100));
  }

  function start({ pool = null, forceShuffle = null, limit = null, minutes = null } = {}) {
    clearInterval(state.timerId);
    let next = pool ? [...pool] : filtered();
    if ($("easyFirst").checked) next.sort((a, b) => (b.pass ?? -1) - (a.pass ?? -1));
    else if (forceShuffle ?? $("shuffleCheck").checked) next.sort(() => Math.random() - .5);
    const cap = limit ?? Math.max(1, Number($("questionLimit").value) || 10);
    if (!pool) next = next.slice(0, cap);
    state.pool = next; state.index = 0; state.answered = new Set(); state.correct = 0; state.startedAt = Date.now(); state.sessionRecorded = false;
    $("scorebar").style.display = "block";
    startTimer(minutes ?? ($("timedCheck").checked ? Math.max(1, Math.round(next.length * 1.5)) : 0));
    render(); updateFilterSummary(); updateScorebar();
  }

  function updateWrongCount() {
    const count = (safeStorage.get("tvetMathWrong", []) || []).length;
    $("wrongCount").textContent = count;
    $("reviewBtn").hidden = count === 0;
    $("reviewBtn").querySelector("b").textContent = count;
  }

  function showUtility(html) {
    $("utilityPanel").hidden = false;
    $("utilityPanel").innerHTML = html;
    $("utilityPanel").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function selectedPaperQuestions() {
    return allQuestions.filter((q) => state.paperIds.has(questionKey(q)));
  }

  function updatePaperCount() {
    $("paperSelectedCount").textContent = `已選 ${state.paperIds.size} 題`;
  }

  function renderPaperQuestionList() {
    const pool = filtered();
    $("paperFilterInfo").textContent = `目前套用篩選：年份 ${$("mainYearSummary").textContent}・卷別 ${selectedText("subjectSel")}，符合 ${pool.length} 題（可回到上方「選擇範圍」調整類別、年份、難度與鑑別度）。`;
    $("paperQuestionList").innerHTML = pool.length ? pool.map((q) => {
      const key = questionKey(q);
      return `<label class="paper-item"><input class="paperCheck" type="checkbox" value="${key}" ${state.paperIds.has(key) ? "checked" : ""}><span><b>${q.exam.year} 學年度・${escapeHtml(q.exam.label)}・第 ${q.no} 題</b><br>${escapeHtml(q.summary)}・${escapeHtml(difficulty(q))}</span></label>`;
    }).join("") : '<p class="empty">目前條件沒有可出卷的題目。</p>';
    document.querySelectorAll(".paperCheck").forEach((box) => box.addEventListener("change", () => {
      box.checked ? state.paperIds.add(box.value) : state.paperIds.delete(box.value);
      updatePaperCount();
    }));
    updatePaperCount();
  }

  function openPaperPanel() {
    $("utilityPanel").hidden = true;
    $("paperPanel").hidden = false;
    $("paperLinkOutput").hidden = true;
    renderPaperQuestionList();
    $("paperPanel").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function paperQuestionBodyHtml(q) {
    const content = window.MathQuestionUI.contentFor(q);
    if (!content?.verified) return `<img class="question-image" src="${q.image}" alt="官方題面">`;
    const figures = (content.figures || []).map((figure) => `<figure class="question-figure"><img src="${figure.src}" alt="${escapeHtml(figure.alt)}">${figure.caption ? `<figcaption>${escapeHtml(figure.caption)}</figcaption>` : ""}</figure>`).join("");
    const options = content.options ? `<ol class="paper-options">${Object.entries(content.options).map(([key, value]) => `<li value="${key}">${window.MathQuestionUI.richText(value)}</li>`).join("")}</ol>` : "";
    return `<div class="paper-body"><div class="stem">${window.MathQuestionUI.richText(content.stem)}</div>${figures}${options}</div>`;
  }

  function renderPaperDocument(pool) {
    const questions = pool.map((q, index) => `<article class="panel paper-question"><b>${index + 1}. ${q.exam.year} 學年度・${escapeHtml(q.exam.label)}・原題第 ${q.no} 題</b>${paperQuestionBodyHtml(q)}</article>`).join("");
    const answers = pool.map((q, index) => `<span>${index + 1}. <b>${escapeHtml(q.answer)}</b></span>`).join("");
    const solutions = pool.map((q, index) => `<article class="paper-solution"><h3>${index + 1}. ${q.exam.year} 學年度・原題第 ${q.no} 題</h3>${explanationHtml(q)}</article>`).join("");
    $("questionArea").innerHTML = `${questions}<section class="panel paper-teacher"><h2>教師答案卷</h2><div class="paper-answer-grid">${answers}</div><h2>教師詳解卷</h2>${solutions}</section>`;
  }

  function requirePaperSelection() {
    const pool = selectedPaperQuestions();
    if (!pool.length) alert("請先勾選至少一題。");
    return pool;
  }

  function paperQuizUrl(pool) {
    const url = new URL(location.href);
    url.search = "";
    url.hash = "";
    url.searchParams.set("quiz", pool.map(questionKey).join("."));
    return url.toString();
  }

  function createPaperLink() {
    const pool = requirePaperSelection();
    if (!pool.length) return;
    const url = paperQuizUrl(pool);
    $("paperLinkOutput").hidden = false;
    $("paperLinkOutput").innerHTML = `學生測驗連結：<a href="${escapeHtml(url)}">${escapeHtml(url)}</a>　<button class="text-toggle" id="copyPaperLinkBtn" type="button">複製連結</button>`;
    $("copyPaperLinkBtn").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(url);
        $("copyPaperLinkBtn").textContent = "已複製";
      } catch {
        prompt("請複製以下測驗連結：", url);
      }
    });
  }

  function printPaper() {
    const pool = requirePaperSelection();
    if (!pool.length) return;
    renderPaperDocument(pool);
    let pageStyle = $("paperPageStyle");
    if (!pageStyle) {
      pageStyle = document.createElement("style");
      pageStyle.id = "paperPageStyle";
      document.head.append(pageStyle);
    }
    pageStyle.textContent = `@page { size: ${$("paperSizeSel").value} portrait; margin: 12mm; }`;
    setTimeout(() => window.print(), 350);
  }

  function downloadPaperWord() {
    const pool = requirePaperSelection();
    if (!pool.length) return;
    const absoluteQuestionBody = (q) => paperQuestionBodyHtml(q).replace(/src="([^"]+)"/g, (_match, path) => `src="${new URL(path, location.href).href}"`);
    const questions = pool.map((q, index) => `<section><h2>${index + 1}. ${q.exam.year} 學年度・${escapeHtml(q.exam.label)}・原題第 ${q.no} 題</h2>${absoluteQuestionBody(q)}</section>`).join("");
    const answers = pool.map((q, index) => `<p>${index + 1}. <b>${escapeHtml(q.answer)}</b></p>`).join("");
    const solutions = pool.map((q, index) => `<section><h3>${index + 1}. ${q.exam.year} 學年度・原題第 ${q.no} 題</h3>${explanationHtml(q)}</section>`).join("");
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>數學科練習測驗卷</title><style>body{font-family:"Noto Serif TC","Microsoft JhengHei",serif;line-height:1.7}img{max-width:100%;height:auto}section{page-break-inside:avoid}.teacher{page-break-before:always}.paper-options{columns:2}.katex-html{display:none}</style></head><body><h1>數學科練習測驗卷</h1>${questions}<div class="teacher"><h1>教師答案卷</h1>${answers}<h1>教師詳解卷</h1>${solutions}</div></body></html>`;
    const blob = new Blob(["\ufeff", html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "數學科練習測驗卷.doc";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1_000);
  }

  function loadLinkedQuiz() {
    const ids = new URLSearchParams(location.search).get("quiz")?.split(".").filter(Boolean);
    if (!ids?.length) return;
    const byKey = new Map(allQuestions.map((q) => [questionKey(q), q]));
    const pool = ids.map((id) => byKey.get(id)).filter(Boolean);
    if (pool.length) start({ pool, forceShuffle: false, limit: pool.length, minutes: 0 });
  }

  populateFilters();
  updateStats();
  updateWrongCount();
  updateFilterSummary();

  // 統測（TCTE）不公布逐題答對率／鑑別度：題庫中完全沒有官方統計時，把相關 UI 整組隱藏。
  if (!allQuestions.some((q) => q.pass != null)) {
    ["diffSel", "discSel", "easyFirst", "paperDiffQuick"].forEach((id) => {
      const label = $(id)?.closest("label");
      if (label) label.hidden = true;
    });
    $("rankingBtn").hidden = true;
    document.querySelector(".filter-note")?.setAttribute("hidden", "");
  }

  document.querySelectorAll(".tagCheck").forEach((box) => box.addEventListener("change", () => {
    const key = `${box.dataset.cat}::${box.value}`;
    box.checked ? state.activeTags.add(key) : state.activeTags.delete(key);
    updateFilterSummary();
  }));
  document.querySelectorAll("[data-cat-all]").forEach((button) => button.addEventListener("click", () => {
    [...document.querySelectorAll(".tagCheck")].filter((box) => box.dataset.cat === button.dataset.catAll).forEach((box) => { box.checked = true; state.activeTags.add(`${box.dataset.cat}::${box.value}`); });
    updateFilterSummary();
  }));
  document.querySelectorAll("[data-cat-clear]").forEach((button) => button.addEventListener("click", () => {
    [...document.querySelectorAll(".tagCheck")].filter((box) => box.dataset.cat === button.dataset.catClear).forEach((box) => { box.checked = false; state.activeTags.delete(`${box.dataset.cat}::${box.value}`); });
    updateFilterSummary();
  }));
  document.querySelectorAll("[data-cat-expand]").forEach((button) => button.addEventListener("click", () => {
    const tags = document.querySelector(`[data-cat-tags="${CSS.escape(button.dataset.catExpand)}"]`);
    const expanded = button.getAttribute("aria-expanded") === "true";
    tags.hidden = expanded;
    button.setAttribute("aria-expanded", String(!expanded));
    button.textContent = expanded ? "展開細項 ▾" : "收合細項 ▴";
  }));
  $("allToggle").addEventListener("click", () => {
    const boxes = [...document.querySelectorAll(".tagCheck")];
    const selectAll = boxes.some((box) => !box.checked);
    boxes.forEach((box) => {
      box.checked = selectAll;
      const key = `${box.dataset.cat}::${box.value}`;
      if (selectAll) state.activeTags.add(key); else state.activeTags.delete(key);
    });
    updateFilterSummary();
  });
  ["subjectSel","questionLimit","shuffleCheck","timedCheck","diffSel","discSel","excludeDone","easyFirst"].forEach((id) => $(id).addEventListener("change", updateFilterSummary));
  $("mainYearOptions").addEventListener("change", handleMainYearChange);
  $("questionLimit").addEventListener("input", updateFilterSummary);
  document.querySelectorAll(".kindCheck").forEach((box) => box.addEventListener("change", updateFilterSummary));

  $("startBtn").addEventListener("click", () => start());
  $("quickStartBtn").addEventListener("click", () => start({ forceShuffle: true, limit: 10 }));
  $("mockBtn").addEventListener("click", () => {
    const years = selectedMainYears();
    const subject = $("subjectSel").value;
    if (!years || years.size !== 1) {
      if ($("filterBody").hidden) $("advToggle").click();
      $("mainYearFilter").open = true;
      $("mainYearSummary").focus();
      $("mainYearSummary").scrollIntoView({ behavior: "smooth", block: "center" });
      return alert("整回模考一次只能使用一份原卷，請只勾選一個特定年份。");
    }
    const year = [...years][0];
    const forms = exams.filter((item) => item.year === Number(year) && (subject === "all" || item.subject === subject));
    if (forms.length > 1) {
      if ($("filterBody").hidden) $("advToggle").click();
      $("subjectSel").focus();
      $("subjectSel").scrollIntoView({ behavior: "smooth", block: "center" });
      return alert("這個年份有多份數學考卷，請再選擇卷別。");
    }
    const exam = forms[0];
    if (!exam) return alert("目前年份與卷別組合沒有完整考卷，請重新選擇。");
    start({ pool: exam.questions.map((q) => ({ ...q, exam })), forceShuffle: false, limit: exam.questions.length, minutes: exam.duration });
  });
  $("paperBtn").addEventListener("click", openPaperPanel);
  $("paperCloseBtn").addEventListener("click", () => { $("paperPanel").hidden = true; });
  $("paperSelectAllBtn").addEventListener("click", () => {
    filtered().forEach((q) => state.paperIds.add(questionKey(q)));
    renderPaperQuestionList();
  });
  $("paperSelectNoneBtn").addEventListener("click", () => {
    state.paperIds.clear();
    renderPaperQuestionList();
  });
  $("paperYearQuickOptions").addEventListener("change", handlePaperYearChange);
  $("paperQuickBtn").addEventListener("click", () => {
    const years = selectedPaperYears();
    const subject = $("paperSubjectQuick").value;
    const diff = $("paperDiffQuick").value;
    state.paperIds.clear();
    filtered().filter((q) => {
      if (years && !years.has(q.exam.year)) return false;
      if (subject !== "all" && q.exam.subject !== subject) return false;
      return diff === "all" || difficulty(q) === diff;
    }).forEach((q) => state.paperIds.add(questionKey(q)));
    renderPaperQuestionList();
  });
  $("paperLinkBtn").addEventListener("click", createPaperLink);
  $("paperPrintBtn").addEventListener("click", printPaper);
  $("paperWordBtn").addEventListener("click", downloadPaperWord);
  $("rankingBtn").addEventListener("click", () => {
    const rows = allQuestions.filter((q) => q.pass != null).sort((a, b) => a.pass - b.pass).slice(0, 20);
    showUtility(`<div class="toolrow"><h2>難度排行榜</h2><button class="text-toggle close-utility" type="button">關閉</button></div><p>依官方 P 值由低至高排列。</p><ol class="ranking-list">${rows.map((q) => `<li><b>${q.exam.year}・${q.exam.label}・第 ${q.no} 題</b>　${escapeHtml(q.summary)}　<span>${Math.round(q.pass * 100)}%</span></li>`).join("")}</ol>`);
    document.querySelector(".close-utility")?.addEventListener("click", () => { $("utilityPanel").hidden = true; });
  });
  $("wrongBtn").addEventListener("click", () => {
    const keys = new Set(safeStorage.get("tvetMathWrong", []) || []);
    const pool = allQuestions.filter((q) => keys.has(questionKey(q)));
    if (!pool.length) return alert("錯題本目前沒有題目。");
    start({ pool, forceShuffle: false, limit: pool.length });
  });
  $("reviewBtn").addEventListener("click", () => $("wrongBtn").click());
  $("historyBtn").addEventListener("click", () => {
    const sessions = (safeStorage.get("tvetMathSessions", []) || []).slice().reverse();
    showUtility(`<div class="toolrow"><h2>學習歷程</h2><button class="text-toggle close-utility" type="button">關閉</button></div>${sessions.length ? sessions.map((row) => `<div class="history-row"><span>${new Date(row.at).toLocaleString("zh-TW")}</span><b>${row.correct}／${row.total}</b><span>作答 ${row.answered} 題・${formatTime(row.seconds)}</span></div>`).join("") : "<p>尚無完整練習紀錄。</p>"}`);
    document.querySelector(".close-utility")?.addEventListener("click", () => { $("utilityPanel").hidden = true; });
  });
  $("advToggle").addEventListener("click", () => {
    const expanded = $("advToggle").getAttribute("aria-expanded") === "true";
    $("filterBody").hidden = expanded;
    $("advToggle").setAttribute("aria-expanded", String(!expanded));
    $("advToggle").textContent = expanded ? "展開進階篩選 ▾" : "收合進階篩選 ▴";
    updateFilterSummary();
  });
  $("moreToggle").addEventListener("click", () => {
    const expanded = $("moreToggle").getAttribute("aria-expanded") === "true";
    $("moreTools").hidden = expanded;
    $("moreToggle").setAttribute("aria-expanded", String(!expanded));
    $("moreToggle").textContent = expanded ? "更多功能 ▾" : "更多功能 ▴";
  });

  const savedFontSize = safeStorage.get("tvetMathFontSize", "");
  if (["fs-lg", "fs-xl"].includes(savedFontSize)) document.documentElement.classList.add(savedFontSize);
  $("fsFold").addEventListener("click", () => {
    const folded = $("fsCtrl").classList.toggle("folded");
    $("fsFold").setAttribute("aria-expanded", String(!folded));
  });
  [["fsSmall",""],["fsLarge","fs-lg"],["fsXLarge","fs-xl"]].forEach(([id, className]) => $(id).addEventListener("click", () => {
    document.documentElement.classList.remove("fs-lg", "fs-xl");
    if (className) document.documentElement.classList.add(className);
    safeStorage.set("tvetMathFontSize", className);
  }));
  loadLinkedQuiz();
})();
