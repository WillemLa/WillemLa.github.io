window.exerciseData = {
  student: "Carla Diaz",
  code: `
int TijdNaarRechts;

int x;

// Deze functie beschrijven...
void schrijfNaarScherm(int tekst) {
  dwenguinoLCD.clear();
  dwenguinoLCD.setCursor(0,0);
  dwenguinoLCD.print(tekst);
}

DCMotor dcMotor1(MOTOR_1_0, MOTOR_1_1);

DCMotor dcMotor2(MOTOR_2_0, MOTOR_2_1);

// Deze functie beschrijven...
void LoopDoor(int x) {
  schrijfNaarScherm(String("Recht vooruit!!"));
  dcMotor1.setSpeed(200);
  dcMotor2.setSpeed(200);
  delay(x);
}

// Deze functie beschrijven...
void naarRechts(int TijdNaarRechts) {
  schrijfNaarScherm(String("Rechts!!"));
  dcMotor1.setSpeed(50);
  delay(TijdNaarRechts);
}

void setup()
{
  initDwenguino();

  TijdNaarRechts = 150;
  x = 500;
}


void loop()
{
    LoopDoor(x);
    naarRechts(TijdNaarRechts);

}`,
  advice: [
    "Wijs de verschillende naamconveties aan in de code van Carla. Duid haar bovendien op korte namen zoals 'x' die ze heeft gekozen. Bespreek samen waarom consistentie en beschrijvende namen belangrijk zijn en code leesbaarder maken.",
  ],
  metrics: { elapsedSeconds: 15 * 60, wroteTests: false, usedDebugger: true },
};
