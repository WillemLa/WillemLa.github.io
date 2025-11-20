window.exerciseData = {
  student: "Ben Thompson",
  code: `DCMotor dcMotor1(MOTOR_1_0, MOTOR_1_1);
DCMotor dcMotor2(MOTOR_2_0, MOTOR_2_1);

void vooruit() {
  dcMotor1.setSpeed(100);
  dcMotor2.setSpeed(100);
  delay(250);
  stop();
}

void achteruit() {
  dcMotor1.setSpeed((-100));
  dcMotor2.setSpeed((-100));
  delay(250);
  stop();
}

void links() {
  dcMotor1.setSpeed(100);
  delay(250);
    stop();
}

void rechts() {
  dcMotor2.setSpeed(100);
  delay(250);
    stop();
}

void stop() {
  dcMotor1.setSpeed(0);
  dcMotor2.setSpeed(0);
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
}

  void setup()
  {
    initDwenguino();
  }`,

  advice: [
    "Moedig korte cycli aan: stukje programmeren, gericht debuggen, korte test.",
  ],
  //This tracks time per exercise
  metrics: {
    elapsedSeconds: 9 * 60,
    wroteTests: true,
    usedDebugger: false,
    finished: true,
    // Explicit time sections (minutes) used for graphs; sums must equal total minutes
    sections: [
      { minutes: 3, type: "programming" },
      { minutes: 1, type: "testing" },
      { minutes: 2, type: "debugger" },
      { minutes: 2, type: "programming" },
      { minutes: 1, type: "testing" },
    ],
    // Advice shown on hover in time/test-debug graphs
    timeAdvice:
      "Alice wisselt bouwen met debuggen/testen af. Vraag naar haar besliscriteria.",
    tdAdvice:
      "Moedig korte cycli aan: stukje programmeren, gericht debuggen, korte test.",
  },
};
