# Generated by Django 5.1 on 2024-09-26 21:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TransLogix_djangoProject', '0006_user_is_admin_user_is_financial_manager_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('driver', 'Driver'), ('logistic_operator', 'Logistic Operator'), ('financial_manager', 'Financial Manager'), ('admin', 'Administrator')], max_length=20),
        ),
    ]