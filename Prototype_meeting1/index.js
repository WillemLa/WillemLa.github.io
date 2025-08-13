const students = [
  "Alice Kim",
  "Bob Lee",
  "Carla Singh",
  "Daniel Cruz",
  "Emma Jones",
  "Fatima Noor",
  "George Lin",
  "Hannah Zadeh",
  "Ivan Petrov",
  "Juno Tan",
];

const readabilityScores = [9, 7, 4, 6, 9, 5, 5, 8, 7, 9];

const needsFollowUp = [0, 0, 1, 1, 0, 1, 1, 0, 0, 0];

const readabilityFeedback = [
  "Code is well-structured with clear comments.",
  "Code functions but lacks consistent formatting.",
  "Generally clean; minor indentation issues.",
  "Clear logic; variable naming could be improved.",
  "Highly readable with excellent structure.",
  "Compact code with appropriate comments.",
  "Code readability is acceptable; improve documentation.",
  "Clean and focused code.",
  "Functional but code structure is messy.",
  "Very clear and well-commented code.",
];

const adviceList = [
  "Encourage this student to continue their great habits — they could help peers!",
  "Recommend a short session on consistent indentation and spacing.",
  "Advise reviewing indentation rules in class with a few examples.",
  "Have a naming convention guide ready and walk them through it.",
  "No action needed — this student could mentor others on readability.",
  "Provide praise, and suggest they continue commenting complex sections.",
  "Offer a refresher on how to write effective documentation headers.",
  "Congratulate them and ask if they want to take on a leadership role.",
  "Sit together and walk through ways to improve structure in real code.",
  "Excellent work — encourage them to help review peers' readability.",
];

const behaviorData = {
  "Alice Kim": [
    { start: 0, end: 2, type: "testing" },
    { start: 2, end: 3, type: "trial" },
    { start: 3, end: 9, type: "testing" },
    { start: 9, end: 10, type: "testing" },
  ],
  "Bob Lee": [
    { start: 0, end: 4, type: "testing" },
    { start: 4, end: 10, type: "testing" },
  ],
  "Carla Singh": [
    { start: 0, end: 2, type: "testing" },
    { start: 2, end: 10, type: "trial" },
  ],
  "Daniel Cruz": [
    { start: 0, end: 1.5, type: "testing" },
    { start: 1.5, end: 4, type: "trial" },
    { start: 4, end: 7, type: "trial" },
    { start: 7, end: 10, type: "trial" },
  ],
  "Emma Jones": [
    { start: 0, end: 2, type: "trial" },
    { start: 2, end: 5, type: "testing" },
    { start: 5, end: 8, type: "testing" },
    { start: 8, end: 10, type: "testing" },
  ],
  "Fatima Noor": [
    { start: 0, end: 2, type: "testing" },
    { start: 2, end: 4, type: "testing" },
    { start: 4, end: 6, type: "trial" },
    { start: 6, end: 10, type: "trial" },
  ],
  "George Lin": [
    { start: 0, end: 3, type: "trial" },
    { start: 3, end: 7, type: "trial" },
    { start: 7, end: 10, type: "testing" },
  ],
  "Hannah Zadeh": [
    { start: 0, end: 2.5, type: "testing" },
    { start: 2.5, end: 5, type: "testing" },
    { start: 5, end: 10, type: "testing" },
  ],
  "Ivan Petrov": [
    { start: 0, end: 1, type: "trial" },
    { start: 1, end: 4, type: "testing" },
    { start: 4, end: 7, type: "testing" },
    { start: 7, end: 10, type: "testing" },
  ],
  "Juno Tan": [
    { start: 0, end: 5, type: "testing" },
    { start: 5, end: 7, type: "testing" },
    { start: 7, end: 10, type: "testing" },
  ],
};

const timeFunctionalityData = [
  { name: "Alice Kim", time: 8, functional: 1 },
  { name: "Bob Lee", time: 4, functional: 1 },
  { name: "Carla Singh", time: 1, functional: 0 },
  { name: "Daniel Cruz", time: 12, functional: 1 },
  { name: "Emma Jones", time: 6, functional: 1 },
  { name: "Fatima Noor", time: 4, functional: 0 },
  { name: "George Lin", time: 3, functional: 0 },
  { name: "Hannah Zadeh", time: 2, functional: 1 },
  { name: "Ivan Petrov", time: 9, functional: 1 },
  { name: "Juno Tan", time: 7, functional: 1 },
];

const warningStudentsBehaviour = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0];

let currentMode = "mirroring";
let iconHitboxes = [];

const behaviorColors = {
  testing: "rgba(54, 162, 235, 0.6)",
  trial: "rgba(214, 36, 36,0.6)",
  idle: "gray",
};

document.querySelectorAll("input[name='mode']").forEach((el) => {
  el.addEventListener("change", (e) => {
    currentMode = e.target.value;
    updateChartDisplay();
  });
});

function buildReadabilityChart() {
  const ctx = document.getElementById("readabilityChart").getContext("2d");

  const baseColor = "rgba(54, 162, 235, 0.6)";
  const backgroundColors = students.map(() => baseColor);

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: students,
      datasets: [
        {
          label: "Readability Score (1–10)",
          data: readabilityScores,
          backgroundColor: backgroundColors,
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
      layout: {
        padding: { bottom: 80 }, // more room for icons
      },
      scales: {
        y: { beginAtZero: true, max: 10 },
        x: {
          ticks: { font: { size: 12 } },
        },
      },
      onClick: (evt) => {
        const pos = Chart.helpers.getRelativePosition(evt, chart);

        for (let box of iconHitboxes) {
          if (
            pos.x >= box.x - 10 &&
            pos.x <= box.x + 10 &&
            pos.y >= box.y - 10 &&
            pos.y <= box.y + 10
          ) {
            showFeedbackReadability(box.index);
            return;
          }
        }

        const points = chart.getElementsAtEventForMode(
          evt,
          "nearest",
          { intersect: true },
          false
        );
        if (points.length) {
          const index = points[0].index;
          showFeedbackReadability(index);
        }
      },
    },
    plugins: [warningPlugin],
  });
}

//icon click
document.getElementById("readabilityChart").onclick = function (evt) {
  const canvasPosition = Chart.helpers.getRelativePosition(evt, chart);

  // Check icon clicks first
  for (let box of iconHitboxes) {
    if (
      canvasPosition.x >= box.x - box.width / 2 &&
      canvasPosition.x <= box.x + box.width / 2 &&
      canvasPosition.y >= box.y &&
      canvasPosition.y <= box.y + box.height
    ) {
      showFeedbackReadability(box.index);
      return;
    }
  }

  // If no icon was clicked, check bar
  const points = chart.getElementsAtEventForMode(
    evt,
    "nearest",
    { intersect: true },
    false
  );
  if (points.length) {
    const index = points[0].index;
    showFeedbackReadability(index);
  }
};

function showFeedbackReadability(index) {
  if (currentMode === "mirroring") return;

  const box = document.getElementById("feedbackBox");
  box.style.display = "block";

  let content = `<strong>Feedback for ${students[index]}:</strong><br>${readabilityFeedback[index]}`;

  if (currentMode === "advising") {
    content += `<br><br><em>Advice:</em> ${adviceList[index]}`;
  }

  box.innerHTML = content;

  const baseColor = "rgba(54, 162, 235, 0.6)";

  chart.update();
}

function updateChartDisplay() {
  if (currentMode === "mirroring") {
    document.getElementById("feedbackBox").style.display = "none";
  }
  chartTimeLine.options.scales.yIcons.labels = students.map((_, i) =>
    currentMode !== "mirroring" && needsFollowUp[i] ? "⚠️" : ""
  );
  chartTimeLine.update();
}

function buildBehaviorTimelineChart() {
  const ctx = document.getElementById("behaviorTimelineChart").getContext("2d");

  const datasets = [];

  students.forEach((student) => {
    const events = behaviorData[student] || [];

    events.forEach((event, idx) => {
      datasets.push({
        label: `${student}-${event.type}-${idx}`,
        data: [
          {
            x: event.end - event.start,
            y: student,
            base: event.start,
          },
        ],
        backgroundColor: behaviorColors[event.type],
        stack: student, // ⬅️ This is the magic that aligns segments horizontally
        borderRadius: 3,
        borderSkipped: false,
        grouped: false, // ✅ disables inner grouping offset
        barThickness: 10, // ✅ consistent height
      });
    });
  });
  chartTimeLine = new Chart(ctx, {
    type: "bar",
    data: {
      datasets,
    },
    options: {
      indexAxis: "y",
      responsive: true,
      parsing: false, // allows raw x/y values
      scales: {
        x: {
          type: "linear",
          stacked: true,
          min: 0,
          max: 10,
          title: {
            display: true,
            text: "Time (minutes)",
          },
        },
        y: {
          type: "category",
          labels: students,
          position: "left",
          ticks: {
            align: "right", // right align names
          },
        },

        yIcons: {
          type: "category",
          labels: students.map((_, i) =>
            currentMode != "mirroring" && needsFollowUp[i] ? "⚠️" : ""
          ),
          position: "left",
          grid: {
            drawOnChartArea: false, // ⛔️ grid lines
            drawTicks: false, // ⛔️ tick marks
            drawBorder: false, // ⛔️ vertical axis line
            borderWidth: 0, // ✅ double confirm
          },
          ticks: {
            align: "right", // right align names
          },
          border: {
            display: false,
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function (ctx) {
              const dataset = ctx.dataset;
              const start = dataset.base;
              const duration = ctx.raw.x;
              const end = start + duration;
              const student = ctx.raw.y;
              const type = dataset.label.split("-")[1];
              return `${student}: ${type} (${duration} mins)`;
            },
          },
        },
      },
    },
    plugins: [startLinePlugin],
  });
  console.log(currentMode);
}

const warningPlugin = {
  id: "warningIcons",
  afterDatasetsDraw(chart, args, options) {
    const {
      ctx,
      scales: { x, y },
    } = chart;
    iconHitboxes = [];

    if (currentMode !== "alerting" && currentMode !== "advising") return;

    ctx.save();
    const tickOpts = x.options.ticks;
    const fontSize = tickOpts.font?.size || 12;
    const fontFamily = tickOpts.font?.family || "Arial";

    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.textAlign = "center";
    ctx.fillStyle = "red";

    // Estimate label height + padding
    const iconOffset = fontSize + 10;

    x.ticks.forEach((tick, i) => {
      if (needsFollowUp[i]) {
        const xPos = x.getPixelForTick(i);
        const yPos = x.bottom + iconOffset;
        ctx.fillText("⚠️", xPos, yPos);

        iconHitboxes.push({
          x: xPos,
          y: yPos - 10,
          width: 20,
          height: 20,
          index: i,
        });
      }
    });

    ctx.restore();
  },
};

//const timeFunctionalityData = {
// "Exercise 1": [{ time: 8, functional: 1 }],

function buildTimeFunctionalityChart() {
  const ctx = document
    .getElementById("timeAndFunctionalityChart")
    .getContext("2d");

  const baseColor = "rgba(54, 162, 235, 0.6)";
  const backgroundColors = students.map(() => baseColor);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: timeFunctionalityData.map((item) => item.name),
      datasets: [
        {
          label: "Minutes per exercise",
          data: timeFunctionalityData.map((item) => item.time),
          backgroundColor: timeFunctionalityData.map((item) =>
            item.functional ? "rgba(45, 214, 70,0.6)" : "rgba(214, 36, 36,0.6)"
          ),
          borderColor: timeFunctionalityData.map((item) =>
            item.functional ? "rgb(31, 173, 52)" : "rgba(214, 36, 36,1)"
          ),
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
      layout: {
        padding: { bottom: 80 }, // more room for icons
      },
      scales: {
        y: { beginAtZero: true, max: 10 },
        x: {
          ticks: { font: { size: 12 } },
        },
      },
      onClick: (evt) => {
        const pos = Chart.helpers.getRelativePosition(evt, chart);

        for (let box of iconHitboxes) {
          if (
            pos.x >= box.x - 10 &&
            pos.x <= box.x + 10 &&
            pos.y >= box.y - 10 &&
            pos.y <= box.y + 10
          ) {
            showFeedbackReadability(box.index);
            return;
          }
        }

        const points = chart.getElementsAtEventForMode(
          evt,
          "nearest",
          { intersect: true },
          false
        );
        if (points.length) {
          const index = points[0].index;
          showFeedbackReadability(index);
        }
      },
    },
    plugins: [warningPlugin],
  });
}

const startLinePlugin = {
  id: "startLinePlugin",
  afterDatasetsDraw(chart) {
    const { ctx, scales } = chart;
    const xScale = scales.x;

    chart.data.datasets.forEach((dataset, datasetIndex) => {
      const dataPoint = dataset.data[0];
      if (!dataPoint || dataPoint.base === undefined) return;

      const meta = chart.getDatasetMeta(datasetIndex);
      const bar = meta.data[0];
      if (!bar) return;

      // Use Chart.js's internal render props
      const { y, height } = bar.getProps(["y", "height"], true);

      const xStart = xScale.getPixelForValue(dataPoint.base);
      const yTop = y - height;
      const yBottom = y + height;

      ctx.save();
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(xStart, yTop);
      ctx.lineTo(xStart, yBottom);
      ctx.stroke();
      ctx.restore();
    });
  },
};

const barSegmentPlugin = {
  id: "barSegmentPlugin",
  beforeDatasetsDraw(chart) {
    const { ctx } = chart;

    chart.data.datasets.forEach((dataset) => {
      const meta = chart.getDatasetMeta(chart.data.datasets.indexOf(dataset));
      meta.data.forEach((bar, i) => {
        const raw = dataset.data[i];
        if (raw.x2 !== undefined) {
          const startX = chart.scales.x.getPixelForValue(raw.x);
          const endX = chart.scales.x.getPixelForValue(raw.x2);
          const yCenter = chart.scales.y.getPixelForValue(raw.y);
          console.log(chart.data);
          console.log(chart);
          console.log(meta.data);

          const barHeight = chart.height / chart.data.datasets.length; // or dynamically from chart height / #students
          console.log(chart.data.datasets.size);
          const yTop = yCenter - barHeight / 2;

          ctx.save();
          ctx.fillStyle = dataset.backgroundColor;
          ctx.fillRect(startX, yTop, endX - startX, barHeight);
          ctx.restore();

          //rect per save
          ctx.save();
          ctx.fillStyle = "black";
          ctx.fillRect(startX, yTop - barHeight / 2, 2, barHeight * 2);
          ctx.restore();
        }
      });
    });

    return false; // prevent normal bar draw
  },
};

buildReadabilityChart();
buildTimeFunctionalityChart();
buildBehaviorTimelineChart();
