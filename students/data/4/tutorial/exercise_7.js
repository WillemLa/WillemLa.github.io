window.exerciseData = {
  student: "Daniel Wu",
  code: `int speed = 160;
int ledPin = 13;

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
  advice: ["Vraag Daniel waarom zijn code goed leesbaar is."],
  metrics: { elapsedSeconds: 5 * 60, wroteTests: false, usedDebugger: false },
};
