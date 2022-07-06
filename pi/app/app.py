'''Main communications module for Automatic Pet Feeder'''
from flask import Flask, request, make_response, jsonify
from apscheduler.schedulers.background import BackgroundScheduler
from api.schedule import ScheduleHelper
from api.controls.arduino import Arduino

app = Flask(__name__)

background_scheduler = BackgroundScheduler(demon=True)
arduino = Arduino()
scheduler_helper = ScheduleHelper(arduino, background_scheduler)


@app.route('/api/schedule', methods=['GET'])
def get_schedule():
    '''Returns the current schedule of the pet feeder'''
    data = scheduler_helper.get_schedule_api()

    if isinstance(data, int):
        return make_response('', data)

    return jsonify(data)


@app.route('/api/schedule', methods=['PUT'])
def update_schedule():
    '''Updates the schedule for both food and water cycles'''
    data = request.get_json()

    return scheduler_helper.update_schedule_api(data)


@app.route('/api/dispense-food', methods=['POST'])
def dispense_food():
    '''Dispenses foods on command, disregarding the scheduler.
       THIS DOES NOT INVALIDATE SCHEDULER'''
    data = request.get_json()

    arduino.dispense_food(data['amount'] or 1.0)

    return make_response('', 204)


@app.route('/api/dispense-water', methods=['POST'])
def dispense_water():
    '''Dispenses water on command, disregarding the scheduler.
       THIS DOES NOT INVALIDATE SCHEDULER'''
    return make_response('', 404)


@app.route('/api/motor', methods=['POST'])
def motor():
    '''Controls the motor depending on the data passed'''
    data = request.get_json()

    if not 'action' in data:
        return make_response('', 400)

    if data['action'] == 'stop':
        arduino.stop_motor()

    if data['action'] == 'start':
        arduino.start_motor()

    return make_response('', 204)


@app.route('/api/pump', methods=['POST'])
def pump():
    '''Controls the pump depending on the data passed'''
    data = request.get_json()

    if not 'action' in data:
        return make_response('', 400)

    if data['action'] == 'start':
        arduino.start_pump()

    if data['action'] == 'stop':
        arduino.stop_pump()

    return make_response('', 204)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
