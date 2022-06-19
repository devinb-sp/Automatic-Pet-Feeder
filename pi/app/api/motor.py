'''Api for controlling motor'''
from api.controls.motor_controls import start_motor, stop_motor, initialize_arduino_connection, shutdown_arduino_connection


def start_motor_api():
    '''Starts the motor'''
    start_motor()


def stop_motor_api():
    '''Stops the motor'''
    stop_motor()
    
    
def initialize_arduino_connection_api():
    initialize_arduino_connection()
    

def shutdown_arduino_connection_api():
    shutdown_arduino_connection()
