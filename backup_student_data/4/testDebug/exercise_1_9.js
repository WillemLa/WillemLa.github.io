window.exerciseData = {
  student: "Daniel Wu",
  code: `DCMotor dcMotor1(MOTOR_1_0, MOTOR_1_1);
DCMotor dcMotor2(MOTOR_2_0, MOTOR_2_1);

void Links() {
  dcMotor1.setSpeed(90);
  delay(250);
  Stop();
}

void Rechts() {
  dcMotor2.setSpeed(90);
  delay(200);
  Stop();
}

void Vooruit() {
  dcMotor1.setSpeed(90);
  dcMotor2.setSpeed(90);
  delay(185);
  Stop();
}

void Achteruit() {
  dcMotor1.setSpeed((-90));
  dcMotor2.setSpeed((-90));
  delay(200);
  Stop();
}

void Stop() {
  dcMotor1.setSpeed(0);
  dcMotor2.setSpeed(0);
}

void setup()
{
  initDwenguino();
}

void loop()
{
    if (digitalRead(SW_N) == PRESSED) {
      Vooruit();
    }
    if (digitalRead(SW_E) == PRESSED) {
      Rechts();
    }
    if (digitalRead(SW_S) == PRESSED) {
      Achteruit();
    }
    if (digitalRead(SW_W) == PRESSED) {
      Links();
    }
}`,
  advice: [
    "Benadruk het koppelen van testresultaten aan gerichte debugacties.",
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
