window.exerciseData = {
  student: "Daniel Wu",
  code: `int LedGetal;

void setup()
{
  initDwenguino();
  LedGetal = 1;
  LEDS = LedGetal;
}

void loop()
{

}`,
  advice: [
    "Beperk trial-and-error: noteer observaties en formuleer een hypothese voor elke stap.",
  ],
  metrics: {
    elapsedSeconds: 18 * 60,
    wroteTests: true,
    usedDebugger: false,
    sections: [
      { minutes: 4, type: "programming" },
      { minutes: 1, type: "testing" },
      { minutes: 3, type: "debugger" },
      { minutes: 2, type: "programming" },
      { minutes: 1, type: "testing" },
      { minutes: 3, type: "trial" },
      { minutes: 1, type: "testing" },
    ],
    timeAdvice:
      "Veel tijd ging naar uitproberen. Plan kortere, doelgerichte cycli met reflectie.",
    tdAdvice:
      "Beperk trial-and-error: noteer observaties en formuleer een hypothese voor elke stap.",
  },
};
