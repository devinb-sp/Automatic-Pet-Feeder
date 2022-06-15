'''Main communications module for Automatic Pet Feeder'''
from flask import Flask, request
from api.update_schedule import update_schedule_api

app = Flask(__name__)


@app.route('/api/update-schedule', methods=['PUT'])
def update_schedule():
    '''Updates the schedule for both food and water cycles'''
    data = request.get_json()

    return update_schedule_api(data, request)


@app.route('/api/dispense-food', methods=['POST'])
def dispense_food():
    '''Dispenses foods on command, disregarding the scheduler.
       THIS DOES NOT INVALIDATE SCHEDULER'''
    return 200


@app.route('/api/dispense-water', methods=['POST'])
def dispense_water():
    '''Dispenses water on command, disregarding the scheduler.
       THIS DOES NOT INVALIDATE SCHEDULER'''
    return 200


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
