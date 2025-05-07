from .types import Request, Route
from .validation import validate_requests
from .constraints import load_user_constraints, check_constraints
from .conversion import convert_requests_to_points, determine_start_end_addresses, get_route_bounds
from .google_maps import fetch_google_route
from .google_maps import get_route_and_order
from .clustering import cluster_requests
from .persistence import save_to_draft
import logging

logger = logging.getLogger("route_optimizer")

def build_optimized_routes(requests, user_id, strategy="min_distance", save=False, route_date=None, name=None, user=None):
    print("▶️ Старт оптимізації. Стратегія:", strategy)
    logger.info("Старт оптимізації. Стратегія: %s", strategy)
    logger.debug("Отримані сирі заявки: %s", requests)
    logger.debug("Кількість заявок: %d", len(requests))

    is_valid, validation_errors = validate_requests(requests)
    if not is_valid:
        logger.warning("Валідація не пройдена: %s", validation_errors)
        return {"success": False, "errors": validation_errors}

    constraints = load_user_constraints(user_id)
    if not constraints:
        logger.error("Обмеження користувача не знайдено (user_id=%s)", user_id)
        return {"success": False, "errors": ["Не знайдено обмежень користувача"]}

    logger.debug("Обмеження: %s", constraints)

    all_routes = []
    grouped = cluster_requests(requests, constraints)
    logger.debug("Заявки поділено на %d груп(и)", len(grouped))

    start_address = ""
    end_address = ""

    for i, group in enumerate(grouped):
        logger.debug("Перевірка обмежень для групи #%d (%d заявок)", i + 1, len(group))
        passes, violations = check_constraints(group, constraints)
        if not passes:
            logger.warning("Порушення обмежень у групі #%d: %s", i + 1, violations)
            return {"success": False, "errors": violations}

        points = convert_requests_to_points(group)

        # Визначення найвіддаленішої точки та точки "роботи"
        start_point, sortable_points, end_point = get_route_bounds(points, group[0]["direction"])

        # --- Стандартний маршрут (як є)
        standard_result = fetch_google_route([start_point] + sortable_points + [end_point], optimize=False)
        if standard_result.get("status") != "OK":
            logger.error("Google API не повернув OK. Код статусу: %s", standard_result.get("status"))
            return {"success": False, "errors": ["Помилка Google API"]}

        standard_legs = standard_result["routes"][0]["legs"]
        standard_distance = sum(l["distance"]["value"] for l in standard_legs) / 1000
        standard_duration = sum(l["duration"]["value"] for l in standard_legs) / 60

        # --- Оптимізований маршрут
        optimized_result = fetch_google_route([start_point] + sortable_points + [end_point], optimize=True)
        if optimized_result.get("status") != "OK":
            logger.warning("Оптимізований маршрут не отримано. Використовуємо стандартний лише.")
            optimized_data = None
            optimized_order = [r["id"] for r in group]
            optimized_distance = standard_distance
            optimized_duration = standard_duration
        else:
            optimized_data = optimized_result["routes"][0]
            optimized_legs = optimized_data["legs"]
            optimized_distance = sum(l["distance"]["value"] for l in optimized_legs) / 1000
            optimized_duration = sum(l["duration"]["value"] for l in optimized_legs) / 60

            # Порядок точок, які були передані як waypoints (без старту і фінішу)
            waypoint_order = optimized_data.get("waypoint_order", list(range(len(sortable_points))))
            optimized_order = [sortable_points[i].id for i in waypoint_order]


        logger.debug("Група #%d: дистанція %.2f км, тривалість %.2f хв", i + 1, standard_distance, standard_duration)

        all_routes.append(Route(
            requests=group,
            optimized_order=optimized_order,
            total_distance_km=standard_distance,
            total_duration_min=standard_duration,
            start_point=start_point,
            end_point=end_point,
        ))

    if not all_routes:
        return {"success": False, "errors": ["Маршрутів не знайдено"]}

    try:
        start_address, end_address = determine_start_end_addresses(all_routes[0].requests)
    except Exception as e:
        logger.error("Помилка при визначенні адрес: %s", e)

    if save and route_date and name and user:
        logger.info("Збереження маршруту '%s' на %s", name, route_date)
        save_to_draft(user, route_date, name, all_routes)

    logger.info("Оптимізація завершена. Побудовано маршрутів: %d", len(all_routes))

    response_payload = {
        "success": True,
        "standard_route": {
            "total_distance": round(standard_distance, 2),
            "total_duration": round(standard_duration),
            "stops": [
                {"lat": float(p.lat), "lng": float(p.lng)} for p in [start_point] + sortable_points + [end_point]
            ],
            "start_address": start_address,
            "end_address": end_address,
        },
        "optimization_applied": bool(optimized_result and optimized_data),
        "optimized_route": {
            "total_distance": round(optimized_distance, 2),
            "total_duration": round(optimized_duration) ,
            "stops": [
                {"lat": float(p.lat), "lng": float(p.lng)} for p in [start_point] + [sortable_points[i] for i in waypoint_order] + [end_point]
            ],
            "start_address": start_address,
            "end_address": end_address,
        } if optimized_data else None,
        "optimized_order": optimized_order,
        "distance_improvement_km": round(standard_distance - optimized_distance, 2) if optimized_data else 0.0,
        "duration_improvement_min": round(standard_duration - optimized_duration) if optimized_data else 0
    }

    logger.debug("Відповідь від оптимізатора: %s", response_payload)
    return response_payload
