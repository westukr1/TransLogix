from .models import Route
from datetime import datetime

def load_routes():
    # Твої дані маршрутів
    routes = [
        {
            "origin": "Львів",
            "destination": "Дрогобич",
            "start_location": "Львів, вул. Східна, 52",
            "end_location": "Дрогобич, пл. Ринок, 1",
            "date": "2024-10-06 08:00:00",
            "distance": 72.00,
            "estimated_time": 1.30
        },
        {
            "origin": "Львів",
            "destination": "Стрий",
            "start_location": "Львів, вул. Східна, 52",
            "end_location": "Стрий, вул. Шевченка, 10",
            "date": "2024-10-06 10:00:00",
            "distance": 66.00,
            "estimated_time": 1.20
        },
        # Додай інші маршрути
    ]

    # Завантаження даних у базу даних
    for route in routes:
        Route.objects.create(
            origin=route["origin"],
            destination=route["destination"],
            start_location=route["start_location"],
            end_location=route["end_location"],
            date=datetime.strptime(route["date"], "%Y-%m-%d %H:%M:%S"),  # Конвертація дати у datetime
            distance=route["distance"],
            estimated_time=route["estimated_time"]
        )
    print("Routes loaded successfully!")


