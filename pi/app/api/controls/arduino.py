'''Controls all the basic functions of the Arduino'''
from time import sleep
from datetime import datetime
import threading
import serial
from api.helpers.expo_token_helper import ExpoTokenHelper


PORT = '/dev/ttyUSB0'
BAUD_RATE = 9600
ENCODING = 'utf-8'


class Arduino:
    '''Class representing the Arduino and all its basic functions'''
    last_water_notification_sent_time = None
    last_food_notification_sent_time = None
    can_read_levels = True

    actions = {
        'stop_motor': 0,
        'start_motor': 1,
        'start_pump': 2,
        'stop_pump': 3,
        'dispense_food': 4,
        'read_water_distance': 5,
        'read_food_distance': 6
    }

    def __init__(self, expo_token_helper: ExpoTokenHelper):
        self.arduino = serial.Serial(PORT, BAUD_RATE)
        self.expo_token_helper = expo_token_helper

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
        delay_action = threading.Timer(
            int(amount * 120000)/1000, self.stop_motor)
        delay_action.start()

    def read_water_distance(self):
        '''Reads the distance from the top of the container to the water'''
        self.__perform_action(self.actions['read_water_distance'])
        sleep(0.5)
        value = self.arduino.readline().decode(ENCODING).rstrip()
        print('JOSE: Water type is ', type(value), value)
        if int(value) >= 23:
            if self.last_water_notification_sent_time is None:
                self.last_water_notification_sent_time = datetime.now()
                print('Should send water notification here')
                self.expo_token_helper.send_notification(
                    title='Water Level Low',
                    body='Water level in container is low. Please refill to avoid interruptions')
            else:
                print('Water notification was sent, not doing anything now')
        else:
            self.last_water_notification_sent_time = None
            print('Reset last notification sent to None')
        return value

    def read_food_distance(self):
        '''Reads the distance from the top of the container to the food'''
        self.__perform_action(self.actions['read_food_distance'])
        sleep(0.5)
        value = self.arduino.readline().decode(ENCODING).rstrip()
        print('JOSE: Food type is ', type(value), value)
        if int(value) >= 10:
            if self.last_food_notification_sent_time is None:
                self.last_food_notification_sent_time = datetime.now()
                print('Should send food notification here')
                self.expo_token_helper.send_notification(
                    title='Food Level Low',
                    body='Food level in container is low. Please refill to avoid interruptions')
            else:
                print('Food notification was sent, not doing anything now')
        else:
            self.last_food_notification_sent_time = None
            print('Reset last notification sent to None')
        return value

    def can_read_levels_function(self):
        '''Returns can read level value'''
        return self.can_read_levels

    def read_sensor_distances(self):
        '''Reads both distance sensors'''
        self.can_read_levels = False
        self.read_food_distance()
        self.read_water_distance()
        self.can_read_levels = True
