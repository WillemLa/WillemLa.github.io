window.exerciseData = {
  student: "Ben Thompson",
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
  dwenguinoLCD.print(String(Doel));
  LEDS = LedGetal;
}

void loop()
{
    if (digitalRead(SW_W) == PRESSED) {
      if (LedGetal <= 64) {
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
}`,
  advice: [
    "Introduceer kort debuggen bij falende tests om trial-and-error te beperken.",
  ],
  metrics: {
    elapsedSeconds: 16 * 60,
    wroteTests: true,
    usedDebugger: false,
    sections: [
      { minutes: 7, type: "programming" },
      { minutes: 6, type: "trial" },
    ],
    timeAdvice:
      "Balans tussen bouwen en testen. Stimuleer het groeperen van kleine testmomenten.",
    tdAdvice:
      "Introduceer kort debuggen bij falende tests om trial-and-error te beperken.",
  },
};
