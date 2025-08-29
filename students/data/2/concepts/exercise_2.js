window.exerciseData = {
  student: "Ben Thompson",
  code: `#include <Wire.h>

#include <Dwenguino.h>

#include <LiquidCrystal.h>

void schrijfNaarLCD(int tekst) {
  dwenguinoLCD.clear();
  dwenguinoLCD.setCursor(0,0);
  dwenguinoLCD.print(tekst);
}

int led;

void init() {
  led = 1;
  schrijfNaarLCD(String(led));
  LEDS = led;
  delay(300);
}

void maalTwee() {
  led = led * 2;
  schrijfNaarLCD(String(led));
  LEDS = led;
  delay(300);
}

void setup()
{
  initDwenguino();

  init();
}


void loop()
{
    for ( int j = 0 ; j <= 6 ; j+=1) {
      maalTwee();
    }
    init();

}`,
  advice: [
    "Bespreek met Ben hoe de LED-sequenties zijn opgebouwd en welke controle-structuren gebruikt worden.",
  ],
  metrics: { elapsedSeconds: 11 * 60, wroteTests: true, usedDebugger: false },
  concepts: ["function", "for", "if"],
};
