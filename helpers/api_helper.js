class ApiHelper {
  baseUrl = 'http://192.168.1.83:5000/api/';
  motorEndpoint = 'motor';
  dispenseFoodEndpoint = 'dispense-food';

  startMotor() {
    controlMotor('start');
  }

  stopMotor() {
    controlMotor('stop');
  }

  controlMotor(action) {
    data = {
      action: action,
    };

    this.sendPostRequest(this.motorEndpoint, data);
  }

  sendPostRequest(endpoint, data) {
    fetch(this.baseUrl + endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
}
