window.exerciseData = {
  student: "Daniel Wu",
  code: `DCMotor dcMotor1(MOTOR_1_0, MOTOR_1_1);
DCMotor dcMotor2(MOTOR_2_0, MOTOR_2_1);

void Links() {
  dcMotor1.setSpeed(100);
  delay(195);
  Stop();
}

void Rechts() {
  dcMotor2.setSpeed(100);
  delay(195);
  Stop();
}

void Vooruit() {
  dcMotor1.setSpeed(100);
  dcMotor2.setSpeed(100);
  delay(195);
  Stop();
}

void Achteruit() {
  dcMotor1.setSpeed((-100));
  dcMotor2.setSpeed((-100));
  delay(195);
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
    "Benadruk het koppelen van testresultaten aan gerichte debugacties.",
  ],
  metrics: {
    elapsedSeconds: 7 * 60,
    wroteTests: true,
    usedDebugger: true,
    sections: [
      { minutes: 3, type: "programming" },
      { minutes: 1, type: "testing" },
      { minutes: 1, type: "debugger" },
      { minutes: 3, type: "programming" },
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
