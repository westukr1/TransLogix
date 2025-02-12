# Generated by Django 5.1 on 2024-08-19 18:20

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TransLogix_djangoProject', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='trip',
            options={'ordering': ['date'], 'verbose_name': 'Trip', 'verbose_name_plural': 'Trips'},
        ),
        migrations.AddField(
            model_name='driver',
            name='last_name',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AddField(
            model_name='driver',
            name='vehicle',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='TransLogix_djangoProject.vehicle'),
        ),
        migrations.AddField(
            model_name='feedback',
            name='date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='route',
            name='date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='route',
            name='destination',
            field=models.CharField(default='Unknown', max_length=100),
        ),
        migrations.AddField(
            model_name='route',
            name='origin',
            field=models.CharField(default='Unknown', max_length=100),
        ),
        migrations.AddField(
            model_name='trip',
            name='end_time',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='trip',
            name='start_time',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='user',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='user',
            name='first_name',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AddField(
            model_name='user',
            name='last_name',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AddField(
            model_name='user',
            name='updated_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='vehicle',
            name='license_plate_format',
            field=models.CharField(choices=[('UA', 'Ukrainian'), ('EU', 'European'), ('US', 'American')], default='UA', max_length=2),
        ),
        migrations.AddField(
            model_name='vehicle',
            name='make',
            field=models.CharField(default='Unknown', max_length=50),
        ),
        migrations.AddField(
            model_name='vehicle',
            name='year',
            field=models.PositiveIntegerField(default=2000),
        ),
        migrations.AlterField(
            model_name='bookingrequest',
            name='date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='bookingrequest',
            name='status',
            field=models.CharField(default='Unknown', max_length=20),
        ),
        migrations.AlterField(
            model_name='driver',
            name='license_number',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='driver',
            name='name',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='driver',
            name='phone_number',
            field=models.CharField(default='+380-000-00-00', max_length=20),
        ),
        migrations.AlterField(
            model_name='driver',
            name='user',
            field=models.OneToOneField(default='Unknown', on_delete=django.db.models.deletion.CASCADE, related_name='driver', to='TransLogix_djangoProject.user'),
        ),
        migrations.AlterField(
            model_name='feedback',
            name='rating',
            field=models.PositiveIntegerField(),
        ),
        migrations.AlterField(
            model_name='feedback',
            name='trip',
            field=models.ForeignKey(default='Unknown', on_delete=django.db.models.deletion.CASCADE, to='TransLogix_djangoProject.trip'),
        ),
        migrations.AlterField(
            model_name='feedback',
            name='user',
            field=models.ForeignKey(default='Unknown', on_delete=django.db.models.deletion.CASCADE, to='TransLogix_djangoProject.user'),
        ),
        migrations.AlterField(
            model_name='fuellog',
            name='date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='fuellog',
            name='station_name',
            field=models.CharField(default='Unknown', max_length=255),
        ),
        migrations.AlterField(
            model_name='route',
            name='distance',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=6),
        ),
        migrations.AlterField(
            model_name='route',
            name='end_location',
            field=models.CharField(default='Unknown', max_length=100),
        ),
        migrations.AlterField(
            model_name='route',
            name='estimated_time',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=6),
        ),
        migrations.AlterField(
            model_name='route',
            name='start_location',
            field=models.CharField(default='Unknown', max_length=100),
        ),
        migrations.AlterField(
            model_name='trip',
            name='date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='trip',
            name='driver',
            field=models.ForeignKey(default='Unknown', on_delete=django.db.models.deletion.CASCADE, to='TransLogix_djangoProject.driver'),
        ),
        migrations.AlterField(
            model_name='trip',
            name='route',
            field=models.ForeignKey(default='Unknown', on_delete=django.db.models.deletion.CASCADE, to='TransLogix_djangoProject.route'),
        ),
        migrations.AlterField(
            model_name='trip',
            name='status',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='trip',
            name='vehicle',
            field=models.ForeignKey(default='Unknown', on_delete=django.db.models.deletion.CASCADE, to='TransLogix_djangoProject.vehicle'),
        ),
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(max_length=128),
        ),
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name='vehicle',
            name='capacity',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='vehicle',
            name='model',
            field=models.CharField(default='Unknown', max_length=50),
        ),
    ]
