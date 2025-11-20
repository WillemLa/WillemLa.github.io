window.exerciseData = {
  student: "Ben Thompson",
  code: `

int x;
int y;

void schrijfNaarLCD(int tekst) {
  dwenguinoLCD.clear();
  dwenguinoLCD.setCursor(0,0);
  dwenguinoLCD.print(tekst);
}

DCMotor dcMotor1(MOTOR_1_0, MOTOR_1_1);

DCMotor dcMotor2(MOTOR_2_0, MOTOR_2_1);

void rechtdoor(int x) {
  schrijfNaarScherm(String("vooruit"));
  dcMotor1.setSpeed(180);
  dcMotor2.setSpeed(180);
  delay(x);
}

void rechts(int y) {
  schrijfNaarScherm(String("rechts"));
  dcMotor1.setSpeed(55);
  delay(y);
}

void setup()
{
  initDwenguino();

  x = 150;
  y = 500;
}

void loop()
{
    loopDoor(x);
    naarRechts(y);

}


  `,
  advice: [
    "Maak Ben duidelijk dat een descriptieve naamgeving belangrijk is voor leesbare code.",
  ],
  metrics: {
    elapsedSeconds: 7 * 60,
    wroteTests: true,
    usedDebugger: true,
    sections: [
      { minutes: 3, type: "programming" },
      { minutes: 1, type: "testing" },
      { minutes: 2, type: "debugger" },
      { minutes: 2, type: "programming" },
      { minutes: 1, type: "testing" },
      { minutes: 2, type: "trial" },
      { minutes: 1, type: "testing" },
    ],
    timeAdvice:
      "Korte cycli met duidelijke testmomenten. Vraag Ben naar testselectie.",
    tdAdvice:
      "Benadruk het koppelen van testresultaten aan gerichte debugacties.",
  },
};
