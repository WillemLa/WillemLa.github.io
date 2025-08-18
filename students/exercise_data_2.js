window.exerciseData_2 = {
  1: {
    student: "Ben Thompson",
    code: `
int rechtsPeriode;

int wacht;

void schrijfNaarLCD(int tekst) {
  dwenguinoLCD.clear();
  dwenguinoLCD.setCursor(0,0);
  dwenguinoLCD.print(tekst);
}

DCMotor dcMotor1(MOTOR_1_0, MOTOR_1_1);

DCMotor dcMotor2(MOTOR_2_0, MOTOR_2_1);

void rechtdoor(int wacht) {
  schrijfNaarScherm(String("vooruit"));
  dcMotor1.setSpeed(180);
  dcMotor2.setSpeed(180);
  delay(wacht);
}

void rechts(int rechtsPeriode) {
  schrijfNaarScherm(String("rechts"));
  dcMotor1.setSpeed(55);
  delay(rechtsPeriode);
}

void setup()
{
  initDwenguino();

  wacht = 150;
  rechtsPeriode = 500;
}

void loop()
{
    loopDoor(x);
    naarRechts(rechtsPeriode);

}


  `,
    advice: [
      "Geef Ben complimenten voor zijn duidelijke namen en structuur. Vraag hem waarom dit belangrijk is.",
    ],
  },
  2: {
    student: "Ben Thompson",
    code: `
int ledLamp;

void knipperLeds() {
  while (ledLamp > 1) {
    ledLamp = ledLamp / 2;
    schrijfNaarScherm(String("Waarde led: ") + String(ledLamp));
    delay(300);
  }
  while (ledLamp < 128) {
    ledLamp = ledLamp * 2;
    schrijfNaarScherm(String("Waarde led: ") + String(ledLamp));
    delay(300);
  }
}

void schrijfNaarScherm(int tekst) {
  dwenguinoLCD.clear();
  dwenguinoLCD.setCursor(0,0);
  dwenguinoLCD.print(tekst);
}

void setup()
{
  initDwenguino();

  ledLamp = 1;
}


void loop()
{
    knipperLeds();
}`,
    advice: [
      "Laat Ben weten dat hij consistent werkt en dat zijn code goed leesbaar is.",
    ],
  },
  3: {
    student: "Ben Thompson",
    code: `int angle = 45;
int servoPin = 5;

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
      "Gebruik deze code om Ben te laten zien hoe goede naamgeving en structuur bijdragen aan samenwerking in een team.",
    ],
  },
  4: {
    student: "Ben Thompson",
    code: `int x = 5;
int y = 10;

void setup() {
  pinMode(6, OUTPUT);
}

void f() {
  // Function with 1-letter names
  analogWrite(6, x);
  delay(y);
  analogWrite(6, 0);
}

void loop() {
  f();
  delay(1000);
}`,
    advice: [
      "Vraag Ben waarom hij voor korte namen als 'x', 'y' en 'f' heeft gekozen. Bespreek samen alternatieven en het belang van betekenisvolle namen.",
    ],
  },
  5: {
    student: "Ben Thompson",
    code: `int waitTime = 200;
int ledPin = 4;

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
      "Vraag Ben waarom deze code prettig leesbaar is. Laat hem reflecteren op zijn eigen keuzes.",
    ],
  },
  6: {
    student: "Ben Thompson",
    code: `int duration = 300;
int ledPin = 3;

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
      "Gebruik deze code om met Ben te bespreken hoe korte, duidelijke functies bijdragen aan onderhoudbaarheid.",
    ],
  },
  7: {
    student: "Ben Thompson",
    code: `int speed = 110;
int ledPin = 2;

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
    advice: [
      "Vraag Ben om voorbeelden te geven van hoe goede naamgeving en structuur hem helpen bij het programmeren.",
    ],
  },
};
