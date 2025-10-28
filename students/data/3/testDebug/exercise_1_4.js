window.exerciseData = {
  student: "Carla Diaz",
  code: `DCMotor dcMotor1(MOTOR_1_0, MOTOR_1_1);
DCMotor dcMotor2(MOTOR_2_0, MOTOR_2_1);

void setup()
{
  initDwenguino();
}

void loop()
{
    if (digitalRead(SW_N) == PRESSED) {
      dcMotor1.setSpeed(50);
      dcMotor2.setSpeed(50);
      delay(250);
      dcMotor1.setSpeed(0);
      dcMotor2.setSpeed(0);
    }
    if (digitalRead(SW_E) == PRESSED) {
      dcMotor1.setSpeed(0);
      dcMotor2.setSpeed(50);
      delay(250);
      dcMotor1.setSpeed(0);
      dcMotor2.setSpeed(0);
    }
    if (digitalRead(SW_S) == PRESSED) {
      dcMotor1.setSpeed(10);
      dcMotor2.setSpeed(50);
      delay(250);
      dcMotor1.setSpeed(0);
      dcMotor2.setSpeed(0);
    }

    if (digitalRead(SW_W) == PRESSED) {
      dcMotor1.setSpeed(50);
      dcMotor2.setSpeed(0);
      delay(250);
      dcMotor1.setSpeed(0);
      dcMotor2.setSpeed(0);
    }
}`,
  advice: [
    "Beperk trial-and-error: formuleer hypothesen, zet breakpoints, test tussendoor.",
  ],
  metrics: {
    elapsedSeconds: 15 * 60,
    wroteTests: false,
    usedDebugger: true,
    sections: [
      { minutes: 4, type: "programming" },
      { minutes: 3, type: "trial" },
    ],
    timeAdvice:
      "Lang traject. Help Carla haar werk in kleinere deelstappen te plannen.",
    tdAdvice:
      "Beperk trial-and-error: formuleer hypothesen, zet breakpoints, test tussendoor.",
  },
};
