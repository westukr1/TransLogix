from ..models import RoutePlanDraft, RouteDraftList
from django.utils.timezone import now
import json

def save_to_draft(user, route_date, name, routes):
    """
    Зберігає розраховані маршрути як чернетку в базу.
    :param user: користувач, який зберігає
    :param route_date: дата маршруту (date)
    :param name: назва плану (str)
    :param routes: список об'єктів Route (із типу optimizer.types.Route)
    :return: RoutePlanDraft об'єкт
    """
    plan = RoutePlanDraft.objects.create(
        user=user,
        name=name,
        route_date=route_date,
        total_distance_km=sum(r.total_distance_km for r in routes),
        total_duration_min=sum(r.total_duration_min for r in routes),
        total_fuel_liters=sum((r.fuel_liters or 0) for r in routes),
        created_at=now(),
        updated_at=now(),
    )

    for i, route in enumerate(routes):
        RouteDraftList.objects.create(
            plan=plan,
            route_index=i,
            data_json=json.loads(json.dumps([r.__dict__ for r in route.requests])),
            distance_km=route.total_distance_km,
            duration_min=route.total_duration_min,
            fuel_liters=route.fuel_liters or 0,
        )

    return plan

