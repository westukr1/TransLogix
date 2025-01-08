import django.contrib.auth.models
import django.contrib.auth.validators
import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models
class Migration(migrations.Migration):


    dependencies = [
        ('TransLogix_djangoProject', '0002_city_country_passenger_alter_route_options_and_more'),
    ]

    operations = [
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
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        # Додаткові зміни в моделях можна додати сюди
    ]
