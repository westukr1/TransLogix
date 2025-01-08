# migration: 0007_remove_old_fields_and_add_constraints.py

from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('TransLogix_djangoProject', '0006_manual5'),
    ]

    operations = [

        migrations.RemoveField(
            model_name='route',
            name='start_location',
        ),
        migrations.RemoveField(
            model_name='route',
            name='end_location',
        ),
        migrations.AlterUniqueTogether(
            name='route',
            unique_together={('origin', 'destination', 'date')},
        ),
    ]
