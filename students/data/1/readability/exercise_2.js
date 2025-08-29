window.exerciseData = {
  student: "Alice Morgan",
  code: `
int lamp;

void knipperLampjes() {
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
    knipperLampjes();
}`,
  advice: [
    "Benadruk bij Alice dat haar consistente naamgeving en eenvoudige logica het lezen van code vergemakkelijken.",
  ],
  metrics: { elapsedSeconds: 12 * 60, wroteTests: false, usedDebugger: true },
};
