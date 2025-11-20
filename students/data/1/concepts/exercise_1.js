window.exerciseData = {
  student: "Alice Morgan",
  context:
    "Laat eerst de LEDs op positie 0, 2, 4, 6 en vervolgens de LEDs op positie 1, 3, 5, 7 branden. Zorg dat dit proces zich blijft herhalen.",
  code: `DCMotor dcMotor1(MOTOR_1_0, MOTOR_1_1);
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

    if (digitalRead(SW_C) == PRESSED) {
      for ( int i = 0 ; i < 3 ; i+=1) {
        LEDS = 0b11111111;
        delay(250);
        LEDS = 0b00000000;
        delay(250);
      }
    }
}
`,
  advice: [
    "Laat Alice de gebruikte concepten (lussen, functies) aanwijzen in Afwisseling.",
  ],
  metrics: { elapsedSeconds: 12 * 60, wroteTests: false, usedDebugger: true },
  concepts: ["for", "while", "function"],
};
