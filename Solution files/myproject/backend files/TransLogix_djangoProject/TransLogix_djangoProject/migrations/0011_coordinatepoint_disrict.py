# Generated by Django 5.1 on 2024-10-13 11:35

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TransLogix_djangoProject', '0010_remove_route_id_route_route_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='coordinatepoint',
            name='disrict',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='TransLogix_djangoProject.district'),
        ),
    ]