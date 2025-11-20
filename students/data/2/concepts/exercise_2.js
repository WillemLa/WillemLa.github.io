window.exerciseData = {
  student: "Ben Thompson",
  context:
    "Laat om de beurt de leds van rechts naar links knipperen. Zodra de meest linkse LED knippert herbegin je helemaal rechts",

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
      if (LedGetal < 64) {
        LedGetal = LedGetal * 2;
        LEDS = LedGetal;
      }
    }
    if (digitalRead(SW_E) == PRESSED) {
      if (LedGetal > 2) {
        LedGetal = LedGetal / 2;
        LEDS = LedGetal;
      }
    }
}`,
  advice: [
    "Bespreek met Ben hoe de LED-sequenties zijn opgebouwd en welke controle-structuren gebruikt worden.",
  ],
  metrics: { elapsedSeconds: 11 * 60, wroteTests: true, usedDebugger: false },
  concepts: ["function", "for", "if"],
};
