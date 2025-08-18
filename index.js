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

// Standard alert definitions
const alertDefs = {
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

function goToExercise(studentId, exerciseNum) {
  window.location.href = `students/exercise.html?student=${studentId}&exercise=${exerciseNum}`;
}

function renderDashboardTable() {
  const table = document.getElementById("dashboard-table");
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
      const alertKeys =
        (results[student.id] && results[student.id][ex.id]) || [];
      const alerts = alertKeys.map(
        (key) => alertDefs[key] || alertDefs.correct
      );
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

document.addEventListener("DOMContentLoaded", renderDashboardTable);
