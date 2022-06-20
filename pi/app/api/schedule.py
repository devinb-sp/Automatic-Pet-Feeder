'''Update schedule api'''

from api.helpers.schedule_file_helper import modify_schedule_data, read_schedule_data
from api.constants.constants import FOOD_LABEL, WATER_LABEL


def get_schedule_api():
    '''Returns current schedule'''
    return read_schedule_data()


def update_schedule_api(data):
    '''Updates pet feeder schedule'''
    result = 200

    if not FOOD_LABEL in data and not WATER_LABEL in data:
        return 'Schedule data cannot be empty', 400

    if FOOD_LABEL in data:
        result = update_food_schedule(data[FOOD_LABEL])

        if result != 200:
            return result

    if WATER_LABEL in data:
        result = update_water_schedule(data[WATER_LABEL])

        if result != 200:
            return result

    did_update = modify_schedule_data(data)

    if not did_update:
        return 'Error updating schedule', 500

    return 'Schedule updated successfully', 200


def update_food_schedule(food_schedule):
    """Updates the food scheduling"""
    if not validate_schedule_input(food_schedule):
        return 'Food schedule input is not valid. Please verify that both [times] and [amounts] '\
        'are passed and that the length of both list is the same', 400

    return 200


def update_water_schedule(water_schedule):
    """Updates the water scheduling"""
    if not validate_schedule_input(water_schedule):
        return 'Water schedule input is not valid. Please verify that both [times] and [amounts] '\
        'are passed and that the length of both list is the same', 400

    return 200


def validate_schedule_input(schedule_input):
    """Validates that the input provided for updating the schedules is correct"""
    if 'times' not in schedule_input or 'amounts' not in schedule_input\
        or len(schedule_input['times']) != len(schedule_input['amounts']):

        return False

    return True
