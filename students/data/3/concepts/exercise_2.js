window.exerciseData = {
  student: "Carla Diaz",
  context:
    "Laat om de beurt de leds van rechts naar links knipperen. Zodra de meest linkse LED knippert herbegin je helemaal rechts",

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
      if (LedGetal <= 64) {
        LedGetal = LedGetal * 2;
        LEDS = LedGetal;
        dwenguinoLCD.print(String(LedGetal));
      }
    }
    if (digitalRead(SW_E) == PRESSED) {
// <tag:Conditional>
      if (LedGetal = 2) {
// </tag:Conditional>

        LedGetal = LedGetal / 2;
        LEDS = LedGetal;
        dwenguinoLCD.print(String(LedGetal));
      }
    }
}`,
  advice: [
    "Laat Carla uitleggen welke iteraties en voorwaarden de LED-patronen bepalen.",
  ],
  metrics: { elapsedSeconds: 10 * 60, wroteTests: true, usedDebugger: true },
  concepts: ["for", "while", "function", "if"],
};
