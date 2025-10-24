window.exerciseData = {
  student: "Ben Thompson",
  metrics: {
    elapsedSeconds: 9 * 60,
    wroteTests: true,
    usedDebugger: false,
    finished: true,
    // Explicit time sections (minutes) used for graphs; sums must equal total minutes
    sections: [
      { minutes: 3, type: "programming" },
      { minutes: 1, type: "testing" },
      { minutes: 2, type: "debugger" },
      { minutes: 2, type: "programming" },
      { minutes: 1, type: "testing" },
    ],
    // Advice shown on hover in time/test-debug graphs
    timeAdvice:
      "Ben wisselt bouwen met debuggen/testen af. Vraag naar haar besliscriteria.",
    tdAdvice:
      "Moedig korte cycli aan: stukje programmeren, gericht debuggen, korte test.",
  },
};
