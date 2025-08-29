window.exerciseData = {
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
  metrics: { elapsedSeconds: 5 * 60, wroteTests: false, usedDebugger: false },
};
