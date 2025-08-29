window.exerciseData = {
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
};
