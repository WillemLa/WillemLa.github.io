window.exerciseData = {
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
  metrics: { elapsedSeconds: 10 * 60, wroteTests: true, usedDebugger: false },
};
