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
    if (digitalRead(SW_W) == PRESSED) {
      if (LedGetal <= 64) {
        LedGetal = LedGetal * 2;
      }
    }
    if (digitalRead(SW_E) == PRESSED) {
      if (LedGetal >= 2) {
        LedGetal = LedGetal / 2;
      }
    }
    if (digitalRead(SW_C) == PRESSED) {
      HuidigGetal = HuidigGetal + LedGetal;
      if (Doel == HuidigGetal) {
        dwenguinoLCD.clear();
        dwenguinoLCD.setCursor(0,1);
        dwenguinoLCD.print(String("Proficiat!"));
        for ( int i = 0 ; i < 3 ; i+=1) {
          LEDS = 0b11111111;
          delay(250);
          LEDS = 0b00000000;
          delay(250);
        }
      } else {
        dwenguinoLCD.setCursor(0,1);
        dwenguinoLCD.print(String("Huidig: ") + String(HuidigGetal));
      }
    }
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
