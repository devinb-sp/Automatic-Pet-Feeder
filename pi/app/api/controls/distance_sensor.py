import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BCM)

TRIG = 23
ECHO = 24

class DistanceSensor:
	def __init__(self):
		GPIO.cleanup()

		
	def read_distance(self):
		print('Reading distance')
		while(GPIO.input(ECHO) == 0):
			pulse_start = time.time();
	
		while(GPIO.input(ECHO) == 1):
			pulse_end = time.time();
			
		pulse_duration = pulse_end - pulse_start

		distance = pulse_duration * 17150

		distance = round(distance, 2)

		print("Distance", distance, "cm")

		GPIO.cleanup()
		
		return distance
		
