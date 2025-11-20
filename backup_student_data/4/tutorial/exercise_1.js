window.exerciseData = {
  student: "Daniel Wu",
  code: `
DCMotor dcMotor1(MOTOR_1_0, MOTOR_1_1);
DCMotor dcMotor2(MOTOR_2_0, MOTOR_2_1);

void BestuurMotors(int motor1, int motor2) {
  dcMotor1.setSpeed(motor1);
  dcMotor2.setSpeed(motor2);
  delay(250);
  Stop();
}
// <tag:Highlight 2>
void Stop() {
// </tag:Highlight 2>

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
      BestuurMotors(100, 100);

    }
    if (digitalRead(SW_E) == PRESSED) {
      BestuurMotors(0, 100);

    }
    if (digitalRead(SW_S) == PRESSED) {
      BestuurMotors(-100, -100);
    }

    if (digitalRead(SW_W) == PRESSED) {
      BestuurMotors(100, 0);
    }
}
`,
  advice: [
    "Hier komt er advies dat u kunt gebruiken om Daniël te helpen met zijn code.",
  ],
  metrics: {
    elapsedSeconds: 12 * 60,
    wroteTests: true,
    usedDebugger: true,
    sections: [
      { minutes: 6, type: "programming" },
      { minutes: 1, type: "testing" },
      { minutes: 1, type: "debugger" },
      { minutes: 1, type: "testing" },
    ],
    timeAdvice:
      "Gestructureerde blokken. Vraag Daniël hoe hij beslist wanneer te testen of debuggen.",
    tdAdvice:
      "Mooi afwisselend patroon: programmeren, debuggen, testen. Benadruk systematiek.",
  },
};
