#define MOTOR_PIN 9
#define MOTOR_IN_1 8
#define MOTOR_IN_2 7
#define ON_MOTOR_SPEED 255
#define OFF_MOTOR_SPEED 0

// Actions
#define START_MOTOR_ACTION 1
#define STOP_MOTOR_ACTION 0

#define 

void setup() {
  Serial.begin(9600);
  setUpMotor();
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
      case STOP_MOTOR_ACTION:
        stopMotorAction();
        break;
      case START_MOTOR_ACTION:
        startMotorAction();
        break;
      default:
        break;
    }
  }
}

void setUpMotor()
{
  pinMode(MOTOR_PIN, OUTPUT);
  digitalWrite(MOTOR_IN_1, LOW);
  digitalWrite(MOTOR_IN_2, LOW);
}

void startMotorAction()
{
  analogWrite(MOTOR_PIN, ON_MOTOR_SPEED);
  digitalWrite(MOTOR_IN_1, HIGH);
  digitalWrite(MOTOR_IN_2, LOW);
}

void stopMotorAction()
{
  analogWrite(MOTOR_PIN, OFF_MOTOR_SPEED);
  digitalWrite(MOTOR_IN_1, LOW);
  digitalWrite(MOTOR_IN_2, LOW);
}
