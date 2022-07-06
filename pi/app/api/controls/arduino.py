'''Controls all the basic functions of the Arduino'''
from time import sleep
from datetime import datetime, timedelta
import serial

PORT = '/dev/ttyACM0'
BAUD_RATE = 9600
ENCODING = 'utf-8'


class Arduino:
    '''Class representing the Arduino and all its basic functions'''

    actions = {
        'stop_motor': 0,
        'start_motor': 1,
        'start_pump': 2,
        'stop_pump': 3,
        'dispense_food': 4
    }

    def __init__(self):
        self.arduino = serial.Serial(PORT, BAUD_RATE)

    def __perform_action(self, action: int, args: list = None):
        '''Base control by passing an action'''
        self.arduino.reset_input_buffer()
        self.arduino.write(str(action).encode(ENCODING))

        if args is not None:
            sleep(0.5)
            for arg in args:
                data = str(arg) + '\n'
                self.arduino.write(data)

    def start_motor(self):
        '''Starts motor'''
        self.__perform_action(self.actions['start_motor'])

    def stop_motor(self):
        '''Stops motor'''
        self.__perform_action(self.actions['stop_motor'])

    def start_pump(self):
        '''Starts pump'''
        self.__perform_action(self.actions['start_pump'])

    def stop_pump(self):
        '''Stops motor'''
        self.__perform_action(self.actions['stop_pump'])

    def dispense_food(self, amount):
        '''Dispenses food, [amount] describes the amount of food in half a cup '''
        self.start_motor()
        sleep(int(amount * 120000)/1000)
        self.stop_motor()
        
