# Generated by Django 3.0.7 on 2020-06-10 09:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('marketplace', '0005_request'),
    ]

    operations = [
        migrations.AlterField(
            model_name='request',
            name='house_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='marketplace.Property'),
        ),
    ]