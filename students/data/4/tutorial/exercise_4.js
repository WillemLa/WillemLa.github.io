window.exerciseData = {
  student: "Daniel Wu",
  code: `int waitTime = 180;
int ledPin = 2;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void pause() {
  // Pause and blink LED
  digitalWrite(ledPin, HIGH);
  delay(waitTime);
  digitalWrite(ledPin, LOW);
}

void loop() {
  pause();
  delay(1000);
}`,
  advice: [
    "Vraag Daniel waarom deze code prettig leesbaar is. Laat hem reflecteren op zijn eigen keuzes.",
  ],
  metrics: { elapsedSeconds: 7 * 60, wroteTests: true, usedDebugger: false },
};
