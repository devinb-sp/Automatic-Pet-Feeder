'''Api for controlling motor'''
from api.controls.motor_controls import start_motor, stop_motor, shutdown_arduino_connection


def start_motor_api():
    '''Starts the motor'''
    start_motor()


def stop_motor_api():
    '''Stops the motor'''
    stop_motor()


def shutdown_arduino_connection_api():
    '''Shuts down the serial connection with arduino'''
    shutdown_arduino_connection()
