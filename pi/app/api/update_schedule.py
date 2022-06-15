'''Update schedule api'''


def update_schedule_api(data, request):
    '''Updates pet feeder schedule'''
    data = request.get_json()
    result = 200

    if not 'food' in data and not 'water' in data:
        return 'Schedule data cannot be empty', 400

    if 'food' in data:
        result = update_food_schedule(data['food'])

        if result != 200:
            return result

    if 'water' in data:
        result = update_water_schedule(data['water'])

        if result != 200:
            return result

    return 'Schedule updated successfully', result


def update_food_schedule(food_schedule):
    """Updates the food scheduling"""
    if not validate_schedule_input(food_schedule):
        return 'Food schedule input is not valid. Please verify that both [times] and [amounts] '\
        'are passed and that the length of both list is the same', 400

    return 200


def update_water_schedule(water_schedule):
    """Updates the water scheduling"""
    if not validate_schedule_input(water_schedule):
        return 'Water schedule input is not valid. Please verify that both [times] and [amounts] '\
        'are passed and that the length of both list is the same', 400

    return 200


def validate_schedule_input(schedule_input):
    """Validates that the input provided for updating the schedules is correct"""
    if 'times' not in schedule_input or 'amounts' not in schedule_input\
        or len(schedule_input['times']) != len(schedule_input['amounts']):

        return False

    return True
