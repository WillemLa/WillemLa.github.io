window.exerciseData = {
  student: "Alice Morgan",
  code: `int d = 100;
int s = 80;

void setup() {
  pinMode(9, OUTPUT);
}

void mf() {
  // Move
  analogWrite(9, s);
  delay(d);
  analogWrite(9, 0);
}

void loop() {
  mf();
  delay(1000);
}`,
  advice: [
    "Vraag Alice waarom ze voor korte namen als 'd', 's' en 'mf' heeft gekozen. Bespreek samen hoe meer beschrijvende namen de code begrijpelijker maken.",
  ],
  metrics: { elapsedSeconds: 6 * 60, wroteTests: false, usedDebugger: false },
};
