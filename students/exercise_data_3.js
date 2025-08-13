window.exerciseData_3 = {
  1: {
    student: "Carla Diaz",
    code: `#include <Wire.h>

#include <Dwenguino.h>

#include <LiquidCrystal.h>

#include <DwenguinoMotor.h>

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
  },
  2: {
    student: "Carla Diaz",
    code: `#include <Wire.h>

#include <Dwenguino.h>

#include <LiquidCrystal.h>

int ledLamp;

// Deze functie beschrijven...
void knipperLeds() {
  while (ledLamp > 1) {
    ledLamp = ledLamp / 2;
    LEDS = ledLamp;
    schrijfNaarScherm(String("Waarde led: ") + String(ledLamp));
    delay(300);
  }
  while (ledLamp < 128) {
    ledLamp = ledLamp * 2;
    schrijfNaarScherm(String("Waarde led: ") + String(ledLamp));
    LEDS = ledLamp;
    delay(300);
  }
}

// Deze functie beschrijven...
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
      "Vraag Carla om de verschillende naamgevingsconventies in haar code aan te wijzen. Bespreek samen waarom consistentie belangrijk is.",
    ],
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
  },
};
