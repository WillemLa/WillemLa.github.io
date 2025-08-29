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
  advice: [
    "Laat Ben weten dat hij consistent werkt en dat zijn code goed leesbaar is.",
  ],
  metrics: { elapsedSeconds: 0, wroteTests: false, usedDebugger: false },
};
