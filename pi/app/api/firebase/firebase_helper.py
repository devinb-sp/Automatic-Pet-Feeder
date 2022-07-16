import firebase_admin
from firebase_admin import credentials, messaging


class FirebaseHelper:
	def __init__(self):
		cred = credentials.Certificate('/home/pi/Downloads/automatic-pet-feeder-b4fec-firebase-adminsdk-o6apg-a008b0517f.json')
		firebase_admin.initialize_app(cred)
	
	
	def send_notification_message(self, tokens, notification_data=None):
		if type(tokens) is list:
			message = messaging.MulticastMessage(
				notification=notification_data,
				tokens=tokens, )
			response = messaging.send_multicast(message)
			print('{0} messages were sent successfully'.format(response.success_count), flush=True)
		else:
			message = messaging.Message(
				notification=messaging.Notification(title=notification_data['title'], body=notification_data['body'] ),
				token=tokens,
			)
			print(message)
			response = messaging.send(message)
			print('Successfully sent message:', response)
