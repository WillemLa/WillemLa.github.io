window.exerciseData = {
  student: "Carla Diaz",
  code: `
DCMotor dcMotor1(MOTOR_1_0, MOTOR_1_1);
DCMotor dcMotor2(MOTOR_2_0, MOTOR_2_1);

// <tag:Highlight 3>
void bestuurMotors(int motor1, int motor2) {
  dcMotor1.setSpeed(motor1);
  dcMotor2.setSpeed(motor2);
  delay(250);
  stop();
}
//</tag:Highlight 3>


void stop() {
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
      bestuurMotors(100, 100);

    }
    if (digitalRead(SW_E) == PRESSED) {
      bestuurMotors(0, 100);

    }
    if (digitalRead(SW_S) == PRESSED) {
      bestuurMotors(-100, -100);
    }

    if (digitalRead(SW_W) == PRESSED) {
      bestuurMotors(100, 0);
    }
}`,
  advice: [
    "Hier komt er advies dat u kunt gebruiken om Carla te helpen met haar code.",
  ],
  metrics: {
    elapsedSeconds: 15 * 60,
    wroteTests: false,
    usedDebugger: true,
    sections: [
      { minutes: 2, type: "programming" },
      { minutes: 5, type: "trial" },
    ],
    timeAdvice:
      "Lang traject. Help Carla haar werk in kleinere deelstappen te plannen.",
    tdAdvice:
      "Beperk trial-and-error: formuleer hypothesen, zet breakpoints, test tussendoor.",
  },
};
