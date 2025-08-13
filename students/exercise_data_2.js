window.exerciseData_2 = {
  1: {
    student: "Ben Thompson",
    code: `int distance = 120;
int speed = 90;

void setup() {
  Serial.begin(9600);
  pinMode(8, OUTPUT);
}

void moveForward() {
  // Move forward for a set distance
  analogWrite(8, speed);
  delay(distance);
  analogWrite(8, 0);
  Serial.println("Moved forward");
}

void loop() {
  moveForward();
  delay(1000);
}`,
    advice: [
      "Geef Ben complimenten voor zijn duidelijke namen en structuur. Vraag hem hoe hij deze aanpak heeft geleerd.",
    ],
  },
  2: {
    student: "Ben Thompson",
    code: `int speed = 80;
int ledPin = 7;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void turnRight() {
  // Turn right by blinking LED
  digitalWrite(ledPin, HIGH);
  delay(speed);
  digitalWrite(ledPin, LOW);
  delay(speed);
}

void loop() {
  turnRight();
}`,
    advice: [
      "Vraag Ben om uit te leggen waarom zijn code goed leesbaar is. Laat hem voorbeelden geven van goede naamgeving.",
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
