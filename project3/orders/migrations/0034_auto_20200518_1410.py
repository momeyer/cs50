# Generated by Django 3.0.6 on 2020-05-18 14:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0033_auto_20200518_1408'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderitem',
            name='price',
            field=models.FloatField(null=True),
        ),
    ]
