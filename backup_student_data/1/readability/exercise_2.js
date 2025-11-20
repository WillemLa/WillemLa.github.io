window.exerciseData = {
  student: "Alice Morgan",
  context:
    "Laat om de beurt de leds van de ene naar de andere kant knipperen (bv. links naar rechts). Wissel van richting zodra je aan een uiteinde zit.",
  code: `int led;

void knipperLeds() {
  while (led > 1) {
    led = led / 2;
    schrijfNaarLCD(String("Waarde led: ") + String(led));
    delay(300);
  }
  while (led < 128) {
    led = led * 2;
    schrijfNaarLCD(String("Waarde led: ") + String(led));
    delay(300);
  }
}

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
    knipperLeds();

}`,
  advice: [
    "Benadruk bij Alice dat haar consistente naamgeving het lezen van code vergemakkelijken.",
  ],
  metrics: {
    elapsedSeconds: 14 * 60,
    wroteTests: false,
    usedDebugger: true,
    finished: false,
    sections: [
      { minutes: 3, type: "programming" },
      { minutes: 1, type: "testing" },
      { minutes: 2, type: "debugger" },
      { minutes: 2, type: "programming" },
      { minutes: 1, type: "testing" },
      { minutes: 3, type: "debugger" },
      { minutes: 2, type: "programming" },
      { minutes: 1, type: "testing" },
    ],
    timeAdvice:
      "Flinke debugsessies tussen programmeerblokken. Focus op hypothesen vooraf.",
    tdAdvice:
      "Stuur op systematische debugstappen en laat korte program/test-cycli zien.",
  },
};
