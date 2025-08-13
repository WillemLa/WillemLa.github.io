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
    if (studentId && exerciseNum) {
      return { studentId, exerciseNum };
    }
    // Fallback: parse from path
    const match = window.location.pathname.match(
      /student_(\d+)\/exercise_(\d+)\.html$/
    );
    if (match) {
      return { studentId: match[1], exerciseNum: match[2] };
    }
    return { studentId: null, exerciseNum: null };
  }

  const { studentId, exerciseNum } = getStudentAndExercise();
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
