# manage.py shell

from models import Driver, Vehicle, Route, Trip, Feedback, BookingRequest
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth.models import User


# Створення тестових користувачів
for i in range(1, 6):
    User.objects.create(
        username=f'user{i}',
        first_name=f'First{i}',
        last_name=f'Last{i}',
        email=f'user{i}@example.com',
        password='password'
    )

# Створення тестових водіїв
for i in range(1, 6):
    Driver.objects.create(
        user=User.objects.get(username=f'user{i}'),
        license_number=f'LICENSE{i}',
        experience_years=i
    )

# Створення тестових транспортних засобів
for i in range(1, 6):
    Vehicle.objects.create(
        make=f'Make{i}',
        model=f'Model{i}',
        year=2000 + i,
        registration_number=f'REG{i}'
    )

# Створення тестових маршрутів
for i in range(1, 6):
    Route.objects.create(
        origin=f'City{i}',
        destination=f'Destination{i}',
        distance=100 * i
    )

# Створення тестових поїздок
for i in range(1, 6):
    Trip.objects.create(
        driver=Driver.objects.get(user__username=f'user{i}'),
        vehicle=Vehicle.objects.get(registration_number=f'REG{i}'),
        route=Route.objects.get(origin=f'City{i}'),
        departure_time=timezone.now() + timedelta(days=i),
        arrival_time=timezone.now() + timedelta(days=i, hours=5)
    )

# Створення тестових відгуків
for i in range(1, 6):
    Feedback.objects.create(
        user=User.objects.get(username=f'user{i}'),
        trip=Trip.objects.get(driver__user__username=f'user{i}'),
        rating=i,
        comment=f'This is a feedback {i}'
    )

# Створення тестових заявок на бронювання
for i in range(1, 6):
    BookingRequest.objects.create(
        user=User.objects.get(username=f'user{i}'),
        route=Route.objects.get(origin=f'City{i}'),
        status='pending'
    )
