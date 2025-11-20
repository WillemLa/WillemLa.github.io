window.exerciseData = {
  student: "Daniel Wu",
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
  dwenguinoLCD.print(String("Doel: ") + String(Doel));
  LEDS = LedGetal;
}

void loop()
{
    if (digitalRead(SW_W) == PRESSED) {
      if (LedGetal <= 128) {
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
// <tag:Loop>
        LEDS = 0b11111111;
        delay(250);
        LEDS = 0b00000000;
        delay(250);
        LEDS = 0b11111111;
        delay(250);
        LEDS = 0b00000000;
        delay(250);
        LEDS = 0b11111111;
        delay(250);
        LEDS = 0b00000000;
        delay(250);
// </tag:Loop>
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
    "Bespreek met Daniel het belang van herhaling vermijden en de manier om dit te doen. ",
  ],
  metrics: { elapsedSeconds: 9 * 60, wroteTests: false, usedDebugger: true },
  concepts: ["if", "while"],
};
