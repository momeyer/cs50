# Generated by Django 3.0.7 on 2020-06-12 12:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marketplace', '0008_auto_20200610_0929'),
    ]

    operations = [
        migrations.AddField(
            model_name='property',
            name='lat',
            field=models.FloatField(default=-75.54651808657795),
        ),
        migrations.AddField(
            model_name='property',
            name='lon',
            field=models.FloatField(default=45.46713458191736),
        ),
    ]