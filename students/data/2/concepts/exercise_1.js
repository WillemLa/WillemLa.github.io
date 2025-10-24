window.exerciseData = {
  student: "Ben Thompson",
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

void geefWeer() {
  LEDS = item;
  schrijfNaarScherm(String(item));
  delay(300);
}

void setup()
{
  initDwenguino();

  item = 1;
  geefWeer();
}


void loop()
{
    for ( int i = 0 ; i <= 2 ; i+=1) {
      item = item * 4;
      geefWeer();
    }
    item = 2;
    geefWeer();
    for ( int i = 0 ; i <= 2 ; i+=1) {
      item = item * 4;
      geefWeer();
    }
    item = 1;
    geefWeer();

}`,
  advice: [
    "Vraag Ben welke variaties en lus-constructies hij ziet in Afwisseling.",
  ],
  metrics: { elapsedSeconds: 9 * 60, wroteTests: false, usedDebugger: true },
  concepts: ["for", "while", "if"],
};
