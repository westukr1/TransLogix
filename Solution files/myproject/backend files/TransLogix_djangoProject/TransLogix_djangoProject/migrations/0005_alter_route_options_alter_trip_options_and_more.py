# migration: 0005_create_new_models.py

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
from django.conf import settings

class Migration(migrations.Migration):

    dependencies = [
        ('TransLogix_djangoProject', '0004_manual3'),
    ]

    operations = [
        migrations.CreateModel(
            name='CoordinatePoint',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('point_type', models.CharField(choices=[('pickup', 'Pickup Location'), ('dropoff', 'Dropoff Location'), ('departure', 'Bus Departure'), ('arrival', 'Bus Arrival'), ('parking', 'Night Parking'), ('refuel', 'Refuel'), ('repair', 'Repair'), ('manual_address', 'Manual Address'), ('user_created', 'User Created')], max_length=50)),
                ('latitude', models.DecimalField(decimal_places=6, max_digits=9)),
                ('longitude', models.DecimalField(decimal_places=6, max_digits=9)),
                ('house_number', models.CharField(blank=True, max_length=10, null=True)),
                ('city', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='TransLogix_djangoProject.city')),
                ('country', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='TransLogix_djangoProject.country')),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
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
        migrations.CreateModel(
            name='Region',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('country', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='TransLogix_djangoProject.country')),
            ],
        ),
        migrations.CreateModel(
            name='Street',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='TransLogix_djangoProject.city')),
            ],
        ),
        migrations.CreateModel(
            name='House',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('house_number', models.CharField(max_length=20)),
                ('street', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='TransLogix_djangoProject.street')),
            ],
        ),
    ]
