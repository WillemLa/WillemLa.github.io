window.exerciseData = {
  student: "Carla Diaz",
  code: `#include <Wire.h>

#include <Dwenguino.h>

#include <LiquidCrystal.h>

int item;
void setup()
{
  initDwenguino();

  item = 1;
  LEDS = item;
  dwenguinoLCD.clear();
  dwenguinoLCD.setCursor(0,0);
  dwenguinoLCD.print(String(item));
  delay(300);
}

// <tag:Loop>

void loop()
{
// </tag:Loop>
                // <tag:Function>

    item = item * 4;
    LEDS = item;
    dwenguinoLCD.clear();
    dwenguinoLCD.setCursor(0,0);
    dwenguinoLCD.print(String(item));
    delay(300);
    item = item * 4;
    LEDS = item;
    dwenguinoLCD.clear();
    dwenguinoLCD.setCursor(0,0);
    dwenguinoLCD.print(String(item));
    delay(300);
    item = item * 4;
    LEDS = item;
    dwenguinoLCD.clear();
    dwenguinoLCD.setCursor(0,0);
    dwenguinoLCD.print(String(item));
    delay(300);
    item = 2;
    LEDS = item;
    dwenguinoLCD.clear();
    dwenguinoLCD.setCursor(0,0);
    dwenguinoLCD.print(String(item));
    delay(300);
    item = item * 4;
    LEDS = item;
    dwenguinoLCD.clear();
    dwenguinoLCD.setCursor(0,0);
    dwenguinoLCD.print(String(item));
    delay(300);
    item = item * 4;
    LEDS = item;
    dwenguinoLCD.clear();
    dwenguinoLCD.setCursor(0,0);
    dwenguinoLCD.print(String(item));
    delay(300);
    item = item * 4;
    LEDS = item;
    dwenguinoLCD.clear();
    dwenguinoLCD.setCursor(0,0);
    dwenguinoLCD.print(String(item));
    delay(300);
    item = 1;
    LEDS = item;
    dwenguinoLCD.clear();
    dwenguinoLCD.setCursor(0,0);
    dwenguinoLCD.print(String(item));
    delay(300);
// </tag:Function>

// <tag:Loop>

}
// </tag:Loop>
`,
  advice: ["Vraag Carla wat ze kan doen om herhaling in de code te vermijden."],
  metrics: { elapsedSeconds: 8 * 60, wroteTests: false, usedDebugger: false },
  concepts: ["if"],
};
