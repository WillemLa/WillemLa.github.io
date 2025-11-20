window.exerciseData = {
  student: "Daniel Wu",
  code: `int Doel;
int HuidigGetal;
int LedGetal;

void setup()
{
  initDwenguino();
  Doel = (random(0, 255));
  HuidigGetal = 0;
  LedGetal = 1;
  dwenguinoLCD.setCursor(0,0);
  dwenguinoLCD.print(String("Doel: ") + String(Doel));
  LEDS = LedGetal;
}

void loop()
{
    if (digitalRead(SW_W) == PRESSED) {
      if (LedGetal <= 127) {
        LedGetal = LedGetal * 2;
        LEDS = LedGetal;
      }
    }
    if (digitalRead(SW_E) == PRESSED) {
      if (LedGetal >= 2) {
        LedGetal = LedGetal / 2;
        LEDS = LedGetal;
      }
    }
    if (digitalRead(SW_C) == PRESSED) {
      HuidigGetal = HuidigGetal + LedGetal;
      if (Doel == HuidigGetal) {
        dwenguinoLCD.clear();
        dwenguinoLCD.setCursor(0,1);
        dwenguinoLCD.print(String("Proficiat!"));
        dwenguinoLCD.clear();
        Doel = (random(0, 255));
        HuidigGetal = 0;
        LedGetal = 1;
        dwenguinoLCD.setCursor(0,0);
        dwenguinoLCD.print(String("Doel: ") + String(Doel));
        LEDS = LedGetal;
      } else {
        dwenguinoLCD.setCursor(0,1);
        dwenguinoLCD.print(String("Huidig: ") + String(HuidigGetal));
      }
    }
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
