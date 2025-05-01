from .types import Point, Request

def convert_requests_to_points(requests):
    """
    Перетворює список заявок на список точок (pickup або dropoff залежно від напрямку).
    :param requests: список заявок (словники або об'єкти типу Request)
    :return: список Point
    """
    points = []
    for r in requests:
        if isinstance(r, dict):
            if r.get("request_type") == "to_work":
                point = Point(lat=float(r["pickup_latitude"]), lng=float(r["pickup_longitude"]))
            else:
                point = Point(lat=float(r["dropoff_latitude"]), lng=float(r["dropoff_longitude"]))
        else:  # якщо це вже Request-об'єкт
            if r.request_type == "to_work":
                point = r.pickup
            else:
                point = r.dropoff
        points.append(point)
    return points
