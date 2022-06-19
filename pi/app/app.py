'''Main communications module for Automatic Pet Feeder'''
from flask import Flask, request, make_response, jsonify
from api.motor import start_motor_api, stop_motor_api
from api.schedule import update_schedule_api, get_schedule_api

app = Flask(__name__)


@app.route('/api/schedule', methods=['GET'])
def get_schedule():
    '''Returns the current schedule of the pet feeder'''
    data = get_schedule_api()

    if isinstance(data, int):
        return make_response('', data)

    return jsonify(data)


@app.route('/api/schedule', methods=['PUT'])
def update_schedule():
    '''Updates the schedule for both food and water cycles'''
    data = request.get_json()

    return update_schedule_api(data)


@app.route('/api/dispense-food', methods=['POST'])
def dispense_food():
    '''Dispenses foods on command, disregarding the scheduler.
       THIS DOES NOT INVALIDATE SCHEDULER'''
    return make_response('', 404)


@app.route('/api/dispense-water', methods=['POST'])
def dispense_water():
    '''Dispenses water on command, disregarding the scheduler.
       THIS DOES NOT INVALIDATE SCHEDULER'''
    return make_response('', 404)


@app.route('/api/motor', methods=['POST'])
def motor():
    '''Controls the motor depending on the data past'''
    data = request.get_json()

    if not 'action' in data:
        return make_response('', 400)

    if data['action'] == 'stop_motor':
        stop_motor_api()

    if data['action'] == 'start_motor':
        start_motor_api()

    return make_response('', 204)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
