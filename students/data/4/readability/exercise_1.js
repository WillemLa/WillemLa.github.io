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
  advice: ["Laat Daniel weten dat zijn code goed leesbaar is."],
  metrics: { elapsedSeconds: 3 * 60, wroteTests: false, usedDebugger: false },
};
