window.exerciseData_1 = {
  1: {
    student: "Alice Morgan",
    code: `

int periodeRechts;

int wachtPeriode;

void schrijfNaarScherm(int tekst) {
  dwenguinoLCD.clear();
  dwenguinoLCD.setCursor(0,0);
  dwenguinoLCD.print(tekst);
}

DCMotor dcMotor1(MOTOR_1_0, MOTOR_1_1);

DCMotor dcMotor2(MOTOR_2_0, MOTOR_2_1);

// Deze functie beschrijven...
void loopDoor(int wachtPeriode) {
  schrijfNaarScherm(String("Vooruit!"));
  dcMotor1.setSpeed(180);
  dcMotor2.setSpeed(180);
  delay(wachtPeriode);
}

// Deze functie beschrijven...
void naarRechts(int periodeRechts) {
  schrijfNaarScherm(String("Rechts!"));
  dcMotor1.setSpeed(55);
  delay(periodeRechts);
}

void setup()
{
  initDwenguino();

  wachtPeriode = 150;
  periodeRechts = 500;
}

void loop()
{
    loopDoor(x);
    naarRechts(TijdNaarRechts);

}
    `,
    advice: [
      "Geef Alice positieve feedback en moedig haar aan deze aanpak vol te houden.",
    ],
  },
  2: {
    student: "Alice Morgan",
    code: `
int lamp;

void knipperLampjes() {
  while (lamp > 1) {
    lamp = lamp / 2;
    schrijfNaarScherm(String("Ledje ") + String(lamp));
    delay(300);
  }
  while (lamp < 128) {
    lamp = lamp * 2;
    schrijfNaarScherm(String("Ledje ") + String(lamp));
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

  lamp = 1;
}


void loop()
{
    knipperLampjes();
}`,
    advice: [
      "Benadruk bij Alice dat haar consistente naamgeving en eenvoudige logica het lezen van code vergemakkelijken.",
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
