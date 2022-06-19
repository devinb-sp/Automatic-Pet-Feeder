'''Motor controls'''
import serial
import struct

PORT = '/dev/ttyACM0'
BAUD_RATE = 9600
ENCODING = 'utf-8'

START_ACTION = 1
STOP_ACTION = 0

ser = serial.Serial(PORT, BAUD_RATE)


def start_motor():
    '''Starts the motor'''
    control_motor(START_ACTION)


def stop_motor():
    '''Stops the motor'''
    control_motor(STOP_ACTION)


def control_motor(action):
    ser.reset_input_buffer()
    ser.write(str(action).encode(ENCODING))
    
    
def initialize_arduino_connection():
    ser = serial.Serial(PORT, BAUD_RATE)


def shutdown_arduino_connection():
    ser.close()
