window.exerciseData = {
  student: "Daniel Wu",
  context:
    "Laat eerst de LEDs op positie 0, 2, 4, 6 en vervolgens de LEDs op positie 1, 3, 5, 7 branden. Zorg dat dit proces zich blijft herhalen.",

  code: `DCMotor dcMotor1(MOTOR_1_0, MOTOR_1_1);
DCMotor dcMotor2(MOTOR_2_0, MOTOR_2_1);

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

void Vooruit() {
  dcMotor1.setSpeed(100);
  dcMotor2.setSpeed(100);
  delay(250);
  Stop();
}

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

void Knipper() {
  for ( int i = 0 ; i < 3 ; i+=1) {
  LEDS = 0b11111111;
  delay(250);
  LEDS = 0b00000000;
  delay(250);
}

void setup()
{
  initDwenguino();
}

void loop()
{
    if (digitalRead(SW_C) == PRESSED) {
      Knipper();
    }
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
    "Bespreek met Daniel waar functies en lussen worden toegepast in Afwisseling.",
  ],
  metrics: { elapsedSeconds: 7 * 60, wroteTests: false, usedDebugger: false },
  concepts: ["for", "function"],
};
