'''Controls all the basic functions of the Arduino'''
from time import sleep
from datetime import datetime, timedelta
from api.firebase.firebase_helper import FirebaseHelper
import serial
import threading

PORT = '/dev/ttyUSB0'
BAUD_RATE = 9600
ENCODING = 'utf-8'

last_water_notification_sent_time = None
last_food_notification_sent_time = None


class Arduino:
    '''Class representing the Arduino and all its basic functions'''

    actions = {
        'stop_motor': 0,
        'start_motor': 1,
        'start_pump': 2,
        'stop_pump': 3,
        'dispense_food': 4,
        'read_water_distance': 5,
        'read_food_distance': 6
    }

    def __init__(self, firebase_helper: FirebaseHelper):
        self.arduino = serial.Serial(PORT, BAUD_RATE)
        self.firebase_helper = firebase_helper

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

    def read_water_distance(self):
        '''Reads the distance from the top of the container to the water'''
        return self.read_distance_sensor(self.actions['read_water_distance'],
                                         last_water_notification_sent_time,
                                         'Water level low',
                                         'The level of the water in the container is low. '
                                         'Please refill to avoid interruptions')

    def read_food_distance(self):
        '''Reads the distance from the top of the container to the food'''
        return self.read_distance_sensor(self.actions['read_food_distance'],
                                         last_food_notification_sent_time,
                                         'Food level low',
                                         'The level of the food in the container is low. '
                                         'Please refill to avoid interruptions')

    def read_distance_sensor(self, action, last_notification_time,
                             notification_title, notification_body):
        '''Reads the distance from the top of the container to contents'''
        self.__perform_action(action)
        sleep(0.5)
        value = self.arduino.readline().decode(ENCODING).rstrip()
        if int(value) < 10:
            if last_notification_time is None:
                last_notification_time = datetime.now()
                print('Should senf notification here')
                # self.firebase_helper.send_notification_message(
                #    'token', {'title': notification_title, 'body': notification_body})
            else:
                print('Notification was sent, not doing anything now')
        else:
            last_notification_time = None
            print('Reset last notification sent to null')
        return value
