# migration: 0006_alter_existing_models.py

from django.db import migrations, models
import django.utils.timezone
from django.conf import settings

class Migration(migrations.Migration):

    dependencies = [
        ('TransLogix_djangoProject', '0005_alter_route_options_alter_trip_options_and_more'),
    ]


