export class ApiHelper {
  baseUrl = 'http://192.168.1.83:5000/api/';
  // baseUrl = 'http://localhost:5000/api/';
  motorEndpoint = 'motor';
  dispenseFoodEndpoint = 'dispense-food';
  scheduleEndpoint = 'schedule';

  startMotor() {
    this.controlMotor('start');
  }

  stopMotor() {
    this.controlMotor('stop');
  }

  dispenseFood(amount) {
    this.sendPostRequest(this.dispenseFoodEndpoint, {
      amount: amount,
    });
  }

  getFoodSchedule() {
    return this.sendGetRequest(this.scheduleEndpoint, null);
  }

  // [amounts] must be an array of float
  // [times] must be an array of Datetime in ISO format
  updateFoodSchedule(amounts, times) {
    console.log('amount (in api helper): ' + amounts);
    console.log('time (in api helper): ' + times);
    this.sendPutRequest(this.scheduleEndpoint, {
      food: {
        amounts: amounts,
        times: times,
      },
    });
  }

  // Helper methods //
  controlMotor(action) {
    data = {
      action: action,
    };

    this.sendPostRequest(this.motorEndpoint, data);
  }

  sendPostRequest(endpoint, data) {
    this.buildRequest('POST', endpoint, data);
  }
  sendPutRequest(endpoint, data) {
    this.buildRequest('PUT', endpoint, data);
  }

  async sendGetRequest(endpoint) {
    try {
      const response = await this.buildRequest('GET', endpoint, null);
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  }

  buildRequest(method, endpoint, data) {
    return fetch(this.baseUrl + endpoint, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: data == null ? null : JSON.stringify(data),
    });
  }
}
