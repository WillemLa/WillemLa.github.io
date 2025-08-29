window.exerciseData = {
  student: "Alice Morgan",
  code: `int waitTime = 300;
int ledPin = 12;

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
    "Vraag Alice waarom ze voor deze korte, duidelijke functie heeft gekozen. Bespreek samen het belang van onderhoudbare code.",
  ],
  metrics: { elapsedSeconds: 8 * 60, wroteTests: true, usedDebugger: true },
};
