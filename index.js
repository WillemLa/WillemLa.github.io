const students = [
  { id: 1, name: "Alice Morgan" },
  { id: 2, name: "Ben Thompson" },
  { id: 3, name: "Carla Diaz" },
  { id: 4, name: "Daniel Wu" },
];

const exercises = [
  { id: 1, label: "Oefening 1" },
  { id: 2, label: "Oefening 2" },
  //{ id: 3, label: "Oefening 3" },
  //{ id: 4, label: "Oefening 4" },
];

// Criteria and alert definitions per criterion
const criteria = [
  { id: "readability", label: "Leesbaarheid" },
  { id: "tutorial", label: "Tutorial" },
  { id: "concepts", label: "Codeconcepten" },
  { id: "testDebug", label: "Testen & Debuggen" },
  { id: "time", label: "Tijdsbesteding" },
];

const alertDefsByCriterion = {
  readability: {
    multipleIssues: {
      type: "issue",
      icon: "‼️",
      text: "Meerdere Opmerkingen",
      title: "Meerdere opmerkingen",
    },
    naming: {
      type: "issue",
      icon: "⚠️",
      text: "Inconsistente Naamgeving",
      title: "Inconsistente Functienamen",
    },
    oneletter: {
      type: "issue",
      icon: "⚠️",
      text: "Niet-descriptieve Naamgeving",
      title: "Niet-descriptieve Naamgeving",
    },
    mixed: {
      type: "issue",
      icon: "⚠️",
      text: "Inconsistente Variabelenamen",
      title: "Inconsistente Variabelenamen",
    },
    comments: {
      type: "issue",
      icon: "⚠️",
      text: "Ontbrekend Commentaar",
      title: "Ontbrekend Commentaar",
    },
    correct: {
      type: "correct",
      icon: "✅",
      text: "Correct",
      title: "Geen Opmerkingen",
    },
    base: {
      type: "base",
      icon: "🔍",
      text: "",
      title: "",
    },
  },
  tutorial: {}, // will be populated from readability below
  concepts: {
    multipleIssues: {
      type: "issue",
      icon: "‼️",
      text: "Meerdere Opmerkingen",
      title: "Meerdere opmerkingen",
    },
    loop: {
      type: "issue",
      icon: "⚠️",
      text: "Loop",
      title: "Loop (for/while/do-while)",
    },
    function: {
      type: "issue",
      icon: "⚠️",
      text: "Function",
      title: "Functie",
    },
    conditional: {
      type: "issue",
      icon: "⚠️",
      text: "Conditional",
      title: "Voorwaarde (if/else/switch)",
    },
    correct: {
      type: "correct",
      icon: "✅",
      text: "Correct",
      title: "Geen fouten",
    },
    base: {
      type: "base",
      icon: "🔍",
      text: "",
      title: "",
    },
  },
  // Combined: testing + debugging
  testDebug: {
    // Testing
    noTests: {
      type: "issue",
      icon: "🧪",
      text: "Geen tests",
      title: "Geen tests aanwezig",
    },
    hasTests: {
      type: "correct",
      icon: "✅",
      text: "Tests aanwezig",
      title: "Tests aanwezig",
    },
    // Debugging
    trialAndError: {
      type: "issue",
      icon: "🐛",
      text: "Trial-and-error",
      title: "Geen systematische debugging",
    },
    usedDebugger: {
      type: "correct",
      icon: "✅",
      text: "Debugger/logs",
      title: "Debugger of logging gebruikt",
    },
  },
  time: {
    tooShort: {
      type: "issue",
      icon: "⏱️",
      text: "< 5 min",
      title: "Erg korte werktijd",
    },
    long: {
      type: "info",
      icon: "⏲️",
      text: "Lang",
      title: "Bovengemiddelde werktijd",
    },
    onTarget: {
      type: "correct",
      icon: "✅",
      text: "OK",
      title: "Tijd binnen verwachting",
    },
  },
};

// Make tutorial share the same alert definitions as readability
alertDefsByCriterion.tutorial = { ...alertDefsByCriterion.readability };

// Map: results[studentId][exerciseId] = array of alert keys (empty = correct)
const results = {
  1: {
    1: ["correct"],
    2: ["correct"],
    3: ["oneletter"], // error: naming
    4: ["correct"],
    5: ["correct"],
    6: ["correct"],
    7: ["comments"], // error: comments
  },
  2: {
    1: ["correct"],
    2: ["correct"],
    3: ["correct"],
    4: ["oneletter"], // error: oneletter
    5: ["correct"],
    6: ["correct"],
    7: ["correct"],
  },
  3: {
    1: ["multipleIssues"],
    2: ["multipleIssues"], // error: mixed
    3: ["correct"],
    4: ["correct"],
    5: ["correct"],
    6: ["correct"],
    7: ["correct"],
  },
  4: {
    1: ["correct"],
    2: ["oneletter"],
    3: ["correct"],
    4: ["correct"],
    5: ["correct"],
    6: ["naming", "oneletter"], // error: naming + oneletter
    7: ["correct"],
  },
};

// Criterion-aware results container
var resultsByCriterion = {
  readability: {
    1: { 1: ["correct"], 2: ["naming"] },
    2: { 1: ["oneletter"], 2: ["correct"] },
    3: { 1: ["multipleIssues"], 2: ["multipleIssues"] },
    4: { 1: ["correct"], 2: ["oneletter"] },
  },
  tutorial: {}, // will be populated from readability below
  concepts: {
    1: { 1: ["correct"], 2: ["correct"] },
    2: { 1: ["correct"], 2: ["correct"] },
    3: { 1: ["multipleIssues"], 2: ["correct"] },
    4: { 1: ["correct"], 2: ["multipleIssues"] },
  },
  testDebug: {},
  time: {},
};

const q = parseQuery();
console.log(Number(q.version));
if (Number(q.version) == 1) {
  resultsByCriterion = {
    readability: {
      1: { 1: ["base"], 2: ["base"] },
      2: { 1: ["base"], 2: ["base"] },
      3: { 1: ["base"], 2: ["base"] },
      4: { 1: ["base"], 2: ["base"] },
    },
    tutorial: {}, // will be populated from readability below
    concepts: {
      1: { 1: ["base"], 2: ["base"] },
      2: { 1: ["base"], 2: ["base"] },
      3: { 1: ["base"], 2: ["base"] },
      4: { 1: ["base"], 2: ["base"] },
    },
    testDebug: {},
    time: {},
  };
}

// Mirror readability results into tutorial by default
resultsByCriterion.tutorial = JSON.parse(
  JSON.stringify(resultsByCriterion.readability)
);

function metricsKey(studentId, exerciseId) {
  return `exerciseMetrics:${studentId}:${exerciseId}`;
}

function deriveTestingStatus(metrics) {
  return metrics && metrics.wroteTests ? ["hasTests"] : ["noTests"];
}

function deriveDebuggingStatus(metrics) {
  if (metrics && metrics.usedDebugger) return ["usedDebugger"];
  if (metrics && metrics.trialAndError) return ["trialAndError"];
  return ["trialAndError"]; // default to trial-and-error if unknown
}

function deriveTimeStatus(seconds) {
  if (!seconds || seconds < 5 * 60) return ["tooShort"];
  if (seconds > 25 * 60) return ["long"];
  return ["onTarget"];
}

function loadDerivedCriterionResults() {
  const concepts = {};
  for (const s of students) {
    concepts[s.id] = {};
    for (const ex of exercises) {
      try {
        const raw = localStorage.getItem(`exerciseConcepts:${s.id}:${ex.id}`);
        if (!raw) continue;
        const list = JSON.parse(raw);
        concepts[s.id][ex.id] = Array.isArray(list) ? list : [];
      } catch (e) {
        // ignore parse errors
      }
    }
  }
  //resultsByCriterion.concepts = concepts; TODO to get it from the files themselves
}

function goToExercise(studentId, exerciseId, timeSegment = null) {
  const ver = typeof exerciseVersion === "number" ? exerciseVersion : 1;
  let url = `students/exercise.html?student=${studentId}&exercise=${exerciseId}&criterion=${selectedCriterion}&version=${ver}`;
  if (timeSegment !== null) {
    url += `&segment=${timeSegment}`;
  }
  window.location.href = url;
}

let selectedCriterion = "readability";
let timeGrouping = "byStudent"; // or "byExercise"
let exerciseVersion = 1; // 1, 2, or 3 to dictate individual overview version

// ---------------- URL/state sync helpers ----------------
function parseQuery() {
  try {
    const params = new URLSearchParams(window.location.search);
    const segment = params.get("segment");
    return {
      criterion: params.get("criterion") || null,
      timeGrouping: params.get("timeGrouping") || null,
      version: params.get("version") || null,
    };
  } catch {
    return {};
  }
}

function updateUrl(push = true) {
  try {
    const params = new URLSearchParams(window.location.search);
    params.set("criterion", selectedCriterion);
    params.set("timeGrouping", timeGrouping);
    if (
      typeof exerciseVersion === "number" &&
      exerciseVersion >= 1 &&
      exerciseVersion <= 3
    ) {
      params.set("version", String(exerciseVersion));
    } else {
      params.delete("version");
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    const state = { selectedCriterion, timeGrouping, exerciseVersion };
    if (push) {
      history.pushState(state, "", newUrl);
    } else {
      history.replaceState(state, "", newUrl);
    }
  } catch {}
}

function applyExplanationToDashboardView() {
  const select = document.getElementById("criterion-select");
  const selectedValue = select.value;
  const explanation = document.getElementById("exercise-explanation");
}

function applyStateToUI(fromPopstate = false) {
  // Update label and selects based on current globals
  const select = document.getElementById("criterion-select");
  const label = document.getElementById("criterion-label");
  const timeGroupingEl = document.getElementById("time-grouping");
  if (select) select.value = selectedCriterion;
  const c = criteria.find((c) => c.id === selectedCriterion);
  if (c && label) label.textContent = c.label;
  // Always hide criterion select on overall overview
  if (select) select.style.display = "none";
  if (timeGroupingEl) {
    timeGroupingEl.style.display =
      selectedCriterion === "time" || selectedCriterion === "testDebug"
        ? "inline-block"
        : "none";
    timeGroupingEl.value = timeGrouping;
  }
  loadDerivedCriterionResults();
  maybeRenderGraphs();
}

function renderDashboardTable() {
  const table = document.getElementById("dashboard-table");
  const graphView = document.getElementById("graph-view");
  if (graphView) graphView.style.display = "none";
  if (table) table.style.display = "table";
  const criterionAlerts = alertDefsByCriterion[selectedCriterion] || {};
  const criterionResults = resultsByCriterion[selectedCriterion] || {};
  // Header
  let thead = "<thead><tr><th>Naam</th>";
  for (const ex of exercises) {
    thead += `<th>${ex.label}</th>`;
  }
  thead += "</tr></thead>";

  // Body
  let tbody = "<tbody>";
  for (const student of students) {
    tbody += `<tr><td>${student.name}</td>`;
    for (const ex of exercises) {
      let alertKeys = [];
      if (
        selectedCriterion === "readability" ||
        selectedCriterion === "tutorial" ||
        selectedCriterion === "concepts"
      ) {
        alertKeys =
          (criterionResults[student.id] &&
            criterionResults[student.id][ex.id]) ||
          [];
      } else {
        // For testDebug/time we don't render cell indicators; leave empty clickable cells
        alertKeys = [];
      }
      const alerts = alertKeys
        .map((key) => criterionAlerts[key])
        .filter(Boolean);

      const hasIssue = alerts.some((a) => a.type === "issue");
      tbody += `<td class="exercise-cell${
        hasIssue ? " has-issue" : ""
      }" data-alerts='${JSON.stringify(alerts)}' onclick="goToExercise('${
        student.id
      }', '${ex.id}')">`;
      for (const alert of alerts) {
        tbody += `<span class="alert ${alert.type}" title="${alert.title}"><b>${alert.icon}</b></span>`;
      }
      tbody += "</td>";
    }
    tbody += "</tr>";
  }
  tbody += "</tbody>";
  table.innerHTML = thead + tbody;

  // Add hover listeners to show/hide alert text
  document.querySelectorAll(".exercise-cell").forEach((cell) => {
    cell.addEventListener("mouseenter", function () {
      const alerts = JSON.parse(this.getAttribute("data-alerts"));
      const alertSpans = this.querySelectorAll(".alert");
      alertSpans.forEach((span, i) => {
        if (alerts[i] && alerts[i].type !== "correct") {
          const textSpan = document.createElement("span");
          textSpan.className = "alert-text";
          textSpan.textContent = " " + alerts[i].text;
          span.appendChild(textSpan);
        }
      });
    });
    cell.addEventListener("mouseleave", function () {
      this.querySelectorAll(".alert-text").forEach((el) => el.remove());
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // set up selector
  const select = document.getElementById("criterion-select");
  const label = document.getElementById("criterion-label");
  const timeGroupingEl = document.getElementById("time-grouping");
  if (select && label) {
    select.addEventListener("change", function (e) {
      selectedCriterion = e.target.value;
      applyStateToUI();
      updateUrl();
      applyExplanationToDashboardView();
    });
  }
  const dropdown = document.getElementById("criterionDropdown");
  if (dropdown) {
    dropdown.addEventListener("change", function () {
      selectedCriterion = dropdown.value;
      renderDashboardTable();
    });
  }
  if (timeGroupingEl) {
    timeGroupingEl.addEventListener("change", (e) => {
      timeGrouping = e.target.value;
      maybeRenderGraphs();
      updateUrl();
    });
  }

  // initialize from URL (if present)
  const q = parseQuery();
  if (q.criterion && criteria.some((c) => c.id === q.criterion)) {
    selectedCriterion = q.criterion;
  }
  if (
    q.timeGrouping &&
    (q.timeGrouping === "byStudent" || q.timeGrouping === "byExercise")
  ) {
    timeGrouping = q.timeGrouping;
  }
  if (q.version) {
    const v = parseInt(q.version, 10);
    if (!Number.isNaN(v) && v >= 1 && v <= 3) exerciseVersion = v;
  }

  // sync UI with URL-derived state (sets dropdown, label, hides tutorial select, renders view)
  applyStateToUI();
  // update explanation after state is applied
  applyExplanationToDashboardView();

  // initial derive + render
  loadDerivedCriterionResults();
  // Preload per-exercise files to seed metrics from the new structure
  preloadPerExerciseMetrics().finally(() => {
    // After preload attempt completes, render with any seeded metrics
    maybeRenderGraphs();
  });
  // Auto seed demo metrics on first load if none exist
  const anyTimeData = (() => {
    for (const s of students) {
      for (const ex of exercises) {
        const m = getMetrics(s.id, ex.id);
        if (m && typeof m.elapsedSeconds === "number" && m.elapsedSeconds > 0) {
          return true;
        }
      }
    }
    return false;
  })();

  maybeRenderGraphs();
  if (timeGroupingEl) {
    timeGroupingEl.style.display =
      selectedCriterion === "time" || selectedCriterion === "testDebug"
        ? "inline-block"
        : "none";
    timeGroupingEl.value = timeGrouping;
  }

  // sync URL without adding a new entry
  updateUrl(false);
});

// Handle browser navigation (back/forward) to restore UI selection
window.addEventListener("popstate", (event) => {
  const state = event && event.state;
  if (state && state.selectedCriterion) {
    selectedCriterion = state.selectedCriterion;
  } else {
    const q = parseQuery();
    if (q.criterion && criteria.some((c) => c.id === q.criterion)) {
      selectedCriterion = q.criterion;
    }
  }
  if (state && state.timeGrouping) {
    timeGrouping = state.timeGrouping;
  } else {
    const q = parseQuery();
    if (
      q.timeGrouping &&
      (q.timeGrouping === "byStudent" || q.timeGrouping === "byExercise")
    ) {
      timeGrouping = q.timeGrouping;
    }
  }
  if (state && typeof state.exerciseVersion === "number") {
    exerciseVersion = state.exerciseVersion;
  } else {
    const q = parseQuery();
    if (q.version) {
      const v = parseInt(q.version, 10);
      if (!Number.isNaN(v) && v >= 1 && v <= 3) exerciseVersion = v;
    }
  }

  applyStateToUI(true);
});

// ---------------- Graph rendering for time and test/debug ----------------
let currentChart = null;

function destroyCurrentChart() {
  if (currentChart && typeof currentChart.destroy === "function") {
    currentChart.destroy();
  }
  currentChart = null;
}

function getMetrics(studentId, exerciseId) {
  try {
    // Prefer seeded data from new per-exercise files if present

    const cached =
      window.__exerciseDataCache &&
      window.__exerciseDataCache[studentId] &&
      window.__exerciseDataCache[studentId][exerciseId] &&
      window.__exerciseDataCache[studentId][exerciseId].metrics;
    const seeded =
      cached ||
      (window[`exerciseData_${studentId}`] &&
        window[`exerciseData_${studentId}`][exerciseId] &&
        window[`exerciseData_${studentId}`][exerciseId].metrics) ||
      null;
    console.log(window);

    if (seeded) return seeded;
    const raw = localStorage.getItem(metricsKey(studentId, exerciseId));

    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Helpers to use explicit time sections when available
function minutesFromMetrics(metrics) {
  try {
    if (metrics && Array.isArray(metrics.sections) && metrics.sections.length) {
      const totalMinutes = metrics.sections
        .map((s) =>
          typeof s.minutes === "number" ? Math.max(0, s.minutes) : 0
        )
        .reduce((a, b) => a + b, 0);
      return Math.max(1, Math.round(totalMinutes));
    }
    const secs =
      metrics && typeof metrics.elapsedSeconds === "number"
        ? metrics.elapsedSeconds
        : 0;
    return Math.max(1, Math.round(secs / 60));
  } catch {
    return 1;
  }
}

function expandSectionKinds(metrics, maxMinutes) {
  try {
    const kinds = [];
    if (metrics && Array.isArray(metrics.sections) && metrics.sections.length) {
      for (const seg of metrics.sections) {
        const len = Math.max(
          0,
          Math.round(seg && typeof seg.minutes === "number" ? seg.minutes : 0)
        );
        const type = (seg && seg.type) || (seg && seg.kind) || "trial";
        for (let i = 0; i < len; i++) kinds.push(type);
      }
      return kinds.slice(0, maxMinutes);
    }
    return null;
  } catch {
    return null;
  }
}

function sectionKindToColor(kind) {
  const q = parseQuery();
  const v = parseInt(q.version, 10);

  if (!Number.isNaN(v) && v > 1) {
    switch (kind) {
      case "programming":
        return "#dedede";
      case "testing":
        return "#27adcf"; // strong blue
      case "debugger":
        return "#24bd5c"; // strong green
      case "trial":
      case "trial-and-error":
        return "#cfb327"; // strong red
      default:
        return "#6d6d6d"; // neutral gray fallback
    }
  } else {
    return "#6d6d6d"; // neutral gray fallback
  }
}
// Labels for kinds used in legends and tooltips
const KIND_LABEL = {
  programming: "Programmeren",
  testing: "Testen",
  debugger: "Debuggen",
  trial: "Trial-and-error",
  "trial-and-error": "Trial-and-error",
};

function maybeRenderGraphs() {
  const table = document.getElementById("dashboard-table");
  const graphView = document.getElementById("graph-view");
  if (!graphView) return renderDashboardTable();
  const hasChart =
    typeof window !== "undefined" && typeof window.Chart !== "undefined";
  if (selectedCriterion === "time") {
    if (table) table.style.display = "none";
    graphView.style.display = "block";
    if (!hasChart) {
      graphView.innerHTML =
        "<div style='padding:0.8em;color:#7c5e00'>Grafieken niet beschikbaar: Chart.js niet geladen. Controleer internet of voeg de bibliotheek lokaal toe.</div>";
      return;
    }
    renderTimeGraph(graphView);
  } else if (selectedCriterion === "testDebug") {
    if (table) table.style.display = "none";
    graphView.style.display = "block";
    if (!hasChart) {
      graphView.innerHTML =
        "<div style='padding:0.8em;color:#7c5e00'>Grafieken niet beschikbaar: Chart.js niet geladen. Controleer internet of voeg de bibliotheek lokaal toe.</div>";
      return;
    }
    renderTestDebugBars(graphView);
  } else {
    destroyCurrentChart();
    graphView.style.display = "none";
    renderDashboardTable();
  }
}

// ---------------- Preload per-exercise data to seed metrics ---------------
window.__exerciseDataCache = window.__exerciseDataCache || {};

function preloadPerExerciseMetrics() {
  try {
    const criterion = "readability"; // metrics currently seeded from readability files
    const promises = [];
    var maxMins = maxMinutesAcross();
    for (const s of students) {
      for (const ex of exercises) {
        for (let segment = 0; segment < maxMins; segment++) {
          promises.push(
            new Promise((resolve) => {
              const script = document.createElement("script");
              script.src = `students/data/${s.id}/testDebug/exercise_${ex.id}_${segment}.js`;
              script.onload = function () {
                if (window.exerciseData) {
                  window.__exerciseDataCache[s.id] =
                    window.__exerciseDataCache[s.id] || {};
                }
                try {
                  delete window.exerciseData;
                } catch {}
                resolve();
              };
              script.onerror = function () {
                resolve();
              };
              document.body.appendChild(script);
            })
          );
        }
        promises.push(
          new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = `students/data/${s.id}/testDebug/exercise_${ex.id}.js`;
            script.onload = function () {
              if (window.exerciseData) {
                window.__exerciseDataCache[s.id] =
                  window.__exerciseDataCache[s.id] || {};
                window.__exerciseDataCache[s.id][`${ex.id}`] =
                  window.exerciseData;
              }
              try {
                delete window.exerciseData;
              } catch {}
              resolve();
            };
            script.onerror = function () {
              resolve();
            };
            document.body.appendChild(script);
          })
        );
      }
    }
    return Promise.all(promises);
  } catch (e) {
    return Promise.resolve();
  }
}

function renderTimeGraph(container) {
  destroyCurrentChart();
  container.innerHTML = "";
  const canvas = document.createElement("canvas");
  container.appendChild(canvas);

  // Build data based on grouping
  const palette = ["#ffe082", "#ffcb3b", "#e6b800", "#c9a200", "#a88600"];
  let labels = [];
  let datasets = [];
  if (timeGrouping === "byStudent") {
    labels = students.map((s) => s.name);
    datasets = exercises.map((ex, idx) => {
      const data = students.map((s) => {
        const m = getMetrics(s.id, ex.id);
        return minutesFromMetrics(m);
      });
      return {
        label: ex.label,
        data,
        backgroundColor: palette[idx % palette.length],
        borderRadius: 2,
      };
    });
  } else {
    labels = exercises.map((ex) => ex.label);
    datasets = students.map((s, idx) => {
      const data = exercises.map((ex) => {
        const m = getMetrics(s.id, ex.id);
        return minutesFromMetrics(m);
      });
      return {
        label: s.name,
        data,
        backgroundColor: palette[idx % palette.length],
        borderRadius: 2,
      };
    });
  }

  // Always render chart so axes are visible even with no data

  const ctx = canvas.getContext("2d");
  currentChart = new Chart(ctx, {
    type: "bar",
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { bottom: 10, top: 20, left: 20, right: 20 } },
      categoryPercentage: 0.9,
      barPercentage: 0.95,
      categorySpacing: 0.1,
      barSpacing: 0.05,
      scales: {
        x: {
          stacked: false,
          title: {
            display: false,
            //text: timeGrouping === "byStudent" ? "Studenten" : "Oefeningen",
          },
          ticks: {
            padding: timeGrouping === "byStudent" ? 32 : 12,
          },
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          stacked: false,
          title: {
            display: true,
            text: "Aantal minuten (chronologisch)",
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: function (items) {
              if (!items || !items.length) return "";
              const it = items[0];
              if (timeGrouping === "byStudent") {
                const studentName = labels[it.dataIndex];
                const exerciseLabel = it.dataset.label;
                return `${exerciseLabel} — ${studentName}`;
              } else {
                const exerciseLabel = labels[it.dataIndex];
                const studentName = it.dataset.label;
                return `${studentName} — ${exerciseLabel}`;
              }
            },
            label: function () {
              return ""; // suppress per-point value; advice shown in afterBody
            },
            afterBody: function (items) {
              if (!items || !items.length) return "";
              const it = items[0];
              let studentId, exerciseId;
              if (timeGrouping === "byStudent") {
                const studentIndex = it.dataIndex;
                const exerciseIndex = it.datasetIndex;
                studentId = students[studentIndex].id;
                exerciseId = exercises[exerciseIndex].id;
              } else {
                const exerciseIndex = it.dataIndex;
                const studentIndex = it.datasetIndex;
                exerciseId = exercises[exerciseIndex].id;
                studentId = students[studentIndex].id;
              }
              const m = getMetrics(studentId, exerciseId) || {};
              const advice = (m && m.timeAdvice) || (m && m.tdAdvice) || "";
              return advice ? [advice] : [];
            },
          },
        },
        barSubLabels: {},
      },
      /*onClick: (evt, elements) => {
        if (!elements || elements.length === 0) return;
        const el = elements[0];
        let studentId, exerciseId;
        if (timeGrouping === "byStudent") {
          const studentIndex = el.index; // x-category
          const exerciseIndex = el.datasetIndex; // dataset represents exercise
          studentId = students[studentIndex].id;
          exerciseId = exercises[exerciseIndex].id;
        } else {
          const exerciseIndex = el.index; // x-category
          const studentIndex = el.datasetIndex; // dataset represents student
          exerciseId = exercises[exerciseIndex].id;
          studentId = students[studentIndex].id;
        }
        goToExercise(studentId, exerciseId);
      },*/
    },
    plugins: [
      {
        id: "barSubLabels",
        afterDatasetsDraw: (chart) => {
          try {
            const ctx = chart.ctx;
            const area = chart.chartArea;
            ctx.save();
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.fillStyle = "#333";
            ctx.font =
              Chart.defaults.font && Chart.defaults.font.size
                ? `${Chart.defaults.font.size}px ${
                    Chart.defaults.font.family || "sans-serif"
                  }`
                : "12px sans-serif";

            if (timeGrouping === "byStudent") {
              // When grouped by student: show exercise labels per bar (close to bars)
              for (let exIdx = 0; exIdx < exercises.length; exIdx++) {
                const ex = exercises[exIdx];
                const dsIndex = chart.data.datasets.findIndex(
                  (d) => d.label === ex.label
                );
                if (dsIndex < 0) continue;
                const meta = chart.getDatasetMeta(dsIndex);
                if (!meta || !meta.data) continue;
                for (let i = 0; i < meta.data.length; i++) {
                  const el = meta.data[i];
                  if (!el || typeof el.x !== "number") continue;
                  const x = el.x;
                  // Exercise labels close to bars (per-bar labels)
                  const y = area.bottom + 10;
                  const txt = ex.label;
                  ctx.fillText(txt, x, y);
                }
              }
              // Student names shown via axis ticks (group labels) - further away
            } else {
              // When grouped by exercise: show student names per bar (close to bars)
              for (let sIdx = 0; sIdx < students.length; sIdx++) {
                const s = students[sIdx];
                const dsIndex = chart.data.datasets.findIndex(
                  (d) => d.label === s.name
                );
                if (dsIndex < 0) continue;
                const meta = chart.getDatasetMeta(dsIndex);
                if (!meta || !meta.data) continue;
                for (let i = 0; i < meta.data.length; i++) {
                  const el = meta.data[i];
                  if (!el || typeof el.x !== "number") continue;
                  const x = el.x;
                  // Student names close to bars (per-bar labels)
                  const y = area.bottom + 8;
                  const txt = s.name;
                  ctx.fillText(txt, x, y);
                }
              }
              // Exercise names shown via axis ticks (group labels) - further away
            }
            ctx.restore();
          } catch {}
        },
      },
      {
        id: "completionMarks",
        afterDatasetsDraw: (chart) => {
          try {
            const ctx = chart.ctx;
            const area = chart.chartArea;
            ctx.save();
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            const mark = "✓";
            const checkColor = "#2e7d32"; // dark green
            const haloColor = "#ffffff"; // white halo for contrast
            // Inside the chart area to the right of the y-axis
            const xInside = area.left + 14;
            const radius = 9;
            const fontPx = 14;
            ctx.font = `${fontPx}px ${
              Chart.defaults.font && Chart.defaults.font.family
                ? Chart.defaults.font.family
                : "sans-serif"
            }`;

            if (timeGrouping === "byStudent") {
              // dataset per exercise; element index corresponds to student index
              for (let exIdx = 0; exIdx < exercises.length; exIdx++) {
                const ex = exercises[exIdx];
                const dsIndex = chart.data.datasets.findIndex(
                  (d) => d.label === ex.label
                );
                if (dsIndex < 0) continue;
                const meta = chart.getDatasetMeta(dsIndex);
                if (!meta || !meta.data) continue;
                for (let i = 0; i < meta.data.length; i++) {
                  const el = meta.data[i];
                  if (!el || typeof el.y !== "number") continue;
                  const student = students[i];
                  const m = getMetrics(student.id, ex.id) || {};
                  if (m && m.finished) {
                    // white halo
                    ctx.beginPath();
                    ctx.arc(xInside, el.y, radius, 0, Math.PI * 2);
                    ctx.fillStyle = haloColor;
                    ctx.fill();
                    // green check on top
                    ctx.fillStyle = checkColor;
                    ctx.fillText(mark, xInside, el.y + 1);
                  }
                }
              }
            } else {
              // dataset per student; element index corresponds to exercise index
              for (let sIdx = 0; sIdx < students.length; sIdx++) {
                const s = students[sIdx];
                const dsIndex = chart.data.datasets.findIndex(
                  (d) => d.label === s.name
                );
                if (dsIndex < 0) continue;
                const meta = chart.getDatasetMeta(dsIndex);
                if (!meta || !meta.data) continue;
                for (let i = 0; i < meta.data.length; i++) {
                  const el = meta.data[i];
                  if (!el || typeof el.y !== "number") continue;
                  const ex = exercises[i];
                  const m = getMetrics(s.id, ex.id) || {};
                  if (m && m.finished) {
                    // white halo
                    ctx.beginPath();
                    ctx.arc(xInside, el.y, radius, 0, Math.PI * 2);
                    ctx.fillStyle = haloColor;
                    ctx.fill();
                    // green check on top
                    ctx.fillStyle = checkColor;
                    ctx.fillText(mark, xInside, el.y + 1);
                  }
                }
              }
            }
            ctx.restore();
          } catch {}
        },
      },
    ],
  });
}

function stateColor(state) {
  // tests+debugger, tests only, debugger only, neither
  switch (state) {
    case "both":
      return "#7cb342"; // greenish
    case "tests":
      return "#42a5f5"; // blue
    case "debug":
    case "debugger":
      return "#ffb300"; // amber
    default:
      return "#e57373"; // red
  }
}

function computeTDState(metrics) {
  const hasTests = !!(metrics && metrics.wroteTests);
  const hasDebugger = !!(metrics && metrics.usedDebugger);
  if (hasTests && hasDebugger) return "both";
  if (hasTests) return "tests";
  if (hasDebugger) return "debugger";
  return "neither";
}

function maxMinutesAcross() {
  let max = 1;
  for (const s of students) {
    for (const ex of exercises) {
      const m = getMetrics(s.id, ex.id);
      const mins = minutesFromMetrics(m);
      if (mins > max) max = mins;
    }
  }
  return max || 1;
}

/*
function renderTestDebugHeatmap(container) {
  destroyCurrentChart();
  container.innerHTML = "";
  const canvas = document.createElement("canvas");
  container.appendChild(canvas);

  // Build matrix data
  const data = [];
  for (let si = 0; si < students.length; si++) {
    for (let ei = 0; ei < exercises.length; ei++) {
      const s = students[si];
      const ex = exercises[ei];
      const m = getMetrics(s.id, ex.id);
      const state = computeTDState(m);
      const v =
        state === "both"
          ? 3
          : state === "tests"
          ? 2
          : state === "debugger"
          ? 1
          : 0;
      data.push({
        x: ei,
        y: si,
        v,
        studentId: s.id,
        exerciseId: ex.id,
        state,
      });
    }
  }

  const ctx = canvas.getContext("2d");
  currentChart = new Chart(ctx, {
    type: "matrix",
    data: {
      datasets: [
        {
          label: "Testen & Debuggen",
          data,
          borderWidth: 1,
          borderColor: "#ffffff",
          backgroundColor: (ctx) => {
            const r = ctx.raw;
            return stateColor(r.state);
          },
          width: ({ chart }) =>
            (chart.chartArea || {}).width / (exercises.length + 1),
          height: ({ chart }) =>
            (chart.chartArea || {}).height / (students.length + 1),
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: "linear",
          min: -0.5,
          max: exercises.length - 0.5,
          ticks: {
            callback: (val) => exercises[val] && exercises[val].label,
          },
          grid: { display: false },
        },
        y: {
          reverse: true,
          type: "linear",
          min: -0.5,
          max: students.length - 0.5,
          ticks: {
            callback: (val) => students[val] && students[val].name,
          },
          grid: { display: false },
        },
      },
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      onClick: (evt, elements) => {
        if (!elements || elements.length === 0) return;
        const el = elements[0];
        const raw = el.element.$context.raw;
        if (raw && raw.studentId && raw.exerciseId) {
          goToExercise(raw.studentId, raw.exerciseId);
        }
      },
    },
  });
}
*/
function renderTestDebugBars(container) {
  destroyCurrentChart();
  container.innerHTML = "";
  const canvas = document.createElement("canvas");
  // Build legend for 4 categories
  const legend = document.createElement("div");
  legend.style.display = "flex";
  legend.style.flexWrap = "wrap";
  legend.style.gap = "12px";
  legend.style.alignItems = "center";
  legend.style.marginBottom = "6px";
  const kindsForLegend = ["programming", "testing", "debugger", "trial"];
  kindsForLegend.forEach((k) => {
    const item = document.createElement("div");
    item.style.display = "inline-flex";
    item.style.alignItems = "center";
    const sw = document.createElement("span");
    sw.style.display = "inline-block";
    sw.style.width = "12px";
    sw.style.height = "12px";
    sw.style.marginRight = "6px";
    sw.style.borderRadius = "2px";
    sw.style.background = sectionKindToColor(k);
    const label = document.createElement("span");
    label.style.fontSize = "0.9em";
    label.textContent = KIND_LABEL[k] || k;
    item.appendChild(sw);
    item.appendChild(label);
    legend.appendChild(item);
  });
  const note = document.createElement("div");
  note.style.flexBasis = "100%";
  note.style.fontSize = "0.9em";
  note.style.color = "#333";
  note.style.marginTop = "2px";

  const q = parseQuery();
  const v = parseInt(q.version, 10);

  if (!Number.isNaN(v) && v > 1) {
    container.appendChild(legend);
  }
  container.appendChild(canvas);

  const GREEN = "#4caf50"; // debugger/logs
  const RED = "#f44336"; // trial-and-error

  function segmentsForTime(seconds, maxSecs) {
    if (!seconds || seconds <= 0) return 2; // show minimal presence
    const ratio = Math.min(1, seconds / maxSecs);
    const segs = Math.max(2, Math.round(ratio * SEGMENTS));
    return segs;
  }

  function buildPattern(metrics, studentId, exerciseId, totalSegs) {
    const hasDebugger = !!(metrics && metrics.usedDebugger);
    const hasTests = !!(metrics && metrics.wroteTests);
    const seed = (studentId * 31 + exerciseId * 17) % 97;

    // Alternate green/red more frequently; small random-ish streaks of length 1–3
    const streakLens = [1, 2, 3];
    let streakIdx = seed % streakLens.length;
    let remaining = totalSegs;
    const colors = [];

    // Decide which color starts based on state
    // both -> start green; debugger only -> green; tests/none -> red
    let current = hasDebugger ? GREEN : RED;

    while (remaining > 0) {
      const len = Math.min(streakLens[streakIdx], remaining);
      for (let i = 0; i < len; i++) colors.push(current);
      remaining -= len;
      streakIdx = (streakIdx + 1) % streakLens.length;
      current = current === GREEN ? RED : GREEN;
    }

    // Pad to SEGMENTS with nulls (zero height later)
    while (colors.length < SEGMENTS) colors.push(null);
    return colors;
  }

  let labels = [];
  // Datasets will be constructed dynamically based on max minutes
  let segmentDatasets = [];
  const maxMinutes = maxMinutesAcross();

  if (timeGrouping === "byStudent") {
    // X axis: students; for each exercise we still render separate bars per student (like time)
    labels = students.map((s) => s.name);
    // Build per-exercise bars across students by stacking minute segments (from sections when present)
    const allExerciseSegmentDatasets = [];
    for (let exIdx = 0; exIdx < exercises.length; exIdx++) {
      const ex = exercises[exIdx];
      const exSegSets = Array.from({ length: maxMinutes }, (_, segIdx) => ({
        label: `${ex.label}`,
        data: [],
        backgroundColor: [],
        stack: `td-${ex.id}`, // stack per exercise so each exercise forms its own stacked bar
        borderRadius: 0,
        borderSkipped: false,
      }));
      for (let sIdx = 0; sIdx < students.length; sIdx++) {
        const s = students[sIdx];
        const m = getMetrics(s.id, ex.id);
        const minutes = minutesFromMetrics(m);
        const kinds = expandSectionKinds(m, minutes);
        const pattern =
          kinds ||
          Array.from({ length: minutes }, () =>
            m && m.usedDebugger ? "debuggersssss" : "trial"
          );
        for (let seg = 0; seg < maxMinutes; seg++) {
          const kind = seg < pattern.length ? pattern[seg] : null;
          const color = kind ? sectionKindToColor(kind) : null;
          exSegSets[seg].data.push(kind ? 1 : 0);
          exSegSets[seg].backgroundColor.push(color || "rgba(0,0,0,0)");
        }
      }
      //set exercise labels for each bar
      allExerciseSegmentDatasets.push(...exSegSets);
    }

    segmentDatasets = allExerciseSegmentDatasets;
  } else {
    // byExercise: X axis exercises; create separate stacked bars per student
    labels = exercises.map((ex) => ex.label);
    const allStudentSegmentDatasets = [];
    for (let sIdx = 0; sIdx < students.length; sIdx++) {
      const s = students[sIdx];
      const sSegSets = Array.from({ length: maxMinutes }, (_, segIdx) => ({
        label: `${s.name}`,
        data: [],
        backgroundColor: [],
        stack: `td-stu-${s.id}`, // stack per student so each student forms its own stacked bar
        borderRadius: 0,
        borderSkipped: false,
      }));
      for (let exIdx = 0; exIdx < exercises.length; exIdx++) {
        const ex = exercises[exIdx];
        const m = getMetrics(s.id, ex.id);
        const minutes = minutesFromMetrics(m);
        const kinds = expandSectionKinds(m, minutes);
        const pattern =
          kinds ||
          Array.from({ length: minutes }, () =>
            m && m.usedDebugger ? "debugger" : "trial"
          );
        for (let seg = 0; seg < maxMinutes; seg++) {
          const kind = seg < pattern.length ? pattern[seg] : null;
          const color = kind ? sectionKindToColor(kind) : null;
          sSegSets[seg].data.push(kind ? 1 : 0);
          sSegSets[seg].backgroundColor.push(color || "rgba(0,0,0,0)");
        }
      }
      allStudentSegmentDatasets.push(...sSegSets);
    }
    segmentDatasets = allStudentSegmentDatasets;
  }

  const ctx = canvas.getContext("2d");

  currentChart = new Chart(ctx, {
    type: "bar",
    data: { labels, datasets: segmentDatasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: "y",
      layout: { padding: { left: 10, right: 10 } },
      elements: {
        bar: {
          borderWidth: 0,
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          stacked: true,
          ticks: { stepSize: 1 },
          title: {
            display: true,
            text: "Aantal minuten (chronologisch)",
          },
          grid: {
            display: true,
            color: "rgba(0,0,0,0.1)",
          },
        },
        y: {
          stacked: true,
          title: {
            display: false,
            text: "",
          },
          ticks: {
            color: "#000",
            padding: timeGrouping === "byStudent" ? 20 : 12,
          },
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: function (items) {
              if (!items || !items.length) return "";
              const it = items[0];
              if (timeGrouping === "byStudent") {
                const studentName = labels[it.dataIndex];
                const exerciseLabel = it.dataset.label.split(" · ")[0];
                return `${exerciseLabel} — ${studentName}`;
              } else {
                const exerciseLabel = labels[it.dataIndex];
                const studentName = it.dataset.label.split(" · ")[0];
                return `${studentName} — ${exerciseLabel}`;
              }
            },
            label: function (context) {
              if (!context) return "";
              const color = context.dataset.backgroundColor[context.dataIndex];
              const kind = (() => {
                const keys = ["programming", "testing", "debugger", "trial"];
                for (const k of keys)
                  if (sectionKindToColor(k) === color) return k;
                return "";
              })();
              return kind ? KIND_LABEL[kind] || kind : "";
            },
            afterBody: function (items) {
              if (!items || !items.length) return "";
              const it = items[0];
              let studentId, exerciseId;
              if (timeGrouping === "byStudent") {
                const studentIndex = it.dataIndex;
                // Dataset label contains exercise
                const exerciseLabel = it.dataset.label.split(" · ")[0];
                const exerciseIndex = exercises.findIndex(
                  (e) => e.label === exerciseLabel
                );
                if (studentIndex < 0 || exerciseIndex < 0) return "";
                studentId = students[studentIndex].id;
                exerciseId = exercises[exerciseIndex].id;
              } else {
                const exerciseIndex = it.dataIndex;
                // Dataset label contains student
                const studentLabel = it.dataset.label.split(" · ")[0];
                const studentIndex = students.findIndex(
                  (s) => s.name === studentLabel
                );
                if (studentIndex < 0 || exerciseIndex < 0) return "";
                exerciseId = exercises[exerciseIndex].id;
                studentId = students[studentIndex].id;
              }
              const m = getMetrics(studentId, exerciseId) || {};
              const advice = (m && m.tdAdvice) || (m && m.timeAdvice) || "";
              return advice ? [advice] : [];
            },
          },
        },
        barSubLabels: {},
      },
      onClick: (evt, elements) => {
        if (!elements || elements.length === 0) return;
        const el = elements[0];
        let studentId, exerciseId;
        if (timeGrouping === "byStudent") {
          const studentIndex = el.index; // x-category
          const datasetIndex = el.datasetIndex;
          var max_minutes = maxMinutesAcross();
          const exerciseNumber = Math.floor(datasetIndex / max_minutes) + 1;
          const exerciseTimeSegment = Math.floor(datasetIndex % max_minutes);
          goToExercise(
            students[studentIndex].id,
            exerciseNumber,
            exerciseTimeSegment
          );
        }
      },
      categoryPercentage: 0.8,
      barPercentage: 0.9,
      categorySpacing: 0.2,
      barSpacing: 0.1,
    },
    plugins: [
      {
        id: "barSubLabels",
        afterDatasetsDraw: (chart) => {
          try {
            const ctx = chart.ctx;
            const area = chart.chartArea;
            ctx.save();
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            // color set per-label below
            ctx.font =
              Chart.defaults.font && Chart.defaults.font.size
                ? `${Chart.defaults.font.size}px ${
                    Chart.defaults.font.family || "sans-serif"
                  }`
                : "12px sans-serif";

            const yTickPadding =
              (chart.options &&
                chart.options.scales &&
                chart.options.scales.y &&
                chart.options.scales.y.ticks &&
                chart.options.scales.y.ticks.padding) ||
              10;
            const leftXDefault = area.left - 15;

            if (timeGrouping === "byStudent") {
              // For each exercise, use the first segment dataset to position labels per student row
              for (let exIdx = 0; exIdx < exercises.length; exIdx++) {
                const ex = exercises[exIdx];
                const dsIndex = chart.data.datasets.findIndex(
                  (d) => d.label === ex.label
                );
                if (dsIndex < 0) continue;
                const meta = chart.getDatasetMeta(dsIndex);
                if (!meta || !meta.data) continue;
                for (let i = 0; i < meta.data.length; i++) {
                  const el = meta.data[i];
                  if (!el || typeof el.y !== "number") continue;
                  const y = el.y;
                  // Draw exercise label right-aligned a few px left of the axis to avoid overlap
                  ctx.textAlign = "right";
                  const exX = area.left - 4;
                  ctx.fillStyle = "#777";
                  ctx.fillText(ex.label, exX, y);
                }
              }
            } else {
              // Grouped by exercise: label each bar with the student name at its row center
              for (let sIdx = 0; sIdx < students.length; sIdx++) {
                const s = students[sIdx];
                const dsIndex = chart.data.datasets.findIndex(
                  (d) => d.label === s.name
                );
                if (dsIndex < 0) continue;
                const meta = chart.getDatasetMeta(dsIndex);
                if (!meta || !meta.data) continue;
                for (let i = 0; i < meta.data.length; i++) {
                  const el = meta.data[i];
                  if (!el || typeof el.y !== "number") continue;
                  const y = el.y;
                  ctx.textAlign = "right";
                  ctx.fillStyle = "#777";
                  ctx.fillText(s.name, leftXDefault, y);
                }
              }
            }
            ctx.restore();
          } catch {}
        },
      },
    ],
  });
}
