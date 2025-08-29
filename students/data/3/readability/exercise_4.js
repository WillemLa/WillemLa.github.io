window.exerciseData = {
  student: "Carla Diaz",
  code: `int waitTime = 150;
int ledPin = 9;

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
    "Vraag Carla waarom deze code prettig leesbaar is. Laat haar reflecteren op haar eigen keuzes.",
  ],
  metrics: { elapsedSeconds: 6 * 60, wroteTests: false, usedDebugger: false },
};
