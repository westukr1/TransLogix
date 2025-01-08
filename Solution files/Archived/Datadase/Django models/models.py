from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password
from datetime import datetime


class User(AbstractUser):
    #phone_number = models.CharField(max_length=15, blank=True, null=True)  # Поле для зберігання номеру телефону
    # Поля для зберігання ролей користувачів
    is_logistic_operator = models.BooleanField(default=False)  # Поле для Логіста
    is_financial_manager = models.BooleanField(default=False)  # Поле для Фінансового менеджера
    is_admin = models.BooleanField(default=False)  # Поле для Адміна
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    is_blocked = models.BooleanField(default=False)  # Додаємо поле для блокування



    # Додаємо related_name для уникнення конфліктів
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_groups',  # Додаємо related_name для уникнення конфлікту
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_permissions',  # Додаємо related_name для уникнення конфлікту
        blank=True
    )

    def set_password(self, raw_password):
        """Sets the user's password."""
        self.password = make_password(raw_password)


    def get_full_name(self):
        """Returns the user's full name."""
        return f"{self.first_name} {self.last_name}" if self.first_name and self.last_name else self.username


    def __str__(self):
        return f"{self.username} ({self.email})"

class Driver(models.Model):
    objects = None
    name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    #created_by_user = models.ForeignKey(User, on_delete=models.CASCADE, default=None, related_name='created_by_user')
    user = models.OneToOneField(User, on_delete=models.CASCADE, default='Unknown', related_name='driver')
    license_number = models.CharField(max_length=50)
    vehicle = models.ForeignKey('Vehicle', on_delete=models.SET_NULL, null=True)
    driver_id = models.AutoField(primary_key=True)  # Це додасть поле id з автоматичним інкрементом.
    phone_number = models.CharField(max_length=20, default= '+380-000-00-00')

    def get_license_info(self):
        """Returns the driver's license number."""
        return f"License: {self.license_number}"

    def get_contact_info(self):
        """Returns the driver's contact information."""
        return f"Phone: {self.phone_number}, Email: {self.user.email if self.user else ''}"

    def __str__(self):
        return self.user.username

class Vehicle(models.Model):
    vehicle_id = models.AutoField(primary_key=True)
    objects = None
    LICENSE_PLATE_FORMAT = [
        ('UA', 'Ukrainian'),
        ('EU', 'European'),
        ('US', 'American'),
    ]

    license_plate = models.CharField(max_length=20, unique=True)
    license_plate_format = models.CharField(max_length=2, choices=LICENSE_PLATE_FORMAT, default='UA')
    make = models.CharField(max_length=50, default='Unknown')
    model = models.CharField(max_length=50, default='Unknown')
    year = models.PositiveIntegerField(default=2000)
    fuel_type = models.CharField(max_length=50) #Змінити на 4 типи в подальшому
    capacity = models.PositiveIntegerField(default=0)
    status = models.CharField(max_length=20, default='Available')

    def __init__(self, *args, **kwargs):
        super(Vehicle, self).__init__(*args, **kwargs)
        self.status = None

    def is_available(self):
        """Checks if the vehicle is available."""
        return self.status == 'Available'

    def get_vehicle_info(self):
        """Returns the vehicle's information."""
        return f"{self.model} ({self.license_plate}), Capacity: {self.capacity}"

    def __str__(self):
        return f'{self.make} {self.model} ({self.year})'



class Trip(models.Model):
    objects = None
    date = models.DateField(default=timezone.now)
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE, default='Unknown')
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, default='Unknown')
    #route = models.ForeignKey(Route, on_delete=models.CASCADE, default='Unknown')
    start_time = models.DateTimeField(default=timezone.now)
    end_time = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=20)
    trip_id = models.AutoField(primary_key=True)

    class Meta:
        ordering = ['date']  # За замовчуванням сортування за датою (найновіші спочатку)
        verbose_name = "Trip"
        verbose_name_plural = "Trips"

    def is_completed(self):
        """Check if the trip is completed."""
        return self.status == 'completed'

    def complete_trip(self):
        """Mark the trip as completed."""
        self.status = 'completed'
        self.save()

    def get_trip_details(self):
        """Returns detailed information about the trip."""
        return f"Trip ID: {self.trip_id}, Route: {self.route}, Driver: {self.driver}, Vehicle: {self.vehicle}, Date: {self.date}"
    def __str__(self):
        return f"Trip by {self.driver} on {self.vehicle}"

class Feedback(models.Model):
    objects = None
    date = models.DateField(default=timezone.now)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, default='Unknown')
    rating = models.PositiveIntegerField()
    comments = models.TextField()
    feedback_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default='Unknown')

    def __str__(self):
        return f"Feedback {self.feedback_id} - {self.rating}"

    def is_positive(self):
        """Check if the feedback is positive."""
        return self.rating >= 4

    def get_summary(self):
        """Returns a summary of the feedback."""
        return f"Rating: {self.rating}, Comments: {self.comments[:50]}..."  # First 50 characters


class BookingRequest(models.Model):
    objects = None
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    #route = models.ForeignKey(Route, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, default='Unknown')
    booking_id = models.AutoField(primary_key=True)
    date = models.DateField(default=timezone.now)

    def __str__(self):
        return f"Booking {self.booking_id} - {self.status}"

    def confirm(self):
        """Confirm the booking."""
        self.status = 'confirmed'
        self.save()

    def cancel(self):
        """Cancel the booking."""
        self.status = 'canceled'
        self.save()

    def is_pending(self):
        """Check if the booking is still pending."""
        return self.status == 'pending'


class FuelLog(models.Model):
    fuel_log_id = models.AutoField(primary_key=True)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    fuel_amount = models.FloatField()
    price = models.FloatField()
    date = models.DateField(default=timezone.now)
    station_name = models.CharField(max_length=255, default='Unknown')

    def __str__(self):
        return f"Fuel Log {self.fuel_log_id} - {self.trip}"

    def get_total_cost(self):
        """Calculates the total cost of the fuel."""
        return self.fuel_amount * self.price


class Route(models.Model):
    # Поля для посилань на окремі компоненти адреси
    origin = models.ForeignKey('City', related_name='route_origin', on_delete=models.SET_NULL,
                               null=True)  # Місто відправлення
    destination = models.ForeignKey('City', related_name='route_destination', on_delete=models.SET_NULL,
                                    null=True)  # Місто призначення

    # Початкова і кінцева локація (точки посадки і висадки) тепер будуть посиланнями на модель CoordinatePoint
    start_point = models.ForeignKey('CoordinatePoint', related_name='route_start', on_delete=models.SET_NULL, null=True)
    end_point = models.ForeignKey('CoordinatePoint', related_name='route_end', on_delete=models.SET_NULL, null=True)

    date = models.DateTimeField()  # Формат дати: "2024-10-06 08:00:00"
    distance = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)  # Відстань у км
    estimated_time = models.DecimalField(max_digits=4, decimal_places=2, default=0.00)  # Оцінений час у годинах

    # Поле для зберігання номеру маршруту
    route_number = models.CharField(max_length=20, unique=True, blank=True)

    def __str__(self):
        return f"Route {self.route_number} from {self.origin} to {self.destination}"

    def save(self, *args, **kwargs):
        # Генерація номеру маршруту при збереженні
        if not self.route_number:
            self.route_number = self.generate_route_number()
        super().save(*args, **kwargs)

    @staticmethod
    def generate_route_number():
        # Генерація префіксу, дати і трьохзначного лічильника
        prefix = "NPL"
        today = datetime.now().strftime("%m-%d-%y")

        # Лічильник - беремо кількість маршрутів за сьогоднішню дату
        count_today = Route.objects.filter(date__date=datetime.now().date()).count() + 1
        count_today_str = f"{count_today:03d}"  # Трьохзначне число

        return f"{prefix}-{today}-{count_today_str}"

    class Meta:
        ordering = ['date']
        unique_together = ['origin', 'destination', 'date']  # Це гарантує унікальність

from django.db import models


class Passenger(models.Model):
    first_name = models.CharField(max_length=100, verbose_name="Ім'я")
    last_name = models.CharField(max_length=100, verbose_name="Прізвище")
    department = models.CharField(max_length=100, verbose_name="Департамент")
    pickup_address = models.CharField(max_length=200, verbose_name="Адреса точки посадки")
    phone_number = models.CharField(max_length=15, verbose_name="Номер телефону")
    email = models.EmailField(verbose_name="Електронна адреса")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        ordering = ['last_name']

class Country(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Region(models.Model):
    name = models.CharField(max_length=100)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class City(models.Model):
    name = models.CharField(max_length=100)
    region = models.ForeignKey(Region, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Street(models.Model):
    name = models.CharField(max_length=100)
    city = models.ForeignKey(City, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class House(models.Model):
    street = models.ForeignKey(Street, on_delete=models.CASCADE)
    house_number = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.house_number} {self.street.name}, {self.street.city.name}"

class CoordinatePoint(models.Model):
    POINT_TYPE_CHOICES = [
        ('pickup', 'Pickup Location'),
        ('dropoff', 'Dropoff Location'),
        ('departure', 'Bus Departure'),
        ('arrival', 'Bus Arrival'),
        ('parking', 'Night Parking'),
        ('refuel', 'Refuel'),
        ('repair', 'Repair'),
        ('manual_address', 'Manual Address'),
        ('user_created', 'User Created'),
    ]

    point_type = models.CharField(max_length=50, choices=POINT_TYPE_CHOICES)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)  # Оператор, Водій або Пасажир
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, null=True)
    region = models.ForeignKey(Region, on_delete=models.SET_NULL, null=True)
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True)
    street = models.ForeignKey(Street, on_delete=models.SET_NULL, null=True)
    house_number = models.CharField(max_length=10, blank=True, null=True)  # Номер будинку, якщо є

    def __str__(self):
        return f"{self.get_point_type_display()} at {self.latitude}, {self.longitude}"

    # Інші моделі: PassengerRoute, Trip


class PassengerRoute(models.Model):
    passenger = models.ForeignKey('Passenger', on_delete=models.CASCADE)
    route = models.ForeignKey('Route', on_delete=models.CASCADE)
    pickup_point = models.ForeignKey(CoordinatePoint, related_name='pickup', on_delete=models.SET_NULL, null=True)
    dropoff_point = models.ForeignKey(CoordinatePoint, related_name='dropoff', on_delete=models.SET_NULL, null=True)

