'''Motor controls'''
import serial

PORT = '/dev/ttyACM0'
BAUD_RATE = 9600
ENCODING = 'utf-8'

START_ACTION = 1
STOP_ACTION = 0

arduino = serial.Serial(PORT, BAUD_RATE)


def start_motor():
    '''Starts the motor'''
    control_motor(START_ACTION)


def stop_motor():
    '''Stops the motor'''
    control_motor(STOP_ACTION)


def control_motor(action):
    '''Base to control the motor by passing an action'''
    arduino.reset_input_buffer()
    arduino.write(str(action).encode(ENCODING))


def shutdown_arduino_connection():
    '''Shutsdown serial connection'''
    arduino.close()
