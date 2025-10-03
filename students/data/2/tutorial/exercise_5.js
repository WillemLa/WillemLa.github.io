window.exerciseData = {
  student: "Ben Thompson",
  code: `int waitTime = 200;
int ledPin = 4;

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
    "Vraag Ben waarom deze code prettig leesbaar is. Laat hem reflecteren op zijn eigen keuzes.",
  ],
  metrics: { elapsedSeconds: 11 * 60, wroteTests: true, usedDebugger: false },
};
