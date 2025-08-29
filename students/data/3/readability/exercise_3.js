window.exerciseData = {
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
  metrics: { elapsedSeconds: 9 * 60, wroteTests: true, usedDebugger: false },
};
