# Generated by Django 5.1 on 2024-10-18 13:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TransLogix_djangoProject', '0018_coordinatepoint_content_type_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='passenger',
            name='pickup_address',
        ),
        migrations.AddField(
            model_name='passenger',
            name='dropoff_addresses',
            field=models.ManyToManyField(blank=True, related_name='dropoff_points', to='TransLogix_djangoProject.coordinatepoint'),
        ),
        migrations.AddField(
            model_name='passenger',
            name='pickup_addresses',
            field=models.ManyToManyField(related_name='pickup_points', to='TransLogix_djangoProject.coordinatepoint'),
        ),
        migrations.AddField(
            model_name='passenger',
            name='work_addresses',
            field=models.ManyToManyField(blank=True, related_name='work_points', to='TransLogix_djangoProject.coordinatepoint'),
        ),
    ]