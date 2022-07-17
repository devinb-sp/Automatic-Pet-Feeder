'''Update schedule api'''
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from api.helpers.schedule_file_helper import modify_schedule_data, read_schedule_data
from api.constants.constants import FOOD_LABEL, WATER_LABEL
from api.controls.arduino import Arduino


class ScheduleHelper:
    '''Helps with scheduling background tasks and reading and writing to file'''

    def __init__(self, arduino: Arduino, background_scheduler: BackgroundScheduler):
        self.__arduino = arduino
        self.__scheduler = background_scheduler
        self.__scheduler.start()

    def schedule_water_level_check(self):
        '''Schedules the water level check'''
        print('Scheduling the water level check')
        self.__scheduler.add_job(self.__arduino.read_water_distance,
                                 'interval',
                                 seconds=10,
                                 id='water_level',
                                 replace_existing=True)

    def schedule_food_level_check(self):
        '''Schedules the food level check'''
        print('Scheduling the food level check')
        self.__scheduler.add_job(self.__arduino.read_food_distance,
                                 'interval',
                                 seconds=10,
                                 id='food_level',
                                 replace_existing=True)

    def get_schedule_api(self):
        '''Returns current schedule'''
        return read_schedule_data()

    def update_schedule_api(self, data):
        '''Updates pet feeder schedule'''
        result = 200

        if not FOOD_LABEL in data and not WATER_LABEL in data:
            return 'Schedule data cannot be empty', 400

        if FOOD_LABEL in data:
            result = self.__update_food_schedule(data[FOOD_LABEL])

            if result != 200:
                return result

        if WATER_LABEL in data:
            result = self.__update_water_schedule(data[WATER_LABEL])

            if result != 200:
                return result

        print('JOSE:')
        print(data)
        did_update = modify_schedule_data(data)

        if not did_update:
            return 'Error updating schedule', 500

        schedule_data = read_schedule_data()

        self.__set_background_schedule_for_food(schedule_data['food'])

        return schedule_data, 200

    def __set_background_schedule_for_food(self, food_schedule):
        '''Sets background schedule'''
        self.__scheduler.remove_all_jobs()

        now = datetime.now()
        for i, time in enumerate(food_schedule['times']):
            schedule_datetime = datetime.fromisoformat(time)
            schedule_datetime = datetime(now.year, now.month, now.day,
                                         schedule_datetime.hour,
                                         schedule_datetime.minute)
            self.__scheduler.add_job(self.__arduino.dispense_food,
                                     'interval', [food_schedule['amounts'][i]],
                                     hours=24,
                                     next_run_time=schedule_datetime)

        if not self.__scheduler.running:
            self.__scheduler.start()

    def __update_food_schedule(self, food_schedule):
        '''Updates the food scheduling'''
        if not self.__validate_schedule_input(food_schedule):
            return 'Food schedule input is not valid. Please verify that both [times] and [amounts] '\
                'are passed and that the length of both list is the same', 400

        return 200

    def __update_water_schedule(self, water_schedule):
        '''Updates the water scheduling'''
        if not self.__validate_schedule_input(water_schedule):
            return 'Water schedule input is not valid. Please verify that both [times] and [amounts] '\
                'are passed and that the length of both list is the same', 400

        return 200

    def __validate_schedule_input(self, schedule_input):
        """Validates that the input provided for updating the schedules is correct"""
        if 'times' not in schedule_input or 'amounts' not in schedule_input\
                or len(schedule_input['times']) != len(schedule_input['amounts']):

            return False

        return True
