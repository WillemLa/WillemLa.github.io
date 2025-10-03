window.exerciseData = {
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
  metrics: { elapsedSeconds: 5 * 60, wroteTests: false, usedDebugger: false },
};
