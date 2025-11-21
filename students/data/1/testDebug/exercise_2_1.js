window.exerciseData = {
  student: "Alice Morgan",
  code: `int LedGetal;
int HuidigGetal;
int Doel;

void setup()
{
  initDwenguino();
  dwenguinoLCD.clear();
  Doel = (random(0, 255));
  HuidigGetal = 0;
  LedGetal = 1;
  dwenguinoLCD.setCursor(0,0);
  dwenguinoLCD.print(String("Doel: ") + String(Doel));
}

void loop()
{
}`,
  advice: ["Mooi patroon van programmeren, testen en debuggen."],
  metrics: {
    elapsedSeconds: 14 * 60,
    wroteTests: false,
    usedDebugger: true,
    finished: false,
    sections: [
      { minutes: 3, type: "programming" },
      { minutes: 1, type: "testing" },
      { minutes: 1, type: "programming" },
      { minutes: 1, type: "debugger" },
      { minutes: 3, type: "programming" },
      { minutes: 1, type: "programming" },
      { minutes: 1, type: "testing" },
    ],
    timeAdvice:
      "Flinke debugsessies tussen programmeerblokken. Focus op hypothesen vooraf.",
    tdAdvice: "Mooi patroon van programmeren, testen en debuggen.",
  },
};
