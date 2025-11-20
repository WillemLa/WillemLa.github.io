window.exerciseData = {
  student: "Daniel Wu",
  context:
    "Laat om de beurt de leds van rechts naar links knipperen. Zodra de meest linkse LED knippert herbegin je helemaal rechts",
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

// <tag:Loop>
void loop()
{
// </tag:Loop>
    // <tag:Loop>
    if(led = 1)
    {
    // </tag:Loop>
// <tag:Function>
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
    // </tag:Function>
    // <tag:Loop>
    }
// </tag:Loop>
    // <tag:Loop>
}
        // </tag:Loop>`,
  advice: [
    "Bespreek met Daniel het belang van herhaling vermijden en manier om dit te doen. Leg ook uit dat in een 'if-statement', een enkele '=' een toewijzing is en '==' een vergelijking.",
  ],
  metrics: { elapsedSeconds: 9 * 60, wroteTests: false, usedDebugger: true },
  concepts: ["if", "while"],
};
