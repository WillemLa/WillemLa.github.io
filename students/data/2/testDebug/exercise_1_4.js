window.exerciseData = {
  student: "Ben Thompson",
  code: `
DCMotor dcMotor1(MOTOR_1_0, MOTOR_1_1);
DCMotor dcMotor2(MOTOR_2_0, MOTOR_2_1);

void setup()
{
  initDwenguino();
}

void loop()
{
    if (digitalRead(SW_N) == PRESSED) {
        dcMotor1.setSpeed(100);
        dcMotor2.setSpeed(100);
        delay(250);
        dcMotor1.setSpeed(0);
        dcMotor2.setSpeed(0);
    }
    if (digitalRead(SW_E) == PRESSED) {
        dcMotor1.setSpeed(0);
        dcMotor2.setSpeed(100);
        delay(250);
        dcMotor1.setSpeed(0);
        dcMotor2.setSpeed(0);
    }
    if (digitalRead(SW_S) == PRESSED) {
        dcMotor1.setSpeed(-100);
        dcMotor2.setSpeed(-100);
        delay(250);
        dcMotor1.setSpeed(0);
        dcMotor2.setSpeed(0);
    }

    if (digitalRead(SW_W) == PRESSED) {
        dcMotor1.setSpeed(100);
        dcMotor2.setSpeed(0);
        delay(250);
        dcMotor1.setSpeed(0);
        dcMotor2.setSpeed(0);
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
