'''Main communications module for Automatic Pet Feeder'''
from flask import Flask, request, make_response, jsonify, Response
from apscheduler.schedulers.background import BackgroundScheduler
from api.controls.arduino import Arduino
from api.firebase.firebase_helper import FirebaseHelper
from api.schedule import ScheduleHelper
from apscheduler.schedulers.background import BackgroundScheduler
from flask import Flask, request, make_response, jsonify
from api.controls.camera_test import initialize_camera, stop_camera_feed

app = Flask(__name__)

background_scheduler = BackgroundScheduler(demon=True)
firebase_helper = FirebaseHelper()
arduino = Arduino(firebase_helper)
scheduler_helper = ScheduleHelper(arduino, background_scheduler)
scheduler_helper.schedule_water_level_check()
scheduler_helper.schedule_food_level_check()


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


@app.route('/api/start-camera', methods=['POST'])
def start_camera():
    '''Endpoint to start camera stream'''
    # camera_service.start_streaming()

    return make_response('', 200)


@app.route('/api/stop-camera', methods=['POST'])
def stop_camera():
    '''Endpoint to stop camera stream'''
    # camera_service.stop_streaming()

    return make_response('', 200)


def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.route('/api/initialize-feed', methods=['POST'])
def initialize_feed():
    '''Initializes camera feed'''
    initialize_camera()
    return make_response('', 200)


@app.route('/api/stop-feed', methods=['POST'])
def stop_feed():
    '''Stops camera feed'''
    stop_camera_feed()
    return make_response('', 200)


@app.route('/api/get-water-distance', methods=['GET'])
def get_water_distance():
    '''Gets the water distance from top of container'''
    distance = arduino.read_water_distance()

    return make_response(jsonify({'distance': distance}), 200)


@app.route('/api/get-food-distance', methods=['GET'])
def get_food_distance():
    '''Gets the water distance from top of container'''
    distance = arduino.read_food_distance()

    return make_response(jsonify({'distance': distance}), 200)


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
