window.exerciseData = {
  student: "Alice Morgan",
  context: "Laat een wagentje met twee wielen in een vierkant rijden",
  code: `int periodeRechts;

int wachtPeriode;

void schrijfNaarScherm(int tekst) {
  dwenguinoLCD.clear();
  dwenguinoLCD.setCursor(0,0);
  dwenguinoLCD.print(tekst);
}

DCMotor dcMotor1(MOTOR_1_0, MOTOR_1_1);

DCMotor dcMotor2(MOTOR_2_0, MOTOR_2_1);

void loopDoor(int wachtPeriode) {
  schrijfNaarScherm(String("Vooruit!"));
  dcMotor1.setSpeed(180);
  dcMotor2.setSpeed(180);
  delay(wachtPeriode);
}

void naarRechts(int periodeRechts) {
  schrijfNaarScherm(String("Rechts!"));
  dcMotor1.setSpeed(55);
  delay(periodeRechts);
}

void setup()
{
  initDwenguino();

  wachtPeriode = 150;
  periodeRechts = 500;
}

void loop()
{
    loopDoor(x);
    naarRechts(TijdNaarRechts);

}
    `,
  advice: [
    "Geef Alice positieve feedback en moedig haar aan deze aanpak vol te houden.",
  ],
  //This tracks time per exercise
  metrics: {
    elapsedSeconds: 9 * 60,
    wroteTests: true,
    usedDebugger: false,
    finished: true,
    // Explicit time sections (minutes) used for graphs; sums must equal total minutes
    sections: [
      { minutes: 3, type: "programming" },
      { minutes: 1, type: "testing" },
      { minutes: 2, type: "debugger" },
      { minutes: 2, type: "programming" },
      { minutes: 1, type: "testing" },
    ],
    // Advice shown on hover in time/test-debug graphs
    timeAdvice:
      "Alice wisselt bouwen met debuggen/testen af. Vraag naar haar besliscriteria.",
    tdAdvice:
      "Moedig korte cycli aan: stukje programmeren, gericht debuggen, korte test.",
  },
};
