window.exerciseData = {
  student: "Ben Thompson",
  code: `int x = 5;
int y = 10;

void setup() {
  pinMode(6, OUTPUT);
}

void f() {
  // Function with 1-letter names
  analogWrite(6, x);
  delay(y);
  analogWrite(6, 0);
}

void loop() {
  f();
  delay(1000);
}`,
  advice: [
    "Vraag Ben waarom hij voor korte namen als 'x', 'y' en 'f' heeft gekozen. Bespreek samen alternatieven en het belang van betekenisvolle namen.",
  ],
  metrics: { elapsedSeconds: 6 * 60, wroteTests: false, usedDebugger: false },
};
