window.exerciseData = {
  student: "Carla Diaz",
  code: `#include <Wire.h>

#include <Dwenguino.h>

#include <LiquidCrystal.h>

int item;
<span class="highlight-func">
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
</span>

void loop()
{
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

}`,
  advice: [
    "Vraag Carla om de verschillen te benoemen met Afwisseling-varianten en welke concepten ontbreken of aanwezig zijn.",
  ],
  metrics: { elapsedSeconds: 8 * 60, wroteTests: false, usedDebugger: false },
  concepts: ["if"],
};
