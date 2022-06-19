'''Motor controls'''
import serial


def start_motor():
    '''Starts the motor'''
    ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)
    ser.write(b'1')


def stop_motor():
    '''Stops the motor'''
    ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)
    ser.write(b'0')
