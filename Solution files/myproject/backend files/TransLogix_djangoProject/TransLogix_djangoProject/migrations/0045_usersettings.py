# Generated by Django 5.0.2 on 2025-01-24 11:32

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TransLogix_djangoProject', '0044_remove_passengertriprequest_endpoint_type'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserSettings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_interval', models.PositiveIntegerField(default=1)),
                ('arrival_time_tolerance', models.PositiveIntegerField(default=30)),
                ('allow_mixed_directions', models.BooleanField(default=False)),
                ('max_route_duration', models.PositiveIntegerField(default=240)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='settings', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
