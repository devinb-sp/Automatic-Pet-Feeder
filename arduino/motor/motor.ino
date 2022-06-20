#define MOTOR_PIN 3
#define ON_MOTOR_SPEED 100
#define OFF_MOTOR_SPEED 0

void setup() {
  Serial.begin(9600);
  pinMode(MOTOR_PIN, OUTPUT);
}

void loop() {
  if (Serial.available() > 0)
  {
    // Current actions are:
    //  0 - Stops motor
    //  1 - Starts motor
    //
    //
    //  TODO: We need to adjust the start motor to rotate for the
    //        correct amount of seconds to pour the predefined food amount
    int action = Serial.parseInt();

    switch(action)
    {
      case 0:
        analogWrite(MOTOR_PIN, OFF_MOTOR_SPEED);
        break;
      case 1:
        analogWrite(MOTOR_PIN, ON_MOTOR_SPEED);
        break;
      default:
        break;
    }
  }

}
