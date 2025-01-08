import django.contrib.auth.models
import django.contrib.auth.validators
import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TransLogix_djangoProject', '0003_manual2'),
    ]

    operations = [
        migrations.AddField(
            model_name='route',
            name='destination',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='route_destination', to='TransLogix_djangoProject.city'),
        ),
        migrations.AddField(
            model_name='route',
            name='origin',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='route_origin', to='TransLogix_djangoProject.city'),
        ),
        # Інші зв'язки можна додати тут
    ]
