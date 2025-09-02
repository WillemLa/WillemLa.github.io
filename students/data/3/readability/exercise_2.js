window.exerciseData = {
  student: "Carla Diaz",
  code: `int x;

void KNIPPERLeds() {
  while (x > 1) {
    x = x / 2;
    LEDS = x;
    schrijfNaarScherm(String("Waarde led: ") + String(x));
    delay(300);
  }
  while (x < 128) {
    x = x * 2;
    schrijfNaarScherm(String("Waarde led: ") + String(x));
    delay(300);
  }
}

void schrijfNaarScherm(int y) {
  dwenguinoLCD.clear();
  dwenguinoLCD.setCursor(0,0);
  dwenguinoLCD.print(y);
}

void setup()
{
  initDwenguino();

  x = 1;
}

void loop()
{
    knipperLeds();
}`,
  advice: [
    "Vraag Carla om de verschillende naamgevingsconventies in haar code te wijzen en descriptievere namen te gebruiken. Bespreek samen waarom consistentie belangrijk is.",
  ],
  metrics: {
    elapsedSeconds: 4 * 60,
    wroteTests: false,
    usedDebugger: false,
    sections: [
      { minutes: 1, type: "programming" },
      { minutes: 4, type: "trial" },
    ],
    timeAdvice:
      "Hou de sessies kort en gefocust; plan mini-tests na elke bouwstap.",
    tdAdvice:
      "Vervang trial-and-error door doelgerichte observaties en kleine experimenten.",
  },
};
