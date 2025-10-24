window.exerciseData = {
  student: "Alice Morgan",
  code: `void setup()
{
  initDwenguino();
}

void loop()
{
}
`,
  advice: [
    "Mooi afwisselend patroon: programmeren, debuggen, testen. Benadruk systematiek.",
  ],
  metrics: {
    elapsedSeconds: 12 * 60,
    wroteTests: true,
    usedDebugger: true,
    sections: [
      { minutes: 7, type: "programming" },
      { minutes: 1, type: "testing" },
      { minutes: 1, type: "debugger" },
      { minutes: 1, type: "testing" },
    ],
    timeAdvice:
      "Gestructureerde blokken. Vraag Daniël hoe hij beslist wanneer te testen of debuggen.",
    tdAdvice:
      "Mooi afwisselend patroon: programmeren, debuggen, testen. Benadruk systematiek.",
  },
};
