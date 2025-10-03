window.exerciseData = {
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
  metrics: { elapsedSeconds: 9 * 60, wroteTests: false, usedDebugger: true },
};
