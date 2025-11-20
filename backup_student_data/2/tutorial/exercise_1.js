window.exerciseData = {
  student: "Ben Thompson",
  code: `
void Links() {
  dcMotor1.setSpeed(100);
  delay(250);
  Stop();
}

DCMotor dcMotor2(MOTOR_2_0, MOTOR_2_1);

void Rechts() {
  dcMotor2.setSpeed(100);
  delay(250);
  Stop();
}

// <tag:Highlight 1>
void Vooruit() {
  dcMotor1.setSpeed(100);
  dcMotor2.setSpeed(100);
  delay(250);
  Stop();
}
// </tag:Highlight 1>


void Achteruit() {
  dcMotor1.setSpeed((-100));
  dcMotor2.setSpeed((-100));
  delay(250);
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
// <tag:Highlight 1>

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
  // </tag:Highlight 1>
}`,
  advice: [
    "Hier komt er advies dat u kunt gebruiken om Ben te helpen met zijn code.",
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
