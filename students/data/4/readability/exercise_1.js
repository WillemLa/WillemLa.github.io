window.exerciseData = {
  student: "Daniel Wu",
  code: `
    int draaiTijd;

int looptijd;

void schrijfWeg(int tekst) {
  dwenguinoLCD.clear();
  dwenguinoLCD.setCursor(0,0);
  dwenguinoLCD.print(tekst);
}

DCMotor dcMotor1(MOTOR_1_0, MOTOR_1_1);

DCMotor dcMotor2(MOTOR_2_0, MOTOR_2_1);

void rechtdoor(int looptijd) {
  schrijfWeg(String("vooruit"));
  dcMotor1.setSpeed(180);
  dcMotor2.setSpeed(180);
  delay(looptijd);
}

void draai(int draaiTijd) {
  schrijfWeg(String("rechts"));
  dcMotor1.setSpeed(55);
  delay(draaiTijd);
}

void setup()
{
  initDwenguino();

  looptijd = 150;
  draaiTijd = 500;
}

void loop()
{
    loop(x);
    draai(draaiTijd);

}

    `,
  advice: [
    "Laat Daniel weten dat zijn code goed leesbaar is. Vraag hoe hij test- en debugmomenten inplant.",
  ],
  metrics: {
    elapsedSeconds: 12 * 60,
    wroteTests: true,
    usedDebugger: true,
    sections: [
      { minutes: 3, type: "programming" },
      { minutes: 4, type: "trial" },
      { minutes: 2, type: "debugger" },
      { minutes: 5, type: "trial" },
      { minutes: 1, type: "testing" },
    ],
    timeAdvice:
      "Gestructureerde blokken. Vraag Daniël hoe hij beslist wanneer te testen of debuggen.",
    tdAdvice:
      "Mooi afwisselend patroon: programmeren, debuggen, testen. Benadruk systematiek.",
  },
};
