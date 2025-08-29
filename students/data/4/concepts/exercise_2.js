window.exerciseData = {
  student: "Daniel Wu",
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
    schrijfNaarLCD(String(led));
    LEDS = led;
    delay(300);
    led = led * 2;
    schrijfNaarLCD(String(led));
    LEDS = led;
    delay(300);
    led = led * 2;
    schrijfNaarLCD(String(led));
    LEDS = led;
    delay(300);
    led = led * 2;
    schrijfNaarLCD(String(led));
    LEDS = led;
    delay(300);
    led = led * 2;
    schrijfNaarLCD(String(led));
    LEDS = led;
    delay(300);
    led = led * 2;
    schrijfNaarLCD(String(led));
    LEDS = led;
    delay(300);
    led = led * 2;
    schrijfNaarLCD(String(led));
    LEDS = led;
    delay(300);
    led = led * 2;
    schrijfNaarLCD(String(led));
    LEDS = led;
    delay(300);
    led = 1;

}`,
  advice: [
    "Laat Daniel verbeterpunten benoemen in de MultipleLed-variant en aan welke concepten dat raakt.",
  ],
  metrics: { elapsedSeconds: 9 * 60, wroteTests: false, usedDebugger: true },
  concepts: ["if", "while"],
};
