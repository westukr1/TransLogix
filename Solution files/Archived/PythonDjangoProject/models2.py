from django.utils import timezone

from django.contrib.auth.hashers import make_password, check_password
from django.db import models

class User(models.Model):
    objects = None
    USER_ROLES = [
        ('driver', 'Driver'),
        ('operator', 'Operator'),
        ('financial_manager', 'Financial Manager'),
        ('admin', 'Administrator'),
    ]
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    role = models.CharField(max_length=20, choices=USER_ROLES)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.last_name = None
        self.first_name = None

    def set_password(self, raw_password):
        """Sets the user's password."""
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        """Checks if the provided password matches the stored password."""
        return check_password(raw_password, self.password)

    def get_full_name(self):
        """Returns the user's full name."""
        return f"{self.first_name} {self.last_name}" if self.first_name and self.last_name else self.username


    def __str__(self):
         return self.username

class Driver(models.Model):
    objects = None
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    created_by_user = models.ForeignKey(User, on_delete=models.CASCADE, default='unknown operator')
    #user = models.OneToOneField(User, on_delete=models.CASCADE, default='Unknown')
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

    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.status = None

    def is_available(self):
        """Checks if the vehicle is available."""
        return self.status == 'Available'

    def get_vehicle_info(self):
        """Returns the vehicle's information."""
        return f"{self.model} ({self.license_plate}), Capacity: {self.capacity}"

    def __str__(self):
        return f'{self.make} {self.model} ({self.year})'


class Route(models.Model):
    objects = None
    origin = models.CharField(max_length=100, default='Unknown')
    destination = models.CharField(max_length=100,default='Unknown')
    end_location = models.CharField(max_length=100, default='Unknown')
    start_location = models.CharField(max_length=100, default='Unknown')

    distance = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    route_id = models.AutoField(primary_key=True)

    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.license_plate = None
        self.model = None
        self.status = None


    def is_available(self):
        """Checks if the vehicle is available."""
        return self.status == 'Available'

    def get_vehicle_info(self):
        """Returns the vehicle's information."""
        return f"{self.model} ({self.license_plate}), Capacity: {self.capacity}"
    def __str__(self):
        return f"{self.origin} to {self.destination}"

class Trip(models.Model):
    objects = None
    date = models.DateField(default=timezone.now)
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE, default='Unknown')
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, default='Unknown')
    route = models.ForeignKey(Route, on_delete=models.CASCADE, default='Unknown')
    start_time = models.DateTimeField(default=0)
    end_time = models.DateTimeField(default=0)
    status = models.CharField(max_length=20)
    trip_id = models.AutoField(primary_key=True)

    class Meta:
        ordering = ['-date']  # За замовчуванням сортування за датою (найновіші спочатку)
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
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, default='Unknown')
    rating = models.PositiveIntegerField()
    comments = models.TextField()
    feedback_id = models.AutoField(primary_key=True)

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
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
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
    date = models.DateField()
    station_name = models.CharField(max_length=255)

    def __str__(self):
        return f"Fuel Log {self.fuel_log_id} - {self.trip}"

    def get_total_cost(self):
        """Calculates the total cost of the fuel."""
        return self.fuel_amount * self.price



