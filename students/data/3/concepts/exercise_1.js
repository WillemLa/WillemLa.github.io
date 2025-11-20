window.exerciseData = {
  student: "Carla Diaz",
  context:
    "Laat eerst de LEDs op positie 0, 2, 4, 6 en vervolgens de LEDs op positie 1, 3, 5, 7 branden. Zorg dat dit proces zich blijft herhalen.",

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
      dcMotor1.setSpeed(-50);
      dcMotor2.setSpeed(-50);
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

    if (digitalRead(SW_C) == PRESSED) {
      LEDS = 0b11111111;
      delay(250);
      LEDS = 0b00000000;
      delay(250);
      LEDS = 0b11111111;
      delay(250);
      LEDS = 0b00000000;
      delay(250);
      LEDS = 0b11111111;
      delay(250);
      LEDS = 0b00000000;
      delay(250);
    }
}`,
  advice: ["Vraag Carla wat ze kan doen om herhaling in de code te vermijden."],
  metrics: { elapsedSeconds: 8 * 60, wroteTests: false, usedDebugger: false },
  concepts: ["if"],
};
