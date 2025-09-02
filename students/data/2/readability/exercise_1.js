window.exerciseData = {
  student: "Ben Thompson",
  code: `
int rechtsPeriode;

int wacht;

void schrijfNaarLCD(int tekst) {
  dwenguinoLCD.clear();
  dwenguinoLCD.setCursor(0,0);
  dwenguinoLCD.print(tekst);
}

DCMotor dcMotor1(MOTOR_1_0, MOTOR_1_1);

DCMotor dcMotor2(MOTOR_2_0, MOTOR_2_1);

void rechtdoor(int wacht) {
  schrijfNaarScherm(String("vooruit"));
  dcMotor1.setSpeed(180);
  dcMotor2.setSpeed(180);
  delay(wacht);
}

void rechts(int rechtsPeriode) {
  schrijfNaarScherm(String("rechts"));
  dcMotor1.setSpeed(55);
  delay(rechtsPeriode);
}

void setup()
{
  initDwenguino();

  wacht = 150;
  rechtsPeriode = 500;
}

void loop()
{
    loopDoor(x);
    naarRechts(rechtsPeriode);

}


  `,
  advice: [
    "Geef Ben complimenten voor zijn duidelijke namen en structuur. Vraag hem waarom dit belangrijk is.",
  ],
  metrics: {
    elapsedSeconds: 7 * 60,
    wroteTests: true,
    usedDebugger: true,
    sections: [
      { minutes: 3, type: "programming" },
      { minutes: 2, type: "trial" },
      { minutes: 2, type: "debugger" },
      { minutes: 2, type: "programming" },
      { minutes: 1, type: "testing" },
    ],
    timeAdvice:
      "Korte cycli met duidelijke testmomenten. Vraag Ben naar testselectie.",
    tdAdvice:
      "Benadruk het koppelen van testresultaten aan gerichte debugacties.",
  },
};
