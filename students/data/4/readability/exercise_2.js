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
    "Leg Ben uit waarom meer descriptieve, betekenisvolle namen code leesbaarder en duidelijker maken in vergelijking met namen zoals 'x'.",
  ],
  metrics: { elapsedSeconds: 10 * 60, wroteTests: true, usedDebugger: false },
};
