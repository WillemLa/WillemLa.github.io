window.exerciseData = {
  student: "Alice Morgan",
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
  
void setup()
{
  initDwenguino();
  ZetKlaar();
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
        ZetKlaar();
      } else {
        dwenguinoLCD.setCursor(0,1);
        dwenguinoLCD.print(String("Huidig: ") + String(HuidigGetal));
      }
    }
}`,
  advice: [
    "Bespreek met Alice welke concepten ze voor welke functionaliteit gebruikt heeft.",
  ],
  metrics: { elapsedSeconds: 10 * 60, wroteTests: true, usedDebugger: false },
  concepts: ["function", "if", "while"],
};
