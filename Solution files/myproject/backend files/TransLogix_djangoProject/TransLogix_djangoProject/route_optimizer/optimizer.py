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

def build_optimized_routes(requests, direction, user, strategy="min_distance", save=False, route_date=None, name=None):
    print("▶️ Старт оптимізації. Стратегія:", strategy)
    logger.info("Старт оптимізації. Стратегія: %s", strategy)
    logger.debug("Отримані сирі заявки: %s", requests)
    logger.debug("Кількість заявок: %d", len(requests))

    constraints = load_user_constraints(user.id)
    if not constraints:
        logger.error("Не знайдено обмежень користувача (user_id=%s)", user.id)
        return {"success": False, "message": "Не знайдено обмежень користувача"}

    passes, violations = check_constraints(requests, constraints)
    if not passes:
        logger.warning("Порушення обмежень у маршруті: %s", violations)

    points = convert_requests_to_points(requests)
    sortable_points, start_point, end_point = get_route_bounds(points, direction)
    all_points = [start_point] + sortable_points + [end_point]
    logger.debug("📦 Усі точки (включно з початком і кінцем): %s", [str(p) for p in all_points])

    standard_result = fetch_google_route(all_points, optimize=False)
    if not standard_result or standard_result.get("status") != "OK":
        logger.error("Не вдалося отримати стандартний маршрут з Google Maps API.")
        return {"success": False, "message": "Google Maps API error (standard)"}

    standard_legs = standard_result["routes"][0]["legs"]
    standard_distance = round(sum(leg["distance"]["value"] for leg in standard_legs) / 1000, 2)
    standard_duration = round(sum(leg["duration"]["value"] for leg in standard_legs) / 60)

    logger.debug("📊 Стандартна дистанція: %.2f км, тривалість: %d хв", standard_distance, standard_duration)

    optimized_response = get_route_and_order(
        [{"lat": float(p.lat), "lng": float(p.lng)} for p in all_points],
        optimize=True
    )

    optimized_route = None
    optimized_order_ids = []
    optimized_distance = 0
    optimized_duration = 0
    optimized_sorted_requests = []

    if optimized_response:
        waypoint_order = optimized_response.get("waypoint_order")
        if waypoint_order:
            ordered_points = [sortable_points[i] for i in waypoint_order]
        else:
            ordered_points = sortable_points

        optimized_full_sequence = [start_point] + ordered_points + [end_point]
        logger.debug("🚀 Оптимізована послідовність точок: %s", [str(p) for p in optimized_full_sequence])

        optimized_order_ids = [p.id for p in optimized_full_sequence if p.point_type in ["pickup", "dropoff"]]
        optimized_distance = round(optimized_response["distance_km"], 2)
        optimized_duration = round(optimized_response["duration_min"])

        start_address, end_address = determine_start_end_addresses(requests)

        optimized_route = {
            "total_distance": optimized_distance,
            "total_duration": optimized_duration,
            "stops": [{"lat": float(p.lat), "lng": float(p.lng)} for p in optimized_full_sequence],
            "start_address": start_address,
            "end_address": end_address,
        }

        optimized_sorted_requests = convert_points_to_request_format(optimized_full_sequence)

    route_stop_count = len(sortable_points)
    advanced_violations = []
    if constraints.get("max_route_distance") and standard_distance > constraints["max_route_distance"]:
        advanced_violations.append(f"Перевищено максимальну довжину маршруту: {standard_distance} км")
    if constraints.get("max_route_duration") and standard_duration > constraints["max_route_duration"]:
        advanced_violations.append(f"Перевищено максимальну тривалість маршруту: {standard_duration} хв")
    if constraints.get("max_stops") and route_stop_count > constraints["max_stops"]:
        advanced_violations.append(f"Перевищено максимальну кількість зупинок: {route_stop_count}")

    if advanced_violations:
        logger.warning("❌ Додаткові порушення: %s", advanced_violations)

    start_address, end_address = determine_start_end_addresses(requests)

    response_payload = {
        "success": True,
        "standard_route": {
            "total_distance": standard_distance,
            "total_duration": standard_duration,
            "stops": [
                {"lat": float(p.lat), "lng": float(p.lng)}
                for p in [start_point] + sortable_points + [end_point]
            ],
            "start_address": start_address,
            "end_address": end_address,
        },
        "optimization_applied": optimized_route is not None,
        "optimized_route": optimized_route,
        "optimized_order": optimized_order_ids,
        "optimized_sorted_requests": optimized_sorted_requests,
        "distance_improvement_km": round(standard_distance - optimized_distance, 2) if optimized_route else 0.0,
        "duration_improvement_min": round(standard_duration - optimized_duration) if optimized_route else 0,
        "errors": advanced_violations if advanced_violations else []
    }

    logger.debug(" Відповідь від оптимізатора: %s", response_payload)
    return response_payload
def convert_points_to_request_format(points):
    """
    Повертає список словників у форматі, придатному для збереження у sessionStorage / frontend:
    [{id: 584, sequence_number: 1, pickup_latitude: "49.858920", pickup_longitude: "24.033717"}, ...]
    """
    requests = []
    seen_ids = set()
    for index, p in enumerate(points):
        base_id = int(str(p.id).split("_")[0])  # Витягуємо тільки ID заявки
        if base_id in seen_ids:
            continue  # пропускаємо дублікати (вже є у списку)
        seen_ids.add(base_id)
        requests.append({
            "id": base_id,
            "sequence_number": index + 1,
            "pickup_latitude": str(p.lat),
            "pickup_longitude": str(p.lng),
        })
    return requests