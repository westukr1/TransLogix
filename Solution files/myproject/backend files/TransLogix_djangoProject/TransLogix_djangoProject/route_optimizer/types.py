from dataclasses import dataclass
from typing import List, Optional

@dataclass
class Point:
    lat: float
    lng: float

@dataclass
class Request:
    id: int
    pickup: Point
    dropoff: Point
    arrival_time: Optional[str]  # "HH:MM" або None
    request_type: str  # 'to_work' або 'to_home'

@dataclass
class Route:
    requests: List[Request]  # список заявок у маршруті
    optimized_order: List[int]  # індекси або ID заявок у порядку проходження
    total_distance_km: float
    total_duration_min: float
    start_point: Point
    end_point: Point
    fuel_liters: Optional[float] = None  # додатково, якщо рахується
