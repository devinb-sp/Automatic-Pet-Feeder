'''Helper to read expo push token'''
import json
import os
from flask import jsonify
import requests


class ExpoTokenHelper:
    '''Helper to read and update the expo token'''

    TOKEN_LABEL = 'token'
    FILENAME = '../persistent_data/expo_token.json'
    FILE_PATH = os.path.join(os.path.dirname(__file__), FILENAME)

    def read_token(self):
        '''Reads the data from the json file'''
        try:
            with open(self.FILE_PATH, 'r+', encoding='utf-8') as file:
                data = json.load(file)

            if not self.TOKEN_LABEL in data:
                return None

            return data[self.TOKEN_LABEL]
        except IOError:
            return None

    def update_token(self, token):
        '''Updates the data from the json file'''
        try:
            if token is None:
                return False

            os.remove(self.FILE_PATH)

            with open(self.FILE_PATH, 'w', encoding='utf-8') as file:
                json.dump({self.TOKEN_LABEL: token}, file, indent=4)

            return True
        except IOError:
            return False

    def send_notification(self, title, body):
        '''Sends a notification to the currently saved token'''
        token = self.read_token()

        if token is None:
            return

        data = {
            'to': token,
            'sound': 'default',
            'title': title,
            'body': body
        }

        response = requests.post('https://exp.host/--/api/v2/push/send',
                                 data=jsonify(data),
                                 headers=jsonify({
                                     'host': 'exp.host',
                                     'Accept': 'application/json',
                                     'Accept-encoding': 'gzip, deflate',
                                     'Content-Type': 'application/json',
                                 }))

        print('JOSE: Response from expo request ',
              response.status_code, response.text)
