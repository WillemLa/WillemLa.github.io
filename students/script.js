const codeInput = document.getElementById("codeInput");
const highlightedCode = document.getElementById("highlightedCode");
const adviceBlock = document.getElementById("adviceBlock");
const toggleAdvice = document.getElementById("toggleAdvice");
// Track current version stage globally: 0 (no highlights), 1 (highlights), 2 (highlights + advice)
window.currentVersionStage = 0;

function getStudentAndExercise() {
  const params = new URLSearchParams(window.location.search);
  let studentId = params.get("student");
  let exerciseNum = params.get("exercise");
  let criterion = params.get("criterion");
  let version = params.get("version");
  let segment = params.get("segment"); // ← Add this line
  if (studentId && exerciseNum) {
    return { studentId, exerciseNum, criterion, version, segment };
  }
  // Fallback: parse from path
  const match = window.location.pathname.match(
    /student_(\d+)\/exercise_(\d+)\.html$/
  );
  if (match) {
    return {
      studentId: match[1],
      exerciseNum: match[2],
      criterion: null,
      version: null,
    };
  }
  return {
    studentId: null,
    exerciseNum: null,
    criterion: null,
    version: null,
    segment: null,
  };
}

const { studentId, exerciseNum, criterion, version, segment } =
  getStudentAndExercise();
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function isCamelCase(name) {
  // Lower camelCase: starts with lowercase, no underscores, not all caps, not PascalCase
  return (
    /^[a-z][a-zA-Z0-9]*$/.test(name) &&
    !/^([A-Z0-9_]+)$/.test(name) && // not ALLCAPS or underscores
    !/_/.test(name) && // not snake_case
    !/^[A-Z]/.test(name.slice(1))
  ); // not PascalCase
}

function showExercise(type) {
  // Only show the relevant checkboxes
  document.getElementById("conceptCheckboxes").style.display =
    type === "concepts" ? "" : "none";
  document.getElementById("readabilityCheckboxes").style.display =
    type === "readability" ? "" : "none";
  // Show the correct advice
  // Update highlights
  syncHighlighting();
}

function syncHighlighting() {
  const code = codeInput.value;
  // In version 1 (stage 0), render raw code without any highlights
  if (window.currentVersionStage === 0 && criterion !== "tutorial") {
    const codeWithoutTags = code
      .split("\n")
      .filter((line) => !/\/\/\s*<\/?tag:[a-zA-Z0-9 ]+>/i.test(line))
      .join("\n");
    highlightedCode.textContent = codeWithoutTags;
    return;
  }

  highlightedCode.innerHTML = highlightCode(code, criterion);
}

function highlightCode(code, type) {
  let tagClassMap = {};
  // Build tag map based on criterion-specific controls
  if (criterion === "tutorial") {
    tagClassMap = {
      highlight1: document.getElementById("highlightTutorial1")?.checked
        ? "highlight-tag-loop"
        : "",
      highlight2: document.getElementById("highlightTutorial2")?.checked
        ? "highlight-tag-function"
        : "",
      highlight3: document.getElementById("highlightTutorial3")?.checked
        ? "highlight-tag-conditional"
        : "",
    };
  } else if (criterion === "concepts" || type === "concepts") {
    tagClassMap = {
      loop: document.getElementById("highlightLoops")?.checked
        ? "highlight-tag-loop"
        : "",
      function: document.getElementById("highlightFunctions")?.checked
        ? "highlight-tag-function"
        : "",
      conditional: document.getElementById("highlightConditionals")?.checked
        ? "highlight-tag-conditional"
        : "",
    };
  }

  let highlighted = code;

  // Step 1: Apply tag-based highlighting for concepts and tutorial
  if (
    criterion === "tutorial" ||
    criterion === "concepts" ||
    type === "concepts"
  ) {
    highlighted = applyTagHighlighting(code, tagClassMap);
  }

  // Step 2: Apply regex-based highlights for readability only
  if (criterion == "readability") {
    highlighted = applyRegexHighlights(highlighted);
  }
  return highlighted;
}

function applyTagHighlighting(code, tagClassMap) {
  const lines = code.split("\n");
  let activeTag = null;
  let taggedLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Fully skip tag lines (start or end)
    if (/^\s*\/\/\s*<\/?tag:[^>]+>/i.test(line)) {
      continue;
    }

    // Detect start of tag region
    const startTagMatch = line.match(/^\s*\/\/\s*<tag:([a-zA-Z0-9 ]+)>/i);
    if (startTagMatch) {
      let tag = startTagMatch[1].toLowerCase().trim().replace(/\s+/g, "");
      if (criterion === "tutorial") {
        if (tag === "loop") tag = "highlight1";
        if (tag === "function") tag = "highlight2";
        if (tag === "conditional") tag = "highlight3";
      }
      if (tagClassMap[tag] !== undefined) {
        activeTag = tag;
      }
      continue;
    }

    // Detect end of tag region
    const endTagMatch = line.match(/^\s*\/\/\s*<\/tag:([a-zA-Z0-9 ]+)>/i);
    if (endTagMatch) {
      activeTag = null;
      continue;
    }

    // Apply highlighting
    if (activeTag && tagClassMap[activeTag]) {
      taggedLines.push(
        `<span class="${tagClassMap[activeTag]}">${escapeHtml(line)}</span>`
      );
    } else {
      taggedLines.push(escapeHtml(line));
    }
  }

  return taggedLines.join("\n");
}

function applyRegexHighlights(highlighted) {
  const functionRegex =
    /\b(?:int|float|void|char|double)\s+(\w+)\s*\(([^)]*)\)/g;
  const variableRegex = /\b(?:int|float|char|double)\s+(\w+)\s*(?==|;)/g;

  // Function declarations + param highlighting
  highlighted = highlighted.replace(functionRegex, (match, name, params) => {
    let newMatch = match;

    // Function name check
    if (document.getElementById("highlightFunctionCase").checked) {
      if (!isCamelCase(name)) {
        newMatch = newMatch.replace(
          name,
          `<span class="highlight-func">${name}</span>`
        );
      }
    }

    // Parameters check
    if (
      document.getElementById("highlightVariableCase").checked ||
      document.getElementById("highlightOneLetter").checked
    ) {
      const paramRegex = /\b(?:int|float|char|double)\s+(\w+)/g;
      let paramMatch;
      let alreadyWrapped = {};
      while ((paramMatch = paramRegex.exec(params)) !== null) {
        const paramName = paramMatch[1];
        console.log(paramName);
        let replacement = paramName;
        const isOneLetter = paramName.length === 1;
        // Only wrap once, with one-letter taking precedence
        if (
          document.getElementById("highlightOneLetter").checked &&
          isOneLetter
        ) {
          replacement = `<span class="highlight-one">${replacement}</span>`;
          alreadyWrapped[paramName] = true;
        } else if (
          document.getElementById("highlightVariableCase").checked &&
          !isCamelCase(paramName) &&
          !alreadyWrapped[paramName]
        ) {
          replacement = `<span class="highlight-var">${replacement}</span>`;
          alreadyWrapped[paramName] = true;
        }
        newMatch = newMatch.replace(paramName, replacement);
      }
    }

    return newMatch;
  });

  // Variable declarations outside functions
  highlighted = highlighted.replace(variableRegex, (match, name) => {
    let replacement = name;
    const isOneLetter = name.length === 1;
    if (document.getElementById("highlightOneLetter").checked && isOneLetter) {
      replacement = `<span class="highlight-one">${replacement}</span>`;
    } else if (
      document.getElementById("highlightVariableCase").checked &&
      !isCamelCase(name)
    ) {
      replacement = `<span class="highlight-var">${replacement}</span>`;
    }
    return match.replace(name, replacement);
  });

  return highlighted;
}

codeInput.addEventListener("input", syncHighlighting);
[
  "highlightLoops",
  "highlightFunctions",
  "highlightConditionals",
  "highlightVariableCase",
  "highlightOneLetter",
  // tutorial-specific controls
  "highlightTutorial1",
  "highlightTutorial2",
  "highlightTutorial3",
].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("change", syncHighlighting);
});

// Initial highlight
syncHighlighting();

// Sync scroll positions
codeInput.addEventListener("scroll", () => {
  highlightedCode.scrollTop = codeInput.scrollTop;
  highlightedCode.scrollLeft = codeInput.scrollLeft;
});

// --- Exercise Data Loader and Checkbox Handler ---
document.addEventListener("DOMContentLoaded", function () {
  // Only run if on exercise.html
  if (
    !document.getElementById("codeInput") ||
    !document.getElementById("highlightedCode")
  )
    return;

  // Ensure back button returns to index with the correct criterion
  const backBtn = document.querySelector(".back-arrow");
  if (backBtn) {
    backBtn.onclick = function () {
      try {
        // Prefer browser history when available
        if (window.history.length > 1) {
          window.history.back();
          return;
        }
      } catch {}
      const crit = criterion || "readability";
      window.location.href = `../index.html?criterion=${encodeURIComponent(
        crit
      )}`;
    };
  }

  if (studentId && exerciseNum) {
    // Try new per-exercise, criterion-aware data structure first
    const crit = criterion || "readability";
    const segmentSuffix =
      segment !== null && segment !== undefined ? `_${segment}` : "";
    const newPath = `data/${studentId}/${crit}/exercise_${exerciseNum}${segmentSuffix}.js`;
    const script = document.createElement("script");
    let usedFallback = false;

    function handleLoaded() {
      // Prefer new global payload if present
      let data = window.exerciseData || null;
      if (!data) {
        // Fallback to legacy multi-exercise object
        const dataObj = window[`exerciseData_${studentId}`];
        data = dataObj && dataObj[exerciseNum];
      }
      if (data) {
        document.title = `Oefening ${exerciseNum}${
          segment ? ` (minuut ${segment}-${Number(segment) + 1})` : ""
        } - ${data.student}`;
        document.getElementById("exercise-header").textContent = data.student;
        document.getElementById(
          "exercise-title"
        ).textContent = `Oefening ${exerciseNum}${
          segment ? ` (minuut ${segment}-${Number(segment) + 1})` : ""
        }`;

        // If a sourceUrl is provided, fetch code from there; otherwise use inline code
        const applyCode = (codeText) => {
          document.getElementById("codeInput").value =
            codeText || data.code || "";
          if (typeof syncHighlighting === "function") syncHighlighting();
        };
        if (data.sourceUrl) {
          fetch(data.sourceUrl)
            .then((r) => (r.ok ? r.text() : Promise.reject()))
            .then((t) => applyCode(t))
            .catch(() => applyCode(data.code || ""));
        } else {
          applyCode(data.code || "");
        }
        const adviceList = document.getElementById("advice-list");
        adviceList.innerHTML = "";
        data.advice.forEach((item) => {
          const li = document.createElement("li");
          li.innerHTML = item;
          adviceList.appendChild(li);
        });
        // Fill in checkboxes if data.checkboxes exists
        if (data.checkboxes) {
          if (typeof data.checkboxes.highlightFunctionCase !== "undefined")
            document.getElementById("highlightFunctionCase").checked =
              data.checkboxes.highlightFunctionCase;
          if (typeof data.checkboxes.highlightVariableCase !== "undefined")
            document.getElementById("highlightVariableCase").checked =
              data.checkboxes.highlightVariableCase;
          if (typeof data.checkboxes.highlightOneLetter !== "undefined")
            document.getElementById("highlightOneLetter").checked =
              data.checkboxes.highlightOneLetter;
          if (typeof data.checkboxes.toggleAdvice !== "undefined")
            document.getElementById("toggleAdvice").checked =
              data.checkboxes.toggleAdvice;
        }

        // Show relevant control groups based on selected criterion (extend with 'reasability' like readability)
        const ctrReadability = document.getElementById("controls-readability");
        const ctrConcepts = document.getElementById("controls-concepts");
        const ctrGraphs = document.getElementById("controls-graphs");
        const ctrTutorial = document.getElementById("controls-tutorial");
        const selected = criterion || "readability";
        // Let staged logic control visibility; ensure both hidden here
        if (ctrReadability) ctrReadability.style.display = "none";
        if (ctrConcepts) ctrConcepts.style.display = "none";

        // --- Version buttons staged visibility for both modes ---
        const version1Btn = document.getElementById("version1Btn");
        const version2Btn = document.getElementById("version2Btn");
        const version3Btn = document.getElementById("version3Btn");
        const toggleAdviceInputRead = document.getElementById("toggleAdvice");
        const adviceLabelRead = toggleAdviceInputRead
          ? toggleAdviceInputRead.parentElement
          : null;
        const toggleAdviceInputConcepts = document.getElementById(
          "toggleAdviceConcepts"
        );
        const adviceLabelConcepts = toggleAdviceInputConcepts
          ? toggleAdviceInputConcepts.parentElement
          : null;

        // Initial: hide both highlight groups and advice UI
        if (ctrReadability) ctrReadability.style.display = "none";
        if (ctrConcepts) ctrConcepts.style.display = "none";
        if (adviceLabelRead) adviceLabelRead.style.display = "none";
        if (adviceLabelConcepts) adviceLabelConcepts.style.display = "none";
        const toggleAdviceTutorial = document.getElementById(
          "toggleAdviceTutorial"
        );
        const adviceLabelTutorial = toggleAdviceTutorial
          ? toggleAdviceTutorial.parentElement
          : null;
        if (ctrTutorial) ctrTutorial.style.display = "none";
        if (adviceBlock) adviceBlock.style.display = "none";

        const toggleAdviceInputTestDebug = document.getElementById(
          "toggleAdviceTestDebug"
        );
        const adviceLabelTestDebug = toggleAdviceInputTestDebug
          ? toggleAdviceInputTestDebug.parentElement
          : null;

        function setStage(stage) {
          window.currentVersionStage = stage;
          try {
            const params = new URLSearchParams(window.location.search);
            params.set("version", String(stage + 1));
            const newUrl = `${window.location.pathname}?${params.toString()}`;
            window.history.replaceState({}, "", newUrl);
          } catch {}
          // Hide everything first
          if (ctrReadability) ctrReadability.style.display = "none";
          if (ctrConcepts) ctrConcepts.style.display = "none";
          if (ctrGraphs) ctrGraphs.style.display = "none";
          if (ctrTutorial) ctrTutorial.style.display = "none";
          if (adviceLabelRead) adviceLabelRead.style.display = "none";
          if (adviceLabelConcepts) adviceLabelConcepts.style.display = "none";
          if (adviceBlock) adviceBlock.style.display = "none";

          if (stage >= 1 || selected === "tutorial") {
            if (selected === "readability") {
              if (ctrReadability) ctrReadability.style.display = "flex";
            } else if (selected === "concepts") {
              if (ctrConcepts) ctrConcepts.style.display = "flex";
            } else if (selected === "tutorial") {
              if (ctrTutorial) ctrTutorial.style.display = "flex";
            }
          }
          if (selected === "testDebug" || selected === "time") {
            const editorContainer = document.querySelector(".editor-container");
            if (editorContainer && criterion === "testDebug") {
              editorContainer.style.height = "38em"; // or any smaller value you prefer
            }

            if (ctrGraphs) ctrGraphs.style.display = "flex";
            const graphContainer = document.getElementById("graph-container");
            if (graphContainer) {
              renderTestDebugBars(graphContainer);
              //graphContainer.innerHTML =
              //  "<div style='padding:0.8em;color:#7c5e00'>Grafieken komen hier (Testen & Debuggen / Tijdsbesteding)</div>";
            }
          }
          if (stage >= 2 || selected === "tutorial") {
            if (selected === "readability") {
              if (adviceLabelRead) adviceLabelRead.style.display = "";
              if (toggleAdviceInputRead) {
                adviceBlock.style.display = toggleAdviceInputRead.checked
                  ? "block"
                  : "none";
              }
            } else if (selected === "concepts") {
              if (adviceLabelConcepts) adviceLabelConcepts.style.display = "";
              if (toggleAdviceInputConcepts) {
                adviceBlock.style.display = toggleAdviceInputConcepts.checked
                  ? "block"
                  : "none";
              }
            } else if (selected === "tutorial") {
              if (adviceLabelTutorial) adviceLabelTutorial.style.display = "";
              if (toggleAdviceTutorial) {
                adviceBlock.style.display = toggleAdviceTutorial.checked
                  ? "block"
                  : "none";
              }
            }
          }
          if (stage >= 2 && selected === "testDebug") {
            if (adviceLabelTestDebug) adviceLabelTestDebug.style.display = "";
            if (toggleAdviceInputTestDebug) {
              adviceBlock.style.display = toggleAdviceInputTestDebug.checked
                ? "block"
                : "none";
            }
          }
          // If hiding graphs, clear content
          if (
            !(selected === "testDebug" || selected === "time") ||
            stage === 0
          ) {
            const graphContainer = document.getElementById("graph-container");
            if (
              graphContainer &&
              ctrGraphs &&
              ctrGraphs.style.display === "none"
            ) {
              graphContainer.innerHTML = "";
            }
          }
          // Re-render highlights based on new stage
          if (typeof syncHighlighting === "function") syncHighlighting();
        }

        if (version1Btn) version1Btn.onclick = () => setStage(0);
        if (version2Btn) version2Btn.onclick = () => setStage(1);
        if (version3Btn) version3Btn.onclick = () => setStage(2);

        // Always hide version buttons; stage controlled via URL
        const versionButtons = document.querySelector(".version-buttons");
        if (versionButtons) versionButtons.style.display = "none";
        if (selected === "tutorial") {
          setStage(2);
        }

        // Initialize stage from URL version param if present (1,2,3)
        const parsedVersion = parseInt(version || "", 10);
        if (
          !Number.isNaN(parsedVersion) &&
          parsedVersion >= 1 &&
          parsedVersion <= 3
        ) {
          setStage(parsedVersion - 1);
        } else {
          // default stage depending on mode
          setStage(selected === "tutorial" ? 2 : 0);
        }

        // --- Concepts persistence ---
        function conceptsKey(studentId, exerciseNum) {
          return `exerciseConcepts:${studentId}:${exerciseNum}`;
        }
        function loadConcepts(studentId, exerciseNum) {
          try {
            return (
              JSON.parse(
                localStorage.getItem(conceptsKey(studentId, exerciseNum))
              ) || []
            );
          } catch {
            return [];
          }
        }
        function saveConcepts(studentId, exerciseNum, list) {
          localStorage.setItem(
            conceptsKey(studentId, exerciseNum),
            JSON.stringify(list)
          );
        }

        const conceptBoxes = Array.from(
          document.querySelectorAll("input.concept")
        );
        let concepts = loadConcepts(studentId, exerciseNum);
        // seed from data if provided
        if (
          (!concepts || concepts.length === 0) &&
          Array.isArray(data.concepts)
        ) {
          concepts = data.concepts;
        }
        conceptBoxes.forEach((cb) => {
          cb.checked = concepts.includes(cb.value);
          cb.addEventListener("change", () => {
            const updated = Array.from(
              document.querySelectorAll("input.concept:checked")
            ).map((el) => el.value);
            saveConcepts(studentId, exerciseNum, updated);
          });
        });

        // --- Graph placeholder (for testing/debugging/time) ---
        const graphContainer = document.getElementById("graph-container");
        if (
          !(graphContainer && (selected === "testDebug" || selected === "time"))
        ) {
          graphContainer.innerHTML = "";
        }
      } else {
        document.getElementById("exercise-header").textContent =
          "Onbekende oefening";
        document.getElementById("exercise-title").textContent =
          "Oefening niet gevonden";
        document.getElementById("codeInput").value = "";
        document.getElementById("advice-list").innerHTML =
          "<li>Geen data gevonden voor deze oefening.</li>";
      }
      // Ensure syncHighlighting is called on every checkbox toggle
      document.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
        cb.addEventListener("change", (e) => {
          if (
            e.target.id === "toggleAdvice" ||
            e.target.id === "toggleAdviceConcepts" ||
            e.target.id === "toggleAdviceTestDebug"
          ) {
            adviceBlock.style.display = e.target.checked ? "block" : "none";
          }
          syncHighlighting();
        });
      });
      // Also set up input event listener for codeInput (in case it was not set yet)
      codeInput.addEventListener("input", syncHighlighting);
    }

    script.onload = function () {
      handleLoaded();
    };
    script.onerror = function () {
      if (usedFallback) return; // avoid loops
      // Fallback to legacy structure
      usedFallback = true;
      const legacy = document.createElement("script");
      legacy.src = `exercise_data_${studentId}.js`;
      legacy.onload = function () {
        handleLoaded();
      };
      legacy.onerror = function () {
        handleLoaded();
      };
      document.body.appendChild(legacy);
    };

    // Prefer new path
    script.src = newPath;
    document.body.appendChild(script);
  }
});

function showTab(tab) {
  document.getElementById("conceptsTab").style.display =
    tab === "concepts" ? "" : "none";
  document.getElementById("readabilityTab").style.display =
    tab === "readability" ? "" : "none";
}

let currentChart = null;

function destroyCurrentChart() {
  if (currentChart && typeof currentChart.destroy === "function") {
    currentChart.destroy();
  }
  currentChart = null;
}

function sectionKindToColor(kind) {
  if (version > 1) {
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
        return "#b0b0b0"; // neutral gray fallback
    }
  } else {
    return "#b0b0b0"; // neutral gray fallback
  }
  // High-contrast, theme-aware palette (distinct hues)
}
const KIND_LABEL = {
  programming: "Programmeren",
  testing: "Testen",
  debugger: "Debuggen",
  trial: "Trial-and-error",
  "trial-and-error": "Trial-and-error",
};

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
  } catch (e) {
    return 1;
  }
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

    //if (seeded) return seeded;
    const raw = localStorage.getItem(metricsKey(studentId, exerciseId));
    console.log(raw);
    console.log("xx");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
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

function goToExercise(studentId, exerciseId, timeSegment = null) {
  let url = `exercise.html?student=${studentId}&exercise=${exerciseId}&criterion=testDebug&version=${version}`;
  if (timeSegment !== null) {
    url += `&segment=${timeSegment}`;
  }
  window.location.href = url;
}

function renderTestDebugBars(container) {
  destroyCurrentChart();
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
  note.style.fontSize = "0.4em";
  note.style.color = "#333";
  note.style.marginTop = "2px";

  if (version > 1) {
    container.appendChild(legend);
  }
  container.appendChild(canvas);

  let labels = [""]; //breaks if empty
  // Datasets will be constructed dynamically based on max minutes
  let segmentDatasets = [];
  const m = window.exerciseData.metrics;
  const minutes = minutesFromMetrics(m);
  console.log(window);

  // X axis: students; for each exercise we still render separate bars per student (like time)
  //labels = students.map((s) => s.name);
  // Build per-exercise bars across students by stacking minute segments (from sections when present)
  const allExerciseSegmentDatasets = [];
  const exSegSets = Array.from({ length: minutes }, (_, segIdx) => ({
    label: `Expected behaviour`,
    data: [],
    backgroundColor: [],
    // stack per exercise so each exercise forms its own stacked bar
    borderRadius: 0,
    borderSkipped: false,
  }));

  //TODO
  //for (let sIdx = 0; sIdx < students.length; sIdx++) {
  const kinds = expandSectionKinds(m, minutes);
  const pattern =
    kinds ||
    Array.from({ length: minutes }, () =>
      m && m.usedDebugger ? "debugger" : "trial"
    );
  for (let seg = 0; seg < minutes; seg++) {
    const kind = seg < pattern.length ? pattern[seg] : null;
    const color = kind ? sectionKindToColor(kind) : null;
    exSegSets[seg].data.push(kind ? 1 : 0);
    exSegSets[seg].backgroundColor.push(color || "rgba(0,0,0,0)");
  }
  //}
  //set exercise labels for each bar
  allExerciseSegmentDatasets.push(...exSegSets);

  segmentDatasets = allExerciseSegmentDatasets;

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
          display: false,
          stacked: true,
          title: {
            display: false,
            text: "",
          },
          ticks: {
            color: "#000",
            padding: 20,
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
              const exerciseLabel = labels[it.dataIndex];
              return ``;
            },
            label: function (context) {
              if (!context) return "";
              const color = context.dataset.backgroundColor[context.dataIndex];
              const kind = (() => {
                const keys = ["programming", "testing", "debugger", "trial"];
                for (const k of keys)
                  if (sectionKindToColor(k) === color) return k; //This gives labels/tooltips
                return "";
              })();
              return kind ? KIND_LABEL[kind] || kind : "";
            },
            afterBody: function (items) {
              const m = getMetrics(studentId, exerciseNum) || {};
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
        const datasetIndex = el.datasetIndex;
        var max_minutes = minutes;
        const exerciseTimeSegment = Math.floor(datasetIndex % max_minutes);
        goToExercise(studentId, exerciseNum, exerciseTimeSegment);
      },
      categoryPercentage: 0.9,
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

            ctx.restore();
          } catch {}
        },
      },
    ],
  });
}
