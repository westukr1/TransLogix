# Generated by Django 5.1 on 2024-10-04 15:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TransLogix_djangoProject', '0018_city_country_vehicle_status_and_more'),
    ]

    operations = [

        migrations.CreateModel(
            name='PassengerRoute',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dropoff_point', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='dropoff', to='TransLogix_djangoProject.coordinatepoint')),
                ('passenger', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='TransLogix_djangoProject.passenger')),
                ('pickup_point', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='pickup', to='TransLogix_djangoProject.coordinatepoint')),
                ('route', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='TransLogix_djangoProject.route')),
            ],
        ),
    ]