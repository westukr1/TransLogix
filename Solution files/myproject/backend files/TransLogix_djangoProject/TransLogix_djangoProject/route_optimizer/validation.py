def validate_requests(requests):
    """
    Перевірка списку заявок на коректність:
    - чи є координати
    - чи не повторюються пасажири
    - чи не включено заявку до іншого маршруту
    - чи вказані дата/час посадки/висадки

    :param requests: список словників або об'єктів-заявок
    :return: (is_valid: bool, errors: list[str])
    """
    errors = []
    seen_passenger_ids = set()

    for i, r in enumerate(requests):
        if not r.get("pickup_latitude") or not r.get("pickup_longitude"):
            errors.append(f"Заявка #{i+1}: відсутні координати точки посадки")
        if not r.get("dropoff_latitude") or not r.get("dropoff_longitude"):
            errors.append(f"Заявка #{i+1}: відсутні координати точки висадки")

        pid = r.get("passenger_id") or r.get("passenger")
        if pid is None:
            errors.append(f"Заявка #{i+1}: відсутній ID пасажира")
        elif pid in seen_passenger_ids:
            errors.append(f"Заявка #{i+1}: дубль пасажира (ID: {pid})")
        else:
            seen_passenger_ids.add(pid)

        if r.get("used_in_plan") is True:
            errors.append(f"Заявка #{i+1}: вже використана в іншому маршруті")

        if r.get("request_type") == "to_work" and not r.get("arrival_time"):
            errors.append(f"Заявка #{i+1}: відсутній час прибуття на роботу")
        elif r.get("request_type") == "to_home" and not r.get("departure_time"):
            errors.append(f"Заявка #{i+1}: відсутній час виїзду з роботи")

    return len(errors) == 0, errors
