def cluster_requests(requests, constraints):
    """
    Простий кластеризатор: ділить заявки на маршрути по N пасажирів.
    :param requests: список заявок (словарі або об'єкти)
    :param constraints: словник з обмеженнями
    :return: список груп заявок
    """
    max_group_size = constraints.get("max_passengers", 8)
    clusters = []
    current = []

    for r in requests:
        current.append(r)
        if len(current) >= max_group_size:
            clusters.append(current)
            current = []

    if current:
        clusters.append(current)

    return clusters
