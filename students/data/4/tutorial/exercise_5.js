window.exerciseData = {
  student: "Daniel Wu",
  code: `int duration = 220;
int ledPin = 1;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void stop() {
  // Stop and turn off LED
  digitalWrite(ledPin, LOW);
  delay(duration);
}

void loop() {
  stop();
  delay(1000);
}`,
  advice: [
    "Vraag Daniel om voorbeelden te geven van hoe goede naamgeving en structuur hem helpen bij het programmeren.",
  ],
  metrics: { elapsedSeconds: 8 * 60, wroteTests: false, usedDebugger: true },
};
