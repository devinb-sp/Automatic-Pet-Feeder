// Motor
#define MOTOR_PIN 9
#define MOTOR_IN_1 8
#define MOTOR_IN_2 7
#define ON_MOTOR_SPEED 255
#define OFF_MOTOR_SPEED 0
#define MILLIS_FOR_CUP 120000

// Pump
#define PUMP_PIN 5
#define PUMP_IN_1 4
#define PUMP_IN_2 3
#define ON_PUMP_VALUE 255
#define OFF_PUMP_VALUE 0

// Force sensors
#define WATER_FORCE_SENSOR_PIN A0
#define FOOD_FORCE_SENSOR_PIN A1

// Actions
#define START_MOTOR_ACTION 1
#define STOP_MOTOR_ACTION 0
#define START_PUMP_ACTION 2
#define STOP_PUMP_ACTION 3
#define DISPENSE_FOOD_ACTION 4

void controlDcComponent(int pin, int value, int in1Pin, int in1Value, int in2Pin, int in2Value);
void setupDcComponent(int pin, int in1, int in2);
void readForceSensor(int pin, void (*startFunc)(), void (*stopFunc)());

void setup() {
  Serial.begin(9600);
  setUpMotor();
  setUpPump();
}

void loop() {
  readWaterForceSensor();
  readFoodForceSensor();
  
  if (Serial.available() > 0)
  {
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
      case DISPENSE_FOOD_ACTION:
        dispenseFoodAction();
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

void dispenseFoodAction()
{
  Serial.println("In dispense food. Waiting for amount");
  while (Serial.available() <= 0);
  
  float amount = Serial.parseFloat();
  
  Serial.println("Received amount");
  Serial.println(amount);

  startMotorAction();
  delay(amount * (float) MILLIS_FOR_CUP);
  stopMotorAction();
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

void readWaterForceSensor()
{
  readForceSensor(WATER_FORCE_SENSOR_PIN, startPumpAction, stopPumpAction);
}

void readFoodForceSensor()
{
}

void readForceSensor(int pin, void (*startFunc)(), void (*stopFunc)())
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
