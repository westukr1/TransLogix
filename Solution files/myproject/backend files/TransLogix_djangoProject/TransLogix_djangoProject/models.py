from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password
from datetime import datetime
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericRelation



class User(AbstractUser):

    is_logistic_operator = models.BooleanField(default=False)  # Поле для Логіста
    is_financial_manager = models.BooleanField(default=False)  # Поле для Фінансового менеджера
    is_admin = models.BooleanField(default=False)  # Поле для Адміна
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    is_blocked = models.BooleanField(default=False)  # Додаємо поле для блокування
    last_login = models.DateTimeField(blank=True, null=True, verbose_name='last login')


    is_superuser = models.BooleanField(
        default=False,
        help_text='Designates that this user has all permissions without explicitly assigning them.',
        verbose_name='superuser status'
    )

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_groups',  # Унікальне related_name
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_permissions',  # Унікальне related_name
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


from django.db import models

class UserSettings(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="settings")
    date_interval = models.PositiveIntegerField(default=1)  # Кількість днів для інтервалу
    arrival_time_tolerance = models.PositiveIntegerField(default=30)  # Хвилини
    allow_mixed_directions = models.BooleanField(default=False)
    max_route_duration = models.PositiveIntegerField(default=240)  # Максимальний час у хвилинах
    max_route_distance = models.PositiveIntegerField(default=100)  # Максимальна дистанція у км
    max_stops = models.PositiveIntegerField(default=10)  # Максимальна кількість зупинок
    max_passengers = models.PositiveIntegerField(default=50)  # Максимальна кількість пасажирів
    min_passengers = models.PositiveIntegerField(default=1)  # Мінімальна кількість пасажирів
    allow_multiple_work_addresses = models.BooleanField(default=False)  # Дозволити кілька робочих адрес
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Settings for {self.user.username}"

class Driver(models.Model):

    driver_id = models.AutoField(primary_key=True)
    last_name = models.CharField(max_length=50, default='last_name')
    first_name = models.CharField(max_length=50, default='first_name')
    middle_name = models.CharField(max_length=50, blank=True, null=True)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField(unique=True, blank=True)
    year_of_birth = models.PositiveIntegerField(blank=True, null=True)
    citizenship = models.CharField(max_length=50, blank=True)
    contract_type = models.CharField(max_length=50, default='default contract')
    residence_address = models.TextField(blank=True)
    registration_address = models.TextField(blank=True)
    driving_experience = models.PositiveIntegerField(blank=True, null=True)
    license_category = models.CharField(max_length=50, blank=True)
    license_number = models.CharField(max_length=50, blank=True)

    license_issuer = models.CharField(max_length=100, blank=True, null=True, default='unknown')  # Ким видано посвідчення
    license_issue_date = models.DateField(blank=True, null=True, default='2000-01-01')  # Дата видачі посвідчення
    image_url = models.URLField(max_length=500, blank=True, null=True)  # Поле для зберігання посилання на зображення
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"



class Vehicle(models.Model):
    vehicle_id = models.AutoField(primary_key=True)

    LICENSE_PLATE_FORMAT = [
        ('UA', 'Ukrainian'),
        ('EU', 'European'),
        ('US', 'American'),
    ]

    license_plate = models.CharField(max_length=20, unique=True)
    license_plate_format = models.CharField(max_length=2, choices=LICENSE_PLATE_FORMAT, default='UA')
    make = models.CharField(max_length=50, default='Unknown')  # Марка
    model = models.CharField(max_length=50, default='Unknown')  # Модель
    year = models.PositiveIntegerField(default=2000)  # Рік випуску
    engine_volume = models.FloatField(default=1.0)  # Об'єм двигуна
    registered_to = models.CharField(max_length=150, default='Not specified')  # На кого зареєстрований
    chassis_number = models.CharField(max_length=50, unique=True)  # Номер кузова
    city_fuel_consumption = models.FloatField(default=0.0)  # Орієнтовний розхід палива (місто)
    highway_fuel_consumption = models.FloatField(default=0.0)  # Орієнтовний розхід палива (траса)
    fuel_type = models.ForeignKey(
        'FuelType',
        on_delete=models.SET_NULL,
        null=True,
        related_name='vehicles'
    )
    capacity = models.PositiveIntegerField(default=0)  # Місткість
    active = models.BooleanField(default=True)  # Поле active
    image_url = models.URLField(max_length=500, blank=True, null=True)  # Поле для зберігання посилання на зображення

    def is_available(self):
        """Checks if the vehicle is available."""
        return self.status == 'Available'

    def get_vehicle_info(self):
        """Returns the vehicle's information."""
        return f"{self.make} {self.model} ({self.license_plate}), Capacity: {self.capacity}"

    def __str__(self):
        return f'{self.make} {self.model} ({self.year})'

class Trip(models.Model):
    date = models.DateField(default=timezone.now)
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE, db_column='driver_id')
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, null=True)
    start_time = models.DateTimeField(default=timezone.now)
    end_time = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=20)
    trip_id = models.AutoField(primary_key=True)
    # Coordinate points related to this passenger
    coordinates = GenericRelation('CoordinatePoint')

    class Meta:
        ordering = ['date']  # Сортування за датою
        verbose_name = "Trip"
        verbose_name_plural = "Trips"

    def is_completed(self):
        """Check if the trip is completed."""
        return self.status == 'completed'

    def complete_trip(self):
        """Mark the trip as completed."""
        self.status = 'completed'
        self.save()

    def __str__(self):
        return f"Trip by {self.driver} on {self.vehicle}"


class Feedback(models.Model):
    date = models.DateField(default=timezone.now)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, null=True)
    rating = models.PositiveIntegerField()
    comments = models.TextField()
    feedback_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"Feedback {self.feedback_id} - {self.rating}"

    def is_positive(self):
        """Check if the feedback is positive."""
        return self.rating >= 4


class BookingRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, default='Unknown')
    booking_id = models.AutoField(primary_key=True)
    date = models.DateField(default=timezone.now)

    def __str__(self):
        return f"Booking {self.booking_id} - {self.status}"


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
    route_id = models.AutoField(primary_key=True)
    origin = models.ForeignKey('City', related_name='route_origin', on_delete=models.SET_NULL, null=True, db_column='origin_id')
    destination = models.ForeignKey('City', related_name='route_destination', on_delete=models.SET_NULL, null=True,
        db_column='destination_id')
    start_point = models.ForeignKey('CoordinatePoint', related_name='route_start', on_delete=models.SET_NULL, null=True,
        db_column='start_point_id')
    end_point = models.ForeignKey('CoordinatePoint', related_name='route_end', on_delete=models.SET_NULL, null=True,
        db_column='end_point_id')
    date = models.DateTimeField(default=timezone.now)
    distance = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)
    estimated_time = models.IntegerField(default=0)
    route_number = models.CharField(max_length=20, unique=True, blank=True)
    # Coordinate points related to this passenger
    coordinates = GenericRelation('CoordinatePoint')

    def save(self, *args, **kwargs):
        if not self.route_number:
            self.route_number = self.generate_route_number()
        super().save(*args, **kwargs)

    @staticmethod
    def generate_route_number():
        prefix = "NPL"
        today = datetime.now().strftime("%m-%d-%y")
        count_today = Route.objects.filter(date__date=datetime.now().date()).count() + 1
        return f"{prefix}-{today}-{count_today:03d}"

    class Meta:
        ordering = ['date']
        unique_together = ['origin', 'destination', 'date']

    def __str__(self):
        return f"Route {self.route_number} from {self.origin} to {self.destination}"


class Country(models.Model):
    name = models.CharField(max_length=100, unique=True)
    objects = models.Manager()

    def __str__(self):
        return self.name


class Region(models.Model):
    name = models.CharField(max_length=100)
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name


class District(models.Model):
    name = models.CharField(max_length=100)
    region = models.ForeignKey(Region, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name


class City(models.Model):
    name = models.CharField(max_length=100)
    region = models.ForeignKey(Region, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name


class Street(models.Model):
    name = models.CharField(max_length=100)
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name


class House(models.Model):
    street = models.ForeignKey(Street, on_delete=models.SET_NULL, null=True)
    house_number = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.house_number} {self.street.name}, {self.street.city.name}"

    class Meta:
        unique_together = ('street', 'house_number')


class CoordinatePoint(models.Model):
    objects = None
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
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, null=True)
    region = models.ForeignKey(Region, on_delete=models.SET_NULL, null=True)
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True)
    district = models.ForeignKey(District, on_delete=models.SET_NULL, null=True)
    street = models.ForeignKey(Street, on_delete=models.SET_NULL, null=True)
    house = models.ForeignKey(House, on_delete=models.SET_NULL, null=True, blank=True)

    # Generic relations to allow ownership by different models
    content_type = models.ForeignKey(ContentType, on_delete=models.SET_NULL, null=True)
    object_id = models.PositiveIntegerField(null=True)
    owner_type = models.CharField(max_length=50, null=True, blank=True)  # Дозволяє значення NULL та порожнє значення
    owner_id = models.PositiveIntegerField(null=True, blank=True)  # Дозволяє значення NULL та порожнє значення
    is_active = models.BooleanField(default=True)
    owner = GenericForeignKey('content_type', 'object_id')
    
def __str__(self):
        return f"{self.get_point_type_display()} at {self.latitude}, {self.longitude}"



class PassengerRoute(models.Model):
    passenger = models.ForeignKey('Passenger', on_delete=models.CASCADE)
    route = models.ForeignKey('Route', on_delete=models.CASCADE)
    pickup_point = models.ForeignKey(CoordinatePoint, related_name='pickup', on_delete=models.SET_NULL, null=True)
    dropoff_point = models.ForeignKey(CoordinatePoint, related_name='dropoff', on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"Passenger {self.passenger} on Route {self.route}"


class Passenger(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    pickup_addresses = models.ManyToManyField('CoordinatePoint', related_name='pickup_points', blank=True)
    dropoff_addresses = models.ManyToManyField('CoordinatePoint', related_name='dropoff_points', blank=True)
    work_addresses = models.ManyToManyField('CoordinatePoint', related_name='work_points', blank=True)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()
    # Coordinate points related to this passenger
    coordinates = GenericRelation(CoordinatePoint)
    is_active = models.BooleanField(default=True , blank=True)
    is_selected = models.BooleanField(default=False, blank=True)


    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        ordering = ['last_name']

class Group(models.Model):
    name = models.CharField(max_length=100)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.TextField(blank=True, null=True)

class GroupMembership(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

class DriverVehicleAssignment(models.Model):
    driver = models.ForeignKey('Driver', on_delete=models.CASCADE, related_name='vehicle_assignments')
    vehicle = models.ForeignKey('Vehicle', on_delete=models.CASCADE, related_name='driver_assignments')
    assignment_date = models.DateField(default=timezone.now)
    order_number = models.CharField(max_length=50)
    expiration_date = models.DateField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Driver: {self.driver} - Vehicle: {self.vehicle} (Order: {self.order_number})"

    class Meta:
        verbose_name = "Driver Vehicle Assignment"
        verbose_name_plural = "Driver Vehicle Assignments"

class FuelType(models.Model):
    fuel_type_id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.type

    class Meta:
        verbose_name = "Fuel Type"
        verbose_name_plural = "Fuel Types"

# Таблиця в якійй відображається звязок маршруту і точок, що до нього належать
class RoutePoint(models.Model):
    route = models.ForeignKey(
        'Route',
        on_delete=models.CASCADE,
        related_name='route_points',
        db_column='route_id'
    )  # Зв’язок із маршрутом
    coordinate_point = models.ForeignKey(
        'CoordinatePoint',
        on_delete=models.CASCADE,
        related_name='route_points',
        db_column='coordinate_point_id'
    )  # Зв’язок із точкою координат
    sequence_number = models.IntegerField()  # Порядковий номер точки в маршруті
    passenger = models.ForeignKey(
        'Passenger',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='route_points'
    )  # Пасажир, якому належить точка (опціонально)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)  # Зафіксована широта
    longitude = models.DecimalField(max_digits=9, decimal_places=6)  # Зафіксована довгота
    recorded_at = models.DateTimeField(default=timezone.now)  # Час і дата фіксації точки

    class Meta:
        ordering = ['route', 'sequence_number']
        verbose_name = "Route Point"
        verbose_name_plural = "Route Points"

    def __str__(self):
        return f"Route {self.route.route_id} Point {self.sequence_number}: ({self.latitude}, {self.longitude})"

# model for passengers requests for trips

class PassengerTripRequest(models.Model):
    DIRECTION_CHOICES = [
        ('HOME_TO_WORK', 'Home to Work'),  # Коректне відображення
        ('WORK_TO_HOME', 'Work to Home'),
    ]
    passenger = models.ForeignKey(
        'Passenger',
        on_delete=models.CASCADE,
        related_name='trip_requests'
    )  # Ід Пасажира
    created_at = models.DateTimeField(auto_now_add=True)  # Дата створення
    updated_at = models.DateTimeField(auto_now=True)  # Дата останнього оновлення

    departure_time = models.DateTimeField(null=True, blank=True)
    arrival_time = models.DateTimeField(null=True, blank=True)
    pickup_point = models.ForeignKey(
        'CoordinatePoint',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='pickup_trip_requests'
    )  # Ід точки посадки
    pickup_latitude = models.DecimalField(max_digits=9, decimal_places=6)  # Координати точки посадки (широта)
    pickup_longitude = models.DecimalField(max_digits=9, decimal_places=6)  # Координати точки посадки (довгота)
    dropoff_point = models.ForeignKey(
        'CoordinatePoint',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='dropoff_trip_requests'
    )  # Ід точки висадки
    dropoff_latitude = models.DecimalField(max_digits=9, decimal_places=6)  # Координати точки висадки (широта)
    dropoff_longitude = models.DecimalField(max_digits=9, decimal_places=6)  # Координати точки висадки (довгота)
    direction = models.CharField(max_length=20, choices=DIRECTION_CHOICES, default='HOME_TO_WORK')
    is_active = models.BooleanField(default=True)  # Дійсна (так/ні)
    comment = models.TextField(blank=True, null=True)  # Коментар

    class Meta:
        ordering = ['-created_at']  # Сортування за датою створення (останнє зверху)
        verbose_name = "Passenger Trip Request"
        verbose_name_plural = "Passenger Trip Requests"

    def __str__(self):
        return f"Trip Request by {self.passenger} on {self.planned_datetime.strftime('%Y-%m-%d %H:%M')} ({self.direction})"
