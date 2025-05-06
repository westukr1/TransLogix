from .types import Point, Request
import logging

logger = logging.getLogger("route_optimizer")

def convert_requests_to_points(requests):
    """
    Перетворює список заявок на список точок (pickup і dropoff для кожної заявки).
    :param requests: список заявок (словники або об'єкти типу Request)
    :return: список Point
    """
    logger.debug("Вхідні заявки на конвертацію у точки: %s", requests)
    points = []
    for r in requests:
        if isinstance(r, dict):
            points.append(Point(lat=float(r["pickup_latitude"]), lng=float(r["pickup_longitude"]), id=r["id"], point_type="pickup"))
            points.append(Point(lat=float(r["dropoff_latitude"]), lng=float(r["dropoff_longitude"]), id=r["id"], point_type="dropoff"))
        else:
            points.append(Point(lat=r.pickup.lat, lng=r.pickup.lng, id=r.id, point_type="pickup"))
            points.append(Point(lat=r.dropoff.lat, lng=r.dropoff.lng, id=r.id, point_type="dropoff"))
    logger.debug("Перетворені точки: %s", points)
    return points

def determine_start_end_addresses(requests: list[dict]) -> tuple[str, str]:
    """
    Визначає початкову і кінцеву адреси маршруту на основі типу поїздки.
    """
    if not requests:
        return "", ""

    first = requests[0]
    last = requests[-1]
    direction = first.get("direction") or first.get("request_type")

    def format_address(r, prefix):
        return f"{r.get(prefix + '_street', '')}, {r.get(prefix + '_house', '')}, {r.get(prefix + '_city', '')}"

    if direction == "TO_WORK" or direction == "to_work":
        start = format_address(first, "pickup")
        end = format_address(last, "dropoff")
    else:
        start = format_address(first, "pickup")
        end = format_address(last, "dropoff")

    return start, end

def get_route_bounds(points, direction):
    """
    Визначає work_point, furthest_point і сортувальні точки
    :param points: список Point
    :param direction: напрямок
    :return: work_point, sortable_points, furthest_point
    """
    # Визначаємо всі точки роботи (pickup або dropoff, залежно від напрямку)
    if direction.upper() == "TO_WORK":
        work_candidates = [p for p in points if p.point_type == "dropoff"]
    else:
        work_candidates = [p for p in points if p.point_type == "pickup"]

    logger.debug("Кандидати на точку роботи: %s", work_candidates)

    # Якщо всі координати майже однакові
    def are_close(a, b):
        return abs(a.lat - b.lat) < 0.0001 and abs(a.lng - b.lng) < 0.0001

    common_work = None
    for p in work_candidates:
        if sum(are_close(p, other) for other in work_candidates) > len(work_candidates) / 2:
            common_work = p
            break

    if not common_work:
        common_work = work_candidates[0]  # fallback

    work_point = Point(lat=common_work.lat, lng=common_work.lng, id=-1, point_type="work")

    # Визначаємо найдальшу точку
    def distance_squared(p):
        return (p.lat - work_point.lat) ** 2 + (p.lng - work_point.lng) ** 2

    furthest_point = max([p for p in points if p != work_point], key=distance_squared)

    logger.debug("Обрана точка роботи: %s", work_point)
    logger.debug("Обрана найвіддаленіша точка: %s", furthest_point)

    # всі точки крім точки роботи і найдальшої — сортувальні
    sortable_points = [p for p in points if p != work_point and p != furthest_point]
    logger.debug("Сортувальні точки: %s", sortable_points)

    if direction.upper() == "TO_WORK":
        return sortable_points, furthest_point, work_point
    else:
        return sortable_points, work_point, furthest_point

