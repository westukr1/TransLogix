from .types import Request, Route
from .validation import validate_requests
from .constraints import load_user_constraints, check_constraints
from .conversion import convert_requests_to_points
from .google_maps import fetch_google_route
from .clustering import cluster_requests
from .persistence import save_to_draft



def build_optimized_routes(requests, user_id, strategy="min_distance", save=False, route_date=None, name=None, user=None):
    """
    Побудова одного або кількох оптимізованих маршрутів з валідацією, перевіркою обмежень,
    розрахунком і опціональним збереженням.
    :param requests: список словників (заявки)
    :param user_id: ID користувача
    :param strategy: стратегія оптимізації ('min_distance', ...)
    :param save: чи зберігати у базу
    :param route_date: дата маршруту (обов'язково якщо save=True)
    :param name: назва плану (обов'язково якщо save=True)
    :param user: об'єкт User (обов'язково якщо save=True)
    :return: список маршрутів або помилки
    """
    print("▶️ Старт оптимізації зі стратегією:", strategy)

    is_valid, validation_errors = validate_requests(requests)
    if not is_valid:
        return {"success": False, "errors": validation_errors}

    constraints = load_user_constraints(user_id)
    if not constraints:
        return {"success": False, "errors": ["Не знайдено обмежень користувача"]}

    all_routes = []
    grouped = cluster_requests(requests, constraints)

    for group in grouped:
        passes, violations = check_constraints(group, constraints)
        if not passes:
            return {"success": False, "errors": violations}

        points = convert_requests_to_points(group)
        result = fetch_google_route(points, optimize=True)

        if result.get("status") != "OK":
            return {"success": False, "errors": ["Помилка Google API"]}
        print("❗ Помилка Google API:", result)

        route = result["routes"][0]
        legs = route["legs"]
        total_distance = sum(l["distance"]["value"] for l in legs) / 1000
        total_duration = sum(l["duration"]["value"] for l in legs) / 60
        ordered_ids = [r["id"] for r in group]

        all_routes.append(Route(
            requests=group,
            optimized_order=ordered_ids,
            total_distance_km=total_distance,
            total_duration_min=total_duration,
            start_point=points[0],
            end_point=points[-1],
        ))

    if save and route_date and name and user:
        save_to_draft(user, route_date, name, all_routes)

    def route_to_dict(route: Route):
        return {
            "optimized_order": route.optimized_order,
            "total_distance_km": route.total_distance_km,
            "total_duration_min": route.total_duration_min,
            "start_point": {"lat": route.start_point.lat, "lng": route.start_point.lng},
            "end_point": {"lat": route.end_point.lat, "lng": route.end_point.lng},
            "requests": route.requests  # якщо це словники; інакше теж перетвори
        }

    ...

    return {
        "success": True,
        "routes": [route_to_dict(r) for r in all_routes]
    }

