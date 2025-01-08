
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from .models import Trip, Vehicle
from .models import CoordinatePoint, Passenger


@receiver(post_save, sender=Trip)
def update_vehicle_status(sender, instance, **kwargs):
    if instance.status == 'completed':
        instance.vehicle.status = 'Available'
        instance.vehicle.save()

@receiver(post_save, sender=Trip)
def update_driver_status(sender, instance, **kwargs):
    if instance.status == 'completed':
        instance.driver.status = 'Available'
        instance.driver.save()

@receiver(post_delete, sender=Trip)
def cleanup_vehicle_and_driver(sender, instance, **kwargs):
    # Set vehicle and driver statuses to 'Available' when a trip is deleted
    instance.vehicle.status = 'Available'
    instance.vehicle.save()
    instance.driver.status = 'Available'
    instance.driver.save()

@receiver(post_save, sender=Vehicle)
def log_vehicle_update(sender, instance, **kwargs):
    # Example signal to log when a vehicle is updated
    print(f"Vehicle {instance.license_plate} has been updated.")


@receiver(post_save, sender=CoordinatePoint)
def update_passenger_addresses(sender, instance, created, **kwargs):
    if created:
        # Витягуємо пасажира, пов'язаного з цією адресою (owner_id та owner_type = 'passenger')
        if instance.owner_type == 'passenger':
            passenger = Passenger.objects.filter(id=instance.owner_id).first()

            if passenger:
                # Додаємо адресу в залежності від point_type
                if instance.point_type == 'pickup':
                    passenger.pickup_addresses.add(instance)
                elif instance.point_type == 'dropoff':
                    passenger.dropoff_addresses.add(instance)
                elif instance.point_type == 'work':
                    passenger.work_addresses.add(instance)

                # Зберігаємо зміни в пасажирі
                passenger.save()
