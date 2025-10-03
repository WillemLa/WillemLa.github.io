const codeInput = document.getElementById("codeInput");
const highlightedCode = document.getElementById("highlightedCode");
const adviceBlock = document.getElementById("adviceBlock");
const toggleAdvice = document.getElementById("toggleAdvice");
// Track current version stage globally: 0 (no highlights), 1 (highlights), 2 (highlights + advice)
window.currentVersionStage = 0;

// Parse student and exercise from query params or URL
function getStudentAndExercise() {
  const params = new URLSearchParams(window.location.search);
  let studentId = params.get("student");
  let exerciseNum = params.get("exercise");
  let criterion = params.get("criterion");
  if (studentId && exerciseNum) {
    return { studentId, exerciseNum, criterion };
  }
  // Fallback: parse from path
  const match = window.location.pathname.match(
    /student_(\d+)\/exercise_(\d+)\.html$/
  );
  if (match) {
    return { studentId: match[1], exerciseNum: match[2], criterion: null };
  }
  return { studentId: null, exerciseNum: null, criterion: null };
}

const { studentId, exerciseNum, criterion } = getStudentAndExercise();

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

let currentExerciseType = "concepts"; // or "readability"

function showExercise(type) {
  currentExerciseType = type;
  // Only show the relevant checkboxes
  document.getElementById("conceptCheckboxes").style.display =
    type === "concepts" ? "" : "none";
  document.getElementById("readabilityCheckboxes").style.display =
    type === "readability" ? "" : "none";
  // Show the correct advice
  updateAdvice();
  // Update highlights
  syncHighlighting();
}

function updateAdvice() {
  if (currentExerciseType === "concepts") {
    adviceBlock.innerText =
      "Tip: Use the checkboxes above to highlight code concepts such as loops, functions, and conditionals.";
  } else {
    adviceBlock.innerText =
      "Tip: Use the checkboxes above to highlight readability issues such as non-camelCase or one-letter variables.";
  }
}

function syncHighlighting() {
  const code = codeInput.value;
  // In version 1 (stage 0), render raw code without any highlights
  if (window.currentVersionStage === 0 && criterion !== "tutorial") {
    const codeWithoutTags = code
      .split("\n")
      .filter((line) => !/\/\/\s*<\/?tag:[a-zA-Z]+>/i.test(line))
      .join("\n");
    highlightedCode.textContent = codeWithoutTags;
    return;
  }
  highlightedCode.innerHTML = highlightCode(code, currentExerciseType);
}

function highlightCode(code, type) {
  let tagClassMap = {};
  if (type === "concepts") {
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
  } else {
    tagClassMap = {}; // or skip tag-based highlighting
  }

  let highlighted = code;

  // Step 1: Apply tag-based highlighting
  // Readability code
  if (criterion == "concepts") {
    highlighted = applyTagHighlighting(code, tagClassMap);
  }

  //Concept code
  // Step 2: Apply regex-based highlights
  if (criterion == "readability" || criterion == "tutorial") {
    highlighted = applyRegexHighlights(highlighted);
  }
  return highlighted;
}

function applyTagHighlighting(code, tagClassMap) {
  const lines = code.split("\n");
  let activeTag = null;
  let taggedLines = [];

  for (let i = 0; i < lines.length; i++) {
    // Detect start of tag region
    const startTagMatch = lines[i].match(/\/\/\s*<tag:([a-zA-Z]+)>/i);
    if (startTagMatch) {
      const tag = startTagMatch[1].toLowerCase();
      if (tagClassMap[tag] !== undefined) {
        activeTag = tag;
      }
      continue; // Skip tag marker line
    }
    // Detect end of tag region
    const endTagMatch = lines[i].match(/\/\/\s*<\/tag:([a-zA-Z]+)>/i);
    if (endTagMatch) {
      activeTag = null;
      continue; // Skip tag marker line
    }
    // Highlight if inside a tag region and highlight is enabled
    if (
      activeTag &&
      tagClassMap[activeTag] &&
      tagClassMap[activeTag] !== "" &&
      lines[i].trim() !== ""
    ) {
      taggedLines.push(
        `<span class="${tagClassMap[activeTag]}">${escapeHtml(lines[i])}</span>`
      );
    } else {
      taggedLines.push(escapeHtml(lines[i]));
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
    const newPath = `data/${studentId}/${crit}/exercise_${exerciseNum}.js`;
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
        document.title = `Oefening ${exerciseNum} - ${data.student}`;
        document.getElementById("exercise-header").textContent = data.student;
        document.getElementById(
          "exercise-title"
        ).textContent = `Oefening ${exerciseNum}`;
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
        console.log(criterion);
        const selected = criterion || "readability";
        // Let staged logic control visibility; ensure both hidden here
        if (ctrReadability) ctrReadability.style.display = "none";
        if (ctrConcepts) ctrConcepts.style.display = "none";
        if (ctrGraphs)
          ctrGraphs.style.display =
            selected === "testDebug" || selected === "time" ? "none" : "none";

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
        if (adviceBlock) adviceBlock.style.display = "none";

        function setStage(stage) {
          window.currentVersionStage = stage;
          // Hide everything first
          if (ctrReadability) ctrReadability.style.display = "none";
          if (ctrConcepts) ctrConcepts.style.display = "none";
          if (ctrGraphs) ctrGraphs.style.display = "none";
          if (adviceLabelRead) adviceLabelRead.style.display = "none";
          if (adviceLabelConcepts) adviceLabelConcepts.style.display = "none";
          if (adviceBlock) adviceBlock.style.display = "none";

          if (stage >= 1 || selected === "tutorial") {
            if (selected === "readability" || selected === "tutorial") {
              if (ctrReadability) ctrReadability.style.display = "flex";
            } else if (selected === "concepts") {
              if (ctrConcepts) ctrConcepts.style.display = "flex";
            } else if (selected === "testDebug" || selected === "time") {
              if (ctrGraphs) ctrGraphs.style.display = "flex";
              const graphContainer = document.getElementById("graph-container");
              if (graphContainer) {
                graphContainer.innerHTML =
                  "<div style='padding:0.8em;color:#7c5e00'>Grafieken komen hier (Testen & Debuggen / Tijdsbesteding)</div>";
              }
            }
          }
          if (stage >= 2 || selected === "tutorial") {
            if (selected === "readability" || selected === "tutorial") {
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

        // In tutorial mode, hide the version buttons and show everything immediately
        const versionButtons = document.querySelector(".version-buttons");
        if (selected === "tutorial") {
          if (versionButtons) versionButtons.style.display = "none";
          setStage(2);
        } else {
          if (versionButtons) versionButtons.style.display = "flex";
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
          graphContainer &&
          (selected === "testDebug" || selected === "time")
        ) {
          graphContainer.innerHTML =
            "<div style='padding:0.8em;color:#7c5e00'>Grafieken komen hier (Testen & Debuggen / Tijdsbesteding)</div>";
        } else if (graphContainer) {
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
            e.target.id === "toggleAdviceConcepts"
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
