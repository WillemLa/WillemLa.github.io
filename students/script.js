const codeInput = document.getElementById("codeInput");
const highlightedCode = document.getElementById("highlightedCode");
const adviceBlock = document.getElementById("adviceBlock");
const toggleAdvice = document.getElementById("toggleAdvice");

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

function highlightCode(code) {
  let highlighted = escapeHtml(code);

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

function syncHighlighting() {
  const code = codeInput.value;
  highlightedCode.innerHTML = highlightCode(code);
}

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
  if (studentId && exerciseNum) {
    console.log("About to load:", `exercise_data_${studentId}.js`);
    const script = document.createElement("script");
    script.src = `exercise_data_${studentId}.js`;
    script.onload = function () {
      console.log("Loaded:", script.src);
      const dataObj = window[`exerciseData_${studentId}`];
      const data = dataObj && dataObj[exerciseNum];
      if (data) {
        document.title = `Oefening ${exerciseNum} - ${data.student}`;
        document.getElementById("exercise-header").textContent = data.student;
        document.getElementById(
          "exercise-title"
        ).textContent = `Oefening ${exerciseNum}`;
        document.getElementById("codeInput").value = data.code;
        if (typeof syncHighlighting === "function") syncHighlighting();
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

        // Show relevant control groups based on selected criterion
        const ctrReadability = document.getElementById("controls-readability");
        const ctrConcepts = document.getElementById("controls-concepts");
        const ctrGraphs = document.getElementById("controls-graphs");
        const selected = criterion || "readability";
        if (ctrReadability)
          ctrReadability.style.display =
            selected === "readability" ? "flex" : "none";
        if (ctrConcepts)
          ctrConcepts.style.display = selected === "concepts" ? "flex" : "none";
        if (ctrGraphs)
          ctrGraphs.style.display =
            selected === "testDebug" || selected === "time" ? "flex" : "none";

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
          if (e.target.id === "toggleAdvice") {
            adviceBlock.style.display = e.target.checked ? "block" : "none";
          }
          syncHighlighting();
        });
      });
      // Also set up input event listener for codeInput (in case it was not set yet)
      codeInput.addEventListener("input", syncHighlighting);
    };
    document.body.appendChild(script);
  }
});

window.exerciseData_1[1];
