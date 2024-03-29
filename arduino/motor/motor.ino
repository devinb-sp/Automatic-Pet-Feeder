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
#define READ_WATER_DISTANCE_ACTION 5
#define READ_FOOD_DISTANCE_ACTION 6

// Distance sensors
#define WATER_TRIG_PIN 13
#define WATER_ECHO_PIN 12
#define FOOD_TRIG_PIN A4
#define FOOD_ECHO_PIN A5

void controlDcComponent(int pin, int value, int in1Pin, int in1Value, int in2Pin, int in2Value);
void setupDcComponent(int pin, int in1, int in2);
void readForceSensor(int pin, void (*startFunc)(), void (*stopFunc)());
void readDistanceSensor(int echoPin, int trigPin);

int waterSensor = 0;
bool flag = true;

void setup() {
  Serial.begin(9600);
  setUpMotor();
  setUpPump();
  setupWaterDistanceSensor();
  setupFoodDistanceSensor();
}

void loop() {
  waterSensor = analogRead(WATER_FORCE_SENSOR_PIN);
  
  if (flag) {
    readWaterForceSensor();
  } else {
    wait();
  }
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
      case READ_WATER_DISTANCE_ACTION:
        readWaterDistanceSensor();
        break;
      case READ_FOOD_DISTANCE_ACTION:
        readFoodDistanceSensor();
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
  while (Serial.available() <= 0);
  float amount = Serial.parseFloat();
  startMotorAction();
  delay((int)(amount * MILLIS_FOR_CUP));
  stopMotorAction();
}

void controlDcComponent(int pin, int value, int in1Pin, int in1Value, int in2Pin, int in2Value)
{
  analogWrite(pin, value);
  digitalWrite(in1Pin, in1Value);
  digitalWrite(in2Pin, in2Value);
}

void readWaterDistanceSensor()
{
  readDistanceSensor(WATER_ECHO_PIN, WATER_TRIG_PIN);
}

void readFoodDistanceSensor()
{
  readDistanceSensor(FOOD_ECHO_PIN, FOOD_TRIG_PIN);
}

void readDistanceSensor(int echoPin, int trigPin)
{
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long duration = pulseIn(echoPin, HIGH);
  int distance = duration * 0.034 / 2;

  Serial.println(distance);
}

void setupDcComponent(int pin, int in1, int in2)
{
  pinMode(pin, OUTPUT);
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
}

void setupWaterDistanceSensor()
{
  setupDistanceSensor(WATER_ECHO_PIN, WATER_TRIG_PIN);
}

void setupFoodDistanceSensor()
{
  setupDistanceSensor(FOOD_ECHO_PIN, FOOD_TRIG_PIN);
}

void setupDistanceSensor(int echoPin, int trigPin)
{
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void readWaterForceSensor()
{
  readForceSensor(startPumpAction, stopPumpAction);
}

void readFoodForceSensor()
{
}

void readForceSensor(void (*startFunc)(), void (*stopFunc)())
{
  if (waterSensor < 100) {
    stopPumpAction();
  } else if (waterSensor < 710) {
    startPumpAction();
  } else {
    stopPumpAction();
    flag = false;
    return;
  }

  delay(500);
}

void wait() {
    if (waterSensor < 400) {
      flag = true;
      return;
    }
    delay(500);
}
