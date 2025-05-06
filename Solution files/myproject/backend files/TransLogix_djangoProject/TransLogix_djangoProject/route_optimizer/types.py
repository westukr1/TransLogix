from dataclasses import dataclass
from typing import List, Optional

@dataclass
class Point:
    lat: float
    lng: float
    id: int
    point_type: str  # 'pickup' або 'dropoff'

    def __eq__(self, other):
        if not isinstance(other, Point):
            return False
        return (
            abs(self.lat - other.lat) < 1e-6 and
            abs(self.lng - other.lng) < 1e-6
        )

    def __repr__(self):
        return f"Point(lat={self.lat}, lng={self.lng}, id={self.id}, type={self.point_type})"

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
