'''Helper to read expo push token'''
import json
import os
import requests


class ExpoTokenHelper:
    '''Helper to read and update the expo token'''

    TOKEN_LABEL = 'token'
    FILENAME = '../persistent_data/expo_token.json'
    filepath = os.path.join(os.path.dirname(__file__), FILENAME)

    def __init__(self, filepath):
        self.filepath = filepath if filepath is not None else self.filepath

    def read_token(self):
        '''Reads the data from the json file'''
        try:
            with open(self.filepath, 'r+', encoding='utf-8') as file:
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

            os.remove(self.filepath)

            with open(self.filepath, 'w', encoding='utf-8') as file:
                json.dump({self.TOKEN_LABEL: token}, file, indent=4)

            return True
        except IOError:
            return False

    def send_notification(self, title, body):
        '''Sends a notification to the currently saved token'''
        token = self.read_token()

        print('JOSE: The token read from file is ', token)

        if token is None:
            return

        data = {
            'to': token,
            'sound': 'default',
            'title': title,
            'body': body
        }

        response = requests.post('https://exp.host/--/api/v2/push/send',
                                 data=json.dumps(data),
                                 headers={
                                     'Host': 'exp.host',
                                     'Accept': 'application/json',
                                     'Accept-encoding': 'gzip, deflate',
                                     'Content-Type': 'application/json',
                                 })

        print(response.request.headers)

        print('JOSE: Response from expo request ',
              response.status_code, response.text)
