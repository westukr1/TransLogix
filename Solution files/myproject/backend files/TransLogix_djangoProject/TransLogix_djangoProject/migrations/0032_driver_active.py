# Generated by Django 5.1 on 2024-12-25 20:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TransLogix_djangoProject', '0031_remove_vehicle_status_vehicle_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='driver',
            name='active',
            field=models.BooleanField(default=True),
        ),
    ]