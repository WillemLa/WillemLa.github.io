window.exerciseData = {
  student: "Ben Thompson",
  context:
    "Laat eerst de LEDs op positie 0, 2, 4, 6 en vervolgens de LEDs op positie 1, 3, 5, 7 branden. Zorg dat dit proces zich blijft herhalen.",

  code: `DCMotor dcMotor1(MOTOR_1_0, MOTOR_1_1);
DCMotor dcMotor2(MOTOR_2_0, MOTOR_2_1);  

void links() {
// <tag:Function>
  dcMotor1.setSpeed(100);
  delay(250);
  stop();
// </tag:Function>
}

void rechts() {
// <tag:Function>
  dcMotor2.setSpeed(100);
  delay(250);
  stop();
// </tag:Function>

}

void vooruit() {
// <tag:Function>
  dcMotor1.setSpeed(100);
  dcMotor2.setSpeed(100);
  delay(250);
  stop();
// </tag:Function>
}

void achteruit() {
// <tag:Function>
  dcMotor1.setSpeed((-100));
  dcMotor2.setSpeed((-100));
  delay(250);
  stop();
// </tag:Function>
}

void knipper() {
  for ( int i = 0 ; i < 3 ; i+=1) {
  LEDS = 0b11111111;
  delay(250);
  LEDS = 0b00000000;
  delay(250);
}


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
      vooruit();
    }
    if (digitalRead(SW_E) == PRESSED) {
      rechts();
    }
    if (digitalRead(SW_S) == PRESSED) {
      achteruit();
    }
    if (digitalRead(SW_W) == PRESSED) {
      links();
    }
    if (digitalRead(SW_C) == PRESSED) {
      knipper();
    }
}`,
  advice: [
    "Vraag Ben hoe hij herhaling kan vermijden in de functies die de motor aansturen.",
  ],
  metrics: { elapsedSeconds: 9 * 60, wroteTests: false, usedDebugger: true },
  concepts: ["for", "while", "if"],
};
