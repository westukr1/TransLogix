# Generated by Django 5.1 on 2024-12-26 18:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TransLogix_djangoProject', '0033_vehicle_image_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='driver',
            name='image_url',
            field=models.URLField(blank=True, max_length=500, null=True),
        ),
    ]