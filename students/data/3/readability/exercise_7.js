window.exerciseData = {
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
  metrics: { elapsedSeconds: 5 * 60, wroteTests: false, usedDebugger: false },
};
