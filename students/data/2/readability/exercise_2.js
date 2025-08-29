window.exerciseData = {
  student: "Ben Thompson",
  code: `
int ledLamp;

void knipperLeds() {
  while (ledLamp > 1) {
    ledLamp = ledLamp / 2;
    schrijfNaarScherm(String("Waarde led: ") + String(ledLamp));
    delay(300);
  }
  while (ledLamp < 128) {
    ledLamp = ledLamp * 2;
    schrijfNaarScherm(String("Waarde led: ") + String(ledLamp));
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

  ledLamp = 1;
}


void loop()
{
    knipperLeds();
}`,
  advice: ["Bespreek hoe Ben regressietests kan creëren voor eerdere bugs."],
  metrics: {
    elapsedSeconds: 18 * 60,
    wroteTests: true,
    usedDebugger: false,
    sections: [
      { minutes: 6, type: "programming" },
      { minutes: 6, type: "trial" },
      { minutes: 3, type: "testing" },
      { minutes: 3, type: "programming" },
    ],
    timeAdvice:
      "Veel tijd ging naar uitproberen. Plan kortere, doelgerichte cycli met reflectie.",
    tdAdvice:
      "Beperk trial-and-error: noteer observaties en formuleer een hypothese voor elke stap.",
  },
};
