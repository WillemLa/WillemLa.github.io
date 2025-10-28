window.exerciseData = {
  student: "Carla Diaz",
  code: `int LedGetal;
int HuidigGetal;
int Doel;

void setup()
{
  initDwenguino();
  Doel = (random(0, 255));
  HuidigGetal = 0;
  LedGetal = 1;
  LEDS = LedGetal;
}

void loop()
{
    if (digitalRead(SW_W) == PRESSED) {
      if (LedGetal < 64) {
        LedGetal = LedGetal * 2;
        LEDS = LedGetal;
        dwenguinoLCD.print(String(LedGetal));
      }
    }
    if (digitalRead(SW_E) == PRESSED) {
      if (LedGetal > 2) {
        LedGetal = LedGetal / 2;
        LEDS = LedGetal;
        dwenguinoLCD.print(String(LedGetal));
      }
    }
}`,
  advice: [
    "Vervang trial-and-error door doelgerichte observaties en kleine experimenten.",
  ],
  metrics: {
    elapsedSeconds: 4 * 60,
    wroteTests: false,
    usedDebugger: false,
    sections: [
      { minutes: 3, type: "programming" },
      { minutes: 3, type: "trial" },
    ],
    timeAdvice:
      "Hou de sessies kort en gefocust; plan mini-tests na elke bouwstap.",
    tdAdvice:
      "Vervang trial-and-error door doelgerichte observaties en kleine experimenten.",
  },
};
