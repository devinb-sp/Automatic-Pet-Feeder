export class ApiHelper {
  baseUrl = 'http://192.168.1.83:5000/api/';
  // baseUrl = 'http://localhost:5000/api/';
  motorEndpoint = 'motor';
  dispenseFoodEndpoint = 'dispense-food';
  scheduleEndpoint = 'schedule';
  initializeFeedEndpoint = 'initialize-feed';
  stopFeedEndpoint = 'stop-feed';
  getWaterDistanceEndpoint = 'get-water-distance';
  getFoodDistanceEndpoint = 'get-food-distance';

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

  initializeCameraFeed() {
    this.sendPostRequest(this.initializeFeedEndpoint, null);
  }

  stopCameraFeed() {
    this.sendPostRequest(this.stopFeedEndpoint, null);
  }

  getFoodSchedule() {
    return this.sendGetRequest(this.scheduleEndpoint, null);
  }

  async getLevel(endpoint, inMax, inMin, outMax, outMin) {
    try {
      distance = (await this.sendGetRequest(endpoint))['distance'];

      if (distance > inMin) {
        distance = inMin;
      }

      if (distance < inMax) {
        distance = inMax;
      }

      return Math.round(((distance - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin);
    } catch (error) {
      return 0;
    }
  }

  async getWaterLevel() {
    return await this.getLevel(this.getWaterDistanceEndpoint, 4, 23, 100, 0);
  }

  async getFoodLevel() {
    return await this.getLevel(this.getFoodDistanceEndpoint, 5, 10, 100, 0);
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
      if (response.status == 500) return {};
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
