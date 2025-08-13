window.exerciseData_4 = {
  1: {
    student: "Daniel Wu",
    code: `int distance = 140;
int speed = 85;

void setup() {
  Serial.begin(9600);
  pinMode(3, OUTPUT);
}

void moveForward() {
  // Move forward for a set distance
  analogWrite(3, speed);
  delay(distance);
  analogWrite(3, 0);
  Serial.println("Moved forward");
}

void loop() {
  moveForward();
  delay(1000);
}`,
    advice: [
      "Vraag Daniel waarom zijn code goed leesbaar is. Laat hem benoemen wat hij belangrijk vindt aan duidelijke namen en structuur.",
    ],
  },
  2: {
    student: "Daniel Wu",
    code: `int speed = 70;
int ledPin = 5;

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
      "Vraag Daniel om uit te leggen waarom zijn code goed leesbaar is.",
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
