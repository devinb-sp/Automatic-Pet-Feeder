import json
import os

filename = '/persistent_data/schedule_data.json'

with open(filename, 'r') as file:
    data = json.load(file)
    print(data)

os.remove(filename)
with open(filename, 'w') as file:
    json.dump(data, file, indent=4)
