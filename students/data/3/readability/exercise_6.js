window.exerciseData = {
  student: "Carla Diaz",
  code: `int duration = 250;
int ledPin = 7;

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
    "Gebruik deze code om met Carla te bespreken hoe korte, duidelijke functies bijdragen aan onderhoudbaarheid.",
  ],
  metrics: { elapsedSeconds: 8 * 60, wroteTests: true, usedDebugger: true },
};
