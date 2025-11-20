window.exerciseData = {
  student: "Daniel Wu",
  context:
    "Laat eerst de LEDs op positie 0, 2, 4, 6 en vervolgens de LEDs op positie 1, 3, 5, 7 branden. Zorg dat dit proces zich blijft herhalen.",

  code: `#include <Wire.h>

#include <Dwenguino.h>

#include <LiquidCrystal.h>

int item;

void schrijfNaarScherm(int tekst) {
  dwenguinoLCD.clear();
  dwenguinoLCD.setCursor(0,0);
  dwenguinoLCD.print(tekst);
}

void setup()
{
  initDwenguino();

  item = 1;
  LEDS = item;
  schrijfNaarScherm(String(item));
  delay(300);
}


void loop()
{
    for ( int i = 0 ; i <= 2 ; i+=1) {
      item = item * 4;
      LEDS = item;
      schrijfNaarScherm(String(item));
      delay(300);
    }
    item = 2;
    LEDS = item;
    schrijfNaarScherm(String(item));
    delay(300);
    for ( int i = 0 ; i <= 2 ; i+=1) {
      item = item * 4;
      LEDS = item;
      schrijfNaarScherm(String(item));
      delay(300);
    }
    item = 1;
    LEDS = item;
    schrijfNaarScherm(String(item));
    delay(300);

}`,
  advice: [
    "Bespreek met Daniel waar functies en lussen worden toegepast in Afwisseling.",
  ],
  metrics: { elapsedSeconds: 7 * 60, wroteTests: false, usedDebugger: false },
  concepts: ["for", "function"],
};
