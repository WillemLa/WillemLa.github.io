window.exerciseData = {
  student: "Daniel Wu",
  code: `int x = 5;
int y = 10;

void setup() {
  pinMode(0, OUTPUT);
}

void f() {
  // Function with 1-letter name and unclear naming
  analogWrite(0, x);
  delay(y);
  analogWrite(0, 0);
}

void loop() {
  f();
  delay(1000);
}`,
  advice: [
    "Vraag Daniel waarom hij voor korte namen als 'x', 'y' en 'f' heeft gekozen. Bespreek samen alternatieven en het belang van betekenisvolle namen.",
  ],
  metrics: { elapsedSeconds: 6 * 60, wroteTests: false, usedDebugger: false },
};
