window.exerciseData = {
  student: "Alice Morgan",
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
// <tag:Loop>
    for ( int i = 0 ; i <= 2 ; i+=1) {
      item = item * 4;
      LEDS = item;
      schrijfNaarScherm(String(item));
      delay(300);
    }
      // </tag:Loop>
      // <tag:Function>

    item = 2;
    LEDS = item;
    schrijfNaarScherm(String(item));
    delay(300);
    for ( int i = 0 ; i <= 2 ; i+=1) {
      item = item * 4;
      LEDS = item;
      schrijfNaarScherm(String(item));
      delay(300);
            // </tag:Function>
// <tag:Conditional>

    }
    item = 1;
    LEDS = item;
    schrijfNaarScherm(String(item));
    delay(300);
            // </tag:Conditional>


}`,
  advice: [
    "Laat Alice de gebruikte concepten (lussen, functies) aanwijzen in Afwisseling.",
  ],
  metrics: { elapsedSeconds: 12 * 60, wroteTests: false, usedDebugger: true },
  concepts: ["for", "while", "function"],
};
