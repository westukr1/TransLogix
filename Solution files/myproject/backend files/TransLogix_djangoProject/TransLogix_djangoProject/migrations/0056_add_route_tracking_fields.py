# Generated manually due to unavailable Django management commands.
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('TransLogix_djangoProject', '0055_rename_save_usersettings_auto_save'),
    ]

    operations = [
        migrations.AddField(
            model_name='route',
            name='driver',
            field=models.ForeignKey(blank=True, help_text='Призначений водій (ID)', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='routes', to='TransLogix_djangoProject.driver'),
        ),
        migrations.AddField(
            model_name='route',
            name='is_actual',
            field=models.BooleanField(default=True, help_text='Актуальний (так/ні)'),
        ),
        migrations.AddField(
            model_name='route',
            name='is_completed',
            field=models.BooleanField(default=False, help_text='Виконаний (так/ні)'),
        ),
        migrations.AddField(
            model_name='route',
            name='ordered_passenger_list',
            field=models.ForeignKey(blank=True, help_text="Пов'язаний впорядкований список пасажирів (ID списку)", null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='routes', to='TransLogix_djangoProject.orderedpassengerlist'),
        ),
        migrations.AddField(
            model_name='route',
            name='trip',
            field=models.ForeignKey(blank=True, help_text='Пов\'язана поїздка (ID поїздки)', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='routes', to='TransLogix_djangoProject.trip'),
        ),
        migrations.AddField(
            model_name='route',
            name='vehicle',
            field=models.ForeignKey(blank=True, help_text='Призначений транспортний засіб (ID)', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='routes', to='TransLogix_djangoProject.vehicle'),
        ),
    ]
