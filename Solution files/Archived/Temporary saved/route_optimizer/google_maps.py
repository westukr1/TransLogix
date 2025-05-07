import requests
from .types import Point
from django.conf import settings

GOOGLE_API_KEY = settings.GOOGLE_MAPS_API_KEY



def point_to_str(point: Point) -> str:
    return f"{point.lat},{point.lng}"


def fetch_google_route(points: list[Point], language="en", optimize=True):
    """
    Викликає Google Directions API для побудови маршруту
    :param points: список Point (min: 2)
    :param language: мова інтерфейсу
    :param optimize: чи застосовувати optimize:true до waypoint-ів
    :return: словник з відповіддю або помилкою
    """
    if len(points) < 2:
        return {"error": "Потрібно щонайменше 2 точки"}

    origin = point_to_str(points[0])
    destination = point_to_str(points[-1])
    waypoints = [point_to_str(p) for p in points[1:-1]]

    if optimize and waypoints:
        waypoints_str = f"optimize:true|{'|'.join(waypoints)}"
    else:
        waypoints_str = '|'.join(waypoints)

    params = {
        "origin": origin,
        "destination": destination,
        "waypoints": waypoints_str,
        "language": language,
        "key": GOOGLE_API_KEY,
    }

    response = requests.get("https://maps.googleapis.com/maps/api/directions/json", params=params)
    return response.json()

def get_route_and_order(points: list[dict], language="en", optimize=True):
    """
    Обгортка над Google Directions API з обчисленням порядку точок.
    """
    if len(points) < 2:
        return None

    origin = f"{points[0]['lat']},{points[0]['lng']}"
    destination = f"{points[-1]['lat']},{points[-1]['lng']}"
    waypoints = [f"{p['lat']},{p['lng']}" for p in points[1:-1]]

    if optimize and waypoints:
        waypoints_str = f"optimize:true|{'|'.join(waypoints)}"
    else:
        waypoints_str = '|'.join(waypoints)

    params = {
        "origin": origin,
        "destination": destination,
        "waypoints": waypoints_str,
        "language": language,
        "key": GOOGLE_API_KEY,
    }

    response = requests.get("https://maps.googleapis.com/maps/api/directions/json", params=params)
    data = response.json()

    if data["status"] != "OK":
        return None

    legs = data["routes"][0]["legs"]
    total_distance = sum(leg["distance"]["value"] for leg in legs) / 1000
    total_duration = sum(leg["duration"]["value"] for leg in legs) / 60

    return {
        "distance_km": total_distance,
        "duration_min": total_duration,
        "waypoint_order": data["routes"][0].get("waypoint_order", [])
    }
