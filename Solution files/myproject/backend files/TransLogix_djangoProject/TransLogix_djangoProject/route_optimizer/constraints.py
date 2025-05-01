from ..models import UserSettings


def load_user_constraints(user_id):
    """
    Завантаження обмежень з таблиці UserSettings по user_id.
    :param user_id: ідентифікатор користувача
    :return: словник обмежень або None
    """
    try:
        settings = UserSettings.objects.get(user_id=user_id)
        return {
            "date_interval": settings.date_interval,
            "arrival_time_tolerance": settings.arrival_time_tolerance,
            "allow_mixed_directions": settings.allow_mixed_directions,
            "max_route_duration": settings.max_route_duration,
            "max_route_distance": settings.max_route_distance,
            "max_stops": settings.max_stops,
            "max_passengers": settings.max_passengers,
            "min_passengers": settings.min_passengers,
            "allow_multiple_work_addresses": settings.allow_multiple_work_addresses,
        }
    except UserSettings.DoesNotExist:
        return None


def check_constraints(requests, constraints):
    """
    Перевірка, чи відповідає набір заявок усім заданим обмеженням.
    Поки що проста перевірка для 1 маршруту.
    :param requests: список заявок
    :param constraints: словник обмежень
    :return: (bool, list[str])
    """
    errors = []
    if len(requests) < constraints.get("min_passengers", 0):
        errors.append("Надто мало пасажирів")
    if len(requests) > constraints.get("max_passengers", 1000):
        errors.append("Перевищено максимальну кількість пасажирів")

    directions = set(r.get("request_type") for r in requests)
    if not constraints.get("allow_mixed_directions", False) and len(directions) > 1:
        errors.append("Змішані напрямки не дозволені")

    return len(errors) == 0, errors
