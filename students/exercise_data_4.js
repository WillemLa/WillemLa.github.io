window.exerciseData_4 = {
  1: {
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
  },
  2: {
    student: "Daniel Wu",
    code: `
int led;

void knipper() {
  while (led > 1) {
    led = led / 2;
    schrijf(String(led));
    delay(300);
  }
  while (led < 128) {
    led = led * 2;
    schrijf(String(led));
    delay(300);
  }
}

// Deze functie beschrijven...
void schrijf(int x) {
  dwenguinoLCD.clear();
  dwenguinoLCD.setCursor(0,0);
  dwenguinoLCD.print(x);
}

void setup()
{
  initDwenguino();
  led = 1;
}


void loop()
{
    knipper();
}`,
    advice: [
      "Leg Ben uit waarom meer descriptieve, betekenisvolle namen code leesbaarder en duidelijker maken in vergelijking met namen zoals 'x'.",
    ],
  },
  3: {
    student: "Daniel Wu",
    code: `int angle = 30;
int servoPin = 4;

void setup() {
  pinMode(servoPin, OUTPUT);
}

void rotate() {
  // Rotate servo to angle
  analogWrite(servoPin, angle);
  delay(500);
  analogWrite(servoPin, 0);
}

void loop() {
  rotate();
  delay(1000);
}`,
    advice: [
      "Gebruik deze code om Daniel te laten uitleggen waarom zijn naamgeving en structuur goed werken.",
    ],
  },
  4: {
    student: "Daniel Wu",
    code: `int waitTime = 180;
int ledPin = 2;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void pause() {
  // Pause and blink LED
  digitalWrite(ledPin, HIGH);
  delay(waitTime);
  digitalWrite(ledPin, LOW);
}

void loop() {
  pause();
  delay(1000);
}`,
    advice: [
      "Vraag Daniel waarom deze code prettig leesbaar is. Laat hem reflecteren op zijn eigen keuzes.",
    ],
  },
  5: {
    student: "Daniel Wu",
    code: `int duration = 220;
int ledPin = 1;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void stop() {
  // Stop and turn off LED
  digitalWrite(ledPin, LOW);
  delay(duration);
}

void loop() {
  stop();
  delay(1000);
}`,
    advice: [
      "Vraag Daniel om voorbeelden te geven van hoe goede naamgeving en structuur hem helpen bij het programmeren.",
    ],
  },
  6: {
    student: "Daniel Wu",
    code: `int x = 5;
int y = 10;

void setup() {
  pinMode(0, OUTPUT);
}

void f() {
  // Function with 1-letter name and unclear naming
  analogWrite(0, x);
  delay(y);
  analogWrite(0, 0);
}

void loop() {
  f();
  delay(1000);
}`,
    advice: [
      "Vraag Daniel waarom hij voor korte namen als 'x', 'y' en 'f' heeft gekozen. Bespreek samen alternatieven en het belang van betekenisvolle namen.",
    ],
  },
  7: {
    student: "Daniel Wu",
    code: `int speed = 160;
int ledPin = 13;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void move() {
  // Move and blink LED
  digitalWrite(ledPin, HIGH);
  delay(speed);
  digitalWrite(ledPin, LOW);
}

void loop() {
  move();
  delay(1000);
}`,
    advice: ["Vraag Daniel waarom zijn code goed leesbaar is."],
  },
};
