# Automatic-Pet-Feeder

Use the following commands to run the project.

- `cd Automatic-Pet-Feeder`
- `npm install --global yarn` (if yarn is not already installed)
- `yarn`
- `nvm use node` (to use the latest version of node)
- `yarn start`

The web server is the one that controls the different components in the Pet Feeder.

The endpoints are:

- 'dispense-food' => Must be a POST request and pass a body in the form of `{"amount": 0.5}`

- 'motor' => Must be a POST request and pass a body in the form of `{"action": "start"}` or `{"action": "stop"}`

- 'schedule' =>

  - To get the schedule => Must be a GET request
  - To update the schedule => Must be a POST request and pass a body in the form of
    `{ "food": { "amounts": [0.5, 1], "times": ["2022-06-13T23:14:00.000000", "2022-06-13T02:45:00.000000"] } }`

  - Note: The length of `amounts` but be the same as the length of `times`. The date is ignored but MUST be passed. Only the time is used though, as this runs every 24 hours.

- 'pump' => Must be a POST request and pass a body in the form of `{"action": "start"}` or `{"action": "stop"}`
