window.exerciseData = {
  student: "Ben Thompson",
  code: `
DCMotor dcMotor1(MOTOR_1_0, MOTOR_1_1);
DCMotor dcMotor2(MOTOR_2_0, MOTOR_2_1);

void BestuurMotors(int motor1, int motor2) {
  dcMotor1.setSpeed(motor1);
  dcMotor2.setSpeed(motor2);
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
    if (digitalRead(SW_N) == PRESSED) {
      BestuurMotors(75, 75);

    }
    if (digitalRead(SW_E) == PRESSED) {
      BestuurMotors(0, 80);

    }
    if (digitalRead(SW_S) == PRESSED) {
      BestuurMotors(-75, -75);
    }

    if (digitalRead(SW_W) == PRESSED) {
      BestuurMotors(80, 0);
    }
}
`,
  advice: [
    "Mooi afwisselend patroon: programmeren, debuggen, testen. Benadruk systematiek.",
  ],
  metrics: {
    elapsedSeconds: 12 * 60,
    wroteTests: true,
    usedDebugger: true,
    sections: [
      { minutes: 7, type: "programming" },
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
