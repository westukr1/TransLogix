# Generated by Django 5.1 on 2024-10-03 13:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('TransLogix_djangoProject', '0013_alter_route_destination'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bookingrequest',
            name='route',
        ),
        migrations.RemoveField(
            model_name='trip',
            name='route',
        ),
        migrations.DeleteModel(
            name='Route',
        ),
    ]