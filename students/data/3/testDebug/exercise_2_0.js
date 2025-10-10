window.exerciseData = {
  student: "Carla Diaz",
  code: `int LedGetal;
int HuidigGetal;
int Doel;

void ZetKlaar() {
  dwenguinoLCD.clear();
  Doel = (random(0, 255));
  HuidigGetal = 0;
  LedGetal = 1;
  dwenguinoLCD.setCursor(0,0);
  dwenguinoLCD.print(String("Doel: ") + String(Doel));
  LEDS = LedGetal;
}
  
// <tag:Highlight 1>
void setup()
{
  initDwenguino();
  ZetKlaar();
}
// </tag:Highlight 1>

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
    if (digitalRead(SW_C) == PRESSED) {
      HuidigGetal = HuidigGetal + LedGetal;
      if (Doel == HuidigGetal) {
        dwenguinoLCD.clear();
        dwenguinoLCD.setCursor(0,1);
        dwenguinoLCD.print(String("Proficiat!"));
        delay(150);
        ZetKlaar();
      } else {
        dwenguinoLCD.setCursor(0,1);
        dwenguinoLCD.print(String("Huidig: ") + String(HuidigGetal));
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
      { minutes: 1, type: "programming" },
      { minutes: 4, type: "trial" },
    ],
    timeAdvice:
      "Hou de sessies kort en gefocust; plan mini-tests na elke bouwstap.",
    tdAdvice:
      "Vervang trial-and-error door doelgerichte observaties en kleine experimenten.",
  },
};
