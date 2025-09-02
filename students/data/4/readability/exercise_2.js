window.exerciseData = {
  student: "Daniel Wu",
  code: `
int led;

void knipper() {
  while (led > 1) {
    led = led / 2;
    schrijf(String(led));
    delay(300);
  }
  while (led < 128) {
    led = led * 2;
    schrijf(String(led));
    delay(300);
  }
}

// Deze functie beschrijven...
void schrijf(int x) {
  dwenguinoLCD.clear();
  dwenguinoLCD.setCursor(0,0);
  dwenguinoLCD.print(x);
}

void setup()
{
  initDwenguino();
  led = 1;
}


void loop()
{
    knipper();
}`,
  advice: [
    "Leg Daniel uit hoe hij na tests gericht kan debuggen om sneller vooruit te gaan.",
  ],
  metrics: {
    elapsedSeconds: 16 * 60,
    wroteTests: true,
    usedDebugger: false,
    sections: [
      { minutes: 7, type: "programming" },
      { minutes: 6, type: "trial" },
    ],
    timeAdvice:
      "Balans tussen bouwen en testen. Stimuleer het groeperen van kleine testmomenten.",
    tdAdvice:
      "Introduceer kort debuggen bij falende tests om trial-and-error te beperken.",
  },
};
