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
  },
  concepts: {
    for: { type: "info", icon: "🔁", text: "for", title: "for-lus" },
    while: { type: "info", icon: "🔁", text: "while", title: "while-lus" },
    do: { type: "info", icon: "🔁", text: "do-while", title: "do-while" },
    if: { type: "info", icon: "🔹", text: "if", title: "if-voorwaarde" },
    else: { type: "info", icon: "🔹", text: "else", title: "else-tak" },
    switch: { type: "info", icon: "🔀", text: "switch", title: "switch" },
    function: { type: "info", icon: "ƒ", text: "functie", title: "Functie" },
    return: { type: "info", icon: "↩️", text: "return", title: "return" },
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
const resultsByCriterion = {
  readability: results, // migrate existing
  concepts: {},
  testDebug: {},
  time: {},
};

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
  resultsByCriterion.concepts = concepts;
}

function goToExercise(studentId, exerciseNum) {
  // pass selected criterion to exercise page
  window.location.href = `students/exercise.html?student=${studentId}&exercise=${exerciseNum}&criterion=${selectedCriterion}`;
}

let selectedCriterion = "readability";
let timeGrouping = "byStudent"; // or "byExercise"

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
        .map((key) => criterionAlerts[key] || criterionAlerts.correct)
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
      const c = criteria.find((c) => c.id === selectedCriterion);
      if (c) label.textContent = c.label;
      loadDerivedCriterionResults();
      maybeRenderGraphs();
      if (timeGroupingEl) {
        timeGroupingEl.style.display =
          selectedCriterion === "time" ? "inline-block" : "none";
      }
    });
  }
  if (timeGroupingEl) {
    timeGroupingEl.addEventListener("change", (e) => {
      timeGrouping = e.target.value;
      maybeRenderGraphs();
    });
  }
  // initial derive + render
  loadDerivedCriterionResults();
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
  if (!anyTimeData) {
    const seed = [
      { s: 1, e: 1, secs: 8 * 60, tests: true, dbg: false },
      { s: 1, e: 2, secs: 12 * 60, tests: false, dbg: true },
      { s: 2, e: 1, secs: 5 * 60, tests: true, dbg: true },
      { s: 2, e: 2, secs: 0, tests: false, dbg: false },
      { s: 3, e: 1, secs: 15 * 60, tests: false, dbg: true },
      { s: 4, e: 2, secs: 3 * 60, tests: false, dbg: false },
    ];
    seed.forEach((x) => {
      const existing = getMetrics(x.s, x.e) || {};
      const merged = {
        ...existing,
        elapsedSeconds: x.secs,
        wroteTests: x.tests,
        usedDebugger: x.dbg,
      };
      localStorage.setItem(metricsKey(x.s, x.e), JSON.stringify(merged));
    });
  }
  maybeRenderGraphs();
  if (timeGroupingEl) {
    timeGroupingEl.style.display =
      selectedCriterion === "time" ? "inline-block" : "none";
    timeGroupingEl.value = timeGrouping;
  }
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
    // Prefer seeded data from exercise_data files if present
    const seeded =
      (window[`exerciseData_${studentId}`] &&
        window[`exerciseData_${studentId}`][exerciseId] &&
        window[`exerciseData_${studentId}`][exerciseId].metrics) ||
      null;
    if (seeded) return seeded;
    const raw = localStorage.getItem(metricsKey(studentId, exerciseId));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

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
    renderTestDebugHeatmap(graphView);
  } else {
    destroyCurrentChart();
    graphView.style.display = "none";
    renderDashboardTable();
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
        const secs = m && m.elapsedSeconds ? m.elapsedSeconds : 0;
        return Math.round(secs / 60);
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
        const secs = m && m.elapsedSeconds ? m.elapsedSeconds : 0;
        return Math.round(secs / 60);
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
      scales: {
        x: {
          stacked: false,
          title: { display: true, text: "Studenten" },
        },
        y: {
          beginAtZero: true,
          stacked: false,
          title: { display: true, text: "Minuten" },
        },
      },
      plugins: { legend: { position: "bottom" } },
      onClick: (evt, elements) => {
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
      },
    },
  });
}

function stateColor(state) {
  // tests+debugger, tests only, debugger only, neither
  switch (state) {
    case "both":
      return "#7cb342"; // greenish
    case "tests":
      return "#42a5f5"; // blue
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
      data.push({ x: ei, y: si, v, studentId: s.id, exerciseId: ex.id, state });
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
