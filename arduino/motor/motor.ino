// Motor
#define MOTOR_PIN 9
#define MOTOR_IN_1 8
#define MOTOR_IN_2 7
#define ON_MOTOR_SPEED 255
#define OFF_MOTOR_SPEED 0

// Pump
#define PUMP_PIN 3
#define PUMP_IN_1 4
#define PUMP_IN_2 5
#define ON_PUMP_VALUE 255
#define OFF_PUMP_VALUE 0

// Force sensors
#define WATER_SENSOR_PIN A0
#define FOOD_SENSOR_PIN A1

// Actions
#define START_MOTOR_ACTION 1
#define STOP_MOTOR_ACTION 0
#define START_PUMP_ACTION 2
#define STOP_PUMP_ACTION 3

void controlDcComponent(int pin, int value, int in1Pin, int in1Value, int in2Pin, int in2Value);
void setupDcComponent(int pin, int in1, int in2);
void readSensor(int pin, void (*startFunc)(), void (*stopFunc)());

void setup() {
  Serial.begin(9600);
  setUpMotor();
  setUpPump();
}

void loop() {
  readWaterSensor();
  readFoodSensor();
  
  if (Serial.available() > 0)
  {
    // Current actions are:
    //  0 - Stops motor
    //  1 - Starts motor
    //  2 - Starts pump
    //  3 - Stops pump
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
      case START_PUMP_ACTION:
        startPumpAction();
        break;
      case STOP_PUMP_ACTION:
        stopPumpAction();
        break;
      default:
        break;
    }
  }
}

void setUpMotor()
{
  setupDcComponent(MOTOR_PIN, MOTOR_IN_1, MOTOR_IN_2);
}

void setUpPump()
{
  setupDcComponent(PUMP_PIN, PUMP_IN_1, PUMP_IN_2);
}

void startMotorAction()
{
  controlDcComponent(MOTOR_PIN, ON_MOTOR_SPEED, MOTOR_IN_1, HIGH, MOTOR_IN_2, LOW);
}

void stopMotorAction()
{
  controlDcComponent(MOTOR_PIN, OFF_MOTOR_SPEED, MOTOR_IN_1, LOW, MOTOR_IN_2, LOW);
}

void startPumpAction()
{
  controlDcComponent(PUMP_PIN, ON_PUMP_VALUE, PUMP_IN_1, HIGH, PUMP_IN_2, LOW);
}

void stopPumpAction()
{
  controlDcComponent(PUMP_PIN, OFF_PUMP_VALUE, PUMP_IN_1, LOW, PUMP_IN_2, LOW);
}

void controlDcComponent(int pin, int value, int in1Pin, int in1Value, int in2Pin, int in2Value)
{
  analogWrite(pin, value);
  digitalWrite(in1Pin, in1Value);
  digitalWrite(in2Pin, in2Value);
}

void setupDcComponent(int pin, int in1, int in2)
{
  pinMode(pin, OUTPUT);
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
}

void readWaterSensor()
{
  readSensor(WATER_SENSOR_PIN, startPumpAction, stopPumpAction);
}

void readFoodSensor()
{
}

void readSensor(int pin, void (*startFunc)(), void (*stopFunc)())
{
  int sensorReading = analogRead(pin);

  if (sensorReading < 500)
  {
    stopPumpAction();
  }
  else if (sensorReading < 640) // from 10 to 199
  {
    startPumpAction();
  }

  if (sensorReading >= 740) // from 800 to 1023
  {
    stopPumpAction();
  }
}
