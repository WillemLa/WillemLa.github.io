window.exerciseData = {
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
  metrics: { elapsedSeconds: 9 * 60, wroteTests: false, usedDebugger: true },
};
