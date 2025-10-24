window.exerciseData = {
  student: "Alice Morgan",
  code: `
DCMotor dcMotor1(MOTOR_1_0, MOTOR_1_1);
DCMotor dcMotor2(MOTOR_2_0, MOTOR_2_1);

void setup()
{
  initDwenguino();
}

void loop()
{
    if (digitalRead(SW_N) == PRESSED) {
      
    }
    if (digitalRead(SW_E) == PRESSED) {
    
    }
}
`,
  advice: [
    "Mooi afwisselend patroon: programmeren, debuggen, testen. Benadruk systematiek.",
  ],
  metrics: {
    elapsedSeconds: 12 * 60,
    wroteTests: true,
    usedDebugger: true,
    sections: [
      { minutes: 7, type: "programming" },
      { minutes: 1, type: "testing" },
      { minutes: 1, type: "debugger" },
      { minutes: 1, type: "testing" },
    ],
    timeAdvice:
      "Gestructureerde blokken. Vraag Daniël hoe hij beslist wanneer te testen of debuggen.",
    tdAdvice:
      "Mooi afwisselend patroon: programmeren, debuggen, testen. Benadruk systematiek.",
  },
};
