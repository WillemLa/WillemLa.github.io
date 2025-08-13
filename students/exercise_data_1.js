window.exerciseData_1 = {
  1: {
    student: "Alice Morgan",
    code: `int distance = 100;
int speed = 80;

void setup() {
  Serial.begin(9600);
  pinMode(9, OUTPUT);
}

void moveForward() {
  // Move forward for a set distance
  analogWrite(9, speed);
  delay(distance);
  analogWrite(9, 0);
  Serial.println("Moved forward");
}

void loop() {
  moveForward();
  delay(1000);
}`,
    advice: [
      "Gebruik deze code om te bevestigen dat Alice de basisprincipes van duidelijke naamgeving en structuur beheerst. Geef haar positieve feedback en moedig haar aan deze aanpak vol te houden.",
    ],
  },
  2: {
    student: "Alice Morgan",
    code: `int speed = 150;
int ledPin = 13;

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
      "Benadruk bij Alice dat haar consistente naamgeving en eenvoudige logica het lezen van code vergemakkelijken. Vraag haar hoe ze tot deze keuzes komt.",
    ],
  },
  3: {
    student: "Alice Morgan",
    code: `int d = 100;
int s = 80;

void setup() {
  pinMode(9, OUTPUT);
}

void mf() {
  // Move
  analogWrite(9, s);
  delay(d);
  analogWrite(9, 0);
}

void loop() {
  mf();
  delay(1000);
}`,
    advice: [
      "Vraag Alice waarom ze voor korte namen als 'd', 's' en 'mf' heeft gekozen. Bespreek samen hoe meer beschrijvende namen de code begrijpelijker maken.",
    ],
  },
  4: {
    student: "Alice Morgan",
    code: `int time = 200;
int speed = 90;

void setup() {
  pinMode(10, OUTPUT);
}

void moveBackward() {
  // Move backward for a set time
  analogWrite(10, speed);
  delay(time);
  analogWrite(10, 0);
}

void loop() {
  moveBackward();
  delay(1000);
}`,
    advice: [
      "Gebruik deze code om Alice te laten uitleggen waarom haar naamgeving en structuur goed werken. Laat haar reflecteren op haar eigen keuzes.",
    ],
  },
  5: {
    student: "Alice Morgan",
    code: `int angle = 90;
int servoPin = 6;

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
      "Vraag Alice om haar keuzes in naamgeving en structuur toe te lichten. Laat haar voorbeelden geven van hoe dit het werken aan code makkelijker maakt.",
    ],
  },
  6: {
    student: "Alice Morgan",
    code: `int waitTime = 300;
int ledPin = 12;

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
      "Vraag Alice waarom ze voor deze korte, duidelijke functie heeft gekozen. Bespreek samen het belang van onderhoudbare code.",
    ],
  },
  7: {
    student: "Alice Morgan",
    code: `int speed = 100;
int ledPin = 11;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void move() {
  analogWrite(ledPin, speed);
  delay(500);
  analogWrite(ledPin, 0);
}

void loop() {
  move();
  delay(1000);
}`,
    advice: [
      "Vraag Alice waarom er geen commentaar in haar code staat. Bespreek samen wanneer en waarom commentaar belangrijk kan zijn.",
    ],
  },
};
