window.exerciseData_3 = {
  1: {
    student: "Carla Diaz",
    code: `
int TijdNaarRechts;

int x;

// Deze functie beschrijven...
void schrijfNaarScherm(int tekst) {
  dwenguinoLCD.clear();
  dwenguinoLCD.setCursor(0,0);
  dwenguinoLCD.print(tekst);
}

DCMotor dcMotor1(MOTOR_1_0, MOTOR_1_1);

DCMotor dcMotor2(MOTOR_2_0, MOTOR_2_1);

// Deze functie beschrijven...
void LoopDoor(int x) {
  schrijfNaarScherm(String("Recht vooruit!!"));
  dcMotor1.setSpeed(200);
  dcMotor2.setSpeed(200);
  delay(x);
}

// Deze functie beschrijven...
void naarRechts(int TijdNaarRechts) {
  schrijfNaarScherm(String("Rechts!!"));
  dcMotor1.setSpeed(50);
  delay(TijdNaarRechts);
}

void setup()
{
  initDwenguino();

  TijdNaarRechts = 150;
  x = 500;
}


void loop()
{
    LoopDoor(x);
    naarRechts(TijdNaarRechts);

}`,
    advice: [
      "Wijs de verschillende naamconveties aan in de code van Carla. Duid haar bovendien op korte namen zoals 'x' die ze heeft gekozen. Bespreek samen waarom consistentie en beschrijvende namen belangrijk zijn en code leesbaarder maken.",
    ],
    metrics: { elapsedSeconds: 15 * 60, wroteTests: false, usedDebugger: true },
  },
  2: {
    student: "Carla Diaz",
    code: `int x;

void KNIPPERLeds() {
  while (x > 1) {
    x = x / 2;
    LEDS = x;
    schrijfNaarScherm(String("Waarde led: ") + String(x));
    delay(300);
  }
  while (x < 128) {
    x = x * 2;
    schrijfNaarScherm(String("Waarde led: ") + String(x));
    delay(300);
  }
}

void schrijfNaarScherm(int y) {
  dwenguinoLCD.clear();
  dwenguinoLCD.setCursor(0,0);
  dwenguinoLCD.print(y);
}

void setup()
{
  initDwenguino();

  x = 1;
}

void loop()
{
    knipperLeds();
}`,
    advice: [
      "Vraag Carla om de verschillende naamgevingsconventies in haar code te wijzen en descriptievere namen te gebruiken. Bespreek samen waarom consistentie belangrijk is.",
    ],
    metrics: { elapsedSeconds: 4 * 60, wroteTests: false, usedDebugger: false },
  },
  3: {
    student: "Carla Diaz",
    code: `int speed = 90;
int ledPin = 10;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void turnLeft() {
  // Turn left by blinking LED
  digitalWrite(ledPin, HIGH);
  delay(speed);
  digitalWrite(ledPin, LOW);
  delay(speed);
}

void loop() {
  turnLeft();
}`,
    advice: [
      "Gebruik deze code om Carla te laten uitleggen waarom haar naamgeving en structuur goed werken.",
    ],
    metrics: { elapsedSeconds: 9 * 60, wroteTests: true, usedDebugger: false },
  },
  4: {
    student: "Carla Diaz",
    code: `int waitTime = 150;
int ledPin = 9;

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
      "Vraag Carla waarom deze code prettig leesbaar is. Laat haar reflecteren op haar eigen keuzes.",
    ],
    metrics: { elapsedSeconds: 6 * 60, wroteTests: false, usedDebugger: false },
  },
  5: {
    student: "Carla Diaz",
    code: `int angle = 60;
int servoPin = 8;

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
      "Vraag Carla om voorbeelden te geven van hoe goede naamgeving en structuur haar helpen bij het programmeren.",
    ],
    metrics: { elapsedSeconds: 10 * 60, wroteTests: false, usedDebugger: true },
  },
  6: {
    student: "Carla Diaz",
    code: `int duration = 250;
int ledPin = 7;

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
      "Gebruik deze code om met Carla te bespreken hoe korte, duidelijke functies bijdragen aan onderhoudbaarheid.",
    ],
    metrics: { elapsedSeconds: 8 * 60, wroteTests: true, usedDebugger: true },
  },
  7: {
    student: "Carla Diaz",
    code: `int speed = 130;
int ledPin = 6;

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
    advice: ["Vraag Carla waarom haar code goed leesbaar is."],
    metrics: { elapsedSeconds: 5 * 60, wroteTests: false, usedDebugger: false },
  },
};
