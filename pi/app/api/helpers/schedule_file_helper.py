'''Helper to read schedule data from file'''
import json
import os

FOOD_LABEL = 'food'
WATER_LABEL = 'water'
FILENAME = '../persistent_data/schedule_data.json'
FILE_PATH = os.path.join(os.path.dirname(__file__), FILENAME)


def read_schedule_data():
    '''Reads the data from the json file'''
    try:

        with open(FILE_PATH, 'r+', encoding='utf-8') as file:
            data = json.load(file)

        if not FOOD_LABEL in data or not WATER_LABEL in data:
            return 404

        return data
    except IOError:
        return 404


def modify_schedule_data(data):
    '''Updates the data from the json file'''
    try:
        old_data = read_schedule_data()

        if FOOD_LABEL in data:
            old_data[FOOD_LABEL] = data[FOOD_LABEL]

        if WATER_LABEL in data:
            old_data[WATER_LABEL] = data[WATER_LABEL]

        os.remove(FILE_PATH)

        with open(FILE_PATH, 'w', encoding='utf-8') as file:
            json.dump(old_data, file, indent=4)

        return True
    except IOError:
        return False
