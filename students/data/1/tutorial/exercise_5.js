window.exerciseData = {
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
  metrics: { elapsedSeconds: 7 * 60, wroteTests: false, usedDebugger: true },
};
