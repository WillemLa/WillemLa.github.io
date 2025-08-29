window.exerciseData = {
  student: "Carla Diaz",
  code: `#include <Wire.h>

#include <Dwenguino.h>

#include <LiquidCrystal.h>

int led;

void schrijfNaarLCD(int tekst) {
  dwenguinoLCD.clear();
  dwenguinoLCD.setCursor(0,0);
  dwenguinoLCD.print(tekst);
}

void setup()
{
  initDwenguino();

  led = 1;
}


void loop()
{
    for ( int i = 0 ; i <= 7 ; i+=1) {
      schrijfNaarLCD(String(led));
      LEDS = led;
      delay(300);
      led = led * 2;
    }
    led = 1;

}`,
  advice: [
    "Laat Carla uitleggen welke iteraties en voorwaarden de LED-patronen bepalen.",
  ],
  metrics: { elapsedSeconds: 10 * 60, wroteTests: true, usedDebugger: true },
  concepts: ["for", "while", "function", "if"],
};
