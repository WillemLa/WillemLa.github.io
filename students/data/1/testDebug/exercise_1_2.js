window.exerciseData = {
  student: "Alice Morgan",
  code: `DCMotor dcMotor1(MOTOR_1_0, MOTOR_1_1);
DCMotor dcMotor2(MOTOR_2_0, MOTOR_2_1);
  
void vooruit() {
  dcMotor1.setSpeed(80);
  dcMotor2.setSpeed(80);
  delay(100);
}

void achteruit() {
  dcMotor1.setSpeed((-80));
  dcMotor2.setSpeed((-80));
  delay(100);
}

void loop()
{
}

void links() {
  dcMotor1.setSpeed(80);
  delay(100);
}

void rechts() {
  dcMotor2.setSpeed(80);
  delay(100);
}


void setup()
{
  initDwenguino();
  rechts();
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
