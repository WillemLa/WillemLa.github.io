window.exerciseData = {
  student: "Ben Thompson",
  code: `int duration = 300;
int ledPin = 3;

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
    "Gebruik deze code om met Ben te bespreken hoe korte, duidelijke functies bijdragen aan onderhoudbaarheid.",
  ],
  metrics: { elapsedSeconds: 8 * 60, wroteTests: false, usedDebugger: true },
};
