window.exerciseData = {
  student: "Carla Diaz",
  code: `
DCMotor dcMotor1(MOTOR_1_0, MOTOR_1_1);
DCMotor dcMotor2(MOTOR_2_0, MOTOR_2_1);


void setup()
{
  initDwenguino();
}

void loop()
{
  dcMotor1.setSpeed(10);
  dcMotor2.setSpeed(10);
  delay(50);
}`,
  advice: [
    "Beperk trial-and-error: formuleer hypothesen, zet breakpoints, test tussendoor.",
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
