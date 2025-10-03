window.exerciseData = {
  student: "Alice Morgan",
  code: `
int lamp;

void KNipperLampjes() {
  while (lamp > 1) {
    lamp = lamp / 2;
    schrijfNaarScherm(String("Ledje ") + String(lamp));
    delay(300);
  }
  while (lamp < 128) {
    lamp = lamp * 2;
    schrijfNaarScherm(String("Ledje ") + String(lamp));
    delay(300);
  }
}

void schrijfNaarScherm(int tekst) {
  dwenguinoLCD.clear();
  dwenguinoLCD.setCursor(0,0);
  dwenguinoLCD.print(tekst);
}

void setup()
{
  initDwenguino();

  lamp = 1;
}


void loop()
{
    KNipperLampjes();
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
